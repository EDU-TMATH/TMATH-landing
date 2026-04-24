export default function HeroSection() {
  return (
    <section className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-6">
        <p className="inline-flex items-center rounded-full bg-white/75 px-4 py-1 text-sm font-semibold text-[#1f5f8b] ring-1 ring-[#1f5f8b]/20 backdrop-blur">
          Trung tâm lập trình thi đấu cho học sinh từ tiểu học đến THPT
        </p>
        <h1 className="font-(family-name:--font-playfair) text-4xl leading-tight text-[#05243a] sm:text-5xl lg:text-6xl">
          Xây nền tảng giải thuật sớm, bứt phá thành tích thi đấu.
        </h1>
        <p className="max-w-2xl text-base leading-8 text-[#1a3b52] sm:text-lg">
          TMATH đào tạo theo lộ trình tuổi học: tiểu học bắt đầu với
          Scratch/Python, THCS tập trung C++ cho chuyên Tin và HSG lớp 9,
          THPT nâng cao lập trình thi đấu kết hợp ôn thi tốt nghiệp lớp 12.
        </p>
        <div className="flex flex-col gap-4 pt-1 sm:flex-row">
          <a
            id="dang-ky"
            href="#"
            className="rounded-full bg-[#f46f35] px-7 py-3 text-center text-sm font-bold text-white shadow-[0_10px_25px_rgba(244,111,53,0.35)] transition hover:-translate-y-0.5 hover:bg-[#db5f2b]"
          >
            Đăng ký học thử
          </a>
          <a
            href="#"
            className="rounded-full bg-white/80 px-7 py-3 text-center text-sm font-bold text-[#0a2a43] ring-1 ring-[#0a2a43]/20 backdrop-blur transition hover:-translate-y-0.5"
          >
            Xem đề cương khóa học
          </a>
        </div>
      </div>

      <div className="rounded-4xl bg-white/80 p-6 shadow-[0_24px_90px_rgba(11,58,90,0.16)] ring-1 ring-[#0a2a43]/10 backdrop-blur sm:p-7">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#2c6f98]">
            Lộ trình đào tạo
          </h2>
          <span className="rounded-full bg-[#e7f8ec] px-3 py-1 text-xs font-bold text-[#1f8f4a]">
            3 cấp độ liên thông
          </span>
        </div>
        <div className="space-y-4">
          {[
            ["Tiểu học", "Scratch / Python", "w-[100%]"],
            ["THCS", "C++ chuyên Tin lớp 10", "w-[100%]"],
            ["THPT", "Thi đấu HSG + ôn thi 12", "w-[100%]"],
          ].map(([label, score, width]) => (
            <div key={label} className="space-y-2">
              <div className="flex items-center justify-between text-sm font-semibold text-[#0d314b]">
                <span>{label}</span>
                <span>{score}</span>
              </div>
              <div className="h-2.5 rounded-full bg-[#d8ebf8]">
                <div
                  className={`h-full rounded-full bg-linear-to-r from-[#2aa5d6] to-[#1576ab] ${width}`}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm leading-7 text-[#2b4f67]">
          Chương trình xây theo mục tiêu đầu ra từng cấp, kết hợp lý thuyết,
          bài tập thực chiến và luyện đề định kỳ.
        </p>
      </div>
    </section>
  );
}
