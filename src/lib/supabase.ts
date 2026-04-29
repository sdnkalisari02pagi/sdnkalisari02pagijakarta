import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://enluvofrnwjyvufhdzfl.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVubHV2b2ZybndqeXZ1ZmhkemZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0NDUwODcsImV4cCI6MjA5MzAyMTA4N30.UPzeeKUQ-U-VZvHTatNzL0c6jCMlUcWnA8a8mJy3BjY"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
