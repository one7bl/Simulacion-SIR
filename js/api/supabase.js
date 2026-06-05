import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Configuración de Supabase
// REEMPLAZA ESTOS VALORES CON LOS DE TU PROYECTO
export const SUPABASE_URL = 'https://dntysilkoatmbjbttvtn.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRudHlzaWxrb2F0bWJqYnR0dnRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2MDgzOTksImV4cCI6MjA5NjE4NDM5OX0.TmDXEE9f6UVfgbsKYNztI_S6wwZRqaccgbWOh037Pr8';

// Inicializar el cliente de Supabase
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
