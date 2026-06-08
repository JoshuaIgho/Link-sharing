import React from 'react';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const OnboardingChecklist = ({ user, links }) => {
  const steps = [
    {
      id: 'create-link',
      title: 'Add your first link',
      description: 'Share your social media or portfolio',
      completed: links && links.length > 0,
      link: '/links',
    },
    {
      id: 'profile-pic',
      title: 'Upload a profile picture',
      description: 'Help people recognize you',
      completed: !!user?.profile?.avatarUrl,
      link: '/profile',
    },
    {
      id: 'customize',
      title: 'Customize your theme',
      description: 'Make your profile truly yours',
      completed: !!(user?.profile?.themePreset && user?.profile?.themePreset !== 'minimal'),
      link: '/profile',
    },
    {
      id: 'share',
      title: 'Share your profile',
      description: 'Let the world see what you have',
      completed: user?.profile?.viewCount > 0,
      link: `/${user?.profile?.username}`,
      external: true,
    },
  ];

  const completedCount = steps.filter(s => s.completed).length;
  const progress = (completedCount / steps.length) * 100;

  if (progress === 100) return null;

  return (
    <div className="card mb-8 overflow-hidden border-none shadow-lg bg-gradient-to-br from-primary-600 to-indigo-700 text-white">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold">Complete your setup</h3>
            <p className="text-primary-100 text-sm mt-1">
              You're {Math.round(progress)}% of the way there!
            </p>
          </div>
          <div className="hidden sm:block w-16 h-16 relative">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="6"
                fill="transparent"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="white"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={175.9}
                strokeDashoffset={175.9 - (175.9 * progress) / 100}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
              {completedCount}/{steps.length}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`p-4 rounded-xl flex items-start gap-4 transition-all ${
                step.completed
                  ? 'bg-white/10 text-white/60'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              {step.completed ? (
                <CheckCircle2 className="text-green-400 mt-1" size={20} />
              ) : (
                <Circle className="mt-1" size={20} />
              )}
              <div className="flex-1 min-w-0">
                <p className={`font-semibold ${step.completed ? 'line-through' : ''}`}>
                  {step.title}
                </p>
                <p className="text-xs opacity-80 mt-0.5">{step.description}</p>
              </div>
              {!step.completed && (
                step.external ? (
                  <a href={step.link} target="_blank" rel="noreferrer" className="mt-1">
                    <ArrowRight size={18} />
                  </a>
                ) : (
                  <Link to={step.link} className="mt-1">
                    <ArrowRight size={18} />
                  </Link>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnboardingChecklist;
