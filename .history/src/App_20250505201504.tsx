import "./App.css";
import HomePage from "./components/HomePage";
import { AuthProvider } from "./contexts/AuthUserContext";
import UserContext from "./userContext

function App() {
  console.log("App Loaded!");

  return (
    <AuthProvider>
      <HomePage />
    </AuthProvider>
  );
}

export default App;