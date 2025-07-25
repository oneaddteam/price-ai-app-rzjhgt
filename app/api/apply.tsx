import React from 'react';
import { View, Text } from 'react-native';

// API endpoint simulation for vendor/user applications
export const applyAPI = async (applicationData: any) => {
  console.log('Apply API called with:', applicationData);
  
  try {
    // Simulate database storage
    const application = {
      id: Date.now(),
      ...applicationData,
      submittedAt: new Date().toISOString(),
      status: applicationData.type === 'user' ? 'approved' : 'pending'
    };
    
    // Auto-assign to regional admin based on city
    const regionMapping: { [key: string]: string } = {
      'Chennai': 'admin.chennai@priceai.com',
      'Madurai': 'admin.tn@priceai.com',
      'Coimbatore': 'admin.tn@priceai.com',
      'Salem': 'admin.tn@priceai.com',
      'Trichy': 'admin.tn@priceai.com'
    };
    
    const assignedAdmin = regionMapping[applicationData.city] || 'oneaddteam@gmail.com';
    
    // Simulate sending notifications
    console.log(`Notification sent to admin: ${assignedAdmin}`);
    console.log(`SMS sent to applicant: ${applicationData.mobile}`);
    console.log(`Email notification sent`);
    
    // For vendors, add to pending queue
    if (applicationData.type === 'vendor') {
      // Add to pending_requests table simulation
      console.log('Added to pending vendor requests');
    }
    
    // For users, auto-approve and add to users table
    if (applicationData.type === 'user') {
      console.log('User auto-approved and added to users table');
    }
    
    return {
      success: true,
      application,
      message: applicationData.type === 'user' 
        ? 'User registered successfully' 
        : 'Vendor application submitted for review'
    };
    
  } catch (error) {
    console.error('Apply API error:', error);
    return {
      success: false,
      message: 'Failed to process application'
    };
  }
};

// Component for API documentation
const ApplyAPI: React.FC = () => {
  return (
    <View>
      <Text>Apply API Endpoint</Text>
      <Text>POST /api/apply</Text>
      <Text>Body: {JSON.stringify({ 
        type: 'vendor|user',
        name: 'string',
        mobile: 'string',
        city: 'string',
        // ... other fields
      })}</Text>
    </View>
  );
};

export default ApplyAPI;