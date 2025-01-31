import { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Heading,
  Provider,
  TextField,
  Text,
  defaultTheme,
  View,
} from "@adobe/react-spectrum";

export const errorMeg =
  "Invalid input. Please provide an integer number between 1 and 3999.";

function App() {
  const [value, setValue] = useState("");
  const [romanNumeral, setRomanNumeral] = useState("");
  const [error, setError] = useState("");

  const validateInput = (input: string) => {
    return /^\d+$/.test(input);
  };

  const handleConvert = async () => {
    const response = await fetch(
      `http://localhost:8080/romannumeral?query=${value}`
    );

    console.log("response", response.json);
    const data = await response.json();

    console.log("data", data);
    if (response.status === 200) {
      setRomanNumeral(data.output);
    } else {
      setRomanNumeral("");
      setError(data.message);
    }
  };

  useEffect(() => {
    console.log("value changed", value);
    console.log("romanNumeral changed", romanNumeral);
    setError("");
    setRomanNumeral("");
  }, [value]);

  return (
    <Provider theme={defaultTheme}>
      <Flex
        direction="column"
        alignItems="start"
        justifyContent="center"
        height="100vh"
        marginStart="size-800"
      >
        <Flex direction="column" gap="size-300" alignItems="start">
          <Heading level={1}>Roman numeral converter</Heading>
          <TextField
            label="Enter a number"
            value={value}
            defaultValue="3000"
            onChange={setValue}
          />
          <Button variant="primary" onPress={handleConvert}>
            Convert to roman numeral
          </Button>
          <View
            height="size-400" // Fixed height
            overflow="hidden" // Hide overflow content
          >
            <Flex alignItems="center" justifyContent="center" height="100%" width="100%">
              {romanNumeral && (
                <Text>
                  <strong>Roman Numeral: </strong>
                  {romanNumeral}
                </Text>
              )}
              {error && <Text>{error}</Text>}
            </Flex>
          </View>
        </Flex>
      </Flex>
    </Provider>
  );
}

export default App;
