export default function PlatformSection() {
  const platforms = [
    {
      tag: "Tiểu học · Scratch / Python",
      name: "TMATH Playground",
      desc: "Sân luyện tập trực quan dành cho học sinh tiểu học — nộp bài Scratch và Python, nhận phản hồi tức thì, thi đấu theo mùa giải.",
      href: "https://p.tmathcoding.vn",
      stats: [
        { value: "Scratch", label: "& Python" },
        { value: "Thi đấu", label: "theo mùa" },
      ],
      accent: "from-[#2aa5d6] to-[#1576ab]",
      tagColor: "bg-[#e6f5fc] text-[#1576ab]",
      btnColor:
        "bg-[#1576ab] text-white hover:bg-[#1063921] shadow-[0_8px_20px_rgba(21,118,171,0.35)]",
      icon: (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          className="h-10 w-10"
          aria-hidden="true"
        >
          <rect width="40" height="40" rx="12" fill="#e6f5fc" />
          <path
            d="M12 26 L20 14 L28 26"
            stroke="#1576ab"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="27" r="2" fill="#2aa5d6" />
        </svg>
      ),
    },
    {
      tag: "THCS · THPT · C++",
      name: "TMATH Online Judge",
      desc: "Hệ thống chấm thi tự động cho C++ và nhiều ngôn ngữ khác — 602 bài tập từ cơ bản đến thi đấu quốc gia, hỗ trợ 15 ngôn ngữ lập trình.",
      href: "https://c.tmathcoding.vn",
      stats: [
        { value: "602+", label: "bài tập" },
        { value: "15", label: "ngôn ngữ" },
      ],
      accent: "from-[#e8630a] to-[#f46f35]",
      tagColor: "bg-[#fff1e8] text-[#c4470a]",
      btnColor:
        "bg-[#f46f35] text-white hover:bg-[#db5f2b] shadow-[0_8px_20px_rgba(244,111,53,0.35)]",
      icon: (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          className="h-10 w-10"
          aria-hidden="true"
        >
          <rect width="40" height="40" rx="12" fill="#fff1e8" />
          <path
            d="M14 16 L10 20 L14 24"
            stroke="#f46f35"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M26 16 L30 20 L26 24"
            stroke="#f46f35"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 13 L18 27"
            stroke="#e8630a"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <section>
      <div className="mb-8 text-center">
        <h2 className="font-(family-name:--font-playfair) text-3xl text-[#05243a] sm:text-4xl">
          Sân luyện tập trực tuyến
        </h2>
        <p className="mt-3 text-sm leading-7 text-[#29516b] sm:text-base">
          Hai nền tảng chấm bài trực tuyến — học sinh nộp bài, nhận kết quả
          ngay, theo dõi tiến độ theo thời gian thực.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {platforms.map((p) => (
          <article
            key={p.name}
            className="flex flex-col rounded-3xl bg-white/70 p-6 ring-1 ring-[#0a2a43]/10 backdrop-blur sm:p-7"
          >
            <div className="flex items-start gap-4">
              {p.icon}
              <div className="min-w-0 flex-1">
                <span
                  className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${p.tagColor}`}
                >
                  {p.tag}
                </span>
                <h3 className="mt-1 text-lg font-bold text-[#08304d]">
                  {p.name}
                </h3>
              </div>
            </div>

            <p className="mt-4 text-sm leading-7 text-[#29516b]">{p.desc}</p>

            <div className="mt-5 flex gap-6">
              {p.stats.map((s) => (
                <div key={s.label}>
                  <p
                    className={`bg-linear-to-r text-2xl font-extrabold ${p.accent} bg-clip-text text-transparent`}
                  >
                    {s.value}
                  </p>
                  <p className="text-xs text-[#4a7a99]">{s.label}</p>
                </div>
              ))}
            </div>

            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-6 self-start rounded-full px-5 py-2.5 text-sm font-bold transition hover:-translate-y-0.5 ${p.btnColor}`}
            >
              Vào luyện tập →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
