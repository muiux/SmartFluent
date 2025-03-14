import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTrafficHistory } from "@/services/Traffic.service";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import DataTable from "./DataTable";
import { DatePicker } from "./Calendar";
import { useTrafficContext } from "@/contexts/TrafficContext";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { TrafficHistory } from "@/types/Traffic.types";
import { Spinner } from "./ui/spinner";

const TrafficView: React.FC = () => {
  const { date } = useTrafficContext();
  const [trafficData, setTrafficData] = useState<TrafficHistory[]>([]);

  const { mutate: getTrafficData, isPending } = useMutation({
    mutationFn: (date: DateRange | undefined) => getTrafficHistory(date),
    onSuccess: (data) => {
      setTrafficData(data);
      toast("Traffic Data Updated", {
        description: "Latest traffic data retrieved successfully.",
      });
    },
    onError: (err: unknown) => {
      if (err instanceof AxiosError) {
        toast("Oops!", {
          description: "Oops! Something went wrong. Please try again later.",
        });
      }
    },
  });

  useEffect(() => {
    if (date?.from && date?.to) {
      getTrafficData(date);
    }
  }, [date, getTrafficData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-4xl">Traffic View</CardTitle>
        <CardDescription>
          Here you can view the user visit history for a specific page URL
        </CardDescription>
        <DatePicker />
      </CardHeader>
      <CardContent>
        {!isPending ? (
          <DataTable data={trafficData} />
        ) : (
          <Spinner size="medium" />
        )}
      </CardContent>
    </Card>
  );
};

export default TrafficView;
