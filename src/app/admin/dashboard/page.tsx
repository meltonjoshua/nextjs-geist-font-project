'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface ClockRecord {
  id: string;
  userId: string;
  userName: string;
  clockIn: string;
  clockOut: string | null;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [records, setRecords] = useState<ClockRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const [usersRes, recordsRes] = await Promise.all([
      fetch('/api/admin/users'),
      fetch('/api/admin/records'),
    ]);
    if (usersRes.status === 401) {
      router.push('/admin/login');
      return;
    }
    const usersData = await usersRes.json();
    const recordsData = await recordsRes.json();
    setUsers(usersData.users || []);
    setRecords(recordsData.records || []);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const contractors = users.filter((u) => u.role === 'contractor');
  const admins = users.filter((u) => u.role === 'admin');
  const activeClocks = records.filter((r) => r.clockOut === null);
  const todayRecords = records.filter((r) => {
    const today = new Date().toDateString();
    return new Date(r.clockIn).toDateString() === today;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f0f4f8' }}>
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f0f4f8' }}>
      <header style={{ backgroundColor: '#003366' }} className="text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Suffolk Cleaning</h1>
          <p className="text-blue-200 text-sm">Admin Portal</p>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/admin/dashboard" className="text-white font-medium">Dashboard</Link>
          <Link href="/admin/users" className="text-blue-200 hover:text-white transition-colors">Users</Link>
          <Link href="/admin/records" className="text-blue-200 hover:text-white transition-colors">Records</Link>
          <Link href="/admin/account" className="text-blue-200 hover:text-white transition-colors">My Account</Link>
          <button onClick={handleLogout} className="text-blue-200 hover:text-white transition-colors">Sign Out</button>
        </nav>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6" style={{ color: '#003366' }}>Overview</h2>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Contractors', value: contractors.length, icon: '👷' },
            { label: 'Admin Users', value: admins.length, icon: '🔑' },
            { label: 'Currently Clocked In', value: activeClocks.length, icon: '🟢' },
            { label: "Today's Sessions", value: todayRecords.length, icon: '📅' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold" style={{ color: '#003366' }}>{stat.value}</div>
              <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link href="/admin/users" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow flex items-center gap-4">
            <div className="text-3xl">👥</div>
            <div>
              <p className="font-semibold" style={{ color: '#003366' }}>Manage Users</p>
              <p className="text-sm text-gray-500">Add, edit, or remove contractors and admins</p>
            </div>
          </Link>
          <Link href="/admin/records" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow flex items-center gap-4">
            <div className="text-3xl">🕐</div>
            <div>
              <p className="font-semibold" style={{ color: '#003366' }}>View Records</p>
              <p className="text-sm text-gray-500">See all clock-in/out records</p>
            </div>
          </Link>
          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
            <div className="text-3xl">📊</div>
            <div>
              <p className="font-semibold" style={{ color: '#003366' }}>Total Records</p>
              <p className="text-sm text-gray-500">{records.length} clock records in system</p>
            </div>
          </div>
        </div>

        {/* Active sessions */}
        {activeClocks.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold mb-4" style={{ color: '#003366' }}>Currently Clocked In</h3>
            <div className="space-y-3">
              {activeClocks.map((r) => (
                <div key={r.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="font-medium text-gray-700">{r.userName}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    Since {new Date(r.clockIn).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
