import { LogoMark } from "../brand/logo";

/*
 * Branded curtain shown once per browser session. A tiny inline script marks
 * <html data-intro> before first paint (so there is no flash), and the curtain
 * animates away purely in CSS — it can never get stuck, even without JS.
 * Reduced-motion users and repeat visits skip it entirely.
 */

export const introScript = `try{var k="mmf:intro";if(!sessionStorage.getItem(k)&&!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.dataset.intro="1";sessionStorage.setItem(k,"1")}}catch(e){}`;

export function IntroLoader() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] hidden items-center justify-center bg-night [html[data-intro]_&]:flex [html[data-intro]_&]:animate-[intro-out_0.9s_cubic-bezier(0.76,0,0.24,1)_1.5s_forwards]"
    >
      <div className="flex flex-col items-center gap-5 animate-[intro-in_0.8s_cubic-bezier(0.22,1,0.36,1)_both]">
        <LogoMark className="size-16 text-gold-bright" />
        <span className="font-display text-3xl tracking-[0.12em] text-white">MetaMax Fashions</span>
        <span className="h-px w-40 origin-left animate-[intro-line_1.2s_cubic-bezier(0.65,0,0.35,1)_0.2s_both] bg-gold-bright" />
      </div>
    </div>
  );
}
