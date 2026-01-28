import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminHeader />
      <main className="admin-main">
        <div className="admin-container">
          <Outlet /> 
        </div>
      </main>
      <footer className="admin-footer">
        <p>© {new Date().getFullYear()} Admin Panel</p>
      </footer>
    </div>
  );
};

export default AdminLayout;