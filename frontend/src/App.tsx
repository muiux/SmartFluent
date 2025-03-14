import './App.css'
import TrafficView from './components/TrafficView';
import { TrafficProvider } from './contexts/TrafficProvider';
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <TrafficProvider>
      <TrafficView />
      <Toaster duration={1500} position={'top-right'} />
    </TrafficProvider>
  )
}

export default App
