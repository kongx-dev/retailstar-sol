import { ReactNode } from 'react';

interface PremiumCardProps {
  title: string;
  description: string;
  icon: string;
  children: ReactNode;
}

export default function PremiumCard({ title, description, icon, children }: PremiumCardProps) {
  return (
    <div className="rounded-xl p-5 border border-white/10 bg-white/5 backdrop-blur-md shadow-lg shadow-black/40 hover:bg-white/10 transition-all duration-200">
      <div className="flex items-center mb-2">
        <div className="text-2xl mr-2">{icon}</div>
        <h3 className="text-lg font-semibold text-white/90">{title}</h3>
      </div>
      <p className="text-white/60 text-sm mb-3">{description}</p>
      {children}
    </div>
  );
}


