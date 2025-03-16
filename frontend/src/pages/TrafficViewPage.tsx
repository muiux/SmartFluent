import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getAnomalyDetection,
  getTrafficHistory,
} from "@/services/Traffic.service";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import { DateRangePicker } from "../components/DateRangePicker";
import { useTrafficContext } from "@/contexts/TrafficContext";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { Anomaly, AnomalyData, TrafficHistory } from "@/types/Traffic.types";
import { Spinner } from "../components/ui/spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const getAnomalyDates = (anomalies: Anomaly[] | undefined): string[] => {
  return anomalies
    ?.filter((anomaly) => anomaly.isAnomaly)
    .map((anomaly) => new Date(anomaly.timestamp).toISOString().split("T")[0]) || [];
};

const TrafficView: React.FC = () => {
  const { date } = useTrafficContext();
  const [trafficData, setTrafficData] = useState<TrafficHistory[]>([]);
  const [anomalyData, setAnomalyData] = useState<AnomalyData>();

  const { mutate: getTrafficData, isPending: isPendingForTable } = useMutation({
    mutationFn: (date: DateRange | undefined) => getTrafficHistory(date),
    onSuccess: (data) => {
      setTrafficData(data);
      toast("Traffic History", {
        description: "Traffic history data has been successfully updated.",
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

  const { mutate: getAnomalyData, isPending: isPendingForAnomaly } =
    useMutation({
      mutationFn: (date: DateRange | undefined) => getAnomalyDetection(date),
      onSuccess: (data: AnomalyData) => {
        setAnomalyData(data);
      },
    });

  useEffect(() => {
    if (date?.from && date?.to) {
      getTrafficData(date);
      getAnomalyData(date);
    }
  }, [date, getAnomalyData, getTrafficData]);

  const filteredAnomalies = getAnomalyDates(anomalyData?.anomalies);

  const detectionMessage = filteredAnomalies.length && `Anomalies detected on the following dates: ${filteredAnomalies.join(", ")}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-4xl">Traffic View</CardTitle>
        <CardDescription>
          Here you can view the user visit history for a specific page URL
        </CardDescription>
        <DateRangePicker />
        {!isPendingForAnomaly && (
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>{anomalyData?.message}</AlertTitle>
            {anomalyData?.anomalies && (
              <AlertDescription>
                {detectionMessage}
              </AlertDescription>
            )}
          </Alert>
        )}
      </CardHeader>
      <CardContent>
        {!isPendingForTable ? (
          <DataTable data={trafficData} />
        ) : (
          <Spinner size="medium" />
        )}
      </CardContent>
    </Card>
  );
};

export default TrafficView;
