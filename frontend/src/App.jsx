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
        <div className="min-h-screen bg-surface-light dark:bg-black transition-colors duration-200">
          <Navbar />
          <main className='max-w-screen-2xl mx-auto px-4 pt-8 pb-16 font-primary text-gray-800 dark:text-white'>
            <Outlet />
          </main>
          <Footer />
        </div>
      </AuthProvide>
    </ThemeProvider>
  )
}

export default App
