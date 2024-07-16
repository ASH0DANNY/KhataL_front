import { useEffect } from "react";
import WebFont from "webfontloader";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
// import Navbar from "./components/navbar";
// import Footer from "./components/footer";
import HistoryPage from "./pages/history";
import AddNewVendor from "./pages/addvendor";
import LoginPage from "./pages/loginPage";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <Router>
      {/* <Navbar /> */}
      <div>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/history" element={<HistoryPage />} />
          <Route exact path="/new_vendor" element={<AddNewVendor />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
