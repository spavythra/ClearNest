import { supabase } from '@/lib/supabase'

describe('supabase client', () => {
  it('exports a supabase client object', () => {
    expect(supabase).toBeDefined()
    expect(typeof supabase).toBe('object')
  })

  it('has auth methods', () => {
    expect(typeof supabase.auth.signInWithPassword).toBe('function')
    expect(typeof supabase.auth.signUp).toBe('function')
    expect(typeof supabase.auth.signOut).toBe('function')
    expect(typeof supabase.auth.getUser).toBe('function')
  })

  it('has from method for database queries', () => {
    expect(typeof supabase.from).toBe('function')
  })
})
