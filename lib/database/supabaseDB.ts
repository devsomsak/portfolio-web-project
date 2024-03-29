import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();
const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_KEY = process.env.SUPABASE_API_KEY as string;

if (!SUPABASE_KEY) {
  throw new Error(
    "Supabase key is missing. Make sure to set it in your environment variables."
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
