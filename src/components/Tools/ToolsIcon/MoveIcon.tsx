const MoveIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"

    >
      {/* Cross lines */}
      <line
        x1="12"
        y1="2"
        x2="12"
        y2="22"
      />
      <line
        x1="2"
        y1="12"
        x2="22"
        y2="12"
      />

      {/* Arrow heads */}
      {/* Top */}
      <polyline points="9 5 12 2 15 5" />

      {/* Right */}
      <polyline points="19 9 22 12 19 15" />

      {/* Bottom */}
      <polyline points="9 19 12 22 15 19" />

      {/* Left */}
      <polyline points="5 9 2 12 5 15" />
    </svg>
  );
};

export default MoveIcon;
