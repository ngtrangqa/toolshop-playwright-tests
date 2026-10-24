import { test, expect } from '@playwright/test';

// BÀI MẪU API — dùng fixture `request` của Playwright (không cần mở trình duyệt).
// Swagger: https://api.practicesoftwaretesting.com/api/documentation
const API = 'https://api.practicesoftwaretesting.com';

test.describe('Products API', () => {
  test('TC-A01 GET /products trả danh sách phân trang đúng cấu trúc', async ({ request }) => {
    const res = await request.get(`${API}/products`, { params: { page: 1 } });

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.current_page).toBe(1);
    expect(Array.isArray(body.data)).toBeTruthy();
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.data.length).toBeLessThanOrEqual(body.per_page);

    for (const p of body.data) {
      expect(typeof p.id).toBe('string');
      expect(typeof p.name).toBe('string');
      expect(typeof p.price).toBe('number');
      expect(p.price).toBeGreaterThan(0);
    }
  });

  test('TC-A02 GET /products/{id} không tồn tại → 404', async ({ request }) => {
    const res = await request.get(`${API}/products/does-not-exist-123`);

    expect(res.status()).toBe(404);
    expect(await res.json()).toEqual({ message: 'Requested item not found' });
  });
});
