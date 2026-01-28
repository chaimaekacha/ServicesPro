import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../style/ProfilArtisan.css";

// Import des icônes
import {
  FaMapMarkerAlt, FaTools, FaStar,
  FaCheck, FaPhone, FaEllipsisH,
  FaComment, FaClock, FaChartLine,
  FaComments, FaAward, FaCertificate, FaSearch,
  FaImages, FaListAlt, FaWhatsapp,
  FaEnvelope, FaBookmark, FaArrowLeft,
  FaPlus, FaMinus, FaDownload, FaShare,
  FaHeart, FaEdit, FaPaperPlane, FaCamera,
  FaUser, FaEuroSign, FaTag, FaHistory,
  FaThumbsUp, FaRegHeart, FaRegComment,
  FaRegBookmark, FaRegCalendarCheck,
  FaRegClock, FaRegComments, FaRegImages,
  FaRegListAlt, FaRegUserCircle, FaCrown,
  FaSmile, FaGlobe, FaPlay, FaSync,
  FaVideo, FaMobileAlt, FaSms, FaInfoCircle,
  FaGraduationCap, FaChalkboardTeacher, FaUniversity,
  FaBook, FaCalendarAlt, FaClock as FaClockSolid,
  FaTrash, FaCheckCircle, FaFileAlt,
  FaEye, FaTrophy, FaSignOutAlt, FaUserCircle
} from "react-icons/fa";

