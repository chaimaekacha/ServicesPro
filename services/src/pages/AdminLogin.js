import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User, Eye, EyeOff } from 'lucide-react';
import '../style/AdminLogin.css'; 
import Admin from "../pages/Admin";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //admin
  const adminCredentials = {
    email: 'admin@artisanat.com',
    password: 'Admin2024!'
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Vérification des identifiants
    if (credentials.email === adminCredentials.email && 
        credentials.password === adminCredentials.password) {
      
      // Créer la session admin
      const adminSession = {
        id: 1,
        email: credentials.email,
        name: 'Administrateur Principal',
        role: 'super_admin',
        token: 'admin-token-' + Date.now(),
        expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000) // 8 heures
      };

      localStorage.setItem('admin_session', JSON.stringify(adminSession));
      
      navigate('/admin/dashboard');
    } else {
      setError('Identifiants administrateur incorrects');
    }
    
    setLoading(false);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-header">
          <div className="admin-login-icon">
            <Shield size={48} />
          </div>
          <h1>Espace Administrateur</h1>
          <p>Plateforme Artisanat - Gestion</p>
        </div>

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label htmlFor="email">
              <User size={18} />
              Email Administrateur
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="admin@artisanat.com"
              required
              autoComplete="username"
              className="admin-input"
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="password">
              <Lock size={18} />
              Mot de passe
            </label>
            <div className="admin-password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="......."
                required
                autoComplete="current-password"
                className="admin-input"
              />
              <button
                type="button"
                className="admin-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="admin-error-message">
               {error}
            </div>
          )}

          <button
            type="submit"
            className="admin-login-btn"
            disabled={loading || !credentials.email || !credentials.password}
          >
            {loading ? 'Connexion en cours...' : 'Accéder au Dashboard'}
          </button>

          <div className="admin-login-info">
            <p className="admin-credentials-info">
              <strong>Pour tester :</strong><br />
              Email: <code>admin@artisanat.com</code><br />
              Mot de passe: <code>Admin2024!</code>
            </p>
            <p className="admin-security-warning">
               Cet espace est réservé aux administrateurs autorisés.
            </p>
          </div>
        </form>

        <div className="admin-login-footer">
          <button 
            className="admin-back-to-site"
            onClick={() => navigate('/')}
          >
            ← Retour au site principal
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;