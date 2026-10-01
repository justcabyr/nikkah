const flecks = [
  [72, 70, 3.2, 18],
  [150, 48, 2.2, -12],
  [248, 78, 3.4, 30],
  [320, 110, 2.6, 8],
  [90, 150, 2.4, -20],
  [280, 168, 3.6, 14],
  [160, 200, 2, 40],
  [336, 230, 2.8, -8],
  [64, 250, 3, 22],
  [210, 270, 2.2, -16],
  [300, 310, 3.4, 10],
  [110, 330, 2.4, 28],
  [250, 360, 2.8, -24],
  [80, 390, 2.6, 6],
  [340, 160, 2.2, 36],
  [186, 120, 1.8, -30],
  [140, 430, 3, 12],
  [310, 400, 2.4, -18],
  [200, 470, 2.6, 20],
  [96, 490, 2, -10],
  [270, 500, 3.2, 16],
  [48, 200, 2.2, 8],
]

const DeckledCard = ({ children }) => (
  <div className="deckled-card">
    <svg
      className="deckled-card__paper"
      viewBox="0 0 400 560"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="torn-edge" x="-8%" y="-6%" width="116%" height="112%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.035 0.05"
            numOctaves="3"
            seed="6"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="16"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <filter id="paper-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="2"
            seed="2"
            result="grain"
          />
          <feColorMatrix
            in="grain"
            type="matrix"
            values="0 0 0 0 0.55  0 0 0 0 0.45  0 0 0 0 0.32  0 0 0 0.22 0"
            result="colored"
          />
          <feBlend in="SourceGraphic" in2="colored" mode="multiply" />
        </filter>
      </defs>
      <g filter="url(#torn-edge)">
        <rect
          x="24"
          y="22"
          width="352"
          height="516"
          fill="#f6f1e6"
          filter="url(#paper-grain)"
        />
        {flecks.map(([x, y, size, rotate]) => (
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width={size}
            height={size * 0.7}
            fill="#c4a15a"
            opacity="0.8"
            transform={`rotate(${rotate} ${x} ${y})`}
          />
        ))}
      </g>
    </svg>
    <div className="deckled-card__content">{children}</div>
  </div>
)

export default DeckledCard
