import type { Metadata } from "next";
import CyberRadarFeed from "@/components/CyberRadarFeed";

export const metadata: Metadata = {
  title: "Threat Radar — Real-Time Cyber Intelligence Feed",
  description:
    "Live continuous cybersecurity and hacking intelligence stream — tracking zero-days, ransomware operations, active CVE exploits, and global security advisories.",
};

export default function CyberNewsPage() {
  return (
    <div className="pt-24 pb-16">
      <CyberRadarFeed />
    </div>
  );
}
