import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#003366' }} className="text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-3">Suffolk Cleaning Agency</h3>
            <p className="text-blue-200 text-sm leading-relaxed">
              Professional cleaning services across Suffolk. Trusted, reliable, and thorough.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-blue-200 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contact Us</h4>
            <ul className="space-y-2 text-blue-200 text-sm">
              <li>📞 01234 567890</li>
              <li>✉️ info@suffolkcleaning.co.uk</li>
              <li>📍 Ipswich, Suffolk, UK</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-700 mt-8 pt-6 text-center text-blue-300 text-sm">
          <p>&copy; {new Date().getFullYear()} Suffolk Cleaning Agency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
