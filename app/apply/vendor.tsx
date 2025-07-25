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

interface VendorForm {
  businessName: string;
  ownerName: string;
  mobile: string;
  email: string;
  city: string;
  pincode: string;
  address: string;
  businessType: string;
  services: string;
  gstNumber: string;
  panNumber: string;
  bankAccount: string;
  ifscCode: string;
  experience: string;
  expectedRevenue: string;
}

const VendorApplication: React.FC = () => {
  const [formData, setFormData] = useState<VendorForm>({
    businessName: '',
    ownerName: '',
    mobile: '',
    email: '',
    city: '',
    pincode: '',
    address: '',
    businessType: '',
    services: '',
    gstNumber: '',
    panNumber: '',
    bankAccount: '',
    ifscCode: '',
    experience: '',
    expectedRevenue: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const businessTypes = [
    'Retail Store',
    'Wholesale',
    'Restaurant/Food',
    'Electronics',
    'Grocery/Supermarket',
    'Fashion/Clothing',
    'Healthcare/Pharmacy',
    'Automotive',
    'Home & Garden',
    'Services',
    'Other'
  ];

  const cities = [
    'Chennai', 'Madurai', 'Coimbatore', 'Salem', 'Trichy', 
    'Tirunelveli', 'Erode', 'Vellore', 'Thoothukudi', 'Dindigul'
  ];

  const handleInputChange = (field: keyof VendorForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.businessName && formData.ownerName && formData.mobile && formData.email);
      case 2:
        return !!(formData.city && formData.pincode && formData.address);
      case 3:
        return !!(formData.businessType && formData.services);
      case 4:
        return true; // Optional fields
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(prev => prev + 1);
      } else {
        handleSubmit();
      }
    } else {
      Alert.alert('Error', 'Please fill all required fields');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    console.log('Submitting vendor application:', formData);
    
    try {
      // Simulate API call
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'vendor',
          ...formData,
          appliedAt: new Date().toISOString(),
          status: 'pending'
        }),
      });

      Alert.alert(
        'Application Submitted Successfully!',
        'Thank you for applying to become a PRICE.AI vendor. Our team will review your application and contact you within 24-48 hours.\n\nYou will receive:\n• SMS confirmation\n• Email with next steps\n• Call from our team',
        [
          {
            text: 'OK',
            onPress: () => router.back()
          }
        ]
      );
    } catch (error) {
      console.error('Error submitting application:', error);
      Alert.alert('Error', 'Failed to submit application. Please try again.');
    }
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Basic Information</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Business Name *"
        value={formData.businessName}
        onChangeText={(text) => handleInputChange('businessName', text)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Owner/Manager Name *"
        value={formData.ownerName}
        onChangeText={(text) => handleInputChange('ownerName', text)}
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
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Location Details</Text>
      
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
      
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Complete Address *"
        value={formData.address}
        onChangeText={(text) => handleInputChange('address', text)}
        multiline
        numberOfLines={4}
      />
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Business Details</Text>
      
      <Text style={styles.inputLabel}>Business Type *</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeSelector}>
        {businessTypes.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.typeChip,
              { backgroundColor: formData.businessType === type ? '#1e4a72' : '#f0f0f0' }
            ]}
            onPress={() => handleInputChange('businessType', type)}
          >
            <Text style={[
              styles.typeChipText,
              { color: formData.businessType === type ? '#fff' : '#333' }
            ]}>{type}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Products/Services you offer *"
        value={formData.services}
        onChangeText={(text) => handleInputChange('services', text)}
        multiline
        numberOfLines={4}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Years of Experience"
        value={formData.experience}
        onChangeText={(text) => handleInputChange('experience', text)}
        keyboardType="numeric"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Expected Monthly Revenue (₹)"
        value={formData.expectedRevenue}
        onChangeText={(text) => handleInputChange('expectedRevenue', text)}
        keyboardType="numeric"
      />
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Legal & Banking (Optional)</Text>
      
      <TextInput
        style={styles.input}
        placeholder="GST Number (if applicable)"
        value={formData.gstNumber}
        onChangeText={(text) => handleInputChange('gstNumber', text)}
        autoCapitalize="characters"
      />
      
      <TextInput
        style={styles.input}
        placeholder="PAN Number"
        value={formData.panNumber}
        onChangeText={(text) => handleInputChange('panNumber', text)}
        autoCapitalize="characters"
        maxLength={10}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Bank Account Number"
        value={formData.bankAccount}
        onChangeText={(text) => handleInputChange('bankAccount', text)}
        keyboardType="numeric"
      />
      
      <TextInput
        style={styles.input}
        placeholder="IFSC Code"
        value={formData.ifscCode}
        onChangeText={(text) => handleInputChange('ifscCode', text)}
        autoCapitalize="characters"
      />
      
      <View style={styles.infoBox}>
        <Ionicons name="information-circle" size={20} color="#4ECDC4" />
        <Text style={styles.infoText}>
          These details help us process payments faster. You can update them later from your vendor dashboard.
        </Text>
      </View>
    </View>
  );

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
            <Text style={styles.headerTitle}>Vendor Application</Text>
            <Text style={styles.headerSubtitle}>Join PRICE.AI Network</Text>
          </View>
          <View style={styles.stepIndicator}>
            <Text style={styles.stepText}>{currentStep}/{totalSteps}</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${(currentStep / totalSteps) * 100}%` }]} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        {currentStep > 1 && (
          <TouchableOpacity style={styles.previousButton} onPress={handlePrevious}>
            <Ionicons name="chevron-back" size={20} color="#666" />
            <Text style={styles.previousButtonText}>Previous</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={[styles.nextButton, { opacity: validateStep(currentStep) ? 1 : 0.5 }]} 
          onPress={handleNext}
          disabled={!validateStep(currentStep)}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === totalSteps ? 'Submit Application' : 'Next'}
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
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
  stepIndicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  stepText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  progressContainer: {
    height: 4,
    backgroundColor: '#e0e0e0',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4ECDC4',
  },
  scrollView: {
    flex: 1,
  },
  stepContainer: {
    padding: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
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
  typeSelector: {
    marginBottom: 20,
  },
  typeChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  typeChipText: {
    fontSize: 12,
    fontWeight: '500',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#f0f9ff',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    gap: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  previousButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    gap: 4,
  },
  previousButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e4a72',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 4,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default VendorApplication;