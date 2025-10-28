import React from 'react';
import { ThemeProvider } from './ThemeProvider';
import { NavigationProvider } from './NavigationProvider';
import { SidebarProvider } from './SidebarProvider';
import { DashboardLayout } from './DashboardLayout';

export function Dashboard() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <NavigationProvider>
          <DashboardLayout />
        </NavigationProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
}
