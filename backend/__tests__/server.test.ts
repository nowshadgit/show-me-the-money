import request from 'supertest';
import express, { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const app = express();
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

const mockAxios = new MockAdapter(axios);

describe("Getting data with /api/balance-sheet", () => {

  it("should return balance sheet data successfully", async () => {
    const mockData = {
      Reports: [{ ReportName: "Balance Sheet Report", Rows: [] }],
    };

    mockAxios
      .onGet("http://mock-api:3000/api.xro/2.0/Reports/BalanceSheet")
      .reply(200, mockData);

    const response = await request(app).get("/api/balance-sheet");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
  });

  it("should return 500 when external API fails", async () => {
    mockAxios
      .onGet("http://mock-api:3000/api.xro/2.0/Reports/BalanceSheet")
      .reply(500);

    const response = await request(app).get("/api/balance-sheet");

    expect(response.status).toBe(500);
    expect(response.body.message).toContain("Failed to fetch balance sheet report");
  });
});
