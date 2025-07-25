import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../styles/commonStyles';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

interface AdminCardProps {
  title: string;
  count: number;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  onPress: () => void;
}

const AdminCard: React.FC<AdminCardProps> = ({ title, count, icon, color, onPress }) => (
  <TouchableOpacity style={[styles.adminCard, { borderLeftColor: color }]} onPress={onPress}>
    <View style={styles.cardHeader}>
      <Ionicons name={icon} size={24} color={color} />
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
    <Text style={styles.cardCount}>{count.toLocaleString()}</Text>
  </TouchableOpacity>
);

interface PendingItemProps {
  title: string;
  subtitle: string;
  type: 'vendor' | 'product' | 'offer';
  onApprove: () => void;
  onReject: () => void;
}

const PendingItem: React.FC<PendingItemProps> = ({ title, subtitle, type, onApprove, onReject }) => (
  <View style={styles.pendingItem}>
    <View style={styles.pendingInfo}>
      <Text style={styles.pendingTitle}>{title}</Text>
      <Text style={styles.pendingSubtitle}>{subtitle}</Text>
      <Text style={styles.pendingType}>{type.toUpperCase()}</Text>
    </View>
    <View style={styles.pendingActions}>
      <TouchableOpacity style={styles.approveButton} onPress={onApprove}>
        <Ionicons name="checkmark" size={20} color={colors.white} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.rejectButton} onPress={onReject}>
        <Ionicons name="close" size={20} color={colors.white} />
      </TouchableOpacity>
    </View>
  </View>
);

