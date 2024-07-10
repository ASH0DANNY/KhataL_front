// // src/components/PrivateRoute.js

// import React, { useContext } from "react";
// import { Navigate, Route } from "react-router-dom";
// import { AuthContext } from "./context/authContext";
// import LoginPage from "./pages/loginPage";

// const PrivateRoute = ({ component, path }) => {
//   const { isLoggedIn } = useContext(AuthContext);

//   return isLoggedIn ? (
//     <Route exact path={path} element={component} />
//   ) : (
//     <Route exact path="/" element={<LoginPage />} />
//   );
// };

// export default PrivateRoute;
