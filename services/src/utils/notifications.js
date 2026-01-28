
export const notifyArtisan = (reservation) => {
  const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
  
  const notification = {
    id: Date.now().toString(),
    type: "reservation",
    title: "Nouvelle réservation",
    message: `${reservation.clientName} a réservé "${reservation.publicationTitle}"`,
    data: reservation,
    read: false,
    createdAt: new Date().toISOString(),
    artisanId: reservation.artisanId
  };
  
  notifications.push(notification);
  localStorage.setItem('notifications', JSON.stringify(notifications));
};

export const getArtisanNotifications = (artisanId) => {
  const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
  return notifications.filter(notif => notif.artisanId === artisanId);
};