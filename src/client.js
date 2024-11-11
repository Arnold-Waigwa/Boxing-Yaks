import { createClient } from "@supabase/supabase-js";

const URL = "https://lsgbqlwovmxxysjsizfe.supabase.co";

const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzZ2JxbHdvdm14eHlzanNpemZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1MDExNDMsImV4cCI6MjA0NjA3NzE0M30.cWlSie6kfQ1wfM3FKxCnE-1itAUX8TQQ535lCRfhshQ";

export const supabase = createClient(URL, API_KEY);
