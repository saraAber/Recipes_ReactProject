import "./App.css";
import HomePage from "./components/HomePage";
import { AuthProvider } from "./contexts/AuthUserContext";

function App() {
  console.log("App Loaded!");

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {path="/"ת element:{<HomePage />}}
          {path="*" element:{<HomePage />}}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;