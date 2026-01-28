import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Upload, 
  X, 
  Tag, 
  DollarSign, 
  Clock, 
  MapPin,
  CheckCircle
} from "lucide-react";
import "../style/NouvellePublication.css";

function NouvellePublication() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titre: "",
    categorie: "",
    description: "",
    prix: "",
    typePrix: "fixe", 
    disponibilite: "",
    localisation: "",
    photos: []
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [uploading, setUploading] = useState(false);

  const categories = [
    "Plomberie", "Électricité", "Maçonnerie", "Peinture",
    "Menuiserie", "Jardinage", "Nettoyage", "Déménagement",
    "Réparation", "Installation", "Autre"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);
    
    // Simuler l'upload
    setTimeout(() => {
      const newPhotos = files.map(file => ({
        id: Date.now() + Math.random(),
        url: URL.createObjectURL(file),
        name: file.name
      }));
      
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...newPhotos]
      }));
      setUploading(false);
    }, 1000);
  };

  const removePhoto = (id) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter(photo => photo.id !== id)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simuler l'enregistrement
    console.log("Publication créée:", formData);
    
    navigate("/mes-publications");
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="nouvelle-publication">
      <div className="publication-header">
        <h1>Créer une nouvelle publication</h1>
        <p>Remplissez les informations pour présenter votre service</p>
      </div>

      {/* Étapes de progression */}
      <div className="progress-steps">
        <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
          <div className="step-number">1</div>
          <span>Informations de base</span>
        </div>
        <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
          <div className="step-number">2</div>
          <span>Détails et photos</span>
        </div>
        <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
          <div className="step-number">3</div>
          <span>Finalisation</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="publication-form">
        {currentStep === 1 && (
          <div className="form-step">
            <h2>Informations de base</h2>
            
            <div className="form-group">
              <label htmlFor="titre">
                <Tag size={18} />
                Titre de la publication *
              </label>
              <input
                id="titre"
                name="titre"
                type="text"
                placeholder="Ex: Rénovation complète salle de bain"
                value={formData.titre}
                onChange={handleInputChange}
                required
              />
              <small>Un titre clair et descriptif attire plus de clients</small>
            </div>

            <div className="form-group">
              <label htmlFor="categorie">Catégorie *</label>
              <select
                id="categorie"
                name="categorie"
                value={formData.categorie}
                onChange={handleInputChange}
                required
              >
                <option value="">Sélectionnez une catégorie</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description détaillée *</label>
              <textarea
                id="description"
                name="description"
                rows="6"
                placeholder="Décrivez votre service en détail, vos compétences, les matériaux utilisés..."
                value={formData.description}
                onChange={handleInputChange}
                required
              />
              <small>Minimum 100 caractères, maximum 2000 caractères</small>
            </div>

            <div className="form-actions">
              <button type="button" onClick={nextStep} className="btn-next">
                Suivant
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="form-step">
            <h2>Détails et photos</h2>
            
            <div className="form-group">
              <label>
                <DollarSign size={18} />
                Tarification
              </label>
              <div className="price-options">
                <label className="price-option">
                  <input
                    type="radio"
                    name="typePrix"
                    value="fixe"
                    checked={formData.typePrix === "fixe"}
                    onChange={handleInputChange}
                  />
                  <span>Prix fixe</span>
                </label>
                <label className="price-option">
                  <input
                    type="radio"
                    name="typePrix"
                    value="horaire"
                    checked={formData.typePrix === "horaire"}
                    onChange={handleInputChange}
                  />
                  <span>Tarif horaire</span>
                </label>
              </div>
              
              <div className="price-input">
                <input
                  type="number"
                  name="prix"
                  placeholder={formData.typePrix === "fixe" ? "Ex: 500" : "Ex: 30"}
                  value={formData.prix}
                  onChange={handleInputChange}
                  required
                />
                <span className="currency">
                  {formData.typePrix === "fixe" ? "€" : "€/heure"}
                </span>
              </div>
            </div>

            <div className="form-group">
              <label>
                <Clock size={18} />
                Disponibilité
              </label>
              <select
                name="disponibilite"
                value={formData.disponibilite}
                onChange={handleInputChange}
              >
                <option value="">Sélectionnez votre disponibilité</option>
                <option value="Immédiate">Immédiate</option>
                <option value="Sous 48h">Sous 48h</option>
                <option value="Sous 1 semaine">Sous 1 semaine</option>
                <option value="Sur rendez-vous">Sur rendez-vous</option>
              </select>
            </div>

            <div className="form-group">
              <label>
                <MapPin size={18} />
                Zone d'intervention
              </label>
              <input
                type="text"
                name="localisation"
                placeholder="Ex: fes"
                value={formData.localisation}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Photos de vos réalisations</label>
              <div className="photos-upload">
                <label className="upload-area">
                  <Upload size={24} />
                  <span>Cliquez pour ajouter des photos</span>
                  <span className="upload-subtitle">JPG, PNG, max 5MB par image</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    style={{ display: 'none' }}
                  />
                </label>
                
                {uploading && (
                  <div className="uploading">Upload en cours...</div>
                )}
                
                {formData.photos.length > 0 && (
                  <div className="photos-preview">
                    {formData.photos.map(photo => (
                      <div key={photo.id} className="photo-preview">
                        <img src={photo.url} alt={photo.name} />
                        <button 
                          type="button"
                          className="remove-photo"
                          onClick={() => removePhoto(photo.id)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <small>Ajoutez jusqu'à 10 photos. La première photo sera la photo principale.</small>
            </div>

            <div className="form-actions">
              <button type="button" onClick={prevStep} className="btn-prev">
                Précédent
              </button>
              <button type="button" onClick={nextStep} className="btn-next">
                Suivant
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="form-step">
            <h2>Finalisation</h2>
            
            <div className="review-section">
              <h3>Résumé de votre publication</h3>
              
              <div className="review-card">
                <div className="review-item">
                  <strong>Titre:</strong>
                  <span>{formData.titre || "Non spécifié"}</span>
                </div>
                <div className="review-item">
                  <strong>Catégorie:</strong>
                  <span>{formData.categorie || "Non spécifié"}</span>
                </div>
                <div className="review-item">
                  <strong>Description:</strong>
                  <span className="description-review">
                    {formData.description ? 
                      (formData.description.length > 150 ? 
                        formData.description.substring(0, 150) + "..." : 
                        formData.description) 
                      : "Non spécifiée"}
                  </span>
                </div>
                <div className="review-item">
                  <strong>Prix:</strong>
                  <span>
                    {formData.prix} 
                    {formData.prix && formData.typePrix === "fixe" ? "€" : ""}
                    {formData.prix && formData.typePrix === "horaire" ? "€/heure" : ""}
                  </span>
                </div>
                <div className="review-item">
                  <strong>Disponibilité:</strong>
                  <span>{formData.disponibilite || "Non spécifiée"}</span>
                </div>
                <div className="review-item">
                  <strong>Zone d'intervention:</strong>
                  <span>{formData.localisation || "Non spécifiée"}</span>
                </div>
                <div className="review-item">
                  <strong>Photos:</strong>
                  <span>{formData.photos.length} photo(s)</span>
                </div>
              </div>
            </div>

            <div className="visibility-options">
              <h3>Visibilité de la publication</h3>
              <div className="visibility-option">
                <input 
                  type="radio" 
                  id="public" 
                  name="visibility" 
                  defaultChecked 
                />
                <label htmlFor="public">
                  <CheckCircle size={18} />
                  <div>
                    <strong>Publique</strong>
                    <small>Visible par tous les utilisateurs</small>
                  </div>
                </label>
              </div>
              <div className="visibility-option">
                <input type="radio" id="private" name="visibility" />
                <label htmlFor="private">
                  <CheckCircle size={18} />
                  <div>
                    <strong>Privée</strong>
                    <small>Visible uniquement sur votre profil</small>
                  </div>
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={prevStep} className="btn-prev">
                Précédent
              </button>
              <button type="submit" className="btn-submit">
                <CheckCircle size={20} />
                Publier maintenant
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default NouvellePublication;