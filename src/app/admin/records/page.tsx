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
  if (!clockOut) return '—';
  const diff = Math.floor((new Date(clockOut).getTime() - new Date(clockIn).getTime()) / 1000);
  const h = Math.floor(diff / 3600);
  const m = Math.floor((diff % 3600) / 60);
  return `${h}h ${m}m`;
}

function exportCSV(records: ClockRecord[]) {
  const header = 'Contractor,Clock In,Clock Out,Duration,Status';
  const rows = records.map((r) => {
    const duration = r.clockOut ? formatDuration(r.clockIn, r.clockOut) : '';
    const status = r.clockOut ? 'Completed' : 'Active';
    return [
      `"${r.userName}"`,
      `"${formatDateTime(r.clockIn)}"`,
      r.clockOut ? `"${formatDateTime(r.clockOut)}"` : '""',
      `"${duration}"`,
      `"${status}"`,
    ].join(',');
  });
  const csv = [header, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `clock-records-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminRecordsPage() {
  const router = useRouter();
  const [records, setRecords] = useState<ClockRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [forceClockOutId, setForceClockOutId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

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

  const handleForceClockOut = async (id: string) => {
    setActionLoading(true);
    const res = await fetch('/api/admin/records', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setForceClockOutId(null);
      await fetchRecords();
    }
    setActionLoading(false);
  };

  const filtered = records.filter((r) => {
    if (filter && !r.userName.toLowerCase().includes(filter.toLowerCase())) return false;
    if (dateFrom) {
      const from = new Date(dateFrom);
      from.setHours(0, 0, 0, 0);
      if (new Date(r.clockIn) < from) return false;
    }
    if (dateTo) {
      const to = new Date(dateTo);
      to.setHours(23, 59, 59, 999);
      if (new Date(r.clockIn) > to) return false;
    }
    return true;
  });

  const sorted = [...filtered].reverse();

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
          <Link href="/admin/account" className="text-blue-200 hover:text-white transition-colors">My Account</Link>
          <button onClick={handleLogout} className="text-blue-200 hover:text-white transition-colors">Sign Out</button>
        </nav>
        <div className="md:hidden flex gap-4 text-sm">
          <Link href="/admin/dashboard" className="text-blue-200 hover:text-white">Dashboard</Link>
          <button onClick={handleLogout} className="text-blue-200 hover:text-white">Sign Out</button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold" style={{ color: '#003366' }}>Clock Records</h2>
          <button
            onClick={() => exportCSV(sorted)}
            className="px-4 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#0066CC' }}
          >
            ⬇ Export CSV
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Filter by contractor name..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
          />
          <div className="flex gap-2 items-center text-sm text-gray-600">
            <label className="whitespace-nowrap">From:</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2 items-center text-sm text-gray-600">
            <label className="whitespace-nowrap">To:</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {(filter || dateFrom || dateTo) && (
            <button
              onClick={() => { setFilter(''); setDateFrom(''); setDateTo(''); }}
              className="text-sm text-gray-500 hover:text-gray-700 underline whitespace-nowrap"
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {sorted.length === 0 ? (
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
                    <th className="text-left py-3 px-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((r) => (
                    <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-800">{r.userName}</td>
                      <td className="py-3 px-4 text-gray-600">{formatDateTime(r.clockIn)}</td>
                      <td className="py-3 px-4 text-gray-600">{r.clockOut ? formatDateTime(r.clockOut) : '—'}</td>
                      <td className="py-3 px-4 text-gray-600">{formatDuration(r.clockIn, r.clockOut)}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${r.clockOut ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-700'}`}>
                          {r.clockOut ? 'Completed' : 'Active'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {!r.clockOut && (
                          forceClockOutId === r.id ? (
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-600">Confirm?</span>
                              <button
                                onClick={() => handleForceClockOut(r.id)}
                                disabled={actionLoading}
                                className="text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                              >
                                Yes
                              </button>
                              <button
                                onClick={() => setForceClockOutId(null)}
                                className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                              >
                                No
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setForceClockOutId(r.id)}
                              className="text-xs px-2 py-1 border border-orange-400 text-orange-600 rounded hover:bg-orange-50 transition-colors"
                            >
                              Force Clock-Out
                            </button>
                          )
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-500 mt-3">
          Showing {sorted.length} of {records.length} records
        </p>
      </div>
    </div>
  );
}

