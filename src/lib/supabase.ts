import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

function mockChain() {
  const chain = {
    select: () => chain,
    insert: () => chain,
    update: () => chain,
    delete: () => chain,
    eq: () => chain,
    single: () => Promise.resolve({ data: null, error: new Error('Supabase not configured. Add env vars.') }),
    then: (resolve: (v: unknown) => unknown) => resolve({ data: null, error: null }),
  }
  return chain
}

function getClient(url: string, key: string) {
  if (!url || !key) {
    return {
      from: () => mockChain(),
      rpc: () => Promise.resolve({ data: null, error: new Error('Supabase not configured. Add env vars.') }),
      auth: {
        signInWithPassword: () => Promise.resolve({ data: null, error: new Error('Supabase not configured.') }),
        signOut: () => Promise.resolve({ error: null }),
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      },
    } as unknown as ReturnType<typeof createClient>
  }
  return createClient(url, key)
}

export const supabase = getClient(supabaseUrl, supabaseAnonKey)

export const supabaseAdmin = process.env.SUPABASE_SERVICE_ROLE_KEY
  ? getClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY)
  : supabase
