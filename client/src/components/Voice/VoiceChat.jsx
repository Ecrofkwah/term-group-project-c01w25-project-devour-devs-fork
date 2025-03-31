import React, { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Spinner from 'react-bootstrap/Spinner';
import config from '../../config/config';
import './VoiceChat.css'
import { FaStopCircle } from "react-icons/fa";

function VoiceChat({ mealInfo, history, setHistory, cooldown, setCooldown, isloading, setIsLoading }) {
  // State for recording status and audio data
  const [isRecording, setIsRecording] = useState(false);
  const [serverAudioUrl, setServerAudioUrl] = useState(null);

  const mealSummary = { role: 'user', parts: [{ text: mealInfo.summary.replace(/<[^>]*>/g, '') }] }
  const mealInstructions = { role: 'user', parts: [{ text: mealInfo.instructions.replace(/<[^>]*>/g, '') }] }
  // const mealIngredients = { role: 'user', parts: [ {text: mealInfo.extendedIngredients
  //   .map((ingredient) => {
  //     const { original, measures } = ingredient;
  //     const metric = measures.metric;
  //     const measurement =
  //       metric.amount && metric.unitShort
  //         ? `(${metric.amount} ${metric.unitShort})`
  //         : "";
  //     return `${original} ${measurement}`.trim();
  //   })
  //   .join(", ")} ] }

  //const [history, setHistory] = useState([mealSummary, mealInstructions])
  // states needed to determine if we are currently recording or playing audio
  const [loadingtext, setLoadingText] = useState('');
  //const [isloading, setIsLoading] = useState(false)
  const [buttonText, setButtonText] = useState("Start Recording")
  const [showProgess, setShowProgress] = useState(false)


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
    const chatField = document.querySelector('.chatbox-input');
    chatField.classList.add('unavailable');
    document.activeElement.blur();
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
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' }); // need to support audio format that is supported with chrome

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
    return new Blob([byteArray], { type: mimeType });
  }

  // Function to send audio to the backend
  const sendAudioToBackend = async (audioBlob) => {
    const json_string = JSON.stringify(history);
    const formData = new FormData();
    formData.append('audio', audioBlob, "recording.webm")
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
    } catch (error) {
      console.error('Error sending audio to server:', error);
      setIsLoading(false);
      setLoadingText('');
      setButtonText('Start Recording');
      setShowProgress(false);
      setIsRecording(false);
      console.log(isloading + buttonText);
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
    audioRef.current.addEventListener('playing', () => {
      setIsLoading(true)
      setLoadingText('Speaking')
      setShowProgress(false)
    })
    audioRef.current.addEventListener('ended', () => {
      setIsLoading(false)
      setLoadingText('')
      setButtonText('Start Recording')
    })
    setCooldown(5);
    const interval = setInterval(() => {
      setCooldown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [serverAudioUrl]);


  const handleClick = () => {
    if (isRecording) {
      stopRecording();
      if (buttonText === 'Recording' && !isloading) { setShowProgress(true) }
    } else {
      startRecording();
    }
  }

  const stopAudio = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsLoading(false)
    setLoadingText('')
    setButtonText('Start Recording')
    // const interval = setInterval(() => {
    //   setCooldown(prev => {
    //     if (prev <= 1) {
    //       clearInterval(interval);
    //       return 0;
    //     }
    //     return prev - 1;
    //   });
    // }, 1000);
  }

  return (

    <div className='voice-chat-container'>
      <FaStopCircle onClick={stopAudio} style={{ color: isloading ?  'blue' : 'rgba(0, 0, 255, 0.2)', fontSize: '38px', marginRight: '5px' }} />
      {showProgess ? (
        // An indeterminate progress bar
        <ProgressBar animated now={100} variant="primary" style={{ width: '110px', height: '40px', border: '1px solid red', backgroundColor: 'black' }} />
      ) : (
        <Button
          onClick={handleClick}
          variant="outline-primary"
          disabled={isloading || cooldown}
          style={{
            whiteSpace: "nowrap"
          }}
        >
          {isloading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />{' '}
              {loadingtext}
            </>
          ) : (
            buttonText
          )}
        </Button>
      )}
    </div>
  )

}

export default VoiceChat;


