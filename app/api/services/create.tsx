import React from 'react';
import { View, Text } from 'react-native';

// API endpoint simulation for creating services
export const createServiceAPI = async (serviceData: any) => {
  console.log('Create Service API called with:', serviceData);
  
  try {
    // Validate required fields
    const requiredFields = ['name', 'category', 'price', 'vendorId', 'location'];
    for (const field of requiredFields) {
      if (!serviceData[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
    
    // Simulate service creation
    const service = {
      id: Date.now(),
      ...serviceData,
      createdAt: new Date().toISOString(),
      status: 'approved', // Services are auto-approved
      bookings: 0,
      rating: 0,
      reviews: [],
      availability: serviceData.availability || '24/7'
    };
    
    // Add to services database
    console.log('Service added to database:', service.id);
    
    // Send confirmation to vendor
    console.log('Service creation confirmation sent to vendor');
    
    return {
      success: true,
      service,
      message: 'Service created successfully'
    };
    
  } catch (error) {
    console.error('Create Service API error:', error);
    return {
      success: false,
      message: error.message || 'Failed to create service'
    };
  }
};

// Component for API documentation
const CreateServiceAPI: React.FC = () => {
  return (
    <View>
      <Text>Create Service API Endpoint</Text>
      <Text>POST /api/services/create</Text>
      <Text>Body: {JSON.stringify({ 
        name: 'string',
        category: 'string',
        price: 'number',
        vendorId: 'string',
        description: 'string',
        location: 'string',
        availability: 'string'
      })}</Text>
    </View>
  );
};

export default CreateServiceAPI;