import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/Dashboard.css';
import { useAuth } from '../pages/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalArtisans: 0,
    totalProducts: 0,
    totalOrders: 0,
    recentOrders: [],
    recentUsers: []
  });
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Données mockées pour l'exemple
  const mockStats = {
    totalUsers: 1245,
    totalArtisans: 342,
    totalProducts: 2897,
    totalOrders: 567,
    recentOrders: [
      { id: 1, customer: 'Mohamed Ali', amount: 450, status: 'completed', date: '2024-01-15' },
      { id: 2, customer: 'Fatima Zahra', amount: 320, status: 'pending', date: '2024-01-15' },
      { id: 3, customer: 'Ahmed Said', amount: 189, status: 'shipped', date: '2024-01-14' },
      { id: 4, customer: 'Amina Bouchra', amount: 620, status: 'completed', date: '2024-01-14' },
      { id: 5, customer: 'Youssef Hamid', amount: 275, status: 'cancelled', date: '2024-01-13' },
    ],
    recentUsers: [
      { id: 1, name: 'Karim Benz', email: 'karim@example.com', type: 'artisan', joined: '2024-01-15' },
      { id: 2, name: 'Laila Mourad', email: 'laila@example.com', type: 'client', joined: '2024-01-15' },
      { id: 3, name: 'Samir Crafts', email: 'samir@example.com', type: 'artisan', joined: '2024-01-14' },
      { id: 4, name: 'Nadia Art', email: 'nadia@example.com', type: 'artisan', joined: '2024-01-13' },
      { id: 5, name: 'Omar Design', email: 'omar@example.com', type: 'client', joined: '2024-01-12' },
    ],
    monthlyGrowth: {
      users: '+12%',
      artisans: '+8%',
      sales: '+24%',
      products: '+15%'
    }
  };

  useEffect(() => {
    //  appel API
    setTimeout(() => {
      setStats(mockStats);
      setLoading(false);
    }, 1000);
  }, [selectedPeriod]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'status-completed';
      case 'pending': return 'status-pending';
      case 'shipped': return 'status-shipped';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-default';
    }
  };

  const getTypeBadge = (type) => {
    return type === 'artisan' ? 'badge-artisan' : 'badge-client';
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Chargement du tableau de bord...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Tableau de bord</h1>
          <p className="dashboard-subtitle">Bon retour, {user?.name || 'Admin'} ! </p>
        </div>
        
        <div className="dashboard-period">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="period-select"
          >
            <option value="today">Aujourd'hui</option>
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="year">Cette année</option>
          </select>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="stats-grid">
        <div className="stat-card stat-users">
          <div className="stat-icon">
            <span>👥</span>
          </div>
          <div className="stat-content">
            <h3>{stats.totalUsers.toLocaleString()}</h3>
            <p>Utilisateurs totaux</p>
            <span className="growth positive">{stats.monthlyGrowth.users}</span>
          </div>
        </div>

        <div className="stat-card stat-artisans">
          
          <div className="stat-content">
            <h3>{stats.totalArtisans.toLocaleString()}</h3>
            <p>Artisans inscrits</p>
            <span className="growth positive">{stats.monthlyGrowth.artisans}</span>
          </div>
        </div>

        <div className="stat-card stat-products">
          
          <div className="stat-content">
            <h3>{stats.totalProducts.toLocaleString()}</h3>
            <p>Produits listés</p>
            <span className="growth positive">{stats.monthlyGrowth.products}</span>
          </div>
        </div>

        <div className="stat-card stat-orders">
          
          <div className="stat-content">
            <h3>{stats.totalOrders.toLocaleString()}</h3>
            <p>Commandes totales</p>
            <span className="growth positive">{stats.monthlyGrowth.sales}</span>
          </div>
        </div>
      </div>

      {/* Grille principale */}
      <div className="dashboard-grid">
        {/* Commandes récentes */}
        <div className="dashboard-card recent-orders">
          <div className="card-header">
            <h2>Commandes récentes</h2>
            <Link to="/admin/orders" className="view-all">Voir tout →</Link>
          </div>
          
          <div className="table-responsive">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>ID Commande</th>
                  <th>Client</th>
                  <th>Montant</th>
                  <th>Statut</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map(order => (
                  <tr key={order.id}>
                    <td>#CMD-{order.id.toString().padStart(4, '0')}</td>
                    <td>{order.customer}</td>
                    <td>{order.amount} DH</td>
                    <td>
                      <span className={`status-badge ${getStatusColor(order.status)}`}>
                        {order.status === 'completed' ? 'Complété' : 
                         order.status === 'pending' ? 'En attente' :
                         order.status === 'shipped' ? 'Expédié' : 'Annulé'}
                      </span>
                    </td>
                    <td>{formatDate(order.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Nouveaux utilisateurs */}
        <div className="dashboard-card recent-users">
          <div className="card-header">
            <h2>Nouveaux utilisateurs</h2>
            <Link to="/admin/users" className="view-all">Voir tout →</Link>
          </div>
          
          <div className="users-list">
            {stats.recentUsers.map(user => (
              <div key={user.id} className="user-item">
                <div className="user-avatar">
                  {user.name.charAt(0)}
                </div>
                <div className="user-info">
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                </div>
                <div className="user-meta">
                  <span className={`user-type ${getTypeBadge(user.type)}`}>
                    {user.type === 'artisan' ? 'Artisan' : 'Client'}
                  </span>
                  <span className="join-date">{formatDate(user.joined)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions rapides */}
        <div className="dashboard-card quick-actions">
          <div className="card-header">
            <h2>Actions rapides</h2>
          </div>
          
          <div className="actions-grid">
            <Link to="/admin/users/new" className="action-card">
              <div className="action-icon add-user">👤</div>
              <h3>Ajouter un utilisateur</h3>
              <p>Créer un nouveau compte utilisateur</p>
            </Link>
            
            <Link to="/admin/products/new" className="action-card">
              <div className="action-icon add-product"></div>
              <h3>Ajouter un produit</h3>
              <p>Ajouter un nouveau produit au catalogue</p>
            </Link>
            
            <Link to="/admin/artisans/verify" className="action-card">
              <div className="action-icon verify"></div>
              <h3>Vérifier artisans</h3>
              <p>Vérifier les nouvelles inscriptions artisans</p>
            </Link>
            
            <Link to="/admin/settings" className="action-card">
              <div className="action-icon settings"></div>
              <h3>Paramètres</h3>
              <p>Gérer les paramètres du site</p>
            </Link>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="dashboard-card quick-stats">
          <div className="card-header">
            <h2>Statistiques rapides</h2>
          </div>
          
          <div className="stats-list">
            <div className="stat-item">
              <div className="stat-label">Taux de conversion</div>
              <div className="stat-value">3.2%</div>
              <div className="stat-progress">
                <div className="progress-bar" style={{ width: '65%' }}></div>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-label">Panier moyen</div>
              <div className="stat-value">285 DH</div>
              <div className="stat-progress">
                <div className="progress-bar" style={{ width: '80%' }}></div>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-label">Satisfaction clients</div>
              <div className="stat-value">4.7/5</div>
              <div className="stat-progress">
                <div className="progress-bar" style={{ width: '94%' }}></div>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-label">Commandes en attente</div>
              <div className="stat-value">12</div>
              <div className="stat-progress">
                <div className="progress-bar" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;