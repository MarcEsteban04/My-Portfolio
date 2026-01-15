import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ScrollAnimation } from './ScrollAnimation';
import { MapPin, Calendar, Award, Briefcase, GraduationCap, Code, Coffee, Gamepad2, ChevronDown, ChevronUp, Clock, TrendingUp, Tv, BookOpen, Film } from 'lucide-react';

function TypingAnimation({ text, className = "", speed = 100 }: { text: string; className?: string; speed?: number }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting && currentIndex < text.length) {
        // Typing forward
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      } else if (!isDeleting && currentIndex === text.length) {
        // Pause at end before deleting
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentIndex > 0) {
        // Deleting backward
        setDisplayText(prev => prev.slice(0, -1));
        setCurrentIndex(prev => prev - 1);
      } else if (isDeleting && currentIndex === 0) {
        // Pause at beginning before typing again
        setIsDeleting(false);
        setTimeout(() => { }, 500);
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [currentIndex, text, speed, isDeleting]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse text-current ml-1">|</span>
    </span>
  );
}

interface TimelineItemProps {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  techStack?: {
    technologies?: string[];
    apis?: string[];
  };
  isLeft?: boolean;
  icon: React.ReactNode;
  color: string;
}

function TimelineItem({ title, company, period, description, achievements, techStack, isLeft = false, icon, color }: TimelineItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`flex items-center gap-8 mb-12 ${isLeft ? 'flex-row-reverse' : ''}`}>
      {/* Timeline Line & Icon */}
      <div className="flex flex-col items-center">
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${color} border-2 border-white/20 flex items-center justify-center shadow-lg z-10 relative`}>
          <div className="w-6 h-6 text-white">{icon}</div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent animate-pulse" />
        </div>
        <div className="w-0.5 h-16 bg-gradient-to-b from-muted-foreground/30 to-transparent mt-2" />
      </div>

      {/* Content Card */}
      <Card className={`flex-1 p-6 rounded-2xl shadow-lg border border-white/10 bg-gradient-to-br from-background/60 to-muted/20 backdrop-blur-xl hover:shadow-xl transition-all duration-500 hover:scale-[1.02] ${isLeft ? 'mr-8' : 'ml-8'} max-w-md md:max-w-lg`}>
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-foreground">{title}</h3>
              <p className="text-blue-500 font-semibold">{company}</p>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{period}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 h-auto"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>

          {isExpanded && (
            <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
              <div>
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  Key Achievements
                </h4>
                <ul className="space-y-2">
                  {achievements.map((achievement, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              {techStack && (techStack.technologies || techStack.apis) && (
                <div className="space-y-3 pt-3 border-t border-white/10">
                  {techStack.technologies && techStack.technologies.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                        <Code className="w-4 h-4 text-purple-500" />
                        Technologies & Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {techStack.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-foreground rounded-full border border-purple-500/30 hover:scale-105 transition-transform duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {techStack.apis && techStack.apis.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                        <Code className="w-4 h-4 text-blue-500" />
                        APIs & Integrations
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {techStack.apis.map((api, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-foreground rounded-full border border-blue-500/30 hover:scale-105 transition-transform duration-200"
                          >
                            {api}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

function SkillWheel() {
  const skills = [
    {
      name: 'JavaScript',
      level: 90,
      color: 'from-yellow-400 to-yellow-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
          <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
        </svg>
      )
    },
    {
      name: 'React',
      level: 85,
      color: 'from-blue-400 to-blue-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
          <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.47 0-.92.014-1.36.034.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.866.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.36.034.47 0 .92-.014 1.36-.034-.44.572-.895 1.095-1.36 1.56-.465-.467-.92-.992-1.36-1.56z" />
        </svg>
      )
    },
    {
      name: 'PHP',
      level: 88,
      color: 'from-purple-400 to-purple-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
          <path d="M7.01 10.207h-.944l-.515 2.648h.838c.556 0 .982-.122 1.292-.391.313-.27.503-.644.572-1.115.05-.33-.044-.611-.292-.92-.248-.308-.646-.462-1.191-.462h-.76zm11.161 0h-.943l-.516 2.648h.838c.557 0 .983-.122 1.293-.391.314-.27.504-.644.572-1.115.05-.33-.043-.611-.291-.92-.248-.308-.647-.462-1.192-.462h-.761zm-3.006.943l-.5 2.648h1.133c.332 0 .617-.235.617-.235s.235-.235.235-.617c0-.382-.235-.617-.617-.617h-.868zm-11.161-3.943c-2.006 0-3.64 1.634-3.64 3.64 0 2.006 1.634 3.64 3.64 3.64h.943l.515-2.648h-.838c-.556 0-.982.122-1.292.391-.313.27-.503.644-.572 1.115-.05.33.044.611.292.92.248.308.646.462 1.191.462h.76l.944-4.92zm11.161 0c-2.006 0-3.64 1.634-3.64 3.64 0 2.006 1.634 3.64 3.64 3.64h.943l.516-2.648h-.838c-.557 0-.983.122-1.293.391-.314.27-.504.644-.572 1.115-.05.33.043.611.291.92.248.308.647.462 1.192.462h.761l.943-4.92zm-3.006 0c-2.006 0-3.64 1.634-3.64 3.64 0 2.006 1.634 3.64 3.64 3.64h1.133l.5-2.648h-1.133c-.332 0-.617.235-.617.235s-.235.235-.235.617c0 .382.235.617.617.617h.868l.943-4.92z" />
        </svg>
      )
    },
    {
      name: 'MySQL',
      level: 82,
      color: 'from-blue-600 to-blue-800',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
          <path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H.082c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 1.72.384 3.564.438 5.53zm4.017-4.08c-.378 2.045-.876 3.533-1.492 4.46-.482.716-1.01 1.073-1.583 1.073-.153 0-.34-.046-.566-.138v-.494c.11.017.24.026.386.026.268 0 .483-.075.647-.222.197-.18.295-.382.295-.605 0-.155-.077-.47-.23-.944L6.23 14.615h.91l.727 2.36c.164.536.233.91.205 1.123.4-1.064.678-2.227.835-3.483zm12.325 4.08h-2.63v-5.53h.885v4.85h1.745zm-3.32.135l-1.016-.5c.09-.076.177-.158.255-.25.433-.506.648-1.258.648-2.253 0-1.83-.718-2.746-2.155-2.746-.704 0-1.254.232-1.65.697-.43.508-.646 1.256-.646 2.245 0 .972.19 1.686.574 2.14.35.41.877.615 1.583.615.264 0 .506-.033.725-.098l1.325.772.357-.622zM15.5 17.588c-.225 0-.406-.104-.544-.31-.159-.24-.238-.652-.238-1.234 0-.117.008-.225.024-.32h-.99c-.226.685-.385 1.344-.478 1.975-.093.63-.14 1.142-.14 1.537 0 .881.104 1.438.313 1.671.209.233.5.35.875.35.308 0 .577-.033.805-.098v.494c-.84.182-1.513.273-2.018.273-.865 0-1.456-.213-1.774-.64-.317-.426-.476-1.006-.476-1.740 0-.498.06-1.117.18-1.855.12-.739.295-1.458.524-2.157.229-.699.48-1.298.754-1.798.274-.5.549-.75.825-.75.198 0 .33.045.396.135.066.09.099.225.099.405 0 .405-.12.855-.36 1.35-.24.495-.57.855-.99 1.08z" />
        </svg>
      )
    },
    {
      name: 'Node.js',
      level: 80,
      color: 'from-green-400 to-green-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
          <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.570,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z" />
        </svg>
      )
    },
    {
      name: 'CSS',
      level: 92,
      color: 'from-pink-400 to-pink-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
          <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" />
        </svg>
      )
    },
  ];

  return (
    <div className="relative w-64 h-64 mx-auto">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-muted/20 to-muted/5 backdrop-blur-sm border border-white/10" />
      {skills.map((skill, index) => {
        const angle = (index * 60) - 90; // 60 degrees apart, starting from top
        const radius = 80;
        const x = Math.cos(angle * Math.PI / 180) * radius;
        const y = Math.sin(angle * Math.PI / 180) * radius;

        return (
          <div
            key={skill.name}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
            }}
          >
            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${skill.color} flex items-center justify-center shadow-lg border-2 border-white/20 group-hover:scale-110 transition-transform duration-300 relative`}>
              <div className="text-white">
                {skill.icon}
              </div>
              {/* Percentage badge */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-background border-2 border-white/20 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-foreground">{skill.level}</span>
              </div>
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs font-semibold text-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md border border-white/10">
                {skill.name} - {skill.level}%
              </span>
            </div>
          </div>
        );
      })}

      {/* Center circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 flex items-center justify-center">
          <Code className="w-8 h-8 text-foreground" />
        </div>
      </div>
    </div>
  );
}

function CounterCard({ icon, value, label, color }: { icon: React.ReactNode; value: string; label: string; color: string }) {
  const [count, setCount] = useState(0);
  const targetValue = parseInt(value.replace(/\D/g, ''));

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev < targetValue) {
          return prev + 1;
        }
        clearInterval(timer);
        return targetValue;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [targetValue]);

  return (
    <Card className={`p-6 rounded-2xl shadow-lg border border-white/10 bg-gradient-to-br ${color} backdrop-blur-xl hover:scale-105 transition-all duration-300 text-center`}>
      <div className="flex flex-col items-center gap-3">
        <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
          <div className="w-6 h-6 text-white">{icon}</div>
        </div>
        <div className="text-2xl font-bold text-white">
          {count}{value.includes('+') ? '+' : ''}
        </div>
        <div className="text-sm text-white/80 font-medium">{label}</div>
      </div>
    </Card>
  );
}

export function EnhancedAboutSection() {
  const [activeTab, setActiveTab] = useState('experience');

  const experiences = [
    {
      title: 'Senior Full Stack Developer',
      company: 'Acore Technology',
      period: 'Dec 17, 2025 – Present',
      description: 'Fix bugs, Shopify integration, Zoho CRM integration, and adding new features to enterprise systems.',
      achievements: [
        'Created a sync page on the Vanderlyn ERP system to migrate Zoho CRM data to Supabase database',
        'Built an admin panel for mock vegan food website with Shopify API integration',
        'Migrated all customers from Shopify to Supabase database',
        'Implemented custom pricing feature allowing owners to set individual customer pricing'
      ],
      techStack: {
        technologies: ['Next.js', 'PostgreSQL (Supabase)', 'TypeScript', 'JavaScript'],
        apis: ['Shopify', 'Zoho CRM', 'Ngrok', 'Shop', 'Stripe']
      },
      icon: <Briefcase />,
      color: 'from-emerald-500 to-emerald-600',
      isLeft: false
    },
    {
      title: 'IT Support Intern',
      company: 'Municipality of Sta. Maria, Bulacan',
      period: 'Aug 2024 – Dec 2024',
      description: 'Provided comprehensive technical assistance, troubleshooting, and OS installations across multiple departments.',
      achievements: [
        'Boosted system uptime by 25%, improving operational efficiency',
        'Streamlined IT support processes for 50+ employees',
        'Implemented preventive maintenance protocols',
        'Reduced average ticket resolution time by 40%'
      ],
      techStack: {
        technologies: [
          'MS Office Activation',
          'MS Office 365',
          'Word',
          'Excel',
          'Troubleshooting',
          'IT Support',
          'Critical Thinking',
          'Team Leader',
          'Team Player',
          'Adaptability',
          'Computer Hardware',
          'Windows Installation'
        ]
      },
      icon: <Briefcase />,
      color: 'from-blue-500 to-blue-600',
      isLeft: true
    },
    {
      title: 'Freelance Web Developer',
      company: 'Self-Employed',
      period: 'Feb 2023 – Present',
      description: 'Delivered custom web solutions focusing on tailored client needs, responsive UI/UX, and efficient backend implementation.',
      achievements: [
        'Completed 4+ custom projects with 100% client satisfaction',
        'Specialized in e-commerce platforms and inventory systems',
        'Improved client workflows through process automation',
        'Achieved 98% on-time project delivery rate'
      ],
      techStack: {
        technologies: [
          'Next.js',
          'Node.js',
          'React.js',
          'React Native',
          'Tailwind CSS',
          'Astro',
          'PostgreSQL (Supabase)',
          'TypeScript',
          'JavaScript',
          'Java',
          'PHP',
          'HTML',
          'CSS'
        ]
      },
      icon: <Code />,
      color: 'from-green-500 to-green-600',
      isLeft: true
    },
    {
      title: 'Full-Stack Developer',
      company: 'M5B Hardware',
      period: 'Sept 2023 – Oct 2023',
      description: 'Built comprehensive inventory management system with integrated POS features using modern web technologies.',
      achievements: [
        'Reduced manual entry errors by 40%',
        'Enhanced inventory tracking and sales processing',
        'Implemented real-time stock monitoring',
        'Delivered project 2 weeks ahead of schedule'
      ],
      techStack: {
        technologies: [
          'HTML',
          'CSS',
          'PHP',
          'JavaScript',
          'TypeScript',
          'React.js',
          'Node.js',
          'MySQL'
        ]
      },
      icon: <Award />,
      color: 'from-purple-500 to-purple-600',
      isLeft: false
    }
  ];

  const interests = [
    { icon: <Coffee />, name: 'Coffee', description: 'Specialty coffee enthusiast' },
    { icon: <Gamepad2 />, name: 'Gaming', description: 'Strategy & indie games' },
    { icon: <Tv />, name: 'Watching Anime', description: 'Anime series enthusiast' },
    { icon: <BookOpen />, name: 'Reading Manga', description: 'Manga reader' },
    { icon: <Film />, name: 'Watching Movies', description: 'Movie enthusiast' },
  ];

  const funFacts = [
    { icon: <Clock />, value: '4+', label: 'Years Coding', color: 'from-blue-500/60 to-blue-600/60' },
    { icon: <Code />, value: '6+', label: 'Projects Built', color: 'from-green-500/60 to-green-600/60' },
    { icon: <Coffee />, value: '500+', label: 'Cups of Coffee', color: 'from-amber-500/60 to-amber-600/60' },
    { icon: <Award />, value: '1', label: 'Recognition Award', color: 'from-purple-500/60 to-purple-600/60' },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <ScrollAnimation>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 backdrop-blur-xl border border-white/10 p-8 md:p-12">
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 space-y-6">
                <div className="space-y-4">
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text">
                    About Me
                  </h1>
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    <TypingAnimation
                      text="Full Stack Developer"
                      speed={120}
                      className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                    />
                  </div>
                  <p className="text-lg text-muted-foreground">
                    Crafting digital experiences with passion and precision
                  </p>
                </div>

                <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
                  Full-Stack Web Developer with <span className="text-foreground font-semibold">3+ years</span> of experience
                  delivering scalable, user-focused applications. Specialized in modern web technologies
                  and AI-powered solutions that drive business growth.
                </p>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-full border border-blue-500/30">
                    <Briefcase className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-foreground">Currently Employed</span>
                  </div>
                </div>
              </div>

              {/* Skills Wheel - Hidden on mobile */}
              <div className="hidden lg:block">
                <SkillWheel />
              </div>
            </div>
          </div>

          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-500/5 to-transparent rounded-full blur-2xl" />
        </div>
      </ScrollAnimation>

      {/* Fun Facts Counter */}
      <ScrollAnimation delay={200}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {funFacts.map((fact, index) => (
            <CounterCard key={index} {...fact} />
          ))}
        </div>
      </ScrollAnimation>

      {/* Navigation Tabs */}
      <ScrollAnimation delay={300}>
        <div className="flex flex-wrap gap-2 p-2 bg-muted/30 rounded-2xl backdrop-blur-sm border border-white/10">
          {[
            { id: 'experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" /> },
            { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
            { id: 'interests', label: 'Interests', icon: <Coffee className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${activeTab === tab.id
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

      {/* Experience Timeline */}
      {activeTab === 'experience' && (
        <ScrollAnimation delay={400}>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-muted-foreground/30 via-muted-foreground/10 to-transparent" />

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <TimelineItem key={index} {...exp} />
              ))}
            </div>
          </div>
        </ScrollAnimation>
      )}

      {/* Education */}
      {activeTab === 'education' && (
        <ScrollAnimation delay={400}>
          <Card className="p-8 rounded-3xl shadow-lg border border-white/10 bg-gradient-to-br from-background/60 to-muted/20 backdrop-blur-xl">
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                <GraduationCap className="w-8 h-8 text-blue-500" />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">Bachelor of Science in Computer Science</h3>
                  <p className="text-blue-500 font-semibold">ACLC College of Sta. Maria</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">2021 - 2025</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-green-500" />
                    <h4 className="font-semibold text-foreground">Recognition Award</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Technical mastery in server-side programming and integration
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-background/40 to-muted/20 border border-white/10">
                    <h4 className="font-semibold text-foreground mb-2">Core Subjects</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Data Structures & Algorithms</li>
                      <li>• Database Management Systems</li>
                      <li>• Web Development</li>
                      <li>• Software Engineering</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-background/40 to-muted/20 border border-white/10">
                    <h4 className="font-semibold text-foreground mb-2">Achievements</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Dean's List (Multiple Semesters)</li>
                      <li>• Capstone Project Excellence</li>
                      <li>• Programming Competition Finalist</li>
                      <li>• Technical Leadership Award</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </ScrollAnimation>
      )}

      {/* Personal Interests */}
      {activeTab === 'interests' && (
        <ScrollAnimation delay={400}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {interests.map((interest, index) => (
              <Card key={index} className="p-6 rounded-2xl shadow-lg border border-white/10 bg-gradient-to-br from-background/60 to-muted/20 backdrop-blur-xl hover:scale-105 transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-6 h-6 text-blue-500">{interest.icon}</div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{interest.name}</h3>
                    <p className="text-sm text-muted-foreground">{interest.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollAnimation>
      )}
    </div>
  );
}
