import { useEffect, useState } from "react";
import { defaultTheme, View, Provider } from "@adobe/react-spectrum";
import { HomePage } from "./pages/home-page";

function App() {
  // Determines if the user's system preference is set to dark mode.
  const isDarkMode = () => {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  };

  const [colorScheme, setColorScheme] = useState<"dark" | "light">(
    isDarkMode() ? "dark" : "light"
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    console.log(mediaQuery);
    const handleChange = (e: { matches: any }) => {
      setColorScheme(e.matches ? "dark" : "light");
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <Provider theme={defaultTheme} colorScheme={colorScheme}>
      <View position="relative" height="100vh">
        <HomePage />
      </View>
    </Provider>
  );
}

export default App;
