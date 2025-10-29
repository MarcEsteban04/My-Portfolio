import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ScrollAnimation } from './ScrollAnimation';
import { Code, Database, Globe, Palette, Server, Zap, TrendingUp, Award, BookOpen, Target, Users, CheckCircle, Clock, Star } from 'lucide-react';

function TechIcon({ name, size = 48 }: { name: string; size?: number }) {
  const iconComponents: { [key: string]: React.ReactElement } = {
    html5: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0z" fill="#E34F26"/>
        <path d="M12 22.18l6.91-1.92L20.09 2H12v20.18z" fill="#FF5722"/>
        <path d="M7.5 8h9l-.5 4H8.5l.25 2h6.75l-.75 6L12 21.5l-2.5-.75L9.25 18H7l.5 4.25L12 23.5l4.5-1.25L17.5 12H6.5L7.5 8z" fill="white"/>
      </svg>
    ),
    css3: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M2 3h20l-2 18-8-2.5L4 21L2 3z" fill="#1572B6"/>
        <path d="M12 5v16.5l6.5-2L20 5H12z" fill="#33A9DC"/>
        <path d="M7.5 8h9l-.5 4H8.5l.25 2h6.75l-.75 6L12 21.5l-2.5-.75L9.25 18H7l.5 4.25L12 23.5l4.5-1.25L17.5 12H6.5L7.5 8z" fill="white"/>
      </svg>
    ),
    javascript: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" fill="#F7DF1E"/>
        <path d="M7.5 18c0 1.5-1 2.5-2.5 2.5S2.5 19.5 2.5 18s1-2.5 2.5-2.5S7.5 16.5 7.5 18zm9-6c0 3-1.5 6-4.5 6s-4.5-3-4.5-6 1.5-6 4.5-6 4.5 3 4.5 6z" fill="#323330"/>
      </svg>
    ),
    react: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="2.2" fill="#61DAFB"/>
        <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1" fill="none"/>
        <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(120 12 12)"/>
      </svg>
    ),
    nodejs: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7v10l10 5 10-5V7l-10-5z" fill="#339933"/>
        <path d="M12 2v20l10-5V7l-10-5z" fill="#66BB6A"/>
      </svg>
    ),
    php: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="12" rx="11" ry="6" fill="#777BB4"/>
        <ellipse cx="12" cy="12" rx="9" ry="4.5" fill="#8892BF"/>
        <path d="M6.5 10.5h1.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5H7v1h-.5v-4zm8 0h1.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5H15v1h-.5v-4zm-6 0h.5v2h1v-2h.5v4h-.5v-1.5h-1v1.5h-.5v-4z" fill="white"/>
        <path d="M7 11v1h1c.3 0 .5-.2.5-.5s-.2-.5-.5-.5H7zm8 0v1h1c.3 0 .5-.2.5-.5s-.2-.5-.5-.5H15z" fill="#777BB4"/>
      </svg>
    ),
    mysql: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.274.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153z" fill="#00758F"/>
        <path d="M18.79 15.29h-.36c-1.8 0-3.26-.32-4.34-1.19-.54-.43-.81-1.08-.81-1.94 0-.65.18-1.22.54-1.71.36-.49.86-.87 1.5-1.14.64-.27 1.38-.41 2.22-.41.84 0 1.58.14 2.22.41.64.27 1.14.65 1.5 1.14.36.49.54 1.06.54 1.71 0 .86-.27 1.51-.81 1.94-1.08.87-2.54 1.19-4.34 1.19z" fill="#E48E00"/>
        <path d="M12 21c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9zm0-16c-3.86 0-7 3.14-7 7s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7z" fill="#00758F"/>
        <path d="M8.5 14.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm7 0c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5z" fill="#00758F"/>
      </svg>
    ),
    mongodb: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296 5.401-3.9 5.401-10.91-.068-.44-.179-.735-.109-1.465z" fill="#47A248"/>
        <path d="M12.5 22.118c.093-.03.19-.064.271-.118.085-.058.15-.135.196-.218l.044-.083c.196-.065.182-.497.182-.497-.021-.016-.04-.025-.058-.035-.302-.147-.62-.22-.918-.383-.31-.171-.579-.45-.579-.45s-.297.279-.607.45c-.298.163-.616.236-.918.383-.018.01-.037.019-.058.035 0 0-.014.432.182.497l.044.083c.046.083.111.16.196.218.081.054.178.088.271.118z" fill="#4DB33D"/>
      </svg>
    ),
    git: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M21.62 11.11L12.89 2.38a1.5 1.5 0 0 0-2.12 0L8.5 4.65l2.62 2.62a1.8 1.8 0 0 1 1.91 1.91l2.52 2.52a1.8 1.8 0 1 1-1.07 1.07l-2.35-2.35v6.18a1.8 1.8 0 1 1-1.44-.72V9.77a1.8 1.8 0 0 1-.97-2.36L6.5 4.79 2.38 8.91a1.5 1.5 0 0 0 0 2.12l8.73 8.73a1.5 1.5 0 0 0 2.12 0l8.39-8.39a1.5 1.5 0 0 0 0-2.12z" fill="#F05032"/>
      </svg>
    ),
    tailwindcss: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.61 7.15 14.47 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.61 13.15 9.47 12 7 12z" fill="#06B6D4"/>
      </svg>
    ),
    astro: (
      <svg width={size} height={size} viewBox="0 0 128 128" fill="none">
        <path d="M50.4 78.5a75.1 75.1 0 0 0-28.5 6.9l24.2-65.7c.7-2 1.9-3.2 3.4-3.2h29c1.5 0 2.7 1.2 3.4 3.2l24.2 65.7s-11.6-7-28.5-7L67 45.5c-.4-1.7-1.6-2.8-2.9-2.8-1.3 0-2.5 1.1-2.9 2.7L50.4 78.5Zm-1.1 28.2Zm-4.2-20.2c-2 6.6-.6 15.8 4.2 20.2a17.5 17.5 0 0 1 .2-.7 5.5 5.5 0 0 1 5.7-4.5c2.8.1 4.3 1.5 4.7 4.7.2 1.1.2 2.3.2 3.5v.4c0 2.7.7 5.2 2.2 7.4a13 13 0 0 0 5.7 4.9v-.3l-.2-.3c-1.8-5.6-.5-9.5 4.4-12.8l1.5-1a73 73 0 0 0 3.2-2.2 16 16 0 0 0 6.8-11.4c.3-2 .1-4-.6-6l-.8.6-1.6 1a37 37 0 0 1-22.4 2.7c-5-.7-9.7-2-13.2-6.2Z" fill="#FF5D01"/>
      </svg>
    ),
    express: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" fill="#000000"/>
        <path d="M4 8h16M4 12h16M4 16h16" stroke="white" strokeWidth="2"/>
      </svg>
    ),
    api: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#6366F1"/>
        <path d="M8 12h8M12 8v8" stroke="white" strokeWidth="2"/>
        <circle cx="8" cy="12" r="2" fill="white"/>
        <circle cx="16" cy="12" r="2" fill="white"/>
      </svg>
    ),
    shadcn: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" fill="#000000"/>
        <path d="M4 4h16v16H4V4z" stroke="white" strokeWidth="2" fill="none"/>
        <path d="M8 8h8v8H8V8z" fill="white"/>
      </svg>
    ),
    reui: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#14B8A6"/>
        <rect x="8" y="8" width="8" height="8" fill="white" rx="2"/>
      </svg>
    ),
    materialui: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7v10l10 5 10-5V7l-10-5z" fill="#0081CB"/>
        <path d="M12 2v20l10-5V7l-10-5z" fill="#00B0FF"/>
        <circle cx="12" cy="12" r="4" fill="white"/>
      </svg>
    )
  };
  
  return iconComponents[name] || (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" fill="#6B7280" rx="4"/>
      <text x="12" y="16" textAnchor="middle" fill="white" fontSize="8">?</text>
    </svg>
  );
}

