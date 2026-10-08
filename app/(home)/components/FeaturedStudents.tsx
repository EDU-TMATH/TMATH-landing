"use client";

import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";

const SLIDES = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
];

const AUTO_PLAY_INTERVAL = 4000;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function getReducedMotion() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function subscribeToReducedMotion(onChange: () => void) {
  const media = window.matchMedia(REDUCED_MOTION_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getServerReducedMotion() {
  return true;
}

function getVisibleCount() {
  if (typeof window === "undefined") return 1;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
}

function subscribeToResize(onResize: () => void) {
  window.addEventListener("resize", onResize);
  return () => window.removeEventListener("resize", onResize);
}

function getServerVisibleCount() {
  return 1;
}

export default function FeaturedStudents() {
  const trackId = useId();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );
  const visibleCount = useSyncExternalStore(
    subscribeToResize,
    getVisibleCount,
    getServerVisibleCount,
  );
  const trackRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const isAutoplayEnabled = !isPaused && !prefersReducedMotion;

  const maxIndex = Math.max(0, SLIDES.length - visibleCount);
  const active = Math.min(selectedIndex, maxIndex);

  const scrollToIndex = useCallback((idx: number) => {
    const vc = getVisibleCount();
    const max = Math.max(0, SLIDES.length - vc);
    const clamped = Math.max(0, Math.min(idx, max));
    activeIndexRef.current = clamped;
    setSelectedIndex(clamped);
    const track = trackRef.current;
    const child = track?.children[clamped] as HTMLElement | undefined;
    const firstChild = track?.children[0] as HTMLElement | undefined;
    if (track && child && firstChild) {
      track.scrollTo({
        left: child.offsetLeft - firstChild.offsetLeft,
        behavior: getReducedMotion() ? "instant" : "smooth",
      });
    }
  }, []);

  const advance = useCallback(() => {
    const vc = getVisibleCount();
    const max = Math.max(0, SLIDES.length - vc);
    scrollToIndex(activeIndexRef.current >= max ? 0 : activeIndexRef.current + 1);
  }, [scrollToIndex]);

  useEffect(() => {
    if (!isAutoplayEnabled || isHovered) return;

    const timer = setInterval(advance, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [advance, isAutoplayEnabled, isHovered]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let scrollTimer: ReturnType<typeof setTimeout> | undefined;

    const syncIndex = () => {
      clearTimeout(scrollTimer);
      const firstChild = track.children[0] as HTMLElement | undefined;
      if (!firstChild) return;

      const max = Math.max(0, SLIDES.length - getVisibleCount());
      let nearestIndex = 0;
      let nearestDistance = Infinity;

      for (let index = 0; index <= max; index++) {
        const child = track.children[index] as HTMLElement;
        const distance = Math.abs(
          child.offsetLeft - firstChild.offsetLeft - track.scrollLeft,
        );
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      }

      activeIndexRef.current = nearestIndex;
      setSelectedIndex(nearestIndex);
    };

    // Debounce also covers browsers that do not emit scrollend.
    const onScroll = () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(syncIndex, 150);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("scrollend", syncIndex);
    return () => {
      clearTimeout(scrollTimer);
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("scrollend", syncIndex);
    };
  }, []);

  useEffect(() => {
    const index = Math.min(activeIndexRef.current, SLIDES.length - visibleCount);
    activeIndexRef.current = index;
    const track = trackRef.current;
    const child = track?.children[index] as HTMLElement | undefined;
    const firstChild = track?.children[0] as HTMLElement | undefined;
    if (track && child && firstChild) {
      track.scrollTo({ left: child.offsetLeft - firstChild.offsetLeft, behavior: "instant" });
    }
  }, [visibleCount]);

  return (
    <section>
      <h2 className="font-(family-name:--font-playfair) mb-2 text-center text-3xl text-[#05243a] sm:text-4xl">
        Học viên nổi bật
      </h2>
      <p className="mb-4 text-center text-sm text-[#2b4f67]">
        Những tấm gương tiêu biểu đã tỏa sáng từ lớp học TMATH.
      </p>

      <div className="mb-6 text-center">
        <button
          type="button"
          aria-controls={trackId}
          disabled={prefersReducedMotion}
          onClick={() => {
            setIsHovered(false);
            setIsPaused((paused) => !paused);
          }}
          className="rounded-full border border-[#1576ab]/30 bg-white/80 px-4 py-2 text-sm font-semibold text-[#0a2a43] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1576ab] disabled:cursor-default disabled:opacity-60"
        >
          {isAutoplayEnabled ? "Tạm dừng tự chuyển" : "Phát tự động"}
        </button>
        {prefersReducedMotion && (
          <p role="status" className="mt-2 text-xs text-[#2b4f67]">
            Đã tắt tự chuyển theo cài đặt giảm chuyển động của thiết bị.
          </p>
        )}
      </div>

      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocusCapture={() => setIsPaused(true)}
      >
        {/* Carousel */}
        <div className="relative">
          {/* Track */}
          <div
            id={trackId}
            ref={trackRef}
            onPointerDown={() => setIsPaused(true)}
            onWheel={() => setIsPaused(true)}
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
            className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow ring-1 ring-[#0a2a43]/10 backdrop-blur transition motion-safe:hover:scale-105 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1576ab]"
          >
            <svg className="h-5 w-5 text-[#0a2a43]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            aria-label="Slide tiếp"
            onClick={() => scrollToIndex(active + 1)}
            className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow ring-1 ring-[#0a2a43]/10 backdrop-blur transition motion-safe:hover:scale-105 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1576ab]"
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
              aria-current={idx === active ? "true" : undefined}
              onClick={() => scrollToIndex(idx)}
              className={`h-2 rounded-full transition-[width,background-color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1576ab] ${
                idx === active
                  ? "w-6 bg-[#1576ab]"
                  : "w-2 bg-[#1576ab]/30 hover:bg-[#1576ab]/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
