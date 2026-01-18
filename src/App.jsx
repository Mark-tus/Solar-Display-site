import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import plants from "./data/plants";
import PlantCard from "./components/PlantCard";
import PlantModal from "./components/PlantModal";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

function PlantModalRoute() {
  const { id } = useParams();
  const navigate = useNavigate();
  const plant = plants.find(p => p.id === Number(id));

  return (
    <PlantModal
      plant={plant}
      onClose={() => navigate("/")}
    />
  );
}

function AppContent() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = document.documentElement;
    theme === "dark" ? root.classList.add("dark") : root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar theme={theme} setTheme={setTheme} />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <section id="plants">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {plants.map(p => (
              <PlantCard key={p.id} plant={p} />
            ))}
          </div>
        </section>

        {/* <section id="contact" className="mt-12">
          <ContactForm />
        </section> */}
      </main>

      <Footer />

      <Routes>
        <Route path="/plants/:id" element={<PlantModalRoute />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
