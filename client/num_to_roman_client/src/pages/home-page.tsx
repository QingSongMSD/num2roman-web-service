import {
  Flex,
  Heading,
  TextField,
  Button,
  View,
  Text,
} from "@adobe/react-spectrum";
import { useEffect, useState } from "react";

// Error message displayed when an unknown error occurs.
export const UNKNOWN_ERROR = "Unknown error";

// Error message displayed for invalid input.
export const inputError =
  "Please provide an integer number between 1 and 3999.";

// HomePage component provides a user interface to convert integers to Roman numerals.
export const HomePage = () => {
  const [value, setValue] = useState("");
  const [romanNumeral, setRomanNumeral] = useState("");
  const [error, setError] = useState("");

  // Validates the user's input to ensure it is an integer between 1 and 3999.
  const validateInput = () => {
    if (!value) {
      return true;
    }
    return /^\d+$/.test(value) && Number(value) >= 1 && Number(value) <= 3999;
  };

  // Handles the conversion of the input value to a Roman numeral by making a request to the backend API.
  const handleConvert = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/romannumeral?query=${value}`
      );
      if (response.ok) {
        const data = await response.json();
        setRomanNumeral(data.output);
        setError("");
      } else {
        const error = await response.json();
        setRomanNumeral("");
        setError(error?.message || UNKNOWN_ERROR);
      }
    } catch (error) {
      setRomanNumeral("");
      setError(UNKNOWN_ERROR);
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
        <Heading data-testid="homepage-heading" level={1}>
          Roman numeral converter
        </Heading>
        <TextField
          data-testid="input-field"
          minHeight={100}
          label="Enter a number"
          value={value}
          onChange={setValue}
          isRequired
          validationState={validateInput() ? undefined : "invalid"}
          errorMessage={inputError}
        />
        <Button
          data-testid="convert-button"
          variant="primary"
          onPress={handleConvert}
          isDisabled={!validateInput() || !value}
        >
          Convert to roman numeral
        </Button>
        <View maxWidth="300">
          {romanNumeral && (
            <Text data-testid="output-field">
              <strong>Roman Numeral: </strong>
              {romanNumeral}
            </Text>
          )}
          {error && (
            <Text data-testid="server-error" UNSAFE_style={{ color: "red" }}>
              {error}
            </Text>
          )}
        </View>
      </Flex>
    </Flex>
  );
};
