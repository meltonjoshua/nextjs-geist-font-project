'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ClockRecord {
  id: string;
  userId: string;
  userName: string;
  clockIn: string;
  clockOut: string | null;
}

function formatDateTime(dt: string): string {
  return new Date(dt).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function formatDuration(clockIn: string, clockOut: string | null): string {
  if (!clockOut) return 'Active';
  const diff = Math.floor((new Date(clockOut).getTime() - new Date(clockIn).getTime()) / 1000);
  const h = Math.floor(diff / 3600);
  const m = Math.floor((diff % 3600) / 60);
  return `${h}h ${m}m`;
}

export default function AdminRecordsPage() {
  const router = useRouter();
  const [records, setRecords] = useState<ClockRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const fetchRecords = useCallback(async () => {
    const res = await fetch('/api/admin/records');
    if (res.status === 401) { router.push('/admin/login'); return; }
    const data = await res.json();
    setRecords(data.records || []);
    setLoading(false);
  }, [router]);

  useEffect(() => { fetchRecords(); }, [fetchRecords]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const filtered = records.filter((r) =>
    filter === '' || r.userName.toLowerCase().includes(filter.toLowerCase())
  );

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
          <Link href="/admin/dashboard" className="text-blue-200 hover:text-white transition-colors">Dashboard</Link>
          <Link href="/admin/users" className="text-blue-200 hover:text-white transition-colors">Users</Link>
          <Link href="/admin/records" className="text-white font-medium">Records</Link>
          <button onClick={handleLogout} className="text-blue-200 hover:text-white transition-colors">Sign Out</button>
        </nav>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold" style={{ color: '#003366' }}>Clock Records</h2>
          <input
            type="text"
            placeholder="Filter by contractor name..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {filtered.length === 0 ? (
            <p className="text-gray-500 text-center py-12">No records found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead style={{ backgroundColor: '#003366' }} className="text-white">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium">Contractor</th>
                    <th className="text-left py-3 px-4 font-medium">Clock In</th>
                    <th className="text-left py-3 px-4 font-medium">Clock Out</th>
                    <th className="text-left py-3 px-4 font-medium">Duration</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[...filtered].reverse().map((r) => (
                    <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-800">{r.userName}</td>
                      <td className="py-3 px-4 text-gray-600">{formatDateTime(r.clockIn)}</td>
                      <td className="py-3 px-4 text-gray-600">{r.clockOut ? formatDateTime(r.clockOut) : '—'}</td>
                      <td className="py-3 px-4 text-gray-600">{r.clockOut ? formatDuration(r.clockIn, r.clockOut) : '—'}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${r.clockOut ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-700'}`}>
                          {r.clockOut ? 'Completed' : 'Active'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-500 mt-3">
          Showing {filtered.length} of {records.length} records
        </p>
      </div>
    </div>
  );
}
