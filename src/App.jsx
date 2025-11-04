import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import plants from './data/plants';
import PlantCard from './components/PlantCard';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  // theme stored in localStorage
  const [theme, setTheme] = useState(() => {
    return (typeof window !== 'undefined' && localStorage.getItem('theme')) || 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme','dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme','light');
    }
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <Navbar theme={theme} setTheme={setTheme} />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-primary-700 dark:text-primary-300">Our Solar Plants</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">A small showcase of installed solar plants. </p>
        </header>

        <section id="plants">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {plants.map(p => <PlantCard key={p.id} plant={p} />)}
          </div>
        </section>

        <section id="contact" className="mt-12">
          <h2 className="text-3xl font-semibold mb-4 text-primary-700 dark:text-primary-300">Contact Us</h2>
          <ContactForm />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;