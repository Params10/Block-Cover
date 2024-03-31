// src/components/ClaimCard.tsx
import React from 'react';

interface ClaimCardProps {
 claim: {
    _id: string;
    policyDetails: string;
    claimReason: string;
    claimImage: string;
    createdAt: string;
 };
}

const ClaimCard: React.FC<ClaimCardProps> = ({ claim }) => {
 return (
    <div className="bg-white m-2 p-2 shadow-md h-36">
      <div className="flex justify-between pt-2 px-2 border-b border-gray-200">
        <div className="font-normal text-lg overflow-hidden text-ellipsis h-7 w-80 whitespace-nowrap">
          Claim ID: {claim._id}
        </div>
      </div>
      <div className="flex justify-between p-2 border-t border-gray-200">
        <div className="font-normal text-xs whitespace-normal">
          Policy Details: {claim.policyDetails}<br/>
          Claim Reason: {claim.claimReason}<br/>
          Date Created: {new Date(claim.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
 );
};

export default ClaimCard;