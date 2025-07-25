import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { colors } from '../styles/commonStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

interface FeatureCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  color: string;
}

interface ModeCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  purpose: string;
  color: string;
}

interface VendorApplicationProps {
  name: string;
  mobile: string;
  city: string;
  services: string;
  gst?: string;
  address: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, color }) => (
  <View style={[styles.featureCard, { borderLeftColor: color }]}>
    <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
      <Ionicons name={icon} size={24} color={color} />
    </View>
    <View style={styles.featureContent}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  </View>
);

const ModeCard: React.FC<ModeCardProps> = ({ icon, title, purpose, color }) => (
  <TouchableOpacity style={[styles.modeCard, { backgroundColor: color + '10' }]}>
    <LinearGradient
      colors={[color + '20', color + '10']}
      style={styles.modeGradient}
    >
      <Ionicons name={icon} size={32} color={color} />
      <Text style={[styles.modeTitle, { color }]}>{title}</Text>
      <Text style={styles.modePurpose}>{purpose}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const PriceAIWebsite: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [vendorForm, setVendorForm] = useState<VendorApplicationProps>({
    name: '',
    mobile: '',
    city: '',
    services: '',
    gst: '',
    address: '',
  });
  const [userForm, setUserForm] = useState({
    name: '',
    mobile: '',
    city: '',
    pincode: '',
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleInstallApp = () => {
    if (Platform.OS === 'web') {
      // PWA install prompt
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js');
      }
      Alert.alert('Install PRICE.AI', 'Add to home screen for better experience!');
    }
  };

  const handleDownloadApp = () => {
    Alert.alert('Download PRICE.AI', 'App will be available on Play Store & App Store soon!');
  };

  const handleVendorApply = async () => {
    console.log('Vendor Application:', vendorForm);
    // Here you would typically send to your backend
    Alert.alert('Application Submitted!', 'We will review your application and get back to you within 24 hours.');
    setShowVendorModal(false);
    setVendorForm({
      name: '',
      mobile: '',
      city: '',
      services: '',
      gst: '',
      address: '',
    });
  };

  const handleUserApply = async () => {
    console.log('User Registration:', userForm);
    Alert.alert('Registration Successful!', 'Welcome to PRICE.AI! You can now start using our services.');
    setShowUserModal(false);
    setUserForm({
      name: '',
      mobile: '',
      city: '',
      pincode: '',
    });
  };

  const slides = [
    {
      title: 'விலை தெரிந்து வாங்குவது வீரம்!',
      subtitle: 'Know the price. Own your power.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
    },
    {
      title: 'Save ₹1,000+ Monthly',
      subtitle: 'Smart AI-powered price comparison',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400',
    },
    {
      title: 'All Languages Supported',
      subtitle: 'Tamil, Hindi, Telugu, Malayalam & more',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400',
    },
    {
      title: 'Book Everything',
      subtitle: 'Train, Bus, Hotel, Cinema & more',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400',
    },
  ];

  const features = [
    {
      icon: 'search' as keyof typeof Ionicons.glyphMap,
      title: 'Smart Price Search',
      description: 'Find best prices across local & online stores instantly',
      color: '#FF6B6B',
    },
    {
      icon: 'analytics' as keyof typeof Ionicons.glyphMap,
      title: 'AI Budget Planner',
      description: 'Track expenses & get personalized saving tips',
      color: '#4ECDC4',
    },
    {
      icon: 'refresh' as keyof typeof Ionicons.glyphMap,
      title: 'Routine Automation',
      description: 'Auto-order milk, groceries, medicines',
      color: '#45B7D1',
    },
    {
      icon: 'bulb' as keyof typeof Ionicons.glyphMap,
      title: 'Smart Suggestions',
      description: 'AI recommends best deals & timing',
      color: '#96CEB4',
    },
    {
      icon: 'card' as keyof typeof Ionicons.glyphMap,
      title: 'Finance Assistant',
      description: 'Loans, insurance, investment planning',
      color: '#FFEAA7',
    },
    {
      icon: 'airplane' as keyof typeof Ionicons.glyphMap,
      title: 'Travel Booking',
      description: 'Book trains, buses, hotels, cinema tickets',
      color: '#DDA0DD',
    },
  ];

  const modes = [
    {
      icon: 'search' as keyof typeof Ionicons.glyphMap,
      title: 'Search Mode',
      purpose: 'Area-wise product/service price search',
      color: '#FF6B6B',
    },
    {
      icon: 'trending-up' as keyof typeof Ionicons.glyphMap,
      title: 'Budget Mode',
      purpose: 'Expense tracking, AI savings tips',
      color: '#4ECDC4',
    },
    {
      icon: 'refresh-circle' as keyof typeof Ionicons.glyphMap,
      title: 'Routine Mode',
      purpose: 'Auto booking of repeated needs',
      color: '#45B7D1',
    },
    {
      icon: 'bulb' as keyof typeof Ionicons.glyphMap,
      title: 'Suggest Mode',
      purpose: 'AI recommends best buy options',
      color: '#96CEB4',
    },
    {
      icon: 'calculator' as keyof typeof Ionicons.glyphMap,
      title: 'Finance AI',
      purpose: 'Loans, insurance, financial planner',
      color: '#FFEAA7',
    },
    {
      icon: 'airplane' as keyof typeof Ionicons.glyphMap,
      title: 'Booking Mode',
      purpose: 'Tickets, hotels, cinema, travel',
      color: '#DDA0DD',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#1e4a72" />
      
      {/* Header */}
      <LinearGradient colors={['#1e4a72', '#2d5aa0']} style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <Ionicons name="pricetag" size={32} color="#FFD700" />
            <Text style={styles.logoText}>PRICE.AI</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/admin')} style={styles.adminButton}>
            <Ionicons name="settings" size={24} color="#FFD700" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Carousel */}
        <View style={styles.heroSection}>
          <View style={styles.carousel}>
            <Image
              source={{ uri: slides[currentSlide].image }}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.7)']}
              style={styles.heroOverlay}
            >
              <Text style={styles.heroTitle}>{slides[currentSlide].title}</Text>
              <Text style={styles.heroSubtitle}>{slides[currentSlide].subtitle}</Text>
              <View style={styles.heroButtons}>
                <TouchableOpacity style={styles.primaryButton} onPress={handleInstallApp}>
                  <Ionicons name="download" size={20} color="#fff" />
                  <Text style={styles.buttonText}>Install App</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryButton} onPress={() => setShowUserModal(true)}>
                  <Ionicons name="person-add" size={20} color="#1e4a72" />
                  <Text style={styles.secondaryButtonText}>Join Now</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
          
          {/* Slide Indicators */}
          <View style={styles.indicators}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  { backgroundColor: index === currentSlide ? '#FFD700' : '#ccc' }
                ]}
              />
            ))}
          </View>
        </View>

        {/* Problem Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>The Problem We Solve</Text>
          <View style={styles.problemContainer}>
            <View style={styles.problemItem}>
              <Ionicons name="alert-circle" size={24} color="#FF6B6B" />
              <Text style={styles.problemText}>Inconsistent local prices</Text>
            </View>
            <View style={styles.problemItem}>
              <Ionicons name="help-circle" size={24} color="#FF6B6B" />
              <Text style={styles.problemText}>No trusted price comparison</Text>
            </View>
            <View style={styles.problemItem}>
              <Ionicons name="language" size={24} color="#FF6B6B" />
              <Text style={styles.problemText}>Language barriers</Text>
            </View>
            <View style={styles.problemItem}>
              <Ionicons name="cash" size={24} color="#FF6B6B" />
              <Text style={styles.problemText}>Overpaying due to lack of info</Text>
            </View>
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Powerful Features</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </View>
        </View>

        {/* Modes Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6 Powerful Modes</Text>
          <View style={styles.modesGrid}>
            {modes.map((mode, index) => (
              <ModeCard key={index} {...mode} />
            ))}
          </View>
        </View>

        {/* Value Proposition */}
        <View style={[styles.section, { backgroundColor: '#f8f9fa' }]}>
          <Text style={styles.sectionTitle}>Why India Needs PRICE.AI</Text>
          <View style={styles.valueGrid}>
            <View style={styles.valueItem}>
              <Ionicons name="trending-down" size={32} color="#4ECDC4" />
              <Text style={styles.valueTitle}>Save ₹1,000+/month</Text>
              <Text style={styles.valueText}>On daily shopping</Text>
            </View>
            <View style={styles.valueItem}>
              <Ionicons name="shield-checkmark" size={32} color="#96CEB4" />
              <Text style={styles.valueTitle}>True Pricing</Text>
              <Text style={styles.valueText}>From local & online</Text>
            </View>
            <View style={styles.valueItem}>
              <Ionicons name="language" size={32} color="#FFEAA7" />
              <Text style={styles.valueTitle}>All Languages</Text>
              <Text style={styles.valueText}>Tamil, Hindi & more</Text>
            </View>
            <View style={styles.valueItem}>
              <Ionicons name="heart" size={32} color="#DDA0DD" />
              <Text style={styles.valueTitle}>Elderly Friendly</Text>
              <Text style={styles.valueText}>Voice + photo input</Text>
            </View>
          </View>
        </View>

        {/* Join Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Join the Revolution</Text>
          <View style={styles.joinContainer}>
            <TouchableOpacity
              style={[styles.joinCard, { backgroundColor: '#FF6B6B20' }]}
              onPress={() => setShowVendorModal(true)}
            >
              <Ionicons name="storefront" size={48} color="#FF6B6B" />
              <Text style={styles.joinTitle}>Become a Vendor</Text>
              <Text style={styles.joinText}>List your products & reach more customers</Text>
              <Text style={styles.joinPrice}>₹499/month</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.joinCard, { backgroundColor: '#4ECDC420' }]}
              onPress={() => setShowUserModal(true)}
            >
              <Ionicons name="person" size={48} color="#4ECDC4" />
              <Text style={styles.joinTitle}>Join as User</Text>
              <Text style={styles.joinText}>Start saving money with smart shopping</Text>
              <Text style={styles.joinPrice}>Free to start</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Contact Section */}
        <LinearGradient colors={['#1e4a72', '#2d5aa0']} style={styles.contactSection}>
          <Text style={styles.contactTitle}>Ready to Transform Your Shopping?</Text>
          <Text style={styles.contactSubtitle}>
            "Know the price. Own your power. PRICE.AI is not just an app. It's a revolution in your palm."
          </Text>
          
          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <Ionicons name="call" size={20} color="#FFD700" />
              <Text style={styles.contactText}>08883800038</Text>
            </View>
            <View style={styles.contactItem}>
              <Ionicons name="mail" size={20} color="#FFD700" />
              <Text style={styles.contactText}>price.ai@gmail.com</Text>
            </View>
            <View style={styles.contactItem}>
              <Ionicons name="location" size={20} color="#FFD700" />
              <Text style={styles.contactText}>Madurai, Tamil Nadu</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.ctaButton} onPress={handleDownloadApp}>
            <Text style={styles.ctaButtonText}>Download PRICE.AI Now</Text>
            <Ionicons name="arrow-forward" size={20} color="#1e4a72" />
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>

      {/* Vendor Application Modal */}
      <Modal visible={showVendorModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Vendor Application</Text>
              <TouchableOpacity onPress={() => setShowVendorModal(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalForm}>
              <TextInput
                style={styles.input}
                placeholder="Business Name"
                value={vendorForm.name}
                onChangeText={(text) => setVendorForm({ ...vendorForm, name: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                value={vendorForm.mobile}
                onChangeText={(text) => setVendorForm({ ...vendorForm, mobile: text })}
                keyboardType="phone-pad"
              />
              <TextInput
                style={styles.input}
                placeholder="City"
                value={vendorForm.city}
                onChangeText={(text) => setVendorForm({ ...vendorForm, city: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Services/Products"
                value={vendorForm.services}
                onChangeText={(text) => setVendorForm({ ...vendorForm, services: text })}
                multiline
              />
              <TextInput
                style={styles.input}
                placeholder="GST Number (Optional)"
                value={vendorForm.gst}
                onChangeText={(text) => setVendorForm({ ...vendorForm, gst: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Address"
                value={vendorForm.address}
                onChangeText={(text) => setVendorForm({ ...vendorForm, address: text })}
                multiline
              />
              
              <TouchableOpacity style={styles.submitButton} onPress={handleVendorApply}>
                <Text style={styles.submitButtonText}>Submit Application</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* User Registration Modal */}
      <Modal visible={showUserModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Join PRICE.AI</Text>
              <TouchableOpacity onPress={() => setShowUserModal(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalForm}>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={userForm.name}
                onChangeText={(text) => setUserForm({ ...userForm, name: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                value={userForm.mobile}
                onChangeText={(text) => setUserForm({ ...userForm, mobile: text })}
                keyboardType="phone-pad"
              />
              <TextInput
                style={styles.input}
                placeholder="City"
                value={userForm.city}
                onChangeText={(text) => setUserForm({ ...userForm, city: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Pincode"
                value={userForm.pincode}
                onChangeText={(text) => setUserForm({ ...userForm, pincode: text })}
                keyboardType="numeric"
              />
              
              <TouchableOpacity style={styles.submitButton} onPress={handleUserApply}>
                <Text style={styles.submitButtonText}>Join PRICE.AI</Text>
              </TouchableOpacity>
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
    backgroundColor: '#fff',
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
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginLeft: 8,
  },
  adminButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    height: height * 0.5,
    position: 'relative',
  },
  carousel: {
    flex: 1,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    justifyContent: 'flex-end',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  heroButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#FF6B6B',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#1e4a72',
    fontWeight: '600',
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e4a72',
    marginBottom: 20,
    textAlign: 'center',
  },
  problemContainer: {
    gap: 16,
  },
  problemItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  problemText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  featuresGrid: {
    gap: 16,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    gap: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  modesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  modeCard: {
    width: (width - 60) / 2,
    borderRadius: 16,
    overflow: 'hidden',
  },
  modeGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 140,
    justifyContent: 'center',
  },
  modeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  modePurpose: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  valueGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  valueItem: {
    width: (width - 60) / 2,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  valueTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  valueText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  joinContainer: {
    gap: 16,
  },
  joinCard: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  joinTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  joinText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 12,
  },
  joinPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  contactSection: {
    padding: 24,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  contactSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  contactInfo: {
    gap: 12,
    marginBottom: 24,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contactText: {
    color: '#fff',
    fontSize: 16,
  },
  ctaButton: {
    backgroundColor: '#FFD700',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 30,
    gap: 8,
  },
  ctaButtonText: {
    color: '#1e4a72',
    fontSize: 18,
    fontWeight: 'bold',
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
    maxHeight: height * 0.8,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalForm: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#1e4a72',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PriceAIWebsite;