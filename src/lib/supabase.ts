// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  "https://enluvofrnwjyvufhdzfl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVubHV2b2ZybndqeXZ1ZmhkemZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0NDUwODcsImV4cCI6MjA5MzAyMTA4N30.UPzeeKUQ-U-VZvHTatNzL0c6jCMlUcWnA8a8mJy3BjY"
)
