import React from 'react';
import BottomNavbar from './BottomNavbar';
import { useUser } from '../hooks/useUser';
import CoinCounter from './CoinCounter';
import AnimatedBackground from './AnimatedBackground';

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  headerTitle?: string;
  showBackButton?: boolean;
  showCoinCounter?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  hideNavbar?: boolean;
  transparentHeader?: boolean;
  backgroundVariant?: 'default' | 'travel' | 'minimal' | 'gradient' | 'none' | 'thailand' | 'tinder';
}

const Layout: React.FC<LayoutProps> = ({
  children,
  showHeader = false,
  headerTitle,
  showBackButton = false,
  showCoinCounter = false,
  onBack,
  rightAction,
  hideNavbar = false,
  transparentHeader = false,
  backgroundVariant = 'default',
}) => {
  const { displayName, pictureUrl, isLoggedIn } = useUser();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50/60 via-rose-50/40 to-amber-50/30 relative overflow-hidden">
      {/* Animated Background */}
      {backgroundVariant !== 'none' && (
        <AnimatedBackground variant={backgroundVariant} />
      )}

      {/* Header */}
      {showHeader && (
        <header
          className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
            transparentHeader
              ? 'bg-transparent'
              : 'bg-white/80 backdrop-blur-xl border-b border-rose-100/60 shadow-[0_2px_20px_rgba(16,185,129,0.06)]'
          }`}
        >
          <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
            {/* Left Section */}
            <div className="flex items-center min-w-[80px]">
              {showBackButton ? (
                <button
                  onClick={handleBack}
                  className="flex items-center space-x-1 text-gray-600 hover:text-pink-500 transition-colors -ml-2 p-2 rounded-full hover:bg-pink-50"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              ) : isLoggedIn && pictureUrl ? (
                <div className="flex items-center space-x-2">
                  <img
                    src={pictureUrl}
                    alt={displayName || 'User'}
                    className="w-9 h-9 rounded-full border-2 border-pink-200 shadow-sm"
                  />
                </div>
              ) : null}
            </div>

            {/* Center Section - Title */}
            <div className="flex-1 text-center">
              {headerTitle ? (
                <h1 className="text-lg font-bold text-gray-800 truncate">{headerTitle}</h1>
              ) : (
                <div className="flex items-center justify-center">
                  <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent tracking-wide">
                    Travel Match
                  </span>
                </div>
              )}
            </div>

            {/* Right Section */}
            <div className="flex items-center justify-end min-w-[80px]">
              {rightAction ? (
                rightAction
              ) : showCoinCounter ? (
                <CoinCounter />
              ) : null}
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className={`${showHeader ? 'pt-14' : ''} ${!hideNavbar ? 'pb-20' : ''}`}>
        {children}
      </main>

      {/* Bottom Navigation */}
      {!hideNavbar && <BottomNavbar />}
    </div>
  );
};

export default Layout;
