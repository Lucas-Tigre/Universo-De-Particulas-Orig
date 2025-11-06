import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import * as game from './js/game.js';
import * as state from './js/state.js';
import * as config from './js/config.js';

// Mock abrangente para o módulo de UI, incluindo todas as funções chamadas por game.js
jest.mock('./js/ui.js', () => ({
  updateUI: jest.fn(),
  updateWaveUI: jest.fn(),
  showGameOver: jest.fn(),
  updateHealthBar: jest.fn(),
  updateXPBar: jest.fn(),
  updateBigBangChargeBar: jest.fn(),
  updateBigBangIndicator: jest.fn(),
  updateStatsPanel: jest.fn(),
  updateQuestUI: jest.fn(),
  toggleSoundUI: jest.fn(),
  displayLeaderboard: jest.fn(),
  updateFps: jest.fn(),
  highlightActiveMode: jest.fn(),
}));

describe('Game Logic', () => {
  beforeEach(() => {
    // Reseta o estado e a configuração antes de cada teste
    // para garantir isolamento
    state.resetState();
    config.resetConfig();

    // O canvas e o seu contexto já são mockados globalmente no jest.setup.js,
    // então não precisamos mais mocká-los aqui.

    // Inicializa o jogo
    game.initGame();
  });

  it('deve inicializar o jogo com o estado padrão', () => {
    // O estado do jogador é complexo e misturado em config.js,
    // então vamos verificar as propriedades lá.
    const player = config.config.players[0];
    expect(player.health).toBe(player.maxHealth);

    // O estado das entidades dinâmicas está em state.js
    expect(state.enemies.length).toBe(0);
    expect(state.particles.length).toBe(0);
    expect(config.config.wave.number).toBe(1);
  });

  it('deve reiniciar o jogo e restaurar o estado inicial', () => {
    // Modifica o estado para simular o andamento do jogo
    config.config.players[0].health = 50;
    state.setEnemies([{ id: 1, health: 10 }]);

    // Reinicia o jogo
    game.restartGame();

    const player = config.config.players[0];
    expect(player.health).toBe(player.maxHealth);
    expect(state.enemies.length).toBe(0);
    expect(config.config.wave.number).toBe(1);
  });
});
