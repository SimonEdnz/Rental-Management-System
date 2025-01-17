import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import ManagerDashboard from './components/Dashboard/ManagerDashboard';
import TenantDashboard from './components/Dashboard/TenantDashboard';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
        <Route path="/tenant-dashboard" element={<TenantDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
