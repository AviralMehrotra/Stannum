import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

function ShoppingFooter() {
  return (
    <footer className="bg-[#1a4d3e] text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/shop/home" className="inline-block">
              <span className="text-3xl font-bold tracking-tighter">
                Stannum.
              </span>
            </Link>
            <p className="text-green-100/70 text-sm leading-relaxed max-w-xs">
              Empowering students and professionals with premium tech solutions.
              Your trusted destination for quality electronics.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#1a4d3e] transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-lg font-bold mb-6">Shop</h3>
            <ul className="space-y-4 text-sm text-green-100/70">
              <li>
                <Link
                  to="/shop/listing"
                  className="hover:text-white transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/shop/listing?category=smartphones"
                  className="hover:text-white transition-colors"
                >
                  Smartphones
                </Link>
              </li>
              <li>
                <Link
                  to="/shop/listing?category=laptops"
                  className="hover:text-white transition-colors"
                >
                  Laptops
                </Link>
              </li>
              <li>
                <Link
                  to="/shop/listing?category=accessories"
                  className="hover:text-white transition-colors"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-bold mb-6">Company</h3>
            <ul className="space-y-4 text-sm text-green-100/70">
              <li>
                <Link to="#" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact</h3>
            <ul className="space-y-4 text-sm text-green-100/70">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <span>123 Tech Avenue, Innovation City, IC 54321</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>+1 (555) 000-1234</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>hello@stannum.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-green-100/50">
          <p>© {new Date().getFullYear()} Stannum. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">
              Help Center
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Shipping
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Returns
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default ShoppingFooter;
