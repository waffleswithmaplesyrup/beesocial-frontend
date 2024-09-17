
import { Route, Routes } from "react-router-dom";
import ReduxExamples from "./reduxExamples/ReduxExamples";
import ErrorPage from "./pages/ErrorPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {

  // check user is logged in from user auth slice
  const isLoggedIn = false;
  
  
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/example" element={<ReduxExamples />} />
      <Route path="*" element={<ErrorPage />} />

      {/* protected routes */}
      <Route 
        path="/home" 
        element={<ProtectedRoute 
                    condition={isLoggedIn} 
                    redirectTo="/login" 
                    children={<HomePage />} />} 
      />
    </Routes>
  )
}

export default App
