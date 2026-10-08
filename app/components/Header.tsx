import Image from "next/image";
import Link from "next/link";
import { ZALO_URL } from "@/app/lib/contact";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10">
          <Image
            src="/logo.svg"
            alt="TMATH Logo"
            width={40}
            height={40}
            priority
            className="h-full w-full"
          />
        </div>
        <span className="text-2xl font-bold tracking-tight text-[#0a2a43]">TMATH</span>
      </div>
      <nav className="flex items-center gap-4">
        <Link
          href="/thanh-tich"
          className="hidden text-sm font-medium text-[#2b4f67] transition hover:text-[#0a2a43] sm:block"
        >
          Thành tích
        </Link>
        <a
          href={ZALO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-[#0a2a43] px-5 py-2 text-sm font-semibold text-[#0a2a43] transition hover:-translate-y-0.5 hover:bg-[#0a2a43] hover:text-white"
        >
          Dùng thử miễn phí
        </a>
      </nav>
    </header>
  );
}
