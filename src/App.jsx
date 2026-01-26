import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  useNavigate
} from "react-router-dom";

import Navbar from "./components/Navbar";
import plants from "./data/plants";
import PlantCard from "./components/PlantCard";
import PlantModal from "./components/PlantModal";
import Footer from "./components/Footer";

/* ===============================
   MODAL ROUTE
   =============================== */
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

/* ===============================
   MAIN CONTENT
   =============================== */
function AppContent() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  const [language, setLanguage] = useState("en"); // ✅ already correct

  useEffect(() => {
    const root = document.documentElement;
    theme === "dark"
      ? root.classList.add("dark")
      : root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">

      {/* 🔥 UPDATED NAVBAR PROPS */}
      <Navbar
        theme={theme}
        setTheme={setTheme}
        language={language}
        setLanguage={setLanguage}
      />

      <main className="container mx-auto px-4 py-10 flex-grow">

        {/* ===============================
           MAIN INFO SECTION (LANG TOGGLE)
           =============================== */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

            {/* TEXT COLUMN */}
            <div>
              {language === "en" ? (
                <>
                  <h2 className="text-3xl font-bold text-green-700 dark:text-green-300 mb-4">
                    On-Grid Solar Power System 🌞
                  </h2>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Save Electricity • Save Money • Protect Environment
                  </p>

                  <ul className="space-y-3 text-gray-700 dark:text-gray-200">
                    <li>✅ High-Efficiency Solar Panels (25+ years life)</li>
                    <li>✅ On-Grid Inverter (97–99% efficiency)</li>
                    <li>✅ Strong GI / Aluminum Mounting Structure</li>
                    <li>✅ Net Meter (DISCOM approved)</li>
                    <li>✅ AC & DC Junction Boxes with safety protection</li>
                    <li>✅ UV-resistant DC & AC Cables</li>
                    <li>✅ Earthing & Lightning Protection</li>
                    <li>✅ Mobile App Monitoring System</li>
                  </ul>
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-green-700 dark:text-green-300 mb-4">
                    ऑन-ग्रिड सोलार पॉवर सिस्टीम 🌞
                  </h2>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    वीज वाचवा • पैसा वाचवा • पर्यावरण जपा
                  </p>

                  <ul className="space-y-3 text-gray-700 dark:text-gray-200">
                    <li>✅ उच्च कार्यक्षमतेचे सोलार पॅनेल (२५+ वर्षे आयुष्य)</li>
                    <li>✅ ऑन-ग्रिड इन्व्हर्टर (97–99% कार्यक्षमता)</li>
                    <li>✅ मजबूत GI / अ‍ॅल्युमिनियम माउंटिंग स्ट्रक्चर</li>
                    <li>✅ नेट मीटर (वीज मंडळ मान्यताप्राप्त)</li>
                    <li>✅ AC / DC जंक्शन बॉक्स (सुरक्षा यंत्रणेसह)</li>
                    <li>✅ UV-रेझिस्टंट DC व AC केबल्स</li>
                    <li>✅ अर्थिंग व लाइटनिंग अरेस्टर</li>
                    <li>✅ मोबाईल अ‍ॅप मॉनिटरिंग सिस्टीम</li>
                  </ul>
                </>
              )}
            </div>

            {/* IMAGE COLUMN */}
            <div>
              <img
                src="/images/solar-showcase.png "
                alt="Solar Installation"
                className="w-full h-auto object-contain rounded-xl shadow-lg"
              />
            </div>

          </div>
        </section>

        {/* ===============================
           PLANT GRID
           =============================== */}
        <section id="plants">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {plants.map(p => (
              <PlantCard key={p.id} plant={p} />
            ))}
          </div>
        </section>

      </main>

      <Footer />

      {/* ===============================
          ROUTES
         =============================== */}
      <Routes>
        <Route path="/plants/:id" element={<PlantModalRoute />} />
      </Routes>
    </div>
  );
}

/* ===============================
   APP ROOT
   =============================== */
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
