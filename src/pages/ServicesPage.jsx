import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Code,
  Layers,
  Database,
  Smartphone,
  Check,
  Calculator,
  ChevronDown,
  ChevronUp,
  Star,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Card from '../components/common/Card';
import { Link } from 'react-router-dom';

export default function ServicesPage() {
  // Calculator State
  const [projectType, setProjectType] = useState('spa'); // landing, corporate, spa, fullstack
  const [selectedAddons, setSelectedAddons] = useState(['api', 'responsive']);
  const [isExpress, setIsExpress] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0);

  // Testimonials fetched from JSONPlaceholder
  const [testimonials, setTestimonials] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments?_limit=3')
      .then((res) => res.json())
      .then((data) => {
        const enriched = data.map((item, i) => ({
          id: item.id,
          name: ['გიორგი კალანდაძე', 'ნინო მაისურაძე', 'დავით წერეთელი'][i] || item.name.slice(0, 15),
          company: ['TechNova', 'DigitalPulse', 'ApexLab'][i] || 'Startup Hub',
          role: ['პროდუქტის მენეჯერი', 'დამფუძნებელი', 'CTO'][i],
          comment: item.body,
          rating: 5,
        }));
        setTestimonials(enriched);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingReviews(false));
  }, []);

  // Pricing packages
  const packages = [
    {
      id: 'landing',
      title: 'Landing Page',
      subtitle: 'ერთგვერდიანი სავიზიტო ან პროდუქტის საიტი',
      price: '$250',
      features: [
        'თანამედროვე მორგებული დიზაინი',
        '100% რესპონსიული მობილურზე',
        'სწრაფი ჩატვირთვა (Vite & Tailwind)',
        'საკონტაქტო ფორმა & რუკა',
        'საბაზისო SEO ოპტიმიზაცია',
      ],
      popular: false,
    },
    {
      id: 'spa',
      title: 'React SPA ვებ-აპლიკაცია',
      subtitle: 'მრავალგვერდიანი ინტერაქტიული პლატფორმა',
      price: '$650',
      features: [
        'React 18 + React Router v6 არქიტექტურა',
        'RESTful API სრული ინტეგრაცია',
        'მოდულარული კომპონენტების სისტემა',
        'ცოცხალი ძებნა და ფილტრაციის მოდულები',
        'მოდალური ფანჯრები & ანიმაციები',
        '1 თვიანი უფასო მხარდაჭერა',
      ],
      popular: true,
    },
    {
      id: 'fullstack',
      title: 'Corporate & Full Dashboard',
      subtitle: 'მასშტაბირებადი კორპორატიული გადაწყვეტილება',
      price: '$1,100',
      features: [
        'მრავალდონიანი კომპლექსური UI/UX',
        'Admin Dashboard & მონაცემთა მართვა',
        'CRUD ოპერაციების სრული იმპლემენტაცია',
        'მრავალენოვანი მხარდაჭერა (i18n)',
        'პრემიუმ უსაფრთხოება და ოპტიმიზაცია',
        '3 თვიანი ტექნიკური მხარდაჭერა',
      ],
      popular: false,
    },
  ];

  // Calculator price computation
  const basePrices = {
    landing: 250,
    corporate: 450,
    spa: 650,
    fullstack: 1100,
  };

  const addonPrices = {
    api: 150,
    responsive: 80,
    seo: 100,
    admin: 250,
  };

  const calculateTotal = () => {
    let total = basePrices[projectType] || 250;
    selectedAddons.forEach((addon) => {
      total += addonPrices[addon] || 0;
    });
    if (isExpress) total = Math.round(total * 1.25);
    return total;
  };

  const toggleAddon = (id) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const faqs = [
    {
      q: 'რა ვადებში მზადდება ვებ-გვერდი?',
      a: 'Landing Page-ის შექმნას სჭირდება საშუალოდ 3-5 სამუშაო დღე, ხოლო სრულფასოვანი React SPA აპლიკაციის დამზადებას — 1-2 კვირა.',
    },
    {
      q: 'როგორ ხდება API-სთან ინტეგრაცია?',
      a: 'ვიყენებ თანამედროვე REST API სტანდარტებს, ასინქრონულ JavaScript-სა (Fetch / Axios) და React Hooks-ს. შესაძლებელია ნებისმიერ არსებულ Backend-თან დაკავშირება.',
    },
    {
      q: 'იქნება თუ არა საიტი მობილურზე სრულად მორგებული?',
      a: 'დიახ, 100%-ით. Mobile-First მიდგომა და Tailwind CSS-ის რესპონსიული ბრეიქფოინთები უზრუნველყოფს იდეალურ ჩვენებას როგორც სმარტფონებზე, ისე ტაბლეტებსა და დიდ მონიტორებზე.',
    },
    {
      q: 'რა ტექნოლოგიებს იყენებთ დეველოპმენტში?',
      a: 'ძირითადი სტეკია: React 18, React Router v6, Tailwind CSS, JavaScript (ES6+), Vite, HTML5 სემანტიკა და Git/GitHub.',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy-850 via-[#0E172A] to-navy-900 border border-cyan-500/20 p-7 sm:p-10 shadow-card-dark transition-all">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <Badge variant="cyan" pulse={true} icon={<Sparkles className="w-3.5 h-3.5" />}>
            მომსახურება &amp; პაკეტები
          </Badge>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            სერვისები, ფასები და ციფრული გადაწყვეტილებები
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            გთავაზობთ თანამედროვე ვებ-დეველოპმენტის სრულ ციკლს: იდეიდან სრულყოფილ
            React ვებ-აპლიკაციამდე. გამოთვალეთ თქვენი პროექტის სავარაუდო ბიუჯეტი
            ინტერაქტიული კალკულატორით.
          </p>
        </div>
      </section>

      {/* Pricing Packages Grid */}
      <section className="space-y-6">
        <SectionHeader
          badge="ტარიფები"
          title="სტანდარტული პაკეტები"
          subtitle="აირჩიეთ თქვენი ბიზნესის მოთხოვნებზე მორგებული პაკეტი"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              hoverable={true}
              className={`relative ${
                pkg.popular ? 'border-cyan-400 ring-2 ring-cyan-400/30 shadow-glow-cyan' : ''
              }`}
              badge={
                pkg.popular ? (
                  <Badge variant="cyan" pulse={true}>
                    პოპულარული
                  </Badge>
                ) : (
                  <span className="text-xs font-mono text-slate-400">პაკეტი</span>
                )
              }
              footer={
                <div className="w-full">
                  <Button
                    to="/contact"
                    variant={pkg.popular ? 'primary' : 'secondary'}
                    className="w-full"
                  >
                    შეკვეთა &rarr;
                  </Button>
                </div>
              }
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{pkg.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{pkg.subtitle}</p>
                </div>

                <div className="flex items-baseline gap-1 text-cyan-400">
                  <span className="text-3xl font-extrabold">{pkg.price}</span>
                  <span className="text-xs text-slate-400">/ პროექტი</span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-700/50">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Interactive Project Budget Calculator */}
      <section className="p-7 sm:p-10 rounded-3xl bg-navy-850/80 border border-cyan-500/20 shadow-card-dark space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-6">
          <div>
            <Badge variant="blue" icon={<Calculator className="w-3.5 h-3.5" />}>
              ინტერაქტიული კალკულატორი
            </Badge>
            <h3 className="text-2xl font-bold text-white mt-2">
              პროექტის სავარაუდო ბიუჯეტის გამოთვლა
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              მონიშნეთ თქვენთვის სასურველი პარამეტრები და მიიღეთ რეალური ღირებულება რეალურ დროში.
            </p>
          </div>

          {/* Real-time calculated price badge */}
          <div className="p-4 rounded-2xl bg-navy-800 border border-cyan-500/30 text-right shrink-0">
            <span className="block text-xs text-slate-400">ჯამური სავარაუდო თანხა:</span>
            <span className="text-3xl font-extrabold text-cyan-400 font-mono">
              ${calculateTotal()}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Project Type Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              1. პროექტის ტიპი
            </label>
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              {[
                { id: 'landing', label: 'Landing Page ($250)' },
                { id: 'corporate', label: 'კორპორატიული ($450)' },
                { id: 'spa', label: 'React SPA ($650)' },
                { id: 'fullstack', label: 'Full Dashboard ($1,100)' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setProjectType(t.id)}
                  className={`p-3 rounded-xl border text-left font-medium transition-all cursor-pointer ${
                    projectType === t.id
                      ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-glow-cyan'
                      : 'bg-navy-800 border-slate-700/60 text-slate-300 hover:border-cyan-500/40'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Add-ons Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              2. დამატებითი მოდულები &amp; სერვისები
            </label>
            <div className="space-y-2 text-xs">
              {[
                { id: 'api', label: 'REST API ინტეგრაცია (+$150)' },
                { id: 'responsive', label: 'Mobile First ექსტრემალური ოპტიმიზაცია (+$80)' },
                { id: 'seo', label: 'SEO & Meta ოპტიმიზაცია (+$100)' },
                { id: 'admin', label: 'მართვის პანელი / Admin Panel (+$250)' },
              ].map((addon) => (
                <label
                  key={addon.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-navy-800 border border-slate-700/60 hover:border-cyan-500/40 cursor-pointer transition-colors"
                >
                  <span className="text-slate-200">{addon.label}</span>
                  <input
                    type="checkbox"
                    checked={selectedAddons.includes(addon.id)}
                    onChange={() => toggleAddon(addon.id)}
                    className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 accent-cyan-500 cursor-pointer"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Express delivery option */}
        <div className="pt-4 border-t border-slate-700/50 flex flex-wrap items-center justify-between gap-4">
          <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={isExpress}
              onChange={(e) => setIsExpress(e.target.checked)}
              className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 accent-cyan-500"
            />
            <span className="font-semibold text-white">
              ექსპრეს დამზადება (ვადა მცირდება 50%-ით, +25%)
            </span>
          </label>

          <Button to="/contact" variant="primary" size="md">
            მოითხოვეთ შეთავაზება (${calculateTotal()}) &rarr;
          </Button>
        </div>
      </section>

      {/* Client Reviews / Testimonials (JSONPlaceholder Comments API) */}
      <section className="space-y-6">
        <SectionHeader
          badge="შეფასებები"
          title="კლიენტების გამოხმაურებები"
          subtitle="მონაცემები დინამიურად იტვირთება JSONPlaceholder /comments ენდფოინთიდან"
        />

        {loadingReviews ? (
          <p className="text-center text-xs text-slate-400 py-6 italic">
            შეფასებები იტვირთება...
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.id} hoverable={true} className="p-6">
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 italic mb-4 leading-relaxed line-clamp-4">
                  "{t.comment}"
                </p>
                <div className="pt-3 border-t border-slate-700/50 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-white">{t.name}</h4>
                    <p className="text-[11px] text-cyan-400">{t.role}, {t.company}</p>
                  </div>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* FAQ Accordion */}
      <section className="space-y-6">
        <SectionHeader
          badge="ხშირად დასმული კითხვები"
          title="FAQ &amp; დამატებითი დეტალები"
          subtitle="პასუხები ყველაზე გავრცელებულ კითხვებზე"
        />

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl bg-navy-850/80 border border-cyan-500/15 overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-bold text-white text-sm sm:text-base hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                {openFaq === i ? (
                  <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0 ml-2" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                )}
              </button>
              {openFaq === i && (
                <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-700/40 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
