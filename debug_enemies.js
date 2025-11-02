import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Captura e imprime logs do console do navegador
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));

  try {
    // Navega para a página do jogo
    await page.goto('http://localhost:8000/game.html', { waitUntil: 'networkidle' });

    // Clica no canvas para iniciar o jogo
    await page.click('#canvas', { force: true });
    console.log('Canvas clicado para iniciar o jogo.');

    // Espera 3 segundos para dar tempo para a lógica de spawn ser executada
    await page.waitForTimeout(3000);
    console.log('Aguardando 3 segundos...');

    // Acessa o estado do jogo e verifica o array de inimigos
    const enemiesState = await page.evaluate(() => {
      // Verifica se a instância do jogo e o estado estão disponíveis
      if (window.UdeP && window.UdeP.instance && window.UdeP.instance.state) {
        // Retorna uma cópia do array de inimigos para evitar problemas de serialização
        return JSON.parse(JSON.stringify(window.UdeP.instance.state.enemies));
      }
      return null; // Retorna nulo se o estado não for encontrado
    });

    console.log('========================================');
    console.log('RESULTADO DA DEPURAÇÃO DO ESTADO DOS INIMIGOS:');
    console.log('========================================');

    if (enemiesState === null) {
      console.error('ERRO: A instância do jogo (window.UdeP.instance.state) não foi encontrada.');
    } else if (enemiesState.length === 0) {
      console.warn('AVISO: O array de inimigos está vazio. Nenhum inimigo foi adicionado ao estado.');
    } else {
      console.log(`SUCESSO: ${enemiesState.length} inimigo(s) encontrado(s) no estado.`);
      console.log('Detalhes do primeiro inimigo:', enemiesState[0]);
    }
    console.log('========================================');

  } catch (error) {
    console.error('Ocorreu um erro durante a execução do script:', error);
  } finally {
    await browser.close();
  }
})();
