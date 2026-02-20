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

interface NewUserForm {
  name: string;
  email: string;
  password: string;
  role: string;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [form, setForm] = useState<NewUserForm>({ name: '', email: '', password: '', role: 'contractor' });
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    const res = await fetch('/api/admin/users');
    if (res.status === 401) { router.push('/admin/login'); return; }
    const data = await res.json();
    setUsers(data.users || []);
    setLoading(false);
  }, [router]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const openAddModal = () => {
    setEditUser(null);
    setForm({ name: '', email: '', password: '', role: 'contractor' });
    setFormError('');
    setShowModal(true);
  };

  const openEditModal = (user: User) => {
    setEditUser(user);
    setForm({ name: user.name, email: user.email, password: '', role: user.role });
    setFormError('');
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);
    try {
      const method = editUser ? 'PUT' : 'POST';
      const body = editUser
        ? { id: editUser.id, ...form }
        : form;
      const res = await fetch('/api/admin/users', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || 'Operation failed');
        return;
      }
      setShowModal(false);
      await fetchUsers();
    } catch {
      setFormError('An unexpected error occurred.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch('/api/admin/users', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setDeleteConfirm(null);
      await fetchUsers();
    }
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
      <header style={{ backgroundColor: '#003366' }} className="text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Suffolk Cleaning</h1>
          <p className="text-blue-200 text-sm">Admin Portal</p>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/admin/dashboard" className="text-blue-200 hover:text-white transition-colors">Dashboard</Link>
          <Link href="/admin/users" className="text-white font-medium">Users</Link>
          <Link href="/admin/records" className="text-blue-200 hover:text-white transition-colors">Records</Link>
          <button onClick={handleLogout} className="text-blue-200 hover:text-white transition-colors">Sign Out</button>
        </nav>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold" style={{ color: '#003366' }}>User Management</h2>
          <button
            onClick={openAddModal}
            style={{ backgroundColor: '#003366' }}
            className="text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity text-sm"
          >
            + Add User
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead style={{ backgroundColor: '#003366' }} className="text-white">
              <tr>
                <th className="text-left py-3 px-4 font-medium">Name</th>
                <th className="text-left py-3 px-4 font-medium">Email</th>
                <th className="text-left py-3 px-4 font-medium">Role</th>
                <th className="text-left py-3 px-4 font-medium">Created</th>
                <th className="text-left py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{user.name}</td>
                  <td className="py-3 px-4 text-gray-600">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-500">{new Date(user.createdAt).toLocaleDateString('en-GB')}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(user)}
                        style={{ color: '#0066CC' }}
                        className="hover:underline text-xs font-medium"
                      >
                        Edit
                      </button>
                      {deleteConfirm === user.id ? (
                        <span className="flex gap-1">
                          <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:underline text-xs font-medium">Confirm</button>
                          <button onClick={() => setDeleteConfirm(null)} className="text-gray-500 hover:underline text-xs">Cancel</button>
                        </span>
                      ) : (
                        <button onClick={() => setDeleteConfirm(user.id)} className="text-red-500 hover:underline text-xs font-medium">Delete</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
            <h3 className="text-xl font-bold mb-6" style={{ color: '#003366' }}>
              {editUser ? 'Edit User' : 'Add New User'}
            </h3>
            {formError && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-4 text-sm">{formError}</div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password {editUser ? '(leave blank to keep current)' : '*'}
                </label>
                <input
                  type="password"
                  required={!editUser}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="contractor">Contractor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={formLoading}
                  style={{ backgroundColor: '#003366' }}
                  className="flex-1 text-white py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {formLoading ? 'Saving...' : (editUser ? 'Save Changes' : 'Add User')}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-gray-300 py-2.5 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
