export const publicationsStorage = {
  // Récupérer toutes les publications
  getAllPublications: () => {
    try {
      const publications = JSON.parse(localStorage.getItem('artisanPublications')) || [];
      return publications;
    } catch (error) {
      console.error('Erreur lors du chargement des publications:', error);
      return [];
    }
  },

  // Ajouter une nouvelle publication
  addPublication: (publication) => {
    try {
      const publications = JSON.parse(localStorage.getItem('artisanPublications')) || [];
      const newPublication = {
        ...publication,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: 0,
        shares: 0,
        views: 0,
        status: 'active'
      };
      
      publications.unshift(newPublication); // Ajouter au début
      localStorage.setItem('artisanPublications', JSON.stringify(publications));
      return newPublication;
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la publication:', error);
      return null;
    }
  },

  // Mettre à jour une publication
  updatePublication: (id, updates) => {
    try {
      const publications = JSON.parse(localStorage.getItem('artisanPublications')) || [];
      const updatedPublications = publications.map(pub => 
        pub.id === id ? { ...pub, ...updates, updatedAt: new Date().toISOString() } : pub
      );
      localStorage.setItem('artisanPublications', JSON.stringify(updatedPublications));
      return true;
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      return false;
    }
  },

  // Supprimer une publication
  deletePublication: (id) => {
    try {
      const publications = JSON.parse(localStorage.getItem('artisanPublications')) || [];
      const filteredPublications = publications.filter(pub => pub.id !== id);
      localStorage.setItem('artisanPublications', JSON.stringify(filteredPublications));
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      return false;
    }
  },

  // Récupérer les publications d'un artisan spécifique
  getPublicationsByArtisanId: (artisanId) => {
    try {
      const publications = JSON.parse(localStorage.getItem('artisanPublications')) || [];
      return publications.filter(pub => pub.artisanId === artisanId && pub.status === 'active');
    } catch (error) {
      console.error('Erreur:', error);
      return [];
    }
  },

  // Ajouter un commentaire
  addComment: (publicationId, comment) => {
    try {
      const publications = JSON.parse(localStorage.getItem('artisanPublications')) || [];
      const publicationIndex = publications.findIndex(pub => pub.id === publicationId);
      
      if (publicationIndex !== -1) {
        const updatedPublication = { 
          ...publications[publicationIndex], 
          comments: (publications[publicationIndex].comments || 0) + 1 
        };
        
        publications[publicationIndex] = updatedPublication;
        localStorage.setItem('artisanPublications', JSON.stringify(publications));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erreur:', error);
      return false;
    }
  },

  // Ajouter un like
  addLike: (publicationId) => {
    try {
      const publications = JSON.parse(localStorage.getItem('artisanPublications')) || [];
      const publicationIndex = publications.findIndex(pub => pub.id === publicationId);
      
      if (publicationIndex !== -1) {
        const updatedPublication = { 
          ...publications[publicationIndex], 
          likes: (publications[publicationIndex].likes || 0) + 1 
        };
        
        publications[publicationIndex] = updatedPublication;
        localStorage.setItem('artisanPublications', JSON.stringify(publications));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erreur:', error);
      return false;
    }
  }
};