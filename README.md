# Toolshop Test Automation — Playwright (TypeScript)

Bộ test UI + API cho app demo [Practice Software Testing – Toolshop](https://practicesoftwaretesting.com) (app dành riêng cho luyện tập kiểm thử).

## Cách chạy
```bash
npm install
npx playwright install chromium
npx playwright test          # chạy tất cả
npx playwright test --ui     # chạy và xem từng bước
npx playwright show-report   # mở HTML report
```

## Test cases
| ID | Tầng | Mô tả |
|---|---|---|
| TC-S01 | UI | Search "pliers" chỉ hiện sản phẩm khớp từ khoá |
| TC-S02 | UI | Search từ khoá không tồn tại → thông báo "There are no products found." |
| TC-A01 | API | `GET /products` trả danh sách phân trang đúng cấu trúc và kiểu dữ liệu |
| TC-A02 | API | `GET /products/{id}` không tồn tại → 404 |
| TC-C01 | UI | Thêm 2 "Combination Pliers" vào giỏ → badge giỏ hàng = 2 |
| TC-A03 | API | `GET /products/search?q=pliers` → mọi kết quả chứa "pliers" |
| TC-X01 | UI + API | Giá trên trang chi tiết khớp giá API trả về |

## Ghi chú
- Locator ưu tiên `data-test` (khai báo `testIdAttribute: 'data-test'` trong `playwright.config.ts`).
- Không dùng sleep. Chỉ dùng web-first assertion (`await expect(locator)...`).
- Không hard-code số lượng sản phẩm vì dữ liệu demo có thể thay đổi. Test assert theo quy tắc nghiệp vụ.
