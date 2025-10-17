import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header/Header";
import AppRoutes from "./components/AppRoutes/AppRoutes";

function App() {
  return (
    <Router>
      <Header />
      <AppRoutes />
    </Router>
  );
}

export default App;
