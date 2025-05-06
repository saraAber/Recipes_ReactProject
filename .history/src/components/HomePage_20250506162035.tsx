import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthUserContext";
import LoginModal from "./Login";
import SignupModal from "./SignIn";
import { Button } from '@mui/material';

function HomePage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div
      className="home-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '50px 20px',
        boxSizing: 'border-box',
      }}
    >
      <div
        className="button-group"
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '30px',
          flexWrap: 'wrap',
        }}
      >
        {!user && (
          <>
            <Button
              onClick={() => setShowLogin(true)}
              variant="contained"
              sx={{
                bgcolor: '#DC143C',
                '&:hover': { bgcolor: '#B22222' },
                height: '56px',
                width: '160px',
                fontSize: '16px',
                borderRadius: '12px',
                textTransform: 'none',
              }}
            >
              Login
            </Button>
            <Button
              onClick={() => setShowSignup(true)}
              variant="contained"
              sx={{
                bgcolor: '#DC143C',
                '&:hover': { bgcolor: '#B22222' },
                height: '56px',
                width: '160px',
                fontSize: '16px',
                borderRadius: '12px',
                textTransform: 'none',
              }}
            >
              SignIn
            </Button>
          </>
        )}
        <Button
          component={Link}
          to={"/GetRecipes"}
          variant="contained"
          sx={{
            bgcolor: '#DC143C',
            '&:hover': { bgcolor: '#B22222' },
            height: '56px',
            width: '160px',
            fontSize: '16px',
            borderRadius: '12px',
            textTransform: 'none',
          }}
        >
          GetRecipe
        </Button>
        <Button
          component={Link}
          to={"/AddRecipe"}
          variant="contained"
          sx={{
            bgcolor: '#DC143C',
            '&:hover': { bgcolor: '#B22222' },
            height: '56px',
            width: '160px',
            fontSize: '16px',
            borderRadius: '14px',
            textTransform: 'none',
          }}
        >
          AddRecipe
        </Button>
      </div>

      {/* מודאלים */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
    </div>
  );
}

export default HomePage;
