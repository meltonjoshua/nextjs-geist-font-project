import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

const testimonials = [
  { name: 'Sarah T.', text: 'Absolutely spotless every time. Suffolk Cleaning have transformed our office environment.', location: 'Ipswich' },
  { name: 'Mark R.', text: "Reliable, professional, and great value. We've used them for two years now.", location: 'Bury St Edmunds' },
  { name: 'Claire W.', text: 'The end-of-tenancy clean was outstanding. Got our full deposit back!', location: 'Felixstowe' },
];

const services = [
  { icon: '🏠', title: 'Domestic Cleaning', desc: 'Regular home cleaning tailored to your schedule and needs.' },
  { icon: '🏢', title: 'Commercial Cleaning', desc: 'Professional office and business premises cleaning.' },
  { icon: '✨', title: 'Deep Cleaning', desc: 'Thorough top-to-bottom cleaning for a truly fresh start.' },
  { icon: '🔑', title: 'End of Tenancy', desc: 'Get your full deposit back with our comprehensive service.' },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section style={{ backgroundColor: '#003366' }} className="text-white py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Suffolk&apos;s Trusted Cleaning Agency
            </h1>
            <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
              Professional, reliable cleaning services for homes and businesses across Suffolk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" style={{ backgroundColor: '#0066CC' }} className="px-8 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity">
                Get a Free Quote
              </Link>
              <Link href="/services" className="px-8 py-3 rounded-lg font-semibold bg-white text-blue-900 hover:bg-blue-50 transition-colors">
                Our Services
              </Link>
            </div>
          </div>
        </section>

        {/* Services overview */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-2" style={{ color: '#003366' }}>What We Offer</h2>
            <p className="text-center text-gray-500 mb-10">Comprehensive cleaning solutions across Suffolk</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((s) => (
                <div key={s.title} className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-3">{s.icon}</div>
                  <h3 className="font-semibold text-lg mb-2" style={{ color: '#003366' }}>{s.title}</h3>
                  <p className="text-gray-500 text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/services" style={{ color: '#0066CC' }} className="font-semibold hover:underline">
                View all services &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* Why choose us */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4" style={{ color: '#003366' }}>Why Choose Suffolk Cleaning?</h2>
              <ul className="space-y-4 text-gray-600">
                {[
                  'Fully insured and vetted contractors',
                  'Flexible scheduling to suit you',
                  'Eco-friendly cleaning products available',
                  'Consistent, high-quality results',
                  'Local Suffolk knowledge and community focus',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span style={{ color: '#0066CC' }} className="font-bold">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-50 rounded-2xl p-8 text-center">
              <div className="text-5xl font-bold mb-2" style={{ color: '#003366' }}>500+</div>
              <p className="text-gray-600 mb-6">Happy clients across Suffolk</p>
              <div className="text-5xl font-bold mb-2" style={{ color: '#003366' }}>10+</div>
              <p className="text-gray-600">Years of trusted service</p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10" style={{ color: '#003366' }}>What Our Clients Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t.name} className="bg-white rounded-xl shadow-sm p-6">
                  <p className="text-gray-600 italic mb-4">&ldquo;{t.text}&rdquo;</p>
                  <p className="font-semibold" style={{ color: '#003366' }}>{t.name}</p>
                  <p className="text-sm text-gray-400">{t.location}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ backgroundColor: '#003366' }} className="py-16 px-4 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for a Cleaner Space?</h2>
          <p className="text-blue-200 mb-8 max-w-xl mx-auto">Contact us today for a free, no-obligation quote.</p>
          <Link href="/contact" style={{ backgroundColor: '#0066CC' }} className="px-8 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity inline-block">
            Get in Touch
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
