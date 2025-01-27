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
        <div className="min-h-screen bg-surface-light dark:bg-surface-dark transition-colors duration-200">
          <Navbar />
          <main className='max-w-screen-2xl mx-auto px-4 py-6 font-primary text-primary-dark dark:text-primary-light'>
            <Outlet />
          </main>
          <Footer/> {/* Ensure w-48 is passed as a string */}
        </div>
      </AuthProvide>
    </ThemeProvider>
  )
}

export default App
