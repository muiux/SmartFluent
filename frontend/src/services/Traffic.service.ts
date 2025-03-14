import axios from "axios";
import { DateRange } from "react-day-picker";

export const getTrafficHistory = async (date: DateRange | undefined) => {
  try {
    const server_ip = import.meta.env.VITE_SERVER_IP;
    const { data } = await axios.get(
      `http://${server_ip}:5000/api/traffic/unique-visitors?startDate=${date?.from?.toISOString().split("T")[0]}&endDate=${date?.to?.toISOString().split("T")[0]}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
