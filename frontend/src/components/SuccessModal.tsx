import React, { useEffect } from 'react';
import { CheckCircle, X, Mail, Clock } from 'lucide-react';
import { Button } from './ui/button';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  senderName?: string;
}

export function SuccessModal({ isOpen, onClose, senderName = "there" }: SuccessModalProps) {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative z-10 w-full max-w-md mx-4 animate-in zoom-in-95 duration-300">
        <div className="bg-gradient-to-br from-background/95 to-muted/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-200"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>

          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              {/* Pulse rings */}
              <div className="absolute inset-0 w-20 h-20 bg-green-500/20 rounded-full animate-ping" />
              <div className="absolute inset-2 w-16 h-16 bg-green-500/10 rounded-full animate-ping animation-delay-75" />
            </div>
          </div>

          {/* Content */}
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Message Sent Successfully! 🎉
            </h2>
            
            <p className="text-muted-foreground leading-relaxed">
              Thanks {senderName}! Your message has been delivered to my inbox. 
              I'll get back to you as soon as possible.
            </p>

            {/* Info Cards */}
            <div className="space-y-3 mt-6">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/5">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Clock className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">Response Time</p>
                  <p className="text-xs text-muted-foreground">Usually within 24 hours</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-white/5">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <Mail className="w-4 h-4 text-green-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">Email Confirmation</p>
                  <p className="text-xs text-muted-foreground">Check your inbox for a copy</p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4">
              <Button 
                onClick={onClose}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium py-3"
              >
                Awesome! 
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
