import { Router } from "express";
import { ERROR_MSG, validateQuery, numToRoman } from "../utils/num_to_roman";

const romannumeral = Router();

/**
 * This route expects a query parameter named `query` containing an integer between 1 and 3999.
 * If the `query` parameter is missing or invalid, it responds with a 400 status and an error message.
 * On success, it responds with a JSON object containing the input number and its Roman numeral equivalent.
 */
romannumeral.get("/", (req, res) => {
  const query = req.query.query as string;
  if (!validateQuery(query)) {
    res.status(400).send({ message: ERROR_MSG });
    return;
  }
  try {
    res.json({ input: query, output: numToRoman(parseInt(query, 10)) });
  } catch (e: any) {
    res.status(400).send({ message: e.message });
    return;
  }
});

export default romannumeral;
