
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, Play } from 'lucide-react';

export interface MemoryProps {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  audioUrl?: string;
}

const MemoryCard = ({ title, date, excerpt, audioUrl }: MemoryProps) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="h-8 w-8 rounded-full bg-memora-lightLavender flex items-center justify-center">
            <Book className="h-4 w-4 text-memora-darkLavender" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{date}</p>
      </CardHeader>
      <CardContent className="py-2 flex-1">
        <p className="text-sm line-clamp-3">{excerpt}</p>
      </CardContent>
      <CardFooter className="pt-0">
        {audioUrl && (
          <Button variant="outline" size="sm" className="w-full">
            <Play className="h-4 w-4 mr-1" />
            Play Memory
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MemoryCard;
