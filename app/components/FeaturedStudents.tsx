"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SLIDES = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
];

const AUTO_PLAY_INTERVAL = 4000;

function getVisibleCount() {
  if (typeof window === "undefined") return 1;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
}

export default function FeaturedStudents() {
  const [active, setActive] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const maxIndex = Math.max(0, SLIDES.length - visibleCount);

  const scrollToIndex = useCallback((idx: number) => {
    const vc = getVisibleCount();
    const max = Math.max(0, SLIDES.length - vc);
    const clamped = Math.max(0, Math.min(idx, max));
    setActive(clamped);
    if (trackRef.current) {
      const child = trackRef.current.children[clamped] as HTMLElement;
      if (child) {
        trackRef.current.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
      }
    }
  }, []);

  const advance = useCallback(() => {
    const vc = getVisibleCount();
    const max = Math.max(0, SLIDES.length - vc);
    setActive((prev) => {
      const next = prev >= max ? 0 : prev + 1;
      if (trackRef.current) {
        const child = trackRef.current.children[next] as HTMLElement;
        if (child) trackRef.current.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
      }
      return next;
    });
  }, []);

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(advance, AUTO_PLAY_INTERVAL);
  }, [advance]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    const update = () => setVisibleCount(getVisibleCount());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    startTimer();
    return stopTimer;
  }, [startTimer, stopTimer]);

  useEffect(() => {
    const max = Math.max(0, SLIDES.length - visibleCount);
    if (active > max) scrollToIndex(max);
  }, [visibleCount, active, scrollToIndex]);

  return (
    <section>
      <h2 className="font-(family-name:--font-playfair) mb-2 text-center text-3xl text-[#05243a] sm:text-4xl">
        Học viên nổi bật
      </h2>
      <p className="mb-8 text-center text-sm text-[#2b4f67]">
        Những tấm gương tiêu biểu đã tỏa sáng từ lớp học TMATH.
      </p>

      {/* Carousel */}
      <div
        className="relative"
        onMouseEnter={stopTimer}
        onMouseLeave={startTimer}
      >
        {/* Track */}
        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {SLIDES.map((slide) => (
            <div
              key={slide.id}
              className="w-full shrink-0 sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]"
              style={{ scrollSnapAlign: "start" }}
            >
              {/* Placeholder frame — replace with <Image> when ready */}
              <div className="relative flex aspect-4/3 w-full items-center justify-center rounded-3xl bg-linear-to-br from-[#d8ebf8] to-[#e8f4fd] ring-1 ring-[#0a2a43]/10">
                {/* Grid overlay */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(8,38,61,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(8,38,61,0.07) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />
                {/* Placeholder content */}
                <div className="relative flex flex-col items-center gap-3 px-6 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/80 text-2xl font-extrabold text-[#1576ab] shadow">
                    {slide.id}
                  </div>
                  <p className="text-sm font-semibold text-[#08304d]">
                    Học viên #{slide.id}
                  </p>
                  <p className="max-w-xs text-xs text-[#2b4f67]">
                    Nội dung chi tiết sẽ hiển thị trực tiếp trên ảnh học viên
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Prev Button */}
        <button
          aria-label="Slide trước"
          onClick={() => scrollToIndex(active - 1)}
          className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow ring-1 ring-[#0a2a43]/10 backdrop-blur transition hover:scale-105 hover:bg-white"
        >
          <svg className="h-5 w-5 text-[#0a2a43]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Next Button */}
        <button
          aria-label="Slide tiếp"
          onClick={() => scrollToIndex(active + 1)}
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow ring-1 ring-[#0a2a43]/10 backdrop-blur transition hover:scale-105 hover:bg-white"
        >
          <svg className="h-5 w-5 text-[#0a2a43]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dot indicators — one per scroll position */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            aria-label={`Đến vị trí ${idx + 1}`}
            onClick={() => scrollToIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === active
                ? "w-6 bg-[#1576ab]"
                : "w-2 bg-[#1576ab]/30 hover:bg-[#1576ab]/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
