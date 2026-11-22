import React from 'react';
import { Home, AlertCircle } from 'lucide-react';
import Button from '../components/common/Button';

export default function NotFoundPage() {
  return (
    <div className="text-center py-20 space-y-6 max-w-md mx-auto">
      <div className="w-20 h-20 mx-auto rounded-3xl bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shadow-glow-cyan">
        <AlertCircle className="w-10 h-10" />
      </div>
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold text-white">404</h1>
        <h2 className="text-xl font-bold text-slate-200">
          გვერდი ვერ მოიძებნა
        </h2>
        <p className="text-sm text-slate-400">
          თქვენ მიერ მოთხოვნილი გვერდი არ არსებობს ან გადატანილია სხვა მისამართზე.
        </p>
      </div>
      <Button to="/" variant="primary" icon={<Home className="w-4 h-4" />}>
        მთავარზე დაბრუნება
      </Button>
    </div>
  );
}
