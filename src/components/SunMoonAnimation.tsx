import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { keyframes } from '@mui/system';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { THEMES } from '../redux/slices/darkThemeSlice';

const sunMoonRise = keyframes`
  0% {
    bottom: -100px;
    left: 0%; /* Starting at the 9 o'clock position */
  }
  100% {
    bottom: 500px; /* Increase this value to make it rise higher */
    left: 50%; /* Center */
  }
`;

const sunMoonSet = keyframes`
  0% {
    bottom: 500px; /* Starting at the higher point */
    left: 50%; /* Center */
  }
  100% {
    bottom: -100px;
    left: 100%; /* Ending at the 3 o'clock position */
  }
`;

const SunMoonAnimation: React.FC = () => {
    // Get the current theme preference from the Redux store
    const themePreference = useSelector((state: RootState) => state.darkTheme.preference);
    const [isSun, setIsSun] = useState(themePreference === THEMES.LIGHT);
    const [isRising, setIsRising] = useState(true); // Track whether it is in the rising phase
    const [isFirstLoad, setIsFirstLoad] = useState(true); // Track the first load
    const [bgTheme, setBgTheme] = useState(themePreference); // State to control background change

    // Handle theme change
    useEffect(() => {
        if (!isFirstLoad) {
            setIsRising(false); // Trigger the setting animation

            const timer1 = setTimeout(() => {
                setBgTheme(themePreference);
                setIsSun(themePreference === THEMES.LIGHT);
                setIsRising(true);
            }, 3000); // Wait for 3 seconds to complete the setting animation

            return () => clearTimeout(timer1);
        } else {
            setIsFirstLoad(false);
        }
    }, [themePreference]);

    return (
        <Box
            sx={{
                position: 'fixed',
                width: '100vw',
                height: '100vh',
                background: bgTheme === THEMES.DARK
                    ? 'linear-gradient(to top, #000033 0%, #333366 100%)' // Night sky
                    : 'linear-gradient(to top, #FFD1DC -30%, #1E90FF  100%)', // Day sky
                overflow: 'hidden',
                transition: 'background 2s ease', // Smooth transition for background color
                left: 0,
            }}
        >
            {/* Halo effect around Sun or Moon */}
            <Box
                sx={{
                    position: 'absolute',
                    width: '100px', // Slightly larger than the celestial body to create a halo
                    height: '100px',
                    borderRadius: '50%',
                    backgroundColor: isSun ? '#FFD700' : '#B0C4DE', // Same color as the sun or moon
                    animation: `${isRising ? sunMoonRise : sunMoonSet} 3s ease`,
                    animationFillMode: 'forwards', // Retain the final state of the animation
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: isSun 
                        ? '0 0 30px 10px rgba(255, 223, 0, 0.7)' // Sun halo effect
                        : '0 0 30px 10px rgba(176, 196, 222, 0.7)', // Moon halo effect
                }}
            >
                {/* Sun or Moon */}
                <Box
                    sx={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        backgroundColor: isSun ? '#FFD700' : '#B0C4DE', // Sun or Moon color
                    }}
                />
          </Box>
        </Box>
    );
};

export default SunMoonAnimation;