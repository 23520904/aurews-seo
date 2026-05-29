# BÀI THUYẾT TRÌNH BẢO VỆ CUỐI KỲ — MÔN DEVOPS
## PROJECT: AUREWS — PREMIUM TECH & EDITORIAL NEWS PLATFORM

Tài liệu này chứa nội dung chi tiết của 10 slide thuyết trình môn DevOps, danh sách ảnh chụp màn hình cần chuẩn bị, kịch bản demo trực quan trong 5–6 phút, và hướng dẫn nén mã nguồn nộp bài cuối kỳ.

---

# Slide 1 — Project Overview

**Mục tiêu slide:** Giới thiệu tổng quan về website đọc báo Aurews và các công nghệ cốt lõi, tạo ấn tượng đầu tiên chuyên nghiệp.  
**Layout đề xuất:** Split Screen (Trái: Tiêu đề & Tech Stack; Phải: Ảnh chụp màn hình Homepage hoặc logo).  
**Nội dung hiển thị trên slide:**
*   📰 **Aurews**: Nền tảng đọc báo & biên tập tin tức công nghệ cao cấp lấy cảm hứng từ WIRED Design System.
*   ⚡ **Core Tech Stack**: Next.js 16 (App Router), TypeScript, Prisma ORM, và Supabase PostgreSQL.
*   ⚙️ **DevOps Core**: GitHub Actions, Vercel Serverless CD, UptimeRobot, Codecov, SonarCloud, và Discord Ops.
*   🎯 **Mục tiêu**: Tối ưu hóa SEO tuyệt đối, hiệu năng cực hạn, và quy trình phân phối tự động 100%.

**Image / Screenshot placeholders:**
*   `[IMAGE PLACEHOLDER 1: Ảnh chụp màn hình trang chủ Aurews chạy thực tế trên production tại https://aurews.id.vn]`
*   `[IMAGE PLACEHOLDER 2: Logo hoặc banner thương hiệu của Aurews news platform]`

