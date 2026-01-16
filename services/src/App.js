import React from "react";
import {  Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RegisterArtisan from "./pages/RegisterArtisan";
import CreateProfile from "./pages/CreateProfile";
import LoginArtisan from "./pages/LoginArtisan";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Catalogue from "./pages/Catalogue";
import Profil from "./pages/Profil";


function App() {
  return (
    <>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/register-artisan" element={<RegisterArtisan />} />
         <Route path="/create-profile" element={<CreateProfile />} />
         <Route path="/login-artisan" element={<LoginArtisan />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/profil/:id" element={<Profil />} />
        
      </Routes>
      <Footer/>
      </>
  );
}

export default App;