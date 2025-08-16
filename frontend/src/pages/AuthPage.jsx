import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { login, register } from '../api';

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleAuthSubmit = async (email, password) => {
    try {
      if (isRegister) {
        await register(email, password);
        
        setIsRegister(false); 
        alert('Registration successful! Please log in.');
      } else {
        await login(email, password);
        
        navigate('/tasks');
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <AuthForm
        onSubmit={handleAuthSubmit}
        isRegister={isRegister}
        onToggleMode={() => setIsRegister(!isRegister)}
      />
    </div>
  );
};

export default AuthPage;