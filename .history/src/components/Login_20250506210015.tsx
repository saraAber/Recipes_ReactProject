import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthUserContext";
import axios from "axios";

function Login({ onClose }: { onClose?: () => void }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
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
          UserName: userName,
          Password: password,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const loggedInUser = res.data;
      saveUser(loggedInUser);
      setSuccess(true);

      setTimeout(() => {
        navigate("/recipes");
        onClose?.();
      }, 1500); // 1.5 שניות להנפשה/הודעה
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

        {error && <p className="error-message">{error}</p>}
        {success && (
          <p className="success-message">🎉 התחברת בהצלחה! מועבר/ת לדף המתכונים...</p>
        )}

        <div className="modal-buttons">
          <button onClick={handleLogin} disabled={success}>
            כניסה
          </button>
          <button onClick={() => onClose?.()}>❌</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
