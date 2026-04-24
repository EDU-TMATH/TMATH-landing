export default function AchievementsSection() {
  return (
    <section>
      <h2 className="font-(family-name:--font-playfair) mb-8 text-center text-3xl text-[#05243a] sm:text-4xl">
        Thành tích nổi bật của học viên
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            stat: "50+",
            label: "Học sinh đỗ chuyên Tin",
            sub: "Các trường chuyên toàn quốc",
            color: "from-[#1f6fab] to-[#2aa5d6]",
          },
          {
            stat: "30+",
            label: "Giải HSG cấp tỉnh/TP",
            sub: "Tin học lớp 9 & 12",
            color: "from-[#e8630a] to-[#f46f35]",
          },
          {
            stat: "12",
            label: "Học sinh vào đội tuyển Quốc gia",
            sub: "Kỳ thi HSG QG môn Tin học",
            color: "from-[#1a7a4a] to-[#27ae60]",
          },
          {
            stat: "95%",
            label: "Học sinh đạt mục tiêu đầu ra",
            sub: "Sau khoá học 3-6 tháng",
            color: "from-[#6d28d9] to-[#a855f7]",
          },
        ].map(({ stat, label, sub, color }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-2 rounded-3xl bg-white/80 px-5 py-7 text-center ring-1 ring-[#0a2a43]/10 backdrop-blur"
          >
            <span
              className={`bg-linear-to-br ${color} bg-clip-text text-5xl font-extrabold text-transparent`}
            >
              {stat}
            </span>
            <span className="font-bold text-[#08304d]">{label}</span>
            <span className="text-xs text-[#4a7a96]">{sub}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
