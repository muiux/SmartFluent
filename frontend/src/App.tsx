import "./App.css";
import TrafficView from "./pages/TrafficViewPage";
import { TrafficProvider } from "./contexts/TrafficProvider";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TrafficProvider>
        <TrafficView />
        <Toaster duration={1500} position={"top-right"} />
      </TrafficProvider>
    </QueryClientProvider>
  );
}

export default App;
