import React from 'react';
import { Home, Briefcase, User, Mail, FileText, Download, Moon, Sun, Github, Linkedin, Award, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { useTheme } from './ThemeProvider';
import { useNavigation } from './NavigationProvider';
import { useSidebar } from './SidebarProvider';
import { cn } from '@/lib/utils';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  badge?: string;
  count?: string;
  progress?: string;
  collapsed?: boolean;
}

function NavItem({ icon, label, active, onClick, badge, count, progress, collapsed }: NavItemProps) {
  if (collapsed) {
    return (
      <button
        onClick={onClick}
        className={cn(
          'group flex items-center justify-center p-3 rounded-xl text-sm font-medium transition-all duration-300 w-full relative overflow-hidden',
          active
            ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-foreground border border-blue-500/30 shadow-lg'
            : 'text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-muted/50 hover:to-muted/30 hover:border-white/10 border border-transparent'
        )}
        title={label}
      >
        <div className={cn(
          'p-1.5 rounded-lg transition-all duration-300 flex items-center justify-center',
          active 
            ? 'bg-blue-500/20 text-blue-500' 
            : 'text-muted-foreground group-hover:text-foreground group-hover:bg-white/10'
        )}>
          <span className="w-4 h-4 flex items-center justify-center">{icon}</span>
        </div>
        
        {/* Indicators for collapsed state */}
        {(badge || count) && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full animate-pulse" />
        )}
        {progress && (
          <div className="absolute bottom-1 left-1 right-1 h-0.5 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-1000"
              style={{ width: progress }}
            />
          </div>
        )}
        
        {active && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        'group flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 w-full relative overflow-hidden',
        active
          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-foreground border border-blue-500/30 shadow-lg'
          : 'text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-muted/50 hover:to-muted/30 hover:border-white/10 border border-transparent'
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn(
          'p-1.5 rounded-lg transition-all duration-300 flex items-center justify-center',
          active 
            ? 'bg-blue-500/20 text-blue-500' 
            : 'text-muted-foreground group-hover:text-foreground group-hover:bg-white/10'
        )}>
          <span className="w-4 h-4 flex items-center justify-center">{icon}</span>
        </div>
        <span className="font-medium">{label}</span>
      </div>
      
      <div className="flex items-center gap-2">
        {badge && (
          <span className="px-2 py-0.5 text-xs font-semibold bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full animate-pulse">
            {badge}
          </span>
        )}
        {count && (
          <span className="px-2 py-0.5 text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full">
            {count}
          </span>
        )}
        {progress && (
          <div className="flex items-center gap-1">
            <div className="w-8 h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-1000"
                style={{ width: progress }}
              />
            </div>
            <span className="text-xs text-muted-foreground">{progress}</span>
          </div>
        )}
      </div>
      
      {active && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl" />
      )}
    </button>
  );
}

