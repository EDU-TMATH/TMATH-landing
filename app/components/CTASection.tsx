export default function CTASection() {
  return (
    <section className="rounded-4xl bg-[#0d3f63] px-7 py-10 text-white shadow-[0_30px_80px_rgba(10,42,67,0.35)] sm:px-10">
      <h2 className="font-(family-name:--font-playfair) text-3xl sm:text-4xl">
        Sẵn sàng vào lộ trình lập trình thi đấu phù hợp nhất?
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#d4ebff] sm:text-base">
        Đăng ký để nhận buổi đánh giá đầu vào miễn phí và tư vấn lộ trình
        riêng cho học sinh theo cấp học và mục tiêu thi cử.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href="#"
          className="rounded-full bg-[#ffcc4d] px-6 py-3 text-center text-sm font-extrabold text-[#3a2a00] transition hover:-translate-y-0.5 hover:bg-[#f2bf3c]"
        >
          Đặt lịch tư vấn ngay
        </a>
        <p className="text-sm text-[#d4ebff]">Đánh giá đầu vào 1-1 | Hoàn toàn miễn phí</p>
      </div>
    </section>
  );
}
