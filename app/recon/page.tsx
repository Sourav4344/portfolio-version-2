import type { Metadata } from "next";
import OsintLookup from "@/components/OsintLookup";

export const metadata: Metadata = {
  title: "Target Recon — Person & Digital Footprint OSINT Scanner",
  description:
    "Deep reconnaissance & OSINT intelligence tool to look up phone numbers and email addresses, discover subscriber identity, profile photos, telecom carriers, and connected social media accounts.",
};

export default function ReconPage() {
  return (
    <div className="pt-24 pb-16">
      <OsintLookup />
    </div>
  );
}
