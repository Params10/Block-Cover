import React, { Dispatch, SetStateAction, createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PublishFormPage from './pages/PublishAssetPage';
import Header from './header/header.component';
import Sidebar from './sidebar/sidebar.component';
import AssetDetailsPage from './pages/AssetDetailsPage';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface IAccountContext {
  currentAccount: string|null;
  setCurrentAccount: Dispatch<SetStateAction<string|null>> ;
}

export const AccountContext = createContext<IAccountContext>({
  currentAccount: null,
  setCurrentAccount: () => { },
});



const App = () => {
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  
  return (
    <div className="bg-gray-100">
       <AccountContext.Provider
                value={{ currentAccount, setCurrentAccount }}
            >
        <Header />

        <div className="flex h-90v">
          <div className="w-1/8 pt-2">
            <Sidebar />
          </div>
          <div className="w-7/8 pt-2 pl-2">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="publish" element={<PublishFormPage />} />
              <Route path="/details/:id" element={<AssetDetailsPage />} />{" "}
              {/* Ensure this route is defined */}
            </Routes>
          </div>
        </div>
      </AccountContext.Provider>
      <ToastContainer />
    </div>
  );
}

export default App;