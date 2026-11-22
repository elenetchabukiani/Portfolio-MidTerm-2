import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import Card from '../components/common/Card';
import SectionHeader from '../components/common/SectionHeader';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'general',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [successResponse, setSuccessResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessResponse(null);

    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
          method: 'POST',
          body: JSON.stringify({
            title: `[კონტაქტი: ${formData.topic}] ${formData.name} (${formData.email})`,
            body: formData.message,
            userId: 1,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );

      const data = await response.json();
      setSuccessResponse({
        id: data.id,
        name: formData.name,
      });

      setFormData({
        name: '',
        email: '',
        topic: 'general',
        message: '',
      });
    } catch (err) {
      alert('შეტყობინების გაგზავნა ვერ მოხერხდა: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: 'ელექტრონული ფოსტა',
      detail: 'elene.chabukiani@example.com',
      href: 'mailto:elene.chabukiani@example.com',
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: 'ტელეფონის ნომერი',
      detail: '+995 555 12 34 56',
      href: 'tel:+995555123456',
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: 'სამუშაო ლოკაცია',
      detail: 'თბილისი, საქართველო (Remote / On-site)',
      href: null,
    },
  ];

  return (
    <div className="space-y-10 sm:space-y-12">
      <SectionHeader
        badge="დამიკავშირდით"
        title="საკონტაქტო ინფორმაცია"
        subtitle="მოხარული ვიქნები ვითანამშრომლო საინტერესო პროექტებზე. შეავსეთ ფორმა ან მომწერეთ პირდაპირ."
      />

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {contactMethods.map((c, i) => (
          <Card key={i} className="p-6">
            <div className="flex items-center gap-3.5 mb-2">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/70 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0">
                {c.icon}
              </div>
              <h4 className="font-bold text-white text-sm">{c.title}</h4>
            </div>
            {c.href ? (
              <a
                href={c.href}
                className="text-xs sm:text-sm text-cyan-300 hover:text-cyan-200 transition-colors break-all"
              >
                {c.detail}
              </a>
            ) : (
              <p className="text-xs sm:text-sm text-slate-300">{c.detail}</p>
            )}
          </Card>
        ))}
      </div>

      {/* Contact Form Section */}
      <section className="bg-navy-850/80 rounded-3xl p-7 sm:p-10 border border-cyan-500/20 shadow-card-dark relative overflow-hidden">
        <div className="max-w-2xl space-y-6">
          <div>
            <Badge variant="blue" pulse={true}>
              REST API · POST /posts
            </Badge>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
              მომწერეთ შეტყობინება
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              ფორმა ინტეგრირებულია JSONPlaceholder API-სთან და აბრუნებს დასტურს.
            </p>
          </div>

          {/* Success Banner */}
          {successResponse && (
            <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-200 text-sm flex items-center gap-3 animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                გმადლობთ, {successResponse.name}! თქვენი შეტყობინება წარმატებით
                გაიგზავნა (POST /posts · ID: #{successResponse.id}).
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  თქვენი სახელი: *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="მაგ: გიორგი ბერიძე"
                  className="w-full px-4 py-3 rounded-2xl border border-cyan-500/25 bg-navy-800 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  ელექტრონული ფოსტა: *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="giorgi@example.com"
                  className="w-full px-4 py-3 rounded-2xl border border-cyan-500/25 bg-navy-800 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                შეტყობინების თემა:
              </label>
              <select
                value={formData.topic}
                onChange={(e) =>
                  setFormData({ ...formData, topic: e.target.value })
                }
                className="w-full px-4 py-3 rounded-2xl border border-cyan-500/25 bg-navy-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20 transition-all cursor-pointer"
              >
                <option value="general" className="bg-navy-900 text-slate-100">
                  ზოგადი შეკითხვა
                </option>
                <option value="freelance" className="bg-navy-900 text-slate-100">
                  პროექტზე თანამშრომლობა
                </option>
                <option value="job" className="bg-navy-900 text-slate-100">
                  ვაკანსიის შეთავაზება
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                თქვენი შეტყობინება: *
              </label>
              <textarea
                rows={5}
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="დაწერეთ თქვენი შეტყობინება აქ..."
                className="w-full px-4 py-3.5 rounded-2xl border border-cyan-500/25 bg-navy-800 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20 transition-all resize-y"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button
                type="submit"
                variant="primary"
                loading={submitting}
                icon={<Send className="w-4 h-4" />}
              >
                შეტყობინების გაგზავნა
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  setFormData({
                    name: '',
                    email: '',
                    topic: 'general',
                    message: '',
                  })
                }
              >
                გასუფთავება
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
