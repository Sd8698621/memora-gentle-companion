
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle } from 'lucide-react';

interface MessageInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const MessageInput = ({ onSend, placeholder = "Type a message...", disabled = false }: MessageInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex flex-col gap-2 bg-background border border-border rounded-lg p-3"
    >
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={placeholder}
        className="min-h-[80px] resize-none text-base focus-visible:ring-memora-lavender"
        disabled={disabled}
      />
      <div className="flex justify-end">
        <Button 
          type="submit" 
          size="sm" 
          disabled={!message.trim() || disabled}
          className="gap-1"
        >
          <MessageCircle className="h-4 w-4" />
          Send
        </Button>
      </div>
    </form>
  );
};

export default MessageInput;
