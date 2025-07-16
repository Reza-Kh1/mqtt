import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

export default function WebSocket() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<string[]>([]);
    useEffect(() => {
        socket.on('message', (msg: string) => {
            setMessages(prev => [...prev, msg]);
        });

        return () => {
            socket.off('message');
        };
    }, []);

    const sendMessage = () => {
        if (input.trim() !== '') {
            socket.emit('message', input);
            setInput('');
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>WebSocket Chat</h1>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
            <div style={{ marginTop: 20 }}>
                <h3>Messages:</h3>
                <ul>
                    {messages.map((msg, i) => (
                        <li key={i}>{msg}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