export function Sidebar() {
  const { theme, toggleTheme } = useTheme();
  const { currentSection, setCurrentSection } = useNavigation();
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <aside className={cn(
      "fixed left-0 top-0 h-screen border-r border-border/50 bg-background/80 backdrop-blur-xl flex flex-col shadow-xl transition-all duration-300 overflow-y-auto scrollbar-hide",
      isCollapsed ? "w-[100px] p-4" : "w-[320px] p-6"
    )}>
      {/* Collapse Toggle */}
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg bg-gradient-to-br from-background/60 to-muted/20 border border-white/10 hover:border-white/20 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors duration-300" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors duration-300" />
          )}
        </button>
      </div>

      {/* Profile Section */}
      <div className="flex-1 space-y-3">
        <div className={cn(
          "flex flex-col items-center gap-4 pb-6 border-b border-border/50",
          isCollapsed && "gap-2 pb-4"
        )}>
          <div className="relative group">
            <div className={cn(
              "rounded-full overflow-hidden bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl",
              isCollapsed ? "w-12 h-12" : "w-32 h-32"
            )}>
              <img 
                src="/ESTEBAN.jpg" 
                alt="Marc Esteban" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Online Status Indicator */}
            <div className={cn(
              "absolute bg-background rounded-full flex items-center justify-center border-2 border-background",
              isCollapsed ? "-bottom-0.5 -right-0.5 w-4 h-4" : "-bottom-1 -right-1 w-6 h-6"
            )}>
              <div className={cn(
                "bg-green-500 rounded-full animate-pulse",
                isCollapsed ? "w-2 h-2" : "w-3 h-3"
              )} />
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          {!isCollapsed && (
            <div className="text-center space-y-2">
              <h2 className="text-lg font-bold text-foreground">Marc Esteban</h2>
              <p className="text-sm text-muted-foreground font-medium">Full-Stack Web Developer</p>
              
              {/* Achievement Badges */}
              <div className="flex gap-2 justify-center mt-3">
                <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30">
                  <Calendar className="w-3 h-3 text-blue-500" />
                  <span className="text-xs font-semibold text-blue-500">3+ Years</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30">
                  <Award className="w-3 h-3 text-green-500" />
                  <span className="text-xs font-semibold text-green-500">4+ Projects</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Dark Mode Toggle under Profile */}
          <div className="w-full">
            {isCollapsed ? (
              <div className="flex justify-center">
                <button
                  onClick={toggleTheme}
                  className="p-3 rounded-xl bg-gradient-to-r from-muted/30 to-muted/10 border border-white/10 hover:border-white/20 transition-all duration-300"
                  title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                >
                  {theme === 'light' ? (
                    <Sun className="w-4 h-4 text-yellow-500" />
                  ) : (
                    <Moon className="w-4 h-4 text-blue-400" />
                  )}
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-muted/30 to-muted/10 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-background/60 to-muted/20 border border-white/10">
                    {theme === 'light' ? (
                      <Sun className="w-4 h-4 text-yellow-500" />
                    ) : (
                      <Moon className="w-4 h-4 text-blue-400" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
                  </span>
                </div>
                <Switch 
                  checked={theme === 'dark'} 
                  onCheckedChange={toggleTheme}
                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-500"
                />
              </div>
            )}
          </div>
        </div>


        {/* Navigation */}
        <nav className="space-y-2">
          <NavItem 
            icon={<Home />} 
            label="About Me" 
            active={currentSection === 'dashboard'}
            onClick={() => setCurrentSection('dashboard')}
            collapsed={isCollapsed}
          />
          <NavItem 
            icon={<Briefcase />} 
            label="Projects" 
            active={currentSection === 'projects'}
            onClick={() => setCurrentSection('projects')}
            count="4"
            collapsed={isCollapsed}
          />
          <NavItem 
            icon={<User />} 
            label="Skills" 
            active={currentSection === 'about'}
            onClick={() => setCurrentSection('about')}
            progress="85%"
            collapsed={isCollapsed}
          />
          <NavItem 
            icon={<Mail />} 
            label="Contact" 
            active={currentSection === 'contact'}
            onClick={() => setCurrentSection('contact')}
            collapsed={isCollapsed}
          />
          <NavItem 
            icon={<Github />} 
            label="GitHub" 
            active={currentSection === 'github'}
            onClick={() => setCurrentSection('github')}
            collapsed={isCollapsed}
          />
        </nav>


        {/* Social Links Quick Access */}
        {!isCollapsed && (
          <div className="pt-4 border-t border-border/50">
            <div className="flex items-center justify-center gap-3">
              <a 
                href="https://github.com/MarcEsteban04" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-2 rounded-lg bg-gradient-to-br from-background/60 to-muted/20 border border-white/10 hover:border-white/20 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Github className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
              </a>
              <a 
                href="https://www.linkedin.com/in/marc-esteban/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-2 rounded-lg bg-gradient-to-br from-background/60 to-muted/20 border border-white/10 hover:border-white/20 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Linkedin className="w-4 h-4 text-muted-foreground group-hover:text-blue-500 transition-colors duration-300" />
              </a>
              <a 
                href="mailto:marcdelacruzesteban@gmail.com"
                className="group p-2 rounded-lg bg-gradient-to-br from-background/60 to-muted/20 border border-white/10 hover:border-white/20 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Mail className="w-4 h-4 text-muted-foreground group-hover:text-green-500 transition-colors duration-300" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Status Footer */}
      <div className="mt-6">
        {isCollapsed ? (
          <div className="flex justify-center">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" title="Available for opportunities" />
          </div>
        ) : (
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Available for opportunities</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
