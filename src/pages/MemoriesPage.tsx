
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import MemoryCard, { MemoryProps } from '@/components/memories/MemoryCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Search, MicOff, Mic } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MemoriesPage = () => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const memories: MemoryProps[] = [
    {
      id: '1',
      title: 'Summer at the Lake House',
      date: 'June 15, 2023',
      excerpt: 'The grandchildren loved swimming in the lake. Sarah caught her first fish and Michael built that impressive sandcastle...',
      audioUrl: '#',
    },
    {
      id: '2',
      title: 'My Wedding Day',
      date: 'May 8, 1975',
      excerpt: 'It was a beautiful spring day. I remember the flowers were in full bloom and the church was decorated with white roses and lilies...',
      audioUrl: '#',
    },
    {
      id: '3',
      title: 'First Day of Retirement',
      date: 'October 12, 2015',
      excerpt: 'After 40 years of teaching, it felt strange not to prepare for class. I started my garden project that day...',
      audioUrl: '#',
    },
    {
      id: '4',
      title: 'Christmas Traditions',
      date: 'December 25, 2022',
      excerpt: 'Every year we make grandmother\'s special cookie recipe. The children love decorating them and we always leave some for Santa...',
      audioUrl: '#',
    },
  ];

  const filteredMemories = searchQuery.trim() === "" 
    ? memories 
    : memories.filter(memory => 
        memory.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        memory.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleToggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      toast({
        title: "Recording started",
        description: "Share your memory now. Click stop when you're finished.",
      });
    } else {
      setIsRecording(false);
      toast({
        title: "Recording finished",
        description: "Your memory has been saved successfully.",
      });
    }
  };

  const handleCreateMemory = () => {
    toast({
      title: "Create a new memory",
      description: "You can start recording or typing your memory.",
    });
  };

  return (
    <MainLayout>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Memories</h1>
          <p className="text-muted-foreground">Capture and revisit your life stories</p>
        </div>
        <div className="flex gap-2">
          <Button variant={isRecording ? "destructive" : "outline"} onClick={handleToggleRecording}>
            {isRecording ? <MicOff className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}
            {isRecording ? "Stop Recording" : "Record Memory"}
          </Button>
          <Button onClick={handleCreateMemory}>
            <Plus className="mr-2 h-4 w-4" />
            Create Memory
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <Label htmlFor="search" className="sr-only">
          Search memories
        </Label>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            placeholder="Search memories..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredMemories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMemories.map((memory) => (
            <MemoryCard key={memory.id} {...memory} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Book className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
          <h3 className="mt-4 text-lg font-medium">No memories found</h3>
          <p className="text-muted-foreground">Try a different search term or create a new memory.</p>
        </div>
      )}
    </MainLayout>
  );
};

export default MemoriesPage;
