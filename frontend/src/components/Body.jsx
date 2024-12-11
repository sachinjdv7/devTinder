import React from 'react';
import { Outlet } from 'react-router';
import Footer from './Footer';
import NavBar from './NavBar';
import { useCurrentUser } from '../hooks';

const Body = () => {
  useCurrentUser();
  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      {/* Navbar */}
      <NavBar />

      {/* Main Content */}
      <div className="flex-grow">
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Body;
