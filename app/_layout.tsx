import useAuthStore from "@/store/auth.store";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import "./global.css";

export default function RootLayout() {
  const { isLoading, fetchAuthenticatedUser } = useAuthStore();
  const [fontsLoaded, fontLoadError] = useFonts({
    "QuickSand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "QuickSand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "QuickSand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "QuickSand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "QuickSand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
  });

  useEffect(() => {
    if (fontLoadError) throw fontLoadError;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, fontLoadError]);

  useEffect(() => {
    fetchAuthenticatedUser();
  }, []);

  if(!fontsLoaded || isLoading) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}
