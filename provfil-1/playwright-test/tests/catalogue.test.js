import { test, expect } from "@playwright/test";

test.describe("Gilla/ogilla första boken i katalogen", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://tap-ht24-testverktyg.github.io/exam-template/");
  });

  test("Gilla och ogilla första boken", async ({ page }) => {
    const title = "Hur man tappar bort sin TV-fjärr 10 gånger om dagen";
    const heart = page.locator(`[data-testid="star-${title}"]`);

    // Klicka för att markera
    await heart.click();
    await expect(heart).toHaveClass(/selected/);

    // Klicka igen för att avmarkera
    await heart.click();
    await expect(heart).not.toHaveClass(/selected/);
  });
});
