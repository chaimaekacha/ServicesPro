import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  Briefcase,
  Home
} from 'lucide-react';
import '../style/Login.css';

function Login() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('client');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
  
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Créer un objet utilisateur selon le type
      const userData = {
        id: Date.now(),
        email: formData.email,
        type: userType,
        nom: userType === 'artisan' ? 'Artisan' : 'Client',
        prenom: userType === 'artisan' ? 'Test' : 'Test',
        createdAt: new Date().toISOString()
      };

      // Stocker dans localStorage
      localStorage.setItem(userType, JSON.stringify(userData));
      
      // Rediriger selon le type d'utilisateur
      if (userType === 'artisan') {
        navigate('/dashboard-artisan');
      } else {
        navigate('/mon-profil-client');
      }
      
    } catch (err) {
      setError('Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          {/* Header */}
          <div className="login-header">
            <div className="logo-section">
              <Home size={32} color="# #e0b62c" />
              <h1>ServicesPro</h1>
            </div>
            <p>Connectez-vous à votre compte</p>
          </div>

          {/* Sélecteur de type d'utilisateur */}
          <div className="user-type-selector">
            <button
              type="button"
              className={`user-type-btn ${userType === 'client' ? 'active' : ''}`}
              onClick={() => setUserType('client')}
            >
              <User size={20} />
              <span>Client</span>
              <small>Rechercher des services</small>
            </button>
            <button
              type="button"
              className={`user-type-btn ${userType === 'artisan' ? 'active' : ''}`}
              onClick={() => setUserType('artisan')}
            >
              <Briefcase size={20} />
              <span>Artisan</span>
              <small>Proposer des services</small>
            </button>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="error-message">
                 {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">
                <Mail size={18} />
                Adresse email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <Lock size={18} />
                Mot de passe
              </label>
              <div className="password-input">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Votre mot de passe"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={togglePasswordVisibility}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  disabled={loading}
                />
                <span>Se souvenir de moi</span>
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Mot de passe oublié ?
              </Link>
            </div>

            <button 
              type="submit" 
              className="btn-login"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Connexion en cours...
                </>
              ) : (
                <>
                  Se connecter
                  <span className="user-type-indicator">
                    {userType === 'artisan' ? 'Artisan' : 'Client'}
                  </span>
                </>
              )}
            </button>

            <div className="divider">
              <span>ou</span>
            </div>

            <div className="social-login">
              <button type="button" className="social-btn google">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continuer avec Google
              </button>
              <button type="button" className="social-btn facebook">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Continuer avec Facebook
              </button>
            </div>

            <div className="register-link">
              <p>
                Pas encore de compte ? 
                <Link to="/register"> Créer un compte</Link>
              </p>
            </div>
          </form>
        </div>

        <div className="login-info">
          <div className="info-card client-info">
            <User size={40} />
            <h3>Pour les clients</h3>
            <ul>
              <li> Trouvez des artisans qualifiés</li>
              <li> Comparez les devis</li>
              <li> Réservez en ligne</li>
              <li> Gestion des rendez-vous</li>
            </ul>
          </div>
          <div className="info-card artisan-info">
            <Briefcase size={40} />
            <h3>Pour les artisans</h3>
            <ul>
              <li>Présentez vos services</li>
              <li>Gérez votre agenda</li>
              <li>Recevez des avis</li>
              <li> Développez votre activité</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;