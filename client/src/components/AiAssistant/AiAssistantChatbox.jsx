import React, { useState, useEffect, useRef } from 'react';
import './AiAssistantChatbox.css';
import axios from 'axios';
import config from '../../config/config';
import { MdAssistant } from 'react-icons/md';
import ReactMarkdown from 'react-markdown';

const AiAssistantChatbox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
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
                        {messages.map((message, index) => (
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
                    <input className='chat-field' type='text' value={input} onChange={handleInput} placeholder='Type a message...' disabled={isLoading} />
                    <button className='send-button' type='submit' disabled={isLoading}>
                        Send
                    </button>
                </form>
            </div>
            <div className='button-section'>
                <button className={`chatbox-toggle ${isOpen ? 'open' : ''}`} onClick={toggleChatbox}>
                    <MdAssistant style={{ background: "transparent" }} />
                </button>
            </div>
        </div>
    )
}

export default AiAssistantChatbox;