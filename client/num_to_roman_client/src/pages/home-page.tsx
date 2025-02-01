import {
  Flex,
  Heading,
  TextField,
  Button,
  View,
  Text,
} from "@adobe/react-spectrum";
import { useEffect, useState } from "react";

const inputError = "Please provide an integer number between 1 and 3999.";

export const HomePage = () => {
  const [value, setValue] = useState("");
  const [romanNumeral, setRomanNumeral] = useState("");
  const [error, setError] = useState("");

  // The input could be empty or any integer value between 1 and 3999.
  const validateInput = () => {
    if (!value) {
      return true;
    }
    return /^\d+$/.test(value) && Number(value) >= 1 && Number(value) <= 3999;
  };

  const handleConvert = async () => {
    const response = await fetch(
      `http://localhost:8080/romannumeral?query=${value}`
    );
    const data = await response.json();
    if (response.status === 200) {
      setRomanNumeral(data.output);
    } else if (response.status === 400) {
      setRomanNumeral("");
      setError(data.message);
    } else {
      setRomanNumeral("");
      setError("Unknown error");
    }
  };

  useEffect(() => {
    setError("");
    setRomanNumeral("");
  }, [value]);

  return (
    <Flex alignItems="center" justifyContent="center">
      <Flex
        direction="column"
        gap="size-200"
        alignItems="start"
        position="absolute"
        top="20%"
        left="20%"
      >
        <Heading data-testid="homepage-heading" level={1}>Roman numeral converter</Heading>
        <TextField
          minHeight={100}
          label="Enter a number"
          value={value}
          onChange={setValue}
          isRequired
          validationState={validateInput() ? undefined : "invalid"}
          errorMessage={inputError}
        />
        <Button
          variant="primary"
          onPress={handleConvert}
          isDisabled={!validateInput() || !value}
        >
          Convert to roman numeral
        </Button>
        <View maxWidth="300">
          {romanNumeral && (
            <Text>
              <strong>Roman Numeral: </strong>
              {romanNumeral}
            </Text>
          )}
          {error && <Text UNSAFE_style={{ color: "red" }}>{error}</Text>}
        </View>
      </Flex>
    </Flex>
  );
};
