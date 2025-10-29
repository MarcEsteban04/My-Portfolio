import React, { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Download, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigation } from './NavigationProvider';

export function HeroSection() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [greeting, setGreeting] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { setCurrentSection } = useNavigation();

  // Background carousel images from public folder
  const backgroundImages = [
    "/react code.jpg",
    "/ai.jpg", 
    "/backend code.jpg"
  ];

  useEffect(() => {
    // Set initial time and greeting on client side only
    const now = new Date();
    setCurrentTime(now);
    
    const hour = now.getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-advance background carousel
  useEffect(() => {
    const carouselTimer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(carouselTimer);
  }, [backgroundImages.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + backgroundImages.length) % backgroundImages.length);
  };

  const formattedDate = currentTime?.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Manila'
  }) || '';

  const formattedTime = currentTime?.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Manila'
  }) || '';

  return (
    <Card className="relative overflow-hidden border border-white/10 p-10 rounded-3xl shadow-2xl">
      {/* Background Carousel Images */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={image}
              alt={`Background ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 ml-16 md:ml-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-medium text-white/80 uppercase tracking-wider">Available for work</span>
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-3">
          {greeting}, I'm Marc
        </h1>
        <p className="text-sm text-white/70 mb-6 font-medium">
          {formattedDate} • {formattedTime}
        </p>
        <p className="text-lg text-white/90 max-w-2xl leading-relaxed mb-6">
          Welcome to my digital portfolio! I'm passionate about creating innovative web solutions 
          that blend cutting-edge technology with exceptional user experiences. Let's build something 
          amazing together.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button 
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium px-6 py-3 gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
            asChild
          >
            <a href="/Marc Esteban - Resume.pdf" download="Marc Esteban - Resume.pdf">
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          </Button>
          
          <Button 
            variant="outline"
            className="px-6 py-3 gap-2 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 shadow-lg hover:shadow-xl text-white"
            onClick={() => setCurrentSection('contact')}
          >
            <MessageCircle className="w-4 h-4" />
            Message Me
          </Button>
        </div>

        {/* Carousel Navigation Dots */}
        <div className="flex gap-2">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Navigation Arrows */}
      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all duration-300 backdrop-blur-sm z-20"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all duration-300 backdrop-blur-sm z-20"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </Card>
  );
}
