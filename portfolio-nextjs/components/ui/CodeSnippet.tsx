export default function CodeSnippet({ className }: { className?: string }) {
  return (
    <div
      className={className ?? "pointer-events-none absolute left-[65%] top-[13%] -translate-x-1/2 select-none w-[680px] max-w-[95vw] opacity-80"}
    >
      <svg width="100%" viewBox="0 0 680 500" role="img">
        <title>Automation workflow tree</title>
        <desc>Tree-shaped workflow animation with Tabler outline icons, animated flow dots on curved paths</desc>
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="#276979" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </marker>
          <path id="p1" d="M340,68 C340,120 180,120 180,172" fill="none"/>
          <path id="p2" d="M340,68 C340,120 500,120 500,172" fill="none"/>
          <path id="p3" d="M180,228 C180,270 100,270 100,312" fill="none"/>
          <path id="p4" d="M180,228 C180,270 260,270 260,312" fill="none"/>
          <path id="p5" d="M500,228 C500,270 420,270 420,312" fill="none"/>
          <path id="p6" d="M500,228 C500,270 580,270 580,312" fill="none"/>
          <path id="p7" d="M260,368 C260,400 220,400 220,440" fill="none"/>
          <path id="p8" d="M260,368 C260,400 300,400 300,440" fill="none"/>
        </defs>

        <use href="#p1" stroke="#276979" strokeWidth="1.5" strokeOpacity="0.25" markerEnd="url(#arr)"/>
        <use href="#p2" stroke="#276979" strokeWidth="1.5" strokeOpacity="0.25" markerEnd="url(#arr)"/>
        <use href="#p3" stroke="#276979" strokeWidth="1.5" strokeOpacity="0.25" markerEnd="url(#arr)"/>
        <use href="#p4" stroke="#276979" strokeWidth="1.5" strokeOpacity="0.25" markerEnd="url(#arr)"/>
        <use href="#p5" stroke="#276979" strokeWidth="1.5" strokeOpacity="0.25" markerEnd="url(#arr)"/>
        <use href="#p6" stroke="#276979" strokeWidth="1.5" strokeOpacity="0.25" markerEnd="url(#arr)"/>
        <use href="#p7" stroke="#276979" strokeWidth="1.5" strokeOpacity="0.25" markerEnd="url(#arr)"/>
        <use href="#p8" stroke="#276979" strokeWidth="1.5" strokeOpacity="0.25" markerEnd="url(#arr)"/>

        <circle className="flow-dot" r="5" fill="#276979" opacity="0.9" style={{ offsetPath: "path('M340,68 C340,120 180,120 180,172')", animationDuration: "2.2s", animationDelay: "0s" }}/>
        <circle className="flow-dot" r="5" fill="#276979" opacity="0.9" style={{ offsetPath: "path('M340,68 C340,120 500,120 500,172')", animationDuration: "2.2s", animationDelay: "0.4s" }}/>
        <circle className="flow-dot" r="4" fill="#276979" opacity="0.8" style={{ offsetPath: "path('M180,228 C180,270 100,270 100,312')", animationDuration: "2s", animationDelay: "0.9s" }}/>
        <circle className="flow-dot" r="4" fill="#276979" opacity="0.8" style={{ offsetPath: "path('M180,228 C180,270 260,270 260,312')", animationDuration: "2s", animationDelay: "1.3s" }}/>
        <circle className="flow-dot" r="4" fill="#276979" opacity="0.8" style={{ offsetPath: "path('M500,228 C500,270 420,270 420,312')", animationDuration: "2s", animationDelay: "0.7s" }}/>
        <circle className="flow-dot" r="4" fill="#276979" opacity="0.8" style={{ offsetPath: "path('M500,228 C500,270 580,270 580,312')", animationDuration: "2s", animationDelay: "1.1s" }}/>
        <circle className="flow-dot" r="3.5" fill="#276979" opacity="0.75" style={{ offsetPath: "path('M260,368 C260,400 220,400 220,440')", animationDuration: "1.8s", animationDelay: "1.8s" }}/>
        <circle className="flow-dot" r="3.5" fill="#276979" opacity="0.75" style={{ offsetPath: "path('M260,368 C260,400 300,400 300,440')", animationDuration: "1.8s", animationDelay: "2.1s" }}/>

        <g className="nd" style={{ animationDuration: ".5s", animationDelay: ".05s" }}>
          <circle className="node-ring" cx="340" cy="40" r="28" fill="#276979" fillOpacity="0.12" stroke="#276979" strokeWidth="1.5"/>
          <foreignObject x="318" y="18" width="44" height="44">
            <div style={{ width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <i className="ti ti-bolt" aria-hidden="true" style={{ fontSize: "22px", color: "#276979" }}></i>
            </div>
          </foreignObject>
        </g>

        <g className="nd" style={{ animationDuration: ".5s", animationDelay: ".3s" }}>
          <circle cx="180" cy="200" r="24" fill="#276979" fillOpacity="0.12" stroke="#276979" strokeWidth="1.5"/>
          <foreignObject x="158" y="178" width="44" height="44">
            <div style={{ width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <i className="ti ti-settings" aria-hidden="true" style={{ fontSize: "20px", color: "#276979" }}></i>
            </div>
          </foreignObject>
        </g>

        <g className="nd" style={{ animationDuration: ".5s", animationDelay: ".55s" }}>
          <circle cx="500" cy="200" r="24" fill="#276979" fillOpacity="0.12" stroke="#276979" strokeWidth="1.5"/>
          <foreignObject x="478" y="178" width="44" height="44">
            <div style={{ width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <i className="ti ti-cpu" aria-hidden="true" style={{ fontSize: "20px", color: "#276979" }}></i>
            </div>
          </foreignObject>
        </g>

        <g className="nd" style={{ animationDuration: ".45s", animationDelay: ".8s" }}>
          <circle cx="100" cy="340" r="20" fill="#276979" fillOpacity="0.15" stroke="#276979" strokeWidth="1.5"/>
          <foreignObject x="82" y="322" width="36" height="36">
            <div style={{ width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <i className="ti ti-file-description" aria-hidden="true" style={{ fontSize: "17px", color: "#276979" }}></i>
            </div>
          </foreignObject>
        </g>

        <g className="nd" style={{ animationDuration: ".45s", animationDelay: "1s" }}>
          <circle cx="260" cy="340" r="20" fill="#276979" fillOpacity="0.15" stroke="#276979" strokeWidth="1.5"/>
          <foreignObject x="242" y="322" width="36" height="36">
            <div style={{ width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <i className="ti ti-git-branch" aria-hidden="true" style={{ fontSize: "17px", color: "#276979" }}></i>
            </div>
          </foreignObject>
        </g>

        <g className="nd" style={{ animationDuration: ".45s", animationDelay: ".9s" }}>
          <circle cx="420" cy="340" r="20" fill="#276979" fillOpacity="0.15" stroke="#276979" strokeWidth="1.5"/>
          <foreignObject x="402" y="322" width="36" height="36">
            <div style={{ width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <i className="ti ti-chart-bar" aria-hidden="true" style={{ fontSize: "17px", color: "#276979" }}></i>
            </div>
          </foreignObject>
        </g>

        <g className="nd" style={{ animationDuration: ".45s", animationDelay: "1.1s" }}>
          <circle cx="580" cy="340" r="20" fill="#276979" fillOpacity="0.12" stroke="#276979" strokeWidth="1.5"/>
          <foreignObject x="562" y="322" width="36" height="36">
            <div style={{ width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <i className="ti ti-send" aria-hidden="true" style={{ fontSize: "17px", color: "#276979" }}></i>
            </div>
          </foreignObject>
        </g>

        <g className="nd" style={{ animationDuration: ".4s", animationDelay: "1.4s" }}>
          <circle cx="220" cy="460" r="18" fill="#276979" fillOpacity="0.18" stroke="#276979" strokeWidth={2}/>
          <foreignObject x="204" y="444" width="32" height="32">
            <div style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <i className="ti ti-circle-check" aria-hidden="true" style={{ fontSize: "15px", color: "#276979" }}></i>
            </div>
          </foreignObject>
        </g>

        <g className="nd" style={{ animationDuration: ".4s", animationDelay: "1.6s" }}>
          <circle cx="300" cy="460" r="18" fill="#276979" fillOpacity="0.18" stroke="#276979" strokeWidth={2}/>
          <foreignObject x="284" y="444" width="32" height="32">
            <div style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <i className="ti ti-player-pause" aria-hidden="true" style={{ fontSize: "15px", color: "#276979" }}></i>
            </div>
          </foreignObject>
        </g>
      </svg>
    </div>
  );
}
