import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  Upload, 
  X, 
  Tag, 
  DollarSign, 
  Clock, 
  MapPin,
  Save,
  ArrowLeft
} from "lucide-react";
import "../style/ModifierPublication.css";

function ModifierPublication() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titre: "",
    categorie: "",
    description: "",
    prix: "",
    typePrix: "fixe",
    disponibilite: "",
    localisation: "",
    photos: [],
    statut: "Actif"
  });

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const categories = [
    "Plomberie", "Électricité", "Maçonnerie", "Peinture",
    "Menuiserie", "Jardinage", "Nettoyage", "Déménagement",
    "Réparation", "Installation", "Autre"
  ];

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      // Données fictives pour la démonstration
      const mockData = {
        id: parseInt(id),
        titre: "Rénovation Salle de Bain",
        categorie: "Plomberie",
        description: "Rénovation complète de salle de bain avec pose de carrelage, installation sanitaire et électricité. Travail soigné et garantie.",
        prix: "500",
        typePrix: "fixe",
        disponibilite: "Immédiate",
        localisation: "Paris et banlieue",
        photos: [
          { id: 1, url: "https://via.placeholder.com/300x200/3b82f6/ffffff?text=Salle+Bain+1", name: "salle-bain-1.jpg" },
          { id: 2, url: "https://via.placeholder.com/300x200/10b981/ffffff?text=Salle+Bain+2", name: "salle-bain-2.jpg" }
        ],
        statut: "Actif"
      };
      
      setFormData(mockData);
      setLoading(false);
    }, 500);
  }, [id]);

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

  const removePhoto = (photoId) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter(photo => photo.id !== photoId)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Publication modifiée:", formData);
    
    // Simuler la sauvegarde
    alert("Publication modifiée avec succès !");
    navigate("/mes-publications");
  };

  const handleCancel = () => {
    if (window.confirm("Voulez-vous annuler les modifications ?")) {
      navigate("/mes-publications");
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Chargement de la publication...</p>
      </div>
    );
  }

  return (
    <div className="modifier-publication">
      <div className="publication-header">
        <button 
          className="btn-back"
          onClick={() => navigate("/mes-publications")}
        >
          <ArrowLeft size={20} />
          Retour
        </button>
        <h1>Modifier la publication</h1>
        <p>ID: {id}</p>
      </div>

      <form onSubmit={handleSubmit} className="publication-form">
        <div className="form-section">
          <h2>Informations principales</h2>
          
          <div className="form-group">
            <label htmlFor="titre">
              <Tag size={18} />
              Titre de la publication *
            </label>
            <input
              id="titre"
              name="titre"
              type="text"
              value={formData.titre}
              onChange={handleInputChange}
              required
            />
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
            <label htmlFor="statut">Statut</label>
            <select
              id="statut"
              name="statut"
              value={formData.statut}
              onChange={handleInputChange}
            >
              <option value="Actif">Actif</option>
              <option value="En attente">En attente</option>
              <option value="Inactif">Inactif</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description détaillée *</label>
            <textarea
              id="description"
              name="description"
              rows="8"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
            <div className="char-count">
              {formData.description.length} / 2000 caractères
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Tarification et disponibilité</h2>
          
          <div className="form-group">
            <label>
              <DollarSign size={18} />
              Type de tarification
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
        </div>

        <div className="form-section">
          <h2>Photos</h2>
          
          <div className="form-group">
            <label>Photos actuelles</label>
            {formData.photos.length > 0 ? (
              <div className="current-photos">
                {formData.photos.map(photo => (
                  <div key={photo.id} className="photo-item">
                    <img src={photo.url} alt={photo.name} />
                    <div className="photo-info">
                      <span>{photo.name}</span>
                      <button 
                        type="button"
                        className="btn-remove"
                        onClick={() => removePhoto(photo.id)}
                      >
                        <X size={16} />
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-photos">Aucune photo</p>
            )}
          </div>

          <div className="form-group">
            <label>Ajouter de nouvelles photos</label>
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
            </div>
            <small>Vous pouvez ajouter jusqu'à 10 photos au total</small>
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="btn-cancel"
            onClick={handleCancel}
          >
            Annuler
          </button>
          <button type="submit" className="btn-save">
            <Save size={20} />
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModifierPublication; 