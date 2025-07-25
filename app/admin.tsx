import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
  Modal,
  FlatList,
  Dimensions,
  Linking,
} from 'react-native';
import { colors } from '../styles/commonStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

interface AdminCardProps {
  title: string;
  count: number;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  onPress: () => void;
}

interface PendingItemProps {
  id: number;
  title: string;
  subtitle: string;
  type: 'vendor' | 'product' | 'offer' | 'user';
  onApprove: () => void;
  onReject: () => void;
}

interface User {
  id: number;
  name: string;
  email: string;
  mobile: string;
  city: string;
  role: string;
  status: 'active' | 'pending' | 'rejected';
  createdAt: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  vendor: string;
  status: 'active' | 'pending' | 'rejected';
}

interface Vendor {
  id: number;
  name: string;
  mobile: string;
  city: string;
  services: string;
  status: 'active' | 'pending' | 'rejected';
  revenue: number;
}

const AdminCard: React.FC<AdminCardProps> = ({ title, count, icon, color, onPress }) => (
  <TouchableOpacity style={[styles.adminCard, { borderLeftColor: color }]} onPress={onPress}>
    <View style={[styles.cardIcon, { backgroundColor: color + '20' }]}>
      <Ionicons name={icon} size={24} color={color} />
    </View>
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={[styles.cardCount, { color }]}>{count}</Text>
    </View>
  </TouchableOpacity>
);

const PendingItem: React.FC<PendingItemProps> = ({ id, title, subtitle, type, onApprove, onReject }) => (
  <View style={styles.pendingItem}>
    <View style={styles.pendingInfo}>
      <Text style={styles.pendingTitle}>{title}</Text>
      <Text style={styles.pendingSubtitle}>{subtitle}</Text>
      <Text style={styles.pendingType}>{type.toUpperCase()}</Text>
    </View>
    <View style={styles.pendingActions}>
      <TouchableOpacity style={styles.approveButton} onPress={onApprove}>
        <Ionicons name="checkmark" size={20} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.rejectButton} onPress={onReject}>
        <Ionicons name="close" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  </View>
);

