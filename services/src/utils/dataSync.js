export const syncData = () => {
  // Synchroniser les artisans
  const artisans = JSON.parse(localStorage.getItem('artisans')) || [];
  const prestataires = JSON.parse(localStorage.getItem('prestataires')) || [];
  
  if (artisans.length === 0 && prestataires.length > 0) {
    localStorage.setItem('artisans', JSON.stringify(prestataires));
  }
  
  // Synchroniser les publications
  const publications = JSON.parse(localStorage.getItem('artisanPublications')) || [];
  
  // Ajouter les publications de démonstration si aucune n'existe
  if (publications.length === 0) {
    const demoPublications = [
      {
        id: '1',
        artisanId: '1',
        artisanName: 'Jean Dupont',
        title: 'Rénovation Salle de Bain',
        description: 'Rénovation complète avec carrelage italien',
        category: 'Plomberie',
        price: '1200',
        photos: [],
        likes: 24,
        comments: 5,
        createdAt: '2024-01-15T10:30:00Z'
      }
    ];
    localStorage.setItem('artisanPublications', JSON.stringify(demoPublications));
  }
};