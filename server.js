import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(rateLimit({ windowMs: 60 * 1000, max: 60 }));

// serve static file → index.html kamu ada di sini
app.use(express.static(path.join(__dirname, "public")));

// quotes API sesuai index.html kamu
const QUOTES = [
  "Jangan menyerah. Proses tidak mengkhianati hasil.",
  "Sukses dimulai ketika kamu berani melangkah.",
  "Kerja keras + fokus = hasil nyata.",
];

app.get("/api/quote", (req, res) => {
  const q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  res.json({ quote: q });
});

// fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("SERVER READY"));
