import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import { colors } from '../../styles/commonStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

interface UserForm {
  fullName: string;
  mobile: string;
  email: string;
  city: string;
  pincode: string;
  age: string;
  occupation: string;
  monthlyIncome: string;
  interests: string[];
  preferredLanguage: string;
  familySize: string;
}

const UserApplication: React.FC = () => {
  const [formData, setFormData] = useState<UserForm>({
    fullName: '',
    mobile: '',
    email: '',
    city: '',
    pincode: '',
    age: '',
    occupation: '',
    monthlyIncome: '',
    interests: [],
    preferredLanguage: 'Tamil',
    familySize: '',
  });

  const cities = [
    'Chennai', 'Madurai', 'Coimbatore', 'Salem', 'Trichy', 
    'Tirunelveli', 'Erode', 'Vellore', 'Thoothukudi', 'Dindigul'
  ];

  const languages = [
    'Tamil', 'English', 'Hindi', 'Telugu', 'Malayalam', 'Kannada'
  ];

  const interestOptions = [
    'Groceries', 'Electronics', 'Fashion', 'Healthcare', 'Travel',
    'Food & Dining', 'Home & Garden', 'Automotive', 'Education', 'Entertainment'
  ];

  const occupations = [
    'Student', 'Employee', 'Business Owner', 'Freelancer', 'Homemaker', 
    'Retired', 'Professional', 'Other'
  ];

  const handleInputChange = (field: keyof UserForm, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const validateForm = (): boolean => {
    return !!(
      formData.fullName && 
      formData.mobile && 
      formData.email && 
      formData.city && 
      formData.pincode
    );
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    console.log('Submitting user registration:', formData);
    
    try {
      // Simulate API call
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'user',
          ...formData,
          appliedAt: new Date().toISOString(),
          status: 'approved' // Users are auto-approved
        }),
      });

      Alert.alert(
        'Welcome to PRICE.AI! 🎉',
        'Your account has been created successfully!\n\nYou can now:\n• Search for best prices\n• Set up budget tracking\n• Book travel tickets\n• Get AI recommendations\n\nCheck your mobile for welcome SMS!',
        [
          {
            text: 'Start Using PRICE.AI',
            onPress: () => {
              router.replace('/priceai');
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error registering user:', error);
      Alert.alert('Error', 'Failed to create account. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#1e4a72" />
      
      {/* Header */}
      <LinearGradient colors={['#1e4a72', '#2d5aa0']} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFD700" />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Join PRICE.AI</Text>
            <Text style={styles.headerSubtitle}>Start Smart Shopping</Text>
          </View>
          <View style={styles.freeTag}>
            <Text style={styles.freeText}>FREE</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <View style={styles.welcomeSection}>
            <Ionicons name="person-add" size={48} color="#4ECDC4" />
            <Text style={styles.welcomeTitle}>Create Your Account</Text>
            <Text style={styles.welcomeText}>
              Join thousands of smart shoppers saving money with PRICE.AI
            </Text>
          </View>

          {/* Basic Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Basic Information</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Full Name *"
              value={formData.fullName}
              onChangeText={(text) => handleInputChange('fullName', text)}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Mobile Number *"
              value={formData.mobile}
              onChangeText={(text) => handleInputChange('mobile', text)}
              keyboardType="phone-pad"
              maxLength={10}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Email Address *"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Age"
              value={formData.age}
              onChangeText={(text) => handleInputChange('age', text)}
              keyboardType="numeric"
              maxLength={2}
            />
          </View>

          {/* Location */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>
            
            <Text style={styles.inputLabel}>Select City *</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.citySelector}>
              {cities.map((city) => (
                <TouchableOpacity
                  key={city}
                  style={[
                    styles.cityChip,
                    { backgroundColor: formData.city === city ? '#1e4a72' : '#f0f0f0' }
                  ]}
                  onPress={() => handleInputChange('city', city)}
                >
                  <Text style={[
                    styles.cityChipText,
                    { color: formData.city === city ? '#fff' : '#333' }
                  ]}>{city}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <TextInput
              style={styles.input}
              placeholder="Pincode *"
              value={formData.pincode}
              onChangeText={(text) => handleInputChange('pincode', text)}
              keyboardType="numeric"
              maxLength={6}
            />
          </View>

          {/* Preferences */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            
            <Text style={styles.inputLabel}>Preferred Language</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.languageSelector}>
              {languages.map((language) => (
                <TouchableOpacity
                  key={language}
                  style={[
                    styles.languageChip,
                    { backgroundColor: formData.preferredLanguage === language ? '#4ECDC4' : '#f0f0f0' }
                  ]}
                  onPress={() => handleInputChange('preferredLanguage', language)}
                >
                  <Text style={[
                    styles.languageChipText,
                    { color: formData.preferredLanguage === language ? '#fff' : '#333' }
                  ]}>{language}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.inputLabel}>Occupation</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.occupationSelector}>
              {occupations.map((occupation) => (
                <TouchableOpacity
                  key={occupation}
                  style={[
                    styles.occupationChip,
                    { backgroundColor: formData.occupation === occupation ? '#96CEB4' : '#f0f0f0' }
                  ]}
                  onPress={() => handleInputChange('occupation', occupation)}
                >
                  <Text style={[
                    styles.occupationChipText,
                    { color: formData.occupation === occupation ? '#fff' : '#333' }
                  ]}>{occupation}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <TextInput
              style={styles.input}
              placeholder="Monthly Income (₹) - Optional"
              value={formData.monthlyIncome}
              onChangeText={(text) => handleInputChange('monthlyIncome', text)}
              keyboardType="numeric"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Family Size"
              value={formData.familySize}
              onChangeText={(text) => handleInputChange('familySize', text)}
              keyboardType="numeric"
            />
          </View>

          {/* Interests */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Shopping Interests</Text>
            <Text style={styles.sectionSubtitle}>Select categories you shop for (helps us personalize recommendations)</Text>
            
            <View style={styles.interestsGrid}>
              {interestOptions.map((interest) => (
                <TouchableOpacity
                  key={interest}
                  style={[
                    styles.interestChip,
                    { 
                      backgroundColor: formData.interests.includes(interest) ? '#FFEAA7' : '#f0f0f0',
                      borderColor: formData.interests.includes(interest) ? '#FFD700' : '#ddd'
                    }
                  ]}
                  onPress={() => toggleInterest(interest)}
                >
                  <Text style={[
                    styles.interestChipText,
                    { color: formData.interests.includes(interest) ? '#333' : '#666' }
                  ]}>{interest}</Text>
                  {formData.interests.includes(interest) && (
                    <Ionicons name="checkmark-circle" size={16} color="#FFD700" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Benefits */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What You Get</Text>
            <View style={styles.benefitsContainer}>
              <View style={styles.benefitItem}>
                <Ionicons name="search" size={24} color="#4ECDC4" />
                <Text style={styles.benefitText}>Smart price comparison across 1000+ stores</Text>
              </View>
              <View style={styles.benefitItem}>
                <Ionicons name="analytics" size={24} color="#96CEB4" />
                <Text style={styles.benefitText}>AI-powered budget tracking & savings tips</Text>
              </View>
              <View style={styles.benefitItem}>
                <Ionicons name="airplane" size={24} color="#DDA0DD" />
                <Text style={styles.benefitText}>Easy booking for travel, movies & events</Text>
              </View>
              <View style={styles.benefitItem}>
                <Ionicons name="notifications" size={24} color="#FFEAA7" />
                <Text style={styles.benefitText}>Price drop alerts & deal notifications</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.submitButton, { opacity: validateForm() ? 1 : 0.5 }]} 
            onPress={handleSubmit}
            disabled={!validateForm()}
          >
            <Text style={styles.submitButtonText}>Create My Account</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.termsText}>
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  headerInfo: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 2,
  },
  freeTag: {
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  freeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  citySelector: {
    marginBottom: 20,
  },
  cityChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  cityChipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  languageSelector: {
    marginBottom: 20,
  },
  languageChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  languageChipText: {
    fontSize: 12,
    fontWeight: '500',
  },
  occupationSelector: {
    marginBottom: 20,
  },
  occupationChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  occupationChipText: {
    fontSize: 12,
    fontWeight: '500',
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 8,
    gap: 4,
  },
  interestChipText: {
    fontSize: 12,
    fontWeight: '500',
  },
  benefitsContainer: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  submitButton: {
    backgroundColor: '#1e4a72',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 16,
    gap: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 20,
  },
});

export default UserApplication;