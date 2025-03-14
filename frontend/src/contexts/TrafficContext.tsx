import React, { createContext, useContext } from "react";
import { DateRange } from "react-day-picker";

export interface TrafficContextType {
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}

export const TrafficContext = createContext<TrafficContextType | null>(null);

export const useTrafficContext = () =>
  useContext(TrafficContext) as TrafficContextType;
