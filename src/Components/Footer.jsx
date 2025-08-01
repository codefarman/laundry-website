import React from "react";
import { Facebook, Instagram, Linkedin, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <div className="bg-indigo-50 text-slate-900">
      <footer className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-12">
          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-base mb-4 text-indigo-900">Company</h3>
            <ul className="space-y-3 text-slate-600 text-sm">
              <li>How it works</li>
              <li>Pricing</li>
              <li>FAQs</li>
              <li>Contact us</li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-base mb-4 text-indigo-900">Services</h3>
            <ul className="space-y-3 text-slate-600 text-sm">
              <li>Wash & Fold</li>
              <li>Ironing</li>
              <li>Dry Cleaning</li>
              <li>Pickup & Delivery</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-base mb-4 text-indigo-900">Stay Updated</h3>
            <p className="text-sm text-slate-600 mb-3">Subscribe to our newsletter</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-md border border-slate-300 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 transition"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Social + Map Pin */}
          <div>
            <h3 className="font-semibold text-base mb-4 text-indigo-900">Connect</h3>
            <div className="flex gap-4 text-slate-600 mb-4">
              <a href="#" aria-label="Facebook" className="hover:text-indigo-700">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-indigo-700">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-indigo-700">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <button
              className="flex items-center gap-2 text-sm text-slate-700 border border-slate-300 rounded-full px-4 py-2 hover:bg-slate-100 transition"
              type="button"
            >
              <MapPin className="w-4 h-4" />
              UAE
            </button>
          </div>
        </div>

        {/* Map section */}
        <div className="mt-10 hidden md:block rounded-xl overflow-hidden shadow-sm border border-slate-200">
          <iframe
            title="TowersLaundry Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.9831272985035!2d55.27078237597845!3d25.204849777734853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f42879e8e96d3%3A0xd4fda4d6c68852cc!2sBurj%20Khalifa!5e0!3m2!1sen!2sae!4v1693386935171!5m2!1sen!2sae"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Divider */}
        <hr className="my-10 border-slate-200" />

        {/* Bottom Footer */}
        <div className="text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} TowersLaundry. All rights reserved.</p>
          <p>
            By using this site, you agree to our{" "}
            <a href="#" className="text-indigo-600 hover:underline">
              Terms & Conditions
            </a>.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
