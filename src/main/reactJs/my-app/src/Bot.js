import React, { useState } from 'react';
import axios from 'axios';

function Bot(props) {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const apiUrl = 'https://cfsfiehygx.apigw.ntruss.com/custom/v1/11008/5a5ad3926f00f299369d8947dbde9e7b217a950bed8d45eff49a80e35dac4891'; // 클로바 챗봇 API 엔드포인트 URL
    const apiId = 'pkwXGIJal3ojKdJrk32V'; // 클로바 챗봇 API ID
    const apiKey = 'Bk6oaFq0Z9Nchg4Fa0MqdjZQvnmx20FgVZoeRWc2'; // 클로바 챗봇 API 키

    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userInput.trim() !== '') {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: userInput, isUser: true },
            ]);
            setUserInput('');

            try {
                const requestData = {
                    message: {
                        text: userInput,
                    },
                };

                const response = await axios.post(apiUrl, requestData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-NCP-APIGW-API-KEY-ID': apiId,
                        'X-NCP-APIGW-API-KEY': apiKey,
                    },
                });

                if (response.status === 200) {
                    const data = response.data;
                    const botResponse = data.message.text;
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        { text: botResponse, isUser: false },
                    ]);
                } else {
                    console.error('Error:', response.status);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div>
            <div className="chatbox">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={message.isUser ? 'user-message' : 'bot-message'}
                    >
                        {message.text}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Type your message"
                    value={userInput}
                    onChange={handleUserInput}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default Bot;