import { createClient } from "@supabase/supabase-js";
const sb = createClient(
  "https://rhsiawnssdarurleehpl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxOTg4Njc0MSwiZXhwIjoxOTM1NDYyNzQxfQ.hWoM814kdWNd8ElmJyHZfEtpXQ5sz6qjzXn6NbvD0wo"
);

export default sb;
