// AssetDetailsPage.tsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Web3 from 'web3'; 
import { AccountContext } from '../App';
import { toast } from 'react-toastify';
import { MoonLoader } from "react-spinners";
interface AssetDetailsPageProps {
 // Define any props if needed
}

interface Asset {
  _id: string;
  BlogName: string;
  Abstract: string;
  OwnerAddress: string;
  EncryptedBytes: string;
  Keywords: string;
  Condition: string;
  __v: number;
  // Include other properties as needed
}
const AssetDetailsPage: React.FC<AssetDetailsPageProps> = () => {
  const { id } = useParams(); // Get the asset ID from the URL
  const [asset, setAsset] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    // Fetch the asset details using the ID
    fetch(`http://localhost:5001/api/blogs/${id}`)
       .then((response) => response.json())
       .then((data) => {
         setAsset(data); // Assuming 'setAsset' is the state update function for 'asset'
         if (data && data.Condition) {
           // Parse the Condition string into a JSON object
           const conditionJson = JSON.parse(data.Condition);
           // Extract the NFTAddress and Audit status
         }
       })
       .catch((error) => {
         console.error("Error fetching asset details:", error);
       });
   }, [id]);// Depend on the ID to refetch if it changes


  return (
    <div className="rounded-md h-full overflow-y-scroll">
      <div className="flex justify-between items-center p-5">
        <h1 className="font-light text-xl">
          Asset Details Page for ID: {asset?._id}
        </h1>
      </div>

      <div className="bg-white p-5 rounded shadow-lg mx-auto lg:w-3/4">
        {asset && (
          <div className="flex flex-col">
            <div className="mb-4">
              <h2 className="text-xl font-bold">{asset.BlogName}</h2>
            </div>
            <div className="mb-4">
              <p>{asset.Abstract}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Owner Address: {asset.OwnerAddress}
              </p>
            </div>
            
          </div>
        )}
      </div>

      
    </div>
  );
};

export default AssetDetailsPage