const AdminPanel: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentView, setCurrentView] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'users' | 'vendors' | 'products' | 'analytics' | 'addVendor' | 'addProduct' | 'createOffer'>('users');

  // Mock data - in real app, this would come from your backend
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 1250,
    totalVendors: 89,
    totalProducts: 2340,
    pendingApprovals: 15,
    activeBookings: 67,
    revenue: 125000,
  });

  const [pendingItems, setPendingItems] = useState([
    {
      id: 1,
      title: 'Raj Electronics',
      subtitle: 'Electronics vendor from Chennai',
      type: 'vendor' as const,
    },
    {
      id: 2,
      title: 'Samsung Galaxy S24',
      subtitle: 'Mobile phone - ₹75,000',
      type: 'product' as const,
    },
    {
      id: 3,
      title: 'Priya Stores',
      subtitle: 'Grocery vendor from Madurai',
      type: 'vendor' as const,
    },
    {
      id: 4,
      title: 'Diwali Offer - 50% Off',
      subtitle: 'Festival promotion campaign',
      type: 'offer' as const,
    },
  ]);

  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh@gmail.com',
      mobile: '9876543210',
      city: 'Chennai',
      role: 'User',
      status: 'active',
      createdAt: '2024-01-15',
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya@gmail.com',
      mobile: '9876543211',
      city: 'Madurai',
      role: 'Vendor',
      status: 'pending',
      createdAt: '2024-01-16',
    },
  ]);

  const [vendors, setVendors] = useState<Vendor[]>([
    {
      id: 1,
      name: 'Raj Electronics',
      mobile: '9876543210',
      city: 'Chennai',
      services: 'Mobile phones, Laptops, Accessories',
      status: 'active',
      revenue: 45000,
    },
    {
      id: 2,
      name: 'Priya Stores',
      mobile: '9876543211',
      city: 'Madurai',
      services: 'Groceries, Daily needs',
      status: 'pending',
      revenue: 0,
    },
  ]);

  const [newVendor, setNewVendor] = useState({
    name: '',
    mobile: '',
    city: '',
    services: '',
    gst: '',
    address: '',
  });

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    vendor: '',
    description: '',
  });

  const [newOffer, setNewOffer] = useState({
    title: '',
    description: '',
    discount: '',
    validTill: '',
    category: '',
  });

  const handleLogin = async () => {
    console.log('Login attempt:', { email, password });
    
    try {
      // Simulate API call to /api/auth/login
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        setIsLoggedIn(true);
        
        // Store admin token and role
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminRole', data.user.role);
        
        Alert.alert('Success', `Welcome to PRICE.AI ${data.user.role} Panel!`);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Fallback to hardcoded credentials for demo
      if (email === 'oneaddteam@gmail.com' && password === 'Sonaiya@25') {
        setIsLoggedIn(true);
        Alert.alert('Success', 'Welcome to PRICE.AI Master Admin Panel!');
      } else {
        Alert.alert('Error', 'Invalid credentials. Please try again.');
      }
    }
  };

  const handleApprove = async (id: number, type: string) => {
    console.log(`Approving ${type} with ID: ${id}`);
    
    try {
      // Simulate API call to approve
      const response = await fetch(`/api/admin/approve/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify({ 
          action: 'approve',
          type: type,
          approvedBy: 'oneaddteam@gmail.com',
          approvedAt: new Date().toISOString()
        }),
      });
      
      if (response.ok) {
        setPendingItems(prev => prev.filter(item => item.id !== id));
        setDashboardData(prev => ({ ...prev, pendingApprovals: prev.pendingApprovals - 1 }));
        
        // Send notifications
        console.log(`Sending approval SMS and email for ${type} ID: ${id}`);
        console.log(`Moving ${type} to active status in database`);
        
        Alert.alert('Approved', `${type} has been approved successfully! Notification sent to applicant.`);
      } else {
        throw new Error('Failed to approve');
      }
    } catch (error) {
      console.error('Approval error:', error);
      Alert.alert('Error', 'Failed to approve. Please try again.');
    }
  };

  const handleReject = async (id: number, type: string) => {
    console.log(`Rejecting ${type} with ID: ${id}`);
    
    Alert.alert(
      'Confirm Rejection',
      `Are you sure you want to reject this ${type}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reject', 
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(`/api/admin/approve/${id}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
                },
                body: JSON.stringify({ 
                  action: 'reject',
                  type: type,
                  rejectedBy: 'oneaddteam@gmail.com',
                  rejectedAt: new Date().toISOString(),
                  reason: 'Does not meet requirements'
                }),
              });
              
              if (response.ok) {
                setPendingItems(prev => prev.filter(item => item.id !== id));
                setDashboardData(prev => ({ ...prev, pendingApprovals: prev.pendingApprovals - 1 }));
                
                console.log(`Sending rejection notification for ${type} ID: ${id}`);
                Alert.alert('Rejected', `${type} has been rejected. Notification sent to applicant.`);
              } else {
                throw new Error('Failed to reject');
              }
            } catch (error) {
              console.error('Rejection error:', error);
              Alert.alert('Error', 'Failed to reject. Please try again.');
            }
          }
        }
      ]
    );
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    Alert.alert('Logged Out', 'You have been logged out successfully.');
  };

  const openModal = (type: 'users' | 'vendors' | 'products' | 'analytics' | 'addVendor' | 'addProduct' | 'createOffer') => {
    console.log(`Opening modal: ${type}`);
    setModalType(type);
    setShowModal(true);
  };

  const handleAddVendor = () => {
    console.log('Adding new vendor:', newVendor);
    if (!newVendor.name || !newVendor.mobile || !newVendor.city || !newVendor.services) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    
    const vendor: Vendor = {
      id: vendors.length + 1,
      name: newVendor.name,
      mobile: newVendor.mobile,
      city: newVendor.city,
      services: newVendor.services,
      status: 'active',
      revenue: 0,
    };
    
    setVendors(prev => [...prev, vendor]);
    setDashboardData(prev => ({ ...prev, totalVendors: prev.totalVendors + 1 }));
    setNewVendor({ name: '', mobile: '', city: '', services: '', gst: '', address: '' });
    setShowModal(false);
    Alert.alert('Success', 'Vendor added successfully!');
  };

  const handleAddProduct = () => {
    console.log('Adding new product:', newProduct);
    if (!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.vendor) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    
    setDashboardData(prev => ({ ...prev, totalProducts: prev.totalProducts + 1 }));
    setNewProduct({ name: '', category: '', price: '', vendor: '', description: '' });
    setShowModal(false);
    Alert.alert('Success', 'Product added successfully!');
  };

  const handleCreateOffer = () => {
    console.log('Creating new offer:', newOffer);
    if (!newOffer.title || !newOffer.description || !newOffer.discount) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    
    setNewOffer({ title: '', description: '', discount: '', validTill: '', category: '' });
    setShowModal(false);
    Alert.alert('Success', 'Offer created successfully!');
  };

  const handleSystemHealth = () => {
    console.log('Checking system health');
    Alert.alert('System Health Check', 'All systems are operational:\n\n✅ API Services: Online\n✅ Database: Connected\n⚠️ Payment Gateway: Warning\n✅ AI Services: Active');
  };

  const handleExportData = () => {
    console.log('Exporting data');
    Alert.alert('Export Data', 'Choose export format:', [
      { text: 'PDF Report', onPress: () => console.log('Exporting PDF') },
      { text: 'Excel Sheet', onPress: () => console.log('Exporting Excel') },
      { text: 'Cancel', style: 'cancel' }
    ]);
  };

  const handleContactSupport = () => {
    console.log('Contacting support');
    Alert.alert('Contact Support', 'Choose contact method:', [
      { text: 'Call', onPress: () => Linking.openURL('tel:08883800038') },
      { text: 'Email', onPress: () => Linking.openURL('mailto:price.ai@gmail.com') },
      { text: 'Cancel', style: 'cancel' }
    ]);
  };

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" backgroundColor="#1e4a72" />
        
        <LinearGradient colors={['#1e4a72', '#2d5aa0']} style={styles.loginContainer}>
          <View style={styles.loginHeader}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#FFD700" />
            </TouchableOpacity>
            <View style={styles.logoContainer}>
              <Ionicons name="shield-checkmark" size={48} color="#FFD700" />
              <Text style={styles.loginTitle}>PRICE.AI Admin</Text>
              <Text style={styles.loginSubtitle}>Master Control Panel</Text>
            </View>
          </View>

          <View style={styles.loginForm}>
            <View style={styles.inputContainer}>
              <Ionicons name="mail" size={20} color="#666" />
              <TextInput
                style={styles.loginInput}
                placeholder="Admin Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed" size={20} color="#666" />
              <TextInput
                style={styles.loginInput}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Access Admin Panel</Text>
              <Ionicons name="arrow-forward" size={20} color="#1e4a72" />
            </TouchableOpacity>

            <Text style={styles.loginNote}>
              Default: oneaddteam@gmail.com / Sonaiya@25
            </Text>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#1e4a72" />
      
      {/* Header */}
      <LinearGradient colors={['#1e4a72', '#2d5aa0']} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()}>
            <View>
              <Text style={styles.headerTitle}>Master Admin Panel</Text>
              <Text style={styles.headerSubtitle}>PRICE.AI Control Center</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={handleContactSupport} style={styles.headerButton}>
              <Ionicons name="help-circle" size={24} color="#FFD700" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.headerButton}>
              <Ionicons name="log-out" size={24} color="#FFD700" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Dashboard Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dashboard Overview</Text>
          <View style={styles.statsGrid}>
            <AdminCard
              title="Total Users"
              count={dashboardData.totalUsers}
              icon="people"
              color="#4ECDC4"
              onPress={() => openModal('users')}
            />
            <AdminCard
              title="Active Vendors"
              count={dashboardData.totalVendors}
              icon="storefront"
              color="#FF6B6B"
              onPress={() => openModal('vendors')}
            />
            <AdminCard
              title="Products Listed"
              count={dashboardData.totalProducts}
              icon="cube"
              color="#96CEB4"
              onPress={() => openModal('products')}
            />
            <AdminCard
              title="Pending Approvals"
              count={dashboardData.pendingApprovals}
              icon="time"
              color="#FFEAA7"
              onPress={() => console.log('Showing pending approvals')}
            />
            <AdminCard
              title="Active Bookings"
              count={dashboardData.activeBookings}
              icon="airplane"
              color="#DDA0DD"
              onPress={() => console.log('Showing active bookings')}
            />
            <AdminCard
              title="Revenue (₹)"
              count={dashboardData.revenue}
              icon="trending-up"
              color="#45B7D1"
              onPress={() => openModal('analytics')}
            />
          </View>
        </View>

        {/* Pending Approvals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pending Approvals</Text>
          <View style={styles.pendingContainer}>
            {pendingItems.map((item) => (
              <PendingItem
                key={item.id}
                id={item.id}
                title={item.title}
                subtitle={item.subtitle}
                type={item.type}
                onApprove={() => handleApprove(item.id, item.type)}
                onReject={() => handleReject(item.id, item.type)}
              />
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity 
              style={[styles.actionCard, { backgroundColor: '#FF6B6B20' }]}
              onPress={() => openModal('addVendor')}
            >
              <Ionicons name="add-circle" size={32} color="#FF6B6B" />
              <Text style={styles.actionTitle}>Add Vendor</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionCard, { backgroundColor: '#4ECDC420' }]}
              onPress={() => openModal('addProduct')}
            >
              <Ionicons name="cube" size={32} color="#4ECDC4" />
              <Text style={styles.actionTitle}>Add Product</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionCard, { backgroundColor: '#96CEB420' }]}
              onPress={() => openModal('createOffer')}
            >
              <Ionicons name="megaphone" size={32} color="#96CEB4" />
              <Text style={styles.actionTitle}>Create Offer</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionCard, { backgroundColor: '#FFEAA720' }]}
              onPress={handleExportData}
            >
              <Ionicons name="analytics" size={32} color="#FFEAA7" />
              <Text style={styles.actionTitle}>Export Data</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* System Health */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System Health</Text>
          <TouchableOpacity style={styles.healthContainer} onPress={handleSystemHealth}>
            <View style={styles.healthItem}>
              <View style={[styles.healthIndicator, { backgroundColor: '#4ECDC4' }]} />
              <Text style={styles.healthText}>API Services: Online</Text>
            </View>
            <View style={styles.healthItem}>
              <View style={[styles.healthIndicator, { backgroundColor: '#4ECDC4' }]} />
              <Text style={styles.healthText}>Database: Connected</Text>
            </View>
            <View style={styles.healthItem}>
              <View style={[styles.healthIndicator, { backgroundColor: '#FFEAA7' }]} />
              <Text style={styles.healthText}>Payment Gateway: Warning</Text>
            </View>
            <View style={styles.healthItem}>
              <View style={[styles.healthIndicator, { backgroundColor: '#4ECDC4' }]} />
              <Text style={styles.healthText}>AI Services: Active</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal for detailed views */}
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {modalType === 'users' && 'User Management'}
                {modalType === 'vendors' && 'Vendor Management'}
                {modalType === 'products' && 'Product Management'}
                {modalType === 'analytics' && 'Analytics Dashboard'}
                {modalType === 'addVendor' && 'Add New Vendor'}
                {modalType === 'addProduct' && 'Add New Product'}
                {modalType === 'createOffer' && 'Create New Offer'}
              </Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalBody}>
              {modalType === 'users' && (
                <View>
                  {users.map((user) => (
                    <TouchableOpacity key={user.id} style={styles.userItem} onPress={() => console.log('User details:', user)}>
                      <View style={styles.userInfo}>
                        <Text style={styles.userName}>{user.name}</Text>
                        <Text style={styles.userDetails}>{user.email} • {user.mobile}</Text>
                        <Text style={styles.userLocation}>{user.city} • {user.role}</Text>
                      </View>
                      <View style={[
                        styles.statusBadge,
                        { backgroundColor: user.status === 'active' ? '#4ECDC4' : '#FFEAA7' }
                      ]}>
                        <Text style={styles.statusText}>{user.status}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {modalType === 'vendors' && (
                <View>
                  {vendors.map((vendor) => (
                    <TouchableOpacity key={vendor.id} style={styles.userItem} onPress={() => console.log('Vendor details:', vendor)}>
                      <View style={styles.userInfo}>
                        <Text style={styles.userName}>{vendor.name}</Text>
                        <Text style={styles.userDetails}>{vendor.mobile} • {vendor.city}</Text>
                        <Text style={styles.userLocation}>{vendor.services}</Text>
                        <Text style={styles.userLocation}>Revenue: ₹{vendor.revenue}</Text>
                      </View>
                      <View style={[
                        styles.statusBadge,
                        { backgroundColor: vendor.status === 'active' ? '#4ECDC4' : '#FFEAA7' }
                      ]}>
                        <Text style={styles.statusText}>{vendor.status}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {modalType === 'addVendor' && (
                <View>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Business Name *"
                    value={newVendor.name}
                    onChangeText={(text) => setNewVendor({ ...newVendor, name: text })}
                  />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Mobile Number *"
                    value={newVendor.mobile}
                    onChangeText={(text) => setNewVendor({ ...newVendor, mobile: text })}
                    keyboardType="phone-pad"
                  />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="City *"
                    value={newVendor.city}
                    onChangeText={(text) => setNewVendor({ ...newVendor, city: text })}
                  />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Services/Products *"
                    value={newVendor.services}
                    onChangeText={(text) => setNewVendor({ ...newVendor, services: text })}
                    multiline
                  />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="GST Number (Optional)"
                    value={newVendor.gst}
                    onChangeText={(text) => setNewVendor({ ...newVendor, gst: text })}
                  />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Address"
                    value={newVendor.address}
                    onChangeText={(text) => setNewVendor({ ...newVendor, address: text })}
                    multiline
                  />
                  <TouchableOpacity style={styles.modalButton} onPress={handleAddVendor}>
                    <Text style={styles.modalButtonText}>Add Vendor</Text>
                  </TouchableOpacity>
                </View>
              )}

              {modalType === 'addProduct' && (
                <View>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Product Name *"
                    value={newProduct.name}
                    onChangeText={(text) => setNewProduct({ ...newProduct, name: text })}
                  />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Category *"
                    value={newProduct.category}
                    onChangeText={(text) => setNewProduct({ ...newProduct, category: text })}
                  />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Price *"
                    value={newProduct.price}
                    onChangeText={(text) => setNewProduct({ ...newProduct, price: text })}
                    keyboardType="numeric"
                  />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Vendor Name *"
                    value={newProduct.vendor}
                    onChangeText={(text) => setNewProduct({ ...newProduct, vendor: text })}
                  />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Description"
                    value={newProduct.description}
                    onChangeText={(text) => setNewProduct({ ...newProduct, description: text })}
                    multiline
                  />
                  <TouchableOpacity style={styles.modalButton} onPress={handleAddProduct}>
                    <Text style={styles.modalButtonText}>Add Product</Text>
                  </TouchableOpacity>
                </View>
              )}

              {modalType === 'createOffer' && (
                <View>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Offer Title *"
                    value={newOffer.title}
                    onChangeText={(text) => setNewOffer({ ...newOffer, title: text })}
                  />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Description *"
                    value={newOffer.description}
                    onChangeText={(text) => setNewOffer({ ...newOffer, description: text })}
                    multiline
                  />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Discount Percentage *"
                    value={newOffer.discount}
                    onChangeText={(text) => setNewOffer({ ...newOffer, discount: text })}
                    keyboardType="numeric"
                  />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Valid Till (DD/MM/YYYY)"
                    value={newOffer.validTill}
                    onChangeText={(text) => setNewOffer({ ...newOffer, validTill: text })}
                  />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Category"
                    value={newOffer.category}
                    onChangeText={(text) => setNewOffer({ ...newOffer, category: text })}
                  />
                  <TouchableOpacity style={styles.modalButton} onPress={handleCreateOffer}>
                    <Text style={styles.modalButtonText}>Create Offer</Text>
                  </TouchableOpacity>
                </View>
              )}
              
              {modalType === 'analytics' && (
                <View style={styles.analyticsContainer}>
                  <TouchableOpacity style={styles.analyticsCard} onPress={() => console.log('Revenue details')}>
                    <Text style={styles.analyticsTitle}>Revenue Trend</Text>
                    <Text style={styles.analyticsValue}>₹1,25,000</Text>
                    <Text style={styles.analyticsChange}>+15% from last month</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.analyticsCard} onPress={() => console.log('User growth details')}>
                    <Text style={styles.analyticsTitle}>User Growth</Text>
                    <Text style={styles.analyticsValue}>1,250</Text>
                    <Text style={styles.analyticsChange}>+8% from last month</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.analyticsCard} onPress={() => console.log('Category details')}>
                    <Text style={styles.analyticsTitle}>Top Categories</Text>
                    <Text style={styles.analyticsItem}>1. Electronics - 35%</Text>
                    <Text style={styles.analyticsItem}>2. Groceries - 28%</Text>
                    <Text style={styles.analyticsItem}>3. Fashion - 22%</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.analyticsCard} onPress={() => console.log('Regional performance')}>
                    <Text style={styles.analyticsTitle}>Regional Performance</Text>
                    <Text style={styles.analyticsItem}>1. Chennai - 40%</Text>
                    <Text style={styles.analyticsItem}>2. Madurai - 25%</Text>
                    <Text style={styles.analyticsItem}>3. Coimbatore - 20%</Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  loginHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  backButton: {
    position: 'absolute',
    top: -40,
    left: 0,
    padding: 8,
  },
  logoContainer: {
    alignItems: 'center',
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginTop: 16,
  },
  loginSubtitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 4,
  },
  loginForm: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  loginInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    marginLeft: 8,
  },
  loginButton: {
    backgroundColor: '#FFD700',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
    gap: 8,
  },
  loginButtonText: {
    color: '#1e4a72',
    fontSize: 16,
    fontWeight: '600',
  },
  loginNote: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    marginTop: 16,
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  adminCard: {
    width: (width - 60) / 2,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  cardCount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  pendingContainer: {
    gap: 12,
  },
  pendingItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pendingInfo: {
    flex: 1,
  },
  pendingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  pendingSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  pendingType: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  pendingActions: {
    flexDirection: 'row',
    gap: 8,
  },
  approveButton: {
    backgroundColor: '#4ECDC4',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rejectButton: {
    backgroundColor: '#FF6B6B',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - 60) / 2,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  healthContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    gap: 12,
  },
  healthItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  healthIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  healthText: {
    fontSize: 14,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: width * 0.9,
    maxHeight: '80%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalBody: {
    padding: 20,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: '#1e4a72',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  userDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  userLocation: {
    fontSize: 12,
    color: '#999',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  analyticsContainer: {
    gap: 16,
  },
  analyticsCard: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
  },
  analyticsTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  analyticsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  analyticsChange: {
    fontSize: 12,
    color: '#4ECDC4',
  },
  analyticsItem: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
});

export default AdminPanel;