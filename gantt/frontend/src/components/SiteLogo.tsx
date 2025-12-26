import * as React from "react";

type Props = React.SVGProps<SVGSVGElement> & { size?: number };

export default function SiteLogo({ size = 28, ...props }: Props) {
  // ⬇️ Remplace cet SVG par ton logo
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Logo"
      {...props}
    >
      <rect x="6" y="6" width="52" height="52" rx="12" fill="currentColor" opacity="0.12" />
      <path d="M16 40L28 20l8 12 6-8 10 16H16z" fill="currentColor" />
    </svg>
  );
}
