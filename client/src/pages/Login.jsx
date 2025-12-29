import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import Head from './Head'; 


const Login = () => {
  return (
    <>
          <Head />

    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/">
            <h1 className="text-3xl font-bold text-primary-600 mb-2">LinkShare</h1>
          </Link>
          <p className="text-gray-600">Welcome back! Sign in to your account</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign In</h2>
          <LoginForm />
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;