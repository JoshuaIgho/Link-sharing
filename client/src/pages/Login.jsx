import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const Login = () => {
  useDocumentTitle('Sign In');

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-purple-50 flex items-center justify-center p-4">
      {/* Back Button - Fixed Top Left */}
      <Link 
        to="/" 
        className="fixed top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Home</span>
      </Link>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold text-primary-600 mb-2 hover:text-primary-700 transition-colors">
              LinkShare
            </h1>
          </Link>
          <p className="text-gray-600">Welcome back! Sign in to your account</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign In</h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;