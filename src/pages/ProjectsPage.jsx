import React from 'react';
import { Github, ExternalLink, Code2, Layers, Sparkles } from 'lucide-react';
import Card from '../components/common/Card';
import SectionHeader from '../components/common/SectionHeader';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

export default function ProjectsPage() {
  const projects = [
    {
      id: '01',
      title: 'პირადი სავიზიტო და პორტფოლიო პლატფორმა',
      category: 'ვებ-დეველოპმენტი · პერსონალური ვებ-გვერდი',
      description:
        'მრავალგვერდიანი სტრუქტურის მქონე SPA საიტი, რომელიც მოიცავს მთავარ, ბიოგრაფიულ, პროექტებისა, თანამშრომლებისა და საკონტაქტო მოდულებს.',
      technologies: ['React 18', 'React Router v6', 'Tailwind CSS', 'REST API'],
      github: 'https://github.com',
      live: '/',
      details: 'სუფთა არქიტექტურა, ადაპტური დიზაინი და სრული რესპონსიულობა.',
    },
    {
      id: '02',
      title: 'კაფესა და რესტორნის ონლაინ მენიუ',
      category: 'ვებ-აპლიკაცია · ელექტრონული მენიუ',
      description:
        'ინტერაქტიული ციფრული მენიუ კერძების კატეგორიზაციით, ფასებით, შემადგენლობითა და დინამიური ფილტრაციით.',
      technologies: ['React', 'JavaScript', 'Tailwind CSS', 'State Management'],
      github: 'https://github.com',
      live: '#',
      details: 'მარტივი ნავიგაცია და მომხმარებლისთვის მოსახერხებელი UX.',
    },
    {
      id: '03',
      title: 'თანამშრომელთა მართვის სისტემა (JSONPlaceholder)',
      category: 'REST API Dashboard · CRUD ოპერაციები',
      description:
        'რეალურ REST API-ზე მომუშავე სისტემა: მომხმარებლების სია, ცოცხალი ძებნა, პოსტების ნახვა მოდალში, ახალი წევრის დამატება (POST) და წაშლა (DELETE).',
      technologies: ['JSONPlaceholder API', 'React Hooks', 'Async/Await', 'Modals'],
      github: 'https://github.com',
      live: '/employees',
      details: 'სრული API ინტეგრაცია: /users, /posts, /todos, /comments.',
    },
  ];

  return (
    <div className="space-y-8">
      <SectionHeader
        badge="შემოქმედებითი ნამუშევრები"
        title="შესრულებული პროექტები"
        subtitle="აქ წარმოდგენილია ჩემი მიმდინარე და დასრულებული პრაქტიკული სამუშაოები:"
      />

      <div className="space-y-6">
        {projects.map((project) => (
          <Card
            key={project.id}
            hoverable={true}
            title={`${project.id}. ${project.title}`}
            subtitle={`კატეგორია: ${project.category}`}
            badge={
              <span className="w-10 h-10 rounded-2xl bg-cyan-950/80 text-cyan-400 border border-cyan-500/30 font-mono text-xs font-bold flex items-center justify-center shadow-glow-cyan">
                {project.id}
              </span>
            }
            footer={
              <div className="w-full flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-navy-800 text-[11px] font-mono text-cyan-300 border border-cyan-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    href={project.github}
                    variant="primary"
                    size="sm"
                    icon={<Github className="w-3.5 h-3.5" />}
                  >
                    GitHub კოდი
                  </Button>
                  {project.live && (
                    <Button
                      to={project.live}
                      variant="secondary"
                      size="sm"
                      icon={<ExternalLink className="w-3.5 h-3.5" />}
                    >
                      ნახვა
                    </Button>
                  )}
                </div>
              </div>
            }
          >
            <div className="space-y-3.5">
              <p>{project.description}</p>
              <div className="p-3.5 rounded-2xl bg-navy-800/80 border border-cyan-500/20 text-xs sm:text-sm text-slate-200 flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  <strong className="font-semibold text-white">დეტალები:</strong>{' '}
                  {project.details}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
