import express, { Request, Response } from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());

app.get("/api/balance-sheet", async (_req: Request, res: Response) => {
  try {
    const response = await axios.get(
      "http://mock-api:3000/api.xro/2.0/Reports/BalanceSheet"
    );
    res.json(response.data);
  } catch (error) {
    console.error("Failed to fetch balance sheet:", error);
    res.status(500).json({ message: `Failed to fetch balance sheet report ${error}` });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
