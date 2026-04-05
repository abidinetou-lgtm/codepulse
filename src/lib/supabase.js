// supabase.js
// Le client Supabase — une seule instance
// partagée dans toute l'app.
// Comme une connexion à la base de données
// qu'on ouvre une fois et réutilise partout.

import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)