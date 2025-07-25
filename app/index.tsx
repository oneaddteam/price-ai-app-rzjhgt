import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Alert, Linking } from 'react-native';
import { commonStyles, buttonStyles } from '../styles/commonStyles';
import Button from '../components/Button';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface global {
  Window: {
    handleInstallClick: () => void;
    canInstall: boolean;
  };
}

const MainScreen: React.FC = () => {
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    console.log('MainScreen mounted');
    
    // Check if PWA can be installed
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        setCanInstall(true);
        (window as any).deferredPrompt = e;
      });
    }
  }, []);

  const handleInstallPWA = () => {
    console.log('Install PWA button pressed');
    if (typeof window !== 'undefined' && (window as any).deferredPrompt) {
      (window as any).deferredPrompt.prompt();
      (window as any).deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
          Alert.alert('Success', 'PRICE.AI has been installed successfully!');
        }
        (window as any).deferredPrompt = null;
        setCanInstall(false);
      });
    } else {
      Alert.alert('Install PRICE.AI', 'Add to home screen for better experience!');
    }
  };

  const handleExploreApp = () => {
    console.log('Explore PRICE.AI button pressed');
    router.push('/priceai');
  };

  const handleAdminPanel = () => {
    console.log('Admin Panel button pressed');
    router.push('/admin');
  };

  const handleContactUs = () => {
    console.log('Contact us pressed');
    Alert.alert('Contact PRICE.AI', 'Choose contact method:', [
      { text: 'Call', onPress: () => Linking.openURL('tel:08883800038') },
      { text: 'Email', onPress: () => Linking.openURL('mailto:price.ai@gmail.com') },
      { text: 'WhatsApp', onPress: () => Linking.openURL('https://wa.me/918883800038') },
      { text: 'Cancel', style: 'cancel' }
    ]);
  };

  const handleFeaturePress = (feature: string) => {
    console.log(`${feature} feature pressed`);
    switch (feature) {
      case 'search':
        Alert.alert('Smart Price Search', 'Find best prices across local & online stores instantly. Coming soon in full app!');
        break;
      case 'budget':
        Alert.alert('AI Budget Planner', 'Track expenses & get personalized saving tips. Coming soon in full app!');
        break;
      case 'travel':
        Alert.alert('Travel Booking', 'Book trains, buses, hotels, cinema tickets. Coming soon in full app!');
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#1e4a72', '#2d5aa0']} style={styles.gradient}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.logoContainer} onPress={() => console.log('Logo pressed')}>
            <Ionicons name="pricetag" size={64} color="#FFD700" />
            <Text style={styles.title}>PRICE.AI</Text>
            <Text style={styles.subtitle}>
              Pan India AI-Powered Smart Pricing & Lifestyle Assistant
            </Text>
            <Text style={styles.tagline}>
              "விலை தெரிந்து வாங்குவது வீரம்!"
            </Text>
          </TouchableOpacity>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={handleExploreApp}
            >
              <Ionicons name="globe" size={20} color="#1e4a72" />
              <Text style={styles.primaryButtonText}>Explore PRICE.AI</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={handleAdminPanel}
            >
              <Ionicons name="settings" size={20} color="#FFD700" />
              <Text style={styles.secondaryButtonText}>Admin Panel</Text>
            </TouchableOpacity>

            {canInstall && (
              <TouchableOpacity 
                style={styles.installButton}
                onPress={handleInstallPWA}
              >
                <Ionicons name="download" size={20} color="#fff" />
                <Text style={styles.installButtonText}>Install App</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity 
              style={styles.contactButton}
              onPress={handleContactUs}
            >
              <Ionicons name="call" size={20} color="#1e4a72" />
              <Text style={styles.contactButtonText}>Contact Us</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.features}>
            <TouchableOpacity style={styles.featureItem} onPress={() => handleFeaturePress('search')}>
              <Ionicons name="search" size={24} color="#FFD700" />
              <Text style={styles.featureText}>Smart Price Search</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featureItem} onPress={() => handleFeaturePress('budget')}>
              <Ionicons name="analytics" size={24} color="#FFD700" />
              <Text style={styles.featureText}>AI Budget Planner</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featureItem} onPress={() => handleFeaturePress('travel')}>
              <Ionicons name="airplane" size={24} color="#FFD700" />
              <Text style={styles.featureText}>Travel Booking</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>ONE ADD TEAM • Madurai, Tamil Nadu</Text>
            <TouchableOpacity onPress={() => Linking.openURL('mailto:price.ai@gmail.com')}>
              <Text style={styles.footerLink}>price.ai@gmail.com</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFD700',
    marginTop: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 24,
  },
  tagline: {
    fontSize: 18,
    color: '#FFD700',
    textAlign: 'center',
    marginTop: 12,
    fontStyle: 'italic',
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#FFD700',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    gap: 8,
  },
  primaryButtonText: {
    color: '#1e4a72',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFD700',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    gap: 8,
  },
  secondaryButtonText: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
  },
  installButton: {
    backgroundColor: '#4ECDC4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    gap: 8,
  },
  installButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactButton: {
    backgroundColor: '#96CEB4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    gap: 8,
  },
  contactButtonText: {
    color: '#1e4a72',
    fontSize: 18,
    fontWeight: 'bold',
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    gap: 20,
    marginBottom: 40,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  featureText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    gap: 4,
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.8,
  },
  footerLink: {
    color: '#FFD700',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
});

export default MainScreen;