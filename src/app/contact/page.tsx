'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app this would send to an API route
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section style={{ backgroundColor: '#003366' }} className="text-white py-16 px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-blue-200 max-w-2xl mx-auto">
            Get in touch for a free, no-obligation quote or to find out more about our services.
          </p>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact form */}
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#003366' }}>Send Us a Message</h2>
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <div className="text-4xl mb-3">✅</div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-700">Thank you for getting in touch. We&apos;ll respond within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Required</label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 bg-white"
                    >
                      <option value="">Select a service...</option>
                      <option>Domestic Cleaning</option>
                      <option>Commercial Cleaning</option>
                      <option>Deep Cleaning</option>
                      <option>End of Tenancy</option>
                      <option>Window Cleaning</option>
                      <option>After-Build Cleaning</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    style={{ backgroundColor: '#003366' }}
                    className="w-full text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#003366' }}>Get in Touch</h2>
              <div className="space-y-6">
                {[
                  { icon: '📞', label: 'Phone', value: '01234 567890' },
                  { icon: '✉️', label: 'Email', value: 'info@suffolkcleaning.co.uk' },
                  { icon: '📍', label: 'Address', value: 'Ipswich, Suffolk, IP1 1AA' },
                  { icon: '🕐', label: 'Hours', value: 'Mon–Fri: 8am–6pm\nSat: 9am–4pm' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="font-semibold" style={{ color: '#003366' }}>{item.label}</p>
                      <p className="text-gray-600 whitespace-pre-line">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-blue-50 rounded-xl p-6">
                <h3 className="font-bold mb-2" style={{ color: '#003366' }}>Coverage Area</h3>
                <p className="text-gray-600 text-sm">
                  We serve all areas across Suffolk including Ipswich, Bury St Edmunds, Felixstowe, Newmarket, Sudbury, Stowmarket, Lowestoft, and surrounding villages.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
