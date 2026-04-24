"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

// ─── Data ──────────────────────────────────────────────────────────────────

type Level = "Tất cả" | "Tiểu học" | "THCS" | "THPT";
type Year = "Tất cả" | "2022–2023" | "2023–2024" | "2024–2025";

interface Achievement {
  id: number;
  name: string;
  award: string;
  contest: string;
  level: Exclude<Level, "Tất cả">;
  year: Exclude<Year, "Tất cả">;
  rank: "gold" | "silver" | "bronze" | "special";
}

const ACHIEVEMENTS: Achievement[] = [
  // 2024–2025
  {
    id: 1,
    name: "Nguyễn Minh Khôi",
    award: "Giải Nhất HSG Quốc Gia",
    contest: "Kỳ thi HSG Quốc Gia môn Tin học",
    level: "THPT",
    year: "2024–2025",
    rank: "gold",
  },
  {
    id: 2,
    name: "Trần Phương Anh",
    award: "Giải Nhì HSG Quốc Gia",
    contest: "Kỳ thi HSG Quốc Gia môn Tin học",
    level: "THPT",
    year: "2024–2025",
    rank: "silver",
  },
  {
    id: 3,
    name: "Lê Đức Thành",
    award: "Giải Nhất HSG Tỉnh",
    contest: "Kỳ thi HSG Tỉnh môn Tin học lớp 12",
    level: "THPT",
    year: "2024–2025",
    rank: "gold",
  },
  {
    id: 4,
    name: "Phạm Thị Lan",
    award: "Giải Nhất HSG Tỉnh",
    contest: "Kỳ thi HSG Tỉnh môn Tin học lớp 9",
    level: "THCS",
    year: "2024–2025",
    rank: "gold",
  },
  {
    id: 5,
    name: "Vũ Quang Huy",
    award: "Giải Nhì HSG Tỉnh",
    contest: "Kỳ thi HSG Tỉnh môn Tin học lớp 9",
    level: "THCS",
    year: "2024–2025",
    rank: "silver",
  },
  {
    id: 6,
    name: "Ngô Bảo Châu",
    award: "Đỗ chuyên Tin THPT Chuyên",
    contest: "Kỳ thi tuyển sinh vào lớp 10 chuyên Tin",
    level: "THCS",
    year: "2024–2025",
    rank: "special",
  },
  {
    id: 7,
    name: "Đinh Tuấn Kiệt",
    award: "Đỗ chuyên Tin THPT Chuyên",
    contest: "Kỳ thi tuyển sinh vào lớp 10 chuyên Tin",
    level: "THCS",
    year: "2024–2025",
    rank: "special",
  },
  {
    id: 8,
    name: "Hoàng Gia Bảo",
    award: "Giải Nhất Scratch Quốc Tế",
    contest: "Scratch Coding Challenge – Asia Pacific",
    level: "Tiểu học",
    year: "2024–2025",
    rank: "gold",
  },
  {
    id: 9,
    name: "Lý Thị Ngọc",
    award: "Giải Nhì Olympic Tin Học",
    contest: "Olympic Tin học Việt Nam cấp Tiểu học",
    level: "Tiểu học",
    year: "2024–2025",
    rank: "silver",
  },
  // 2023–2024
  {
    id: 10,
    name: "Đặng Văn Long",
    award: "Giải Ba HSG Quốc Gia",
    contest: "Kỳ thi HSG Quốc Gia môn Tin học",
    level: "THPT",
    year: "2023–2024",
    rank: "bronze",
  },
  {
    id: 11,
    name: "Bùi Thanh Tú",
    award: "Giải Nhất HSG Tỉnh",
    contest: "Kỳ thi HSG Tỉnh môn Tin học lớp 12",
    level: "THPT",
    year: "2023–2024",
    rank: "gold",
  },
  {
    id: 12,
    name: "Cao Hải Minh",
    award: "Giải Nhì HSG Tỉnh",
    contest: "Kỳ thi HSG Tỉnh môn Tin học lớp 12",
    level: "THPT",
    year: "2023–2024",
    rank: "silver",
  },
  {
    id: 13,
    name: "Trịnh Thu Hương",
    award: "Giải Nhất HSG Tỉnh",
    contest: "Kỳ thi HSG Tỉnh môn Tin học lớp 9",
    level: "THCS",
    year: "2023–2024",
    rank: "gold",
  },
  {
    id: 14,
    name: "Nguyễn Duy Khang",
    award: "Đỗ chuyên Tin THPT Chuyên",
    contest: "Kỳ thi tuyển sinh vào lớp 10 chuyên Tin",
    level: "THCS",
    year: "2023–2024",
    rank: "special",
  },
  {
    id: 15,
    name: "Mai Phước Lộc",
    award: "Đỗ chuyên Tin THPT Chuyên",
    contest: "Kỳ thi tuyển sinh vào lớp 10 chuyên Tin",
    level: "THCS",
    year: "2023–2024",
    rank: "special",
  },
  {
    id: 16,
    name: "Phan Gia Khiêm",
    award: "Giải Nhất Olympic Tin Học",
    contest: "Olympic Tin học Việt Nam cấp Tiểu học",
    level: "Tiểu học",
    year: "2023–2024",
    rank: "gold",
  },
  {
    id: 17,
    name: "Đoàn Khánh Linh",
    award: "Giải Khuyến Khích HSG Quốc Gia",
    contest: "Kỳ thi HSG Quốc Gia môn Tin học",
    level: "THPT",
    year: "2023–2024",
    rank: "bronze",
  },
  // 2022–2023
  {
    id: 18,
    name: "Lưu Hồng Phúc",
    award: "Giải Nhì HSG Quốc Gia",
    contest: "Kỳ thi HSG Quốc Gia môn Tin học",
    level: "THPT",
    year: "2022–2023",
    rank: "silver",
  },
  {
    id: 19,
    name: "Tô Minh Hiếu",
    award: "Giải Nhất HSG Tỉnh",
    contest: "Kỳ thi HSG Tỉnh môn Tin học lớp 12",
    level: "THPT",
    year: "2022–2023",
    rank: "gold",
  },
  {
    id: 20,
    name: "Nguyễn Yến Nhi",
    award: "Giải Nhất HSG Tỉnh",
    contest: "Kỳ thi HSG Tỉnh môn Tin học lớp 9",
    level: "THCS",
    year: "2022–2023",
    rank: "gold",
  },
  {
    id: 21,
    name: "Từ Gia Hân",
    award: "Giải Nhì HSG Tỉnh",
    contest: "Kỳ thi HSG Tỉnh môn Tin học lớp 9",
    level: "THCS",
    year: "2022–2023",
    rank: "silver",
  },
  {
    id: 22,
    name: "Phan Đăng Khoa",
    award: "Đỗ chuyên Tin THPT Chuyên",
    contest: "Kỳ thi tuyển sinh vào lớp 10 chuyên Tin",
    level: "THCS",
    year: "2022–2023",
    rank: "special",
  },
  {
    id: 23,
    name: "Hoàng Khánh An",
    award: "Giải Ba Olympic Tin Học",
    contest: "Olympic Tin học Việt Nam cấp Tiểu học",
    level: "Tiểu học",
    year: "2022–2023",
    rank: "bronze",
  },
  {
    id: 24,
    name: "Vương Quốc Bảo",
    award: "Giải Ba HSG Tỉnh",
    contest: "Kỳ thi HSG Tỉnh môn Tin học lớp 12",
    level: "THPT",
    year: "2022–2023",
    rank: "bronze",
  },
];

