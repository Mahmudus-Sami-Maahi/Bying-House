/**
 * Re-mounts on every navigation; the CSS animation gives each page a soft
 * entrance without hiding server-rendered HTML before hydration.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-[page-in_0.7s_cubic-bezier(0.22,1,0.36,1)_backwards]">{children}</div>;
}
