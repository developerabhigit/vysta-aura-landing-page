"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { pricingContent, type PricingVariant } from "@/data/landing-content";

// 1. Context Contract (This specifies what access the components will have.)
interface PreOrderModalContextType {
  isOpen: boolean;
  selectedVariant: PricingVariant;
  setSelectedVariant: (variant: PricingVariant) => void;
  openModal: (variantIdOrName?: string) => void;
  closeModal: () => void;
}

// 2. React Context create karna
const PreOrderModalContext = createContext<PreOrderModalContextType | undefined>(undefined);

// 3. Provider Component (which state will hold)
export function PreOrderModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<PricingVariant>(
    pricingContent.variants[0]
  );

  const openModal = useCallback((variantIdOrName?: string) => {
    if (variantIdOrName) {
      const match = pricingContent.variants.find(
        (v) =>
          v.id === variantIdOrName ||
          v.name.toLowerCase() === variantIdOrName.toLowerCase()
      );
      if (match) {
        setSelectedVariant(match);
      }
    }
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      selectedVariant,
      setSelectedVariant,
      openModal,
      closeModal,
    }),
    [isOpen, selectedVariant, openModal, closeModal]
  );

  return (
    <PreOrderModalContext.Provider value={value}>
      {children}
    </PreOrderModalContext.Provider>
  );
}

// 4. Custom Hook (to be used from any component)
export function usePreOrderModal() {
  const context = useContext(PreOrderModalContext);
  if (!context) {
    throw new Error("usePreOrderModal must be used within a PreOrderModalProvider");
  }
  return context;
}
