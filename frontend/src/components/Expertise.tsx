import React from 'react';
import { Card } from './ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

export function Expertise() {
  const expertise = [
    {
      title: 'Frontend Development',
      skills: ['React & Next.js', 'TypeScript', 'Responsive Design', 'State Management'],
    },
    {
      title: 'UI/UX Design',
      skills: ['Figma & Design Systems', 'User Research', 'Prototyping', 'Accessibility'],
    },
    {
      title: 'Backend Development',
      skills: ['Node.js & Express', 'REST APIs', 'Database Design', 'Authentication'],
    },
  ];

  return (
    <Card className="p-8 rounded-3xl shadow-lg border border-white/10 bg-gradient-to-br from-background/60 to-muted/20 backdrop-blur-xl">
      <h3 className="text-xl font-bold text-foreground mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text">Expertise</h3>
      <Accordion type="single" collapsible className="w-full space-y-2">
        {expertise.map((category, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border border-white/10 rounded-2xl bg-gradient-to-r from-background/40 to-muted/20 backdrop-blur-sm overflow-hidden">
            <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline px-4 py-3 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 transition-all duration-300">
              {category.title}
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <ul className="space-y-3 pt-2">
                {category.skills.map((skill, skillIndex) => (
                  <li
                    key={skillIndex}
                    className="text-sm text-muted-foreground flex items-center gap-3 hover:text-foreground transition-colors duration-200"
                  >
                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                    {skill}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
}
