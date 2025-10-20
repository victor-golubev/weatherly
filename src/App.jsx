import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import AppRoutes from "./components/AppRoutes/AppRoutes";
import { WeatherProvider } from "./context/WeatherContext";

function App() {
  return (
    <WeatherProvider>
      <BrowserRouter>
        <Header />
        <main>
          <AppRoutes />
        </main>
      </BrowserRouter>
    </WeatherProvider>
  );
}

export default App;
