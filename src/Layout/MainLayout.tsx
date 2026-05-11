import { Toaster } from 'react-hot-toast';
import { type ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
  onLogout: () => void;
}

export default function MainLayout({ children, onLogout }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-10 text-blue-500">My App</h2>
          
          <nav className="flex flex-col gap-2">
            <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors text-left w-full">
              <span>🏠</span> Dashboard
            </button>
            <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors text-left w-full">
              <span>👤</span> Profile
            </button>
            <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors text-left w-full">
              <span>⚙️</span> Settings
            </button>
          </nav>
        </div>

        {/* Bottom Section */}
        <button 
          onClick={onLogout} 
          className="flex items-center gap-3 p-3 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors text-left w-full"
        >
          <span>🚪</span> Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10 overflow-auto">
        {children}
      </main>
    </div>
  );
}
