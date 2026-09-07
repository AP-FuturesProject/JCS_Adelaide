"use client";

import Script from "next/script";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "behold-widget": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { "feed-id": string },
        HTMLElement
      >;
    }
  }
}

export default function InstagramFeed() {
  return (
    <section className="ig-section">
      <p className="ig-label">Follow Along</p>
      <behold-widget feed-id="pDvOivsL0ZBmC3OsayhL" />
      <Script
        id="behold-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(() => {
            if(window.__bhldScript)return;window.__bhldScript=true;
            const d=document,s=d.createElement("script");s.type="module";
            s.src="https://w.behold.so/widget.js";setTimeout(()=>{d.head.append(s);},0);
          })();`,
        }}
      />
    </section>
  );
}
