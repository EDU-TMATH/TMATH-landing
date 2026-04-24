export default function PathwayCards() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[
        [
          "Tiểu học: Scratch/Python",
          "Xây tư duy logic, học cách phân ra bài toán nhỏ, tiếp cận lập trình bằng dự án trực quan và bài tập vui.",
        ],
        [
          "THCS: C++ chuyên Tin",
          "Tập trung cấu trúc dữ liệu và giải thuật cốt lõi, luyện đề vào chuyên Tin lớp 10 và kỳ thi HSG lớp 9.",
        ],
        [
          "THPT: Thi đấu nâng cao",
          "Nâng cấp kỹ năng code tối ưu cho đội tuyển HSG, đồng thời hỗ trợ ôn thi tốt nghiệp lớp 12 có chiến lược.",
        ],
      ].map(([title, desc]) => (
        <article
          key={title}
          className="rounded-3xl bg-white/70 p-6 ring-1 ring-[#0a2a43]/10 backdrop-blur"
        >
          <h3 className="mb-3 text-lg font-bold text-[#08304d]">{title}</h3>
          <p className="text-sm leading-7 text-[#29516b]">{desc}</p>
        </article>
      ))}
    </section>
  );
}
