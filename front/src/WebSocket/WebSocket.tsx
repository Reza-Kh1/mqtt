import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:3001'); // آدرس NestJS

function WebSocket() {
    const [input, setInput] = useState('');
    const [log, setLog] = useState<string[]>([]);

    useEffect(() => {
        // اتصال موفق
        socket.on('connect', () => {
            console.log('✅ وصل شدیم به WebSocket');
            setLog((prev) => [...prev, '✅ اتصال برقرار شد']);
        });

        // دریافت پیام از سرور
        socket.on('server-message', (data: string) => {
            console.log('📥 پیام از سرور:', data);
            setLog((prev) => [...prev, '📥 سرور: ' + data]);
        });

        // قطع شدن
        socket.on('disconnect', () => {
            console.log('❌ اتصال قطع شد');
            setLog((prev) => [...prev, '❌ اتصال قطع شد']);
        });

        // پاک‌سازی
        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (input.trim()) {
            socket.emit('client-message', input);
            setLog((prev) => [...prev, '📤 شما: ' + input]);
            setInput('');
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>💬 WebSocket Chat</h2>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="پیام خود را بنویسید..."
                style={{ marginRight: 10 }}
            />
            <button onClick={sendMessage}>ارسال</button>

            <ul>
                {log.map((line, idx) => (
                    <li key={idx}>{line}</li>
                ))}
            </ul>
        </div>
    );
}

export default WebSocket;
