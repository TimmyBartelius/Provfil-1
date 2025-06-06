import { test, expect } from "@playwright/test";

test.describe("Navigeringen", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://tap-ht24-testverktyg.github.io/exam-template/");
  });

  test('visar titeln "Läslistan"', async ({ page }) => {
    // Kontrollerar att sidans titel stämmer överens
    await expect(page).toHaveTitle("Läslistan");
  });

  test('visar knapparna "Katalog", "Lägg till bok" och "Mina böcker" på startsidan', async ({
    page,
  }) => {
    // Kontrollerar att knapparna finns och är synliga
    await expect(page.getByRole("button", { name: "Katalog" })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Lägg till bok" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Mina böcker" })
    ).toBeVisible();
  });

  // Testet "navigerar till katalogvyn och visar minst en bok"

  //  visste inte om jag skulle göra någonting åt det, gå runt det eller dylikt då jag inte sett det dyka upp innan. Men här är test som skall funka om det är enabled.

  // test("navigerar till katalogvyn och visar minst en bok", async ({ page }) => {
  //   const katalogKnapp = page.getByRole("button", { name: "Katalog" });
  //   await katalogKnapp.click();
  //   const books = page.locator('[data-testid="book-list"] li');
  //   await expect(books).toHaveCountGreaterThan(0);
  // });

  // Testet "navigerar till 'Lägg till bok' och visar formulär ..."
  // test('navigerar till "Lägg till bok" och visar formulär med titel-, författar-fält och knapp', async ({ page }) => {
  //   await page.getByRole("button", { name: "Lägg till bok" }).click();
  //   await expect(page.getByLabel("Titel")).toBeVisible();
  //   await expect(page.getByLabel("Författare")).toBeVisible();
  //   await expect(page.getByRole("button", { name: "Lägg till" })).toBeVisible();
  // });

  test('navigerar till "Mina böcker" och visar tom lista när inga favoriter finns', async ({
    page,
  }) => {
    // Klickar på "Mina böcker"
    await page.getByRole("button", { name: "Mina böcker" }).click();

    // Letar upp listan med favoriter och kontrollerar att den är tom
    const favBooks = page.locator('[data-testid="book-list"] li');
    await expect(favBooks).toHaveCount(0);
  });
});
