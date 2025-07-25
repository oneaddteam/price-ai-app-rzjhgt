import React from 'react';
import { View, Text, Alert } from 'react-native';

// API endpoint simulation for admin login
export const loginAPI = async (email: string, password: string) => {
  console.log('Login API called with:', { email, password });
  
  // Master Admin credentials
  const masterAdmin = {
    email: 'oneaddteam@gmail.com',
    password: 'Sonaiya@25',
    role: 'Master_Admin',
    permissions: ['all']
  };
  
  // State/Regional Admin credentials
  const admins = [
    {
      email: 'admin.tn@priceai.com',
      password: 'TamilNadu@123',
      role: 'State_Admin',
      region: 'Tamil Nadu',
      permissions: ['vendors', 'products', 'users']
    },
    {
      email: 'admin.chennai@priceai.com',
      password: 'Chennai@123',
      role: 'City_Admin',
      region: 'Chennai',
      permissions: ['vendors', 'products']
    }
  ];
  
  // Check master admin
  if (email === masterAdmin.email && password === masterAdmin.password) {
    return {
      success: true,
      user: masterAdmin,
      token: 'master_admin_token_' + Date.now(),
      message: 'Master Admin login successful'
    };
  }
  
  // Check regional admins
  const admin = admins.find(a => a.email === email && a.password === password);
  if (admin) {
    return {
      success: true,
      user: admin,
      token: 'admin_token_' + Date.now(),
      message: `${admin.role} login successful`
    };
  }
  
  return {
    success: false,
    message: 'Invalid credentials'
  };
};

// Middleware for role-based access control
export const checkRole = (userRole: string, requiredRole: string) => {
  const roleHierarchy = {
    'Master_Admin': 5,
    'State_Admin': 4,
    'City_Admin': 3,
    'Vendor': 2,
    'User': 1
  };
  
  return roleHierarchy[userRole as keyof typeof roleHierarchy] >= roleHierarchy[requiredRole as keyof typeof roleHierarchy];
};

// Component for API documentation (not rendered, just for reference)
const LoginAPI: React.FC = () => {
  return (
    <View>
      <Text>Login API Endpoint</Text>
      <Text>POST /api/auth/login</Text>
      <Text>Body: {JSON.stringify({ email: 'string', password: 'string' })}</Text>
    </View>
  );
};

export default LoginAPI;