'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface ClockRecord {
  id: string;
  userId: string;
  userName: string;
  clockIn: string;
  clockOut: string | null;
}

function formatDuration(clockIn: string, clockOut: string | null): string {
  const end = clockOut ? new Date(clockOut) : new Date();
  const diff = Math.floor((end.getTime() - new Date(clockIn).getTime()) / 1000);
  const h = Math.floor(diff / 3600);
  const m = Math.floor((diff % 3600) / 60);
  return `${h}h ${m}m`;
}

function formatDateTime(dt: string): string {
  return new Date(dt).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export default function ContractorDashboard() {
  const router = useRouter();
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [records, setRecords] = useState<ClockRecord[]>([]);
  const [sortedRecords, setSortedRecords] = useState<ClockRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchData = useCallback(async () => {
    const [clockRes, recordsRes] = await Promise.all([
      fetch('/api/contractor/clock'),
      fetch('/api/contractor/records'),
    ]);
    if (clockRes.status === 401 || recordsRes.status === 401) {
      router.push('/contractor/login');
      return;
    }
    const clockData = await clockRes.json();
    const recordsData = await recordsRes.json();
    setIsClockedIn(clockData.isClockedIn);
    const fetched: ClockRecord[] = recordsData.records || [];
    setRecords(fetched);
    setSortedRecords([...fetched].reverse());
    setLoading(false);
  }, [router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleClock = async (action: 'clockIn' | 'clockOut') => {
    setActionLoading(true);
    setMessage('');
    const res = await fetch('/api/contractor/clock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage(action === 'clockIn' ? 'Clocked in successfully!' : 'Clocked out successfully!');
      await fetchData();
    } else {
      setMessage(data.error || 'Action failed');
    }
    setActionLoading(false);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/contractor/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f0f4f8' }}>
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f0f4f8' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#003366' }} className="text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Suffolk Cleaning</h1>
          <p className="text-blue-200 text-sm">Contractor Portal</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-blue-200 hover:text-white text-sm transition-colors"
        >
          Sign Out
        </button>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Status card */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6 text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${isClockedIn ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
            <span className={`w-2 h-2 rounded-full ${isClockedIn ? 'bg-green-500' : 'bg-gray-400'}`}></span>
            {isClockedIn ? 'Currently Clocked In' : 'Currently Clocked Out'}
          </div>

          {message && (
            <p className={`mb-4 text-sm ${message.includes('failed') || message.includes('error') ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </p>
          )}

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => handleClock('clockIn')}
              disabled={isClockedIn || actionLoading}
              className="px-8 py-3 rounded-xl font-semibold text-white transition-opacity disabled:opacity-40"
              style={{ backgroundColor: '#0066CC' }}
            >
              Clock In
            </button>
            <button
              onClick={() => handleClock('clockOut')}
              disabled={!isClockedIn || actionLoading}
              className="px-8 py-3 rounded-xl font-semibold text-white transition-opacity disabled:opacity-40"
              style={{ backgroundColor: '#003366' }}
            >
              Clock Out
            </button>
          </div>
        </div>

        {/* Records */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4" style={{ color: '#003366' }}>My Time Records</h2>
          {records.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No time records yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 text-gray-500 font-medium">Date</th>
                    <th className="text-left py-3 px-2 text-gray-500 font-medium">Clock In</th>
                    <th className="text-left py-3 px-2 text-gray-500 font-medium">Clock Out</th>
                    <th className="text-left py-3 px-2 text-gray-500 font-medium">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedRecords.map((r) => (
                    <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-2 text-gray-700">{new Date(r.clockIn).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                      <td className="py-3 px-2 text-gray-700">{formatDateTime(r.clockIn)}</td>
                      <td className="py-3 px-2 text-gray-700">{r.clockOut ? formatDateTime(r.clockOut) : <span className="text-green-600 font-medium">Active</span>}</td>
                      <td className="py-3 px-2 text-gray-700">{formatDuration(r.clockIn, r.clockOut)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
