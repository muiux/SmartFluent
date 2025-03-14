import React, { ReactNode, useState } from "react";
import { TrafficContext } from "./TrafficContext";
import { DateRange } from "react-day-picker";
import { addDays, subDays } from "date-fns";

export const TrafficProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(Date.now()), 6),
    to: addDays(new Date(Date.now()), 1),
  });

  return (
    <TrafficContext.Provider
      value={{
        date,
        setDate
      }}
    >
      {children}
    </TrafficContext.Provider>
  );
};
