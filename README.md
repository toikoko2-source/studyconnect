# StudyConnect - Nền Tảng Học Liệu Đại Học Bản Địa Hóa & Kiểm Duyệt 7 Bước

> Dự án được thiết kế và xây dựng dựa trên toàn bộ tài liệu đặc tả thiết kế hệ thống trong Google Doc **"Xây web studyconnect"** (Bao gồm các thẻ: *Đề bài, giao diện, phác thảo, Các chức năng, Phương Anh, Trung*).

---

## 🌟 1. Tổng quan Thiết kế & Hệ thống Nhận diện (UI Kit & Moodboard)

Theo tài liệu định hướng giao diện từ thẻ `giao diện`:
- **Bảng màu chủ đạo (Color Palette):**
  - **Màu chính (Primary):** `#2563EB` (Xanh Azure) - Thể hiện tính học thuật chuẩn mực, sự tin cậy từ quy trình kiểm duyệt, sử dụng cho thanh điều hướng, nút chính (CTA), và huy hiệu xác thực.
  - **Màu nhấn (Accent):** `#F59E0B` (Cam Hạt dẻ / Amber) - Đại diện cho năng lượng, sáng tạo và cơ chế Gamification, ví Hạt dẻ, nhãn dán "Hot", thanh tiến trình.
  - **Màu nền (Background):** `#F8FAFC` (Xám Slate nhạt) - Dịu mắt, giảm căng thẳng khi sinh viên duyệt nhiều tài liệu.
  - **Màu văn bản (Text):** `#0F172A` (Xanh đen Slate) - Độ tương phản cao, dễ đọc trên di động.
- **Phông chữ (Typography):** `Be Vietnam Pro` (Google Fonts) - Phông chữ Sans-serif hiện đại, tối ưu tuyệt đối cho hiển thị tiếng Việt trên màn hình di động.
- **Linh vật (Mascot):** Chú sóc vàng đeo ba lô học sinh cài bút đỏ, mặc áo USSH và ôm hạt dẻ vàng khổng lồ (*Linh vật chính thức của StudyConnect*) đứng cạnh tiêu đề chính trên trang chủ, đồng hành cùng các cơ chế Gamification & thu hoạch điểm thưởng.
- **Triết lý Thiết kế:** **Mobile-First** (ưu tiên hiển thị mượt mà trên thiết bị di động với tỷ lệ người dùng dự phóng trên 75%).

---

## 🚀 2. Các Module & Tính Năng Trọng Tâm Đã Xây Dựng

### 1. Module Quản Lý Người Dùng & Xác Thực Email .EDU.VN (RBAC 4 Tầng)
- **Đăng ký & Đăng nhập bắt buộc email `.edu.vn`:** Chỉ cho phép tài khoản có đuôi email chính thống do các trường đại học tại Việt Nam cấp (như `an.nv@ussh.edu.vn`, `masv@sis.hust.edu.vn`, `sv@neu.edu.vn`...) nhằm đảm bảo danh tính học thuật trung thực, loại trừ tài khoản rác và spammer.
- **Tự động nhận diện Trường Đại học (Domain Auto-Detection):** Thuật toán tự động phân tích tên miền email để gắn huy hiệu trường học (vd: `ussh.edu.vn` ➔ *Trường ĐH KHXH&NV - ĐHQGHN*, `sis.hust.edu.vn` ➔ *ĐH Bách Khoa Hà Nội*, `neu.edu.vn` ➔ *ĐH Kinh tế Quốc dân*...).
- **Cơ chế Phân quyền 4 Tầng Đối tác (Role-Based Access Control):**
  - *Tầng 1 (Học sinh / Sinh viên):* Tìm kiếm, tải học liệu (3 lượt/ngày), tương tác ví Hạt dẻ, đánh giá tài liệu.
  - *Tầng 2 (CLB Học thuật / Đoàn - Hội):* Quản lý Workspace riêng, phân quyền tài liệu nội bộ, bàn giao nhiệm kỳ.
  - *Tầng 3 (Giảng viên / Chuyên gia):* Huy hiệu Verified kiểm duyệt chuyên môn, thẩm định học thuật.
  - *Tầng 4 (Thư viện trường):* Quản lý lượng lớn học liệu số hóa chính thống.
- **Hỗ trợ Single Sign-On (SSO):** Tích hợp nút đăng nhập 1-click qua **Google Workspace for Education**.
- **Tích hợp Firebase Authentication & Analytics:** Đã cấu hình kết nối trực tiếp với dự án Firebase `study-connect-2daf8` thông qua file `firebase-config.js` để lưu trữ người dùng và theo dõi lưu lượng truy cập qua Google Analytics `G-SZ6XYDGPB0`.

### 2. Trang Chủ (Homepage & Hero Search)
- Thanh tìm kiếm trung tâm hỗ trợ tìm theo từ khóa, mã môn học (vd: `MI1111`, `ECO101`, `LAW101`...) và tên trường.
- Gợi ý từ khóa nhanh theo xu hướng thi cử các trường ĐH hàng đầu: Bách Khoa Hà Nội (HUST), Kinh Tế Quốc Dân (NEU), Ngoại Thương (FTU), ĐHQG Hà Nội (VNU), ĐHQG TP.HCM.
- Bảng tin tài liệu nổi bật (Featured documents) mùa thi.
- Thẻ chào đón của chú báo ôm hạt dẻ hiển thị nhanh quota tải miễn phí trong ngày (3/3 lượt).

