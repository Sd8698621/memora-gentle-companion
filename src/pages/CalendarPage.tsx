
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell } from 'lucide-react';
import { format } from 'date-fns';

const CalendarPage = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  // Sample events data
  const events = [
    { date: new Date(2025, 3, 22), title: "Doctor's Appointment", time: "10:00 AM", type: "appointment" },
    { date: new Date(2025, 3, 22), title: "Heart Medication", time: "9:00 AM", type: "medication" },
    { date: new Date(2025, 3, 19), title: "Video Call with Family", time: "3:00 PM", type: "activity" },
    { date: new Date(2025, 3, 21), title: "Physical Therapy", time: "2:00 PM", type: "appointment" },
    { date: new Date(2025, 3, 23), title: "Community Center Visit", time: "11:00 AM", type: "activity" },
  ];

  // Function to highlight dates with events
  const getDayClassNames = (day: Date) => {
    const dateString = format(day, 'yyyy-MM-dd');
    const hasEvent = events.some(event => 
      format(event.date, 'yyyy-MM-dd') === dateString
    );
    
    return hasEvent ? "bg-memora-lightLavender text-memora-darkLavender font-medium" : undefined;
  };

  // Filter events for the selected date
  const selectedDateEvents = events.filter(
    event => date && format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
  );

  // Event type badge colors
  const typeBadge = {
    appointment: "bg-memora-sage text-foreground",
    medication: "bg-memora-lavender text-white",
    activity: "bg-memora-beige text-foreground",
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Calendar</h1>
        <p className="text-muted-foreground">View your schedule and upcoming events</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 h-fit">
          <CardHeader className="pb-3">
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              modifiersClassNames={{
                selected: "bg-memora-lavender text-primary-foreground",
              }}
              modifiers={{
                selected: date,
              }}
              getDayClassNames={getDayClassNames}
            />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>
              {date ? format(date, 'MMMM d, yyyy') : 'No Date Selected'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedDateEvents.map((event, i) => (
                  <div key={i} className="flex items-center p-3 border rounded-lg">
                    <div className="mr-4 p-2 rounded-full bg-accent">
                      <Bell className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">{event.time}</p>
                    </div>
                    <Badge className={typeBadge[event.type as keyof typeof typeBadge]}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <Bell className="mx-auto h-10 w-10 text-muted-foreground opacity-20" />
                <h3 className="mt-4 text-lg font-medium">No events scheduled</h3>
                <p className="text-muted-foreground">
                  {date 
                    ? `There are no events scheduled for ${format(date, 'MMMM d, yyyy')}.` 
                    : 'Select a date to view scheduled events.'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CalendarPage;
