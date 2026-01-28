import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import data from "../data/db.json";
import "../style/Profil.css";

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
  FaVideo, FaMobileAlt, FaSms, FaInfoCircle
} from "react-icons/fa";

// Import des images
import plombierImg from "../Assets/images/plombier.jpg";
import electricienImg from "../Assets/images/electricien.jpg";
import menageImg from "../Assets/images/menage.jpg";
import menuisierImg from "../Assets/images/menuisier.jpg";
import coiffeuseImg from "../Assets/images/coiffeuse.jpg";
import climatisationImg from "../Assets/images/climatisation.jpg";
import couturierImg from "../Assets/images/couturier.jpg";
import peintreImg from "../Assets/images/peintre.jpg";
import plombierImg2 from "../Assets/images/plombier2.jpg";
import electricienImg2 from "../Assets/images/electricien2.jpg";
import menuisierImg2 from "../Assets/images/menuisier2.jpg";
import coiffeuseImg2 from "../Assets/images/coiffeuse2.jpg";

const imageMap = {
  Plombier: plombierImg,
  Électricien: electricienImg,
  Menuisier: menuisierImg,
  Menage: menageImg,
  Coiffeuse: coiffeuseImg,
  Climatiseur: climatisationImg,
  Couturier: couturierImg,
  Peintre: peintreImg,
  Plombier2: plombierImg2,
  Électricien2: electricienImg2,
  Menuisier2: menuisierImg2,
  Coiffeuse2: coiffeuseImg2
};

