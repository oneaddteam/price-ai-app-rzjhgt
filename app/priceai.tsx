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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../styles/commonStyles';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

interface FeatureCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, color }) => (
  <View style={[styles.featureCard, { borderLeftColor: color }]}>
    <View style={styles.featureHeader}>
      <Ionicons name={icon} size={24} color={color} />
      <Text style={styles.featureTitle}>{title}</Text>
    </View>
    <Text style={styles.featureDescription}>{description}</Text>
  </View>
);

interface ModeCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  purpose: string;
  color: string;
}

const ModeCard: React.FC<ModeCardProps> = ({ icon, title, purpose, color }) => (
  <View style={styles.modeCard}>
    <View style={[styles.modeIcon, { backgroundColor: color }]}>
      <Ionicons name={icon} size={28} color={colors.white} />
    </View>
    <Text style={styles.modeTitle}>{title}</Text>
    <Text style={styles.modePurpose}>{purpose}</Text>
  </View>
);

const PriceAIWebsite: React.FC = () => {
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    // Check if PWA can be installed
    if (Platform.OS === 'web') {
      const handleBeforeInstallPrompt = (e: any) => {
        e.preventDefault();
        setIsInstallable(true);
      };
      
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      
      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    }
  }, []);

  const handleInstallApp = () => {
    console.log('Install app clicked');
    // PWA installation logic would go here
  };

  const handleDownloadApp = () => {
    console.log('Download app clicked');
    // App store redirect logic would go here
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor={colors.priceBlue} />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Hero Section */}
        <LinearGradient
          colors={[colors.priceBlue, '#2a5a8a']}
          style={styles.heroSection}
        >
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>PRICE.AI</Text>
            <Text style={styles.heroSubtitle}>
              Pan India AI-Powered Smart Pricing & Lifestyle Assistant
            </Text>
            <Text style={styles.heroTagline}>
              "விலை தெரிந்து வாங்குவது வீரம்!"
            </Text>
            
            {/* Hero Image Placeholder */}
            <View style={styles.heroImageContainer}>
              <View style={styles.phoneFrame}>
                <View style={styles.phoneScreen}>
                  <Ionicons name="search" size={40} color={colors.priceBlue} />
                  <Text style={styles.phoneText}>Search Tomato</Text>
                  <View style={styles.priceComparison}>
                    <Text style={styles.priceText}>Store A: ₹40/kg</Text>
                    <Text style={styles.priceText}>Store B: ₹35/kg</Text>
                    <Text style={[styles.priceText, { color: colors.priceGreen }]}>
                      Store C: ₹30/kg ✓
                    </Text>
                  </View>
                </View>
              </View>
              
              {/* Man with phone illustration placeholder */}
              <View style={styles.manIllustration}>
                <View style={styles.manFace}>
                  <Ionicons name="person" size={60} color={colors.priceYellow} />
                </View>
                <View style={styles.speechBubble}>
                  <Text style={styles.speechText}>Know the price. Feel NICE!</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.ctaButton} onPress={handleDownloadApp}>
              <Text style={styles.ctaButtonText}>Download Now</Text>
              <Ionicons name="download" size={20} color={colors.white} />
            </TouchableOpacity>
            
            <Text style={styles.languageText}>
              Available in Tamil | Hindi | English
            </Text>
          </View>
        </LinearGradient>

        {/* Problem Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>The Everyday Consumer Struggles</Text>
          <View style={styles.problemList}>
            <View style={styles.problemItem}>
              <Ionicons name="close-circle" size={20} color="#ff4444" />
              <Text style={styles.problemText}>Inconsistent local prices for essentials</Text>
            </View>
            <View style={styles.problemItem}>
              <Ionicons name="close-circle" size={20} color="#ff4444" />
              <Text style={styles.problemText}>No trusted source to compare deals</Text>
            </View>
            <View style={styles.problemItem}>
              <Ionicons name="close-circle" size={20} color="#ff4444" />
              <Text style={styles.problemText}>Language and tech barriers</Text>
            </View>
            <View style={styles.problemItem}>
              <Ionicons name="close-circle" size={20} color="#ff4444" />
              <Text style={styles.problemText}>Overpaying due to lack of real-time info</Text>
            </View>
          </View>
        </View>

        {/* Solution Section */}
        <LinearGradient
          colors={[colors.lightGray, colors.white]}
          style={styles.section}
        >
          <Text style={[styles.sectionTitle, { color: colors.darkGray }]}>
            PRICE.AI - One App for All Smart Spending
          </Text>
          <View style={styles.solutionGrid}>
            <FeatureCard
              icon="search"
              title="Smart Search"
              description="One-click product & price search by area or pincode"
              color={colors.priceBlue}
            />
            <FeatureCard
              icon="bulb"
              title="AI Suggestions"
              description="AI-powered deal suggestions with reasons"
              color={colors.priceYellow}
            />
            <FeatureCard
              icon="calendar"
              title="Budget Planning"
              description="Daily & monthly budget planning with AI tips"
              color={colors.priceGreen}
            />
            <FeatureCard
              icon="refresh"
              title="Auto Ordering"
              description="Routine ordering automation (milk, groceries, meds)"
              color="#9C27B0"
            />
          </View>
        </LinearGradient>

        {/* Core Features / Modes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6 Powerful Modes</Text>
          <View style={styles.modesGrid}>
            <ModeCard
              icon="search"
              title="Search Mode"
              purpose="Area-wise product/service price search"
              color={colors.priceBlue}
            />
            <ModeCard
              icon="trending-up"
              title="Budget Mode"
              purpose="Expense tracking, AI savings tips"
              color={colors.priceGreen}
            />
            <ModeCard
              icon="refresh-circle"
              title="Routine Mode"
              purpose="Auto booking of repeated needs"
              color="#FF9800"
            />
            <ModeCard
              icon="bulb"
              title="Suggest Mode"
              purpose="AI recommends best buy options"
              color="#9C27B0"
            />
            <ModeCard
              icon="card"
              title="Finance AI"
              purpose="Loans, insurance, financial planner"
              color="#4CAF50"
            />
            <ModeCard
              icon="airplane"
              title="Booking Mode"
              purpose="Tickets, hotels, cinema, travel"
              color="#2196F3"
            />
          </View>
        </View>

        {/* Value Proposition */}
        <LinearGradient
          colors={[colors.priceGreen, '#66BB6A']}
          style={styles.section}
        >
          <Text style={[styles.sectionTitle, { color: colors.white }]}>
            Why India Needs PRICE.AI Now
          </Text>
          <View style={styles.valueList}>
            <View style={styles.valueItem}>
              <Ionicons name="checkmark-circle" size={24} color={colors.white} />
              <Text style={styles.valueText}>Save up to ₹1,000/month on daily shopping</Text>
            </View>
            <View style={styles.valueItem}>
              <Ionicons name="checkmark-circle" size={24} color={colors.white} />
              <Text style={styles.valueText}>Get true pricing from local & online platforms</Text>
            </View>
            <View style={styles.valueItem}>
              <Ionicons name="checkmark-circle" size={24} color={colors.white} />
              <Text style={styles.valueText}>Available in all major Indian languages</Text>
            </View>
            <View style={styles.valueItem}>
              <Ionicons name="checkmark-circle" size={24} color={colors.white} />
              <Text style={styles.valueText}>Elderly friendly: voice + photo input</Text>
            </View>
            <View style={styles.valueItem}>
              <Ionicons name="checkmark-circle" size={24} color={colors.white} />
              <Text style={styles.valueText}>Protects from fake offers and mispricing</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Monetization Strategy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Revenue Model - Multiple Streams</Text>
          <View style={styles.revenueGrid}>
            <View style={styles.revenueCard}>
              <Ionicons name="storefront" size={30} color={colors.priceBlue} />
              <Text style={styles.revenueTitle}>Vendor Listing</Text>
              <Text style={styles.revenueAmount}>₹499/month</Text>
            </View>
            <View style={styles.revenueCard}>
              <Ionicons name="link" size={30} color={colors.priceGreen} />
              <Text style={styles.revenueTitle}>Affiliate Commissions</Text>
              <Text style={styles.revenueAmount}>Amazon, Flipkart</Text>
            </View>
            <View style={styles.revenueCard}>
              <Ionicons name="ticket" size={30} color={colors.priceYellow} />
              <Text style={styles.revenueTitle}>Booking Margin</Text>
              <Text style={styles.revenueAmount}>Travel & Entertainment</Text>
            </View>
            <View style={styles.revenueCard}>
              <Ionicons name="star" size={30} color="#9C27B0" />
              <Text style={styles.revenueTitle}>Premium Subscription</Text>
              <Text style={styles.revenueAmount}>₹99/month</Text>
            </View>
          </View>
        </View>

        {/* Expansion Roadmap */}
        <LinearGradient
          colors={[colors.priceBlue, '#2a5a8a']}
          style={styles.section}
        >
          <Text style={[styles.sectionTitle, { color: colors.white }]}>
            Vision for The Year
          </Text>
          <View style={styles.roadmapContainer}>
            <View style={styles.roadmapPhase}>
              <View style={styles.phaseNumber}>
                <Text style={styles.phaseNumberText}>1</Text>
              </View>
              <Text style={styles.phaseTitle}>Foundation & Launch</Text>
              <Text style={styles.phaseDescription}>
                Tamil Nadu, Kerala, Karnataka go-live with basic AI features
              </Text>
            </View>
            <View style={styles.roadmapPhase}>
              <View style={styles.phaseNumber}>
                <Text style={styles.phaseNumberText}>2</Text>
              </View>
              <Text style={styles.phaseTitle}>Scale & Diversify</Text>
              <Text style={styles.phaseDescription}>
                Tier-2 & Tier-3 city expansion with multilingual support
              </Text>
            </View>
            <View style={styles.roadmapPhase}>
              <View style={styles.phaseNumber}>
                <Text style={styles.phaseNumberText}>3</Text>
              </View>
              <Text style={styles.phaseTitle}>Nationwide Adoption</Text>
              <Text style={styles.phaseDescription}>
                10 Million+ users with full banking and payment integration
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Social Impact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Not Just Tech – It&apos;s a Movement</Text>
          <View style={styles.impactGrid}>
            <View style={styles.impactCard}>
              <Ionicons name="people" size={40} color={colors.priceGreen} />
              <Text style={styles.impactText}>Supports savings for middle-class families</Text>
            </View>
            <View style={styles.impactCard}>
              <Ionicons name="school" size={40} color={colors.priceBlue} />
              <Text style={styles.impactText}>Increases digital literacy & price awareness</Text>
            </View>
            <View style={styles.impactCard}>
              <Ionicons name="business" size={40} color={colors.priceYellow} />
              <Text style={styles.impactText}>Encourages small vendor digitization</Text>
            </View>
            <View style={styles.impactCard}>
              <Ionicons name="shield-checkmark" size={40} color="#9C27B0" />
              <Text style={styles.impactText}>Promotes financial responsibility</Text>
            </View>
          </View>
        </View>

        {/* Investment Ask */}
        <LinearGradient
          colors={[colors.priceYellow, '#FFD54F']}
          style={styles.section}
        >
          <Text style={[styles.sectionTitle, { color: colors.darkGray }]}>
            Join Us in Building PRICE.AI
          </Text>
          <View style={styles.investmentContainer}>
            <Text style={styles.investmentAmount}>₹3.5 Crores Seed Round</Text>
            <View style={styles.fundUsage}>
              <View style={styles.usageItem}>
                <View style={[styles.usageBar, { width: '30%', backgroundColor: colors.priceBlue }]} />
                <Text style={styles.usageText}>AI & App Development: 30%</Text>
              </View>
              <View style={styles.usageItem}>
                <View style={[styles.usageBar, { width: '25%', backgroundColor: colors.priceGreen }]} />
                <Text style={styles.usageText}>Regional Marketing: 25%</Text>
              </View>
              <View style={styles.usageItem}>
                <View style={[styles.usageBar, { width: '15%', backgroundColor: '#FF9800' }]} />
                <Text style={styles.usageText}>Vendor Onboarding: 15%</Text>
              </View>
              <View style={styles.usageItem}>
                <View style={[styles.usageBar, { width: '30%', backgroundColor: '#9C27B0' }]} />
                <Text style={styles.usageText}>Infrastructure & Team: 30%</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Contact Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Let&apos;s Make India Smarter</Text>
          <View style={styles.contactContainer}>
            <View style={styles.contactItem}>
              <Ionicons name="call" size={24} color={colors.priceBlue} />
              <Text style={styles.contactText}>08883800038</Text>
            </View>
            <View style={styles.contactItem}>
              <Ionicons name="mail" size={24} color={colors.priceBlue} />
              <Text style={styles.contactText}>price.ai@gmail.com</Text>
            </View>
            <View style={styles.contactItem}>
              <Ionicons name="globe" size={24} color={colors.priceBlue} />
              <Text style={styles.contactText}>www.price.ai</Text>
            </View>
            <View style={styles.contactItem}>
              <Ionicons name="location" size={24} color={colors.priceBlue} />
              <Text style={styles.contactText}>Madurai, Tamil Nadu, India</Text>
            </View>
          </View>
          
          <View style={styles.finalQuote}>
            <Text style={styles.quoteText}>
              "Know the price. Own your power. PRICE.AI is not just an app. It&apos;s a revolution in your palm."
            </Text>
          </View>
        </View>

        {/* Admin Access */}
        <View style={styles.adminSection}>
          <TouchableOpacity 
            style={styles.adminButton}
            onPress={() => router.push('/admin')}
          >
            <Ionicons name="shield-checkmark" size={20} color={colors.white} />
            <Text style={styles.adminButtonText}>Admin Panel</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 PRICE.AI - ONE ADD TEAM</Text>
          <Text style={styles.footerText}>The smart shopper&apos;s assistant!</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  
  // Hero Section
  heroSection: {
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
    maxWidth: 800,
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 15,
    opacity: 0.9,
  },
  heroTagline: {
    fontSize: 16,
    color: colors.priceYellow,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 30,
  },
  heroImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
    flexWrap: 'wrap',
  },
  phoneFrame: {
    width: 180,
    height: 320,
    backgroundColor: colors.darkGray,
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
  },
  phoneScreen: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneText: {
    fontSize: 16,
    color: colors.darkGray,
    marginVertical: 10,
  },
  priceComparison: {
    marginTop: 20,
    alignItems: 'center',
  },
  priceText: {
    fontSize: 14,
    color: colors.darkGray,
    marginVertical: 2,
  },
  manIllustration: {
    alignItems: 'center',
    marginBottom: 20,
  },
  manFace: {
    width: 80,
    height: 80,
    backgroundColor: colors.priceYellow,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  speechBubble: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 15,
    maxWidth: 150,
  },
  speechText: {
    fontSize: 12,
    color: colors.darkGray,
    textAlign: 'center',
  },
  ctaButton: {
    backgroundColor: colors.priceYellow,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkGray,
    marginRight: 10,
  },
  languageText: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.8,
  },

  // Common Section Styles
  section: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.darkGray,
    textAlign: 'center',
    marginBottom: 30,
  },

  // Problem Section
  problemList: {
    width: '100%',
    maxWidth: 600,
  },
  problemItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  problemText: {
    fontSize: 16,
    color: colors.darkGray,
    marginLeft: 15,
    flex: 1,
  },

  // Solution Section
  solutionGrid: {
    width: '100%',
    maxWidth: 800,
  },
  featureCard: {
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
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkGray,
    marginLeft: 10,
  },
  featureDescription: {
    fontSize: 14,
    color: colors.darkGray,
    opacity: 0.8,
  },

  // Modes Section
  modesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 800,
  },
  modeCard: {
    width: width > 600 ? '48%' : '100%',
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  modeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  modeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkGray,
    marginBottom: 5,
    textAlign: 'center',
  },
  modePurpose: {
    fontSize: 14,
    color: colors.darkGray,
    opacity: 0.8,
    textAlign: 'center',
  },

  // Value Section
  valueList: {
    width: '100%',
    maxWidth: 600,
  },
  valueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  valueText: {
    fontSize: 16,
    color: colors.white,
    marginLeft: 15,
    flex: 1,
  },

  // Revenue Section
  revenueGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 800,
  },
  revenueCard: {
    width: width > 600 ? '48%' : '100%',
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  revenueTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkGray,
    marginVertical: 10,
    textAlign: 'center',
  },
  revenueAmount: {
    fontSize: 14,
    color: colors.darkGray,
    opacity: 0.8,
    textAlign: 'center',
  },

  // Roadmap Section
  roadmapContainer: {
    width: '100%',
    maxWidth: 600,
  },
  roadmapPhase: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 25,
  },
  phaseNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.priceYellow,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  phaseNumberText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkGray,
  },
  phaseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 5,
    flex: 1,
  },
  phaseDescription: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
    flex: 1,
  },

  // Impact Section
  impactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 800,
  },
  impactCard: {
    width: width > 600 ? '48%' : '100%',
    backgroundColor: colors.lightGray,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  impactText: {
    fontSize: 14,
    color: colors.darkGray,
    textAlign: 'center',
    marginTop: 10,
  },

  // Investment Section
  investmentContainer: {
    width: '100%',
    maxWidth: 600,
    alignItems: 'center',
  },
  investmentAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.darkGray,
    marginBottom: 30,
    textAlign: 'center',
  },
  fundUsage: {
    width: '100%',
  },
  usageItem: {
    marginBottom: 15,
  },
  usageBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 5,
  },
  usageText: {
    fontSize: 14,
    color: colors.darkGray,
  },

  // Contact Section
  contactContainer: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 30,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  contactText: {
    fontSize: 16,
    color: colors.darkGray,
    marginLeft: 15,
  },
  finalQuote: {
    backgroundColor: colors.lightGray,
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
  },
  quoteText: {
    fontSize: 16,
    color: colors.darkGray,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 24,
  },

  // Admin Section
  adminSection: {
    backgroundColor: colors.lightGray,
    paddingVertical: 20,
    alignItems: 'center',
  },
  adminButton: {
    backgroundColor: colors.darkGray,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  adminButtonText: {
    color: colors.white,
    marginLeft: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Footer
  footer: {
    backgroundColor: colors.darkGray,
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.8,
    textAlign: 'center',
  },
});

export default PriceAIWebsite;