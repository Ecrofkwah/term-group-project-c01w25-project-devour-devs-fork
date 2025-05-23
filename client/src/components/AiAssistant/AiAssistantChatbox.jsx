import React, { useState, useEffect, useRef } from 'react';
import './AiAssistantChatbox.css';
import axios from 'axios';
import config from '../../config/config';
import { MdAssistant } from 'react-icons/md';
import ReactMarkdown from 'react-markdown';
import VoiceChat from '../../components/Voice/VoiceChat';

import { Form, FormControl, Button } from 'react-bootstrap';

const AiAssistantChatbox = ({ mealInfo }) => {  
    const [isOpen, setIsOpen] = useState(false);

    // Prop drilling so AI knows what dish we are refering too
    const mealSummary = { role: 'user', parts: [ {text: mealInfo.summary.replace(/<[^>]*>/g, '')} ] }
    const mealInstructions = { role: 'user', parts: [ {text: mealInfo.instructions.replace(/<[^>]*>/g, '')} ] }
    const mealIngredients = { role: 'user', parts: [ {text: mealInfo.extendedIngredients
    .map((ingredient) => {
      const { original, measures } = ingredient;
      const metric = measures.metric;
      const measurement =
        metric.amount && metric.unitShort
          ? `(${metric.amount} ${metric.unitShort})`
          : "";
      return `${original} ${measurement}`.trim();
    })
    .join(", ")} ] }
    const [messages, setMessages] = useState([mealSummary, mealInstructions, mealIngredients]);
    //{ role: "model", parts: [{ text: 'Hello! How can I help you today?'}]}
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOnCooldown, setIsOnCooldown] = useState(0);
    const lastMessageRef = useRef(null);

    useEffect(() => {
        if (isOpen && lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

    useEffect(() => {
        const chatField = document.querySelector('.chatbox-input');
        if (isOnCooldown) {
            chatField.classList.add('unavailable');
            document.activeElement.blur();
            setInput(`Wait ${isOnCooldown} seconds before sending...`);
        }
        else {
            chatField.classList.remove('unavailable');
            setInput('');
            document.querySelector('.chat-field').focus();
        }
    }, [isOnCooldown]);

    useEffect(() => {
        document.querySelector('.chat-field').focus();
    }, [isOpen]);

    const toggleChatbox = () => {
        setIsOpen(!isOpen);
    }

    const handleInput = (e) => {
        if (e.target.value.length < 1000) {
            setInput(e.target.value);
        }
    }

    const handleEnter = async (e) => {
        e.preventDefault();
        if (!input.trim()) {
            return;
        }

        const message = input;
        setInput('');
        setIsLoading(true);
        const currentMessages = messages;
        setMessages(prev => [...prev, { role: "user", parts: [{ text: message }] }]);

        try {
            const response = await axios.post(`${config.BASE_URL}/api/ai/chat`, { message: message, history: currentMessages });
            setMessages(response.data.history);
            setIsOnCooldown(5);
            const interval = setInterval(() => {
                setIsOnCooldown(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        catch (error) {
            console.log('Error sending message to AI assistant');
            setMessages(prev => [...prev, { role: "model", parts: [{ text: 'Error processing request' }] }]);
        }

        setIsLoading(false);
    }

    return (
        <div className='chatbox-container'>

            <div className={`chatbox ${isOpen ? 'open' : ''}`}>
                <div className='header-and-messages'>
                    <div className='chatbox-header'>
                        <h3 className='chatbox-header-wrapper'>AI Assistant</h3>
                    </div>

                    <div className='messages-container'>
                        {/* Introduction message, Gemini API does not accept model messaging first */}
                        <div key={1} className={`message model`}>
                            <p>Hello! How can I help you today? </p>
                        </div>
                        {messages.map((message, index) => ( index > 2 &&
                            <div key={index + 1} className={`message ${message.role}`}>
                                <ReactMarkdown style={{ background: "none" }}>
                                    {message.parts[0].text}
                                </ReactMarkdown>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="message bot-message loading">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}
                        <div ref={lastMessageRef} />
                    </div>
                </div>

                <form className='chatbox-input' onSubmit={handleEnter}>
                    <Form.Control className='chat-field' type='text' value={input} onChange={handleInput} placeholder='Message Your Assitant' disabled={isLoading} />
                    <Button type='submit' disabled={isLoading}>
                        Send
                    </Button>
                </form> 
            </div>
            <div className='button-section'>
                <VoiceChat mealInfo = {mealInfo} history = {messages} setHistory = {setMessages} cooldown = {isOnCooldown} setCooldown = {setIsOnCooldown} isloading = {isLoading} setIsLoading = {setIsLoading}/>
                <button className={`chatbox-toggle ${isOpen ? 'open' : ''}`} onClick={toggleChatbox}>
                    <MdAssistant style={{ background: "transparent" }} />
                </button>
            </div>
        </div>
    )
}

export default AiAssistantChatbox;

