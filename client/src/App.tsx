import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/auth/AuthPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import './index.css';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<AuthPage />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
