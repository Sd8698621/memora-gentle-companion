
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ConversationBubbleProps {
  message: string;
  isUser?: boolean;
  timestamp: string;
}

const ConversationBubble = ({ message, isUser = false, timestamp }: ConversationBubbleProps) => {
  return (
    <div className={cn(
      "flex w-full mb-4 animate-fade-in",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "flex gap-2 max-w-[85%]",
        isUser ? "flex-row-reverse" : "flex-row"
      )}>
        <Avatar className="h-8 w-8">
          {isUser ? (
            <>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-memora-sage">U</AvatarFallback>
            </>
          ) : (
            <>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-memora-lavender text-white">M</AvatarFallback>
            </>
          )}
        </Avatar>
        
        <div className="flex flex-col">
          <div className={cn(
            "rounded-2xl px-4 py-3 text-base",
            isUser ? "bg-memora-lavender text-white rounded-tr-none" : "bg-accent rounded-tl-none"
          )}>
            {message}
          </div>
          <span className={cn(
            "text-xs text-muted-foreground mt-1",
            isUser ? "text-right" : "text-left"
          )}>
            {timestamp}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ConversationBubble;
