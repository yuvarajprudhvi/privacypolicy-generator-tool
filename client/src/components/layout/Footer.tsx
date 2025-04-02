import React from 'react';
import { Link } from 'wouter';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:order-2 space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Facebook</span>
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Instagram</span>
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-sm text-gray-500">&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
            <p className="text-center text-xs text-gray-400 mt-1">
              Disclaimer: This tool provides general information and not legal advice. Consult with a lawyer for your specific needs.
            </p>
          </div>
        </div>
        <div className="pb-8 text-sm text-gray-500 text-center space-x-4">
          <Link href="#" className="text-gray-500 hover:text-primary-600">Terms of Service</Link>
          <span>&middot;</span>
          <Link href="#" className="text-gray-500 hover:text-primary-600">Privacy Policy</Link>
          <span>&middot;</span>
          <Link href="#" className="text-gray-500 hover:text-primary-600">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
