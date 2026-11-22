import React from 'react';
import { Mail, Phone, MapPin, Globe, FileText, Trash2, Building2 } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';

export default function EmployeeCard({
  user,
  onViewDetails,
  onDelete,
}) {
  return (
    <Card
      className="relative"
      badge={
        user.isNew ? (
          <Badge variant="emerald" pulse={true}>
            ახალი
          </Badge>
        ) : (
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-navy-800 text-cyan-400 border border-cyan-500/20">
            #{user.id}
          </span>
        )
      }
      footer={
        <div className="w-full flex items-center gap-2">
          <button
            type="button"
            onClick={() => onViewDetails(user)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-navy-800 hover:bg-cyan-500/10 text-cyan-300 hover:text-cyan-400 border border-cyan-500/25 hover:border-cyan-400 text-xs font-semibold transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>პოსტები &amp; დავალებები</span>
          </button>
          <button
            type="button"
            onClick={() => onDelete(user)}
            className="w-9 h-9 rounded-xl bg-navy-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700 hover:border-rose-500/40 flex items-center justify-center transition-all cursor-pointer"
            title="თანამშრომლის წაშლა"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      }
    >
      <div>
        {/* Avatar and Name */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-14 h-14 rounded-2xl p-1 bg-navy-800 border border-cyan-500/30 ring-2 ring-cyan-400/20 group-hover:ring-cyan-400 group-hover:scale-105 transition-all shrink-0">
            <img
              src={
                user.avatar ||
                `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(
                  user.username || user.name
                )}`
              }
              alt={user.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.name
                )}&background=0284c7&color=fff`;
              }}
            />
            <span
              className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-navy-900"
              title="აქტიური / ონლაინ"
            />
          </div>
          <div className="pr-4 min-w-0">
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
              {user.name}
            </h3>
            <p className="text-xs font-medium text-cyan-400 truncate">
              @{user.username}
            </p>
            <span className="inline-block mt-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-cyan-950/70 text-cyan-300 border border-cyan-500/20">
              {user.role || 'ვებ-სპეციალისტი'}
            </span>
          </div>
        </div>

        {/* Company info */}
        <div className="p-3 rounded-2xl bg-navy-800/60 border border-cyan-500/15 mb-4 text-xs space-y-1">
          <div className="flex items-center gap-1.5 text-slate-300 font-semibold truncate">
            <Building2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">
              {user.company?.name || 'კომპანია მითითებული არაა'}
            </span>
          </div>
          {user.company?.catchPhrase && (
            <p className="text-slate-400 italic text-[11px] truncate">
              "{user.company.catchPhrase}"
            </p>
          )}
        </div>

        {/* Contact details */}
        <ul className="space-y-2 text-xs text-slate-300">
          <li className="flex items-center gap-2 truncate">
            <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <a
              href={`mailto:${user.email}`}
              className="hover:text-cyan-400 truncate hover:underline transition-colors"
            >
              {user.email}
            </a>
          </li>
          <li className="flex items-center gap-2 truncate">
            <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <a
              href={`tel:${user.phone}`}
              className="hover:text-cyan-400 truncate transition-colors"
            >
              {user.phone}
            </a>
          </li>
          <li className="flex items-center gap-2 truncate">
            <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">
              {user.address?.city || 'თბილისი'}
              {user.address?.street ? `, ${user.address.street}` : ''}
            </span>
          </li>
          <li className="flex items-center gap-2 truncate">
            <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 truncate text-cyan-300/90 hover:underline transition-colors"
            >
              {user.website} &nearr;
            </a>
          </li>
        </ul>
      </div>
    </Card>
  );
}