### 2. Trung Tâm Học Liệu & Cơ Chế Tìm Kiếm Đa Diện (Discover & Faceted Search)
- Cây phân loại dữ liệu theo cấu trúc đại học Việt Nam: Trường ĐH -> Khoa/Viện -> Chuyên ngành -> Mã môn học.
- Bộ lọc nâng cao: Lọc theo trường, loại tài liệu (*Đề thi & Đáp án, Đề cương & Slide, Bài tập lớn & Code*), và checkbox lọc chỉ hiện tài liệu đã qua 7 bước kiểm duyệt.
- Thẻ tài liệu (Document Cards) chuẩn UI Kit: Hiển thị thumbnail, mã môn, trường ĐH, số trang, đánh giá sao, số lượt tải và huy hiệu **Đã duyệt (Verified Shield)**.

### 3. Trình Xem Trước & Trợ Lý AI (Mobile-Optimized Preview & NotebookLM AI)
- Khắc phục triệt để lỗi phông chữ tiếng Việt với giao diện đọc thử 3 trang đầu rõ ràng, sắc nét.
- **Tính năng AI Tóm tắt (NotebookLM style):** Phân tích tài liệu chỉ với 1 click, trích xuất:
  - 3 chủ đề trọng tâm của đề thi/bài giảng.
  - Lỗi sai và cạm bẫy phòng thi thường gặp.
  - Công thức & dạng bài ăn điểm.
- Nút Tải xuống thông minh: Tự động trừ lượt tải miễn phí (3 lượt/ngày), nếu hết lượt sẽ tự động chuyển sang trừ 10 Hạt dẻ 🌰 từ ví.
- Nút báo cáo vi phạm bản quyền (DMCA Takedown) hoặc tài liệu sai kiến thức.

### 4. Cổng Đóng Góp & Mô Phỏng Kiểm Duyệt 7 Bước (Upload & Inspection Tracker)
- Khu vực kéo thả tệp tài liệu PDF/DOCX hỗ trợ tối đa 50MB.
- Biểu mẫu nhập thông tin metadata môn học và cam kết bản quyền trí tuệ.
- **Bộ theo dõi tiến trình 7 bước thời gian thực:**
  1. *Tiếp nhận:* Xác thực định dạng PDF/DOCX hợp lệ.
  2. *AI Quét bản quyền:* Đối soát DMCA và cơ sở dữ liệu tác quyền.
  3. *AI Kiểm tra nội dung:* Quét trùng lặp và xác định giá trị học thuật.
  4. *Thẩm định chuyên môn:* Moderator / Peer review duyệt đáp án và lời giải.
  5. *Phân loại đa tầng:* Gắn nhãn theo cây cấu trúc trường học Việt Nam.
  6. *Đăng tải chính thức:* Xuất bản lên kho học liệu, tối ưu hóa bản xem trước.
  7. *Đánh giá lại cộng đồng:* Kích hoạt hệ thống rating và thưởng ngay **+50 Hạt dẻ** vào ví của người đóng góp.

### 5. Cơ Chế Gamification & Ví "Hạt Dẻ" (Chestnut Wallet & Rewards)
- Bảng tổng quan ví: Hiển thị số dư Hạt dẻ, cấp độ thành viên (Sóc Cần Cù - Hạng Bạc), thanh điểm kinh nghiệm (XP) lên cấp.
- Bảng nhiệm vụ hằng ngày (Daily Quests):
  - Điểm danh hằng ngày (+5 🌰)
  - Đóng góp 1 tài liệu có kiểm duyệt (+50 🌰)
  - Viết đánh giá chất lượng tài liệu (+15 🌰)
  - Chia sẻ tài liệu cho bạn bè (+10 🌰)
- Cửa hàng đổi thưởng (Exchange Shop): Đổi Hạt dẻ lấy thêm lượt tải trong ngày, gói 5 lượt tải bổ sung, hoặc vé 7 ngày trải nghiệm Premium.

### 6. Không Gian Tổ Chức B2B (Workspace CLB & Ban Học Tập Đoàn - Hội)
- Phân hệ B2B SaaS thu nhỏ cho các CLB học thuật, Thư viện và Ban Chuyên môn:
  - Kho lưu trữ tài liệu nội bộ, không công khai ra bên ngoài.
  - Quản lý và bàn giao tài liệu qua các nhiệm kỳ (K64 -> K65 -> K66) mà không lo thất lạc.
  - Phân quyền quản trị viên (Admin), Kiểm duyệt viên (Moderator) và Thành viên (Member).

### 7. Mô Hình Doanh Thu SBMC & Gói Trả Phí Premium
- Bảng cam kết minh bạch: **Duy trì tối thiểu 75% học liệu trên nền tảng hoàn toàn miễn phí**.
- Modal đăng ký gói **StudyConnect Premium (29.000đ - 39.000đ/tháng)**: Tải không giới hạn, không quảng cáo, AI tóm tắt không giới hạn và 20GB dung lượng lưu trữ đám mây.

---

## 💻 3. Hướng Dẫn Sử Dụng & Trải Nghiệm

Trang web được phát triển dưới dạng ứng dụng web thuần túy (Zero-dependency client-side app), tương thích 100% với mọi trình duyệt hiện đại (Google Chrome, Microsoft Edge, Safari, Firefox) mà **không cần cài đặt Node.js hay build-tools phức tạp**:

1. **Mở trực tiếp tệp:**
   - Mở File Explorer trên Windows, điều hướng đến thư mục:
     `C:\Users\ADMIN\.gemini\antigravity\scratch\studyconnect`
   - Nhấp đúp chuột vào tệp `index.html` để mở trên trình duyệt.

2. **Khuyến nghị thiết lập Workspace trong Antigravity:**
   - Người dùng nên đặt thư mục làm việc (Active Workspace) là:
     `C:\Users\ADMIN\.gemini\antigravity\scratch\studyconnect`
