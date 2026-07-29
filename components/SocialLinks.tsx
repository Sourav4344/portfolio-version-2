import { profile } from "@/lib/data";
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
  GmailIcon,
} from "./Icons";

const links = [
  { href: profile.social.github, label: "GitHub", Icon: GithubIcon, hover: "#38BDF8" },
  { href: profile.social.linkedin, label: "LinkedIn", Icon: LinkedinIcon, hover: "#38BDF8" },
  { href: profile.social.twitter, label: "Twitter", Icon: TwitterIcon, hover: "#00E5FF" },
  { href: profile.social.instagram, label: "Instagram", Icon: InstagramIcon, hover: "#8B5CF6" },
  { href: profile.social.facebook, label: "Facebook", Icon: FacebookIcon, hover: "#00E5FF" },
];

export default function SocialLinks({
  showEmail = false,
  size = "md",
}: {
  showEmail?: boolean;
  size?: "md" | "lg";
}) {
  const items = showEmail
    ? [...links, { href: profile.social.gmail, label: "Gmail", Icon: GmailIcon, hover: "#8B5CF6" }]
    : links;

  const dim = size === "lg" ? "h-11 w-11" : "h-9 w-9";
  const iconDim = size === "lg" ? "h-5 w-5" : "h-4 w-4";

  return (
    <div className="flex flex-wrap gap-3">
      {items.map(({ href, label, Icon, hover }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          aria-label={label}
          title={label}
          style={{ ["--hover" as string]: hover }}
          className={`group flex ${dim} items-center justify-center rounded-full border border-white/10 bg-white/5 text-dim transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--hover)] hover:text-[color:var(--hover)] hover:shadow-[0_0_16px_-2px_var(--hover)]`}
        >
          <Icon className={iconDim} />
        </a>
      ))}
    </div>
  );
}
