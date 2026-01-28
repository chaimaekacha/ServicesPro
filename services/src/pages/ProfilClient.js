 import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  CreditCard,
  Bell,
  Lock,
  Edit,
  Save
} from "lucide-react";
import "../style/ProfilClient.css";

function ProfilClient() {
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    adresse: "",
    ville: "",
    codePostal: ""
  });
  const [preferences, setPreferences] = useState({
    notifications: true,
    newsletter: true,
    smsNotifications: false
  });

  useEffect(() => {
    const storedClient = JSON.parse(localStorage.getItem("client"));
    
    if (!storedClient) {
      navigate("/login");
      return;
    }
    
    setClient(storedClient);
    setFormData({
      nom: storedClient.nom || "",
      prenom: storedClient.prenom || "",
      email: storedClient.email || "",
      telephone: storedClient.telephone || "",
      adresse: storedClient.adresse || "",
      ville: storedClient.ville || "",
      codePostal: storedClient.codePostal || ""
    });
    
    // Charger les préférences
    const storedPrefs = JSON.parse(localStorage.getItem("client_preferences")) || preferences;
    setPreferences(storedPrefs);
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreferencesChange = (e) => {
    const { name, checked } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSave = () => {
    const updatedClient = { ...client, ...formData };
    localStorage.setItem("client", JSON.stringify(updatedClient));
    localStorage.setItem("client_preferences", JSON.stringify(preferences));
    setClient(updatedClient);
    setIsEditing(false);
    alert("Profil mis à jour avec succès !");
  };

  if (!client) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="profil-client">
      <div className="profil-header">
        <h1>Mon compte client</h1>
        <button 
          className="btn-edit-toggle"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Edit size={20} />
          {isEditing ? "Annuler" : "Modifier"}
        </button>
      </div>

      <div className="profil-content">
        {/* Informations personnelles */}
        <div className="info-section">
          <h2>
            <User size={24} />
            Informations personnelles
          </h2>
          
          <div className="info-grid">
            <div className="info-item">
              <label>Nom</label>
              {isEditing ? (
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{client.nom}</p>
              )}
            </div>
            
            <div className="info-item">
              <label>Prénom</label>
              {isEditing ? (
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{client.prenom}</p>
              )}
            </div>
            
            <div className="info-item">
              <label>
                <Mail size={16} />
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{client.email}</p>
              )}
            </div>
            
            <div className="info-item">
              <label>
                <Phone size={16} />
                Téléphone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{client.telephone || "Non renseigné"}</p>
              )}
            </div>
          </div>
        </div>

        {/* Adresse */}
        <div className="info-section">
          <h2>
            <MapPin size={24} />
            Adresse
          </h2>
          
          <div className="info-grid">
            <div className="info-item full-width">
              <label>Adresse</label>
              {isEditing ? (
                <input
                  type="text"
                  name="adresse"
                  value={formData.adresse}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{client.adresse || "Non renseignée"}</p>
              )}
            </div>
            
            <div className="info-item">
              <label>Ville</label>
              {isEditing ? (
                <input
                  type="text"
                  name="ville"
                  value={formData.ville}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{client.ville || "Non renseignée"}</p>
              )}
            </div>
            
            <div className="info-item">
              <label>Code postal</label>
              {isEditing ? (
                <input
                  type="text"
                  name="codePostal"
                  value={formData.codePostal}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{client.codePostal || "Non renseigné"}</p>
              )}
            </div>
          </div>
        </div>

        {/* Préférences */}
        <div className="preferences-section">
          <h2>
            <Bell size={24} />
            Préférences et notifications
          </h2>
          
          <div className="preferences-list">
            <label className="preference-item">
              <input
                type="checkbox"
                name="notifications"
                checked={preferences.notifications}
                onChange={handlePreferencesChange}
              />
              <div>
                <strong>Notifications par email</strong>
                <small>Recevoir des notifications concernant mes réservations</small>
              </div>
            </label>
            
            <label className="preference-item">
              <input
                type="checkbox"
                name="newsletter"
                checked={preferences.newsletter}
                onChange={handlePreferencesChange}
              />
              <div>
                <strong>Newsletter</strong>
                <small>Recevoir nos offres spéciales et actualités</small>
              </div>
            </label>
            
            <label className="preference-item">
              <input
                type="checkbox"
                name="smsNotifications"
                checked={preferences.smsNotifications}
                onChange={handlePreferencesChange}
              />
              <div>
                <strong>Notifications SMS</strong>
                <small>Recevoir des rappels par SMS</small>
              </div>
            </label>
          </div>
        </div>

        {/* Sécurité */}
        <div className="security-section">
          <h2>
            <Lock size={24} />
            Sécurité
          </h2>
          
          <button 
            className="btn-change-password"
            onClick={() => navigate("/changer-mot-de-passe")}
          >
            Changer mon mot de passe
          </button>
        </div>

        {isEditing && (
          <div className="save-section">
            <button className="btn-save" onClick={handleSave}>
              <Save size={20} />
              Enregistrer les modifications
            </button>
          </div>
        )}
      </div>

      {/* Statistiques client */}
      <div className="client-stats">
        <div className="stat-card">
          <Calendar size={24} />
          <div>
            <h4>Réservations totales</h4>
            <p className="stat-number">12</p>
          </div>
        </div>
        
        <div className="stat-card">
          <CreditCard size={24} />
          <div>
            <h4>Dépenses totales</h4>
            <p className="stat-number">1 850€</p>
          </div>
        </div>
        
        <div className="stat-card">
          <User size={24} />
          <div>
            <h4>Membre depuis</h4>
            <p>Jamal 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilClient;