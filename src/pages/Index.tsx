
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import StatCard from '@/components/dashboard/StatCard';
import ReminderItem, { ReminderProps } from '@/components/reminders/ReminderItem';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Bell, Calendar, MessageCircle, Book, ChevronRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  const [reminders, setReminders] = useState<ReminderProps[]>([
    {
      id: '1',
      title: 'Take Blood Pressure Medication',
      time: '9:00 AM',
      type: 'medication',
      completed: false,
      onComplete: () => {},
    },
    {
      id: '2',
      title: 'Doctor Appointment',
      time: '11:30 AM',
      type: 'appointment',
      completed: false,
      onComplete: () => {},
    },
    {
      id: '3',
      title: 'Evening Walk',
      time: '6:00 PM',
      type: 'activity',
      completed: false,
      onComplete: () => {},
    },
  ]);

  const handleCompleteReminder = (id: string) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === id 
          ? { ...reminder, completed: !reminder.completed } 
          : reminder
      )
    );
    
    const reminder = reminders.find(r => r.id === id);
    if (reminder && !reminder.completed) {
      toast({
        title: "Reminder completed",
        description: `"${reminder.title}" marked as done.`,
      });
    }
  };

  // Update the reminders to include the completion handler
  const remindersWithHandlers = reminders.map(reminder => ({
    ...reminder,
    onComplete: handleCompleteReminder,
  }));

  const currentDate = new Date();
  const formattedDate = format(currentDate, 'EEEE, MMMM d, yyyy');

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-semibold">Hello, Maria</h1>
          <p className="text-muted-foreground">{formattedDate}</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-memora-sage flex items-center justify-center">
          <span className="font-medium text-xl">M</span>
        </div>
      </div>

      <section className="grid md:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Today's Reminders" 
          value={remindersWithHandlers.length}
          description={`${remindersWithHandlers.filter(r => r.completed).length} completed`}
          icon={<Bell className="h-5 w-5" />} 
        />
        <StatCard 
          title="Conversations" 
          value="12" 
          description="Last conversation: 1 hour ago"
          icon={<MessageCircle className="h-5 w-5" />} 
        />
        <StatCard 
          title="Memories" 
          value="8" 
          description="Last memory: 2 days ago"
          icon={<Book className="h-5 w-5" />} 
        />
        <StatCard 
          title="Upcoming Events" 
          value="3" 
          description="Next event: Tomorrow"
          icon={<Calendar className="h-5 w-5" />} 
        />
      </section>

      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Today's Reminders</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/reminders" className="flex items-center">
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="space-y-3">
          {remindersWithHandlers.map((reminder) => (
            <ReminderItem
              key={reminder.id}
              {...reminder}
            />
          ))}
          {remindersWithHandlers.length === 0 && (
            <p className="text-muted-foreground text-center py-4">No reminders for today.</p>
          )}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Continue Conversation</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/conversation" className="flex items-center">
              New Conversation
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="bg-card rounded-lg p-5 border border-border">
          <p className="text-muted-foreground">Continue your conversation from earlier today...</p>
          <div className="mt-3 text-foreground">
            "Tell me again about that summer trip to the lake house with the grandchildren..."
          </div>
          <Button className="mt-4" asChild>
            <Link to="/conversation">
              <MessageCircle className="mr-2 h-4 w-4" />
              Continue Conversation
            </Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

export default Dashboard;
