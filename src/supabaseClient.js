import { createClient } from '@supabase/supabase-js';

// Hardcoding the keys here since the app is already running and this avoids needing to restart the dev server to read .env
const SUPABASE_URL = 'https://lgehmeczjskzhwktmxhl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnZWhtZWN6anNremh3a3RteGhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2NDYzMzMsImV4cCI6MjEwMDIyMjMzM30.WAoDOaKxE1oCiejDBDopAbESsYCfXjTczSwYlrNLqug';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
