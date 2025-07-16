// App.tsx یا App.jsx
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001'); // آدرس WebSocket NestJS

function WebSocket() {
    const [input, setInput] = useState('');
    const [log, setLog] = useState<string[]>([]);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('✅ وصل شدیم به WebSocket');
        });

        socket.on('server-to-client', (msg: string) => {
            console.log('📨 پیام از سرور:', msg);
            setLog((prev) => [...prev, `از سرور: ${msg}`]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (input.trim() !== '') {
            socket.emit('client-to-server', input);
            setLog((prev) => [...prev, `ارسال شد: ${input}`]);
            setInput('');
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>🚗 WebSocket تست</h2>
            <input
                placeholder="پیامی بنویس..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendMessage}>📤 ارسال</button>

            <ul>
                {log.map((line, idx) => (
                    <li key={idx}>{line}</li>
                ))}
            </ul>
        </div>
    );
}

export default WebSocket;
