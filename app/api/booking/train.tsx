import React from 'react';
import { View, Text } from 'react-native';

// API endpoint simulation for train booking
export const trainBookingAPI = async (bookingData: any) => {
  console.log('Train Booking API called with:', bookingData);
  
  try {
    // Validate required fields
    const requiredFields = ['from', 'to', 'date', 'passengers', 'class'];
    for (const field of requiredFields) {
      if (!bookingData[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
    
    // Simulate IRCTC API integration
    const trains = [
      {
        trainNumber: '12635',
        trainName: 'Vaigai Express',
        departure: '06:00',
        arrival: '14:30',
        duration: '8h 30m',
        price: 450,
        availability: 'Available'
      },
      {
        trainNumber: '12637',
        trainName: 'Pandian Express',
        departure: '21:45',
        arrival: '05:15',
        duration: '7h 30m',
        price: 420,
        availability: 'RAC'
      },
      {
        trainNumber: '16128',
        trainName: 'Guruvayur Express',
        departure: '15:30',
        arrival: '23:45',
        duration: '8h 15m',
        price: 380,
        availability: 'Waiting List'
      }
    ];
    
    // Simulate booking process
    const booking = {
      id: 'PNR' + Date.now(),
      ...bookingData,
      trains: trains,
      status: 'confirmed',
      bookingDate: new Date().toISOString(),
      totalAmount: trains[0].price * bookingData.passengers.length
    };
    
    console.log('Train booking created:', booking.id);
    
    return {
      success: true,
      booking,
      message: 'Train booking search completed'
    };
    
  } catch (error) {
    console.error('Train Booking API error:', error);
    return {
      success: false,
      message: error.message || 'Failed to search trains'
    };
  }
};

// Component for API documentation
const TrainBookingAPI: React.FC = () => {
  return (
    <View>
      <Text>Train Booking API Endpoint</Text>
      <Text>POST /api/booking/train</Text>
      <Text>Body: {JSON.stringify({ 
        from: 'string',
        to: 'string',
        date: 'string',
        passengers: 'array',
        class: 'string'
      })}</Text>
    </View>
  );
};

export default TrainBookingAPI;