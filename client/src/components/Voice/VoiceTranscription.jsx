import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import './VoiceTranscription.css';
import config from '../../config/config';


function VoiceTranscription() {
  // State for recording status and audio data
  const [isRecording, setIsRecording] = useState(false);
  const [serverAudioUrl, setServerAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visualizerData, setVisualizerData] = useState(Array(50).fill(5));
  
  // References for managing audio streams and visualization
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const animationRef = useRef(null);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const serverAudioContextRef = useRef(null);
  const clientAnalyserRef = useRef(null);
  const serverAnalyserRef = useRef(null);
  const streamRef = useRef(null);
  const serverAudioRef = useRef(null);

  // Initialize audio context when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // different analyser refs needed for client and server audio contexts so that they dont interfere with each other
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)(); // line needed to support old browsers
      clientAnalyserRef.current = audioContextRef.current.createAnalyser();
      clientAnalyserRef.current.fftSize = 256;

      serverAudioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      serverAnalyserRef.current = serverAudioContextRef.current.createAnalyser();
      serverAnalyserRef.current.fftSize = 256;
    }
    
    return () => {
      // Clean up resources when component unmounts
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Start recording function
  const startRecording = async () => {
    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      // Set up audio analyzer for visualization
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(clientAnalyserRef.current);
      
      // Create media recorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      // Handle data availability
      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      // Handle recording stop
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        
        // Automatically send the recording to the backend
        sendAudioToBackend(audioBlob);
      };
      
      // Start recording
      mediaRecorder.start();
      setIsRecording(true);
      
      // Start visualizer animation
      visualize(clientAnalyserRef);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Could not access your microphone. Please check permissions.");
    }
  };

  // Stop recording function
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      streamRef.current.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      
      // Stop visualization
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  };

  // Audio visualization function
  const visualize = (analyserRef) => {
    if (!analyserRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    
    // Clear canvas
    canvasCtx.clearRect(0, 0, width, height);
    
    const draw = () => {
      // Schedule next animation frame
      animationRef.current = requestAnimationFrame(draw);
      
      // Get frequency data
      analyserRef.current.getByteFrequencyData(dataArray);
      
      // Clear canvas
      canvasCtx.fillStyle = 'rgb(20, 20, 30)';
      canvasCtx.fillRect(0, 0, width, height);
      
      // Prepare visualization
      const barWidth = (width / bufferLength) * 2.5;
      let x = 0;
      
      // Update state for circular visualizer
      const newVisualizerData = Array(50).fill(5);
      
      for (let i = 0; i < bufferLength; i++) {
        // Calculate bar height based on frequency data
        const barHeight = dataArray[i] / 2 / 2;
        
        // Draw bar
        const r = 255 * (barHeight / 128);
        const g = 100 + 155 * (barHeight / 256);
        const b = 200;
        
        canvasCtx.fillStyle = `rgb(${r},${g},${b})`;
        canvasCtx.fillRect(x, height - barHeight, barWidth, barHeight);
        
        // Update circular visualizer data
        if (i < 50) {
          newVisualizerData[i] = 5 + (dataArray[i] / 10);
        }
        
        x += barWidth + 1;
      }
      
      setVisualizerData(newVisualizerData);
    };
    
    draw();
  };

  // Function to send audio to the backend
  const sendAudioToBackend = async (audioBlob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob)
    
    try {
      const response = await fetch('http://127.0.0.1:8080/audio', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const newAudioBlob = await response.blob();
      fetchAndPlayAudio(newAudioBlob);

    } catch (error) {
      console.error('Error sending audio to server:', error);
    }
  };

  // Fetch and automatically play audio from the server
const fetchAndPlayAudio = async (audioBlob) => {
   try {
    const objectUrl = URL.createObjectURL(audioBlob);
    // Set the server audio URL state to trigger auto-play
    setServerAudioUrl(objectUrl);
  } catch (error) {
    console.error('Error fetching server audio:', error);
  }
};

// Auto-play server audio when URL is updated
useEffect(() => {
  if (serverAudioUrl && serverAudioRef.current) {

    const sourceNode = serverAudioContextRef.current.createMediaElementSource(serverAudioRef.current);
    sourceNode.connect(serverAnalyserRef.current);

    serverAnalyserRef.current.connect(serverAudioContextRef.current.destination);

    // Start playing as soon as the audio is loaded
    const playAudio = () => {
      serverAudioRef.current.play()
        .then(() => {
          visualize(serverAnalyserRef);
          setIsPlaying(true);
          console.log('Auto-playing server audio');
        })
        .catch(error => {
          console.error('Auto-play failed:', error);
          // Some browsers require user interaction before playing audio
          console.log('Note: Some browsers require user interaction before auto-playing audio');
        });
    };

    // Set up event listeners for the audio element
    serverAudioRef.current.addEventListener('canplaythrough', playAudio);
    // Clean up when component unmounts or URL changes
    return () => {
      if (serverAudioRef.current) {
        serverAudioRef.current.removeEventListener('canplaythrough', playAudio);
        
        if (serverAudioUrl) {
          URL.revokeObjectURL(serverAudioUrl);
        }
      }
    };
  }
}, [serverAudioUrl]);

  // Generate points for the circular visualizer
  const generateCirclePoints = () => {
    const points = [];
    const segments = visualizerData.length;
    const radius = 80 / 2;
    const centerX = 100;
    const centerY = 100;
    
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const dynamicRadius = radius + visualizerData[i] * 2;
      
      const x = centerX + Math.cos(angle) * dynamicRadius;
      const y = centerY + Math.sin(angle) * dynamicRadius;
      
      points.push([x, y]);
    }
    
    // Close the path
    if (points.length > 0) {
      points.push(points[0]);
    }
    
    return points;
  };

  // Generate SVG path for the circular visualizer
  const generateSVGPath = () => {
    const points = generateCirclePoints();
    if (points.length === 0) return '';
    
    let path = `M ${points[0][0]} ${points[0][1]}`;
    
    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i][0]} ${points[i][1]}`;
    }
    
    return path;
  };

return (
    <div className='container'>
    {/* Canvas for bar visualizer */}
    <canvas 
      ref={canvasRef} 
      width="150" 
      //height="50" 
      height='50'
      className="w-full h-24 bg-gray-900 rounded-lg mb-6"
    />

    {/* Circular Visualizer */}
    <svg width="50" height="50" viewBox="0 0 200 200" className="w-full h-full">
    {/* <svg width="200" height="200" viewBox="0 0 200 200" className="w-full h-full"> */}
      {/* Background circle */}
      <circle cx="100" cy="100" r="80" fill="transparent" stroke="#e5e7eb" strokeWidth="2" />
      
      {/* Dynamic visualizer path */}
      <path
        d={generateSVGPath()}
        fill="rgba(59, 130, 246, 0.2)"
        stroke="#3b82f6"
        strokeWidth="2"
        className="transition-all duration-75"
      />
    </svg>

    {/* Record button in center */}
    <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-1 rounded-full${
          isRecording 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white transition-all duration-300`}
        id='mic-button'>
      {isRecording ? <MicOff size={24} color='black' /> : <Mic size={24} color='black' />}
    </button>

    {/* Audio playback */}
    {/* Server processed audio (auto-plays) */}
    {serverAudioUrl && (
      <div style={{ margin: '20px 0' }}>
        <h3>Server Response Audio {isPlaying && "(Playing...)"}</h3>
        <audio
          ref={serverAudioRef} 
          controls 
          src={serverAudioUrl}
          onEnded={() => setIsPlaying(false)}
        ></audio>
      </div>
    )}

  </div>
);

};

export default VoiceTranscription;