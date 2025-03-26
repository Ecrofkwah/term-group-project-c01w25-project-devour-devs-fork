import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Icon } from "@chakra-ui/react";
import { IoMdMic } from "react-icons/io";
import config from '../../config/config';


function VoiceChat() {
  // State for recording status and audio data
  const [isRecording, setIsRecording] = useState(false);
  const [serverAudioUrl, setServerAudioUrl] = useState(null);
  const [history, setHistory] = useState([])

  // states needed to determine if we are currently recording or playing audio
  const [loadingtext, setLoadingText] = useState('');
  const [isloading, setIsLoading] = useState(false)
  const [buttonText, setButtonText] = useState("Start Recording")


  const audioRef = useRef(null)

  // References for managing audio streams and visualization
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioContextRef = useRef(null);
  const serverAudioContextRef = useRef(null);
  const clientAnalyserRef = useRef(null);
  const serverAnalyserRef = useRef(null);
  const streamRef = useRef(null);

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
    };
  }, []);

  // Start recording function
  const startRecording = async () => {
    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
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
        
        // Automatically send the recording to the backend
        sendAudioToBackend(audioBlob);
      };
      
      // Start recording
      mediaRecorder.start();
      setIsRecording(true);
      setButtonText('Recording');
      
      // Start visualizer animation
      // visualize(clientAnalyserRef);
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
    }
  };

  const base64ToBlob = (encodedData, mimeType = 'audio/mpeg') => {
    const byteChars = atob(encodedData);
    const byteNumbers = new Array(byteChars.length);
    for (let i = 0; i < byteChars.length; i++) {
      byteNumbers[i] = byteChars.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], {type: mimeType});
  }

  // Function to send audio to the backend
  const sendAudioToBackend = async (audioBlob) => {
    const json_string = JSON.stringify(history);
    const formData = new FormData();
    formData.append('audio', audioBlob)
    formData.append('history', json_string)
    
    try {
      const response = await fetch(`${config.BASE_URL}/api/voice/transcribe`, { 
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      const newAudioBlob = base64ToBlob(data.audio);
      fetchAndPlayAudio(newAudioBlob);
      setHistory(data.history)
      console.log(data.history)
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
    // no previous audio playing
    if (!audioRef.current) {
      audioRef.current = new Audio(serverAudioUrl);
    } else {
      audioRef.current.pause(); // pause previous audio
      audioRef.current = new Audio(serverAudioUrl); // add the new audio to be played
    }
    // Automatically play the audio
    audioRef.current.play();
    audioRef.current.addEventListener('playing', ()=>{
      setIsLoading(true)
      setLoadingText('Speaking')
    })
    audioRef.current.addEventListener('ended', ()=>{
      setIsLoading(false)
      setLoadingText('')
      setButtonText('Start Recording')
    })
  }, [serverAudioUrl]);


const handleClick = () => {
  if (isRecording) {
    stopRecording();
  } else {
    startRecording();
  }
} 

  return ( 
    <Button onClick={handleClick}
      isLoading={isloading}
      loadingText={loadingtext}
      >
      {buttonText}
    </Button>
  )

}

export default VoiceChat;


