import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthUserContext";
import axios from "axios";

function Login({ onClose }: { onClose?: () => void }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { saveUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    if (!userName || !password) {
      setError("מלא את כל השדות");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/user/login",
        {
          UserName: userName,    // <-- שדה תואם לשרת
          Password: password,    // <-- שדה תואם לשרת
        },
        { headers: { "Content-Type": "application/json" } }
      );
      // אם השרת מחזיר את האובייקט ישירות:
      const loggedInUser = res.data; 
      saveUser(loggedInUser);
      navigate("/recipes");
      onClose?.();
    } catch (err: any) {
      setError("שגיאה בהתחברות. בדוק את הפרטים.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>התחברות</h2>
        <input
          type="text"
          placeholder="שם משתמש"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="סיסמה"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁"}
          </button>
        </div>

        {error && <p className="error">{error}</p>}
        <div className="modal-buttons">
          <button onClick={handleLogin}>כניסה</button>
          <button onClick={() => onClose?.()}>❌</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
