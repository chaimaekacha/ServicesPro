// import React, { useState } from 'react';
// import '../style/ClientDachboard.css';
// import { 
//   Star, User, Heart, Clock, Bell, Search, 
//   MessageSquare, Settings, History, Phone, 
//   Mail, MapPin, Eye, Edit, Trash2, Filter,
//   ChevronRight, ChevronDown, Plus
// } from 'lucide-react';

// const Clientdachboard = () => {
//   const [activeSection, setActiveSection] = useState('avis');
//   const [user] = useState({
//     name: 'Marie Dubois',
//     email: 'marie.dubois@email.com',
//     phone: '+33 6 12 34 56 78',
//     location: 'Paris, France',
//     memberSince: 'Janvier 2023',
//     avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marie'
//   });

//   const [avis] = useState([
//     { 
//       id: 1, 
//       prestataire: 'Électriciens Pro', 
//       note: 5, 
//       date: '15/03/2024', 
//       commentaire: 'Service excellent, travail très soigné et professionnel.',
//       photos: ['https://via.placeholder.com/100'],
//       service: 'Installation électrique'
//     },
//     { 
//       id: 2, 
//       prestataire: 'Plombier Express', 
//       note: 4, 
//       date: '10/03/2024', 
//       commentaire: 'Intervention rapide, bon rapport qualité-prix.',
//       photos: [],
//       service: 'Dépannage plomberie'
//     },
//     { 
//       id: 3, 
//       prestataire: 'Menuiserie Bois Nature', 
//       note: 5, 
//       date: '05/03/2024', 
//       commentaire: 'Rénovation parfaite de notre porte-fenêtre, je recommande !',
//       photos: ['https://via.placeholder.com/100', 'https://via.placeholder.com/100'],
//       service: 'Menuiserie bois'
//     }
//   ]);

//   const [prestataires] = useState([
//     {
//       id: 1,
//       name: 'Électriciens Pro',
//       category: 'Électricité',
//       status: 'favori',
//       lastContact: 'Aujourd\'hui',
//       photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Electricien',
//       rating: 4.9
//     },
//     {
//       id: 2,
//       name: 'Plombier Express',
//       category: 'Plomberie',
//       status: 'contacté',
//       lastContact: 'Hier',
//       photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Plombier',
//       rating: 4.7
//     },
//     {
//       id: 3,
//       name: 'Menuiserie Bois Nature',
//       category: 'Menuiserie',
//       status: 'favori',
//       lastContact: 'Il y a 3 jours',
//       photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Menuisier',
//       rating: 4.8
//     }
//   ]);

//   const [recentSearches] = useState([
//     'Plombier Paris 15ème',
//     'Électricien urgence',
//     'Peinture appartement',
//     'Menuisier meubles sur mesure'
//   ]);

//   const [notifications] = useState([
//     {
//       id: 1,
//       type: 'message',
//       title: 'Nouveau message',
//       content: 'Électriciens Pro a répondu à votre demande',
//       time: 'Il y a 10 min',
//       read: false
//     },
//     {
//       id: 2,
//       type: 'service',
//       title: 'Nouveau service',
//       content: 'Un prestataire correspondant à vos recherches est disponible',
//       time: 'Il y a 2h',
//       read: true
//     },
//     {
//       id: 3,
//       type: 'avis',
//       title: 'Avis publié',
//       content: 'Votre avis sur Plombier Express a été publié',
//       time: 'Il y a 1 jour',
//       read: true
//     }
//   ]);

//   const renderStars = (note) => {
//     return [...Array(5)].map((_, i) => (
//       <Star 
//         key={i} 
//         size={16} 
//         className={`star ${i < note ? 'filled' : 'empty'}`}
//         fill={i < note ? '#FFD700' : 'none'}
//       />
//     ));
//   };

//   const stats = [
//     { label: 'Avis publiés', value: '12', icon: Star, color: '#4F46E5' },
//     { label: 'Favoris', value: '8', icon: Heart, color: '#EC4899' },
//     { label: 'Contacts', value: '24', icon: MessageSquare, color: '#10B981' },
//     { label: 'Recherches', value: '36', icon: Search, color: '#F59E0B' }
//   ];

//   const menuItems = [
//     { id: 'avis', label: 'Mes Avis', icon: Star },
//     { id: 'prestataires', label: 'Prestataires', icon: User },
//     { id: 'recherches', label: 'Recherches', icon: Search },
//     { id: 'notifications', label: 'Notifications', icon: Bell },
//     { id: 'historique', label: 'Historique', icon: History },
//     { id: 'parametres', label: 'Paramètres', icon: Settings }
//   ];

