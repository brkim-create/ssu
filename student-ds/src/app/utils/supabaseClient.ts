// src/app/utils/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('환경 변수 오류: .env 파일에 VITE_SUPABASE_URL과 VITE_SUPABASE_ANON_KEY가 있는지 확인하세요.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');