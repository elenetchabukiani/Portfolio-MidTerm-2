import React, { useState, useEffect, useMemo } from 'react';
import {
  Users,
  Plus,
  RotateCw,
  AlertTriangle,
  Search,
  CheckCircle2,
  Trash2,
} from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import SearchBar from '../components/common/SearchBar';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import EmployeeCard from '../components/employees/EmployeeCard';
import EmployeeDetailsModal from '../components/employees/EmployeeDetailsModal';
import AddEmployeeModal from '../components/employees/AddEmployeeModal';

const roles = [
  'Lead Web Developer',
  'Frontend Engineer',
  'Full Stack Developer',
  'UI/UX Designer',
  'Backend Engineer',
  'DevOps Architect',
  'Product Specialist',
  'QA Test Engineer',
  'Project Manager',
  'Cloud Developer',
];

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Modal states
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!res.ok) throw new Error(`სერვერმა დააბრუნა სტატუსი: ${res.status}`);
      const data = await res.json();
      const mapped = data.map((user, idx) => ({
        ...user,
        role: roles[idx % roles.length],
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(
          user.username
        )}`,
      }));
      setEmployees(mapped);
    } catch (err) {
      setError(err.message || 'მონაცემების წამოღება ვერ მოხერხდა');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Live real-time search filter
  const filteredEmployees = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return employees;
    return employees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(q) ||
        emp.username.toLowerCase().includes(q) ||
        emp.email.toLowerCase().includes(q) ||
        (emp.company && emp.company.name.toLowerCase().includes(q)) ||
        (emp.address && emp.address.city.toLowerCase().includes(q))
    );
  }, [employees, searchQuery]);

  // Handle Add Employee (POST)
  const handleAddEmployee = (newEmp) => {
    setEmployees((prev) => [newEmp, ...prev]);
    showToast(`თანამშრომელი "${newEmp.name}" წარმატებით დაემატა! (POST /users)`);
  };

  // Handle Delete Employee (DELETE)
  const confirmDelete = async () => {
    if (!userToDelete) return;
    try {
      await fetch(
        `https://jsonplaceholder.typicode.com/users/${userToDelete.id}`,
        {
          method: 'DELETE',
        }
      );
      setEmployees((prev) => prev.filter((e) => e.id !== userToDelete.id));
      showToast(
        `თანამშრომელი "${userToDelete.name}" წაიშალა (DELETE /users/${userToDelete.id})`
      );
    } catch (err) {
      alert('წაშლა ვერ მოხერხდა: ' + err.message);
    } finally {
      setUserToDelete(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 p-4 rounded-2xl bg-navy-900/95 border border-emerald-500/40 text-emerald-300 text-sm shadow-2xl flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy-850 via-[#0E172A] to-navy-900 border border-cyan-500/20 p-7 sm:p-10 shadow-card-dark transition-all">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="cyan" pulse={true}>
              REST API მონაცემები · JSONPlaceholder
            </Badge>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-navy-800 text-slate-300 border border-cyan-500/20 font-mono">
              GET /users · POST /users · DELETE /users · GET /posts · GET /todos
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                თანამშრომლები და გუნდის წევრები
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                მონაცემები რეალურ დროში იტვირთება{' '}
                <code className="text-cyan-300 bg-navy-800 px-2 py-0.5 rounded text-xs font-mono">
                  https://jsonplaceholder.typicode.com/users
                </code>{' '}
                მისამართიდან. საიტზე ინტეგრირებულია ცოცხალი ძებნა და დეტალების მოდალი.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
              <div className="p-3.5 rounded-2xl bg-navy-800/90 border border-cyan-500/20 text-center">
                <span className="block text-2xl font-extrabold text-cyan-400">
                  {employees.length}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  თანამშრომელი
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-navy-800/90 border border-cyan-500/20 text-center">
                <span className="block text-2xl font-extrabold text-emerald-400">
                  200 OK
                </span>
                <span className="text-xs text-slate-400 font-medium">სტატუსი</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-navy-800/90 border border-cyan-500/20 text-center col-span-2 sm:col-span-1">
                <span className="block text-2xl font-extrabold text-blue-400">
                  REST
                </span>
                <span className="text-xs text-slate-400 font-medium">API არქიტექტურა</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Control Toolbar: Search bar + Refresh + Add Button */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-3xl bg-navy-850/80 border border-cyan-500/20 shadow-card-dark">
        {/* Reusable Search Bar Component */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery('')}
          placeholder="მოძებნეთ სახელით, მეილით ან კომპანიით..."
        />

        {/* Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="secondary"
            size="md"
            icon={
              <RotateCw
                className={`w-4 h-4 text-cyan-400 ${
                  isRefreshing ? 'animate-spin' : ''
                }`}
              />
            }
            onClick={() => {
              setIsRefreshing(true);
              fetchEmployees();
            }}
          >
            <span className="hidden sm:inline">განახლება</span>
          </Button>

          <Button
            variant="primary"
            size="md"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsAddOpen(true)}
          >
            თანამშრომლის დამატება
          </Button>
        </div>
      </section>

      {/* Results Count Banner if searching */}
      {searchQuery && (
        <div className="flex items-center justify-between text-xs text-slate-400 px-2">
          <span>
            ძებნის შედეგი "{searchQuery}": {filteredEmployees.length} თანამშრომელი
          </span>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="text-cyan-400 hover:underline cursor-pointer"
          >
            ფილტრის გასუფთავება
          </button>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="animate-pulse bg-navy-850/80 rounded-3xl p-6 border border-cyan-500/15 space-y-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-navy-800" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-navy-800 rounded w-3/4" />
                  <div className="h-3 bg-navy-800 rounded w-1/2" />
                </div>
              </div>
              <div className="space-y-2 pt-2">
                <div className="h-3 bg-navy-800 rounded" />
                <div className="h-3 bg-navy-800 rounded w-5/6" />
              </div>
              <div className="h-10 bg-navy-800 rounded-xl" />
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="text-center py-12 px-6 rounded-3xl bg-navy-850/80 border border-rose-500/30 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">
            მონაცემების ჩატვირთვა ვერ მოხერხდა
          </h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto">{error}</p>
          <Button variant="primary" onClick={fetchEmployees}>
            ხელახლა ცდა
          </Button>
        </div>
      )}

      {/* Empty Search State */}
      {!loading && !error && filteredEmployees.length === 0 && (
        <div className="text-center py-12 px-6 rounded-3xl bg-navy-850/80 border border-cyan-500/15 space-y-3">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-950/70 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">
            თანამშრომელი ვერ მოიძებნა
          </h3>
          <p className="text-slate-400 text-sm">
            სცადეთ სხვა საძიებო სიტყვა ან გაასუფთავეთ ფილტრი.
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setSearchQuery('')}
          >
            ფილტრის გასუფთავება
          </Button>
        </div>
      )}

      {/* Employees Grid */}
      {!loading && !error && filteredEmployees.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((user) => (
            <EmployeeCard
              key={user.id}
              user={user}
              onViewDetails={(u) => {
                setSelectedUser(u);
                setIsDetailsOpen(true);
              }}
              onDelete={(u) => setUserToDelete(u)}
            />
          ))}
        </div>
      )}

      {/* Employee Details Modal (Posts & Todos API) */}
      <EmployeeDetailsModal
        user={selectedUser}
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedUser(null);
        }}
      />

      {/* Add Employee Modal (POST /users) */}
      <AddEmployeeModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAddEmployee={handleAddEmployee}
      />

      {/* Delete Confirmation Dialog */}
      {userToDelete && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-md p-4 flex items-center justify-center animate-fadeIn"
          role="dialog"
        >
          <div className="relative w-full max-w-md rounded-3xl bg-[#0E172A] border border-rose-500/30 p-6 sm:p-7 shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center border border-rose-500/30">
              <Trash2 className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xl font-bold text-white">თანამშრომლის წაშლა</h3>
              <p className="text-sm text-slate-300">
                ნამდვილად გსურთ{' '}
                <span className="font-semibold text-rose-300">
                  {userToDelete.name}
                </span>
                -ის წაშლა?
              </p>
              <p className="text-xs text-slate-500 font-mono">
                გაიგზავნება DELETE მოთხოვნა /users/{userToDelete.id}
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setUserToDelete(null)}
              >
                გაუქმება
              </Button>
              <Button variant="danger" size="sm" onClick={confirmDelete}>
                წაშლა (DELETE)
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
