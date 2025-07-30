import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';
import { 
  Menu, 
  X, 
  Home, 
  Coins, 
  Calendar, 
  Search, 
  Lock, 
  Send, 
} from 'lucide-react';
import { WalletConnection } from './WalletConnection';
import { NetworkModeToggle } from './NetworkModeToggle';

interface GlobalNavigationProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
  showBackButton?: boolean;
}

export const GlobalNavigation: React.FC<GlobalNavigationProps> = ({ 
  currentPage = 'home'
}) => {
  const { address } = useWallet();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home, href: '/' },
    { id: 'tokens', label: 'My Tokens', icon: Coins, href: '/tokens' },
    { id: 'sales', label: 'My Sales', icon: Calendar, href: '/sales' },
    { id: 'explore', label: 'Explore Sales', icon: Search, href: '/explore' },
    { id: 'liquidity-lock', label: 'Liquidity Lock', icon: Lock, href: '/liquidity-lock' },
    { id: 'airdrop', label: 'Airdrop Tools', icon: Send, href: '/airdrop' },
  ];

  // Add admin panel for admin users
  const adminAddresses = ['0x742d35Cc6634C0532925a3b8D4C9db96590c6C8C'];
  if (address && adminAddresses.includes(address)) {
    navigationItems.push({ id: 'admin', label: 'Admin Panel', icon: Settings, href: '/admin' });
  }

  const handleNavigation = (href: string, id: string) => {
    // Close mobile menu
    setIsMobileMenuOpen(false);
    
    // Handle navigation based on the current app structure
    if (id === 'home') {
      window.location.href = '/';
    } else if (id === 'tokens') {
      window.location.href = '/';
      // Trigger the view tokens action after a short delay
      setTimeout(() => {
        const event = new CustomEvent('navigate-to-tokens');
        window.dispatchEvent(event);
      }, 100);
    } else if (id === 'sales') {
      window.location.href = '/';
      setTimeout(() => {
        const event = new CustomEvent('navigate-to-sales');
        window.dispatchEvent(event);
      }, 100);
    } else {
      window.location.href = href;
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-slate-900/95 backdrop-blur-sm border-b border-white/10 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/ESTAR_bezfona.png" 
              alt="ESTAR ECOSYSTEM Logo" 
              className="w-8 h-8 rounded-lg"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-white">ESTAR ECOSYSTEM</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.href, item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Side - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <NetworkModeToggle showLabel={false} />
            <WalletConnection />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            <NetworkModeToggle showLabel={false} />
            <button
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-white p-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-slate-900/98 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.href, item.id)}
                    className={`flex items-center space-x-3 w-full px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              
              {/* Mobile Wallet Connection */}
              <div className="pt-4 border-t border-white/10">
                <WalletConnection />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};