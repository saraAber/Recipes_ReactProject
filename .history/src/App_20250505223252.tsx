import "./App.css";
import HomePage from "./components/HomePage";
import { AuthProvider } from "./contexts/AuthUserContext";

function App() {
  console.log("App Loaded!");

  return (
    <AuthProvider>
      <HomePage />
      <Outlet />
    </AuthProvider>
  );
}

export default App;