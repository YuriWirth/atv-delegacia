import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import armasRoutes from "./routes/armas.routes";
import crimeRoutes from "./routes/crime.routes";
import criminosoRoutes from "./routes/criminoso.routes";
dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT;

app.listen(port, () => {
  console.log("Server is running...");
});

//ROUTES

app.use("/armas", armasRoutes());
app.use("/crime", crimeRoutes());
app.use("/criminoso", criminosoRoutes());

//ROUTES
app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ success: true, msg: "Server is running!" });
});
