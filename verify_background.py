
import asyncio
from playwright.async_api import async_playwright
import http.server
import socketserver
import threading

PORT = 8000

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory='.', **kwargs)

async def main():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        server_thread = threading.Thread(target=httpd.serve_forever)
        server_thread.daemon = True
        server_thread.start()
        print(f"Servidor iniciado em http://localhost:{PORT}")

        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = await browser.new_page()
            await page.goto(f"http://localhost:{PORT}/game.html")

            # Espera um pouco para a página carregar completamente
            await page.wait_for_timeout(1000)

            body_handle = await page.query_selector('body')
            background_style = await page.evaluate('(element) => window.getComputedStyle(element).getPropertyValue("background-image")', body_handle)

            print(f"Background Style: {background_style}")

            # Verifica se o background está correto
            expected_background = f'url("http://localhost:{PORT}/assets/images/MapaIN.png")'
            if expected_background in background_style:
                print("VERIFICATION SUCCESS: A imagem de fundo foi aplicada corretamente!")
            else:
                print(f"VERIFICATION FAILED: A imagem de fundo esperada era '{expected_background}', mas o valor encontrado foi '{background_style}'.")

            await page.screenshot(path="background_verification.png")
            print("Captura de tela salva em 'background_verification.png'")

            await browser.close()

        httpd.shutdown()

if __name__ == "__main__":
    asyncio.run(main())
