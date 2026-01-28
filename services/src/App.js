import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './pages/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalogue from './pages/Catalogue';
import Profil from './pages/Profil';
import CreateProfile from './pages/CreateProfile';
import Login from './pages/Login'; 
import Register from './pages/Register'; 
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin'; 
import ProtectedRoute from './components/ProtectedRoute'; 

// Artisans
import DashboardArtisan from './pages/DashboardArtisan';
import ProfilArtisan from './pages/ProfilArtisan';
import PublicationsArtisan from './pages/PublicationsArtisan';
import NouvellePublication from './pages/NouvellePublication';
import ModifierPublication from './pages/ModifierPublication';
import AvisArtisan from './pages/AvisArtisan';
import Dashboard from './pages/Dashboard';
import MonProfil from './pages/MonProfil';
// Clients
import ProfilClient from './pages/ProfilClient';
import ReservationsClient from './pages/ReservationsClient';

import Contact from './pages/Contact';

import LoginArtisan from './pages/LoginArtisan';
import RegisterArtisan from './pages/RegisterArtisan';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        {/* Header sur toutes les pages sauf admin */}
        <Routes>
          <Route path="/admin/*" element={null} />
          <Route path="*" element={<Header />} />
        </Routes>
        
        <main>
          <Routes>
            {/* Routes publiques */}
            <Route path="/" element={<Home />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/create-profile" element={<CreateProfile />} />
            <Route path="/profil/:id" element={<Profil />} />
            
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Routes spécifiques pour artisans  */}
            <Route path="/login-artisan" element={<LoginArtisan />} />
            <Route path="/register-artisan" element={<RegisterArtisan />} />
            
            {/* Routes pour artisans */}
            <Route path="/dashboard-artisan" element={<DashboardArtisan />} />
            <Route path="/mon-profil-artisan" element={<ProfilArtisan />} />
            <Route path="/mes-publications" element={<PublicationsArtisan />} />
            <Route path="/nouvelle-publication" element={<NouvellePublication />} />
            <Route path="/modifier-publication/:id" element={<ModifierPublication />} />
            <Route path="/mes-avis" element={<AvisArtisan />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Routes pour clients */}
            <Route path="/mon-profil-client" element={<ProfilClient />} />
            <Route path="/mes-reservations" element={<ReservationsClient />} />
            
            {/* Route de compatibilité */}
            <Route path="/mon-profil" element={<Navigate to="/mon-profil-client" replace />} />
            
            
            {/* Routes Admin */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Routes Admin protégées */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } />
            <Route path="/admin/*" element={
              <ProtectedRoute>
                <Navigate to="/admin/dashboard" replace />
              </ProtectedRoute>
            } />
            
            {/* Redirection pour admin */}
            <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
            
            {/*  Page non trouvée */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        {/* Footer sur toutes les pages sauf admin */}
        <Routes>
          <Route path="/admin/*" element={null} />
          <Route path="*" element={<Footer />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;