import React, { useState, useContext, useEffect } from "react";
import { AccountContext } from "../App";
import { saveDataItem } from '../Services/AddItem'; // Adjust the path as necessary


export default function App() {
  const { currentAccount } = useContext(AccountContext);
  const brands: Brand[] = ["Apple", "Samsung", "OnePlus"];
  const models: Record<Brand, string[]> = {
    Apple: ["iPhone 12", "iPhone 13", "iPhone 14"],
    Samsung: ["Galaxy S21", "Galaxy S22", "Galaxy S23"],
    OnePlus: ["OnePlus 9", "OnePlus 9 Pro", "OnePlus 9R"],
  };

  const years = Array.from(
    { length: new Date().getFullYear() - 2018 + 1 },
    (_, i) => 2018 + i
  );
  // New state variables for the mobile device insurance form
  const [imeiNumber, setImeiNumber] = useState("");
  const [yearBought, setYearBought] = useState(years[0].toString());
  const [ownerName, setOwnerName] = useState("");
  const [ownerAddress, setOwnerAddress] = useState("");
  const [coverageAmount, setCoverageAmount] = useState(0);

  type Brand = "Apple" | "Samsung" | "OnePlus";

  const [makeModel, setMakeModel] = useState<{ brand: Brand; model: string }>({
    brand: "Apple",
    model: "iPhone 12",
  });

  const calculateCoverageAmount = () => {
    // Example formula: coverage amount is a combination of the year bought and a fixed amount
    const baseCoverageAmount = 100; // This should be replaced with your actual formula
    const yearFactor = parseInt(yearBought, 10) - 2018; // Adjust this formula as needed
    const calculatedCoverageAmount = baseCoverageAmount + yearFactor;
    setCoverageAmount(calculatedCoverageAmount);
  };

  interface InsurancePolicy {
    makeModel: {
      brand: Brand;
      model: string;
    };
    imeiNumber: string;
    yearBought: string;
    ownerName: string;
    ownerAddress: string;
    coverageAmount: number;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const policy: InsurancePolicy = {
      makeModel,
      imeiNumber,
      yearBought,
      ownerName,
      ownerAddress,
      coverageAmount,
    };

    // Here, you would typically send `policy` to your backend or directly to MongoDB
    // For demonstration, let's just log the policy object
    try {
      await saveDataItem(policy); // Call the saveDataItem function
      console.log('Policy saved successfully');
   } catch (error) {
      console.error('Error saving policy:', error);
   }
    console.log(policy);
  };

  // Populate owner name and address using wallet address
  useEffect(() => {
    if (currentAccount) {
      setOwnerAddress(currentAccount); // Use wallet address as owner address
    }
  }, [currentAccount]);

  useEffect(() => {
    calculateCoverageAmount();
  }, [makeModel, yearBought]);

  return (
    <div className="rounded-md h-full overflow-y-scroll">
      <h1 className="font-light text-xl p-5 text-center">Register Policy</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 mx-auto lg:w-3/4 bg-white p-5 rounded shadow-lg"
      >
        <label className="flex flex-col">
          <h2>Make</h2>
          <select
            value={makeModel.brand}
            onChange={(e) =>
              setMakeModel({ ...makeModel, brand: e.target.value as Brand })
            }
            className="border p-2 rounded"
          >
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col">
          <h2>Model</h2>
          <select
            value={makeModel.model}
            onChange={(e) =>
              setMakeModel({ ...makeModel, model: e.target.value })
            }
            className="border p-2 rounded"
            disabled={!makeModel.brand} // Disable if no brand is selected
          >
            {makeModel.brand &&
              models[makeModel.brand].map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
          </select>
        </label>
        <label className="flex flex-col">
          <h2>Year Bought</h2>
          <select
            value={yearBought}
            onChange={(e) => setYearBought(e.target.value)}
            className="border p-2 rounded"
          >
            {years.map((year) => (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col">
          <h2>IMEI Number</h2>
          <input
            type="text"
            value={imeiNumber}
            onChange={(e) => setImeiNumber(e.target.value)}
            className="border p-2 rounded"
            placeholder="Enter IMEI number"
          />
        </label>
        <label className="flex flex-col">
          <h2>Owner Name</h2>
          <input
            type="text"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            className="border p-2 rounded"
            placeholder="Owner Name"
          />
        </label>
        <label className="flex flex-col">
          <h2>Owner Address</h2>
          <input
            type="text"
            value={ownerAddress}
            className="border p-2 rounded"
            placeholder="Owner Address"
            readOnly
          />
        </label>
        <label className="flex flex-col">
          <h2>Estimated Premium</h2>
          <input
            type="text"
            value={coverageAmount}
            className="border p-2 rounded"
            placeholder="Coverage Amount"
            readOnly
          />
        </label>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
