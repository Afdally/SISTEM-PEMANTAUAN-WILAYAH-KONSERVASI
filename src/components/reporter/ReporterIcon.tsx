type ReporterIconName = "camera" | "history" | "upload" | "location" | "back" | "user" | "check";

export default function ReporterIcon({ name }: { name: ReporterIconName }) {
  const paths: Record<ReporterIconName, React.ReactNode> = {
    camera: <><path d="M4 7h3l1.3-2h7.4L17 7h3v12H4z" /><circle cx="12" cy="13" r="3.5" /></>,
    history: <><path d="M4 12a8 8 0 1 0 2.3-5.7L4 8.6" /><path d="M4 4v4.6h4.6M12 8v4l3 2" /></>,
    upload: <><path d="M12 16V4M8 8l4-4 4 4" /><path d="M5 14v5h14v-5" /></>,
    location: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.3" /></>,
    back: <><path d="m15 18-6-6 6-6" /></>,
    user: <><circle cx="12" cy="8" r="3" /><path d="M5.5 20c.8-4 3-6 6.5-6s5.7 2 6.5 6" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>
  };

  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

