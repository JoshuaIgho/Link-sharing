import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import RegisterForm from '../components/auth/RegisterForm';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const Register = () => {
  useDocumentTitle('Sign Up');

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
          <p className="text-gray-600">Create your free account and get started</p>
        </div>

        {/* Register Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Account</h2>
          <RegisterForm />
        </div>
        
        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Register;