// src/pages/MyClaimsPage.tsx
import React, { useEffect, useState } from 'react';
import ClaimCard from './claim-card.component'; // Adjust the import path as necessary
interface Claim {
    _id: string;
    policyDetails: string;
    claimReason: string;
    claimImage: string;
    createdAt: string;
   }

const MyClaimsPage: React.FC = () => {
    const [claims, setClaims] = useState<Claim[]>([]); // Use the Claim interface here


 useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5001/api/claims');
      const data = await response.json();
      setClaims(data);
    };

    fetchData();
 }, []);

 return (
    <div>
      <div className="grid grid-cols-3 gap-x-4">
        {claims.map((claim) => (
          <ClaimCard key={claim._id} claim={claim} />
        ))}
      </div>
    </div>
 );
};

export default MyClaimsPage;