type TProps = {
  iconColor: "#008E85" | "#C4C4C4";
};

export const LeavesIcon = ({ iconColor = "#C4C4C4" }: TProps) => (
  <svg fill="none" viewBox="-5 -5 35 35" xmlns="http://www.w3.org/2000/svg">
    <g
      filter="url(#a)"
      stroke={iconColor}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.829 17.08C2.586 10.01 8.243 4.354 18.849 5.06c.708 10.606-4.949 16.263-12.02 12.02ZM5 18.91l5.657-5.658" />
    </g>
    <defs>
      <filter
        id="a"
        x={-4}
        y={0}
        width={32}
        height={32}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_424807_13687" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_424807_13687" result="shape" />
      </filter>
    </defs>
  </svg>
);