function Profil() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [artisan, setArtisan] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  
  const [likedPosts, setLikedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentingOn, setCommentingOn] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const [posts, setPosts] = useState([
    {
      id: 1,
      image: plombierImg,
      description: "Installation complète d'une salle de bain moderne avec carrelage italien. Projet réalisé en 3 jours pour notre client à Casablanca.",
      date: "Il y a 2 jours",
      likes: 245,
      comments: 42,
      shares: 18,
      saves: 12,
      hashtags: ["#plomberie", "#renovation", "#salledebain", "#travaux", "#artisan"],
      location: "Casablanca",
      beforeAfter: true,
      type: "photo",
      category: "renovation"
    },
    {
      id: 2,
      image: electricienImg,
      description: "Mise aux normes électrique complète d'une villa de 200m². Installation d'un tableau électrique nouvelle génération avec contrôle intelligent.",
      date: "Il y a 5 jours",
      likes: 189,
      comments: 31,
      shares: 25,
      saves: 8,
      hashtags: ["#electricite", "#securite", "#installation", "#maison", "#professionnel"],
      location: "Rabat",
      certified: true,
      type: "photo",
      category: "installation"
    },
    {
      id: 3,
      video: "https://example.com/video1.mp4",
      thumbnail: menageImg,
      description: "Nettoyage professionnel après travaux de rénovation. Utilisation de produits écologiques pour un résultat impeccable.",
      date: "Hier",
      likes: 156,
      comments: 28,
      shares: 12,
      saves: 15,
      hashtags: ["#menage", "#proprete", "#nettoyage", "#ecologique", "#resultat"],
      location: "Marrakech",
      type: "video",
      category: "nettoyage",
      duration: "2:30"
    },
    {
      id: 4,
      image: menuisierImg,
      description: "Cuisine sur mesure en chêne massif avec plans de travail en granit. Conception personnalisée pour optimiser l'espace.",
      date: "Il y a 1 semaine",
      likes: 432,
      comments: 67,
      shares: 45,
      saves: 32,
      hashtags: ["#menuisier", "#cuisine", "#boismassif", "#surmesure", "#qualite"],
      location: "Casablanca",
      type: "photo",
      category: "menuiserie"
    },
    {
      id: 5,
      image: coiffeuseImg,
      description: "Coiffure et préparation pour un mariage traditionnel marocain. Coiffure traditionnelle réalisée avec soin et précision.",
      date: "Il y a 3 jours",
      likes: 321,
      comments: 48,
      shares: 32,
      saves: 21,
      hashtags: ["#coiffure", "#mariage", "#traditionnel", "#beaute", "#artisanat"],
      location: "Fès",
      type: "photo",
      category: "coiffure"
    },
    {
      id: 6,
      image: climatisationImg,
      description: "Installation d'un système de climatisation multi-split pour une villa avec contrôle via application mobile.",
      date: "Aujourd'hui",
      likes: 127,
      comments: 19,
      shares: 8,
      saves: 6,
      hashtags: ["#climatisation", "#confort", "#installation", "#technologie", "#maison"],
      location: "Tanger",
      type: "photo",
      category: "installation"
    }
  ]);

  const [postComments, setPostComments] = useState({
    1: [
      { id: 1, user: "Fatima Z.", avatar: "FZ", comment: "Magnifique travail! Le carrelage est magnifique.", date: "Il y a 1 jour", likes: 12 },
      { id: 2, user: "Karim M.", avatar: "KM", comment: "Combien de temps a pris l'installation?", date: "Il y a 2 jours", likes: 3 },
    ],
    2: [
      { id: 1, user: "Ahmed R.", avatar: "AR", comment: "Très professionnel, installation impeccable!", date: "Il y a 3 jours", likes: 8 },
    ],
    3: [
      { id: 1, user: "Youssef L.", avatar: "YL", comment: "Excellent service, très satisfait du résultat!", date: "Il y a 2 jours", likes: 6 }
    ],
    4: [
      { id: 1, user: "Nadia B.", avatar: "NB", comment: "La cuisine est magnifique! Quelle marque de bois?", date: "Il y a 5 jours", likes: 15 },
    ]
  });

  useEffect(() => {
    const foundArtisan = data.prestataires.find((p) => p.id === parseInt(id));
    if (foundArtisan) {
      setArtisan(foundArtisan);
    }
  }, [id]);

  const handleLikePost = (postId) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
      setPosts(prev => prev.map(post => 
        post.id === postId ? { ...post, likes: post.likes - 1 } : post
      ));
    } else {
      setLikedPosts([...likedPosts, postId]);
      setPosts(prev => prev.map(post => 
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      ));
    }
  };

  const handleSavePost = (postId) => {
    if (savedPosts.includes(postId)) {
      setSavedPosts(savedPosts.filter(id => id !== postId));
      setPosts(prev => prev.map(post => 
        post.id === postId ? { ...post, saves: (post.saves || 0) - 1 } : post
      ));
    } else {
      setSavedPosts([...savedPosts, postId]);
      setPosts(prev => prev.map(post => 
        post.id === postId ? { ...post, saves: (post.saves || 0) + 1 } : post
      ));
    }
  };

  const handleAddComment = (postId) => {
    if (!newComment.trim()) return;
    
    const newCommentObj = {
      id: Date.now(),
      user: "Vous",
      avatar: "VO",
      comment: newComment,
      date: "À l'instant",
      likes: 0
    };
    
    setPostComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newCommentObj]
    }));
    
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, comments: post.comments + 1 } : post
    ));
    
    setNewComment("");
    setCommentingOn(null);
  };

  const handleSharePost = (post) => {
    if (navigator.share) {
      navigator.share({
        title: `Réalisation de ${artisan?.nom}`,
        text: post.description,
        url: window.location.href,
      }).then(() => {
        setPosts(prev => prev.map(p => 
          p.id === post.id ? { ...p, shares: p.shares + 1 } : p
        ));
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Lien de la publication copié!");
      setPosts(prev => prev.map(p => 
        p.id === post.id ? { ...p, shares: p.shares + 1 } : p
      ));
    }
  };

  const handleContactClick = () => {
    setShowContactModal(true);
  };

  const handleCall = () => {
    window.open(`tel:+212600000000`);
  };

  const handleSMS = () => {
    window.open(`sms:+212600000000`);
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/212600000000?text=Bonjour ${artisan?.nom}, je suis intéressé par vos services`);
  };

  const handleEmail = () => {
    window.open(`mailto:contact@artisanat.ma?subject=Demande de devis pour ${artisan?.metier}`);
  };

  const filteredPosts = activeFilter === "all" 
    ? posts 
    : posts.filter(post => post.category === activeFilter);

  if (!artisan) {
    return (
      <div className="not-found-container">
        <h2>Artisan non trouvé</h2>
        <button onClick={() => navigate(-1)} className="btn btn-primary">
          <FaArrowLeft /> Retour
        </button>
      </div>
    );
  }

  const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
  const totalComments = posts.reduce((sum, post) => sum + post.comments, 0);
  const totalShares = posts.reduce((sum, post) => sum + post.shares, 0);

  const categories = ["all", ...new Set(posts.map(post => post.category))];

  return (
    <div className="facebook-page">
      {/* En-tête Facebook */}
      <header className="facebook-header">
        <div className="header-top">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </button>
          <h1 className="page-title">Artisanat Maroc</h1>
          <div className="header-actions">
            <button className="action-icon">
              <FaSearch />
            </button>
            <button className="action-icon" onClick={handleContactClick}>
              <FaEnvelope />
            </button>
          </div>
        </div>
      </header>

      <main className="facebook-main">
        <aside className="facebook-sidebar">
          <div className="profile-card">
            <div className="profile-cover">
              <div className="cover-photo"></div>
              <div className="profile-photo">
                <img
                  src={imageMap[artisan.metier] }
                  alt={artisan.nom}
                />
                {artisan.verifie && (
                  <span className="verified-badge">
                    <FaCheck />
                  </span>
                )}
              </div>
            </div>
            
            <div className="profile-info">
              <h2 className="profile-name">{artisan.nom}</h2>
              <p className="profile-title">{artisan.metier}</p>
              
              <div className="profile-details">
                <div className="detail-item">
                  <FaMapMarkerAlt />
                  <span>{artisan.ville}</span>
                </div>
                <div className="detail-item">
                  <FaTools />
                  <span>{artisan.anneesExperience || 5}+ ans d'expérience</span>
                </div>
                <div className="detail-item">
                  <FaStar />
                  <span>Artisan vérifié</span>
                </div>
              </div>
              
              <div className="profile-stats">
                <div className="stat">
                  <strong>{posts.length}</strong>
                  <span>Publications</span>
                </div>
                <div className="stat">
                  <strong>{totalLikes}</strong>
                  <span>J'aime</span>
                </div>
                <div className="stat">
                  <strong>{totalComments}</strong>
                  <span>Commentaires</span>
                </div>
              </div>
              
              <div className="profile-actions">
                <button className="btn-primary" onClick={handleContactClick}>
                  <FaEnvelope /> Contacter
                </button>
                <button className="btn-secondary">
                  <FaShare /> Partager
                </button>
              </div>
            </div>
          </div>
          
          {/* Informations supplémentaires */}
          <div className="info-card">
            <h3>À propos</h3>
            <p className="about-text">
              {artisan.description || "Artisan passionné et expérimenté, spécialisé dans son domaine. Toujours à l'écoute des clients pour des résultats exceptionnels."}
            </p>
            
            <div className="services-list">
              <h4>Services proposés</h4>
              <div className="services-tags">
                {(artisan.services || []).slice(0, 6).map((service, index) => (
                  <span key={index} className="service-tag">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Fil d'actualité Facebook */}
        <section className="facebook-feed">
          {/* Filtres de catégories */}
          <div className="instagram-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`instagram-filter-btn ${activeFilter === category ? 'active' : ''}`}
                onClick={() => setActiveFilter(category)}
              >
                {category === 'all' ? 'Tout voir' : `#${category}`}
              </button>
            ))}
          </div>

          <div className="create-post">
            <div className="post-input">
              <img
                src={imageMap[artisan.metier] || plombierImg}
                alt="Votre photo"
                className="input-avatar"
              />
              <div className="input-placeholder">
                Quoi de neuf, {artisan.nom.split(' ')[0]} ?
              </div>
            </div>
            <div className="post-options">
              <button className="option-btn">
                <FaImages /> Photo/Video
              </button>
              <button className="option-btn">
                <FaTag /> Taguer
              </button>
            </div>
          </div>

          {/* Publications */}
          <div className="posts-container">
            {filteredPosts.map((post) => (
              <div key={post.id} className="facebook-post">
                {/* En-tête de la publication */}
                <div className="post-header">
                  <div className="post-author">
                    <img
                      src={imageMap[artisan.metier] || plombierImg}
                      alt={artisan.nom}
                      className="author-avatar"
                    />
                    <div className="author-info">
                      <div className="author-name">
                        <strong>{artisan.nom}</strong>
                        {post.beforeAfter && (
                          <span className="post-tag">
                            <FaImages /> Avant/Après
                          </span>
                        )}
                        {post.certified && (
                          <span className="post-tag certified">
                            <FaCertificate /> Certifié
                          </span>
                        )}
                        {post.type === 'video' && (
                          <span className="post-tag">
                            <FaVideo /> Vidéo
                          </span>
                        )}
                      </div>
                      <div className="post-meta">
                        <span className="post-time">{post.date}</span>
                        <span className="post-location">
                          <FaMapMarkerAlt /> {post.location}
                        </span>
                        {post.type === 'video' && (
                          <span className="post-duration">
                            <FaClock /> {post.duration}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button className="post-menu">
                    <FaEllipsisH />
                  </button>
                </div>

                {/* Contenu de la publication */}
                <div className="post-content">
                  {post.description && (
                    <div className="post-text">
                      <p>{post.description}</p>
                    </div>
                  )}
                  
                  {/* Média (image ou vidéo) */}
                  <div className="post-media" onClick={() => setSelectedImg(post.image || post.thumbnail)}>
                    {post.type === 'video' ? (
                      <div className="video-container">
                        <img src={post.thumbnail} alt="Vidéo" className="video-thumbnail" />
                        <div className="video-overlay">
                          <FaPlay />
                        </div>
                        <div className="video-duration">{post.duration}</div>
                      </div>
                    ) : (
                      <img src={post.image} alt="Publication" className="post-image-small" />
                    )}
                  </div>
                  
                  {/* Hashtags */}
                  {post.hashtags && post.hashtags.length > 0 && (
                    <div className="post-hashtags">
                      {post.hashtags.map((tag, idx) => (
                        <span key={idx} className="hashtag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Statistiques */}
                <div className="post-stats">
                  <div className="stats-left">
                    <span className="likes-stat">
                      <FaHeart /> {post.likes}
                    </span>
                    <span className="comments-stat">
                      <FaComment /> {post.comments}
                    </span>
                    <span className="shares-stat">
                      <FaShare /> {post.shares}
                    </span>
                  </div>
                  <div className="stats-right">
                    <span className="saves-stat">
                      <FaBookmark /> {post.saves || 0}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="post-actions">
                  <button 
                    className={`action-btn ${likedPosts.includes(post.id) ? 'active liked' : ''}`}
                    onClick={() => handleLikePost(post.id)}
                  >
                    <FaRegHeart /> J'aime
                  </button>
                  <button 
                    className={`action-btn ${commentingOn === post.id ? 'active' : ''}`}
                    onClick={() => setCommentingOn(commentingOn === post.id ? null : post.id)}
                  >
                    <FaRegComment /> Commenter
                  </button>
                  <button 
                    className="action-btn"
                    onClick={() => handleSharePost(post)}
                  >
                    <FaShare /> Partager
                  </button>
                  <button 
                    className={`action-btn ${savedPosts.includes(post.id) ? 'active saved' : ''}`}
                    onClick={() => handleSavePost(post.id)}
                  >
                    <FaRegBookmark /> Enregistrer
                  </button>
                </div>

                {/* Commentaires */}
                <div className="post-comments">
                  {/* Commentaires existants */}
                  {postComments[post.id]?.slice(0, 2).map((comment) => (
                    <div key={comment.id} className="comment">
                      <div className="comment-author">
                        <div className="comment-avatar">
                          {comment.avatar}
                        </div>
                        <div className="comment-content">
                          <div className="comment-header">
                            <strong>{comment.user}</strong>
                            <span className="comment-time">{comment.date}</span>
                          </div>
                          <p className="comment-text">{comment.comment}</p>
                          <div className="comment-actions">
                            <button className="comment-action">
                              <FaThumbsUp /> {comment.likes}
                            </button>
                            <button className="comment-action">
                              Répondre
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Ajouter un commentaire */}
                <div className="add-comment">
                  <img
                    src={imageMap[artisan.metier] || plombierImg}
                    alt="Vous"
                    className="commenter-avatar"
                  />
                  <div className="comment-input-wrapper">
                    <input
                      type="text"
                      placeholder="Écrire un commentaire..."
                      value={commentingOn === post.id ? newComment : ''}
                      onChange={(e) => setNewComment(e.target.value)}
                      onFocus={() => setCommentingOn(post.id)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                    />
                    <div className="comment-options">
                      <button className="emoji-option">
                        <FaSmile />
                      </button>
                      <button className="photo-option">
                        <FaCamera />
                      </button>
                      <button 
                        className="send-option"
                        onClick={() => handleAddComment(post.id)}
                        disabled={!newComment.trim()}
                      >
                        <FaPaperPlane />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charger plus de publications */}
          <div className="load-more-container">
            <button className="load-more-btn">
              <FaSync /> Charger plus de publications
            </button>
          </div>
        </section>

        
      </main>

      {/* Modal Contact */}
      {showContactModal && (
        <div className="modal-overlay" onClick={() => setShowContactModal(false)}>
          <div className="modal-content contact-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowContactModal(false)}>
              &times;
            </button>
            <h2>Contacter {artisan.nom}</h2>
            <p className="modal-subtitle">Choisissez votre mode de contact préféré</p>
            
            <div className="contact-options-modal">
              <div className="contact-option-modal" onClick={handleCall}>
                <div className="option-icon-modal">
                  <FaPhone />
                </div>
                <div className="option-content-modal">
                  <h4>Appeler</h4>
                  <p>Appelez directement l'artisan</p>
                  <span className="option-number">+212 600 000 000</span>
                </div>
              </div>
              
              <div className="contact-option-modal" onClick={handleSMS}>
                <div className="option-icon-modal">
                  <FaSms />
                </div>
                <div className="option-content-modal">
                  <h4>Envoyer un SMS</h4>
                  <p>Écrivez un message texte</p>
                </div>
              </div>
              
              <div className="contact-option-modal" onClick={handleWhatsApp}>
                <div className="option-icon-modal">
                  <FaWhatsapp />
                </div>
                <div className="option-content-modal">
                  <h4>WhatsApp</h4>
                  <p>Contactez via WhatsApp</p>
                  <span className="option-status">En ligne</span>
                </div>
              </div>
              
              <div className="contact-option-modal" onClick={handleEmail}>
                <div className="option-icon-modal">
                  <FaEnvelope />
                </div>
                <div className="option-content-modal">
                  <h4>Email</h4>
                  <p>Envoyez un email détaillé</p>
                  <span className="option-email">contact@artisanat.ma</span>
                </div>
              </div>
            </div>
            
            <div className="contact-info-note">
              <FaInfoCircle />
              <p>L'artisan répond généralement dans les 24 heures</p>
            </div>
          </div>
        </div>
      )}

      {selectedImg && (
        <div className="image-modal-overlay" onClick={() => setSelectedImg(null)}>
          <div className="image-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedImg(null)}>
              &times;
            </button>
            <img src={selectedImg} alt="Agrandissement" className="modal-image-large" />
            <div className="image-actions">
              <button className="action-btn">
                <FaDownload /> Télécharger
              </button>
              <button className="action-btn">
                <FaShare /> Partager
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profil;