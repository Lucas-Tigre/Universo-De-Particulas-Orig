/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
  // Resolveu o problema de importação de módulos externos (CDN)
  moduleNameMapper: {
    // Escapa os caracteres especiais da URL (., +) para a regex funcionar
    '^https://cdn\\.jsdelivr\\.net/npm/chart\\.js$': '<rootDir>/__mocks__/chart.js',
    '^https://cdn\\.jsdelivr\\.net/npm/@supabase/supabase-js/\\+esm$': '<rootDir>/__mocks__/supabase.js',
  },
  // Necessário para que os testes entendam ES Modules
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};

module.exports = config;
