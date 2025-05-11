import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            type: 'bot',
            content: '👋 Hi! I\'m your FixMyNeighborhood assistant. How can I help you today?',
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        // Add user message
        setMessages(prev => [...prev, { type: 'user', content: inputValue }]);

        // Simulate bot response
        setTimeout(() => {
            const botResponse = getBotResponse(inputValue);
            setMessages(prev => [...prev, { type: 'bot', content: botResponse }]);
        }, 1000);

        setInputValue('');
    };

    const getBotResponse = (message) => {
        const lowerMessage = message.toLowerCase();

        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return 'Hello! How can I assist you with reporting an issue today?';
        }

        if (lowerMessage.includes('how') && lowerMessage.includes('report')) {
            return 'To report an issue:\n1. Fill out the description\n2. Upload an image\n3. Allow location access\n4. Click Submit';
        }

        if (lowerMessage.includes('image') || lowerMessage.includes('photo')) {
            return 'You can upload any image that clearly shows the issue. Supported formats: JPG, PNG, GIF. Maximum size: 5MB.';
        }

        if (lowerMessage.includes('location')) {
            return 'We need your location to accurately report the issue. Please allow location access when prompted.';
        }

        if (lowerMessage.includes('thank')) {
            return 'You\'re welcome! Let me know if you need any other assistance.';
        }

        if (lowerMessage.includes('help')) {
            return 'I can help you with:\n- How to report an issue\n- Image requirements\n- Location access\n- General questions';
        }

        return 'I\'m not sure about that. You can ask me about how to report an issue, image requirements, or location access.';
    };

    return (
        <div className="chatbot-container">
            {!isOpen && (
                <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
                    💬 Need Help?
                </button>
            )}

            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <h3>FixMyNeighborhood Assistant</h3>
                        <button className="close-button" onClick={() => setIsOpen(false)}>
                            ×
                        </button>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`message ${message.type === 'bot' ? 'bot' : 'user'}`}
                            >
                                {message.type === 'bot' && (
                                    <div className="bot-avatar">🤖</div>
                                )}
                                <div className="message-content">
                                    {message.content.split('\n').map((line, i) => (
                                        <p key={i}>{line}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSubmit} className="chatbot-input">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type your message..."
                            autoFocus
                        />
                        <button type="submit">Send</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatBot; 