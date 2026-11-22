import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ytydwkzxkbmyogxdlzlg.supabase.co';
const supabaseKey = 'sb_publishable__0biRi1laauuMHIdz8lF7A_ATskVS2e';

export const supabase = createClient(supabaseUrl, supabaseKey);