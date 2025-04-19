
import React, { useState, useRef, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ConversationBubble from '@/components/conversation/ConversationBubble';
import MessageInput from '@/components/conversation/MessageInput';
import { format } from 'date-fns';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

const welcomeMessages = [
  "Hello Maria, how are you feeling today?",
  "It's good to see you again. What would you like to talk about?",
  "Would you like to reminisce about your garden? I remember you told me the roses are blooming beautifully this year.",
  "Is there anything specific on your mind today that you'd like to discuss?"
];

const ConversationPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)],
      isUser: false,
      timestamp: format(new Date(), 'h:mm a')
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text: string) => {
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: format(new Date(), 'h:mm a')
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I understand how you feel. Would you like to tell me more about it?",
        "That's interesting! Can you share more details about that memory?",
        "I'm here to listen and support you. Feel free to share whatever's on your mind.",
        "Thank you for sharing that with me. How did that make you feel?",
        "I remember you mentioned something similar before. Would you like to explore that topic further?"
      ];

      const aiResponse: Message = {
        id: Date.now().toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: format(new Date(), 'h:mm a')
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold">Conversation</h1>
          <p className="text-muted-foreground">Chat with your Memora companion</p>
        </div>
        
        <div className="flex-1 overflow-y-auto mb-4 border border-border rounded-lg p-4 bg-card">
          <div className="space-y-4">
            {messages.map((message) => (
              <ConversationBubble
                key={message.id}
                message={message.text}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}
            {isLoading && (
              <div className="flex gap-2 animate-pulse-gentle ml-10">
                <div className="h-2 w-2 rounded-full bg-memora-lavender"></div>
                <div className="h-2 w-2 rounded-full bg-memora-lavender animation-delay-200"></div>
                <div className="h-2 w-2 rounded-full bg-memora-lavender animation-delay-400"></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <MessageInput 
          onSend={handleSendMessage} 
          placeholder="Type your message..." 
          disabled={isLoading} 
        />
      </div>
    </MainLayout>
  );
};

export default ConversationPage;
