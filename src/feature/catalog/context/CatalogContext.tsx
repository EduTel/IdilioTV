import React, { createContext, useContext, ReactNode } from 'react';
import { ICatalogService } from '../api/ICatalogService';

const CatalogContext = createContext<ICatalogService | null>(null);

interface CatalogProviderProps {
  children: ReactNode;
  service: ICatalogService;
}

export const CatalogProvider: React.FC<CatalogProviderProps> = ({
  children,
  service,
}) => {
  return (
    <CatalogContext.Provider value={service}>
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalogService = (): ICatalogService => {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error('useCatalogService must be used within a CatalogProvider');
  }
  return context;
};

export const useCatalogServiceForTesting = (): ICatalogService | null => {
  return useContext(CatalogContext);
};
