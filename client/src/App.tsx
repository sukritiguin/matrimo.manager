import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/auth/AuthPage';
import Login from './pages/auth/Login';
import './index.css';
import HomePage from './pages/Home';
import AboutPage from './pages/About';

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[var(--primary-maroon)] to-[var(--primary-gold)]">
      <div className="w-full">
        <Router>
          <Routes>
            <Route path="/auth/" element={<AuthPage />}>
              <Route path="login" element={<Login />} />
            </Route>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/about" element={<AboutPage />}></Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
