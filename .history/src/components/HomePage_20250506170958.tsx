import { Box, Button, IconButton, CircularProgress } from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthUserContext";
import LoginModal from "./Login";
import SignupModal from "./SignIn";
import HomeIcon from '@mui/icons-material/Home';

function HomePage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  // סגירת מודאלים בעת ניווט
  useEffect(() => {
    setShowLogin(false);
    setShowSignup(false);
  }, [location]);

  // טיפול בטעינה ראשונית של context
  if (user === undefined) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {/* כפתור בית בצד שמאל */}
      <Box position="fixed" top={16} left={16} zIndex={1000}>
        <IconButton
          component={Link}
          to="/"
          sx={{ bgcolor: '#DC143C', '&:hover': { bgcolor: '#B22222' } }}
        >
          <HomeIcon sx={{ color: 'white' }} />
        </IconButton>
      </Box>

      {/* תפריט עליון בצד ימין */}
      <Box
        position="fixed"
        top={16}
        right={16}
        display="flex"
        gap={2}
        zIndex={1000}
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
                textTransform: 'none'
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
                textTransform: 'none'
              }}
            >
              SignIn
            </Button>
          </>
        )}

        <Button
          component={Link}
          to="/GetRecipes"
          variant="contained"
          sx={{
            bgcolor: '#DC143C',
            '&:hover': { bgcolor: '#B22222' },
            height: '56px',
            width: '160px',
            fontSize: '16px',
            borderRadius: '12px',
            textTransform: 'none'
          }}
        >
          GetRecipes
        </Button>
        <Button
          component={Link}
          to="/AddRecipe"
          variant="contained"
          sx={{
            bgcolor: '#DC143C',
            '&:hover': { bgcolor: '#B22222' },
            height: '56px',
            width: '160px',
            fontSize: '16px',
            borderRadius: '12px',
            textTransform: 'none'
          }}
        >
          AddRecipe
        </Button>
      </Box>

      {/* מרווח מלמעלה שלא יחתך הדף */}
      <Box sx={{ paddingTop: '100px' }}>
        <Outlet />
      </Box>

      {/* מודאלים */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
    </>
  );
}

export default HomePage;
