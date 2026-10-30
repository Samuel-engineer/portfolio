// SVG fallback Earth, used when WebGL is unavailable.
export default function Earth() {
  return (
    <svg className="earth" viewBox="0 0 400 400" role="img" aria-label="A green Earth seen from orbit">
      <defs>
        <radialGradient id="ocean" cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#2f7fd1" /><stop offset=".6" stopColor="#14407c" /><stop offset="1" stopColor="#081a3d" />
        </radialGradient>
        <radialGradient id="shade" cx="30%" cy="28%" r="85%">
          <stop offset=".55" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".65" />
        </radialGradient>
        <radialGradient id="halo" cx="50%" cy="50%" r="50%">
          <stop offset=".82" stopColor="#6fb6ff" stopOpacity=".5" /><stop offset="1" stopColor="#6fb6ff" stopOpacity="0" />
        </radialGradient>
        <clipPath id="globe"><circle cx="200" cy="200" r="150" /></clipPath>
      </defs>
      <circle cx="200" cy="200" r="196" fill="url(#halo)" />
      <circle cx="200" cy="200" r="150" fill="url(#ocean)" />
      <g clipPath="url(#globe)">
        <g className="land">
          <g id="cont" fill="#4caf6a">
            <path d="M40 170c30-40 80-50 110-30 20 15 10 40-10 55-25 20-20 50-45 60-30 10-50-30-60-60z" />
            <path d="M170 240c25-15 55-5 60 25s-20 60-45 55-30-60-15-80z" fill="#3f9a5b" />
            <path d="M210 120c30-30 80-25 110 5 25 25 5 60-25 60-30 5-30 30-60 25s-50-60-25-90z" />
            <path d="M300 250c20-10 45 5 40 30s-30 30-45 15-5-35 5-45z" fill="#3f9a5b" />
          </g>
          <use href="#cont" x="400" />
        </g>
        <g className="clouds" fill="#fff" opacity=".55">
          <ellipse cx="90" cy="120" rx="50" ry="8" /><ellipse cx="260" cy="210" rx="60" ry="9" />
          <ellipse cx="150" cy="290" rx="45" ry="7" /><ellipse cx="320" cy="110" rx="35" ry="6" />
          <g transform="translate(400 0)"><ellipse cx="90" cy="120" rx="50" ry="8" /><ellipse cx="260" cy="210" rx="60" ry="9" /></g>
        </g>
      </g>
      <circle cx="200" cy="200" r="150" fill="url(#shade)" />
    </svg>
  )
}
