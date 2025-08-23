import React, { createContext, useContext, ReactNode } from 'react';
import { ICatalogInfoService } from '../api/ICatalogInfoService';
import { CatalogInfoService } from '../api/catalog.api';

const CatalogInfoContext = createContext<ICatalogInfoService | null>(null);

interface CatalogInfoProviderProps {
  children: ReactNode;
  service?: ICatalogInfoService;
}

export const CatalogInfoProvider: React.FC<CatalogInfoProviderProps> = ({
  children,
  service = new CatalogInfoService(),
}) => {
  return (
    <CatalogInfoContext.Provider value={service}>
      {children}
    </CatalogInfoContext.Provider>
  );
};

export const useCatalogInfoService = (): ICatalogInfoService => {
  const context = useContext(CatalogInfoContext);
  if (!context) {
    throw new Error(
      'useCatalogInfoService must be used within a CatalogInfoProvider',
    );
  }
  return context;
};

export const useCatalogInfoServiceForTesting =
  (): ICatalogInfoService | null => {
    return useContext(CatalogInfoContext);
  };