const AdminPanel: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedTab, setSelectedTab] = useState('dashboard');

  // Mock data
  const [dashboardData] = useState({
    totalUsers: 125000,
    totalVendors: 2500,
    totalProducts: 45000,
    activeBookings: 1200,
    pendingApprovals: 45,
    revenue: 2500000,
  });

  const [pendingItems] = useState([
    {
      id: 1,
      title: 'Raj Electronics',
      subtitle: 'Electronics store in Chennai',
      type: 'vendor' as const,
    },
    {
      id: 2,
      title: 'Samsung Galaxy S24',
      subtitle: 'Latest smartphone listing',
      type: 'product' as const,
    },
    {
      id: 3,
      title: '50% Off Diwali Sale',
      subtitle: 'Festival promotion campaign',
      type: 'offer' as const,
    },
  ]);

  const handleLogin = () => {
    console.log('Login attempt:', username);
    if (username === 'admin' && password === 'price123') {
      setIsLoggedIn(true);
      console.log('Login successful');
    } else {
      Alert.alert('Error', 'Invalid credentials. Use admin/price123 for demo.');
    }
  };

  const handleApprove = (id: number, type: string) => {
    console.log(`Approved ${type} with ID: ${id}`);
    Alert.alert('Success', `${type} approved successfully!`);
  };

  const handleReject = (id: number, type: string) => {
    console.log(`Rejected ${type} with ID: ${id}`);
    Alert.alert('Success', `${type} rejected successfully!`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    console.log('User logged out');
  };

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" backgroundColor={colors.priceBlue} />
        <LinearGradient
          colors={[colors.priceBlue, '#2a5a8a']}
          style={styles.loginContainer}
        >
          <View style={styles.loginForm}>
            <Ionicons name="shield-checkmark" size={80} color={colors.priceYellow} />
            <Text style={styles.loginTitle}>PRICE.AI Admin Panel</Text>
            <Text style={styles.loginSubtitle}>Master Control System</Text>
            
            <View style={styles.inputContainer}>
              <Ionicons name="person" size={20} color={colors.white} />
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor={colors.white + '80'}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed" size={20} color={colors.white} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={colors.white + '80'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
            
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            
            <Text style={styles.demoText}>Demo: admin / price123</Text>
            
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={20} color={colors.white} />
              <Text style={styles.backButtonText}>Back to Website</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor={colors.priceBlue} />
      
      {/* Header */}
      <LinearGradient
        colors={[colors.priceBlue, '#2a5a8a']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>PRICE.AI Admin</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'dashboard' && styles.activeTab]}
          onPress={() => setSelectedTab('dashboard')}
        >
          <Text style={[styles.tabText, selectedTab === 'dashboard' && styles.activeTabText]}>
            Dashboard
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'approvals' && styles.activeTab]}
          onPress={() => setSelectedTab('approvals')}
        >
          <Text style={[styles.tabText, selectedTab === 'approvals' && styles.activeTabText]}>
            Approvals
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'vendors' && styles.activeTab]}
          onPress={() => setSelectedTab('vendors')}
        >
          <Text style={[styles.tabText, selectedTab === 'vendors' && styles.activeTabText]}>
            Vendors
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {selectedTab === 'dashboard' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>System Overview</Text>
            
            <View style={styles.statsGrid}>
              <AdminCard
                title="Total Users"
                count={dashboardData.totalUsers}
                icon="people"
                color={colors.priceGreen}
                onPress={() => console.log('Users clicked')}
              />
              <AdminCard
                title="Total Vendors"
                count={dashboardData.totalVendors}
                icon="storefront"
                color={colors.priceBlue}
                onPress={() => console.log('Vendors clicked')}
              />
              <AdminCard
                title="Total Products"
                count={dashboardData.totalProducts}
                icon="cube"
                color={colors.priceYellow}
                onPress={() => console.log('Products clicked')}
              />
              <AdminCard
                title="Active Bookings"
                count={dashboardData.activeBookings}
                icon="ticket"
                color="#9C27B0"
                onPress={() => console.log('Bookings clicked')}
              />
            </View>

            <View style={styles.revenueCard}>
              <Text style={styles.revenueTitle}>Monthly Revenue</Text>
              <Text style={styles.revenueAmount}>
                ₹{(dashboardData.revenue / 100000).toFixed(1)}L
              </Text>
              <Text style={styles.revenueGrowth}>+15% from last month</Text>
            </View>

            <View style={styles.quickActions}>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="add-circle" size={24} color={colors.priceBlue} />
                <Text style={styles.actionText}>Add New Vendor</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="megaphone" size={24} color={colors.priceGreen} />
                <Text style={styles.actionText}>Create Promotion</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="analytics" size={24} color={colors.priceYellow} />
                <Text style={styles.actionText}>View Analytics</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {selectedTab === 'approvals' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pending Approvals ({pendingItems.length})</Text>
            
            {pendingItems.map((item) => (
              <PendingItem
                key={item.id}
                title={item.title}
                subtitle={item.subtitle}
                type={item.type}
                onApprove={() => handleApprove(item.id, item.type)}
                onReject={() => handleReject(item.id, item.type)}
              />
            ))}
          </View>
        )}

        {selectedTab === 'vendors' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vendor Management</Text>
            
            <View style={styles.vendorStats}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>2,500</Text>
                <Text style={styles.statLabel}>Total Vendors</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>45</Text>
                <Text style={styles.statLabel}>Pending</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>2,455</Text>
                <Text style={styles.statLabel}>Active</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.manageButton}>
              <Text style={styles.manageButtonText}>View All Vendors</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  
  // Login Styles
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loginForm: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
    marginTop: 20,
    marginBottom: 5,
  },
  loginSubtitle: {
    fontSize: 16,
    color: colors.priceYellow,
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    width: '100%',
  },
  input: {
    flex: 1,
    color: colors.white,
    fontSize: 16,
    marginLeft: 10,
  },
  loginButton: {
    backgroundColor: colors.priceYellow,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkGray,
  },
  demoText: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.7,
    marginTop: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    padding: 10,
  },
  backButtonText: {
    color: colors.white,
    marginLeft: 5,
    fontSize: 16,
  },

  // Header Styles
  header: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  logoutButton: {
    padding: 8,
  },

  // Tab Styles
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.lightGray,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: colors.white,
    borderBottomWidth: 3,
    borderBottomColor: colors.priceBlue,
  },
  tabText: {
    fontSize: 16,
    color: colors.darkGray,
    opacity: 0.6,
  },
  activeTabText: {
    opacity: 1,
    fontWeight: 'bold',
  },

  // Content Styles
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.darkGray,
    marginBottom: 20,
  },

  // Dashboard Styles
  statsGrid: {
    marginBottom: 20,
  },
  adminCard: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkGray,
    marginLeft: 10,
  },
  cardCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.darkGray,
  },
  revenueCard: {
    backgroundColor: colors.priceGreen,
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  revenueTitle: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.9,
  },
  revenueAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.white,
    marginVertical: 5,
  },
  revenueGrowth: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.8,
  },
  quickActions: {
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  actionText: {
    fontSize: 16,
    color: colors.darkGray,
    marginLeft: 15,
  },

  // Approvals Styles
  pendingItem: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  pendingInfo: {
    flex: 1,
  },
  pendingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkGray,
  },
  pendingSubtitle: {
    fontSize: 14,
    color: colors.darkGray,
    opacity: 0.7,
    marginVertical: 2,
  },
  pendingType: {
    fontSize: 12,
    color: colors.priceBlue,
    fontWeight: 'bold',
  },
  pendingActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  approveButton: {
    backgroundColor: colors.priceGreen,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  rejectButton: {
    backgroundColor: '#ff4444',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Vendor Styles
  vendorStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.darkGray,
  },
  statLabel: {
    fontSize: 14,
    color: colors.darkGray,
    opacity: 0.7,
    marginTop: 5,
  },
  manageButton: {
    backgroundColor: colors.priceBlue,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  manageButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
});

export default AdminPanel;