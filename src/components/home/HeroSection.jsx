import React from 'react';
import { ArrowRight, Code2 } from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy-850 via-[#0E172A] to-navy-900 border border-cyan-500/20 p-7 sm:p-10 lg:p-12 shadow-card-dark transition-all">
      {/* Ambient Glow Effects */}
      <div className="absolute -top-24 -right-24 w-80 sm:w-96 h-80 sm:h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 sm:w-80 h-72 sm:h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left column: Text, avatar and buttons */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2.5 p-1 pr-3.5 rounded-full bg-navy-800/90 border border-cyan-500/30 shadow-md">
              <img
                src="/download.jpg"
                alt="ელენე ჭაბუკიანი"
                className="w-7 h-7 rounded-full object-cover ring-1 ring-cyan-400"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'https://ui-avatars.com/api/?name=Elene+Chabukiani&background=0284c7&color=fff';
                }}
              />
              <span className="text-xs font-semibold text-slate-200">
                ელენე ჭაბუკიანი
              </span>
            </div>
            <Badge variant="cyan" pulse={true}>
              ღიაა ახალი შესაძლებლობებისთვის
            </Badge>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-[2.5rem] font-extrabold tracking-tight text-white leading-[1.25]">
            მოგესალმებით ჩემს პორტფოლიოზე!
          </h1>

          <div className="space-y-3.5 text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            <p>
              გამარჯობა! მე ვარ{' '}
              <span className="font-semibold text-cyan-300">
                ელენე ჭაბუკიანი
              </span>
              , დამწყები ვებ-დეველოპერი. ეს არის ჩემი პორტფოლიო, შექმნილი{' '}
              <span className="text-cyan-400 font-semibold">React-ისა</span> და{' '}
              <span className="text-cyan-400 font-semibold">React Router-ის</span>{' '}
              საფუძველზე.
            </p>
            <p className="text-slate-400 text-sm sm:text-base">
              საიტზე დანერგილია მოდულარული კომპონენტები, REST API ინტეგრაცია და ცოცხალი ძებნის ფუნქციონალი.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3.5">
            <Button
              to="/projects"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              პროექტების დათვალიერება
            </Button>
            <Button to="/employees" variant="secondary" size="lg">
              თანამშრომლები (API)
            </Button>
            <Button to="/contact" variant="ghost" size="lg">
              კონტაქტი
            </Button>
          </div>
        </div>

        {/* Right column: Image with neon cyber glow */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md lg:max-w-none group">
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-cyan-500 via-blue-500 to-sky-400 rounded-[2rem] blur-md opacity-40 group-hover:opacity-75 transition duration-500" />
            <div className="relative overflow-hidden rounded-[1.8rem] border border-cyan-500/30 bg-navy-900 shadow-2xl">
              <img
                src="/developmentt.jpg"
                alt="ვებ დეველოპმენტის პროცესი"
                className="w-full h-64 sm:h-72 lg:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-navy-900/90 backdrop-blur-md border border-cyan-500/30 text-xs font-semibold text-slate-200 flex items-center justify-between shadow-lg">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  React 18 + Vite
                </span>
                <span className="text-cyan-400 font-mono font-bold flex items-center gap-1">
                  <Code2 className="w-3.5 h-3.5" /> 2026
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
