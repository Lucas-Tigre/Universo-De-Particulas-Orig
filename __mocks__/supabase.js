// __mocks__/supabase.js
export const createClient = () => ({
  from: () => ({
    select: () => ({
      order: () => ({
        limit: () => ({
          data: [],
          error: null,
        }),
      }),
    }),
    insert: () => ({
      data: null,
      error: null,
    }),
  }),
  auth: {
    signUp: () => ({
      user: null,
      error: null,
    }),
    signInWithPassword: () => ({
      user: null,
      error: null,
    }),
    signOut: () => ({
      error: null,
    }),
  },
});
