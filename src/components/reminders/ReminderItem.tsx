
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ReminderProps {
  id: string;
  title: string;
  time: string;
  type: 'medication' | 'appointment' | 'activity';
  completed?: boolean;
  onComplete: (id: string) => void;
}

const typeColors = {
  medication: 'bg-memora-lavender text-white',
  appointment: 'bg-memora-sage text-foreground',
  activity: 'bg-memora-beige text-foreground',
};

const ReminderItem = ({ id, title, time, type, completed, onComplete }: ReminderProps) => {
  return (
    <Card className={cn("mb-3", completed && "opacity-60")}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn("p-2 rounded-full", typeColors[type])}>
              <Bell className="h-4 w-4" />
            </div>
            <div>
              <h3 className={cn("font-medium", completed && "line-through")}>{title}</h3>
              <p className="text-sm text-muted-foreground">{time}</p>
            </div>
          </div>
          <Button 
            size="sm" 
            variant={completed ? "outline" : "default"}
            className={cn("rounded-full h-8 w-8 p-0", completed && "bg-green-100 hover:bg-green-200 border-green-200")}
            onClick={() => onComplete(id)}
          >
            <Check className={cn("h-4 w-4", completed && "text-green-600")} />
            <span className="sr-only">Mark as complete</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReminderItem;
