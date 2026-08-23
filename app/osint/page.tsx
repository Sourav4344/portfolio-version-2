import type { Metadata } from "next";
import OsintLookup from "@/components/OsintLookup";

export const metadata: Metadata = {
  title: "OSINT Target Recon — Identity & Social Scanner",
  description:
    "Deep reconnaissance & OSINT intelligence tool to look up phone numbers and email addresses, discover subscriber identity, profile photos, telecom carriers, and connected social media accounts.",
};

export default function OsintPage() {
  return (
    <div className="pt-24 pb-16">
      <OsintLookup />
    </div>
  );
}
