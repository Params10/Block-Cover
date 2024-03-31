// dataService.ts
import axios from 'axios';

// Adjusted interface to match the MongoDB schema

interface InsurancePolicy {
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

 

const API_BASE_URL = 'http://localhost:5001/api/createPolicy'; // Your API's base URL

export const saveDataItem = async (dataItem: InsurancePolicy): Promise<InsurancePolicy> => {
  try {
     const response = await axios.post(API_BASE_URL, dataItem);
     return response.data;
  } catch (error) {
     console.error('Error in saving data item:', error);
     throw error;
  }
 };
 