//   return (
//     <div className="client-dashboard">
//       {/* Sidebar */}
//       <aside className="dashboard-sidebar">
//         <div className="user-profile">
//           <img src={user.avatar} alt={user.name} className="user-avatar" />
//           <div className="user-info">
//             <h3>{user.name}</h3>
//             <p>Membre depuis {user.memberSince}</p>
//           </div>
//         </div>

//         <nav className="dashboard-menu">
//           {menuItems.map(item => (
//             <button
//               key={item.id}
//               className={`menu-item ${activeSection === item.id ? 'active' : ''}`}
//               onClick={() => setActiveSection(item.id)}
//             >
//               <item.icon size={20} />
//               <span>{item.label}</span>
//               <ChevronRight size={16} className="chevron" />
//             </button>
//           ))}
//         </nav>

//         <div className="quick-actions">
//           <h4>Actions rapides</h4>
//           <button className="action-btn">
//             <Plus size={16} />
//             <span>Nouvelle recherche</span>
//           </button>
//           <button className="action-btn">
//             <Edit size={16} />
//             <span>Modifier profil</span>
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="dashboard-content">
//         {/* Header */}
//         <header className="dashboard-header">
//           <div className="header-title">
//             <h1>Mon Espace Client</h1>
//             <p>Gérez vos interactions avec les prestataires</p>
//           </div>
//           <div className="header-actions">
//             <button className="notification-btn">
//               <Bell size={24} />
//               <span className="badge">3</span>
//             </button>
//             <button className="settings-btn">
//               <Settings size={24} />
//             </button>
//           </div>
//         </header>

//         {/* Stats Cards */}
//         <div className="stats-grid">
//           {stats.map(stat => (
//             <div key={stat.label} className="stat-card">
//               <div className="stat-icon" style={{ backgroundColor: `${stat.color}20` }}>
//                 <stat.icon size={24} color={stat.color} />
//               </div>
//               <div className="stat-content">
//                 <h3>{stat.value}</h3>
//                 <p>{stat.label}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Dynamic Content Sections */}
//         {activeSection === 'avis' && (
//           <section className="content-section">
//             <div className="section-header">
//               <h2>Mes Avis Publiés</h2>
//               <button className="filter-btn">
//                 <Filter size={16} />
//                 Filtrer
//               </button>
//             </div>
//             <div className="avis-grid">
//               {avis.map(avisItem => (
//                 <div key={avisItem.id} className="avis-card">
//                   <div className="avis-header">
//                     <div className="prestataire-info">
//                       <h4>{avisItem.prestataire}</h4>
//                       <span className="service-tag">{avisItem.service}</span>
//                     </div>
//                     <div className="avis-rating">
//                       <div className="stars">{renderStars(avisItem.note)}</div>
//                       <span className="date">{avisItem.date}</span>
//                     </div>
//                   </div>
//                   <p className="avis-comment">{avisItem.commentaire}</p>
//                   {avisItem.photos.length > 0 && (
//                     <div className="photos-preview">
//                       {avisItem.photos.map((photo, index) => (
//                         <img key={index} src={photo} alt="Avis" />
//                       ))}
//                     </div>
//                   )}
//                   <div className="avis-actions">
//                     <button className="action-btn-small">
//                       <Eye size={16} />
//                       Voir
//                     </button>
//                     <button className="action-btn-small">
//                       <Edit size={16} />
//                       Modifier
//                     </button>
//                     <button className="action-btn-small delete">
//                       <Trash2 size={16} />
//                       Supprimer
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}

//         {activeSection === 'prestataires' && (
//           <section className="content-section">
//             <div className="section-header">
//               <h2>Prestataires Contactés</h2>
//               <div className="tabs">
//                 <button className="tab active">Tous (24)</button>
//                 <button className="tab">Favoris (8)</button>
//                 <button className="tab">Récents (12)</button>
//               </div>
//             </div>
//             <div className="prestataires-list">
//               {prestataires.map(prestataire => (
//                 <div key={prestataire.id} className="prestataire-card">
//                   <img src={prestataire.photo} alt={prestataire.name} className="prestataire-avatar" />
//                   <div className="prestataire-info">
//                     <div className="prestataire-main">
//                       <h4>{prestataire.name}</h4>
//                       <span className={`status-badge ${prestataire.status}`}>
//                         {prestataire.status === 'favori' ? '⭐ Favori' : '📞 Contacté'}
//                       </span>
//                     </div>
//                     <p className="category">{prestataire.category}</p>
//                     <div className="prestataire-meta">
//                       <span className="rating">
//                         {renderStars(Math.floor(prestataire.rating))}
//                         <strong>{prestataire.rating}</strong>
//                       </span>
//                       <span className="last-contact">
//                         <Clock size={14} />
//                         Contacté {prestataire.lastContact}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="prestataire-actions">
//                     <button className="icon-btn">
//                       <MessageSquare size={20} />
//                     </button>
//                     <button className="icon-btn">
//                       {prestataire.status === 'favori' ? (
//                         <Heart size={20} fill="#EC4899" color="#EC4899" />
//                       ) : (
//                         <Heart size={20} />
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}

