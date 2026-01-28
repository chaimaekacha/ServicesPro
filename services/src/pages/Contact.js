import React, { useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle,
  MessageSquare,
  User,
  Building
} from "lucide-react";
import "../style/Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    sujet: "",
    message: "",
    typeContact: "client"
  });

  const [sujets] = useState([
    "Demande de renseignements",
    "Problème technique",
    "Partenaire commercial",
    "Réclamation",
    "Demande de partenariat",
    "Autre"
  ]);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simuler l'envoi du formulaire
    setTimeout(() => {
      console.log("Formulaire envoyé:", formData);
      setLoading(false);
      setSubmitted(true);
      
      // Réinitialiser le formulaire après 3 secondes
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          nom: "",
          email: "",
          telephone: "",
          sujet: "",
          message: "",
          typeContact: "client"
        });
      }, 3000);
    }, 1500);
  };

  const faqs = [
    {
      question: "Comment contacter un artisan ?",
      answer: "Vous pouvez contacter un artisan directement depuis sa fiche de présentation sur notre plateforme."
    },
    {
      question: "Quels sont les horaires de support ?",
      answer: "Notre équipe est disponible du lundi au vendredi de 9h à 18h."
    },
    {
      question: "Comment devenir artisan partenaire ?",
      answer: "Rendez-vous sur notre page d'inscription pour artisans et remplissez le formulaire."
    },
    {
      question: "Quelle est la zone de couverture ?",
      answer: "Nous couvrons toute la France métropolitaine avec nos artisans partenaires."
    }
  ];

  const team = [
    { name: "Samira siasdi", role: "Support client", email: "samira@servicespro.com" },
    { name: "Jamal Maaroufi", role: "Gestion partenaires", email: "jamal@servicespro.com" },
    { name: "Mariya alaui", role: "Relations commerciales", email: "mariya@servicespro.com" }
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="hero-content">
          <h1>Contactez-nous</h1>
          <p>Nous sommes là pour vous aider. N'hésitez pas à nous contacter pour toute question.</p>
        </div>
      </div>

      <div className="contact-container">
        {/* Informations de contact */}
        <div className="contact-info-section">
          <div className="contact-info-grid">
            <div className="info-card">
              <div className="info-icon">
                <Phone size={24} />
              </div>
              <h3>Téléphone</h3>
              <p>06 23 45 67 89</p>
              <small>Meknes</small>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <Mail size={24} />
              </div>
              <h3>Email</h3>
              <p>contact@servicespro.com</p>
              <small>Réponse sous 24h</small>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <MapPin size={24} />
              </div>
              <h3>Adresse</h3>
              <p>123 Avenue des Champs<br />75008 , Meknes</p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <Clock size={24} />
              </div>
              <h3>Horaires</h3>
              <p>Lun - Ven: 9h - 18h<br />Sam: 9h - 13h</p>
            </div>
          </div>

          {/* Carte de localisation */}
          <div className="map-section">
            <h2>Nous trouver</h2>
            <div className="map-placeholder">
              <div className="map-content">
                <MapPin size={48} color=" #facc15" />
                <p>123 Avenue des Champs, 75008 , Meknes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulaire de contact */}
        <div className="contact-form-section">
          <div className="form-header">
            <h2>Envoyez-nous un message</h2>
            <p>Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.</p>
          </div>

          {submitted ? (
            <div className="success-message">
              <CheckCircle size={48} color="#10B981" />
              <h3>Message envoyé avec succès !</h3>
              <p>Nous vous répondrons dans les plus brefs délais.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nom">
                    <User size={18} />
                    Nom complet *
                  </label>
                  <input
                    id="nom"
                    name="nom"
                    type="text"
                    placeholder="Votre nom et prénom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <Mail size={18} />
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="telephone">
                    <Phone size={18} />
                    Téléphone
                  </label>
                  <input
                    id="telephone"
                    name="telephone"
                    type="tel"
                    placeholder="01 23 45 67 89"
                    value={formData.telephone}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="typeContact">
                    <Building size={18} />
                    Vous êtes *
                  </label>
                  <select
                    id="typeContact"
                    name="typeContact"
                    value={formData.typeContact}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="client">Client</option>
                    <option value="artisan">Artisan</option>
                    <option value="partenaire">Partenaire</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="sujet">Sujet *</label>
                <select
                  id="sujet"
                  name="sujet"
                  value={formData.sujet}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Sélectionnez un sujet</option>
                  {sujets.map((sujet, index) => (
                    <option key={index} value={sujet}>{sujet}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  <MessageSquare size={18} />
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Décrivez votre demande en détail..."
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
                <div className="char-count">
                  {formData.message.length} / 2000 caractères
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn-submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="spinner"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Envoyer le message
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* FAQ */}
        <div className="faq-section">
          <h2>Questions fréquentes</h2>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h4>{faq.question}</h4>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Équipe de contact */}
        <div className="team-section">
          <h2>Notre équipe</h2>
          <p>Voici les personnes qui vous accompagneront :</p>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-member">
                <div className="member-avatar">
                  {member.name.charAt(0)}
                </div>
                <div className="member-info">
                  <h4>{member.name}</h4>
                  <p className="role">{member.role}</p>
                  <p className="email">{member.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Informations complémentaires */}
        <div className="additional-info">
          <div className="info-box">
            <h3>Pour les artisans</h3>
            <p>Vous souhaitez rejoindre notre plateforme ? Contactez notre équipe partenaires.</p>
            <a href="/register-artisan" className="btn-outline">
              Devenir artisan
            </a>
          </div>
          
          <div className="info-box">
            <h3>Support technique</h3>
            <p>Problème technique sur le site ? Notre équipe technique est à votre disposition.</p>
            <button className="btn-outline" onClick={() => setFormData({...formData, sujet: "Problème technique"})}>
              Signaler un problème
            </button>
          </div>
          
          <div className="info-box">
            <h3>Urgences</h3>
            <p>Pour les urgences, contactez-nous directement par téléphone.</p>
            <a href="tel:0123456789" className="btn-solid">
              Appeler maintenant
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;