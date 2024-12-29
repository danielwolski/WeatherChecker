import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Settings from "./components/Settings/Settings";
import Weather from "./components/Weather/Weather";
import NavigationButtons from "./components/NavigationButtons";
import "./App.scss";

function App() {

  const [settings, setSettings] = useState({ city: "", unit: "metric" });
  
  return (
    <div class="app-header">
        <Router>
        <div>
          <h1>WEATHER APP</h1>
          <NavigationButtons />
          <Routes>
            <Route path="/settings" element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Settings onSave={setSettings} />
              </motion.div>
            } />
            <Route path="/weather" element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Weather settings={settings} />
              </motion.div>
            } />
          </Routes>
        </div>
      </Router>
    </div>
    
  )
}

export default App