"use client";
import React, { createContext, useState, ReactNode, useContext } from 'react';
import axios from 'axios';

export interface IPlannerDetails {
  budget: string | number;
}

export interface IPerformerDetails {
  expertise: string;
}

export interface ICrewDetails {
  role: string;
  equipments?: string;
}

export interface RequirementPayload {
  eventName: string;
  eventType: string;
  date: {
    start: string;
    end?: string;
  };
  location: string;
  venue?: string;
  category: "planner" | "performer" | "crew" | "";
  plannerDetails?: IPlannerDetails;
  performerDetails?: IPerformerDetails;
  crewDetails?: ICrewDetails;
}

interface ApiContextType {
  submitRequirement: (data: RequirementPayload) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitRequirement = async (data: RequirementPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      
      await axios.post("http://localhost:8080/api/requirements", data);
      setIsLoading(false);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to submit requirement");
      setIsLoading(false);
      return false;
    }
  };

  return (
    <ApiContext.Provider value={{ submitRequirement, isLoading, error }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
