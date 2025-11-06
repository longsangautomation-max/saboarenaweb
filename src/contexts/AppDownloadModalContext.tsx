import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppDownloadModalConfig {
  title?: string;
  description?: string;
}

interface AppDownloadModalContextType {
  isOpen: boolean;
  modalConfig: AppDownloadModalConfig;
  openModal: (config?: AppDownloadModalConfig) => void;
  closeModal: () => void;
}

const AppDownloadModalContext = createContext<AppDownloadModalContextType | undefined>(undefined);

export const AppDownloadModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<AppDownloadModalConfig>({});

  const openModal = (config?: AppDownloadModalConfig) => {
    console.log('Context openModal called with config:', config);
    setModalConfig(config || {});
    setIsOpen(true);
    console.log('Context state updated - isOpen:', true);
  };

  const closeModal = () => {
    console.log('Context closeModal called');
    setIsOpen(false);
  };

  return (
    <AppDownloadModalContext.Provider
      value={{
        isOpen,
        modalConfig,
        openModal,
        closeModal,
      }}
    >
      {children}
    </AppDownloadModalContext.Provider>
  );
};

export const useAppDownloadModal = (): AppDownloadModalContextType => {
  const context = useContext(AppDownloadModalContext);
  if (context === undefined) {
    throw new Error('useAppDownloadModal must be used within an AppDownloadModalProvider');
  }
  return context;
};