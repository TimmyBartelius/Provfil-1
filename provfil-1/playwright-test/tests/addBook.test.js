import { test, expect } from "@playwright/test";

test.describe("Kollar så man kan lägga till en ny bok med text-input", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://tap-ht24-testverktyg.github.io/exam-template/");
  });

  test("Testar om man kan fylla i en titel", async ({ page }) => {
    //lägger till en ny bok
    await page.getByTestId("add-book").click();

    //hitta rätt input
    await page.getByTestId("add-input-title").fill("The Winter Wars");
    await page.getByTestId("add-input-author").fill("T.Bartelius");

    //rätt input kontrolleras
    await expect(page.getByTestId("add-input-title")).toHaveValue(
      "The Winter Wars"
    );
    await expect(page.getByTestId("add-input-author")).toHaveValue(
      "T.Bartelius"
    );

    //klickar på lägg-till knappen
    await page.getByRole("Button", { name: "Lägg till ny bok" }).click();
  });
});
