import React from 'react';
import { View, Text } from 'react-native';

// API endpoint simulation for loan services
export const loansAPI = async (loanData: any) => {
  console.log('Loans API called with:', loanData);
  
  try {
    // Validate required fields
    const requiredFields = ['amount', 'purpose', 'income', 'employment'];
    for (const field of requiredFields) {
      if (!loanData[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
    
    // Simulate loan eligibility check
    const eligibilityScore = calculateEligibilityScore(loanData);
    
    // Simulate partner bank offers
    const loanOffers = [
      {
        bankName: 'HDFC Bank',
        loanType: 'Personal Loan',
        interestRate: 10.5,
        maxAmount: Math.min(loanData.amount, loanData.income * 10),
        tenure: '12-60 months',
        processingFee: '2%',
        eligibility: eligibilityScore > 70 ? 'Eligible' : 'Not Eligible'
      },
      {
        bankName: 'ICICI Bank',
        loanType: 'Personal Loan',
        interestRate: 11.0,
        maxAmount: Math.min(loanData.amount, loanData.income * 8),
        tenure: '12-48 months',
        processingFee: '1.5%',
        eligibility: eligibilityScore > 65 ? 'Eligible' : 'Not Eligible'
      },
      {
        bankName: 'SBI',
        loanType: 'Personal Loan',
        interestRate: 9.8,
        maxAmount: Math.min(loanData.amount, loanData.income * 12),
        tenure: '12-72 months',
        processingFee: '1%',
        eligibility: eligibilityScore > 75 ? 'Eligible' : 'Not Eligible'
      }
    ];
    
    const response = {
      id: 'LOAN' + Date.now(),
      ...loanData,
      eligibilityScore,
      offers: loanOffers.filter(offer => offer.eligibility === 'Eligible'),
      allOffers: loanOffers,
      status: 'processed',
      processedAt: new Date().toISOString()
    };
    
    console.log('Loan eligibility processed:', response.id);
    
    return {
      success: true,
      data: response,
      message: 'Loan eligibility check completed'
    };
    
  } catch (error) {
    console.error('Loans API error:', error);
    return {
      success: false,
      message: error.message || 'Failed to process loan request'
    };
  }
};

// Helper function to calculate eligibility score
function calculateEligibilityScore(loanData: any): number {
  let score = 50; // Base score
  
  // Income factor
  if (loanData.income > 50000) score += 20;
  else if (loanData.income > 30000) score += 15;
  else if (loanData.income > 20000) score += 10;
  
  // Employment factor
  if (loanData.employment === 'Salaried') score += 15;
  else if (loanData.employment === 'Business') score += 10;
  else if (loanData.employment === 'Professional') score += 12;
  
  // Loan amount vs income ratio
  const ratio = loanData.amount / (loanData.income * 12);
  if (ratio < 2) score += 15;
  else if (ratio < 4) score += 10;
  else if (ratio < 6) score += 5;
  
  return Math.min(score, 100);
}

// Component for API documentation
const LoansAPI: React.FC = () => {
  return (
    <View>
      <Text>Loans API Endpoint</Text>
      <Text>POST /api/finance/loans</Text>
      <Text>Body: {JSON.stringify({ 
        amount: 'number',
        purpose: 'string',
        income: 'number',
        employment: 'string',
        age: 'number',
        city: 'string'
      })}</Text>
    </View>
  );
};

export default LoansAPI;