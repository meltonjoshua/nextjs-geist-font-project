import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

const services = [
  {
    icon: '🏠',
    title: 'Domestic Cleaning',
    desc: 'Our domestic cleaning service keeps your home spotless on a schedule that suits you — weekly, fortnightly, or monthly.',
    features: ['Kitchen and bathroom deep clean', 'Vacuuming and mopping all floors', 'Dusting and surface wiping', 'Ironing available on request'],
  },
  {
    icon: '🏢',
    title: 'Commercial Cleaning',
    desc: 'We provide professional cleaning for offices, retail spaces, and business premises, ensuring a safe and presentable environment.',
    features: ['Daily, weekly, or monthly contracts', 'Washroom hygiene services', 'Communal area maintenance', 'Flexible out-of-hours scheduling'],
  },
  {
    icon: '✨',
    title: 'Deep Cleaning',
    desc: 'A thorough top-to-bottom clean covering every nook and cranny — ideal for a spring clean or moving into a new property.',
    features: ['Inside appliances (oven, fridge)', 'Window cleaning (internal)', 'Skirting boards and high surfaces', 'Carpet steam cleaning available'],
  },
  {
    icon: '🔑',
    title: 'End of Tenancy',
    desc: 'Maximise your deposit return with our comprehensive end-of-tenancy cleaning service, meeting landlord and letting agent standards.',
    features: ['Full property deep clean', 'Meets inventory check standards', 'Oven and appliance cleaning', 'Deposit-back guarantee'],
  },
  {
    icon: '🪟',
    title: 'Window Cleaning',
    desc: 'Crystal-clear windows inside and out using professional-grade equipment and techniques.',
    features: ['Residential and commercial', 'Internal and external', 'Reach-and-wash system for upper floors', 'Regular contract available'],
  },
  {
    icon: '🏗️',
    title: 'After-Build Cleaning',
    desc: 'Post-construction and renovation cleans to prepare your space for occupation, removing dust, debris, and construction residue.',
    features: ['Dust and debris removal', 'Window and frame cleaning', 'Floor polishing and treatment', 'Suitable for new-builds and renovations'],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section style={{ backgroundColor: '#003366' }} className="text-white py-16 px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Cleaning Services</h1>
          <p className="text-blue-200 max-w-2xl mx-auto">
            From regular domestic cleans to specialist commercial contracts, we have a service to suit every need across Suffolk.
          </p>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((s) => (
              <div key={s.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-3">{s.icon}</div>
                <h2 className="text-2xl font-bold mb-3" style={{ color: '#003366' }}>{s.title}</h2>
                <p className="text-gray-600 mb-4">{s.desc}</p>
                <ul className="space-y-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-gray-600 text-sm">
                      <span style={{ color: '#0066CC' }} className="font-bold mt-0.5">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section style={{ backgroundColor: '#003366' }} className="py-16 px-4 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Cleaning Plan?</h2>
          <p className="text-blue-200 mb-8 max-w-xl mx-auto">
            We can tailor any of our services to your specific requirements. Contact us for a free consultation.
          </p>
          <Link href="/contact" style={{ backgroundColor: '#0066CC' }} className="px-8 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity inline-block">
            Request a Quote
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