**Gợi ý visual:** Giao diện tối hiển thị sắc nét của trang chủ đọc báo Aurews trên cả máy tính và điện thoại.  
**Speaker notes (30–45 giây):**  
"Xin chào thầy cô và các bạn, hôm nay nhóm chúng em xin phép trình bày dự án cuối kỳ môn DevOps với sản phẩm là Aurews — một nền tảng đọc báo và biên tập tin tức công nghệ cao cấp lấy cảm hứng từ phong cách WIRED. Được xây dựng trên Next.js 16 và Supabase, điểm nhấn của Aurews không chỉ nằm ở giao diện tinh tế hay tính năng đọc tin mà nằm ở hệ thống DevOps tự động hóa hoàn toàn. Chúng em đã xây dựng một pipeline khép kín từ khâu linting, kiểm thử unit/integration/E2E cho đến tự động deploy không chạm lên Vercel và giám sát liên tục qua Discord và UptimeRobot."  
**Demo link nếu có:**  
*   Mở sẵn tab trình duyệt trang chủ [https://aurews.id.vn](https://aurews.id.vn) hiển thị giao diện WIRED.

---

# Slide 2 — Product Features

**Mục tiêu slide:** Giới thiệu các tính năng nổi bật của ứng dụng đọc báo giúp website đạt thứ hạng SEO tối ưu và bảo vệ bản quyền.  
**Layout đề xuất:** Card Layout (4 thẻ tính năng chính sắp xếp cân đối, đi kèm icon bắt mắt).  
**Nội dung hiển thị trên slide:**
*   🔎 **SEO-First Article Engine**: Metadata động, Open Graph, và cấu trúc **NewsArticle JSON-LD Schema** tự động cho Google News.
*   🗺️ **News Sitemap 48h Fallback**: Bộ lọc sitemap XML động trong 48 giờ để tuân thủ quy định nghiêm ngặt của Google Search Console.
*   💬 **Branded Sharing Panel**: Thanh chia sẻ mạng xã hội nổi trên desktop và gọi **native Web Share API** trên điện thoại di động.
*   🔒 **Dashboard & Admin RBAC**: Giao diện đăng bài cho tác giả tại `/dashboard` và tính năng upload hàng loạt tại `/dashboard/bulk` cho ADMIN.

**Image / Screenshot placeholders:**
*   `[IMAGE PLACEHOLDER 1: Ảnh chụp chi tiết một bài viết tin tức với thanh chia sẻ nổi ở lề trái]`
*   `[IMAGE PLACEHOLDER 2: Ảnh chụp màn hình trang Dashboard hoặc trang Bulk Upload bài viết]`

**Gợi ý visual:** Thể hiện rõ sự khác biệt giữa giao diện chia sẻ chuyên nghiệp trên Desktop và drawer native share trên thiết bị di động.  
**Speaker notes (30–45 giây):**  
"Về mặt tính năng sản phẩm, Aurews được thiết kế tối ưu sâu cho SEO báo chí. Chúng em phát triển bộ sinh metadata động cùng mã cấu trúc JSON-LD giúp Googlebot nhận diện tin tức tức thì. Đặc biệt, news-sitemap của hệ thống tự động lọc các bài viết trong 48 giờ gần nhất theo luật của Google Search Console, nếu không có bài mới sẽ tự động fallback về 5 bài cũ nhất để tránh lỗi bò quét. Ngoài ra, hệ thống bảo vệ quản trị thông qua phân quyền chặt chẽ bằng Auth.js v5, khóa toàn bộ các trang bulk upload bài viết chỉ dành riêng cho ADMIN."  
**Demo link nếu có:**  
*   Chỉ vào thanh chia sẻ mạng xã hội bên lề và click thử `/dashboard` để demo phân quyền đăng nhập.

---

# Slide 3 — System Architecture

**Mục tiêu slide:** Minh họa kiến trúc luồng dữ liệu sạch và tối ưu hóa hạ tầng Serverless.  
**Layout đề xuất:** Flowchart / Architecture Diagram (Sơ đồ khối ngang từ Client đến Database).  
**Nội dung hiển thị trên slide:**
*   🌐 **Edge-to-DB Architecture**: Luồng dữ liệu phân rã, bảo mật và tải nhanh.
*   🚀 **Runtime**: Vercel Serverless & Edge Runtimes tối ưu hóa CDN toàn cầu.
*   🧠 **Middleware & Gateway**: Auth.js bảo vệ endpoint kết hợp Edge Routing.
*   🗄️ **Database Persistence**: Supabase PostgreSQL ổn định kết hợp Prisma Client type-safe.

**Image / Screenshot placeholders:**
*   `[IMAGE PLACEHOLDER 1: Sơ đồ kiến trúc Mermaid của luồng dữ liệu dự án]`
*   `[IMAGE PLACEHOLDER 2: Ảnh chụp trang quản trị Supabase Database Dashboard thực tế]`

**Gợi ý visual:** Sơ đồ luồng: `Browser ──► Next.js App Router ──► Auth.js Gate ──► Prisma ──► Supabase PostgreSQL`.  
**Speaker notes (30–45 giây):**  
"Đây là sơ đồ kiến trúc hệ thống của Aurews. Người dùng từ trình duyệt gửi yêu cầu đến Next.js App Router chạy trên hạ tầng Serverless của Vercel để đảm bảo tốc độ phản hồi cực nhanh. Mọi kết nối truy vấn database đều được thực hiện thông qua Prisma ORM kết nối tới cơ sở dữ liệu Supabase PostgreSQL. Quá trình biên tập và truy cập dashboard cũng được bảo vệ chặt chẽ ở tầng Middleware ở biên Edge trước khi chạm vào mã máy chủ thực tế, giúp hệ thống tiết kiệm tài nguyên và bảo vệ database khỏi các cuộc tấn công quét endpoint."  
**Demo link nếu có:**  
*   Mở sơ đồ kiến trúc Mermaid hiển thị trong `README.md` để minh họa trực quan.

---

# Slide 4 — SEO & News Sitemap Strategy

**Mục tiêu slide:** Trình bày chi tiết giải pháp kỹ thuật sitemap và SEO sitemaps để đạt độ tin cậy tuyệt đối trên Google Search Console.  
**Layout đề xuất:** Split Screen (Trái: Sơ đồ giải thuật Sitemap 48h; Phải: Cấu trúc XML thực tế).  
**Nội dung hiển thị trên slide:**
*   🗺️ **Dynamic Sitemaps**: Tự động tạo `/sitemap.xml` và `/news-sitemap.xml` theo thời gian thực.
*   ⚙️ **48-Hour Fallback Algorithm**: Tự động chuyển đổi sang lấy 5 bài viết mới nhất nếu hệ thống trống bài viết mới trong 48 giờ.
*   🚫 **Zero Sitemap Errors**: Tuyệt đối không để sitemap trống hoặc gãy thẻ XML gây cảnh báo GSC.
*   🔎 **Search Engine Ping**: Đăng ký sitemap trực tiếp lên Google Search Console để lập chỉ mục tức thì.

**Image / Screenshot placeholders:**
*   `[IMAGE PLACEHOLDER 1: Ảnh chụp XML thực tế của file sitemap.xml hoặc news-sitemap.xml trên trình duyệt]`
*   `[IMAGE PLACEHOLDER 2: Bảng điều khiển Google Search Console xác nhận sitemap đã được nạp thành công]`

**Gợi ý visual:** Sử dụng sơ đồ tuần tự (Sequence Diagram) thể hiện luồng xử lý fallback của sitemap.  
**Speaker notes (30–45 giây):**  
"Tin tức báo chí yêu cầu lập chỉ mục tức thời. Do đó, thuật toán News Sitemap của chúng em được viết cực kỳ chặt chẽ. Khi Googlebot truy cập `/news-sitemap.xml`, hệ thống sẽ truy vấn Supabase tìm các bài đăng trong 48 giờ qua. Nếu không có bài viết nào, thay vì trả về XML rỗng hoặc lỗi 500 — thứ khiến Google phạt hạ thứ hạng web — thuật toán sẽ tự động lấy 5 bài viết mới nhất làm fallback để GSC luôn báo trạng thái sitemap hoạt động thành công."  
**Demo link nếu có:**  
*   Truy cập thực tế link `/news-sitemap.xml` để chứng minh XML được render chuẩn chỉnh.

---

# Slide 5 — CI Pipeline

**Mục tiêu slide:** Giới thiệu chốt chặn tự động hóa CI (Continuous Integration) ngăn ngừa mọi rủi ro về mã nguồn trước khi deploy.  
**Layout đề xuất:** Timeline / Step Flow (Quy trình 5 bước kiểm tra tự động chạy song song và nối tiếp).  
**Nội dung hiển thị trên slide:**
*   🔄 **CI Trigger**: Tự động chạy trên mọi sự kiện push hoặc mở Pull Request tới `main` và `develop`.
*   🧹 **Validate Gate**: Chạy ESLint và biên dịch nghiêm ngặt `tsc --noEmit` để loại bỏ mọi lỗi TypeScript.
*   🧪 **Test Gate (Vitest)**: Chạy toàn bộ 37/37 bài unit và integration test sử dụng SQLite cục bộ, tự động upload báo cáo lên Codecov.
*   🛡️ **Security Gate**: Quét thư viện bằng **Trivy**, quét rò rỉ secret bằng **TruffleHog**, và audit package lỗi thời.
*   🎭 **E2E Gate (Playwright)**: Chạy trọn vẹn E2E suites trên trình duyệt ảo để xác nhận các tính năng chính ổn định.

**Image / Screenshot placeholders:**
*   `[IMAGE PLACEHOLDER 1: Ảnh chụp chạy thực tế thành công (Green Run) của CI Pipeline trên GitHub Actions]`
*   `[IMAGE PLACEHOLDER 2: Bảng chi tiết các jobs validate, test, security, build, e2e trong workflow]`

**Gợi ý visual:** Sơ đồ khối quy trình CI: `Code Push ➡️ Lint/Type ➡️ Unit Tests ➡️ Trivy/TruffleHog ➡️ Build Standalone ➡️ E2E Playwright`.  
**Speaker notes (30–45 giây):**  
"Quy trình Continuous Integration (CI) của chúng em được thiết kế theo tư tưởng 'Fast Fail' và bảo mật đa tầng. Khi có bất kỳ Pull Request nào, GitHub Actions sẽ ngay lập tức khởi chạy. Bước validate sẽ chặn đứng các lỗi định dạng và kiểu dữ liệu. Tiếp theo, 37 bài test đơn vị và tích hợp sẽ chạy để bảo đảm nghiệp vụ hoạt động tốt. Đặc biệt, chúng em tích hợp cả Trivy và TruffleHog vào thẳng CI để quét mã độc thư viện và chặn đứng tình trạng lộ mật khẩu hay API keys ngay trong lịch sử git."  
**Demo link nếu có:**  
*   Mở tab lịch sử chạy GitHub Actions của repo để chỉ vào quy trình chạy xanh của `ci.yml`.

---

# Slide 6 — Preview & Production Deployment

**Mục tiêu slide:** Trình bày quy trình phân phối Continuous Delivery (CD) an toàn, tự động hóa môi trường Preview và Production.  
**Layout đề xuất:** Split Screen (Trái: PR Preview flow với auth bypass; Phải: Production Deploy flow).  
**Nội dung hiển thị trên slide:**
*   🌐 **Vercel PR Preview**: Tự động tạo một môi trường preview độc lập cho từng Pull Request để QA kiểm tra giao diện.
*   🔐 **Automation Bypass Secret**: Gửi header `x-vercel-protection-bypass` và thiết lập session cookie để Playwright chạy test xuyên qua lớp bảo mật Vercel.
*   🚢 **Production Path**: `GitHub Actions ──► Prisma migrate deploy ──► Vercel Production`.
*   🎭 **Post-Deploy Smoke**: Tự động chạy smoke tests và kiểm tra sitemap live ngay sau khi deploy thành công.

**Image / Screenshot placeholders:**
*   `[IMAGE PLACEHOLDER 1: Ảnh comment tự động của Vercel Bot kèm Link Preview trên GitHub Pull Request]`
*   `[IMAGE PLACEHOLDER 2: Ảnh chạy thành công của Deploy to Production workflow]`

**Gợi ý visual:** Một sơ đồ so sánh trực quan giữa nhánh chạy PR (Preview Deploy) và nhánh chạy merge Main (Production Deploy).  
**Speaker notes (30–45 giây):**  
"Về khâu triển khai, chúng em tự động hóa môi trường bằng hai nhánh riêng biệt. Đối với PR, hệ thống sẽ tạo một link Vercel Preview độc lập và bình luận link này vào PR để lập trình viên test. Để bảo vệ link preview khỏi người ngoài, chúng em bật lớp bảo vệ của Vercel, đồng thời cấu hình mã bypass bí mật trong Playwright để test runner vẫn có thể đi qua. Khi code được merge vào main, quy trình production deploy sẽ được kích hoạt: tự động chạy Prisma migration lên cơ sở dữ liệu Supabase thật trước, sau đó mới cập nhật code lên Vercel để đảm bảo zero-downtime."  
**Demo link nếu có:**  
*   Mở một Pull Request trên GitHub để chỉ vào phần comment tự động có link Vercel Preview và trạng thái chạy test.

---

# Slide 7 — Database Migration Policy

**Mục tiêu slide:** Phân tích chính sách định tuyến database và kỹ thuật chạy migration an toàn trong môi trường DevOps.  
**Layout đề xuất:** Callout Box kết hợp sơ đồ Mini Flowchart phân tách cổng kết nối.  
**Nội dung hiển thị trên slide:**
*   💾 **Database Routing Policy**: Phân định rạch ròi 2 cổng kết nối PostgreSQL của Supabase.
*   🔌 **DATABASE_URL (Port 6543)**: Sử dụng Transaction Mode qua Supavisor pooler dành cho App runtime chạy trên Vercel Serverless.
*   🔌 **DIRECT_URL (Port 5432)**: Sử dụng Session Mode trực tiếp dành cho Prisma migrations, db seeding, và admin scripts.
*   ⚠️ **DevOps Constraint**: Tuyệt đối không chạy database migrations thông qua cổng transaction pooler `6543` để tránh nghẽn luồng kết nối.
*   📂 **Prisma Migration**: Phiên bản cấu trúc database gốc lưu tại `prisma/migrations/0_init`.

**Image / Screenshot placeholders:**
*   `[IMAGE PLACEHOLDER 1: Ảnh cấu trúc thư mục chứa các tệp tin SQL migration của Prisma]`
*   `[IMAGE PLACEHOLDER 2: Ảnh nhật ký log chạy npx prisma migrate deploy thành công trong GitHub Actions]`

**Gợi ý visual:** Sơ đồ khối: Vercel App ➡️ Cổng `6543` (Transaction Pooler) ➡️ DB; GitHub Actions ➡️ Cổng `5432` (Direct Session) ➡️ DB.  
**Speaker notes (30–45 giây):**  
"Một bài học xương máu trong DevOps khi làm việc với Serverless là quản lý kết nối database. Chúng em đã thiết lập một chính sách định tuyến kết nối cực kỳ nghiêm ngặt. Khi ứng dụng Next.js chạy trên Vercel, hàng trăm serverless functions có thể khởi chạy cùng lúc, do đó bắt buộc phải kết nối qua cổng pooler `6543` để tối ưu hóa pool kết nối. Tuy nhiên, quy trình chạy Prisma migration và seeding lại yêu cầu truy cập session dài hạn và độc quyền, nên bắt buộc phải kết nối trực tiếp qua cổng `5432`. Việc chạy migration qua cổng pooler `6543` là hoàn toàn cấm để tránh gây treo database."  
**Demo link nếu có:**  
*   Chỉ vào file cấu hình `.env.example` hoặc phần config trong `prisma.config.ts` để hiển thị biến kết nối.

---

# Slide 8 — Monitoring & Discord Alerts

**Mục tiêu slide:** Minh họa giải pháp giám sát hệ thống 24/7 và cơ chế ChatOps gửi thông báo về Discord cực kỳ khoa học.  
**Layout đề xuất:** Split Screen (Trái: Sơ đồ định tuyến thông báo Discord; Phải: Ảnh thông báo Discord thực tế).  
**Nội dung hiển thị trên slide:**
*   📣 **ChatOps Channel Separation**: Phân tách luồng thông báo để tránh nhiễu thông tin (Noise).
*   🚀 `#aurews-deploy`: Nhận thông báo build CI pass/fail, preview status, production deploy và Lighthouse CI.
*   🛡️ `#aurews-security`: Nhận cảnh báo quét bảo mật Trivy/npm audit hàng ngày, sụt giảm uptime và sitemap lỗi.
*   ⏱️ **UptimeRobot Alerting**: Giám sát 4 tài nguyên chính (Homepage, sitemap, news-sitemap, và tìm kiếm) mỗi 5 phút một lần, tự động bắn cảnh báo mất kết nối về Discord.

**Image / Screenshot placeholders:**
*   `[IMAGE PLACEHOLDER 1: Ảnh chụp màn hình kênh Discord #aurews-deploy nhận tin nhắn Deploy thành công]`
*   `[IMAGE PLACEHOLDER 2: Ảnh chụp màn hình kênh Discord #aurews-security nhận cảnh báo sụt giảm Uptime hoặc quét bảo mật]`

**Gợi ý visual:** Sơ đồ Mermaid kết nối các luồng sự kiện CI, Preview, Deploy, Uptime, Sentry tới hai kênh Discord tương ứng.  
**Speaker notes (30–45 giây):**  
"Để kiểm soát vận hành mà không bị ngập trong tin nhắn rác, chúng em phân tách thông tin thành hai kênh Discord riêng biệt. Kênh `#aurews-deploy` chuyên nhận thông tin về tiến trình deploy code và điểm số hiệu năng Lighthouse. Kênh `#aurews-security` chỉ nhận các thông tin cảnh báo bảo mật nguy hiểm và trạng thái Uptime của hệ thống. Chúng em tích hợp UptimeRobot để liên tục ping quét trang chủ và cả các file sitemap định kỳ mỗi 5 phút một lần, giúp đội ngũ vận hành phản ứng ngay lập tức nếu website gặp sự cố."  
**Demo link nếu có:**  
*   Mở sẵn ứng dụng Discord hiển thị hai kênh `#aurews-deploy` và `#aurews-security` để chuẩn bị demo live.

---

# Slide 9 — Security & Quality Gates

**Mục tiêu slide:** Chứng minh tính bảo mật toàn diện và các bộ lọc chất lượng code đạt chuẩn công nghiệp của dự án.  
**Layout đề xuất:** Card Grid (Mỗi thẻ là một công cụ quét chất lượng và bảo mật cùng chỉ số đạt được).  
**Nội dung hiển thị trên slide:**
*   🛡️ **Trivy File Scan**: Tự động chặn đứng các Pull Request nếu phát hiện lỗ hổng bảo mật cấp độ HIGH/CRITICAL trong gói thư viện.
*   🔐 **TruffleHog Scan**: Quét sâu lịch sử git để phát hiện và ngăn chặn rò rỉ API keys, Database URIs trước khi đẩy lên đám mây.
*   📈 **Codecov Integration**: Đo đạc độ bao phủ kiểm thử (Test Coverage), hiển thị trực quan phần trăm dòng code đã được test.
*   🦊 **SonarCloud Gate**: Tự động đánh giá chất lượng mã nguồn (Code smells, Bugs, Security Hotspots) trên mỗi Pull Request.
*   💡 **Lighthouse CI**: Kiểm tra hiệu năng và SEO định kỳ, cam kết điểm số SEO luôn đạt trên **95/100**.

**Image / Screenshot placeholders:**
*   `[IMAGE PLACEHOLDER 1: Ảnh chụp dashboard chất lượng dự án của SonarCloud hoặc biểu đồ Codecov]`
*   `[IMAGE PLACEHOLDER 2: Ảnh chi tiết kết quả chạy quét an toàn của Trivy trong phần log của GitHub Actions]`

**Gợi ý visual:** Tổ hợp logo các công cụ bảo mật đi kèm điểm số chất lượng (ví dụ: SEO: 100, Test Coverage: 80%+).  
**Speaker notes (30–45 giây):**  
"Về khía cạnh bảo mật và chất lượng mã nguồn, dự án Aurews tự hào được bảo vệ bởi các tiêu chuẩn khắt khe nhất. Chúng em tích hợp SonarCloud để tự động phân tích tĩnh lỗi mã nguồn và cảnh báo code smells. Độ bao phủ kiểm thử được Codecov quản lý chặt chẽ. Hàng tuần, Lighthouse CI tự động chạy để kiểm tra các chỉ số cốt lõi Core Web Vitals, bảo đảm website luôn duy trì điểm SEO tối thiểu là 95 để không bao giờ bị Google hạ thứ hạng hiển thị. Đây là những chốt chặn vô cùng kiên cố cho hệ thống."  
**Demo link nếu có:**  
*   Mở tab kết quả quét của SonarCloud và Codecov trên trình duyệt để trình bày trực quan.

---

# Slide 10 — Result & Demo Roadmap

**Mục tiêu slide:** Tổng kết các kết quả định lượng đạt được và mở đầu cho phần demo trực tiếp đầy hấp dẫn.  
**Layout đề xuất:** Collage / Dashboard (Chia 4 phần hiển thị các góc nhìn vận hành thực tế của dự án).  
**Nội dung hiển thị trên slide:**
*   ✅ **Tự động hóa 100%**: Mọi thay đổi code đều được tự động lint, test, quét bảo mật và CD deploy.
*   📈 **Chỉ số ấn tượng**: 37/37 unit/integration tests xanh, SEO score luôn đạt $\ge$ 95/100.
*   🛡️ **Bảo mật tuyệt đối**: Rào chắn an toàn từ TruffleHog, Trivy, và SonarCloud ngăn ngừa 100% rò rỉ secret.
*   📺 **Demo Roadmap (5 phút)**:
    1.  Duyệt website production live & các trang Dashboard bảo mật.
    2.  Tạo một lỗi nhỏ ➡️ Tạo Pull Request ➡️ Xem GitHub CI chặn và Vercel tạo Preview URL.
    3.  Khám phá ChatOps Discord nhận tin nhắn và bảng điều khiển giám sát UptimeRobot.

**Image / Screenshot placeholders:**
*   `[IMAGE PLACEHOLDER: Ảnh ghép (Collage) hoặc sơ đồ luồng tổng thể DevOps của dự án Aurews]`
*   `[IMAGE PLACEHOLDER: Ảnh chụp màn hình kết quả chạy trọn vẹn thành công của toàn bộ quy trình DevOps]`

**Gợi ý visual:** Biểu đồ tổng kết trực quan các cột mốc DevOps hoàn thành của dự án.  
**Speaker notes (30–45 giây):**  
"Để tổng kết lại, dự án Aurews đã đạt được trạng thái DevOps trưởng thành hoàn toàn tự động hóa. Chúng em đã xây dựng một nền tảng đọc báo bảo mật, tối ưu SEO sâu sắc, có hệ thống kiểm thử tự động kiên cố và quy trình deploy an toàn không có thời gian chết. Sau đây, để thầy cô và các bạn có góc nhìn thực tế nhất, chúng em xin phép bắt đầu phần demo live kéo dài 5 phút. Chúng em sẽ duyệt trang chủ live, tạo một PR mới để xem cách hệ thống tự động kiểm thử và tạo môi trường Preview, và cuối cùng là xem các cảnh báo thông minh được gửi trực tiếp về Discord ra sao. Xin mời mọi người cùng theo dõi."  
**Demo link nếu có:**  
*   Chuẩn bị sẵn màn hình trình duyệt ở chế độ hai cửa sổ (GitHub ở một bên, Discord ở một bên) để bắt đầu demo.

---

## 📸 DANH SÁCH ẢNH CẦN CHUẨN BỊ (SCREENSHOT CHECKLIST)

Để slide trình chiếu đạt chất lượng hình ảnh cao nhất và chân thực nhất, bạn cần chuẩn bị sẵn các bức ảnh chụp màn hình sau đây để chèn vào các placeholder:

*   [ ] **Ảnh 1 (Slide 1):** Ảnh chụp toàn bộ giao diện trang chủ website Aurews chạy thực tế tại địa chỉ [https://aurews.id.vn](https://aurews.id.vn) (chụp rõ phong cách WIRED, font chữ serif cao cấp và thanh menu phân mục).
*   [ ] **Ảnh 2 (Slide 2):** Ảnh chụp giao diện một bài viết cụ thể hiển thị thanh chia sẻ nổi (desktop) và ảnh chụp trang quản trị `/dashboard` yêu cầu đăng nhập.
*   [ ] **Ảnh 3 (Slide 3):** Ảnh sơ đồ kiến trúc Mermaid xuất ra dạng ảnh PNG hoặc ảnh chụp bảng điều khiển (Database Schema) trên trang quản trị Supabase.
*   [ ] **Ảnh 4 (Slide 4):** Ảnh chụp màn hình hiển thị nội dung XML khi truy cập `/news-sitemap.xml` hiển thị rõ các thẻ `<news:news>` và cấu trúc thẻ sạch sẽ.
*   [ ] **Ảnh 5 (Slide 5):** Ảnh chụp màn hình trang lịch sử chạy GitHub Actions có dòng chữ màu xanh lá cây đại diện chạy thành công toàn bộ jobs của `ci.yml` (Validate, Test, Security, Build, E2E).
*   [ ] **Ảnh 6 (Slide 6):** Ảnh chụp màn hình Vercel bot tự động bình luận link Preview vào một Pull Request trên GitHub cùng với tích xanh chạy thành công smoke tests.
*   [ ] **Ảnh 7 (Slide 7):** Ảnh chụp cấu trúc tệp tin trong thư mục `prisma/migrations/0_init` và nhật ký log chạy `npx prisma migrate deploy` in ra cổng kết nối thành công.
*   [ ] **Ảnh 8 (Slide 8):** Ảnh chụp các tin nhắn ChatOps được gửi tự động về hai kênh Discord `#aurews-deploy` và `#aurews-security` hiển thị rõ màu sắc định dạng thông báo.
*   [ ] **Ảnh 9 (Slide 9):** Ảnh chụp màn hình trang báo cáo chất lượng SonarCloud và biểu đồ phần trăm dòng code được test trên trang Codecov của dự án.
*   [ ] **Ảnh 10 (Slide 10):** Sơ đồ khối tổng thể luồng DevOps hoặc một bức ảnh collage ghép 4 màn hình: Giao diện web, Github Actions, Vercel Dashboard, và Discord.

---

## 📺 KỊCH BẢN DEMO CHI TIẾT (5 - 6 PHÚT)

Sau khi hoàn thành phần slide thuyết trình lý thuyết (khoảng 4 phút), hãy thực hiện phần demo thực tế theo đúng trình tự sau để ghi điểm tuyệt đối với giáo viên môn DevOps:

### Phút 1: Trình diễn ứng dụng live trên Production
*   **Thao tác:** Truy cập địa chỉ [https://aurews.id.vn](https://aurews.id.vn).
*   **Thuyết minh:** "Đầu tiên, đây là website Aurews đã được deploy thực tế trên production. Giao diện được thiết kế chuẩn WIRED, hiển thị mượt mà. Chúng em sẽ truy cập một bài viết bất kỳ để thầy cô thấy thanh chia sẻ động hoạt động và mã JSON-LD được inject thành công trong source HTML. Khi truy cập vào đường dẫn `/news-sitemap.xml`, hệ thống tự sinh mã XML tin tức chuẩn GSC không hề có lỗi."

### Phút 2: Trình diễn phân quyền & Bảo mật Database routing
*   **Thao tác:** Bấm vào nút truy cập `/dashboard` ➡️ Hệ thống chuyển hướng về trang `/auth/login` yêu cầu đăng nhập. Thực hiện đăng nhập bằng tài khoản Author thường ➡️ Vào trang viết bài thành công. Thử gõ thủ công URL `/dashboard/bulk` ➡️ Màn hình báo lỗi từ chối truy cập hoặc chuyển hướng (do tài khoản không phải ADMIN).
*   **Thuyết minh:** "Trang dashboard được bảo mật hoàn toàn bằng Middleware chạy ở Edge. Tác giả thông thường chỉ được viết bài, toàn bộ tính năng bulk upload bài viết tại `/dashboard/bulk` đều bị chặn đứng nếu user không có role ADMIN."

### Phút 3: Tạo sự cố mã nguồn (Trigger CI & Preview)
*   **Thao tác:** Mở IDE (VS Code), chuyển sang một nhánh feature mới. Mở một tệp tin (ví dụ: `src/lib/utils.ts`), cố tình viết một lỗi sai kiểu dữ liệu TypeScript (ví dụ: gán biến số cho biến chuỗi) hoặc tạo một lỗi lint. Commit và push nhánh này lên GitHub ➡️ Tạo một Pull Request mới.
*   **Thuyết minh:** "Bây giờ, chúng em sẽ mô phỏng quy trình làm việc thực tế của lập trình viên. Em sẽ cố tình viết sai một kiểu dữ liệu TypeScript trong mã nguồn và push code lên để tạo PR. Thầy cô có thể thấy, ngay khi PR được mở..."

### Phút 4: Khám phá chốt chặn CI và môi trường Preview tự động
*   **Thao tác:** Quay lại tab Pull Request trên GitHub. Chỉ vào quy trình chạy GitHub Actions đang khởi chạy. Cho thấy job `validate` hoặc `test` sẽ báo lỗi màu đỏ (Fail Pipeline) do lỗi TypeScript chúng ta vừa tạo.
*   **Thuyết minh:** "Đúng như dự kiến, chốt chặn CI ngay lập tức được kích hoạt. Lỗi biên dịch TypeScript hoặc lỗi kiểm thử đã bị hệ thống phát hiện và báo đỏ ngay lập tức, chặn hoàn toàn không cho phép merge nhánh lỗi này vào nhánh chính. Mọi sai sót của lập trình viên đều bị chặn đứng trước khi có cơ hội gây lỗi trên production!"

### Phút 5: Sửa lỗi ➡️ Deploy thành công & ChatOps Discord
*   **Thao tác:** Quay lại IDE, sửa lỗi về đúng định dạng chuẩn. Commit và push lại. GitHub Actions chạy xanh hoàn toàn. Vercel tự động deploy môi trường Preview thành công và gửi comment link vào PR.
*   Mở phần mềm Discord, chỉ vào kênh `#aurews-deploy` hiển thị tin nhắn thông báo tự động có chứa commit SHA và trạng thái Deploy thành công. Chỉ vào kênh `#aurews-security` hiển thị trạng thái UptimeRobot báo xanh.
*   **Thuyết minh:** "Khi lỗi được sửa, CI lập tức chuyển sang màu xanh. Vercel tự động tạo môi trường Preview thành công và bot tự động bình luận link Preview vào PR để chúng em kiểm tra giao diện. Đồng thời, toàn bộ thông tin từ lịch sử chạy code, deploy cho tới điểm hiệu năng đều được bắn thông báo thời gian thực về kênh Discord `#aurews-deploy` để cả đội ngũ cùng nắm bắt."

---

## 🗜️ HƯỚNG DẪN NÉN MÃ NGUỒN NỘP BÀI CUỐI KỲ

Khi nộp bài cuối kỳ môn DevOps, để đảm bảo dung lượng file nộp nhẹ nhất (tránh nén nhầm hàng chục ngàn file rác của thư viện và cache) nhưng vẫn giữ đầy đủ mã nguồn kiểm thử và tài liệu chứng minh, hãy tuân thủ nghiêm ngặt quy trình nén sau:

### 1. Thư mục và tệp tin bắt buộc phải xóa (EXCLUDE) trước khi nén:
*   `node_modules/` (Thư mục thư viện cực nặng — giáo viên sẽ tự chạy `npm install` để khôi phục)
*   `.next/` (Thư mục cache biên dịch của Next.js)
*   `coverage/` (Thư mục chứa báo cáo kiểm thử coverage tự sinh)
*   `playwright-report/` & `test-results/` (Các báo cáo và ảnh chụp lỗi tự sinh của Playwright)
*   `.env` (Tệp cấu hình biến môi trường chứa mật khẩu database Supabase thật của bạn — **Tuyệt đối không nộp để tránh lộ lọt mật khẩu**)
*   `.vercel/` (Thư mục chứa cache liên kết dự án của Vercel)
*   `.cache/` (Thư mục cache của hệ thống kiểm thử hoặc thư viện)

### 2. Thư mục và tệp tin bắt buộc phải giữ lại (INCLUDE):
*   `src/` (Toàn bộ mã nguồn ứng dụng Next.js)
*   `prisma/` (Chứa tệp tin `schema.prisma` và lịch sử chạy migrations tại `prisma/migrations`)
*   `public/` (Chứa các tài nguyên ảnh tĩnh và tệp tin `devops_flow_chart.png`)
*   `e2e/` (Toàn bộ các tệp tin kịch bản kiểm thử E2E của Playwright)
*   `.github/workflows/` (Chứa toàn bộ 5 tệp tin cấu hình pipeline tự động hóa `.yml`)
*   `docs/` (Thư mục chứa hướng dẫn cài đặt thủ công `MANUAL_SETUP_GUIDE.md`)
*   `package.json` & `package-lock.json` (Để giáo viên chạy lệnh cài đặt thư viện chính xác)
*   `README.md` (Tệp giới thiệu dự án đã được tối ưu hóa trực quan)
*   `presentation.md` (Tệp tài liệu thuyết trình này)

### 3. Quy trình đóng gói trên máy tính:
1.  Tạo một thư mục mới có tên là **`NhomXX`** (thay `XX` bằng số thứ tự nhóm của bạn).
2.  Sao chép toàn bộ các thư mục và tệp tin ở phần **giữ lại (INCLUDE)** vào bên trong thư mục `NhomXX`.
3.  Đảm bảo không sao chép bất kỳ thư mục nào ở phần **xóa (EXCLUDE)**.
4.  Nhấp chuột phải vào thư mục `NhomXX` ➡️ Chọn **Compress to ZIP file** (hoặc gửi tới thư mục nén trên Windows).
5.  Tên tệp tin nén cuối cùng thu được là: **`NhomXX.zip`** (Dung lượng file chuẩn sau khi loại bỏ node_modules sẽ cực nhẹ, chỉ khoảng dưới 2-3MB).
