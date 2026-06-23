export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: 'Farmer' | 'Buyer';
  location: string;
  state: string;
  primaryCrop?: string;
  soilType?: string;
  preferredLanguage: 'en' | 'te' | 'hi';
}

export interface CropListing {
  id: string;
  title: string;
  category: string;
  price: number;
  quantity: string;
  sellerName: string;
  sellerPhone: string;
  location: string;
  imageUrl: string;
  createdAt: string;
}

export interface EquipmentItem {
  id: string;
  name: string;
  type: string;
  pricePerDay: number;
  imageUrl: string;
  description: string;
  specs: string[];
}

export interface RentalBooking {
  id: string;
  equipmentId: string;
  equipmentName: string;
  startDate: string;
  days: number;
  totalCost: number;
  farmerName: string;
  farmerPhone: string;
  status: 'pending' | 'confirmed';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  audio?: string; // Optional audio play icon indicator
}

export interface CropRecommendationInput {
  soilType: string;
  location: string;
  season: string;
  waterAvailability: string;
  budget: number;
  language: string;
}

export interface CropRecommendationResult {
  crops: Array<{
    name: string;
    localName?: string;
    expectedYield: string;
    costOfCultivation: string;
    duration: string;
    waterDemand: string;
    marketDemand: 'High' | 'Medium' | 'Low';
    estimatedProfit: string;
    sowingTips: string;
    fertilizers: string;
  }>;
  generalAdvice: string;
}

export interface DiseaseDetectionResult {
  detected: boolean;
  diseaseName: string;
  localDiseaseName?: string;
  confidence: number;
  causes: string[];
  symptoms: string[];
  prevention: string[];
  recommendedTreatment: string[];
}

export interface SchemeInfo {
  id: string;
  name: string;
  localName?: string;
  description: string;
  benefits: string[];
  eligibility: string[];
  howToApply: string[];
  officialUrl?: string;
}

export interface MarketPriceTrend {
  crop: string;
  currentPrice: number;
  lastMonthPrice: number;
  predictedPrice: number;
  trend: 'up' | 'down' | 'stable';
  history: Array<{ month: string; price: number }>;
}
