// dataService.ts
import axios from 'axios';

import { Types } from 'mongoose';

interface InsurancePolicy {
 _id: Types.ObjectId; // MongoDB ID
 makeModel: {
    brand: string;
    model: string;
 };
 imeiNumber: string;
 yearBought: string;
 ownerName: string;
 ownerAddress: string;
 coverageAmount: number;
}

 

// Fetch data items from the API
export const fetchDataItems = async (): Promise<InsurancePolicy[]> => {
  try {
    const response = await axios.get('http://localhost:5001/api/dataItems');
    return response.data;
  } catch (error) {
    console.error('Error fetching data items:', error);
    return [];
  }
};