interface SkillData {
  name: string;
  level: number;
  category: string;
  icon: string;
  color: string;
  projects: number;
  yearsExp: number;
  endorsed: boolean;
}

interface LearningPathItem {
  skill: string;
  progress: number;
  timeframe: string;
  status: 'completed' | 'in-progress' | 'planned';
}

function RadarChart({ skills }: { skills: SkillData[] }) {
  const [animatedLevels, setAnimatedLevels] = useState<number[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedLevels(skills.map(skill => skill.level));
    }, 500);
    return () => clearTimeout(timer);
  }, [skills]);

  const centerX = 150;
  const centerY = 150;
  const maxRadius = 120;
  const numSkills = skills.length;

  const getPointCoordinates = (index: number, level: number) => {
    const angle = (index * 2 * Math.PI) / numSkills - Math.PI / 2;
    const radius = (level / 100) * maxRadius;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    };
  };

  const gridLevels = [20, 40, 60, 80, 100];

  return (
    <div className="relative w-80 h-80 mx-auto">
      <svg width="300" height="300" className="absolute inset-0">
        {/* Grid circles */}
        {gridLevels.map((level, index) => (
          <circle
            key={level}
            cx={centerX}
            cy={centerY}
            r={(level / 100) * maxRadius}
            fill="none"
            stroke="rgba(148, 163, 184, 0.2)"
            strokeWidth="1"
          />
        ))}

        {/* Grid lines */}
        {skills.map((_, index) => {
          const angle = (index * 2 * Math.PI) / numSkills - Math.PI / 2;
          const endX = centerX + maxRadius * Math.cos(angle);
          const endY = centerY + maxRadius * Math.sin(angle);
          return (
            <line
              key={index}
              x1={centerX}
              y1={centerY}
              x2={endX}
              y2={endY}
              stroke="rgba(148, 163, 184, 0.2)"
              strokeWidth="1"
            />
          );
        })}

        {/* Skill area */}
        <polygon
          points={animatedLevels.map((level, index) => {
            const point = getPointCoordinates(index, level);
            return `${point.x},${point.y}`;
          }).join(' ')}
          fill="rgba(59, 130, 246, 0.2)"
          stroke="rgba(59, 130, 246, 0.8)"
          strokeWidth="2"
          className="transition-all duration-1000 ease-out"
        />

        {/* Skill points */}
        {animatedLevels.map((level, index) => {
          const point = getPointCoordinates(index, level);
          return (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="rgba(59, 130, 246, 1)"
              className="transition-all duration-1000 ease-out"
            />
          );
        })}
      </svg>

      {/* Skill labels */}
      {skills.map((skill, index) => {
        const angle = (index * 2 * Math.PI) / numSkills - Math.PI / 2;
        const labelRadius = maxRadius + 30;
        const x = centerX + labelRadius * Math.cos(angle);
        const y = centerY + labelRadius * Math.sin(angle);
        
        return (
          <div
            key={skill.name}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 text-xs font-semibold text-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md border border-white/10"
            style={{ left: x, top: y }}
          >
            {skill.name}
          </div>
        );
      })}
    </div>
  );
}

