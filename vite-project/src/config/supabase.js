import {createClient} from '@supabase/supabase-js'

const supabaseUrl = "https://mbzluisrzxmskyoiehjz.supabase.co";
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1iemx1aXNyenhtc2t5b2llaGp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI0NzEyNjAsImV4cCI6MTk4ODA0NzI2MH0.b3pb6rwG3NZNDdYqqGHcCL9MTAqTySatzPidPqKEnyE';

export const supabase = createClient(supabaseUrl,supabaseKey);

    