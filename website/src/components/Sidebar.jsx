import React, { useState, useCallback, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ChevronLeft, Menu, X, Rocket, LayoutTemplate, 
  Code2, Zap, Layers, TextCursorInput, Route, 
  Database, Palette, Beaker, BookMarked, FileText, Braces
} from 'lucide-react';
import { sidebarStructure } from '../docsMapping';

const MOBILE_BREAKPOINT = 768;

// Helper to get an icon based on section title
const getSectionIcon = (title) => {
  switch (title) {
    case "Getting Started": return <Rocket size={20} />;
    case "Architecture": return <LayoutTemplate size={20} />;
    case "Language Basics": return <Code2 size={20} />;
    case "Reactivity": return <Zap size={20} />;
    case "Components": return <Layers size={20} />;
    case "Forms": return <TextCursorInput size={20} />;
    case "Routing": return <Route size={20} />;
    case "Data/API": return <Database size={20} />;
    case "Styling": return <Palette size={20} />;
    case "Editor Tools": return <Braces size={20} />;
    case "Advanced": return <Beaker size={20} />;
    case "Reference": return <BookMarked size={20} />;
    default: return <FileText size={20} />;
  }
};

export const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_BREAKPOINT);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const handleLinkClick = useCallback(() => {
    if (isMobile) setIsMobileOpen(false);
  }, [isMobile]);

  return (
    <>
      {/* Mobile Header Toggle */}
      {isMobile && (
        <button 
          className="fixed top-4 left-4 z-50 p-2 bg-slate-800 text-white rounded-md shadow-lg" 
          onClick={toggleMobileSidebar}
        >
          <Menu size={24} />
        </button>
      )}

      {/* Mobile Overlay Backdrop */}
      {isMobile && isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm transition-opacity" 
          onClick={toggleMobileSidebar} 
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 left-0 h-screen bg-slate-900 border-r border-slate-800 text-slate-300 z-50 flex flex-col transition-all duration-300 ease-in-out
          ${isCollapsed && !isMobile ? 'w-20' : 'w-72'} 
          ${isMobile ? (isMobileOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
        `}
        aria-label="Sidebar Navigation"
      >
        {/* Header / Logo */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 h-16 shrink-0">
          <div className={`flex items-center gap-3 overflow-hidden ${isCollapsed && !isMobile ? 'justify-center w-full' : ''}`}>
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 p-[1.5px] shrink-0 shadow-lg shadow-indigo-500/20 hover:scale-105 transition-transform duration-300">
              <img src="/nuvsha.svg" alt="Nuvsha" className="w-full h-full rounded-[6.5px] object-contain" />
            </div>
            {(!isCollapsed || isMobile) && (
              <span className="font-bold text-lg text-white whitespace-nowrap">Nuvsha Docs</span>
            )}
          </div>
          
          {/* Close button on mobile, Collapse button on desktop */}
          {isMobile ? (
            <button className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors" onClick={toggleMobileSidebar}>
              <X size={20} />
            </button>
          ) : (
            <button 
              className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors" 
              onClick={toggleCollapse}
            >
              <ChevronLeft size={20} className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav 
          className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
          data-lenis-prevent
        >
          {sidebarStructure.map((section) => (
            <div key={section.title} className="mb-6 px-3">
              {(!isCollapsed || isMobile) ? (
                <h3 className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {section.title}
                </h3>
              ) : (
                <div className="flex justify-center mb-2" title={section.title}>
                  <div className="w-4 border-t border-slate-700" />
                </div>
              )}
              
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.path}>
                    <NavLink 
                      to={`/docs/${item.path}`}
                      className={({ isActive }) => `
                        flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 group
                        ${isActive 
                          ? 'bg-indigo-500/10 text-indigo-400 font-medium' 
                          : 'hover:bg-slate-800 hover:text-white text-slate-400'
                        }
                        ${isCollapsed && !isMobile ? 'justify-center' : ''}
                      `}
                      onClick={handleLinkClick}
                      title={isCollapsed && !isMobile ? item.title : undefined}
                    >
                      <span className={`shrink-0 ${isCollapsed && !isMobile ? '' : 'opacity-70 group-hover:opacity-100 transition-opacity'}`}>
                        {getSectionIcon(section.title)}
                      </span>
                      {(!isCollapsed || isMobile) && (
                        <span className="truncate">{item.title}</span>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        
        {/* Footer profile */}
        {/* <div className="p-4 border-t border-slate-800 shrink-0">
          <div className={`flex items-center gap-3 ${isCollapsed && !isMobile ? 'justify-center' : ''}`}>
            <img src="https://ui-avatars.com/api/?name=Admin+User&background=6366f1&color=fff" alt="User" className="w-8 h-8 rounded-full shrink-0" />
            {(!isCollapsed || isMobile) && (
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-white truncate">Admin User</span>
                <span className="text-xs text-slate-500 truncate">Workspace Owner</span>
              </div>
            )}
          </div>
        </div> */}
      </aside>
    </>
  );
};
