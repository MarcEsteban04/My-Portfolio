import React, { useState } from 'react';
import { Home, Briefcase, User, Mail, Menu, X, Download, Moon, Sun, Github, Linkedin, Award, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { useTheme } from './ThemeProvider';
import { useNavigation } from './NavigationProvider';
import { cn } from '@/lib/utils';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavItem({ icon, label, active, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 w-full',
        active
          ? 'bg-muted text-foreground'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
      )}
    >
      <span className="w-4 h-4">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { currentSection, setCurrentSection } = useNavigation();

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-background border-b border-border z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10 shadow-lg">
              <img 
                src="/ESTEBAN.jpg" 
                alt="Marc Esteban" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Online Status Indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-background rounded-full flex items-center justify-center border-2 border-background">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
          </div>
          <div>
            <h2 className="text-sm font-bold text-foreground">Marc Esteban</h2>
            <p className="text-xs text-muted-foreground">Full-Stack Web Developer</p>
            <div className="flex gap-1 mt-1">
              <div className="flex items-center gap-1 px-1.5 py-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30">
                <Calendar className="w-2 h-2 text-blue-500" />
                <span className="text-xs font-semibold text-blue-500">3+</span>
              </div>
              <div className="flex items-center gap-1 px-1.5 py-0.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30">
                <Award className="w-2 h-2 text-green-500" />
                <span className="text-xs font-semibold text-green-500">4+</span>
              </div>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          'lg:hidden fixed top-16 left-0 h-[calc(100vh-4rem)] w-[280px] bg-background border-r border-border z-40 p-6 flex flex-col justify-between transition-transform duration-300',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="space-y-6">
          {/* Navigation */}
          <nav className="space-y-1">
            <NavItem 
              icon={<Home />} 
              label="About Me" 
              active={currentSection === 'dashboard'}
              onClick={() => {
                setCurrentSection('dashboard');
                setIsOpen(false);
              }}
            />
            <NavItem 
              icon={<Briefcase />} 
              label="Projects" 
              active={currentSection === 'projects'}
              onClick={() => {
                setCurrentSection('projects');
                setIsOpen(false);
              }}
            />
            <NavItem 
              icon={<User />} 
              label="Skills" 
              active={currentSection === 'about'}
              onClick={() => {
                setCurrentSection('about');
                setIsOpen(false);
              }}
            />
            <NavItem 
              icon={<Github />} 
              label="GitHub" 
              active={currentSection === 'github'}
              onClick={() => {
                setCurrentSection('github');
                setIsOpen(false);
              }}
            />
            <NavItem 
              icon={<Mail />} 
              label="Contact" 
              active={currentSection === 'contact'}
              onClick={() => {
                setCurrentSection('contact');
                setIsOpen(false);
              }}
            />
          </nav>

        </div>

        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-muted/50">
          <div className="flex items-center gap-2">
            {theme === 'light' ? (
              <Sun className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Moon className="w-4 h-4 text-muted-foreground" />
            )}
            <span className="text-sm font-medium text-foreground">Dark Mode</span>
          </div>
          <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
        </div>
      </aside>
    </>
  );
}
