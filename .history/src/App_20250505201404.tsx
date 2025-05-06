import "./App.css";
import HomePage from "./components/HomePage";
import { AuthProvider } from "./contexts/AuthUserContext";

function App() {
  console.log("App Loaded!");

  return (
    <AuthProvider>

          {path="/", element:{<HomePage />}}
          {path="*", element:{<HomePage />}}
    </AuthProvider>
  );
}

export default App;