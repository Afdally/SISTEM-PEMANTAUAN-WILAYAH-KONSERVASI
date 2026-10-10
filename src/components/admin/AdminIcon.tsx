export type AdminIconName = "dashboard" | "reports" | "area" | "category" | "logout" | "user" | "arrow";

export default function AdminIcon({ name }: { name: AdminIconName }) {
  const paths: Record<AdminIconName, React.ReactNode> = {
    dashboard: <><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></>,
    reports: <><path d="M6 3h9l3 3v15H6z" /><path d="M15 3v4h4M9 11h6M9 15h6" /></>,
    area: <><path d="m4 7 5-3 6 3 5-2v12l-5 3-6-3-5 2z" /><path d="M9 4v13M15 7v13" /></>,
    category: <><path d="M4 7h10M4 17h16M14 7h6" /><circle cx="11" cy="7" r="2" /><circle cx="9" cy="17" r="2" /></>,
    logout: <><path d="M10 5H5v14h5M14 8l4 4-4 4M8 12h10" /></>,
    user: <><circle cx="12" cy="8" r="3" /><path d="M5 21c.7-4.3 3-6.5 7-6.5s6.3 2.2 7 6.5" /></>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5" /></>
  };

  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

