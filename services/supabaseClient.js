const supabaseUrl = 'INSERT_SUPABASE_URL_HERE';
const supabaseKey = 'INSERT_SUPABASE_ANON_KEY_HERE';

let supabaseClient = null;

try {
    supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
} catch (error) {
    console.error("Supabase initialization failed. Please ensure SUPABASE_URL and SUPABASE_ANON_KEY are injected via build.sh.");
}

window.supabaseClient = supabaseClient;