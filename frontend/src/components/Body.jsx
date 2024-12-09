import React from 'react';
import { Outlet } from 'react-router';
import Footer from './Footer';
import NavBar from './NavBar';
import { useCurrentUser } from '../hooks';

const Body = () => {
  useCurrentUser();
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
