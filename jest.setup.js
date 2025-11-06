// Mock para a API de Áudio que não existe no JSDOM
global.Audio = jest.fn().mockImplementation(() => ({
  play: jest.fn(),
  pause: jest.fn(),
  load: jest.fn(), // Adicionado para compatibilidade com a função preloadMusic
  volume: 1,
}));

// Mock para as dimensões da janela
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1280,
});

Object.defineProperty(window, 'innerHeight', {
  writable: true,
  configurable: true,
  value: 720,
});

// Mock para elementos HTML que o jogo espera encontrar
document.body.innerHTML = `
  <canvas id="canvas"></canvas>
  <div id="game-over-screen"></div>
  <span id="stat-wave"></span>
  <div id="bigbang-charge-container"></div>
  <div id="galaxy-owner-display"></div>
  <div id="menu"></div>
  <div id="menu-toggle"></div>
  <div id="galaxy-map"></div>
  <div id="skill-tree"></div>
  <div id="skins-modal"></div>
  <button id="restart-btn"></button>
  <button id="close-galaxy-map"></button>
  <button id="close-skill-tree"></button>
  <button id="close-skins"></button>
`;

// Mock para o método getContext do canvas, que não existe no JSDOM
HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
  clearRect: jest.fn(),
  fillRect: jest.fn(),
  beginPath: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  stroke: jest.fn(),
  closePath: jest.fn(),
  save: jest.fn(),
  restore: jest.fn(),
  translate: jest.fn(),
  fillText: jest.fn(),
}));
