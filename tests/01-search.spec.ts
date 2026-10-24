import { test, expect } from '@playwright/test';

// BÀI MẪU (đã chạy được) — đọc kỹ từng dòng trước khi viết bài của bạn.
test.describe('Search products (UI)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/'); // = baseURL trong playwright.config.ts
  });

  test('TC-S01 search "pliers" chỉ hiện sản phẩm khớp từ khoá', async ({ page }) => {
    // Arrange + Act
    await page.getByTestId('search-query').fill('pliers');
    await page.getByTestId('search-submit').click();

    // Assert
    await expect(page.getByTestId('search-result-count')).toContainText("found for 'pliers'");

    // BÀI HỌC THẬT: dòng đếm hiện ra TRƯỚC khi danh sách sản phẩm vẽ lại xong.
    // Đọc allInnerTexts() ngay lúc đó có thể lấy nhầm danh sách cũ ("Bolt Cutters") → flaky.
    // allInnerTexts() chỉ đọc 1 lần, KHÔNG tự đợi. Bọc trong expect(...).toPass()
    // để Playwright thử lại cả khối cho tới khi đúng (hoặc hết 10 giây).
    await expect(async () => {
      const names = await page.getByTestId('product-name').allInnerTexts();
      expect(names.length).toBeGreaterThan(0);
      for (const name of names) {
        expect(name.toLowerCase()).toContain('pliers');
      }
    }).toPass({ timeout: 10_000 });
  });

  test('TC-S02 search từ khoá không tồn tại hiện thông báo "no products"', async ({ page }) => {
    await page.getByTestId('search-query').fill('zzqqxx');
    await page.getByTestId('search-submit').click();

    await expect(page.getByTestId('no-results')).toHaveText('There are no products found.');
    await expect(page.getByTestId('product-name')).toHaveCount(0);
  });
});
