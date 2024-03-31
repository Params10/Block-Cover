// src/pages/LandingPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AssetCard from "./asset-card.component";
import { NavLink } from "react-router-dom";
import { MdClear } from "react-icons/md";
import { MoonLoader } from "react-spinners";
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

const LandingPage: React.FC = () => {
  const [dataItems, setDataItems] = useState<InsurancePolicy[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true); // Set loading to true before fetching data
    fetch('http://localhost:5001/api/policy')
      .then(response => response.json())
      .then(data => {
        setDataItems(data.slice(0, 10)); // Get top 10 items
        setIsLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Also set loading to false in case of an error
      });
}, []);

 const handleCardClick = (item: InsurancePolicy) => {
  // Navigate to a new page, passing the item's _id as a parameter
  navigate(`/details/${item._id}`);
};

  return (
    <div>
    <div className="grid grid-cols-3 gap-x-4 relative ">
        <div className="relative col-span-2">
            {" "}
            <input
                type="text"
                className="w-full border p-2 m-2 rounded-md col-span-2 row-span-2"
                placeholder="Search for assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
                <button
                    className="absolute right-0 top-0 m-2 p-2"
                    onClick={() => setSearchQuery("")}
                >
                    <MdClear className="text-2xl text-gray-500" />
                </button>
            )}
        </div>
    </div>
    {isLoading ? (
        <div className="flex justify-center align-middle items-center h-80v">
            <MoonLoader color="#000000" size={30} />
        </div>
    ) : (
        // </div>
        <div>
            <div className="grid grid-cols-3 gap-x-4">
                {dataItems.map((item) => (
                    <NavLink key={item._id.toString()} to={`/details/${item._id}`}>
                    <AssetCard did={{ metadata: { name: item.imeiNumber, description: "Mobile Insurance Policy" } }} />
                   </NavLink>
                ))}
            </div>
            
        </div>
    )}
</div>
  );
};

export default LandingPage;
