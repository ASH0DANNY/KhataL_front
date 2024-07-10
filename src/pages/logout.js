// src/pages/LogoutPage.js

import React from 'react';
import { Button } from '@mui/material';


const LogoutPage = () => {

  const handleLogout = () => {
    // Perform logout logic (e.g., clear local storage, API call)
    logout();
  };

  return (
    <div>
      <h1>Logout Page</h1>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default LogoutPage;
