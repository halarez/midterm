import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import LoginPage from '@Componants/LoginPage';
import AuthLayout from './Layout/AuthLayout';
import MainLayout from './Layout/MainLayout';
import toast, { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  const [isConfigured, setIsConfigured] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showConfirmPage, setShowConfirmPage] = useState(false);

  useEffect(() => {
    if (isConfigured && !showConfirmPage && !showDashboard) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        setShowConfirmPage(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isConfigured, showConfirmPage, showDashboard]);

  const handleLoginSuccess = () => {
    toast.success("Login successful!", { style: { fontSize: '1.2rem', padding: '20px' } });
    setIsLoading(true);
    setIsConfigured(true);
  };

  const handleConfirmYes = () => {
    setIsLoading(true);
    setShowConfirmPage(false);
    setTimeout(() => {
      setIsLoading(false);
      setShowDashboard(true);
      toast.success("System Configured! ✅", { style: { fontSize: '1.2rem', padding: '20px' } });
    }, 3000);
  };

  const handleConfirmNo = () => {
    setIsConfigured(false);
    setShowConfirmPage(false);
    setIsLoading(false);
    toast.error("Configuration canceled ❌", { style: { fontSize: '1.2rem', padding: '20px' } });
  };

  const handleLogout = () => {
    setIsConfigured(false);
    setShowDashboard(false);
    toast("Logged out", { icon: "👋", style: { fontSize: '1.2rem', padding: '20px' } });
  };

  const showWarning = () => toast("Warning: Check your input ⚠️", {
    icon: '⚠️',
    style: {
      background: '#fff3cd',
      color: '#856404',
      border: '2px solid #ffeeba',
      fontSize: '1.2rem',
      padding: '20px',
      minWidth: '350px'
    }
  });

  const hugeButtonStyle = {
    padding: '15px 40px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    borderRadius: '12px',
    textTransform: 'none'
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        {/* FIXED: Changed borderSize to borderWidth */}
        <div className="loader" style={{ width: '80px', height: '80px', borderWidth: '10px' }}></div>
        <p className="mt-8 text-3xl font-black text-gray-700 animate-pulse">Please wait...</p>
      </div>
    );
  }

  if (showConfirmPage) {
    return (
      <AuthLayout>
        <div className="text-center p-12">
          <h2 className="text-4xl font-black mb-6">Configuration Login?</h2>
          <p className="text-xl text-gray-600 mb-10">Would you like to proceed to the dashboard?</p>
          <div className="flex gap-6 justify-center">
            <Button variant="contained" color="success" sx={hugeButtonStyle} onClick={handleConfirmYes}>Yes, Proceed</Button>
            <Button variant="contained" color="error" sx={hugeButtonStyle} onClick={handleConfirmNo}>No, Go Back</Button>
          </div>
        </div>
      </AuthLayout>
    );
  }

  if (showDashboard) {
    return (
      <MainLayout onLogout={handleLogout}>
        <div className="flex flex-col items-center gap-12 pt-10">
          <div className="bg-black text-white p-20 text-5xl font-black rounded-3xl shadow-2xl text-center w-full max-w-4xl border-4 border-blue-500">
            System Active 🚀
          </div>
          
          <div className="flex flex-wrap gap-8 justify-center scale-110">
            <Button variant="contained" color="success" sx={hugeButtonStyle} onClick={() => toast.success("Massive Success! ✅", { style: { fontSize: '1.2rem' } })}>
              Success
            </Button>
            
            <Button variant="contained" color="error" sx={hugeButtonStyle} onClick={() => toast.error("Massive Error! ❌", { style: { fontSize: '1.2rem' } })}>
              Error
            </Button>

            <Button 
              variant="contained" 
              sx={{ ...hugeButtonStyle, bgcolor: '#ed6c02', '&:hover': { bgcolor: '#e65100' } }}
              onClick={showWarning}
            >
              Warning
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <AuthLayout>
      <Toaster 
        position="top-center"
        containerStyle={{ zIndex: 99999, top: 40 }}
        toastOptions={{
          style: {
            borderRadius: '15px',
            background: '#333',
            color: '#fff',
            fontSize: '1.2rem',
            padding: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
          },
        }}
      />
      <div className="scale-125 transform">
        <LoginPage onLogin={handleLoginSuccess} />
      </div>
    </AuthLayout>
  );
}

export default App;
