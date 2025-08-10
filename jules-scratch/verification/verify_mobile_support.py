import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        # Set a mobile viewport
        context = await browser.new_context(
            viewport={'width': 375, 'height': 667},
            is_mobile=True,
            user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1'
        )
        page = await context.new_page()

        try:
            await page.goto("http://localhost:3000")
            # Wait for the page to be fully loaded
            await page.wait_for_load_state('networkidle')
            await page.screenshot(path="jules-scratch/verification/verification.png", full_page=True)
        except Exception as e:
            print(f"An error occurred: {e}")
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
