import React, { useState } from 'react';
import { 
  Shield, UserCheck, Users, AlertTriangle, 
  CheckCircle, Eye, Edit, Trash2,
  Search, Filter, Download, RefreshCw,
  FileText, Award, Globe, Lock, Star, ChevronRight,
  X, Check, AlertCircle, User, Clock, Mail, Phone
} from 'lucide-react';
import '../style/AdminPage.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('prestataires');
  const [stats, setStats] = useState({
    prestatairesEnAttente: 12,
    utilisateursActifs: 345,
    avisSignales: 8,
    interventionsModeration: 23
  });

  const [prestataires, setPrestataires] = useState([
    { id: 1, nom: 'Électriciens Pro', statut: 'en_attente', date: '2024-03-15', documents: 3 },
    { id: 2, nom: 'Plombier Express', statut: 'valide', date: '2024-03-14', documents: 4 },
    { id: 3, nom: 'Menuiserie Bois', statut: 'rejete', date: '2024-03-13', documents: 2 },
    { id: 4, nom: 'Peinture Paris', statut: 'en_attente', date: '2024-03-12', documents: 5 },
  ]);

  const [utilisateurs, setUtilisateurs] = useState([
    { id: 1, nom: 'Marie Dubois', email: 'marie@email.com', statut: 'actif', derniereConnexion: 'Aujourd\'hui' },
    { id: 2, nom: 'Pierre Martin', email: 'pierre@email.com', statut: 'inactif', derniereConnexion: 'Il y a 7 jours' },
    { id: 3, nom: 'Sophie Bernard', email: 'sophie@email.com', statut: 'suspendu', derniereConnexion: 'Il y a 30 jours' },
    { id: 4, nom: 'Luc Petit', email: 'luc@email.com', statut: 'actif', derniereConnexion: 'Hier' },
  ]);

  const [avis, setAvis] = useState([
    { id: 1, client: 'Client A', prestataire: 'Électriciens Pro', note: 5, statut: 'approuve', date: '2024-03-15', commentaire: 'Excellent service, très professionnel.' },
    { id: 2, client: 'Client B', prestataire: 'Plombier Express', note: 1, statut: 'signale', date: '2024-03-14', commentaire: 'Service médiocre, travail bâclé.' },
    { id: 3, client: 'Client C', prestataire: 'Menuiserie Bois', note: 4, statut: 'en_attente', date: '2024-03-13', commentaire: 'Bon travail mais un peu lent.' },
    { id: 4, client: 'Client D', prestataire: 'Peinture Paris', note: 3, statut: 'signale', date: '2024-03-12', commentaire: 'Couleur différente de celle demandée.' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [filters, setFilters] = useState({
    statut: 'tous',
    date: 'tous'
  });

  // validation des prestataires
  const validerPrestataire = (id) => {
    setPrestataires(prestataires.map(p => 
      p.id === id ? { ...p, statut: 'valide' } : p
    ));
    setStats(prev => ({
      ...prev,
      prestatairesEnAttente: prev.prestatairesEnAttente - 1,
      interventionsModeration: prev.interventionsModeration + 1
    }));
    showNotification('Prestataire validé avec succès', 'success');
  };

  const rejeterPrestataire = (id) => {
    setPrestataires(prestataires.map(p => 
      p.id === id ? { ...p, statut: 'rejete' } : p
    ));
    setStats(prev => ({
      ...prev,
      prestatairesEnAttente: prev.prestatairesEnAttente - 1,
      interventionsModeration: prev.interventionsModeration + 1
    }));
    showNotification('Prestataire rejeté', 'warning');
  };

  const voirDetailsPrestataire = (prestataire) => {
    setModalContent({
      type: 'prestataire',
      title: 'Détails du prestataire',
      data: prestataire
    });
    setShowModal(true);
  };

  //  gestion des utilisateurs
  const activerUtilisateur = (id) => {
    setUtilisateurs(utilisateurs.map(u => 
      u.id === id ? { ...u, statut: 'actif' } : u
    ));
    showNotification('Utilisateur activé', 'success');
  };

  const desactiverUtilisateur = (id) => {
    setUtilisateurs(utilisateurs.map(u => 
      u.id === id ? { ...u, statut: 'inactif' } : u
    ));
    showNotification('Utilisateur désactivé', 'warning');
  };

  const suspendreUtilisateur = (id) => {
    setUtilisateurs(utilisateurs.map(u => 
      u.id === id ? { ...u, statut: 'suspendu' } : u
    ));
    setStats(prev => ({
      ...prev,
      utilisateursActifs: prev.utilisateursActifs - 1,
      interventionsModeration: prev.interventionsModeration + 1
    }));
    showNotification('Utilisateur suspendu', 'error');
  };

  const supprimerUtilisateur = (id) => {
    setUtilisateurs(utilisateurs.filter(u => u.id !== id));
    showNotification('Utilisateur supprimé', 'error');
  };

  const editerUtilisateur = (utilisateur) => {
    setModalContent({
      type: 'utilisateur',
      title: 'Modifier utilisateur',
      data: utilisateur
    });
    setShowModal(true);
  };

  // modération des avis
  const approuverAvis = (id) => {
    setAvis(avis.map(a => 
      a.id === id ? { ...a, statut: 'approuve' } : a
    ));
    setStats(prev => ({
      ...prev,
      avisSignales: prev.avisSignales - (avis.find(a => a.id === id).statut === 'signale' ? 1 : 0),
      interventionsModeration: prev.interventionsModeration + 1
    }));
    showNotification('Avis approuvé', 'success');
  };

  const signalerAvis = (id) => {
    setAvis(avis.map(a => 
      a.id === id ? { ...a, statut: 'signale' } : a
    ));
    setStats(prev => ({
      ...prev,
      avisSignales: prev.avisSignales + 1,
      interventionsModeration: prev.interventionsModeration + 1
    }));
    showNotification('Avis signalé', 'warning');
  };

  const supprimerAvis = (id) => {
    const avisASupprimer = avis.find(a => a.id === id);
    setAvis(avis.filter(a => a.id !== id));
    setStats(prev => ({
      ...prev,
      avisSignales: prev.avisSignales - (avisASupprimer.statut === 'signale' ? 1 : 0),
      interventionsModeration: prev.interventionsModeration + 1
    }));
    showNotification('Avis supprimé', 'error');
  };

  const voirDetailsAvis = (avisItem) => {
    setModalContent({
      type: 'avis',
      title: 'Détails de l\'avis',
      data: avisItem
    });
    setShowModal(true);
  };

  
  const validerTousPrestataires = () => {
    const count = prestataires.filter(p => p.statut === 'en_attente').length;
    setPrestataires(prestataires.map(p => 
      p.statut === 'en_attente' ? { ...p, statut: 'valide' } : p
    ));
    setStats(prev => ({
      ...prev,
      prestatairesEnAttente: 0,
      interventionsModeration: prev.interventionsModeration + count
    }));
    showNotification(`${count} prestataires validés`, 'success');
  };

  const nettoyerDonnees = () => {
    // Supprimer les utilisateurs inactifs depuis plus de 30 jours
    const utilisateursSupprimes = utilisateurs.filter(u => 
      u.statut === 'inactif' && u.derniereConnexion.includes('30 jours')
    ).length;
    
    setUtilisateurs(utilisateurs.filter(u => 
      !(u.statut === 'inactif' && u.derniereConnexion.includes('30 jours'))
    ));
    
    // Supprimer les avis rejetés
    const avisSupprimes = avis.filter(a => a.statut === 'rejete').length;
    setAvis(avis.filter(a => a.statut !== 'rejete'));
    
    showNotification(
      `${utilisateursSupprimes} utilisateurs et ${avisSupprimes} avis nettoyés`,
      'info'
    );
  };

  const exporterDonnees = (type) => {
    let data = '';
    let filename = '';
    
    switch(type) {
      case 'mensuel':
        data = JSON.stringify({ stats, prestataires, utilisateurs, avis }, null, 2);
        filename = `rapport-mensuel-${new Date().toISOString().slice(0,10)}.json`;
        break;
      case 'utilisateurs':
        data = JSON.stringify(utilisateurs, null, 2);
        filename = `donnees-utilisateurs-${new Date().toISOString().slice(0,10)}.json`;
        break;
      case 'logs':
        data = JSON.stringify({ interventions: stats.interventionsModeration, date: new Date() }, null, 2);
        filename = `logs-moderation-${new Date().toISOString().slice(0,10)}.json`;
        break;
    }
    
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showNotification(`Données exportées: ${filename}`, 'success');
  };

  //filtrage et recherche
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const filtrerPrestataires = () => {
    let filtered = prestataires;
    
    if (filters.statut !== 'tous') {
      filtered = filtered.filter(p => p.statut === filters.statut);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.nom.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const filtrerUtilisateurs = () => {
    let filtered = utilisateurs;
    
    if (filters.statut !== 'tous') {
      filtered = filtered.filter(u => u.statut === filters.statut);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(u => 
        u.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const filtrerAvis = () => {
    let filtered = avis;
    
    if (filters.statut !== 'tous') {
      filtered = filtered.filter(a => a.statut === filters.statut);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(a => 
        a.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.prestataire.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.commentaire.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  // Fonctions utilitaires
  const showNotification = (message, type) => {
    //  notification
    console.log(`${type.toUpperCase()}: ${message}`);
    
  };

  const actualiserDonnees = () => {
    
    setStats(prev => ({
      ...prev,
      interventionsModeration: prev.interventionsModeration + 1
    }));
    showNotification('Données actualisées', 'info');
  };

 
  const renderStatutBadge = (statut) => {
    const config = {
      en_attente: { label: 'En attente', className: 'badge badge-yellow' },
      valide: { label: 'Validé', className: 'badge badge-green' },
      rejete: { label: 'Rejeté', className: 'badge badge-red' },
      actif: { label: 'Actif', className: 'badge badge-green' },
      inactif: { label: 'Inactif', className: 'badge badge-gray' },
      suspendu: { label: 'Suspendu', className: 'badge badge-red' },
      approuve: { label: 'Approuvé', className: 'badge badge-green' },
      signale: { label: 'Signalé', className: 'badge badge-orange' },
    };
    
    return (
      <span className={config[statut]?.className || 'badge badge-gray'}>
        {config[statut]?.label || statut}
      </span>
    );
  };

  const renderStars = (note) => {
    return (
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`star ${i < note ? 'star-filled' : 'star-empty'}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const Modal = ({ show, onClose, content }) => {
    if (!show) return null;

    const renderModalContent = () => {
      switch(content?.type) {
        case 'prestataire':
          return (
            <div className="modal-content">
              <h3>{content.data.nom}</h3>
              <div className="modal-details">
                <p><strong>Statut:</strong> {renderStatutBadge(content.data.statut)}</p>
                <p><strong>Date d'inscription:</strong> {content.data.date}</p>
                <p><strong>Documents:</strong> {content.data.documents}</p>
                <p><strong>Actions disponibles:</strong></p>
                <div className="modal-actions">
                  <button 
                    className="modal-btn modal-btn-success"
                    onClick={() => {
                      validerPrestataire(content.data.id);
                      onClose();
                    }}
                  >
                    <Check size={16} /> Valider
                  </button>
                  <button 
                    className="modal-btn modal-btn-warning"
                    onClick={() => {
                      rejeterPrestataire(content.data.id);
                      onClose();
                    }}
                  >
                    <X size={16} /> Rejeter
                  </button>
                </div>
              </div>
            </div>
          );
        
        case 'utilisateur':
          return (
            <div className="modal-content">
              <h3>{content.data.nom}</h3>
              <div className="modal-details">
                <p><strong>Email:</strong> {content.data.email}</p>
                <p><strong>Statut:</strong> {renderStatutBadge(content.data.statut)}</p>
                <p><strong>Dernière connexion:</strong> {content.data.derniereConnexion}</p>
                <p><strong>Actions disponibles:</strong></p>
                <div className="modal-actions">
                  <button 
                    className="modal-btn modal-btn-success"
                    onClick={() => {
                      activerUtilisateur(content.data.id);
                      onClose();
                    }}
                  >
                    <Check size={16} /> Activer
                  </button>
                  <button 
                    className="modal-btn modal-btn-warning"
                    onClick={() => {
                      desactiverUtilisateur(content.data.id);
                      onClose();
                    }}
                  >
                    <Clock size={16} /> Désactiver
                  </button>
                  <button 
                    className="modal-btn modal-btn-error"
                    onClick={() => {
                      supprimerUtilisateur(content.data.id);
                      onClose();
                    }}
                  >
                    <Trash2 size={16} /> Supprimer
                  </button>
                </div>
              </div>
            </div>
          );
        
        case 'avis':
          return (
            <div className="modal-content">
              <h3>Avis de {content.data.client}</h3>
              <div className="modal-details">
                <p><strong>Prestataire:</strong> {content.data.prestataire}</p>
                <p><strong>Note:</strong> {renderStars(content.data.note)}</p>
                <p><strong>Date:</strong> {content.data.date}</p>
                <p><strong>Statut:</strong> {renderStatutBadge(content.data.statut)}</p>
                <p><strong>Commentaire:</strong></p>
                <p className="modal-comment">{content.data.commentaire}</p>
                <p><strong>Actions disponibles:</strong></p>
                <div className="modal-actions">
                  <button 
                    className="modal-btn modal-btn-success"
                    onClick={() => {
                      approuverAvis(content.data.id);
                      onClose();
                    }}
                  >
                    <Check size={16} /> Approuver
                  </button>
                  <button 
                    className="modal-btn modal-btn-warning"
                    onClick={() => {
                      signalerAvis(content.data.id);
                      onClose();
                    }}
                  >
                    <AlertCircle size={16} /> Signaler
                  </button>
                  <button 
                    className="modal-btn modal-btn-error"
                    onClick={() => {
                      supprimerAvis(content.data.id);
                      onClose();
                    }}
                  >
                    <Trash2 size={16} /> Supprimer
                  </button>
                </div>
              </div>
            </div>
          );
        
        default:
          return <p>Aucun contenu disponible</p>;
      }
    };

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-container" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>{content?.title || 'Détails'}</h2>
            <button className="modal-close" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
          <div className="modal-body">
            {renderModalContent()}
          </div>
          <div className="modal-footer">
            <button className="modal-btn modal-btn-secondary" onClick={onClose}>
              Fermer
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-header">
        <div className="header-top">
          <div>
            <div className="header-content">
              <div className="header-icon">
                <Shield size={32} />
              </div>
              <h1 className="admin-title">Page Administration</h1>
            </div>
            <p className="admin-subtitle">Supervision et modération de la plateforme</p>
          </div>
          <button className="refresh-btn" onClick={actualiserDonnees}>
            <RefreshCw size={20} />
            <span>Actualiser</span>
          </button>
        </div>

        {/* Stats Overview */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <h3 className="stat-title">En attente</h3>
              <AlertTriangle size={20} className="icon-yellow" />
            </div>
            <p className="stat-number">{stats.prestatairesEnAttente}</p>
            <p className="stat-desc">Prestataires à valider</p>
          </div>
          
          <div className="stat-card">
            <div className="stat-header">
              <h3 className="stat-title">Utilisateurs actifs</h3>
              <Users size={20} className="icon-green" />
            </div>
            <p className="stat-number">{stats.utilisateursActifs}</p>
            <p className="stat-desc">Sur la plateforme</p>
          </div>
          
          <div className="stat-card">
            <div className="stat-header">
              <h3 className="stat-title">Avis signalés</h3>
              <AlertTriangle size={20} className="icon-orange" />
            </div>
            <p className="stat-number">{stats.avisSignales}</p>
            <p className="stat-desc">À modérer</p>
          </div>
          
          <div className="stat-card">
            <div className="stat-header">
              <h3 className="stat-title">Interventions</h3>
              <Shield size={20} className="icon-indigo" />
            </div>
            <p className="stat-number">{stats.interventionsModeration}</p>
            <p className="stat-desc">Ce mois</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-layout">
        {/* Left Column */}
        <div className="left-column">
          {/* Supervision Globale */}
          <div className="supervision-card">
            <div className="supervision-header">
              <div className="supervision-icon">
                <Shield size={32} />
              </div>
              <div>
                <h2 className="supervision-title">Supervision Globale</h2>
                <p className="supervision-desc">
                  Donne accès à la gestion complète de la plateforme pour garantir la qualité et la sécurité
                </p>
              </div>
            </div>

            <div className="indicator-grid">
              <div className="indicator-card">
                <div className="indicator-header">
                  <div className="indicator-icon">
                    <Award size={24} />
                  </div>
                  <h3 className="indicator-name">Contrôle qualité</h3>
                </div>
                <p className="indicator-value">100%</p>
                <p className="indicator-detail">Taux de vérification</p>
              </div>

              <div className="indicator-card">
                <div className="indicator-header">
                  <div className="indicator-icon">
                    <Eye size={24} />
                  </div>
                  <h3 className="indicator-name">Surveillance</h3>
                </div>
                <p className="indicator-value">24/7</p>
                <p className="indicator-detail">Monitoring continu</p>
              </div>

              <div className="indicator-card">
                <div className="indicator-header">
                  <div className="indicator-icon">
                    <Lock size={24} />
                  </div>
                  <h3 className="indicator-name">Tolérance fraude</h3>
                </div>
                <p className="indicator-value">0</p>
                <p className="indicator-detail">Politique stricte</p>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="tabs-container">
            <div className="tabs-nav">
              <nav className="tabs-list">
                <button
                  onClick={() => setActiveTab('prestataires')}
                  className={`tab-btn ${activeTab === 'prestataires' ? 'active' : ''}`}
                >
                  Validation des Prestataires
                </button>
                <button
                  onClick={() => setActiveTab('utilisateurs')}
                  className={`tab-btn ${activeTab === 'utilisateurs' ? 'active' : ''}`}
                >
                  Gestion des Utilisateurs
                </button>
                <button
                  onClick={() => setActiveTab('avis')}
                  className={`tab-btn ${activeTab === 'avis' ? 'active' : ''}`}
                >
                  Modération des Avis
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {/* Prestataires Tab */}
              {activeTab === 'prestataires' && (
                <div className="tab-pane">
                  <div className="validation-card">
                    <div className="validation-header">
                      <div className="validation-icon">
                        <UserCheck size={24} />
                      </div>
                      <h3 className="validation-title">Validation des Prestataires</h3>
                    </div>
                    <p className="validation-desc">
                      Processus de vérification avant publication des profils
                    </p>
                    
                    <div className="validation-steps">
                      <div className="validation-step">
                        <CheckCircle size={20} className="step-icon" />
                        <div className="step-content">
                          <h4>Vérification d'identité</h4>
                          <p>Documents officiels (ID, KBIS, assurances)</p>
                        </div>
                      </div>
                      <div className="validation-step">
                        <CheckCircle size={20} className="step-icon" />
                        <div className="step-content">
                          <h4>Contrôle Qualité</h4>
                          <p>Vérification des compétences et références</p>
                        </div>
                      </div>
                      <div className="validation-step">
                        <CheckCircle size={20} className="step-icon" />
                        <div className="step-content">
                          <h4>Publication</h4>
                          <p>Mise en ligne après validation complète</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Search and Filter */}
                  <div className="filter-section">
                    <div className="search-box">
                      <Search size={20} className="search-icon" />
                      <input
                        type="text"
                        placeholder="Rechercher un prestataire..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="search-input"
                      />
                    </div>
                    <div className="filter-buttons">
                      <select 
                        className="filter-select"
                        value={filters.statut}
                        onChange={(e) => handleFilterChange('statut', e.target.value)}
                      >
                        <option value="tous">Tous les statuts</option>
                        <option value="en_attente">En attente</option>
                        <option value="valide">Validés</option>
                        <option value="rejete">Rejetés</option>
                      </select>
                    </div>
                  </div>

                  {/* Prestataires Table */}
                  <div className="table-section">
                    <div className="table-header">
                      <h4 className="table-title">
                        Prestataires en attente de validation ({filtrerPrestataires().length})
                      </h4>
                      <div className="table-actions">
                        <button className="table-btn" title="Rechercher">
                          <Search size={20} />
                        </button>
                        <button className="table-btn" title="Filtrer">
                          <Filter size={20} />
                        </button>
                        <button 
                          className="table-btn btn-success"
                          onClick={validerTousPrestataires}
                          title="Tout valider"
                          disabled={prestataires.filter(p => p.statut === 'en_attente').length === 0}
                        >
                          <Check size={20} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="data-table">
                      <table>
                        <thead>
                          <tr>
                            <th>Nom</th>
                            <th>Statut</th>
                            <th>Documents</th>
                            <th>Date</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filtrerPrestataires().map((prestataire) => (
                            <tr key={prestataire.id}>
                              <td>
                                <div className="cell-name">{prestataire.nom}</div>
                              </td>
                              <td>
                                {renderStatutBadge(prestataire.statut)}
                              </td>
                              <td>
                                <div className="cell-documents">
                                  <FileText size={16} />
                                  <span className="doc-count">{prestataire.documents}</span>
                                  <span className="doc-text">documents</span>
                                </div>
                              </td>
                              <td className="cell-date">{prestataire.date}</td>
                              <td>
                                <div className="cell-actions">
                                  {prestataire.statut === 'en_attente' && (
                                    <>
                                      <button 
                                        className="action-icon-btn btn-approve"
                                        onClick={() => validerPrestataire(prestataire.id)}
                                        title="Valider"
                                      >
                                        <CheckCircle size={20} />
                                      </button>
                                      <button 
                                        className="action-icon-btn btn-delete"
                                        onClick={() => rejeterPrestataire(prestataire.id)}
                                        title="Rejeter"
                                      >
                                        <X size={20} />
                                      </button>
                                    </>
                                  )}
                                  <button 
                                    className="action-icon-btn btn-view"
                                    onClick={() => voirDetailsPrestataire(prestataire)}
                                    title="Voir détails"
                                  >
                                    <Eye size={20} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Utilisateurs Tab */}
              {activeTab === 'utilisateurs' && (
                <div className="tab-pane">
                  <div className="section-header">
                    <div className="section-title-icon">
                      <div className="section-icon">
                        <Users size={24} />
                      </div>
                      <h3 className="section-title">Gestion des Utilisateurs</h3>
                    </div>
                  </div>
                  
                  <div className="actions-grid">
                    <div className="action-card">
                      <div className="action-card-header">
                        <div className="action-card-icon">
                          <CheckCircle size={20} />
                        </div>
                        <h4 className="action-card-title">Activer/Désactiver</h4>
                      </div>
                      <p className="action-card-desc">Gérer l'état des comptes utilisateurs</p>
                    </div>
                    
                    <div className="action-card">
                      <div className="action-card-header">
                        <div className="action-card-icon">
                          <Edit size={20} />
                        </div>
                        <h4 className="action-card-title">Modifier informations</h4>
                      </div>
                      <p className="action-card-desc">Mettre à jour les données utilisateurs</p>
                    </div>
                    
                    <div className="action-card">
                      <div className="action-card-header">
                        <div className="action-card-icon">
                          <Trash2 size={20} />
                        </div>
                        <h4 className="action-card-title">Supprimer comptes</h4>
                      </div>
                      <p className="action-card-desc">Comptes frauduleux ou inactifs</p>
                    </div>
                  </div>

                  {/* Search and Filter */}
                  <div className="filter-section">
                    <div className="search-box">
                      <Search size={20} className="search-icon" />
                      <input
                        type="text"
                        placeholder="Rechercher un utilisateur..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="search-input"
                      />
                    </div>
                    <div className="filter-buttons">
                      <select 
                        className="filter-select"
                        value={filters.statut}
                        onChange={(e) => handleFilterChange('statut', e.target.value)}
                      >
                        <option value="tous">Tous les statuts</option>
                        <option value="actif">Actifs</option>
                        <option value="inactif">Inactifs</option>
                        <option value="suspendu">Suspendus</option>
                      </select>
                    </div>
                  </div>

                  {/* Utilisateurs Table */}
                  <div className="table-section">
                    <div className="data-table">
                      <table>
                        <thead>
                          <tr>
                            <th>Utilisateur</th>
                            <th>Statut</th>
                            <th>Dernière connexion</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filtrerUtilisateurs().map((user) => (
                            <tr key={user.id}>
                              <td>
                                <div>
                                  <div className="cell-name">{user.nom}</div>
                                  <div className="cell-email">{user.email}</div>
                                </div>
                              </td>
                              <td>
                                {renderStatutBadge(user.statut)}
                              </td>
                              <td className="cell-date">{user.derniereConnexion}</td>
                              <td>
                                <div className="cell-buttons">
                                  <button 
                                    className="cell-btn btn-activate"
                                    onClick={() => activerUtilisateur(user.id)}
                                    disabled={user.statut === 'actif'}
                                  >
                                    <Check size={14} /> Activer
                                  </button>
                                  <button 
                                    className="cell-btn btn-edit"
                                    onClick={() => editerUtilisateur(user)}
                                  >
                                    <Edit size={14} /> Modifier
                                  </button>
                                  <button 
                                    className="cell-btn btn-suspend"
                                    onClick={() => suspendreUtilisateur(user.id)}
                                    disabled={user.statut === 'suspendu'}
                                  >
                                    <AlertCircle size={14} /> Suspendre
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Avis Tab */}
              {activeTab === 'avis' && (
                <div className="tab-pane">
                  <div className="section-header">
                    <div className="section-title-icon">
                      <div className="section-icon">
                        <AlertTriangle size={24} />
                      </div>
                      <div>
                        <h3 className="section-title">Modération des Avis</h3>
                        <p className="section-subtitle">
                          Garantir la qualité et l'authenticité des retours clients
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="action-buttons">
                    <button 
                      className="action-btn action-btn-publish"
                      onClick={() => {
                        avis.filter(a => a.statut === 'en_attente').forEach(a => approuverAvis(a.id));
                      }}
                      disabled={avis.filter(a => a.statut === 'en_attente').length === 0}
                    >
                      <CheckCircle size={20} />
                      Tout approuver
                      <span className="btn-count">
                        {avis.filter(a => a.statut === 'en_attente').length}
                      </span>
                    </button>
                    <button 
                      className="action-btn action-btn-report"
                      onClick={() => {
                        // Fonction pour signaler plusieurs avis
                        avis.slice(0, 2).forEach(a => signalerAvis(a.id));
                      }}
                    >
                      <AlertTriangle size={20} />
                      Signaler
                      <span className="btn-count">
                        {avis.filter(a => a.statut === 'signale').length}
                      </span>
                    </button>
                    <button 
                      className="action-btn action-btn-delete"
                      onClick={() => {
                        // Fonction pour supprimer les avis rejetés
                        avis.filter(a => a.statut === 'rejete').forEach(a => supprimerAvis(a.id));
                      }}
                      disabled={avis.filter(a => a.statut === 'rejete').length === 0}
                    >
                      <Trash2 size={20} />
                      Nettoyer
                      <span className="btn-count">
                        {avis.filter(a => a.statut === 'rejete').length}
                      </span>
                    </button>
                  </div>

                  {/* Search and Filter */}
                  <div className="filter-section">
                    <div className="search-box">
                      <Search size={20} className="search-icon" />
                      <input
                        type="text"
                        placeholder="Rechercher un avis..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="search-input"
                      />
                    </div>
                    <div className="filter-buttons">
                      <select 
                        className="filter-select"
                        value={filters.statut}
                        onChange={(e) => handleFilterChange('statut', e.target.value)}
                      >
                        <option value="tous">Tous les statuts</option>
                        <option value="en_attente">En attente</option>
                        <option value="approuve">Approuvés</option>
                        <option value="signale">Signalés</option>
                      </select>
                    </div>
                  </div>

                  {/* Avis Table */}
                  <div className="table-section">
                    <div className="data-table">
                      <table>
                        <thead>
                          <tr>
                            <th>Avis</th>
                            <th>Note</th>
                            <th>Statut</th>
                            <th>Date</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filtrerAvis().map((item) => (
                            <tr key={item.id}>
                              <td>
                                <div>
                                  <div className="cell-name">{item.client} → {item.prestataire}</div>
                                  <div className="cell-detail">{item.commentaire}</div>
                                </div>
                              </td>
                              <td>
                                {renderStars(item.note)}
                              </td>
                              <td>
                                {renderStatutBadge(item.statut)}
                              </td>
                              <td className="cell-date">{item.date}</td>
                              <td>
                                <div className="cell-buttons">
                                  <button 
                                    className="cell-btn btn-approve"
                                    onClick={() => approuverAvis(item.id)}
                                    disabled={item.statut === 'approuve'}
                                  >
                                    Approuver
                                  </button>
                                  <button 
                                    className="cell-btn btn-view"
                                    onClick={() => voirDetailsAvis(item)}
                                  >
                                    Voir
                                  </button>
                                  <button 
                                    className="cell-btn btn-delete-small"
                                    onClick={() => supprimerAvis(item.id)}
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          {/* Quick Actions */}
          <div className="sidebar-card">
            <h3 className="sidebar-title">Actions Rapides</h3>
            <div className="quick-actions-list">
              <button 
                className="quick-action"
                onClick={validerTousPrestataires}
                disabled={prestataires.filter(p => p.statut === 'en_attente').length === 0}
              >
                <div className="action-content">
                  <div className="action-icon icon-indigo">
                    <UserCheck size={20} />
                  </div>
                  <span className="action-text">Valider prestataires</span>
                </div>
                <span className="action-count">{stats.prestatairesEnAttente}</span>
              </button>
              
              <button 
                className="quick-action"
                onClick={() => {
                  // Afficher les avis signalés
                  setActiveTab('avis');
                  handleFilterChange('statut', 'signale');
                }}
              >
                <div className="action-content">
                  <div className="action-icon icon-orange">
                    <AlertTriangle size={20} />
                  </div>
                  <span className="action-text">Avis signalés</span>
                </div>
                <span className="action-count">{stats.avisSignales}</span>
              </button>
              
              <button 
                className="quick-action"
                onClick={nettoyerDonnees}
              >
                <div className="action-content">
                  <div className="action-icon icon-red">
                    <Trash2 size={20} />
                  </div>
                  <span className="action-text">Nettoyage données</span>
                </div>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="sidebar-card">
            <h3 className="sidebar-title">Activité récente</h3>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon icon-green">
                  <CheckCircle size={16} />
                </div>
                <div className="activity-content">
                  <p>Prestataire validé</p>
                  <span>Électriciens Pro • Il y a 2h</span>
                </div>
              </div>
              
              <div className="activity-item">
                <div className="activity-icon icon-orange">
                  <AlertTriangle size={16} />
                </div>
                <div className="activity-content">
                  <p>Avis signalé</p>
                  <span>Plombier Express • Il y a 4h</span>
                </div>
              </div>
              
              <div className="activity-item">
                <div className="activity-icon icon-red">
                  <Trash2 size={16} />
                </div>
                <div className="activity-content">
                  <p>Compte supprimé</p>
                  <span>Utilisateur frauduleux • Il y a 1j</span>
                </div>
              </div>
            </div>
          </div>

          {/* Export Data */}
          <div className="export-card">
            <h3 className="export-title">Export des données</h3>
            <p className="export-desc">Téléchargez les rapports d'administration</p>
            <div className="export-buttons">
              <button 
                className="export-btn"
                onClick={() => exporterDonnees('mensuel')}
              >
                <Download size={20} />
                Rapport mensuel
              </button>
              <button 
                className="export-btn"
                onClick={() => exporterDonnees('utilisateurs')}
              >
                <Download size={20} />
                Données utilisateurs
              </button>
              <button 
                className="export-btn"
                onClick={() => exporterDonnees('logs')}
              >
                <Download size={20} />
                Logs de modération
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal 
        show={showModal}
        onClose={() => setShowModal(false)}
        content={modalContent}
      />
    </div>
  );
};

export default Admin;