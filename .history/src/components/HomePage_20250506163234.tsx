import { Box, Button, IconButton } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { useState } from "react";
import { useAuth } from "../contexts/AuthUserContext";
import LoginModal from "./Login";
import SignupModal from "./SignIn";

function HomePage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const { user } = useAuth();

  return (
    <>
      {/* כפתורים קבועים בפינה כמו בדוגמה הראשונה */}
      <Box 
        position="fixed" 
        top={16} 
        right={16} 
        display="flex" 
        gap={2}
        zIndex={1000}
      >
        <Box 
          position="fixed" 
          top={16} 
          left={16}
        >
          <IconButton 
            component={Link} 
            to={"/"} 
            sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
          >
            <HomeIcon sx={{ color: 'white' }} />
          </IconButton>
        </Box>

        {!user && (
          <>
            <Button 
              onClick={() => setShowLogin(true)} 
              variant="contained" 
              sx={{ 
                bgcolor: 'primary.main', 
                '&:hover': { bgcolor: 'primary.dark' },
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
                bgcolor: 'primary.main', 
                '&:hover': { bgcolor: 'primary.dark' },
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
          to={"/GetRecipes"} 
          variant="contained" 
          sx={{ 
            bgcolor: 'primary.main', 
            '&:hover': { bgcolor: 'primary.dark' },
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
          to={"/AddRecipe"} 
          variant="contained" 
          sx={{ 
            bgcolor: 'primary.main', 
            '&:hover': { bgcolor: 'primary.dark' },
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

      {/* הצגת המודאלים */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}

      <Outlet />
    </>
  );
}

export default HomePage;
