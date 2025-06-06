# Test info

- Name: Navigeringen >> navigerar till "Lägg till bok" och visar formulär med titel-, författar-fält och knapp
- Location: C:\Users\Tipan\Desktop\HTML\Testing\Prov-2\Provfil-1\provfil-1\playwright-test\tests\navigering.test.js:38:7

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: getByLabel('Titel')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for getByLabel('Titel')

    at C:\Users\Tipan\Desktop\HTML\Testing\Prov-2\Provfil-1\provfil-1\playwright-test\tests\navigering.test.js:52:44
```

# Page snapshot

```yaml
- banner:
  - img "Bokklubb på café"
  - heading "Läslistan" [level=1]
  - navigation:
    - button "Katalog"
    - button "Lägg till bok" [disabled]
    - button "Mina böcker"
- main:
  - heading "Välkommen!" [level=2]
  - paragraph: Sidan för dig som gillar att läsa. Välj dina favoriter.
  - text: Titel
  - textbox
  - text: Författare
  - textbox
  - button "Lägg till ny bok" [disabled]
```

# Test source

```ts
   1 | import { test, expect } from "@playwright/test";
   2 |
   3 | test.describe("Navigeringen", () => {
   4 |   // Körs innan varje test, laddar startsidan
   5 |   test.beforeEach(async ({ page }) => {
   6 |     await page.goto("https://tap-ht24-testverktyg.github.io/exam-template/");
   7 |   });
   8 |
   9 |   test('visar titeln "Läslistan"', async ({ page }) => {
  10 |     // Kontrollera att sidans titel är korrekt
  11 |     await expect(page).toHaveTitle("Läslistan");
  12 |   });
  13 |
  14 |   test('visar knapparna "Katalog", "Lägg till bok" och "Mina böcker" på startsidan', async ({
  15 |     page,
  16 |   }) => {
  17 |     // Kontrollera att knapparna finns och är synliga
  18 |     await expect(page.getByRole("button", { name: "Katalog" })).toBeVisible();
  19 |     await expect(
  20 |       page.getByRole("button", { name: "Lägg till bok" })
  21 |     ).toBeVisible();
  22 |     await expect(
  23 |       page.getByRole("button", { name: "Mina böcker" })
  24 |     ).toBeVisible();
  25 |   });
  26 |
  27 |   test("navigerar till katalogvyn och visar minst en bok", async ({ page }) => {
  28 |     // Vänta på att knappen "Katalog" är enabled innan klick
  29 |     const katalogKnapp = page.getByRole("button", { name: "Katalog" });
  30 |     await expect(katalogKnapp).toBeEnabled(); // Byt waitFor till expect.toBeEnabled()
  31 |     await katalogKnapp.click();
  32 |
  33 |     // Leta upp listan med böcker och kontrollera att den innehåller minst en bok
  34 |     const books = page.locator('[data-testid="book-list"] li');
  35 |     await expect(books).toHaveCountGreaterThan(0);
  36 |   });
  37 |
  38 |   test('navigerar till "Lägg till bok" och visar formulär med titel-, författar-fält och knapp', async ({
  39 |     page,
  40 |   }) => {
  41 |     // Klicka på knappen för att navigera till "Lägg till bok"
  42 |     await page.getByRole("button", { name: "Lägg till bok" }).click();
  43 |
  44 |     // Här kan du lägga till en waitForURL eller vänta på en rubrik om sidan byter vy
  45 |     // t.ex. await page.waitForURL('**/add-book');
  46 |     // eller await page.getByRole("heading", { name: "Lägg till bok" }).waitFor();
  47 |
  48 |     // För felsökning: skriv ut hela sidans HTML efter klicket (avkommentera vid behov)
  49 |     // console.log(await page.content());
  50 |
  51 |     // Kontrollera att input-fälten och knappen syns i formuläret
> 52 |     await expect(page.getByLabel("Titel")).toBeVisible();
     |                                            ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  53 |     await expect(page.getByLabel("Författare")).toBeVisible();
  54 |     await expect(page.getByRole("button", { name: "Lägg till" })).toBeVisible();
  55 |   });
  56 |
  57 |   test('navigerar till "Mina böcker" och visar tom lista när inga favoriter finns', async ({
  58 |     page,
  59 |   }) => {
  60 |     // Vänta på att knappen "Mina böcker" är enabled innan klick
  61 |     const minaBockerKnapp = page.getByRole("button", { name: "Mina böcker" });
  62 |     await expect(minaBockerKnapp).toBeEnabled();
  63 |     await minaBockerKnapp.click();
  64 |
  65 |     // Leta upp listan med favoriter och kontrollera att den är tom
  66 |     const favBooks = page.locator('[data-testid="book-list"] li');
  67 |     await expect(favBooks).toHaveCount(0);
  68 |   });
  69 | });
  70 |
```