// ─── Constants ─────────────────────────────────────────────────────────────

const YEARS: Year[] = ["Tất cả", "2024–2025", "2023–2024", "2022–2023"];
const LEVELS: Level[] = ["Tất cả", "Tiểu học", "THCS", "THPT"];

const RANK_CONFIG = {
  gold: {
    label: "Giải Nhất / Vàng",
    bg: "bg-amber-50",
    ring: "ring-amber-300",
    badge: "bg-amber-100 text-amber-700",
    icon: "🥇",
  },
  silver: {
    label: "Giải Nhì / Bạc",
    bg: "bg-slate-50",
    ring: "ring-slate-300",
    badge: "bg-slate-100 text-slate-600",
    icon: "🥈",
  },
  bronze: {
    label: "Giải Ba / Đồng",
    bg: "bg-orange-50",
    ring: "ring-orange-200",
    badge: "bg-orange-100 text-orange-600",
    icon: "🥉",
  },
  special: {
    label: "Thành tích đặc biệt",
    bg: "bg-violet-50",
    ring: "ring-violet-200",
    badge: "bg-violet-100 text-violet-600",
    icon: "⭐",
  },
} as const;

const LEVEL_COLOR: Record<Exclude<Level, "Tất cả">, string> = {
  "Tiểu học": "bg-sky-100 text-sky-700",
  THCS: "bg-teal-100 text-teal-700",
  THPT: "bg-indigo-100 text-indigo-700",
};

