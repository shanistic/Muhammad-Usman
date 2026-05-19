"use client";

import { useEffect, useRef } from "react";

const CAL_NAMESPACE = "free-operations-audit";
const CAL_LINK = "muhammad-usman-ops/free-operations-audit";
const EMBED_ELEMENT_ID = "my-cal-inline-free-operations-audit";

type CalApi = {
  (command: string, ...args: unknown[]): void;
  ns: Record<string, CalApi>;
  loaded?: boolean;
  q?: unknown[][];
};

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

function bootstrapCalLoader() {
  const w = window as Window & { Cal?: CalApi };
  const embedSrc = "https://app.cal.com/embed/embed.js";
  const initCommand = "init";

  const enqueue = (target: CalApi, args: unknown[]) => {
    target.q = target.q || [];
    target.q.push(args);
  };

  w.Cal =
    w.Cal ||
    (((...args: unknown[]) => {
      const cal = w.Cal!;
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        const script = document.createElement("script");
        script.src = embedSrc;
        document.head.appendChild(script);
        cal.loaded = true;
      }
      if (args[0] === initCommand) {
        const api = ((...apiArgs: unknown[]) => {
          enqueue(api, apiArgs);
        }) as CalApi;
        api.q = api.q || [];
        const namespace = args[1];
        if (typeof namespace === "string") {
          cal.ns[namespace] = cal.ns[namespace] || api;
          enqueue(cal.ns[namespace], args);
          enqueue(cal, ["initNamespace", namespace]);
        } else {
          enqueue(cal, args);
        }
        return;
      }
      enqueue(cal, args);
    }) as CalApi);
}

function initCalInlineEmbed() {
  bootstrapCalLoader();

  window.Cal!("init", CAL_NAMESPACE, { origin: "https://app.cal.com" });

  window.Cal!.ns[CAL_NAMESPACE]("inline", {
    elementOrSelector: `#${EMBED_ELEMENT_ID}`,
    config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
    calLink: CAL_LINK,
  });

  window.Cal!.ns[CAL_NAMESPACE]("ui", {
    hideEventTypeDetails: false,
    layout: "month_view",
  });
}

export default function CalInlineEmbed() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    initCalInlineEmbed();
  }, []);

  return (
    <div
      id={EMBED_ELEMENT_ID}
      className="cal-inline-embed w-full overflow-visible"
    />
  );
}
