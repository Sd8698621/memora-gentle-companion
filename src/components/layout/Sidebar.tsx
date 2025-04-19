
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Calendar, Heart, MessageCircle, Book, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const menuItems = [
  { 
    path: '/', 
    label: 'Dashboard', 
    icon: <Heart className="h-5 w-5" /> 
  },
  { 
    path: '/conversation', 
    label: 'Conversation', 
    icon: <MessageCircle className="h-5 w-5" /> 
  },
  { 
    path: '/reminders', 
    label: 'Reminders', 
    icon: <Bell className="h-5 w-5" /> 
  },
  { 
    path: '/memories', 
    label: 'Memories', 
    icon: <Book className="h-5 w-5" /> 
  },
  { 
    path: '/calendar', 
    label: 'Calendar', 
    icon: <Calendar className="h-5 w-5" /> 
  },
];

const Sidebar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  return (
    <SidebarComponent defaultCollapsed={isMobile} className="border-r border-border">
      <SidebarHeader className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-memora-lavender flex items-center justify-center">
            <Heart className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-semibold">Memora</h1>
        </div>
        <SidebarTrigger />
      </SidebarHeader>

      <SidebarContent className="px-2 py-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton asChild className={cn(
                "w-full justify-start gap-2",
                location.pathname === item.path && "bg-accent text-accent-foreground"
              )}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-memora-sage" />
          <span className="text-sm">User Profile</span>
        </div>
      </SidebarFooter>
    </SidebarComponent>
  );
};

export default Sidebar;
