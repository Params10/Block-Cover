import React from 'react';

interface AssetCardProps {
 did: {
    metadata: {
      name: string;
      description: string;
    };
 };
}

const AssetCard: React.FC<AssetCardProps> = ({ did }) => {
 return (
    <div className="bg-white m-2 p-2 shadow-md h-36">
      <div className="flex justify-between pt-2 px-2 border-b border-gray-200">
        <div className="font-normal text-lg overflow-hidden text-ellipsis h-7 w-80 whitespace-nowrap">
          {did.metadata.name}
        </div>
      </div>
      <div className="flex justify-between p-2 border-t border-gray-200 max-h-10 overflow-hidden text-ellipsis">
        <div className="font-normal text-xs overflow-hidden text-ellipsis h-5 whitespace-nowrap">
          {did.metadata.description}
        </div>
      </div>
    </div>
 );
};

export default AssetCard;