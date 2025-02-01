import { useState } from "react";
import {
  defaultTheme,
  View,
  Switch,
  Provider,
} from "@adobe/react-spectrum";
import { HomePage } from "./pages/home-page";


function App() {
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("light");
    const toggleColorScheme = () => {
      setColorScheme(colorScheme === "light" ? "dark" : "light");
    };

  return (
    <Provider theme={defaultTheme} colorScheme={colorScheme}>
      <View position="relative" height="100vh">
        <Switch
          position="absolute"
          top="10%"
          right="10%"
          isSelected={colorScheme === "dark"}
          onChange={toggleColorScheme}
        />
        <HomePage/>
      </View>
    </Provider>
  );
}

export default App;
