import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Badge from '../common/Badge';

export default function AddEmployeeModal({
  isOpen,
  onClose,
  onAddEmployee,
}) {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    company: '',
    phone: '',
    city: '',
    website: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users',
        {
          method: 'POST',
          body: JSON.stringify({
            name: formData.name,
            username: formData.username,
            email: formData.email,
            phone: formData.phone || '555-0199',
            website: formData.website || 'example.ge',
            address: { city: formData.city || 'თბილისი' },
            company: { name: formData.company },
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );

      const result = await response.json();

      onAddEmployee({
        id: result.id || Date.now(),
        name: formData.name,
        username: formData.username,
        email: formData.email,
        phone: formData.phone || '555-0199',
        website: formData.website || 'example.ge',
        address: { city: formData.city || 'თბილისი' },
        company: {
          name: formData.company,
          catchPhrase: 'ინოვაციური ციფრული გადაწყვეტილებები',
        },
        role: 'ვებ-სპეციალისტი (ახალი)',
        isNew: true,
      });

      // Reset & Close
      setFormData({
        name: '',
        username: '',
        email: '',
        company: '',
        phone: '',
        city: '',
        website: '',
      });
      onClose();
    } catch (err) {
      alert('შეცდომა თანამშრომლის დამატებისას: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-lg"
      badge={
        <Badge variant="emerald" pulse={true}>
          REST API · POST /users
        </Badge>
      }
      title="ახალი თანამშრომლის დამატება"
      subtitle="მონაცემები გადაიგზავნება JSONPlaceholder REST სერვერზე (HTTP 201 Created)."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              სახელი და გვარი *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="მაგ: გიორგი ბერიძე"
              className="w-full px-3.5 py-2.5 rounded-xl border border-cyan-500/25 bg-navy-800 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Username *
            </label>
            <input
              type="text"
              required
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              placeholder="მაგ: giorgi_b"
              className="w-full px-3.5 py-2.5 rounded-xl border border-cyan-500/25 bg-navy-800 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              ელ-ფოსტა *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="giorgi@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-cyan-500/25 bg-navy-800 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              კომპანია *
            </label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              placeholder="მაგ: Tech Solutions"
              className="w-full px-3.5 py-2.5 rounded-xl border border-cyan-500/25 bg-navy-800 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              ტელეფონი
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="599-123-456"
              className="w-full px-3.5 py-2.5 rounded-xl border border-cyan-500/25 bg-navy-800 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              ქალაქი
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              placeholder="თბილისი"
              className="w-full px-3.5 py-2.5 rounded-xl border border-cyan-500/25 bg-navy-800 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            ვებსაიტი
          </label>
          <input
            type="text"
            value={formData.website}
            onChange={(e) =>
              setFormData({ ...formData, website: e.target.value })
            }
            placeholder="mywebsite.ge"
            className="w-full px-3.5 py-2.5 rounded-xl border border-cyan-500/25 bg-navy-800 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
          />
        </div>

        <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-700/50">
          <Button type="button" variant="secondary" onClick={onClose}>
            გაუქმება
          </Button>
          <Button type="submit" variant="primary" loading={submitting}>
            დამატება (POST)
          </Button>
        </div>
      </form>
    </Modal>
  );
}