function ProfilArtisan() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [prestataire, setPrestataire] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showAddRealisationsModal, setShowAddRealisationsModal] = useState(false);
  const [showRealisationsDetail, setShowRealisationsDetail] = useState(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  
  // États pour les réalisations
  const [realisations, setRealisations] = useState([]);
  const [newRealisations, setNewRealisations] = useState({
    titre: "",
    description: "",
    type: "projet",
    date: "",
    image: null,
    categorie: "travaux",
    visibilite: "prive"
  });

  // États pour les filtres et interactions
  const [activeFilter, setActiveFilter] = useState("tous");
  const [likedRealisations, setLikedRealisations] = useState([]);
  const [savedRealisations, setSavedRealisations] = useState([]);
  const [commentaires, setCommentaires] = useState({});
  const [nouveauCommentaire, setNouveauCommentaire] = useState("");

  useEffect(() => {
    const loadProfileData = () => {
      try {
        // DEBUG: Vérifier ce qui est dans localStorage
        console.log("localStorage content:", {
          userData: localStorage.getItem("userData"),
          prestataire: localStorage.getItem(`prestataire_${id}`),
          realisations: localStorage.getItem(`realisations_${id}`)
        });

        // Méthode 1: Chercher dans localStorage
        const userData = JSON.parse(localStorage.getItem("userData"));
        
        // Méthode 2: Si pas dans localStorage, vérifier dans sessionStorage
        const sessionUserData = JSON.parse(sessionStorage.getItem("userData"));
        
        // Méthode 3: Créer un utilisateur de test pour le développement
        let currentUser = userData || sessionUserData;
        
        if (!currentUser && process.env.NODE_ENV === 'development') {
          // Créer un utilisateur de test pour le développement
          currentUser = {
            id: 1,
            nom: "Jean Dupont",
            metier: "Plombier",
            ville: "Casablanca",
            email: "jean@exemple.com",
            telephone: "06 12 34 56 78",
            description: "Plombier professionnel avec 10 ans d'expérience",
            services: ["Dépannage", "Installation", "Rénovation"],
            tarif: "À partir de 300 DH",
            anneesExperience: 10,
            disponibilite: "7j/7 - 24h/24",
            verifie: true
          };
          localStorage.setItem("userData", JSON.stringify(currentUser));
          console.log("Utilisateur de test créé:", currentUser);
        }

        const userId = id || (currentUser ? currentUser.id : null);

        if (!userId) {
          console.error("Aucun ID utilisateur trouvé");
          setLoading(false);
          return;
        }

        // Récupérer ou créer le profil du prestataire
        let savedPrestataire = JSON.parse(localStorage.getItem(`prestataire_${userId}`));
        
        if (!savedPrestataire && currentUser) {
          // Créer un nouveau profil
          savedPrestataire = {
            id: userId,
            nom: currentUser.nom || "Artisan",
            metier: currentUser.metier || "Professionnel",
            ville: currentUser.ville || "Ville",
            description: currentUser.description || "Artisan passionné par son métier.",
            services: currentUser.services || ["Service général", "Consultation"],
            tarif: currentUser.tarif || "Sur devis",
            anneesExperience: currentUser.anneesExperience || 0,
            disponibilite: currentUser.disponibilite || "Lun-Ven: 9h-18h",
            email: currentUser.email || "contact@artisan.ma",
            telephone: currentUser.telephone || "+212 6 00 00 00 00",
            verifie: currentUser.verifie || false
          };
          localStorage.setItem(`prestataire_${userId}`, JSON.stringify(savedPrestataire));
          console.log("Profil créé:", savedPrestataire);
        }

        if (savedPrestataire) {
          setPrestataire(savedPrestataire);
          
          // Vérifier si c'est l'utilisateur courant
          setIsCurrentUser(currentUser && currentUser.id.toString() === userId.toString());
          
          // Charger les réalisations
          const savedRealisations = JSON.parse(localStorage.getItem(`realisations_${userId}`)) || [];
          setRealisations(savedRealisations);
          
          // Charger les commentaires
          const savedCommentaires = JSON.parse(localStorage.getItem(`commentaires_${userId}`)) || {};
          setCommentaires(savedCommentaires);
        }
        
        setLoading(false);
        
      } catch (error) {
        console.error("Erreur lors du chargement du profil:", error);
        setLoading(false);
      }
    };

    // Charger les données
    loadProfileData();
  }, [id]);

  // Fonction pour sauvegarder le profil
  const saveProfile = (updatedData) => {
    if (!prestataire) return;
    
    const updatedPrestataire = { ...prestataire, ...updatedData };
    setPrestataire(updatedPrestataire);
    localStorage.setItem(`prestataire_${prestataire.id}`, JSON.stringify(updatedPrestataire));
  };

  // Sauvegarder les réalisations
  useEffect(() => {
    if (prestataire) {
      localStorage.setItem(`realisations_${prestataire.id}`, JSON.stringify(realisations));
    }
  }, [realisations, prestataire]);

  // Sauvegarder les commentaires
  useEffect(() => {
    if (prestataire) {
      localStorage.setItem(`commentaires_${prestataire.id}`, JSON.stringify(commentaires));
    }
  }, [commentaires, prestataire]);

  const handleAddRealisations = () => {
    if (!newRealisations.titre.trim() || !newRealisations.description.trim()) {
      alert("Veuillez remplir le titre et la description");
      return;
    }

    const realisation = {
      id: Date.now(),
      ...newRealisations,
      date: newRealisations.date || new Date().toISOString().split('T')[0],
      creeLe: new Date().toISOString(),
      likes: 0,
      commentaires: 0,
      partages: 0,
      prestataireId: prestataire?.id,
      prestataireNom: prestataire?.nom,
      prestataireMetier: prestataire?.metier
    };

    setRealisations([realisation, ...realisations]);
    setNewRealisations({
      titre: "",
      description: "",
      type: "projet",
      date: "",
      image: null,
      categorie: "travaux",
      visibilite: "prive"
    });
    setShowAddRealisationsModal(false);
  };

  const handleDeleteRealisations = (realisationId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette réalisation ?")) {
      setRealisations(realisations.filter(r => r.id !== realisationId));
      
      const newCommentaires = { ...commentaires };
      delete newCommentaires[realisationId];
      setCommentaires(newCommentaires);
    }
  };

  const handleLikeRealisations = (realisationId) => {
    if (likedRealisations.includes(realisationId)) {
      setLikedRealisations(likedRealisations.filter(id => id !== realisationId));
      setRealisations(prev => prev.map(r => 
        r.id === realisationId ? { ...r, likes: r.likes - 1 } : r
      ));
    } else {
      setLikedRealisations([...likedRealisations, realisationId]);
      setRealisations(prev => prev.map(r => 
        r.id === realisationId ? { ...r, likes: r.likes + 1 } : r
      ));
    }
  };

  const handleSaveRealisations = (realisationId) => {
    if (savedRealisations.includes(realisationId)) {
      setSavedRealisations(savedRealisations.filter(id => id !== realisationId));
    } else {
      setSavedRealisations([...savedRealisations, realisationId]);
    }
  };

  const handleAddCommentaire = (realisationId) => {
    if (!nouveauCommentaire.trim()) return;
    
    const commentaire = {
      id: Date.now(),
      utilisateur: "Vous",
      avatar: "VO",
      commentaire: nouveauCommentaire,
      date: new Date().toLocaleDateString('fr-FR'),
      likes: 0
    };
    
    setCommentaires(prev => ({
      ...prev,
      [realisationId]: [...(prev[realisationId] || []), commentaire]
    }));
    
    setRealisations(prev => prev.map(r => 
      r.id === realisationId ? { ...r, commentaires: (r.commentaires || 0) + 1 } : r
    ));
    
    setNouveauCommentaire("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewRealisations(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getRealisationsIcon = (type) => {
    switch(type) {
      case 'projet': return <FaTools />;
      case 'certification': return <FaCertificate />;
      case 'client': return <FaUser />;
      case 'reference': return <FaStar />;
      case 'autre': return <FaAward />;
      default: return <FaAward />;
    }
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'projet': return "Projet réalisé";
      case 'certification': return "Certification";
      case 'client': return "Client satisfait";
      case 'reference': return "Référence";
      case 'autre': return "Autre réalisation";
      default: return type;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    sessionStorage.removeItem("userData");
    navigate("/login");
  };

  const handleEditProfile = () => {
    if (!prestataire) return;
    
    const newNom = prompt("Nom:", prestataire.nom);
    if (newNom === null) return;
    
    const newMetier = prompt("Métier:", prestataire.metier);
    if (newMetier === null) return;
    
    const newVille = prompt("Ville:", prestataire.ville);
    if (newVille === null) return;
    
    const newDescription = prompt("Description:", prestataire.description);
    if (newDescription === null) return;
    
    saveProfile({
      nom: newNom || prestataire.nom,
      metier: newMetier || prestataire.metier,
      ville: newVille || prestataire.ville,
      description: newDescription || prestataire.description
    });
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const filteredRealisations = activeFilter === "tous" 
    ? realisations 
    : realisations.filter(r => r.categorie === activeFilter || r.type === activeFilter);

  const categories = [
    { id: "tous", label: "Toutes les réalisations" },
    { id: "projet", label: "Projets" },
    { id: "certification", label: "Certifications" },
    { id: "client", label: "Clients" },
    { id: "travaux", label: "Travaux" },
    { id: "autre", label: "Autres" }
  ];

  const getMetierColor = (metier) => {
    if (!metier) return "#3498db";
    const colors = {
      "Plombier": "#3498db",
      "Électricien": "#f39c12",
      "Menuisier": "#8e44ad",
      "Nettoyage": "#2ecc71",
      "Peintre": "#e74c3c",
      "Jardinier": "#27ae60",
      "Mécanicien": "#34495e",
      "Dépanneur": "#d35400",
      "Professeur": "#9b59b6",
      "Enseignant": "#9b59b6",
      "Formateur": "#16a085"
    };
    return colors[metier] || "#3498db";
  };

  // Écran de chargement
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Chargement de votre profil...</p>
      </div>
    );
  }

  // Si pas de prestataire après chargement
  if (!prestataire) {
    return (
      <div className="not-found-container">
        <h2>Bienvenue sur Artisanat Maroc</h2>
        <p>Connectez-vous pour accéder à votre espace professionnel</p>
        <div className="auth-buttons">
          <button onClick={handleLoginRedirect} className="btn btn-primary">
            Se connecter
          </button>
          <button onClick={() => navigate("/register")} className="btn btn-secondary">
            S'inscrire
          </button>
        </div>
        <div className="demo-info">
          <p>Pour tester l'application, un profil de démonstration a été créé automatiquement.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-refresh"
          >
            Actualiser la page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profil-prive">
      {/* En-tête privée */}
      <header className="entete-prive" style={{ background: `linear-gradient(135deg, ${getMetierColor(prestataire.metier)} 0%, #2c3e50 100%)` }}>
        <div className="entete-haut">
          <button className="btn-retour" onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </button>
          <h1 className="titre-page">Mon Espace Pro</h1>
          <div className="actions-entete">
            {isCurrentUser ? (
              <>
                <button 
                  className="btn-action primaire"
                  onClick={() => setShowAddRealisationsModal(true)}
                >
                  <FaPlus /> Ajouter une réalisation
                </button>
                <button className="icone-action" onClick={handleEditProfile}>
                  <FaEdit />
                </button>
                <button className="icone-action" onClick={handleLogout} title="Déconnexion">
                  <FaSignOutAlt />
                </button>
              </>
            ) : (
              <button 
                className="btn-action primaire"
                onClick={() => setShowContactModal(true)}
              >
                <FaEnvelope /> Contacter
              </button>
            )}
          </div>
        </div>
        
        <div className="stats-rapides">
          <div className="stat-rapide">
            <FaTools />
            <span>{realisations.length} Réalisations</span>
          </div>
          <div className="stat-rapide">
            <FaStar />
            <span>{prestataire.anneesExperience || 0}+ ans d'expérience</span>
          </div>
          <div className="stat-rapide">
            <FaMapMarkerAlt />
            <span>{prestataire.ville}</span>
          </div>
        </div>
      </header>

      <main className="contenu-principal">
        {/* Section profil */}
        <section className="section-profil">
          <div className="carte-profil-prive">
            <div className="entete-profil-prive">
              <div className="photo-profil-prive">
                <div className="avatar-placeholder" style={{ backgroundColor: getMetierColor(prestataire.metier) }}>
                  <FaUserCircle />
                </div>
                <span className="badge-verifie-prive" style={{ backgroundColor: prestataire.verifie ? "#00a859" : "#f39c12" }}>
                  <FaCheck /> {prestataire.verifie ? "Vérifié" : "En attente"}
                </span>
              </div>
              <div className="info-profil-prive">
                <h2 className="nom-profil-prive">{prestataire.nom}</h2>
                <p className="titre-profil-prive" style={{ color: getMetierColor(prestataire.metier) }}>
                  <FaTools /> {prestataire.metier}
                </p>
                <div className="meta-profil">
                  <span className="item-meta">
                    <FaMapMarkerAlt /> {prestataire.ville}
                  </span>
                  <span className="item-meta">
                    <FaEuroSign /> {prestataire.tarif}
                  </span>
                  <span className="item-meta">
                    <FaClock /> {prestataire.disponibilite}
                  </span>
                </div>
              </div>
            </div>

            <div className="details-profil-prive">
              <h3>À propos de mon activité</h3>
              <p className="texte-a-propos">
                {prestataire.description}
              </p>
              
              <div className="liste-services">
                <h4>Services proposés</h4>
                <div className="tags-services">
                  {prestataire.services && prestataire.services.map((service, index) => (
                    <span key={index} className="tag-service" style={{ borderColor: getMetierColor(prestataire.metier) }}>
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {!isCurrentUser && (
                <div className="info-contact-prive">
                  <h4>Contact professionnel</h4>
                  <button 
                    className="btn-contact-prive"
                    onClick={() => setShowContactModal(true)}
                    style={{ backgroundColor: getMetierColor(prestataire.metier) }}
                  >
                    <FaEnvelope /> Contacter
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Section des réalisations */}
        <section className="section-realisations">
          <div className="entete-section">
            <h2>
              <FaTrophy /> {isCurrentUser ? "Mes" : "Ses"} Réalisations
              <span className="badge-compte">{realisations.length}</span>
            </h2>
            
            <div className="filtres-realisations">
              {categories.map(categorie => (
                <button
                  key={categorie.id}
                  className={`btn-filtre ${activeFilter === categorie.id ? 'actif' : ''}`}
                  onClick={() => setActiveFilter(categorie.id)}
                  style={activeFilter === categorie.id ? { backgroundColor: getMetierColor(prestataire.metier) } : {}}
                >
                  {categorie.label}
                </button>
              ))}
            </div>
          </div>

          {realisations.length > 0 && (
            <div className="stats-realisations">
              <div className="carte-stat">
                <div className="icone-stat" style={{ backgroundColor: getMetierColor(prestataire.metier) }}>
                  <FaTools />
                </div>
                <div className="info-stat">
                  <strong>{realisations.filter(r => r.type === 'projet').length}</strong>
                  <span>Projets</span>
                </div>
              </div>
              <div className="carte-stat">
                <div className="icone-stat" style={{ backgroundColor: "#9b59b6" }}>
                  <FaCertificate />
                </div>
                <div className="info-stat">
                  <strong>{realisations.filter(r => r.type === 'certification').length}</strong>
                  <span>Certifications</span>
                </div>
              </div>
              <div className="carte-stat">
                <div className="icone-stat" style={{ backgroundColor: "#2ecc71" }}>
                  <FaUser />
                </div>
                <div className="info-stat">
                  <strong>{realisations.filter(r => r.type === 'client').length}</strong>
                  <span>Clients</span>
                </div>
              </div>
            </div>
          )}

          {/* Liste des réalisations */}
          <div className="grille-realisations">
            {filteredRealisations.length > 0 ? (
              filteredRealisations.map(realisation => (
                <div key={realisation.id} className="carte-realisation">
                  <div className="entete-realisation">
                    <div className="type-realisation">
                      <span className="icone-type">
                        {getRealisationsIcon(realisation.type)}
                      </span>
                      <span className="libelle-type">
                        {getTypeLabel(realisation.type)}
                        {realisation.visibilite === 'prive' && isCurrentUser && (
                          <span className="badge-visibilite">
                            <FaUser /> Privé
                          </span>
                        )}
                      </span>
                    </div>
                    {isCurrentUser && (
                      <div className="actions-realisation">
                        <button 
                          className="icone-action"
                          onClick={() => setShowRealisationsDetail(realisation)}
                        >
                          <FaEye />
                        </button>
                        <button 
                          className="icone-action supprimer"
                          onClick={() => handleDeleteRealisations(realisation.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="contenu-realisation">
                    <h3 className="titre-realisation">{realisation.titre}</h3>
                    <p className="description-realisation">{realisation.description}</p>
                    
                    {realisation.image && (
                      <div className="image-realisation">
                        <img 
                          src={realisation.image} 
                          alt={realisation.titre}
                          onClick={() => setShowRealisationsDetail(realisation)}
                        />
                      </div>
                    )}
                    
                    <div className="meta-realisation">
                      <span className="item-meta">
                        <FaCalendarAlt /> {new Date(realisation.date).toLocaleDateString('fr-FR')}
                      </span>
                      {realisation.categorie && (
                        <span className="item-meta categorie">
                          {realisation.categorie}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="stats-realisation">
                    <button 
                      className={`btn-stat j-aime ${likedRealisations.includes(realisation.id) ? 'actif' : ''}`}
                      onClick={() => handleLikeRealisations(realisation.id)}
                    >
                      <FaHeart /> {realisation.likes}
                    </button>
                    <button 
                      className="btn-stat commenter"
                      onClick={() => setShowRealisationsDetail(realisation)}
                    >
                      <FaComment /> {realisation.commentaires || 0}
                    </button>
                    <button 
                      className={`btn-stat sauvegarder ${savedRealisations.includes(realisation.id) ? 'actif' : ''}`}
                      onClick={() => handleSaveRealisations(realisation.id)}
                    >
                      <FaBookmark />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="aucune-realisation">
                <FaAward className="icone-vide" />
                <h3>{isCurrentUser ? "Vous n'avez pas encore de réalisations" : "Aucune réalisation disponible"}</h3>
                <p>{isCurrentUser ? "Commencez par ajouter vos premières réalisations professionnelles" : "Ce prestataire n'a pas encore partagé ses réalisations"}</p>
                {isCurrentUser && (
                  <button 
                    className="btn-primaire"
                    onClick={() => setShowAddRealisationsModal(true)}
                    style={{ backgroundColor: getMetierColor(prestataire.metier) }}
                  >
                    <FaPlus /> Ajouter ma première réalisation
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Modal d'ajout de réalisation (seulement pour l'utilisateur courant) */}
      {isCurrentUser && showAddRealisationsModal && (
        <div className="superposition-modal" onClick={() => setShowAddRealisationsModal(false)}>
          <div className="contenu-modal modal-realisation" onClick={(e) => e.stopPropagation()}>
            <button className="fermer-modal" onClick={() => setShowAddRealisationsModal(false)}>
              &times;
            </button>
            
            <h2>
              <FaPlus /> Ajouter une réalisation
            </h2>
            
            <div className="groupe-form">
              <label>
                <FaFileAlt /> Type de réalisation
              </label>
              <select 
                value={newRealisations.type}
                onChange={(e) => setNewRealisations({...newRealisations, type: e.target.value})}
              >
                <option value="projet">Projet réalisé</option>
                <option value="certification">Certification obtenue</option>
                <option value="client">Client satisfait</option>
                <option value="reference">Référence professionnelle</option>
                <option value="autre">Autre réalisation</option>
              </select>
            </div>

            <div className="groupe-form">
              <label>
                <FaEdit /> Titre
              </label>
              <input 
                type="text" 
                placeholder="Ex: Installation complète de plomberie, Rénovation cuisine..."
                value={newRealisations.titre}
                onChange={(e) => setNewRealisations({...newRealisations, titre: e.target.value})}
              />
            </div>

            <div className="groupe-form">
              <label>
                <FaComment /> Description
              </label>
              <textarea 
                placeholder="Décrivez votre réalisation, techniques utilisées, résultats..."
                value={newRealisations.description}
                onChange={(e) => setNewRealisations({...newRealisations, description: e.target.value})}
                rows="4"
              />
            </div>

            <div className="groupe-form">
              <label>
                <FaCalendarAlt /> Date
              </label>
              <input 
                type="date" 
                value={newRealisations.date}
                onChange={(e) => setNewRealisations({...newRealisations, date: e.target.value})}
              />
            </div>

            <div className="groupe-form">
              <label>
                <FaImages /> Photo (optionnelle)
              </label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
              />
              {newRealisations.image && (
                <div className="apercu-image">
                  <img src={newRealisations.image} alt="Aperçu" />
                </div>
              )}
            </div>

            <div className="groupe-form">
              <label>
                <FaUser /> Visibilité
              </label>
              <div className="options-visibilite">
                <label className="option-visibilite">
                  <input 
                    type="radio" 
                    name="visibilite"
                    value="prive"
                    checked={newRealisations.visibilite === 'prive'}
                    onChange={(e) => setNewRealisations({...newRealisations, visibilite: e.target.value})}
                  />
                  <FaUser /> Privé (seulement moi)
                </label>
                <label className="option-visibilite">
                  <input 
                    type="radio" 
                    name="visibilite"
                    value="public"
                    checked={newRealisations.visibilite === 'public'}
                    onChange={(e) => setNewRealisations({...newRealisations, visibilite: e.target.value})}
                  />
                  <FaGlobe /> Public (visible par les clients)
                </label>
              </div>
            </div>

            <div className="actions-modal">
              <button 
                className="btn-secondaire"
                onClick={() => setShowAddRealisationsModal(false)}
              >
                Annuler
              </button>
              <button 
                className="btn-primaire"
                onClick={handleAddRealisations}
                style={{ backgroundColor: getMetierColor(prestataire.metier) }}
              >
                <FaCheckCircle /> Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de détail d'une réalisation */}
      {showRealisationsDetail && (
        <div className="superposition-modal" onClick={() => setShowRealisationsDetail(null)}>
          <div className="contenu-modal modal-detail" onClick={(e) => e.stopPropagation()}>
            <button className="fermer-modal" onClick={() => setShowRealisationsDetail(null)}>
              &times;
            </button>
            
            <div className="entete-detail">
              <div className="type-detail">
                {getRealisationsIcon(showRealisationsDetail.type)}
                <span>{getTypeLabel(showRealisationsDetail.type)}</span>
              </div>
              <h2>{showRealisationsDetail.titre}</h2>
              <p className="date-detail">
                <FaCalendarAlt /> {new Date(showRealisationsDetail.date).toLocaleDateString('fr-FR')}
              </p>
            </div>

            {showRealisationsDetail.image && (
              <div className="image-detail">
                <img src={showRealisationsDetail.image} alt={showRealisationsDetail.titre} />
              </div>
            )}

            <div className="description-detail">
              <h3>Description</h3>
              <p>{showRealisationsDetail.description}</p>
            </div>

            {/* Commentaires */}
            <div className="commentaires-detail">
              <h3>Commentaires</h3>
              
              <div className="liste-commentaires">
                {commentaires[showRealisationsDetail.id]?.map(commentaire => (
                  <div key={commentaire.id} className="commentaire-detail">
                    <div className="avatar-commentaire">{commentaire.avatar}</div>
                    <div className="contenu-commentaire-detail">
                      <div className="entete-commentaire-detail">
                        <strong>{commentaire.utilisateur}</strong>
                        <span className="heure-commentaire">{commentaire.date}</span>
                      </div>
                      <p>{commentaire.commentaire}</p>
                    </div>
                  </div>
                )) || (
                  <p className="aucun-commentaire">Aucun commentaire pour le moment</p>
                )}
              </div>

              {/* Ajouter un commentaire */}
              <div className="ajouter-commentaire-detail">
                <input 
                  type="text" 
                  placeholder="Ajouter un commentaire..."
                  value={nouveauCommentaire}
                  onChange={(e) => setNouveauCommentaire(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddCommentaire(showRealisationsDetail.id)}
                />
                <button 
                  className="btn-envoyer-commentaire"
                  onClick={() => handleAddCommentaire(showRealisationsDetail.id)}
                  disabled={!nouveauCommentaire.trim()}
                  style={{ backgroundColor: getMetierColor(prestataire.metier) }}
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Contact */}
      {showContactModal && (
        <div className="superposition-modal" onClick={() => setShowContactModal(false)}>
          <div className="contenu-modal modal-contact" onClick={(e) => e.stopPropagation()}>
            <button className="fermer-modal" onClick={() => setShowContactModal(false)}>
              &times;
            </button>
            <h2>Contacter {prestataire.nom}</h2>
            
            <div className="options-contact-modal">
              {prestataire.telephone && (
                <div className="option-contact-modal" onClick={() => window.open(`tel:${prestataire.telephone}`)}>
                  <div className="icone-option-modal">
                    <FaPhone />
                  </div>
                  <div className="contenu-option-modal">
                    <h4>Appeler</h4>
                    <p>{prestataire.telephone}</p>
                  </div>
                </div>
              )}
              
              <div className="option-contact-modal" onClick={() => window.open(`https://wa.me/${prestataire.telephone || '212600000000'}`)}>
                <div className="icone-option-modal" style={{ backgroundColor: "#25D366" }}>
                  <FaWhatsapp />
                </div>
                <div className="contenu-option-modal">
                  <h4>WhatsApp</h4>
                  <p>Message rapide</p>
                </div>
              </div>

              {prestataire.email && (
                <div className="option-contact-modal" onClick={() => window.open(`mailto:${prestataire.email}`)}>
                  <div className="icone-option-modal">
                    <FaEnvelope />
                  </div>
                  <div className="contenu-option-modal">
                    <h4>Email</h4>
                    <p>{prestataire.email}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="note-info-contact">
              <FaInfoCircle />
              <p>Contact réservé aux demandes professionnelles</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilArtisan;