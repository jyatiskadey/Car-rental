import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Cars from './Pages/Cars';
import Layout from './Components/Layout';
import Contact from './Pages/Contact';
import AdminLogin from './Admin/Login';
import CitizenLogin from './Citizen/Login';
import CitizenDashboard from './Citizen/CItizenDashboard';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/elitedrive/cars" element={<Layout><Cars /></Layout>} />
                <Route path="/contact" element={<Layout><Contact /></Layout>} />
                <Route path="/admin-login" element={<Layout><AdminLogin /></Layout>} />
                <Route path="/citizen-login" element={<Layout><CitizenLogin /></Layout>} />
                <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
