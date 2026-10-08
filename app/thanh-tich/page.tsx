import type { Metadata } from "next";
import ThanhTichClient from "./ThanhTichClient";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://tmathcoding.vn/thanh-tich",
  },
};

export default function ThanhTichPage() {
  return <ThanhTichClient />;
}
