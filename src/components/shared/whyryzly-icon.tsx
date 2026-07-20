import React from "react";

interface RizlyProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  color?: string;
}

const WhyRizlyIcon = ({
  className,
  width = 230,
  height = 82,
  color = "#C2DE55",
}: RizlyProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 230 82"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0 27.5412C0 22.9303 2.80175 20.3132 7.84489 20.4379L37.8796 21.061V32.8999L14.457 32.4014V63.8058H0V27.4166V27.5412Z"
        fill={color}
      />
      <path
        d="M103.426 20.3135V32.4017L145.564 33.274L103.426 40.6266V53.7118L107.124 52.9641L149.262 43.6175V20.3135H103.426Z"
        fill={color}
      />
      <path
        d="M213.141 20.4375L201.15 51.2188L189.046 20.4375H172.348L193.753 61.313L186.356 82H201.038L208.434 61.313L229.84 20.4375H213.141Z"
        fill={color}
      />
      <path
        d="M85.7165 20.4375L73.725 51.2188L61.6215 20.4375H45.0352L66.3284 61.313L58.9318 82H73.725L81.1217 61.313L102.415 20.4375H85.7165Z"
        fill={color}
      />
      <path
        d="M179.748 51.8421V63.9303H152.066V0.249241L158.791 0H166.86V51.8421H179.748Z"
        fill={color}
      />
      <path d="M158.791 0L152.066 0.249241V0H158.791Z" fill={color} />
      <path
        d="M149.262 52.8389V63.9301H103.426V54.3343L107.124 53.5866L149.262 52.8389Z"
        fill={color}
      />
    </svg>
  );
};

export default WhyRizlyIcon;