"use client";
import { useEffect } from "react";

export default function FooterMeshAnimation() {
  useEffect(() => {
    if (!document.getElementById("tabler-icons-css")) {
      const link = document.createElement("link");
      link.id = "tabler-icons-css";
      link.rel = "stylesheet";
      link.href =
        "https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.19.0/dist/tabler-icons.min.css";
      document.head.appendChild(link);
    }
  }, []);

  return (
    <>
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .fma-dot { animation: fma-travel linear infinite; }
          .fma-nd  { animation: fma-pop cubic-bezier(.34,1.56,.64,1) both; }
          @keyframes fma-pop    { from{opacity:0;transform:scale(0)} to{opacity:1;transform:scale(1)} }
          @keyframes fma-travel {
            0%   { offset-distance:0%;   opacity:0 }
            10%  { opacity:1 }
            90%  { opacity:1 }
            100% { offset-distance:100%; opacity:0 }
          }
          @keyframes fma-pulse  { 0%,100%{r:5} 50%{r:7} }
          .fma-hub { animation: fma-pulse 3.5s ease-in-out infinite; transform-box:fill-box; transform-origin:center; }
        }
      `}</style>

      <svg
        width="100%"
        viewBox="0 0 680 260"
        role="img"
        aria-label="Animated network mesh for footer"
      >
        <title>Footer network mesh</title>
        <desc>Horizontal mesh of interconnected nodes with animated flow dots</desc>

        <defs>
          <path id="fma-e1"  d="M80,130  C130,80  180,80  230,130" fill="none"/>
          <path id="fma-e2"  d="M80,130  C130,180 180,180 230,130" fill="none"/>
          <path id="fma-e3"  d="M230,130 C280,80  330,80  380,130" fill="none"/>
          <path id="fma-e4"  d="M230,130 C280,180 330,180 380,130" fill="none"/>
          <path id="fma-e5"  d="M380,130 C430,80  480,80  530,130" fill="none"/>
          <path id="fma-e6"  d="M380,130 C430,180 480,180 530,130" fill="none"/>
          <path id="fma-e7"  d="M530,130 C565,80  600,80  630,130" fill="none"/>
          <path id="fma-e8"  d="M530,130 C565,180 600,180 630,130" fill="none"/>
          <path id="fma-e9"  d="M80,130  C155,50  305,50  380,130" fill="none"/>
          <path id="fma-e10" d="M230,130 C305,50  455,50  530,130" fill="none"/>
          <path id="fma-e11" d="M380,130 C455,210 530,210 630,130" fill="none"/>
          <path id="fma-e12" d="M80,130  C80,210  230,210 230,130" fill="none"/>
        </defs>

        {/* Edges — solid */}
        {["fma-e1","fma-e2","fma-e3","fma-e4","fma-e5","fma-e6","fma-e7","fma-e8"].map((id) => (
          <use key={id} href={`#${id}`} stroke="#2D798B" strokeWidth="1" strokeOpacity="0.35"/>
        ))}
        {/* Edges — dashed long-range */}
        {["fma-e9","fma-e10","fma-e11","fma-e12"].map((id) => (
          <use key={id} href={`#${id}`} stroke="#2D798B" strokeWidth="0.8" strokeOpacity="0.25" strokeDasharray="4 4"/>
        ))}

        {/* Flow dots */}
        {[
          { path:"M80,130 C130,80 180,80 230,130",   dur:"2s",   delay:"0s"   },
          { path:"M230,130 C280,80 330,80 380,130",  dur:"2s",   delay:"0.5s" },
          { path:"M380,130 C430,80 480,80 530,130",  dur:"2s",   delay:"1s"   },
          { path:"M530,130 C565,80 600,80 630,130",  dur:"1.6s", delay:"1.5s" },
          { path:"M80,130 C130,180 180,180 230,130", dur:"2.2s", delay:"0.3s" },
          { path:"M230,130 C280,180 330,180 380,130",dur:"2.2s", delay:"0.8s" },
          { path:"M380,130 C430,180 480,180 530,130",dur:"2.2s", delay:"1.3s" },
          { path:"M80,130 C155,50 305,50 380,130",   dur:"3s",   delay:"0.2s", r:3.5, op:0.7 },
          { path:"M230,130 C305,50 455,50 530,130",  dur:"3s",   delay:"1.1s", r:3.5, op:0.7 },
          { path:"M380,130 C455,210 530,210 630,130",dur:"2.8s", delay:"0.7s", r:3.5, op:0.7 },
          { path:"M80,130 C80,210 230,210 230,130",  dur:"2.8s", delay:"1.6s", r:3.5, op:0.7 },
        ].map(({ path, dur, delay, r = 4, op = 0.9 }, i) => (
          <circle
            key={i}
            className="fma-dot"
            r={r}
            fill="#2D798B"
            opacity={op}
            style={{
              offsetPath: `path('${path}')`,
              animationDuration: dur,
              animationDelay: delay,
            }}
          />
        ))}

        {/* Nodes */}
        {[
          { cx:80,  cy:130, r:14, delay:".1s",  icon:"ti-world",    fsize:16 },
          { cx:230, cy:130, r:20, delay:".35s", icon:"ti-code",     fsize:18 },
          { cx:380, cy:130, r:22, delay:".6s",  icon:"ti-cpu",      fsize:20, sw:2, fillOp:0.28 },
          { cx:530, cy:130, r:20, delay:".85s", icon:"ti-cloud",    fsize:18 },
          { cx:630, cy:130, r:16, delay:"1.1s", icon:"ti-database", fsize:15 },
        ].map(({ cx, cy, r, delay, icon, fsize, sw = 1.5, fillOp = 0.2 }) => (
          <g key={cx} className="fma-nd" style={{ animationDuration:".45s", animationDelay:delay }}>
            <circle
              cx={cx} cy={cy} r={r}
              fill="#2D798B"
              fillOpacity={fillOp}
              stroke="#2D798B"
              strokeWidth={sw}
              className={r >= 20 ? undefined : "fma-hub"}
            />
            <foreignObject x={cx - 22} y={cy - 22} width="44" height="44">
              <div
                style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center" }}
              >
                <i className={`ti ${icon}`} aria-hidden="true" style={{ fontSize:fsize, color:"#2D798B" }}/>
              </div>
            </foreignObject>
          </g>
        ))}
      </svg>
    </>
  );
}
