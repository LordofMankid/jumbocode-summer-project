import { ChatProps } from '@/lib/api/chat';
import React, { useCallback, useEffect, useState } from 'react';

export const Chatbox = () => {
  const [messages, setMessages] = useState<ChatProps[]>([]);
  const [inputValue, setInputValue] = useState('');

  // Fetch messages from the API
  const fetchMessages = useCallback(async () => {
    try {
      const response = await fetch('/api/chat', {
        method: 'GET'
      });

      if (response.ok) {
        const fetchedMessages: ChatProps[] = await response.json();
        setMessages(fetchedMessages);
      } else {
        console.error('Failed to fetch messages');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  }, []);

  // Fetch messages when the component mounts
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleSend = useCallback(async () => {
    console.log(inputValue);
    if (inputValue.trim()) {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ content: inputValue, role: 'user' })
        });

        if (response.ok) {
          const newMessage: ChatProps = await response.json();
          setMessages([...messages, newMessage]);
        } else {
          console.error('Failed to send message');
        }
      } catch (error) {
        console.error('An error occurred', error);
      }

      setInputValue('');
    }
  }, [inputValue, messages]);

  return (
    <div>
      <div className="max-w-md mx-auto mt-8 shadow-lg rounded-lg bg-white p-4">
        <div className="h-64 overflow-y-scroll border-b-2 border-gray-200 p-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`my-2 p-2 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-100 self-end'
                  : 'bg-gray-100 self-start'
              }`}
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className="flex items-center mt-4">
          <input
            type="text"
            className="flex-grow border-2 border-gray-200 rounded-lg p-2"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            className="ml-2 bg-blue-500 text-white rounded-lg px-4 py-2"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
