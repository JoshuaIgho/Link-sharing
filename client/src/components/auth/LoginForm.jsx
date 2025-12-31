import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import Input from '../common/Input';
import Button from '../common/Button';
import { validateEmail } from '../../utils/validation';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear errors when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverError) {
      setServerError('');
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validate()) return;

    setLoading(true);

    try {
      await login(formData.email, formData.password);
      toast.success('Welcome back! 👋');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      
      const errorMessage = error.response?.data?.message || error.message;
      const statusCode = error.response?.status;

      // Handle specific error cases
      if (statusCode === 401 || errorMessage.toLowerCase().includes('invalid')) {
        setErrors({
          email: 'Invalid email or password',
          password: 'Invalid email or password',
        });
        setServerError('Invalid email or password. Please check your credentials and try again.');
      } else if (statusCode === 429) {
        setServerError('Too many login attempts. Please try again in a few minutes.');
      } else if (errorMessage.toLowerCase().includes('network')) {
        setServerError('Network error. Please check your internet connection and try again.');
      } else {
        setServerError(errorMessage || 'Login failed. Please try again.');
      }
      
      toast.error(errorMessage || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Server Error Message */}
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-3 animate-slide-down">
          <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-sm">{serverError}</p>
            {serverError.includes('Invalid email or password') && (
              <p className="text-xs mt-1">
                Forgot your password? Contact support for help.
              </p>
            )}
          </div>
        </div>
      )}

      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        icon={Mail}
        placeholder="you@example.com"
        autoComplete="email"
        disabled={loading}
        autoFocus
      />

      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        icon={Lock}
        placeholder="••••••••"
        autoComplete="current-password"
        disabled={loading}
      />

      <Button type="submit" loading={loading} fullWidth disabled={loading}>
        {loading ? 'Signing In...' : 'Sign In'}
      </Button>

      <p className="text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;