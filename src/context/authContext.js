// // src/context/AuthContext.js

// import React, { createContext, useState } from 'react';

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const login = () => {
//     // Perform your authentication logic here (e.g., validate credentials, set session)
//     setIsLoggedIn(true);
//   };

//   const logout = () => {
//     // Perform logout logic (e.g., clear session, remove tokens)
//     setIsLoggedIn(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthContext, AuthProvider };
