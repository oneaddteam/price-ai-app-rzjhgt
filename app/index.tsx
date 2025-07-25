import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
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
    if (typeof window !== 'undefined' && (window as any).deferredPrompt) {
      (window as any).deferredPrompt.prompt();
      (window as any).deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        }
        (window as any).deferredPrompt = null;
        setCanInstall(false);
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#1e4a72', '#2d5aa0']} style={styles.gradient}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Ionicons name="pricetag" size={64} color="#FFD700" />
            <Text style={styles.title}>PRICE.AI</Text>
            <Text style={styles.subtitle}>
              Pan India AI-Powered Smart Pricing & Lifestyle Assistant
            </Text>
            <Text style={styles.tagline}>
              "விலை தெரிந்து வாங்குவது வீரம்!"
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => router.push('/priceai')}
            >
              <Ionicons name="globe" size={20} color="#1e4a72" />
              <Text style={styles.primaryButtonText}>Explore PRICE.AI</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={() => router.push('/admin')}
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
          </View>

          <View style={styles.features}>
            <View style={styles.featureItem}>
              <Ionicons name="search" size={24} color="#FFD700" />
              <Text style={styles.featureText}>Smart Price Search</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="analytics" size={24} color="#FFD700" />
              <Text style={styles.featureText}>AI Budget Planner</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="airplane" size={24} color="#FFD700" />
              <Text style={styles.featureText}>Travel Booking</Text>
            </View>
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
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    gap: 20,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
});

export default MainScreen;