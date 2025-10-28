import React from 'react';
import { Card } from './ui/card';

// Import TechIcon from EnhancedSkillsSection
function TechIcon({ name, size = 32 }: { name: string; size?: number }) {
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
    tailwindcss: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.61 7.15 14.47 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.61 13.15 9.47 12 7 12z" fill="#06B6D4"/>
      </svg>
    ),
    express: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" fill="#000000"/>
        <path d="M4 8h16M4 12h16M4 16h16" stroke="white" strokeWidth="2"/>
      </svg>
    ),
    git: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M21.62 11.11L12.89 2.38a1.5 1.5 0 0 0-2.12 0L8.5 4.65l2.62 2.62a1.8 1.8 0 0 1 1.91 1.91l2.52 2.52a1.8 1.8 0 1 1-1.07 1.07l-2.35-2.35v6.18a1.8 1.8 0 1 1-1.44-.72V9.77a1.8 1.8 0 0 1-.97-2.36L6.5 4.79 2.38 8.91a1.5 1.5 0 0 0 0 2.12l8.73 8.73a1.5 1.5 0 0 0 2.12 0l8.39-8.39a1.5 1.5 0 0 0 0-2.12z" fill="#F05032"/>
      </svg>
    ),
    api: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#6366F1"/>
        <path d="M8 12h8M12 8v8" stroke="white" strokeWidth="2"/>
        <circle cx="8" cy="12" r="2" fill="white"/>
        <circle cx="16" cy="12" r="2" fill="white"/>
      </svg>
    )
  };

  return iconComponents[name.toLowerCase().replace(/[.\s]/g, '')] || iconComponents['api'];
}

interface SkillIconProps {
  name: string;
  techKey: string;
}

function SkillIcon({ name, techKey }: SkillIconProps) {
  return (
    <div className="group flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-gradient-to-br hover:from-blue-500/5 hover:to-purple-500/5 transition-all duration-300 hover:scale-105 cursor-pointer">
      <div className="flex items-center justify-center group-hover:scale-110 transition-all duration-300">
        <TechIcon name={techKey} size={32} />
      </div>
      <span className="text-xs text-muted-foreground font-medium group-hover:text-foreground transition-colors duration-300 text-center">{name}</span>
    </div>
  );
}

export function SkillSet() {
  const skills = [
    { name: 'HTML', techKey: 'html5' },
    { name: 'CSS', techKey: 'css3' },
    { name: 'JavaScript', techKey: 'javascript' },
    { name: 'React.js', techKey: 'react' },
    { name: 'Node.js', techKey: 'nodejs' },
    { name: 'Express.js', techKey: 'express' },
    { name: 'PHP', techKey: 'php' },
    { name: 'MySQL', techKey: 'mysql' },
    { name: 'MongoDB', techKey: 'mongodb' },
    { name: 'Tailwind CSS', techKey: 'tailwindcss' },
    { name: 'RESTful APIs', techKey: 'api' },
    { name: 'Git', techKey: 'git' },
  ];

  return (
    <Card className="p-8 rounded-3xl shadow-lg border border-white/10 bg-gradient-to-br from-background/60 to-muted/20 backdrop-blur-xl">
      <h3 className="text-xl font-bold text-foreground mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text">Tech Stack</h3>
      <div className="grid grid-cols-3 gap-4">
        {skills.map((skill, index) => (
          <SkillIcon key={index} name={skill.name} techKey={skill.techKey} />
        ))}
      </div>
    </Card>
  );
}
