import React from 'react';
import { Code, FolderGit2, Users, Layers, ArrowUpRight } from 'lucide-react';
import Card from '../common/Card';
import SectionHeader from '../common/SectionHeader';
import { Link } from 'react-router-dom';

/**
 * Quick Overview Section
 * Built entirely with reusable Card and SectionHeader components.
 */
export default function QuickOverview() {
  const overviewCards = [
    {
      icon: <Code className="w-6 h-6" />,
      title: 'საქმიანობა & მიზანი',
      subtitle: 'ვებ-დეველოპმენტი',
      badge: <span className="text-xs font-mono text-cyan-400">#01</span>,
      description:
        'ვქმნი თანამედროვე, სტრუქტურირებულ და მომხმარებლისთვის მოსახერხებელ ვებ-ინტერფეისებს სუფთა კოდისა და კომპონენტური არქიტექტურის გამოყენებით.',
      footer: (
        <>
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            სემანტიკური არქიტექტურა
          </span>
          <Link
            to="/about"
            className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
          >
            ვრცლად <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </>
      ),
    },
    {
      icon: <FolderGit2 className="w-6 h-6" />,
      title: 'ბოლო პროექტები',
      subtitle: 'პრაქტიკული სამუშაოები',
      badge: <span className="text-xs font-mono text-cyan-400">#02</span>,
      description:
        'რეალური პრაქტიკული პროექტები: სავიზიტო ბარათი, ელექტრონული მენიუ, სრული API ინტეგრაციითა და რესპონსიული დიზაინით.',
      footer: (
        <>
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            React &amp; Tailwind
          </span>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
          >
            პროექტები <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </>
      ),
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'თანამშრომლები (API)',
      subtitle: 'REST API ინტეგრაცია',
      badge: <span className="text-xs font-mono text-cyan-400">#03</span>,
      description:
        'JSONPlaceholder REST API-დან წამოღებული თანამშრომლების სია, ცოცხალი ძებნა, პოსტების (/posts) და დავალებების (/todos) დეტალური მოდალი.',
      footer: (
        <>
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            GET, POST, DELETE
          </span>
          <Link
            to="/employees"
            className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
          >
            გუნდის ნახვა <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </>
      ),
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: 'ტექნოლოგიური სტეკი',
      subtitle: 'უნარები & ხელსაწყოები',
      badge: <span className="text-xs font-mono text-cyan-400">#04</span>,
      description:
        'React 18, React Router v6, Tailwind CSS, JavaScript (ES6+), HTML5/CSS3 სემანტიკა და RESTful API კომუნიკაცია.',
      footer: (
        <>
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            თანამედროვე სტანდარტები
          </span>
          <Link
            to="/about"
            className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
          >
            უნარები <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </>
      ),
    },
  ];

  return (
    <section className="space-y-6">
      <SectionHeader
        badge="მოდულარული კომპონენტები"
        title="სწრაფი მიმოხილვა"
        subtitle="ჩემი ფოკუსი, ძირითადი მიმართულებები და განმეორებადი კომპონენტები"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {overviewCards.map((card, idx) => (
          <Card
            key={idx}
            icon={card.icon}
            title={card.title}
            subtitle={card.subtitle}
            badge={card.badge}
            footer={card.footer}
          >
            <p>{card.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