//         {activeSection === 'recherches' && (
//           <section className="content-section">
//             <h2>Recherches Simplifiées</h2>
//             <div className="searches-section">
//               <div className="recent-searches">
//                 <h3>Recherches récentes</h3>
//                 <div className="tags-container">
//                   {recentSearches.map((search, index) => (
//                     <span key={index} className="search-tag">
//                       {search}
//                       <button className="tag-remove">×</button>
//                     </span>
//                   ))}
//                 </div>
//               </div>
//               <div className="quick-search">
//                 <h3>Nouvelle recherche rapide</h3>
//                 <div className="search-input">
//                   <Search size={20} />
//                   <input type="text" placeholder="Que recherchez-vous ?" />
//                   <button className="search-btn">Rechercher</button>
//                 </div>
//               </div>
//             </div>
//           </section>
//         )}

//         {activeSection === 'notifications' && (
//           <section className="content-section">
//             <h2>Notifications</h2>
//             <div className="notifications-list">
//               {notifications.map(notification => (
//                 <div key={notification.id} className={`notification-card ${!notification.read ? 'unread' : ''}`}>
//                   <div className="notification-icon">
//                     {notification.type === 'message' && <MessageSquare size={20} color="#4F46E5" />}
//                     {notification.type === 'service' && <Bell size={20} color="#10B981" />}
//                     {notification.type === 'avis' && <Star size={20} color="#F59E0B" />}
//                   </div>
//                   <div className="notification-content">
//                     <div className="notification-header">
//                       <h4>{notification.title}</h4>
//                       <span className="notification-time">{notification.time}</span>
//                     </div>
//                     <p>{notification.content}</p>
//                   </div>
//                   {!notification.read && <div className="unread-dot"></div>}
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}

//         {activeSection === 'historique' && (
//           <section className="content-section">
//             <h2>Historique des Interactions</h2>
//             <div className="timeline">
//               <div className="timeline-item">
//                 <div className="timeline-date">15 Mars 2024</div>
//                 <div className="timeline-content">
//                   <h4>Avis publié sur Électriciens Pro</h4>
//                   <p>Vous avez donné une note de 5 étoiles</p>
//                 </div>
//               </div>
//               <div className="timeline-item">
//                 <div className="timeline-date">14 Mars 2024</div>
//                 <div className="timeline-content">
//                   <h4>Contact avec Plombier Express</h4>
//                   <p>Demande de devis pour réparation</p>
//                 </div>
//               </div>
//               <div className="timeline-item">
//                 <div className="timeline-date">10 Mars 2024</div>
//                 <div className="timeline-content">
//                   <h4>Recherche "Menuisier Paris"</h4>
//                   <p>3 prestataires consultés</p>
//                 </div>
//               </div>
//             </div>
//           </section>
//         )}

//         {activeSection === 'parametres' && (
//           <section className="content-section">
//             <h2>Informations Personnelles</h2>
//             <div className="settings-form">
//               <div className="form-group">
//                 <label>Nom complet</label>
//                 <input type="text" value={user.name} />
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Email</label>
//                   <div className="input-with-icon">
//                     <Mail size={16} />
//                     <input type="email" value={user.email} />
//                   </div>
//                 </div>
//                 <div className="form-group">
//                   <label>Téléphone</label>
//                   <div className="input-with-icon">
//                     <Phone size={16} />
//                     <input type="tel" value={user.phone} />
//                   </div>
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label>Localisation</label>
//                 <div className="input-with-icon">
//                   <MapPin size={16} />
//                   <input type="text" value={user.location} />
//                 </div>
//               </div>
//               <div className="form-actions">
//                 <button className="btn-primary">Enregistrer les modifications</button>
//                 <button className="btn-secondary">Annuler</button>
//               </div>
//             </div>
//           </section>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Clientdachboard;