import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import SplashScreen from './splash_screen';

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);
 

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) return <SplashScreen />;

  return <Redirect href="/instruments" />; // Redirect to the instruments page after the splash screen

  
}
