# TMATH EDU

Website giới thiệu trung tâm đào tạo lập trình thi đấu TMATH, lộ trình học từ tiểu học đến THPT và thành tích học viên. Các nút đăng ký học thử và đặt lịch tư vấn dẫn đến Zalo của trung tâm.

## Công nghệ

| Thành phần | Phiên bản |
| --- | --- |
| Next.js, App Router | 16.2.4 |
| React / React DOM | 19.2.4 |
| TypeScript | 5 |
| Tailwind CSS | 4 |
| ESLint | 9 |
| pnpm | 11.1.3 |

Font chữ: **Plus Jakarta Sans** và **Playfair Display**, tải qua `next/font/google`.

## Chạy trên máy cá nhân

Yêu cầu Node.js **22.13 trở lên** để chạy phiên bản pnpm của dự án. Phiên bản pnpm được khai báo trong trường `packageManager` của `package.json`.

Cài pnpm nếu chưa có:

```bash
npm install --global pnpm@11.1.3
```

Trong thư mục dự án, cài dependencies và chạy máy chủ phát triển:

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Mở [http://localhost:3000](http://localhost:3000). Dự án hiện không yêu cầu biến môi trường; địa chỉ API và liên hệ được khai báo trong mã nguồn.

`pnpm-lock.yaml` là lockfile dùng cho quy trình pnpm. `pnpm-workspace.yaml` cho phép chạy bước build của `sharp` và `unrs-resolver` khi cài dependencies.

## Kiểm tra và build

| Lệnh | Chức năng |
| --- | --- |
| `pnpm dev` | Chạy môi trường phát triển |
| `pnpm lint` | Kiểm tra code bằng ESLint |
| `pnpm exec tsc --noEmit` | Kiểm tra kiểu TypeScript |
| `pnpm build` | Tạo bản production và kiểm tra TypeScript |
| `pnpm start` | Chạy bản production đã build |

Quy trình kiểm tra trước khi đưa bản mới lên máy chủ:

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

Next.js 16 không tự chạy ESLint trong `next build`, nên cần chạy `pnpm lint` riêng. Build cần kết nối đến Google Fonts để tải font.

Để xem bản production trên máy cá nhân:

```bash
pnpm build
pnpm start
```

## Các trang và tính năng

| Đường dẫn | Nội dung |
| --- | --- |
| `/` | Giới thiệu trung tâm, lộ trình đào tạo, nền tảng luyện tập, thành tích nổi bật và đăng ký qua Zalo |
| `/thanh-tich` | Danh sách thành tích từ API, thống kê và bộ lọc theo năm học / cấp học |

Trang thành tích có các trạng thái đang tải, lỗi, kết quả rỗng và tải thành công. Khi lỗi, người dùng có thể bấm **Thử lại**. Canonical của trang này là `https://tmathcoding.vn/thanh-tich`.

Carousel học viên tự chuyển mỗi 4 giây và hỗ trợ nút trước/sau, dấu chấm và cuộn ngang thủ công. Dấu chấm cập nhật khi cuộn dừng. Người dùng có thể tạm dừng hoặc phát lại; carousel dừng tự chuyển khi focus, vuốt hoặc cuộn thủ công và tạm dừng khi rê chuột vào khu vực carousel.

Khi thiết bị bật `prefers-reduced-motion: reduce`, carousel tắt tự chuyển, chuyển slide tức thì và giao diện tắt animation / transition, bao gồm hiệu ứng nền.

## Cấu trúc mã nguồn

```text
app/
├── layout.tsx                    # Layout, metadata chung, font và ngôn ngữ
├── globals.css                   # Theme và quy tắc giảm chuyển động
├── lib/
│   └── contact.ts                # Link Zalo dùng chung
├── components/
│   ├── Header.tsx
│   └── Footer.tsx
├── (home)/
│   ├── page.tsx                  # Trang chủ
│   └── components/               # Các phần nội dung trang chủ
└── thanh-tich/
    ├── page.tsx                  # Server Component khai báo canonical
    └── ThanhTichClient.tsx        # Tải dữ liệu, bộ lọc và trạng thái giao diện
public/
├── logo.svg
└── icons/                        # Favicon và manifest
```

## Dữ liệu thành tích

`app/thanh-tich/ThanhTichClient.tsx` gọi trực tiếp hai API công khai từ trình duyệt:

- `GET https://oj.tmathcoding.vn/api/v3/years`
- `GET https://oj.tmathcoding.vn/api/v3/achievements`

Hai yêu cầu chạy song song. API cần cho phép CORS từ website để trình duyệt đọc phản hồi.

API năm học trả về mảng gồm các trường `id`, `start`, `finish`. API thành tích trả về mảng gồm `id`, `name`, `award`, `contest`, `level`, `year`, `rank`, `avatar`.

Frontend chuẩn hóa cấp học và hạng giải; các bản ghi thiếu năm học hoặc có cấp học chưa được hỗ trợ bị loại khỏi danh sách. Avatar không có ảnh sẽ dùng chữ viết tắt của tên. `next.config.ts` cho phép ảnh từ tên miền `oj.tmathcoding.vn`.

## Cập nhật nội dung và liên hệ

| Nội dung cần sửa | Vị trí |
| --- | --- |
| Link đăng ký / tư vấn qua Zalo | `app/lib/contact.ts` |
| Email, số điện thoại và liên kết mạng xã hội | `app/components/Footer.tsx` |
| Tiêu đề, mô tả, font và metadata chung | `app/layout.tsx` |
| Canonical trang thành tích | `app/thanh-tich/page.tsx` |
| Địa chỉ API và cách xử lý dữ liệu | `app/thanh-tich/ThanhTichClient.tsx` |
| Lộ trình, thống kê và liên kết nền tảng luyện tập | `app/(home)/components/` |
| Ảnh, favicon và manifest | `public/` |

Thông tin liên hệ hiện tại:

- Hotline: **0947 771 736**.
- Zalo: [0947 771 736](https://zalo.me/0947771736).
- Email: [techmathdev@gmail.com](mailto:techmathdev@gmail.com).

Khi đổi hotline, cập nhật cả link Zalo trong `contact.ts` và liên kết `tel:` / số hiển thị trong `Footer.tsx`.

## Nội dung cần hoàn thiện

- Carousel học viên đang dùng 5 khung mẫu, cần thay bằng ảnh và thông tin học viên thực tế.
- Thống kê thành tích trên trang chủ đang khai báo tĩnh; cập nhật tại `AchievementsSection.tsx`.
- Nút **Xem đề cương khóa học** và các mục **Về chúng tôi**, **Tuyển dụng**, **Blog** đang dùng `href="#"`, cần gắn trang hoặc tài liệu tương ứng.
- Chưa có bộ test tự động được cấu hình trong `package.json`.

## Hướng dẫn dành cho tác nhân lập trình

Đọc `AGENTS.md` trước khi sửa code. Với phiên bản Next.js đang dùng, đối chiếu API và quy ước với tài liệu đi kèm tại `node_modules/next/dist/docs/`.
