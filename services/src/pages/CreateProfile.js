import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/CreateProfile.css";


function CreateProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    service: "",
    ville: "",
    telephone: "",
    description: "",
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImages = (e) => {
  const files = Array.from(e.target.files);

  const imageUrls = files.map((file) =>
    URL.createObjectURL(file)
  );

  setImages(imageUrls);
};

  const handleSubmit = (e) => {
    e.preventDefault();

    const artisan = JSON.parse(localStorage.getItem("artisan"));

    const fullProfile = {
      ...artisan,
      ...profile,
    };

    localStorage.setItem("artisan", JSON.stringify(fullProfile));

    navigate("/");
  };

  return (
    <div className="profile-page">
  <div className="profile-card">

    {/* Header */}
    <div className="profile-header">
      <div className="avatar">
        <span>+</span>
      </div>
      <h2>Créer votre profil professionnel</h2>
      <p>Présentez vos services et vos réalisations</p>
    </div>

    <form onSubmit={handleSubmit} className="profile-form">

      <select name="service" onChange={handleChange} required>
        <option value="">Choisir un service</option>
        <option>Plombier</option>
        <option>Électricien</option>
        <option>Menuisier</option>
        <option>Menage</option>
        <option>Coiffeuse</option>
        <option>Climatiseur</option>
        <option>Couturier</option>
        <option>Peintre</option>
      </select>

      <input
        type="text"
        name="ville"
        placeholder="Ville"
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="telephone"
        placeholder="Téléphone"
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Décrivez votre expérience et vos services"
        onChange={handleChange}
        required
      />

      {/* Upload images */}
      <div className="upload-box">
        <label>Photos de vos réalisations</label>
        <input type="file" multiple accept="image/*" onChange={handleImages} />
      </div>

      {/* Preview images */}
      <div className="preview">
        {images.map((img, index) => (
          <img key={index} src={img} alt="work" />
        ))}
      </div>

      <button type="submit" className="btn-solid">
        Enregistrer le profil
      </button>
    </form>
  </div>
</div>

  );
}

export default CreateProfile;
