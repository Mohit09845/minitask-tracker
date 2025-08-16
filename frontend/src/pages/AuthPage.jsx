import { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext'; 

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const { login, register } = useAuth(); 

  const handleAuthSubmit = async (email, password) => {
    if (isRegister) {
      await register(email, password);
    } else {
      await login(email, password);
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