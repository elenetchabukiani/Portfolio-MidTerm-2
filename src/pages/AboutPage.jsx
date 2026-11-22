import React from 'react';
import {
  Sparkles,
  GraduationCap,
  CheckCircle2,
  Cpu,
  Globe,
  FileCode2,
} from 'lucide-react';
import Card from '../components/common/Card';
import SectionHeader from '../components/common/SectionHeader';
import Badge from '../components/common/Badge';

export default function AboutPage() {
  const skills = [
    { name: 'HTML5 & სემანტიკა', level: 'გამოცდილი', category: 'Frontend' },
    { name: 'CSS3 & Tailwind CSS', level: 'გამოცდილი', category: 'Styling' },
    { name: 'JavaScript (ES6+)', level: 'საშუალო+', category: 'Core' },
    { name: 'React 18 & Hooks', level: 'საშუალო', category: 'Framework' },
    { name: 'React Router v6', level: 'საშუალო', category: 'Routing' },
    { name: 'RESTful API & Fetch', level: 'გამოცდილი', category: 'Backend Integration' },
    { name: 'Git & GitHub ვერსიონირება', level: 'საშუალო', category: 'Tools' },
    { name: 'Responsive Web Design', level: 'გამოცდილი', category: 'UI/UX' },
  ];

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* Profile Section */}
      <section className="relative overflow-hidden bg-navy-850/80 rounded-3xl p-7 sm:p-10 lg:p-12 border border-cyan-500/15 shadow-card-dark">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Photo */}
          <div className="md:col-span-4 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-[2rem] blur-sm opacity-60 group-hover:opacity-100 transition duration-500" />
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-[1.8rem] overflow-hidden border-2 border-cyan-400/50 shadow-glow-cyan bg-navy-800">
                <img
                  src="/download.jpg"
                  alt="ელენე ჭაბუკიანი"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://ui-avatars.com/api/?name=Elene+Chabukiani&background=0284c7&color=fff';
                  }}
                />
              </div>
            </div>
          </div>

          {/* Bio text */}
          <div className="md:col-span-8 space-y-4">
            <Badge variant="cyan" pulse={true} icon={<Sparkles className="w-3.5 h-3.5" />}>
              პროფილი &amp; მისია
            </Badge>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              ჩემ შესახებ
            </h2>

            <article className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
              <p>
                გამარჯობა! მე ვარ{' '}
                <span className="font-semibold text-white">ელენე ჭაბუკიანი</span>,
                დამწყები ვებ-დეველოპერი. ჩემი მიზანია შევქმნა სუფთა,
                სტრუქტურირებული და მომხმარებლისთვის მაქსიმალურად მოსახერხებელი
                ვებ-გვერდები.
              </p>
              <p className="text-slate-200 bg-navy-800/80 p-4 sm:p-5 rounded-2xl border-l-4 border-cyan-400 text-sm sm:text-base leading-relaxed border border-cyan-500/20">
                დიდ ყურადღებას ვუთმობ კომპონენტურ არქიტექტურას, კოდის სემანტიკას,
                ხელმისაწვდომობას (Accessibility) და REST API-ებთან სწრაფ,
                საიმედო ინტეგრაციას.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Skills & Technologies */}
      <section className="space-y-6">
        <SectionHeader
          badge="ტექნოლოგიური არსენალი"
          title="უნარები &amp; კომპეტენციები"
          subtitle="ინსტრუმენტები და ბიბლიოთეკები, რომლებსაც ყოველდღიურად ვიყენებ პროექტებში"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.map((skill, idx) => (
            <Card
              key={idx}
              className="p-5"
              hoverable={true}
              badge={
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                  {skill.category}
                </span>
              }
            >
              <div className="flex items-center gap-2.5 mb-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <h4 className="font-bold text-white text-sm">{skill.name}</h4>
              </div>
              <p className="text-xs text-slate-400 pl-6">დონე: {skill.level}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Education & Courses */}
      <section className="space-y-6">
        <SectionHeader
          badge="აკადემიური ბაზა"
          title="განათლება &amp; სერტიფიკატები"
          subtitle="სწავლის პროცესი და პრაქტიკული გამოცდილება"
        />

        <Card
          icon={<GraduationCap className="w-6 h-6" />}
          title="Frontend &amp; React Web Development"
          subtitle="პრაქტიკული კურსი · 2026"
          badge={<Badge variant="emerald">მიმდინარე</Badge>}
          footer={
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              ინტენსიური პრაქტიკული პროგრამა
            </div>
          }
        >
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            ინტენსიური სასწავლო პროგრამა, რომელიც ფოკუსირებულია თანამედროვე
            ვებ-სტანდარტებზე, React-ის კომპონენტურ სისტემაზე, React Router-ით
            მრავალგვერდიან აპლიკაციებზე და REST API სერვისებთან ინტეგრაციაზე.
          </p>
        </Card>
      </section>
    </div>
  );
}
