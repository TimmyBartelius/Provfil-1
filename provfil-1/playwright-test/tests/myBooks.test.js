import { test, expect } from "@playwright/test";

test.describe("Kollar så min gillade bok finns i min lista", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://tap-ht24-testverktyg.github.io/exam-template/");
  });

  test("Kollar så att boken jag gillat syns i listan", async ({ page }) => {
    await page
      .getByTestId("star-Hur man tappar bort sin TV-fjärr 10 gånger om dagen")
      .click();

    //gå till sidan där du ser dina gillade böcker
    await page.getByTestId("favorites").click();

    //Se om boken ligger i listan
    const favorit = page.getByTestId(
      "fav-Hur man tappar bort sin TV-fjärr 10 gånger om dagen"
    );
    await expect(favorit).toBeVisible();
    await expect(favorit).toHaveText(
      "Hur man tappar bort sin TV-fjärr 10 gånger om dagen"
    );
  });
});
