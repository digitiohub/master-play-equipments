// Hand-built 48px duotone icons: navy stroke + one accent fill. Decorative (aria-hidden).
const s = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const wrap = (children: React.ReactNode, className?: string) => <svg viewBox="0 0 48 48" className={className} aria-hidden {...s}>{children}</svg>;

export const icons = {
  quality: (c?: string) => wrap(<><circle cx="24" cy="20" r="11" fill="#A6D957" stroke="none" opacity=".85" /><circle cx="24" cy="20" r="11" /><path d="M19 20.5l3.5 3.5 7-7.5" /><path d="M17 30l-3 12 10-5 10 5-3-12" /></>, c),
  equipment: (c?: string) => wrap(<><path d="M8 42V10h6v6" /><path d="M14 16c10 0 14 8 18 18l8 8" fill="none" /><path d="M6 42h36" /><circle cx="36" cy="12" r="5" fill="#FF8738" stroke="none" /><path d="M14 8h10" /></>, c),
  child: (c?: string) => wrap(<><path d="M4 42V26a10 10 0 0 1 20 0v16z" fill="#FF8738" stroke="none" opacity=".9" /><path d="M4 42V26a10 10 0 0 1 20 0v16" /><circle cx="36" cy="14" r="7" /><path d="M28 42l6-14 6 14z" fill="#A6D957" stroke="none" opacity=".9" /><path d="M28 42l6-14 6 14z" /></>, c),
  years: (c?: string) => wrap(<><circle cx="24" cy="24" r="16" /><path d="M24 12v12l8 5" /><circle cx="24" cy="24" r="16" fill="#A6D957" stroke="none" opacity=".3" /></>, c),
  range: (c?: string) => wrap(<><rect x="6" y="6" width="15" height="15" rx="2" /><circle cx="35" cy="13.5" r="7.5" fill="#FF8738" stroke="none" opacity=".9" /><path d="M6 42V30a7.5 7.5 0 0 1 15 0v12z" /><path d="M27 42l8-15 8 15z" /></>, c),
  durable: (c?: string) => wrap(<><path d="M24 5l15 6v11c0 10-6.5 17-15 21C15.5 39 9 32 9 22V11z" fill="#A6D957" stroke="none" opacity=".5" /><path d="M24 5l15 6v11c0 10-6.5 17-15 21C15.5 39 9 32 9 22V11z" /><path d="M17.5 23l5 5 8-9" /></>, c),
  school: (c?: string) => wrap(<><path d="M4 20L24 8l20 12" /><path d="M9 20v20h30V20" /><path d="M20 40V28h8v12" fill="#FF8738" stroke="none" opacity=".9" /><path d="M20 40V28h8v12" /></>, c),
  states: (c?: string) => wrap(<><path d="M24 43s14-12.5 14-23a14 14 0 0 0-28 0c0 10.5 14 23 14 23z" /><circle cx="24" cy="20" r="5.5" fill="#FF8738" stroke="none" /></>, c),
  learn: (c?: string) => wrap(<><path d="M24 6l4 11 11 1-8.5 7.5L33 36l-9-6-9 6 2.5-10.5L9 18l11-1z" fill="#A6D957" stroke="none" opacity=".75" /><path d="M24 6l4 11 11 1-8.5 7.5L33 36l-9-6-9 6 2.5-10.5L9 18l11-1z" /></>, c),
};
