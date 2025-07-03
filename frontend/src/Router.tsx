import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login-form/LoginForm";
import Register from "./components/register-form/RegisterForm";
import ProfilePage from "./components/side-pages/profilPage";
import ParameterPage from "./components/side-pages/parameterPage";
import App from "./App";
import { RequireAuth } from "./RequireAuth";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes publiques */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<ParameterPage />} />
        <Route path="/profil" element={<ProfilePage />} />
        {/* Routes privées protégées */}
        <Route element={<RequireAuth />}>
          <Route path="/*" element={<App />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
