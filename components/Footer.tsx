import Link from "next/link";
import { navLinks, profile } from "@/lib/data";
import SocialLinks from "./SocialLinks";
import BackToTop from "./BackToTop";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line">
      <div className="section-wrap !py-6 !pt-0 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-faint sm:flex-row">
        <span>© {new Date().getFullYear()} Sourav Maji. Built with Next.js &amp; Tailwind CSS.</span>
        <BackToTop />
      </div>
    </footer>
  );
}
