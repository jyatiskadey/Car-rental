import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Cars from './Pages/Cars';
import Layout from './Components/Layout';
import Contact from './Pages/Contact';
import CitizenLogin from './Pages/Citizen/Login';
import CitizenDashboard from './Pages/Citizen/CItizenDashboard';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminLogin from './Pages/Admin/Login';
import CarList from './Components/CarList';

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
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/text" element={<CarList />} />
            </Routes>
        </Router>
    );
}

export default App;
