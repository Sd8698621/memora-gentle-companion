
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ReminderItem, { ReminderProps } from '@/components/reminders/ReminderItem';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const RemindersPage = () => {
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
    {
      id: '4',
      title: 'Heart Medication',
      time: '8:00 PM',
      type: 'medication',
      completed: false,
      onComplete: () => {},
    },
    {
      id: '5',
      title: 'Call Grandchildren',
      time: 'Tomorrow, 5:00 PM',
      type: 'activity',
      completed: false,
      onComplete: () => {},
    },
    {
      id: '6',
      title: 'Physical Therapy',
      time: 'Tomorrow, 10:00 AM',
      type: 'appointment',
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

  const todayReminders = remindersWithHandlers.filter(r => !r.time.includes('Tomorrow'));
  const upcomingReminders = remindersWithHandlers.filter(r => r.time.includes('Tomorrow'));

  const handleAddReminder = () => {
    toast({
      title: "Feature coming soon",
      description: "The ability to add new reminders will be available in the next update.",
    });
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Reminders</h1>
          <p className="text-muted-foreground">Manage your medication, appointments, and activities</p>
        </div>
        <Button onClick={handleAddReminder}>
          <Plus className="mr-2 h-4 w-4" />
          Add Reminder
        </Button>
      </div>

      <Tabs defaultValue="today" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="today">
          {todayReminders.filter(r => !r.completed).length > 0 ? (
            <div className="space-y-3">
              {todayReminders.filter(r => !r.completed).map((reminder) => (
                <ReminderItem key={reminder.id} {...reminder} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Bell className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
              <h3 className="mt-4 text-lg font-medium">No reminders for today</h3>
              <p className="text-muted-foreground">All reminders for today have been completed.</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="upcoming">
          {upcomingReminders.length > 0 ? (
            <div className="space-y-3">
              {upcomingReminders.map((reminder) => (
                <ReminderItem key={reminder.id} {...reminder} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Bell className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
              <h3 className="mt-4 text-lg font-medium">No upcoming reminders</h3>
              <p className="text-muted-foreground">You have no upcoming reminders scheduled.</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="completed">
          {remindersWithHandlers.filter(r => r.completed).length > 0 ? (
            <div className="space-y-3">
              {remindersWithHandlers.filter(r => r.completed).map((reminder) => (
                <ReminderItem key={reminder.id} {...reminder} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Bell className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
              <h3 className="mt-4 text-lg font-medium">No completed reminders</h3>
              <p className="text-muted-foreground">You haven't completed any reminders yet.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default RemindersPage;
