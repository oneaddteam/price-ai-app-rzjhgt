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
  const [modalType, setModalType] = useState<'users' | 'vendors' | 'products' | 'analytics'>('users');

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

  const handleLogin = () => {
    console.log('Login attempt:', { email, password });
    
    // Default admin credentials
    if (email === 'oneaddteam@gmail.com' && password === 'Sonaiya@25') {
      setIsLoggedIn(true);
      Alert.alert('Success', 'Welcome to PRICE.AI Master Admin Panel!');
    } else {
      Alert.alert('Error', 'Invalid credentials. Please try again.');
    }
  };

  const handleApprove = (id: number, type: string) => {
    console.log(`Approving ${type} with ID: ${id}`);
    setPendingItems(prev => prev.filter(item => item.id !== id));
    Alert.alert('Approved', `${type} has been approved successfully!`);
  };

  const handleReject = (id: number, type: string) => {
    console.log(`Rejecting ${type} with ID: ${id}`);
    setPendingItems(prev => prev.filter(item => item.id !== id));
    Alert.alert('Rejected', `${type} has been rejected.`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    Alert.alert('Logged Out', 'You have been logged out successfully.');
  };

  const openModal = (type: 'users' | 'vendors' | 'products' | 'analytics') => {
    setModalType(type);
    setShowModal(true);
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
          <View>
            <Text style={styles.headerTitle}>Master Admin Panel</Text>
            <Text style={styles.headerSubtitle}>PRICE.AI Control Center</Text>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Ionicons name="log-out" size={24} color="#FFD700" />
          </TouchableOpacity>
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
              onPress={() => {}}
            />
            <AdminCard
              title="Active Bookings"
              count={dashboardData.activeBookings}
              icon="airplane"
              color="#DDA0DD"
              onPress={() => {}}
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
            <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#FF6B6B20' }]}>
              <Ionicons name="add-circle" size={32} color="#FF6B6B" />
              <Text style={styles.actionTitle}>Add Vendor</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#4ECDC420' }]}>
              <Ionicons name="cube" size={32} color="#4ECDC4" />
              <Text style={styles.actionTitle}>Add Product</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#96CEB420' }]}>
              <Ionicons name="megaphone" size={32} color="#96CEB4" />
              <Text style={styles.actionTitle}>Create Offer</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#FFEAA720' }]}>
              <Ionicons name="analytics" size={32} color="#FFEAA7" />
              <Text style={styles.actionTitle}>View Reports</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* System Health */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System Health</Text>
          <View style={styles.healthContainer}>
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
          </View>
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
              </Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalBody}>
              {modalType === 'users' && (
                <View>
                  {users.map((user) => (
                    <View key={user.id} style={styles.userItem}>
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
                    </View>
                  ))}
                </View>
              )}
              
              {modalType === 'analytics' && (
                <View style={styles.analyticsContainer}>
                  <View style={styles.analyticsCard}>
                    <Text style={styles.analyticsTitle}>Revenue Trend</Text>
                    <Text style={styles.analyticsValue}>₹1,25,000</Text>
                    <Text style={styles.analyticsChange}>+15% from last month</Text>
                  </View>
                  
                  <View style={styles.analyticsCard}>
                    <Text style={styles.analyticsTitle}>User Growth</Text>
                    <Text style={styles.analyticsValue}>1,250</Text>
                    <Text style={styles.analyticsChange}>+8% from last month</Text>
                  </View>
                  
                  <View style={styles.analyticsCard}>
                    <Text style={styles.analyticsTitle}>Top Categories</Text>
                    <Text style={styles.analyticsItem}>1. Electronics - 35%</Text>
                    <Text style={styles.analyticsItem}>2. Groceries - 28%</Text>
                    <Text style={styles.analyticsItem}>3. Fashion - 22%</Text>
                  </View>
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
  logoutButton: {
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
    gap: 12,
  },
  healthItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
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