import type { CollectionMeta } from "@/lib/devshelf-catalog";

export function BrassBookend({ side = "left" }: { side?: "left" | "right" }) {
  return (
    <div
      aria-hidden="true"
      className={`hidden sm:flex flex-col items-center justify-end shrink-0 select-none ${
        side === "right" ? "-scale-x-100" : ""
      }`}
    >
      <svg
        width="26"
        height="72"
        viewBox="0 0 26 72"
        fill="none"
        className="text-[#9E7C47] dark:text-[#C5A467]"
      >
        <path
          d="M4 68H22V71H3C2.4 71 2 70.6 2 70V16C2 8.268 8.268 2 16 2H17V68"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="currentColor"
          fillOpacity="0.12"
        />
        <path
          d="M16 10C10.5 10 6.5 14.5 6.5 21V63"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <circle cx="12" cy="30" r="3" stroke="currentColor" strokeWidth="1.1" />
        <path d="M12 33V52" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function ShelfPropCluster({ variant }: { variant: CollectionMeta["propVariant"] }) {
  switch (variant) {
    case "fern-brass":
      return (
        <div aria-hidden="true" className="flex items-end gap-3 shrink-0 pl-2 select-none">
          {/* Terracotta potted fern */}
          <svg width="60" height="86" viewBox="0 0 60 86" fill="none">
            <path
              d="M30 48C26 36 18 28 11 25"
              stroke="#6E8467"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M30 48C33 34 40 25 49 22"
              stroke="#6E8467"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M30 48C29 33 29 22 30 12"
              stroke="#5B7055"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <ellipse
              cx="16"
              cy="28"
              rx="4"
              ry="2.2"
              transform="rotate(-25 16 28)"
              fill="#A9BBA2"
              stroke="#51443C"
              strokeWidth="1"
            />
            <ellipse
              cx="22"
              cy="34"
              rx="3.8"
              ry="2"
              transform="rotate(-20 22 34)"
              fill="#A9BBA2"
              stroke="#51443C"
              strokeWidth="1"
            />
            <ellipse
              cx="44"
              cy="26"
              rx="4"
              ry="2.2"
              transform="rotate(28 44 26)"
              fill="#A9BBA2"
              stroke="#51443C"
              strokeWidth="1"
            />
            <ellipse
              cx="38"
              cy="33"
              rx="3.8"
              ry="2"
              transform="rotate(22 38 33)"
              fill="#A9BBA2"
              stroke="#51443C"
              strokeWidth="1"
            />
            <ellipse
              cx="26"
              cy="20"
              rx="3.8"
              ry="2"
              transform="rotate(-12 26 20)"
              fill="#A9BBA2"
              stroke="#51443C"
              strokeWidth="1"
            />
            <ellipse
              cx="34"
              cy="18"
              rx="3.8"
              ry="2"
              transform="rotate(14 34 18)"
              fill="#A9BBA2"
              stroke="#51443C"
              strokeWidth="1"
            />
            <circle cx="30" cy="11" r="2.6" fill="#A9BBA2" stroke="#51443C" strokeWidth="1" />
            <path
              d="M17 50H43L40 81C39.8 82.7 38.4 84 36.7 84H23.3C21.6 84 20.2 82.7 20 81L17 50Z"
              fill="#D59A7C"
              stroke="#51443C"
              strokeWidth="1.4"
            />
            <rect
              x="15"
              y="46"
              width="30"
              height="6"
              rx="1.5"
              fill="#E0AA8E"
              stroke="#51443C"
              strokeWidth="1.4"
            />
          </svg>
        </div>
      );

    case "pothos-frame":
      return (
        <div aria-hidden="true" className="flex items-end gap-3 shrink-0 pl-2 select-none">
          {/* Tiny framed botanical print */}
          <svg width="58" height="74" viewBox="0 0 58 74" fill="none">
            <rect
              x="3"
              y="4"
              width="52"
              height="68"
              rx="2"
              fill="#FDFBF6"
              stroke="#80634E"
              strokeWidth="2.5"
            />
            <rect
              x="9"
              y="10"
              width="40"
              height="56"
              fill="#F4EDE0"
              stroke="#C8B9A6"
              strokeWidth="1"
            />
            <circle cx="29" cy="30" r="10" fill="#AFC5D7" fillOpacity="0.65" />
            <path d="M29 52V28" stroke="#51443C" strokeWidth="1.2" strokeLinecap="round" />
            <path
              d="M29 41C24 39 21 35 21 31C25 32 28 35 29 41Z"
              fill="#A9BBA2"
              stroke="#51443C"
              strokeWidth="1"
            />
            <path
              d="M29 36C34 34 37 30 37 26C33 27 30 30 29 36Z"
              fill="#A9BBA2"
              stroke="#51443C"
              strokeWidth="1"
            />
          </svg>
        </div>
      );

    case "mug-books":
      return (
        <div aria-hidden="true" className="flex items-end gap-2.5 shrink-0 pl-2 select-none">
          {/* Horizontal pocket notebooks + ceramic mug */}
          <svg width="78" height="68" viewBox="0 0 78 68" fill="none">
            <rect
              x="4"
              y="54"
              width="46"
              height="12"
              rx="1.5"
              fill="#D9AEB9"
              stroke="#51443C"
              strokeWidth="1.2"
            />
            <line
              x1="10"
              y1="54"
              x2="10"
              y2="66"
              stroke="#51443C"
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            <rect
              x="8"
              y="42"
              width="40"
              height="12"
              rx="1.5"
              fill="#EBD99C"
              stroke="#51443C"
              strokeWidth="1.2"
            />
            <path
              d="M18 19C18 16 20 14 18 11"
              stroke="#80634E"
              strokeWidth="1.1"
              strokeLinecap="round"
              opacity="0.65"
            />
            <path
              d="M25 18C25 15 27 13 25 10"
              stroke="#80634E"
              strokeWidth="1.1"
              strokeLinecap="round"
              opacity="0.65"
            />
            <path
              d="M13 23H35V37C35 40 33 42 30 42H18C15 42 13 40 13 37V23Z"
              fill="#FDFBF6"
              stroke="#51443C"
              strokeWidth="1.3"
            />
            <path
              d="M35 26H39C41 26 42 27.5 42 29.5V32.5C42 34.5 41 36 39 36H35"
              stroke="#51443C"
              strokeWidth="1.3"
            />
            <circle cx="62" cy="54" r="12" fill="#A9BBA2" stroke="#51443C" strokeWidth="1.2" />
            <path
              d="M62 42V34M62 42L56 37M62 42L68 37"
              stroke="#51443C"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
          </svg>
        </div>
      );

    case "succulent-compass":
      return (
        <div aria-hidden="true" className="flex items-end gap-2 shrink-0 pl-2 select-none">
          <svg width="64" height="72" viewBox="0 0 64 72" fill="none">
            <rect
              x="6"
              y="57"
              width="52"
              height="13"
              rx="1.5"
              fill="#AFC5D7"
              stroke="#51443C"
              strokeWidth="1.2"
            />
            <circle cx="32" cy="36" r="15" fill="#FDFBF6" stroke="#9E7C47" strokeWidth="1.6" />
            <circle cx="32" cy="36" r="11" stroke="#C8B9A6" strokeWidth="1" strokeDasharray="2 2" />
            <path
              d="M32 27L35 36L32 45L29 36L32 27Z"
              fill="#D9AEB9"
              stroke="#51443C"
              strokeWidth="1"
            />
            <circle cx="32" cy="18" r="2.5" stroke="#9E7C47" strokeWidth="1.4" />
          </svg>
        </div>
      );

    case "botanical-card":
      return (
        <div aria-hidden="true" className="flex items-end gap-2 shrink-0 pl-2 select-none">
          <svg width="62" height="76" viewBox="0 0 62 76" fill="none">
            <rect
              x="5"
              y="10"
              width="52"
              height="64"
              rx="2"
              fill="#FDFBF6"
              stroke="#51443C"
              strokeWidth="1.3"
            />
            <rect
              x="11"
              y="16"
              width="40"
              height="52"
              fill="#EFE8DA"
              stroke="#B7A3D0"
              strokeWidth="1"
            />
            <path
              d="M31 24L33.5 32.5L42 35L33.5 37.5L31 46L28.5 37.5L20 35L28.5 32.5L31 24Z"
              fill="#B7A3D0"
              stroke="#51443C"
              strokeWidth="1"
            />
            <circle cx="21" cy="24" r="1.5" fill="#51443C" />
            <circle cx="41" cy="52" r="1.5" fill="#51443C" />
          </svg>
        </div>
      );

    case "lamp-notes":
      return (
        <div aria-hidden="true" className="flex items-end gap-2 shrink-0 pl-2 select-none">
          <svg width="68" height="84" viewBox="0 0 68 84" fill="none">
            <path d="M16 82H42" stroke="#51443C" strokeWidth="2" strokeLinecap="round" />
            <path
              d="M29 82V42C29 31 37 22 47 22"
              stroke="#9E7C47"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M40 24L57 18L61 32L37 36L40 24Z"
              fill="#EBD99C"
              stroke="#51443C"
              strokeWidth="1.3"
            />
            <ellipse
              cx="29"
              cy="80"
              rx="11"
              ry="3"
              fill="#9E7C47"
              stroke="#51443C"
              strokeWidth="1.2"
            />
          </svg>
        </div>
      );

    case "spatial-prism":
      return (
        <div aria-hidden="true" className="flex items-end gap-2 shrink-0 pl-2 select-none">
          <svg width="64" height="80" viewBox="0 0 64 80" fill="none">
            <ellipse
              cx="32"
              cy="76"
              rx="14"
              ry="3.5"
              fill="#80634E"
              stroke="#51443C"
              strokeWidth="1.2"
            />
            <line x1="32" y1="60" x2="32" y2="75" stroke="#9E7C47" strokeWidth="1.8" />
            <polygon
              points="32,12 52,36 32,60 12,36"
              fill="#AFC5D7"
              fillOpacity="0.55"
              stroke="#51443C"
              strokeWidth="1.3"
            />
            <polygon points="32,12 52,36 32,39" fill="#FDFBF6" fillOpacity="0.45" />
            <line x1="32" y1="12" x2="32" y2="60" stroke="#51443C" strokeWidth="1" />
            <line
              x1="12"
              y1="36"
              x2="52"
              y2="36"
              stroke="#51443C"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
          </svg>
        </div>
      );

    case "swatch-fan":
      return (
        <div aria-hidden="true" className="flex items-end gap-2 shrink-0 pl-2 select-none">
          <svg width="66" height="76" viewBox="0 0 66 76" fill="none">
            <rect
              x="24"
              y="18"
              width="16"
              height="54"
              rx="2"
              transform="rotate(-18 24 18)"
              fill="#D9AEB9"
              stroke="#51443C"
              strokeWidth="1.2"
            />
            <rect
              x="26"
              y="15"
              width="16"
              height="54"
              rx="2"
              transform="rotate(-5 26 15)"
              fill="#EBD99C"
              stroke="#51443C"
              strokeWidth="1.2"
            />
            <rect
              x="28"
              y="16"
              width="16"
              height="54"
              rx="2"
              transform="rotate(10 28 16)"
              fill="#B7A3D0"
              stroke="#51443C"
              strokeWidth="1.2"
            />
            <circle cx="33" cy="64" r="3" fill="#FDFBF6" stroke="#51443C" strokeWidth="1.2" />
          </svg>
        </div>
      );

    case "handheld-sketch":
      return (
        <div aria-hidden="true" className="flex items-end gap-2 shrink-0 pl-2 select-none">
          <svg width="66" height="78" viewBox="0 0 66 78" fill="none">
            <rect
              x="12"
              y="20"
              width="34"
              height="56"
              rx="4"
              fill="#A9BBA2"
              stroke="#51443C"
              strokeWidth="1.3"
            />
            <rect
              x="17"
              y="26"
              width="24"
              height="38"
              rx="2"
              fill="#FDFBF6"
              stroke="#51443C"
              strokeWidth="1"
            />
            <line x1="21" y1="34" x2="37" y2="34" stroke="#80634E" strokeWidth="1.2" />
            <line x1="21" y1="40" x2="33" y2="40" stroke="#80634E" strokeWidth="1.2" />
            <circle cx="29" cy="70" r="2" fill="#51443C" />
            <path d="M51 76V38" stroke="#6E8467" strokeWidth="1.3" strokeLinecap="round" />
            <ellipse
              cx="55"
              cy="45"
              rx="4"
              ry="2.2"
              transform="rotate(-25 55 45)"
              fill="#A9BBA2"
              stroke="#51443C"
              strokeWidth="1"
            />
          </svg>
        </div>
      );

    case "arch-vase":
    default:
      return (
        <div aria-hidden="true" className="flex items-end gap-2 shrink-0 pl-2 select-none">
          <svg width="58" height="82" viewBox="0 0 58 82" fill="none">
            <path
              d="M29 42C25 29 20 18 16 10"
              stroke="#80634E"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <path
              d="M29 42C33 27 38 18 44 12"
              stroke="#80634E"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <circle cx="16" cy="10" r="3.5" fill="#D9AEB9" stroke="#51443C" strokeWidth="1" />
            <circle cx="23" cy="21" r="2.8" fill="#EBD99C" stroke="#51443C" strokeWidth="1" />
            <circle cx="44" cy="12" r="3.5" fill="#B7A3D0" stroke="#51443C" strokeWidth="1" />
            <path
              d="M22 42H36L40 68C40.5 74 36 80 29 80C22 80 17.5 74 18 68L22 42Z"
              fill="#FDFBF6"
              stroke="#51443C"
              strokeWidth="1.3"
            />
            <path d="M21 54H37" stroke="#D9AEB9" strokeWidth="2" />
          </svg>
        </div>
      );
  }
}

export function FooterBookplateVignette() {
  return (
    <svg
      width="112"
      height="58"
      viewBox="0 0 112 58"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      {/* Stacked books + open book vignette */}
      <rect
        x="6"
        y="42"
        width="44"
        height="10"
        rx="1.5"
        fill="#B7A3D0"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <rect
        x="10"
        y="32"
        width="38"
        height="10"
        rx="1.5"
        fill="#EBD99C"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M58 46C66 43 75 43 82 47C89 43 98 43 106 46V21C98 18 89 18 82 22C75 18 66 18 58 21V46Z"
        fill="#FDFBF6"
        className="dark:fill-[#2B231E]"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <line x1="82" y1="22" x2="82" y2="47" stroke="currentColor" strokeWidth="1" />
      <line
        x1="63"
        y1="27"
        x2="77"
        y2="27"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.45"
      />
      <line
        x1="63"
        y1="32"
        x2="75"
        y2="32"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.45"
      />
      <line
        x1="87"
        y1="27"
        x2="101"
        y2="27"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.45"
      />
      <line
        x1="87"
        y1="32"
        x2="99"
        y2="32"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.45"
      />
      <path
        d="M27 25L28.5 28L31.5 29.5L28.5 31L27 34L25.5 31L22.5 29.5L25.5 28L27 25Z"
        fill="#D9AEB9"
      />
    </svg>
  );
}
