import { Router } from "express";
import { errorMeg, validateQuery, numToRoman } from "../utils/num_to_roman";

const romannumeral = Router();

romannumeral.get("/", (req, res) => {
  const query = req.query.query as string;
  if (!validateQuery(query)) {
    res.status(400).send({message: errorMeg});
    return;
  }
  try {
    res.json({ input: query, output: numToRoman(parseInt(query, 10)) });
  } catch (e: any) {
    res.status(400).send({message: e.message});
    return;
  }
});

export default romannumeral;
