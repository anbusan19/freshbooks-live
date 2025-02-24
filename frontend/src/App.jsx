import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import LogoLoader from './components/LogoLoader'
import Navbar from './components/Navbar'
import { AuthProvide } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LogoLoader />;
  }

  return (
    <ThemeProvider>
      <AuthProvide>
        <div className="min-h-screen bg-surface-light dark:bg-black transition-colors duration-200 overflow-x-hidden">
          <Navbar />
          <main className='max-w-[1920px] mx-auto w-full px-2 sm:px-4 lg:px-6 pt-4 sm:pt-8 pb-8 sm:pb-16 font-primary text-gray-800 dark:text-white'>
            <Outlet />
          </main>
          <Footer />
        </div>
      </AuthProvide>
    </ThemeProvider>
  )
}

export default App
