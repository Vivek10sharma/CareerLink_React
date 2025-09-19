// App.js
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 

import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import JobDetailPage from './pages/JobDetailPage';
import JobListPage from './pages/JobListPage';
import ApplyJobPage from './pages/ApplyJobPage';
import CandidateDashboard from './pages/CandidateDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';
import MyJobs from './pages/MyJobs';
import JobSearch from './pages/jobSearch';
import MyApplications from './pages/myApplications';
import Applications from './pages/Application';

const AuthContext = React.createContext();

const ProtectedRoute = ({ allowedRole, children }) => {
  const { user } = React.useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={`/${user.role}-dashboard`} replace />;
  }

  return children;
};

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = React.useState(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const decoded = jwtDecode(parsed.token);
        const now = Date.now() / 1000;
        if (decoded.exp && decoded.exp < now) {
          localStorage.removeItem('user');
          return null;
        }
        return parsed;
      } catch (err) {
        localStorage.removeItem('user');
        return null;
      }
    }
    return null;
  });

  React.useEffect(() => {
    const onStorageChange = () => {
      const stored = localStorage.getItem('user');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const decoded = jwtDecode(parsed.token);
          const now = Date.now() / 1000;
          if (decoded.exp && decoded.exp < now) {
            localStorage.removeItem('user');
            setUser(null);
          } else {
            setUser(parsed);
          }
        } catch (err) {
          localStorage.removeItem('user');
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    window.addEventListener('storage', onStorageChange);
    return () => window.removeEventListener('storage', onStorageChange);
  }, []);

  React.useEffect(() => {
    if (location.pathname === '/' && user) {
      if (user.role === 'candidate') {
        navigate('/candidate-dashboard', { replace: true });
      } else if (user.role === 'recruiter') {
        navigate('/recruiter-dashboard', { replace: true });
      }
    }
  }, [user, location.pathname, navigate]);

  const showNavbar = location.pathname === '/';

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {showNavbar && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/job/:id" element={<JobDetailPage />} />
        <Route path="/jobs" element={<JobListPage />} />
        <Route path="/job-search" element={<JobSearch />} />

        {/* Candidate Routes */}
        <Route
          path="/jobs/:jobId"
          element={
            <ProtectedRoute allowedRole="candidate">
              <ApplyJobPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/candidate-dashboard"
          element={
            <ProtectedRoute allowedRole="candidate">
              <CandidateDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-applications"
          element={
            <ProtectedRoute allowedRole="candidate">
              <MyApplications />
            </ProtectedRoute>
          }
        />

        {/* Recruiter Routes */}
        <Route
          path="/recruiter-dashboard"
          element={
            <ProtectedRoute allowedRole="recruiter">
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter-dashboard/:recruiterId"
          element={
            <ProtectedRoute allowedRole="recruiter">
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/my-jobs"
          element={
            <ProtectedRoute allowedRole="recruiter">
              <MyJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/application"
          element={
            <ProtectedRoute allowedRole="recruiter">
              <Applications />
            </ProtectedRoute>
          }
        />

        {/* Dashboard Redirect Fallback */}
        <Route
          path="/dashboard"
          element={
            user?.role === 'candidate' ? (
              <Navigate to="/candidate-dashboard" replace />
            ) : user?.role === 'recruiter' ? (
              <Navigate to="/recruiter-dashboard" replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthContext.Provider>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export { AuthContext };
export default App;
