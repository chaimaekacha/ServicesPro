import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Lock, 
  Phone,
  MapPin,
  Eye, 
  EyeOff,
  Briefcase,
  Home,
  Check,
  AlertCircle
} from 'lucide-react';
import '../style/Register.css';

function Register() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('client');
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Données du formulaire
  const [formData, setFormData] = useState({
    // Informations personnelles
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    password: '',
    confirmPassword: '',
    
    // Informations spécifiques client
    adresse: '',
    ville: '',
    
    // Informations spécifiques artisan
    metier: '',
    specialite: '',
    experience: '',
    description: '',
    
    // Conditions
    acceptTerms: false,
    newsletter: true
  });

  // Métiers disponibles pour artisans
  const metiers = [
    "Plombier", "Électricien", "Menuisier", "Peintre",
    "Maçon", "Jardinier", "Nettoyeur", "Déménageur",
    "Carreleur", "Couvreur", "Chauffagiste", "Autre"
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis';
    if (!formData.prenom.trim()) newErrors.prenom = 'Le prénom est requis';
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Minimum 6 caractères';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.telephone.trim()) {
      newErrors.telephone = 'Le téléphone est requis';
    } else if (!/^[0-9]{10}$/.test(formData.telephone.replace(/\s/g, ''))) {
      newErrors.telephone = 'Numéro invalide (10 chiffres)';
    }
    
    if (userType === 'client') {
      if (!formData.adresse.trim()) newErrors.adresse = 'L\'adresse est requise';
      if (!formData.ville.trim()) newErrors.ville = 'La ville est requise';
    } else {
      if (!formData.metier) newErrors.metier = 'Le métier est requis';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      handleSubmit();
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      // Simulation de l'inscription
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Créer l'objet utilisateur
      const userData = {
        id: Date.now(),
        ...formData,
        type: userType,
        createdAt: new Date().toISOString(),
        isActive: true,
        avatar: `https://ui-avatars.com/api/?name=${formData.prenom}+${formData.nom}&background=3b82f6&color=fff`
      };
      
      // Stocker dans localStorage
      localStorage.setItem(userType, JSON.stringify(userData));
      
      // Rediriger selon le type d'utilisateur
      if (userType === 'artisan') {
        navigate('/dashboard-artisan');
      } else {
        navigate('/mon-profil-client');
      }
      
    } catch (error) {
      setErrors({ submit: 'Erreur lors de l\'inscription. Veuillez réessayer.' });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-card">
          {/* Header */}
          <div className="register-header">
            <div className="logo-section">
              <Home size={32} color="#facc15" />
              <h1>Rejoignez ServicesPro</h1>
            </div>
            <p>Créez votre compte en quelques étapes</p>
          </div>

          {/* Étapes */}
          <div className="progress-steps">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>
              <div className="step-number">1</div>
              <span>Informations de base</span>
            </div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>
              <div className="step-number">2</div>
              <span>Informations {userType === 'artisan' ? 'professionnelles' : 'personnelles'}</span>
            </div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>
              <div className="step-number">3</div>
              <span>Confirmation</span>
            </div>
          </div>

          {/* Sélecteur de type d'utilisateur */}
          {step === 1 && (
            <div className="user-type-selector">
              <button
                type="button"
                className={`user-type-btn ${userType === 'client' ? 'active' : ''}`}
                onClick={() => setUserType('client')}
              >
                <User size={24} />
                <div className="type-info">
                  <h4>Client</h4>
                  <p>Je cherche des services</p>
                  <ul>
                    <li> Trouver des artisans</li>
                    <li> Réserver en ligne</li>
                    <li>Gérer mes projets</li>
                  </ul>
                </div>
              </button>
              <button
                type="button"
                className={`user-type-btn ${userType === 'artisan' ? 'active' : ''}`}
                onClick={() => setUserType('artisan')}
              >
                <Briefcase size={24} />
                <div className="type-info">
                  <h4>Artisan</h4>
                  <p>Je propose des services</p>
                  <ul>
                    <li> Publier mes services</li>
                    <li> Gérer mon agenda</li>
                    <li> Développer mon activité</li>
                  </ul>
                </div>
              </button>
            </div>
          )}

          {errors.submit && (
            <div className="error-message">
              <AlertCircle size={20} />
              {errors.submit}
            </div>
          )}

          <form className="register-form">
            {/* Étape 1: Informations de base */}
            {step === 1 && (
              <div className="form-step">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="prenom">
                      <User size={18} />
                      Prénom *
                    </label>
                    <input
                      id="prenom"
                      name="prenom"
                      type="text"
                      placeholder="Votre prénom"
                      value={formData.prenom}
                      onChange={handleInputChange}
                      className={errors.prenom ? 'error' : ''}
                    />
                    {errors.prenom && <span className="error-text">{errors.prenom}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="nom">
                      <User size={18} />
                      Nom *
                    </label>
                    <input
                      id="nom"
                      name="nom"
                      type="text"
                      placeholder="Votre nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      className={errors.nom ? 'error' : ''}
                    />
                    {errors.nom && <span className="error-text">{errors.nom}</span>}
                  </div>
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
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="password">
                      <Lock size={18} />
                      Mot de passe *
                    </label>
                    <div className="password-input">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Minimum 6 caractères"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={errors.password ? 'error' : ''}
                      />
                      <button
                        type="button"
                        className="toggle-password"
                        onClick={() => togglePasswordVisibility('password')}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.password && <span className="error-text">{errors.password}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword">
                      <Lock size={18} />
                      Confirmer le mot de passe *
                    </label>
                    <div className="password-input">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Retapez votre mot de passe"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={errors.confirmPassword ? 'error' : ''}
                      />
                      <button
                        type="button"
                        className="toggle-password"
                        onClick={() => togglePasswordVisibility('confirm')}
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                  </div>
                </div>

                <div className="password-strength">
                  <div className={`strength-bar ${formData.password.length >= 6 ? 'strong' : 'weak'}`}>
                    <div className="bar-fill" style={{ width: `${Math.min(100, (formData.password.length / 6) * 100)}%` }}></div>
                  </div>
                  <span>Force du mot de passe</span>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="btn-next"
                    disabled={loading}
                  >
                    Suivant
                  </button>
                </div>
              </div>
            )}

            {/* Étape 2: Informations complémentaires */}
            {step === 2 && (
              <div className="form-step">
                <div className="form-group">
                  <label htmlFor="telephone">
                    <Phone size={18} />
                    Téléphone *
                  </label>
                  <input
                    id="telephone"
                    name="telephone"
                    type="tel"
                    placeholder="06 12 34 56 78"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    className={errors.telephone ? 'error' : ''}
                  />
                  {errors.telephone && <span className="error-text">{errors.telephone}</span>}
                </div>

                {userType === 'client' ? (
                  <>
                    <div className="form-group">
                      <label htmlFor="adresse">
                        <MapPin size={18} />
                        Adresse *
                      </label>
                      <input
                        id="adresse"
                        name="adresse"
                        type="text"
                        placeholder="Votre adresse"
                        value={formData.adresse}
                        onChange={handleInputChange}
                        className={errors.adresse ? 'error' : ''}
                      />
                      {errors.adresse && <span className="error-text">{errors.adresse}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="ville">
                        <MapPin size={18} />
                        Ville *
                      </label>
                      <input
                        id="ville"
                        name="ville"
                        type="text"
                        placeholder="Votre ville"
                        value={formData.ville}
                        onChange={handleInputChange}
                        className={errors.ville ? 'error' : ''}
                      />
                      {errors.ville && <span className="error-text">{errors.ville}</span>}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="form-group">
                      <label htmlFor="metier">
                        <Briefcase size={18} />
                        Métier principal *
                      </label>
                      <select
                        id="metier"
                        name="metier"
                        value={formData.metier}
                        onChange={handleInputChange}
                        className={errors.metier ? 'error' : ''}
                      >
                        <option value="">Sélectionnez votre métier</option>
                        {metiers.map(metier => (
                          <option key={metier} value={metier}>{metier}</option>
                        ))}
                      </select>
                      {errors.metier && <span className="error-text">{errors.metier}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="specialite">Spécialité</label>
                      <input
                        id="specialite"
                        name="specialite"
                        type="text"
                        placeholder="Votre spécialité (ex: Rénovation)"
                        value={formData.specialite}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="experience">Années d'expérience</label>
                      <select
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                      >
                        <option value="">Sélectionnez</option>
                        <option value="0-2">0-2 ans</option>
                        <option value="2-5">2-5 ans</option>
                        <option value="5-10">5-10 ans</option>
                        <option value="10+">Plus de 10 ans</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="description">Description (optionnel)</label>
                      <textarea
                        id="description"
                        name="description"
                        placeholder="Décrivez brièvement votre activité..."
                        rows="3"
                        value={formData.description}
                        onChange={handleInputChange}
                      />
                    </div>
                  </>
                )}

                <div className="form-options">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleInputChange}
                    />
                    <span>Je souhaite recevoir les offres et actualités</span>
                  </label>
                  <label className="checkbox-label required">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleInputChange}
                      required
                    />
                    <span>
                      J'accepte les <Link to="/conditions">conditions d'utilisation</Link> et la <Link to="/confidentialite">politique de confidentialité</Link> *
                    </span>
                  </label>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="btn-prev"
                    disabled={loading}
                  >
                    Précédent
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="btn-next"
                    disabled={loading || !formData.acceptTerms}
                  >
                    {loading ? (
                      <>
                        <div className="spinner"></div>
                        Inscription...
                      </>
                    ) : (
                      'Créer mon compte'
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>

          <div className="login-link">
            <p>
              Déjà un compte ? 
              <Link to="/login"> Se connecter</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;