function getInitials(name: string) {
  const parts = name.trim().split(" ");
  return parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : parts[0].slice(0, 2).toUpperCase();
}

// ─── Components ────────────────────────────────────────────────────────────

function AchievementCard({ item }: { item: Achievement }) {
  const rank = RANK_CONFIG[item.rank];
  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl ${rank.bg} p-5 ring-1 ${rank.ring} transition hover:-translate-y-0.5 hover:shadow-md`}
    >
      {/* Header row */}
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-[#0a2a43] shadow-sm ring-1 ring-[#0a2a43]/10">
          {getInitials(item.name)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-[#08304d]">{item.name}</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            <span
              className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${LEVEL_COLOR[item.level]}`}
            >
              {item.level}
            </span>
            <span
              className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${rank.badge}`}
            >
              {rank.icon} {item.rank === "special" ? "Đặc biệt" : item.award.split(" ").slice(0, 2).join(" ")}
            </span>
          </div>
        </div>
      </div>
      {/* Award */}
      <div>
        <p className="text-[15px] font-bold leading-tight text-[#05243a]">
          {item.award}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-[#4a7a96]">
          {item.contest}
        </p>
      </div>
      {/* Footer */}
      <div className="mt-auto flex items-center justify-between">
        <span className="text-xs font-medium text-[#2b4f67]">
          Năm học {item.year}
        </span>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function ThanhTichPage() {
  const [activeYear, setActiveYear] = useState<Year>("Tất cả");
  const [activeLevel, setActiveLevel] = useState<Level>("Tất cả");

  const filtered = useMemo(() => {
    return ACHIEVEMENTS.filter((a) => {
      const yearOk = activeYear === "Tất cả" || a.year === activeYear;
      const levelOk = activeLevel === "Tất cả" || a.level === activeLevel;
      return yearOk && levelOk;
    });
  }, [activeYear, activeLevel]);

  // Count per year (for badges)
  const yearCounts = useMemo(() => {
    const counts: Record<string, number> = { "Tất cả": ACHIEVEMENTS.length };
    ACHIEVEMENTS.forEach((a) => {
      counts[a.year] = (counts[a.year] ?? 0) + 1;
    });
    return counts;
  }, []);

  // Count per level, respecting active year filter
  const levelCounts = useMemo(() => {
    const base =
      activeYear === "Tất cả"
        ? ACHIEVEMENTS
        : ACHIEVEMENTS.filter((a) => a.year === activeYear);
    const counts: Record<string, number> = { "Tất cả": base.length };
    base.forEach((a) => {
      counts[a.level] = (counts[a.level] ?? 0) + 1;
    });
    return counts;
  }, [activeYear]);

  return (
    <>
      {/* ── Nav ── */}
      <header className="sticky top-0 z-40 border-b border-[#0a2a43]/8 bg-[#f7fbff]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 sm:px-10 lg:px-16">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-8 w-8">
              <Image
                src="/logo.svg"
                alt="TMATH Logo"
                width={32}
                height={32}
                className="h-full w-full"
              />
            </div>
            <span className="text-lg font-bold tracking-tight text-[#0a2a43]">
              TMATH
            </span>
          </Link>
          <Link
            href="/#dang-ky"
            className="rounded-full border border-[#0a2a43] px-4 py-1.5 text-sm font-semibold text-[#0a2a43] transition hover:-translate-y-0.5 hover:bg-[#0a2a43] hover:text-white"
          >
            Dùng thử miễn phí
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 lg:px-16">
        {/* ── Hero ── */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#1576ab]">
            Thành tích học viên
          </p>
          <h1 className="font-(family-name:--font-playfair) text-4xl font-bold text-[#05243a] sm:text-5xl">
            Những tấm huy chương<br className="hidden sm:block" /> của TMATH
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-[#2b4f67]">
            Mỗi giải thưởng là minh chứng cho hành trình kiên trì của học viên
            và tâm huyết của đội ngũ giảng viên TMATH.
          </p>

          {/* Stats pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {[
              { value: "50+", label: "Đỗ chuyên Tin" },
              { value: "30+", label: "Giải HSG Tỉnh/TP" },
              { value: "12", label: "Đội tuyển QG" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="rounded-2xl bg-white/80 px-6 py-4 text-center ring-1 ring-[#0a2a43]/10 backdrop-blur"
              >
                <span className="block text-3xl font-extrabold text-[#1576ab]">
                  {value}
                </span>
                <span className="mt-0.5 block text-xs font-medium text-[#4a7a96]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Filters ── */}
        <div className="mb-10 space-y-4">
          {/* Year filter */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#4a7a96]">
              Năm học
            </p>
            <div className="flex flex-wrap gap-2">
              {YEARS.map((y) => (
                <button
                  key={y}
                  onClick={() => {
                    setActiveYear(y);
                    setActiveLevel("Tất cả");
                  }}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition ${
                    activeYear === y
                      ? "bg-[#0a2a43] text-white shadow"
                      : "bg-white/80 text-[#08304d] ring-1 ring-[#0a2a43]/15 hover:bg-white hover:ring-[#0a2a43]/30"
                  }`}
                >
                  {y}
                  {yearCounts[y] != null && (
                    <span
                      className={`rounded-full px-1.5 py-px text-[11px] font-semibold ${
                        activeYear === y
                          ? "bg-white/20 text-white"
                          : "bg-[#0a2a43]/8 text-[#4a7a96]"
                      }`}
                    >
                      {yearCounts[y]}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Level filter */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#4a7a96]">
              Cấp độ
            </p>
            <div className="flex flex-wrap gap-2">
              {LEVELS.map((l) => (
                <button
                  key={l}
                  onClick={() => setActiveLevel(l)}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition ${
                    activeLevel === l
                      ? "bg-[#1576ab] text-white shadow"
                      : "bg-white/80 text-[#08304d] ring-1 ring-[#0a2a43]/15 hover:bg-white hover:ring-[#0a2a43]/30"
                  }`}
                >
                  {l}
                  {levelCounts[l] != null && (
                    <span
                      className={`rounded-full px-1.5 py-px text-[11px] font-semibold ${
                        activeLevel === l
                          ? "bg-white/20 text-white"
                          : "bg-[#0a2a43]/8 text-[#4a7a96]"
                      }`}
                    >
                      {levelCounts[l]}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Results count ── */}
        <p className="mb-6 text-sm text-[#4a7a96]">
          Hiển thị{" "}
          <span className="font-semibold text-[#08304d]">{filtered.length}</span>{" "}
          thành tích
          {activeYear !== "Tất cả" && (
            <>
              {" "}năm học{" "}
              <span className="font-semibold text-[#08304d]">{activeYear}</span>
            </>
          )}
          {activeLevel !== "Tất cả" && (
            <>
              {" "}cấp{" "}
              <span className="font-semibold text-[#08304d]">{activeLevel}</span>
            </>
          )}
        </p>

        {/* ── Grid ── */}
        {filtered.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <AchievementCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 py-24 text-center">
            <span className="text-4xl">🔍</span>
            <p className="font-semibold text-[#08304d]">Không tìm thấy thành tích</p>
            <p className="text-sm text-[#4a7a96]">Thử chọn bộ lọc khác.</p>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="mt-auto border-t border-[#0a2a43]/8 bg-[#0d3f63] py-8 text-center text-sm text-[#d4ebff]">
        <p>© {new Date().getFullYear()} TMATH. Tất cả quyền được bảo lưu.</p>
        <p className="mt-1">
          <Link href="/" className="underline-offset-2 hover:underline">
            ← Về trang chủ
          </Link>
        </p>
      </footer>
    </>
  );
}
