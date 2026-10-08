"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ZALO_URL } from "@/app/lib/contact";

type Level = "Tất cả" | "Tiểu học" | "THCS" | "THPT";
type Year = "Tất cả" | string;
type Rank = "gold" | "silver" | "bronze" | "special";

interface ApiSchoolYear {
  id: number;
  start: number;
  finish: number;
}

interface ApiAchievement {
  id: number;
  name: string;
  award: string;
  contest: string;
  level: string;
  year: string | null;
  rank: string;
  avatar: string | null;
}

interface Achievement {
  id: number;
  name: string;
  award: string;
  contest: string;
  level: Exclude<Level, "Tất cả">;
  year: string;
  rank: Rank;
  avatar: string | null;
}

const API_BASE = "https://oj.tmathcoding.vn/api/v3";
const LEVELS: Level[] = ["Tất cả", "Tiểu học", "THCS", "THPT"];

function normalizeLevel(level: string): Exclude<Level, "Tất cả"> | null {
  const value = level.trim().toLowerCase();
  if (value === "tiểu học" || value === "tieu hoc" || value === "primary") {
    return "Tiểu học";
  }
  if (value === "thcs" || value === "secondary") {
    return "THCS";
  }
  if (value === "thpt" || value === "highschool" || value === "high school") {
    return "THPT";
  }
  return null;
}

function normalizeRank(rank: string): Rank {
  const value = rank.trim().toLowerCase();
  if (value === "gold") {
    return "gold";
  }
  if (value === "silver") {
    return "silver";
  }
  if (value === "bronze") {
    return "bronze";
  }
  return "special";
}

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
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-[#0a2a43]/10">
          {item.avatar ? (
            <Image
              src={item.avatar}
              alt={item.name}
              fill
              sizes="44px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm font-bold text-[#0a2a43]">
              {getInitials(item.name)}
            </div>
          )}
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

export default function ThanhTichClient() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [activeYear, setActiveYear] = useState<Year>("Tất cả");
  const [activeLevel, setActiveLevel] = useState<Level>("Tất cả");

  useEffect(() => {
    const controller = new AbortController();

    async function loadData() {
      setIsLoading(true);
      setError(null);

      try {
        const [yearsRes, achievementsRes] = await Promise.all([
          fetch(`${API_BASE}/years`, { signal: controller.signal }),
          fetch(`${API_BASE}/achievements`, { signal: controller.signal }),
        ]);

        if (!yearsRes.ok || !achievementsRes.ok) {
          throw new Error("Không tải được dữ liệu thành tích từ hệ thống.");
        }

        const yearsData = (await yearsRes.json()) as ApiSchoolYear[];
        const achievementsData = (await achievementsRes.json()) as ApiAchievement[];

        const mappedYears = yearsData
          .map((year) => `${year.start}-${year.finish}`)
          .filter((value, index, array) => array.indexOf(value) === index);

        const mappedAchievements = achievementsData
          .map((item) => {
            const level = normalizeLevel(item.level);

            if (!level || !item.year) {
              return null;
            }

            return {
              id: item.id,
              name: item.name,
              award: item.award,
              contest: item.contest,
              level,
              year: item.year,
              rank: normalizeRank(item.rank),
              avatar: item.avatar,
            } satisfies Achievement;
          })
          .filter((item): item is Achievement => item !== null);

        if (controller.signal.aborted) return;

        setYears(mappedYears);
        setAchievements(mappedAchievements);
      } catch {
        if (controller.signal.aborted) return;

        setError("Không thể tải dữ liệu lúc này. Vui lòng thử lại sau.");
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    void loadData();

    return () => {
      controller.abort();
    };
  }, [retryCount]);

  const hasLoaded = !isLoading && !error;

  function retryLoad() {
    setIsLoading(true);
    setError(null);
    setRetryCount((count) => count + 1);
  }

  const yearOptions = useMemo<Year[]>(() => ["Tất cả", ...years], [years]);

  const filtered = useMemo(() => {
    return achievements.filter((a) => {
      const yearOk = activeYear === "Tất cả" || a.year === activeYear;
      const levelOk = activeLevel === "Tất cả" || a.level === activeLevel;
      return yearOk && levelOk;
    });
  }, [activeYear, activeLevel, achievements]);

  // Count per year (for badges)
  const yearCounts = useMemo(() => {
    const counts: Record<string, number> = { "Tất cả": achievements.length };
    achievements.forEach((a) => {
      counts[a.year] = (counts[a.year] ?? 0) + 1;
    });
    return counts;
  }, [achievements]);

  // Count per level, respecting active year filter
  const levelCounts = useMemo(() => {
    const base =
      activeYear === "Tất cả"
        ? achievements
        : achievements.filter((a) => a.year === activeYear);
    const counts: Record<string, number> = { "Tất cả": base.length };
    base.forEach((a) => {
      counts[a.level] = (counts[a.level] ?? 0) + 1;
    });
    return counts;
  }, [activeYear, achievements]);

  const topStats = useMemo(() => {
    const goldCount = achievements.filter((item) => item.rank === "gold").length;
    const specialCount = achievements.filter((item) => item.rank === "special").length;

    return [
      { value: String(achievements.length), label: "Tổng thành tích" },
      { value: String(goldCount), label: "Giải Nhất / Vàng" },
      { value: String(specialCount), label: "Đặc biệt / Đỗ chuyên" },
    ];
  }, [achievements]);

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
          <a
            href={ZALO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[#0a2a43] px-4 py-1.5 text-sm font-semibold text-[#0a2a43] transition hover:-translate-y-0.5 hover:bg-[#0a2a43] hover:text-white"
          >
            Dùng thử miễn phí
          </a>
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
            {topStats.map(({ value, label }) => (
              <div
                key={label}
                className="rounded-2xl bg-white/80 px-6 py-4 text-center ring-1 ring-[#0a2a43]/10 backdrop-blur"
              >
                <span className="block text-3xl font-extrabold text-[#1576ab]">
                  {hasLoaded ? value : "—"}
                </span>
                <span className="mt-0.5 block text-xs font-medium text-[#4a7a96]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Filters ── */}
        <fieldset disabled={!hasLoaded} className="mb-10 space-y-4 disabled:opacity-50">
          <legend className="sr-only">Lọc thành tích theo năm học và cấp độ</legend>
          {/* Year filter */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#4a7a96]">
              Năm học
            </p>
            <div className="flex flex-wrap gap-2">
              {yearOptions.map((y) => (
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
                  {hasLoaded && yearCounts[y] != null && (
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
                  {hasLoaded && levelCounts[l] != null && (
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
        </fieldset>

        {isLoading ? (
          <p role="status" className="mb-6 text-sm text-[#4a7a96]">
            Đang tải dữ liệu thành tích…
          </p>
        ) : error ? (
          <div className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-100">
            <p role="alert">{error}</p>
            <button
              type="button"
              onClick={retryLoad}
              className="mt-3 rounded-full border border-red-700 px-4 py-2 font-semibold hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
            >
              Thử lại
            </button>
          </div>
        ) : (
          <>
            {/* ── Results count ── */}
            <p aria-live="polite" className="mb-6 text-sm text-[#4a7a96]">
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
                <span aria-hidden="true" className="text-4xl">🔍</span>
                <p className="font-semibold text-[#08304d]">Không tìm thấy thành tích</p>
                <p className="text-sm text-[#4a7a96]">
                  {achievements.length === 0
                    ? "Chưa có dữ liệu thành tích được công bố."
                    : "Thử chọn bộ lọc khác."}
                </p>
              </div>
            )}
          </>
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
