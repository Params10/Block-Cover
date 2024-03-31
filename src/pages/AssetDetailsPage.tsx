// AssetDetailsPage.tsx
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Web3 from "web3";
import { AccountContext } from "../App";
import { toast } from "react-toastify";
import { MoonLoader } from "react-spinners";
import { Types } from "mongoose";
interface AssetDetailsPageProps {
  // Define any props if needed
}

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
const AssetDetailsPage: React.FC<AssetDetailsPageProps> = () => {
  const { id } = useParams(); // Get the asset ID from the URL
  const [asset, setAsset] = useState<InsurancePolicy | null>(null);
  const [loading, setLoading] = useState(false);
  const [claimReason, setClaimReason] = useState("");
  const [claimImage, setClaimImage] = useState<FileList | null>(null);

  useEffect(() => {
    // Fetch the asset details using the ID
    fetch(`http://localhost:5001/api/policy/${id}`)
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
  }, [id]); // Depend on the ID to refetch if it changes

  const handleSubmitClaim = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    if (!asset || !claimReason || !claimImage || claimImage.length === 0) {
      // Validate that all necessary fields are filled
      toast.error("Please fill out all required fields.");
      return;
    }

    // Assuming 'asset' contains the policy details
    const policyDetails = asset;

    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append("policyDetails", JSON.stringify(policyDetails));
    formData.append("claimReason", claimReason);
    formData.append("claimImage", claimImage[0]); // Assuming only one file is uploaded

    // Example of sending the form data to a server
    fetch("http://localhost:5001/api/submitClaim", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response from the server
        toast.success("Claim submitted successfully.");
      })
      .catch((error) => {
        // Handle any errors
        toast.error("An error occurred while submitting the claim.");
      });
  };

  return (
    <div className="rounded-md h-full overflow-y-scroll">
      <div className="flex justify-between items-center p-5">
        {asset && (
          <div className="flex items-center">
            <h1 className="font-light text-xl">
              Policy Details Page for Policy ID: {asset._id.toString()}
            </h1>
          </div>
        )}
      </div>

      <div className="bg-white p-5 rounded shadow-lg mx-auto lg:w-3/4">
        {asset && (
          <div className="flex flex-col">
            <div className="mb-4">
              <h2 className="text-xl font-bold">
                {asset.makeModel.brand} {asset.makeModel.model}
              </h2>
            </div>
            <div className="mb-4">
              <p>IMEI Number: {asset.imeiNumber}</p>
              <p>Year Bought: {asset.yearBought}</p>
              <p>Owner Name: {asset.ownerName}</p>
              <p>Owner Address: {asset.ownerAddress}</p>
              <p>Premium Paid: {asset.coverageAmount}</p>
            </div>
          </div>
        )}
      </div>

      {/* Claim Request Form */}
      <div className="bg-white p-5 rounded shadow-lg mx-auto lg:w-3/4 mt-10">
        <h2 className="text-xl font-bold mb-4">Request a Claim</h2>
        <form onSubmit={handleSubmitClaim}>
          <div className="mb-4">
            <label
              htmlFor="claimReason"
              className="block text-sm font-medium text-gray-700"
            >
              Claim Reason
            </label>
            <select
              id="claimReason"
              value={claimReason}
              onChange={(e) => setClaimReason(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a reason</option>
              <option value="stolen">Stolen</option>
              <option value="damaged">Damaged</option>
            </select>
          </div>

          {claimReason === "damaged" && (
            <div className="mb-4">
              <label
                htmlFor="damagedItemImage"
                className="block text-sm font-medium text-gray-700"
              >
                Upload Damaged Item Picture
              </label>
              <input
                type="file"
                id="damagedItemImage"
                onChange={(e) => setClaimImage(e.target.files)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          )}

          {claimReason === "stolen" && (
            <div className="mb-4">
              <label
                htmlFor="firReport"
                className="block text-sm font-medium text-gray-700"
              >
                Upload FIR Report
              </label>
              <input
                type="file"
                id="firReport"
                onChange={(e) => setClaimImage(e.target.files)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit Claim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssetDetailsPage;
