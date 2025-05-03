import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import SplashScreen from './splash_screen';


export default function Index() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <SplashScreen />
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Your main app content goes here */}
      <Text>Main App Content</Text>
    </View>
  )

}