function SkillHexagon({ skill, index }: { skill: SkillData; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative group cursor-pointer flex flex-col items-center p-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Just the icon */}
      <div className={`transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}>
        <TechIcon name={skill.icon} size={64} />
      </div>

      {/* Skill name */}
      <div className="mt-2 text-center">
        <span className="text-xs font-medium text-foreground">{skill.name}</span>
      </div>

      {/* Hover details */}
      {isHovered && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-4 bg-background/98 backdrop-blur-lg border border-white/40 rounded-xl shadow-2xl z-[100] min-w-60 animate-in slide-in-from-top-2 duration-200">
          <h3 className="font-bold text-foreground mb-3 text-center">{skill.name}</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Proficiency:</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-2 bg-muted/30 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-500`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <span className="font-bold text-blue-500 text-sm">{skill.level}%</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Projects:</span>
              <span className="font-semibold text-foreground">{skill.projects}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Experience:</span>
              <span className="font-semibold text-foreground">{skill.yearsExp} years</span>
            </div>
            {skill.endorsed && (
              <div className="flex items-center justify-center gap-1 mt-3 pt-2 border-t border-white/10">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-500 font-medium">Endorsed</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function LearningPathCard({ item, index }: { item: LearningPathItem; index: number }) {
  const statusConfig = {
    completed: { icon: <CheckCircle className="w-4 h-4" />, color: 'from-green-500 to-green-600', text: 'Completed' },
    'in-progress': { icon: <Clock className="w-4 h-4" />, color: 'from-blue-500 to-blue-600', text: 'Learning' },
    planned: { icon: <Target className="w-4 h-4" />, color: 'from-purple-500 to-purple-600', text: 'Planned' }
  };

  return (
    <Card className="p-4 rounded-2xl shadow-lg border border-white/10 bg-gradient-to-br from-background/60 to-muted/20 backdrop-blur-xl hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-foreground">{item.skill}</h3>
        <div className={`flex items-center gap-1 px-2 py-1 bg-gradient-to-r ${statusConfig[item.status].color} rounded-full text-white text-xs font-medium`}>
          {statusConfig[item.status].icon}
          {statusConfig[item.status].text}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-semibold text-foreground">{item.progress}%</span>
        </div>
        <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${statusConfig[item.status].color} rounded-full transition-all duration-1000 ease-out`}
            style={{ width: `${item.progress}%` }}
          />
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          {item.timeframe}
        </div>
      </div>
    </Card>
  );
}

function SkillComparison() {
  const comparisonData = [
    { category: 'Frontend', level: 90, color: 'from-blue-500 to-blue-600' },
    { category: 'Backend', level: 85, color: 'from-green-500 to-green-600' },
    { category: 'Database', level: 82, color: 'from-purple-500 to-purple-600' },
    { category: 'DevOps', level: 70, color: 'from-orange-500 to-orange-600' },
    { category: 'AI/ML', level: 75, color: 'from-pink-500 to-pink-600' },
  ];

  return (
    <div className="space-y-4">
      {comparisonData.map((item, index) => (
        <div key={item.category} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium text-foreground">{item.category}</span>
            <span className="text-sm font-bold text-muted-foreground">{item.level}%</span>
          </div>
          <div className="w-full bg-muted/30 rounded-full h-3 overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 ease-out`}
              style={{ 
                width: `${item.level}%`,
                animationDelay: `${index * 200}ms`
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function EnhancedSkillsSection() {
  const [activeView, setActiveView] = useState('overview');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImage, setModalImage] = useState<string>('');

  const skills: SkillData[] = [
    { name: 'HTML', level: 95, category: 'Frontend', icon: 'html5', color: 'from-orange-500 to-red-500', projects: 4, yearsExp: 3, endorsed: true },
    { name: 'CSS', level: 92, category: 'Frontend', icon: 'css3', color: 'from-blue-500 to-blue-600', projects: 4, yearsExp: 3, endorsed: true },
    { name: 'Tailwind CSS', level: 90, category: 'Frontend', icon: 'tailwindcss', color: 'from-cyan-400 to-cyan-600', projects: 4, yearsExp: 2, endorsed: true },
    { name: 'JavaScript', level: 90, category: 'Frontend', icon: 'javascript', color: 'from-yellow-400 to-yellow-500', projects: 4, yearsExp: 3, endorsed: true },
    { name: 'React.js', level: 85, category: 'Frontend', icon: 'react', color: 'from-cyan-400 to-blue-500', projects: 2, yearsExp: 2, endorsed: true },
    { name: 'Node.js', level: 80, category: 'Backend', icon: 'nodejs', color: 'from-green-500 to-green-600', projects: 2, yearsExp: 2, endorsed: true },
    { name: 'Express.js', level: 78, category: 'Backend', icon: 'express', color: 'from-gray-600 to-gray-700', projects: 2, yearsExp: 2, endorsed: false },
    { name: 'RESTful APIs', level: 82, category: 'Backend', icon: 'api', color: 'from-indigo-500 to-purple-500', projects: 3, yearsExp: 2, endorsed: true },
    { name: 'MongoDB', level: 75, category: 'Database', icon: 'mongodb', color: 'from-green-600 to-green-700', projects: 2, yearsExp: 1, endorsed: false },
    { name: 'MySQL', level: 88, category: 'Database', icon: 'mysql', color: 'from-blue-600 to-blue-700', projects: 3, yearsExp: 3, endorsed: true },
    { name: 'PHP', level: 88, category: 'Backend', icon: 'php', color: 'from-purple-500 to-indigo-600', projects: 3, yearsExp: 3, endorsed: true },
    { name: 'Git', level: 85, category: 'Tools', icon: 'git', color: 'from-orange-500 to-red-500', projects: 4, yearsExp: 3, endorsed: true },
    { name: 'Astro', level: 70, category: 'Frontend', icon: 'astro', color: 'from-orange-500 to-red-500', projects: 1, yearsExp: 1, endorsed: false },
    { name: 'Shadcn', level: 75, category: 'Frontend', icon: 'shadcn', color: 'from-slate-700 to-slate-800', projects: 1, yearsExp: 1, endorsed: false },
    { name: 'ReUI', level: 70, category: 'Frontend', icon: 'reui', color: 'from-teal-500 to-teal-600', projects: 1, yearsExp: 1, endorsed: false },
    { name: 'Material UI', level: 72, category: 'Frontend', icon: 'materialui', color: 'from-blue-500 to-indigo-500', projects: 1, yearsExp: 1, endorsed: false },
  ];

  const learningPath: LearningPathItem[] = [
    { skill: 'Docker', progress: 30, timeframe: '3 months', status: 'in-progress' },
    { skill: 'AWS', progress: 10, timeframe: '6 months', status: 'in-progress' },
    { skill: 'AI/ML', progress: 40, timeframe: '4 months', status: 'in-progress' },
    { skill: 'GraphQL', progress: 25, timeframe: '5 months', status: 'in-progress' },
    { skill: 'Java', progress: 15, timeframe: '8 months', status: 'planned' },
    { skill: 'C++', progress: 10, timeframe: '10 months', status: 'planned' },
  ];

  const categories = ['all', 'Frontend', 'Backend', 'Database', 'Tools'];
  
  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const certifications = [
    {
      title: 'Recognition for Technical Mastery',
      issuer: 'ACLC College of Sta. Maria',
      description: 'Server-side programming and integration',
      date: '2024',
      verified: true,
      image: '/award.jpg'
    },
    {
      title: 'EF SET English Certificate',
      issuer: 'EF Education First',
      description: 'C2 Proficient level (77/100) - Writing: C2 Proficient, Speaking: B2 Upper Intermediate',
      date: '30 Sep 2025',
      verified: true,
      certificateUrl: '/EF SET Certificate.pdf',
      score: '77/100',
      level: 'C2 Proficient'
    }
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <ScrollAnimation>
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text">
            Technical Skills & Expertise
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills, learning journey, and professional certifications 
            developed through <span className="text-foreground font-semibold">3+ years</span> of hands-on experience.
          </p>
        </div>
      </ScrollAnimation>

      {/* Navigation Tabs */}
      <ScrollAnimation delay={200}>
        <div className="flex flex-wrap gap-2 p-2 bg-muted/30 rounded-2xl backdrop-blur-sm border border-white/10">
          {[
            { id: 'overview', label: 'Overview', icon: <TrendingUp className="w-4 h-4" /> },
            { id: 'skills', label: 'Skills Map', icon: <Code className="w-4 h-4" /> },
            { id: 'learning', label: 'Learning Path', icon: <BookOpen className="w-4 h-4" /> },
            { id: 'certifications', label: 'Certifications', icon: <Award className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeView === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/10'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </ScrollAnimation>

      {/* Overview */}
      {activeView === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ScrollAnimation delay={300}>
            <Card className="p-8 rounded-3xl shadow-lg border border-white/10 bg-gradient-to-br from-background/60 to-muted/20 backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-foreground mb-6">Skill Radar</h2>
              <RadarChart skills={filteredSkills} />
            </Card>
          </ScrollAnimation>

          <ScrollAnimation delay={400}>
            <Card className="p-8 rounded-3xl shadow-lg border border-white/10 bg-gradient-to-br from-background/60 to-muted/20 backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-foreground mb-6">Category Comparison</h2>
              <SkillComparison />
            </Card>
          </ScrollAnimation>
        </div>
      )}

      {/* Skills Map */}
      {activeView === 'skills' && (
        <div className="space-y-6 pb-20">
          <ScrollAnimation delay={300}>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {category === 'all' ? 'All Skills' : category}
                </button>
              ))}
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={400}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6 justify-items-center mb-16">
              {filteredSkills.map((skill, index) => (
                <SkillHexagon key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </ScrollAnimation>

        </div>
      )}

      {/* Learning Path */}
      {activeView === 'learning' && (
        <div className="space-y-6">
          <ScrollAnimation delay={300}>
            <Card className="p-6 rounded-2xl shadow-lg border border-white/10 bg-gradient-to-br from-background/60 to-muted/20 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-blue-500" />
                <h2 className="text-xl font-bold text-foreground">Current Learning Journey</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Continuously expanding my skill set with cutting-edge technologies and methodologies.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {learningPath.map((item, index) => (
                  <LearningPathCard key={item.skill} item={item} index={index} />
                ))}
              </div>
            </Card>
          </ScrollAnimation>

        </div>
      )}

      {/* Certifications */}
      {activeView === 'certifications' && (
        <ScrollAnimation delay={300}>
          <div className="space-y-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="p-8 rounded-3xl shadow-lg border border-white/10 bg-gradient-to-br from-background/60 to-muted/20 backdrop-blur-xl">
                <div className="flex flex-col lg:flex-row items-start gap-6">
                  {cert.image ? (
                    <div className="w-full lg:w-48 h-48 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                      <img 
                        src={cert.image} 
                        alt={cert.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                      <Award className="w-8 h-8 text-blue-500" />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-foreground">{cert.title}</h3>
                      {cert.verified && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-full">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span className="text-xs text-green-500 font-medium">Verified</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-blue-500 font-semibold mb-2">{cert.issuer}</p>
                    <p className="text-muted-foreground mb-4">{cert.description}</p>
                    
                    {cert.score && cert.level && (
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30">
                          <span className="text-sm font-semibold text-green-500">Score: {cert.score}</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30">
                          <span className="text-sm font-semibold text-blue-500">Level: {cert.level}</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="text-sm text-muted-foreground">Issued: 2024 - 2025</span>
                      {cert.certificateUrl ? (
                        <Button variant="outline" size="sm" className="gap-2" asChild>
                          <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer">
                            <Star className="w-4 h-4" />
                            View Certificate
                          </a>
                        </Button>
                      ) : cert.image ? (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-2"
                          onClick={() => {
                            setModalImage(cert.image!);
                            setShowImageModal(true);
                          }}
                        >
                          <Star className="w-4 h-4" />
                          View Certificate
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" className="gap-2">
                          <Star className="w-4 h-4" />
                          View Certificate
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollAnimation>
      )}

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200 z-10"
            >
              <div className="flex items-center gap-2 text-sm">
                <span>Close</span>
                <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200">
                  ✕
                </div>
              </div>
            </button>
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <img 
                src={modalImage} 
                alt="Certificate" 
                className="w-full h-full object-contain max-h-[80vh]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
