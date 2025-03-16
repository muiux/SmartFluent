import axios from "axios";
import { DateRange } from "react-day-picker";

const server_url = import.meta.env.VITE_TRACKER_URL;

export const getTrafficHistory = async (date: DateRange | undefined) => {
  try {
    const { data } = await axios.get(
      `${server_url}/unique-visitors?startDate=${date?.from?.toISOString().split("T")[0]}&endDate=${date?.to?.toISOString().split("T")[0]}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAnomalyDetection = async (date: DateRange | undefined) => {
  try {
    const { data } = await axios.get(
      `${server_url}/detect-anomalies?startDate=${date?.from?.toISOString().split("T")[0]}&endDate=${date?.to?.toISOString().split("T")[0]}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
