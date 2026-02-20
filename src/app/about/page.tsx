import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

const team = [
  { name: 'Margaret Collins', role: 'Founder & Director', bio: 'Margaret founded Suffolk Cleaning Agency in 2014 with a mission to provide reliable, high-quality cleaning services to the local community.' },
  { name: 'David Hartley', role: 'Operations Manager', bio: 'David oversees our contractor network, ensuring every job meets our high standards and clients receive a consistent, excellent service.' },
  { name: 'Lisa Pemberton', role: 'Client Relations', bio: 'Lisa manages client relationships, scheduling, and ensures every customer is completely satisfied with their clean.' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section style={{ backgroundColor: '#003366' }} className="text-white py-16 px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">About Suffolk Cleaning Agency</h1>
          <p className="text-blue-200 max-w-2xl mx-auto">
            A trusted local cleaning agency serving Suffolk since 2014.
          </p>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#003366' }}>Our Story</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Suffolk Cleaning Agency was founded in 2014 with a simple mission: to provide reliable, high-quality cleaning services that the people of Suffolk could trust. Starting with just a handful of clients in Ipswich, we have grown into one of the region&apos;s most trusted cleaning agencies.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              We are proud to be a local business, employing local people and serving local homes and businesses. Every one of our contractors is fully vetted, insured, and trained to our exacting standards.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today we serve hundreds of clients across Suffolk — from residential homes in Ipswich and Bury St Edmunds to commercial premises in Felixstowe and Newmarket. Whatever your cleaning need, we have the expertise to deliver.
            </p>
          </div>
        </section>

        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10" style={{ color: '#003366' }}>Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: '🤝', title: 'Reliability', desc: 'We show up when we say we will. Our clients can always count on us.' },
                { icon: '⭐', title: 'Quality', desc: 'We never cut corners. Every clean is completed to the highest standard.' },
                { icon: '🌿', title: 'Sustainability', desc: 'We offer eco-friendly products and aim to minimise our environmental impact.' },
              ].map((v) => (
                <div key={v.title} className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <div className="text-4xl mb-3">{v.icon}</div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#003366' }}>{v.title}</h3>
                  <p className="text-gray-600">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10" style={{ color: '#003366' }}>Meet the Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member) => (
                <div key={member.name} className="text-center">
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl" style={{ backgroundColor: '#003366', color: 'white' }}>
                    {member.name[0]}
                  </div>
                  <h3 className="text-xl font-bold mb-1" style={{ color: '#003366' }}>{member.name}</h3>
                  <p className="text-sm font-medium mb-3" style={{ color: '#0066CC' }}>{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#003366' }} className="py-16 px-4 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Work With Us</h2>
          <p className="text-blue-200 mb-8 max-w-xl mx-auto">Interested in joining our team or getting a quote? We&apos;d love to hear from you.</p>
          <Link href="/contact" style={{ backgroundColor: '#0066CC' }} className="px-8 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity inline-block">
            Get in Touch
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
