import React from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ShieldIcon, Menu } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header: React.FC = () => {
  const [location] = useLocation();

  const navLinks = [
    { href: '/', label: 'Home', active: location === '/' },
    { href: '/generator', label: 'Generator', active: location === '/generator' },
    { href: '/templates', label: 'Templates', active: location === '/templates' },
    { href: '/regulation-map', label: 'Regulations', active: location === '/regulation-map' },
    { href: '/faq', label: 'FAQ', active: location === '/faq' }
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 flex items-center">
              <ShieldIcon className="text-primary-600 h-6 w-6" />
              <span className="text-primary-700 font-bold ml-2 text-xl">{APP_NAME}</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8 ml-10">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className={link.active
                    ? "text-primary-600 border-b-2 border-primary-600 pb-1 font-medium"
                    : "text-gray-700 hover:text-primary-600 font-medium"
                  }
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/pricing"
              className="text-gray-700 hover:text-primary-600 font-medium hidden md:block"
            >
              Pricing
            </Link>
            <Button
              size="sm"
              className="bg-primary-600 hover:bg-primary-700 text-white hidden md:block"
            >
              Sign Up Free
            </Button>
            
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.href}
                      href={link.href}
                      className={link.active
                        ? "text-primary-600 font-medium text-lg"
                        : "text-gray-700 hover:text-primary-600 font-medium text-lg"
                      }
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="/pricing"
                    className="text-gray-700 hover:text-primary-600 font-medium text-lg"
                  >
                    Pricing
                  </Link>
                  <Button
                    className="bg-primary-600 hover:bg-primary-700 text-white mt-4"
                  >
                    Sign Up Free
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
