import { test, expect } from '@playwright/test';

// ===== PHẦN CỦA BẠN =====
// Viết 3 test dưới đây. Xoá `.fixme` khi bắt đầu viết từng test.
// Gợi ý data-test trên trang chi tiết sản phẩm: product-name, unit-price, quantity,
// increase-quantity, decrease-quantity, add-to-cart. Trên menu: nav-cart, cart-quantity.
// Thông báo sau khi thêm giỏ hàng có role="alert".

const API = 'https://api.practicesoftwaretesting.com';

test('TC-C01 thêm 2 "Combination Pliers" vào giỏ → badge giỏ hàng = 2', async ({ page }) => {
  // 1. Mở trang chủ, click vào sản phẩm có tên "Combination Pliers"
  await page.goto('/');
  await page.getByTestId('product-name').filter({hasText: 'Combination Plier'}).click();
  // 2. Trên trang chi tiết: kiểm tra product-name đúng
  await expect(page.getByTestId('product-name')).toHaveText('Combination Pliers');
  // 3. Bấm increase-quantity 1 lần → quantity phải là "2"
  await page.getByTestId('increase-quantity').click();
  await expect(page.getByTestId('quantity')).toHaveValue('2');
  // 4. Bấm add-to-cart
  await page.getByTestId('add-to-cart').click();
  // 5. Assert: thông báo "Product added to shopping cart." và cart-quantity = "2"
  await expect(page.getByRole('alert')).toContainText('Product added to shopping cart');
  await expect(page.getByTestId('cart-quantity')).toHaveText('2');
});

test('TC-A03 GET /products/search?q=pliers → mọi kết quả đều chứa "pliers"', async ({ request }) => {
  
  // Bước 1: Gửi request GET tới /products/search với q = pliers
  const res = await request.get(`${API}/products/search`, { params: { q: 'pliers'}});

  // Bước 2: Expected: status = 200
  expect(res.status()).toBe(200);

  //Bước 3: Lấy body, Expected: danh sách data không rỗng
  const body = await res.json();
  expect(body.data.length).toBeGreaterThan(0);

  //Bước 4: Expected: tên của MỌI sản phẩm đều chứa "pliers"
  for (const p of body.data) {
    expect(p.name.toLowerCase()).toContain('pliers');
  }

});

test('TC-X01 (UI + API) giá trên trang chi tiết khớp giá trả về từ API', async ({ page, request }) => {

  // Bước 1: Gọi API tìm "hammer", Expected: status = 200
  const res = await request.get(`${API}/products/search`, {params: { q:'hammer'}});
  expect(res.status()).toBe(200);

 // Bước 2: Lấy sản phẩm ĐẦU TIÊN trong danh sách
 const body = await res.json();
 const product = body.data[0];

 // Bước 3: Mở trang chi tiết của sản phẩm đó
 await page.goto(`/product/${product.id}`);

 // Bước 4: Đợi trang tải xong. Expected: tên trên UI = tên từ API
 await expect(page.getByTestId('product-name')).toHaveText(product.name);

 // Bước 5: Đọc giá trên UI. Expected: bằng giá từ API
 const uiPrice = Number(await page.getByTestId('unit-price').innerText());
 expect(uiPrice).toBe(product.price);

});
 