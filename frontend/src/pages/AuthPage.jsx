import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, LogIn } from "lucide-react";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700"
      >
        {/* Header with icon */}
        <div className="flex flex-col items-center mb-6">
          {isRegister ? (
            <UserPlus className="w-12 h-12 text-blue-400 mb-3" />
          ) : (
            <LogIn className="w-12 h-12 text-green-400 mb-3" />
          )}
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {isRegister ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-slate-400 mt-1 text-sm md:text-base text-center">
            {isRegister
              ? "Sign up to get started with your journey 🚀"
              : "Log in to continue your experience ✨"}
          </p>
        </div>

        {/* Auth Form */}
        <AuthForm
          onSubmit={handleAuthSubmit}
          isRegister={isRegister}
          onToggleMode={() => setIsRegister(!isRegister)}
        />

        {/* Toggle Mode */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-400 hover:underline text-sm md:text-base"
          >
            {isRegister
              ? "Already have an account? Log In"
              : "Don't have an account? Register"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
