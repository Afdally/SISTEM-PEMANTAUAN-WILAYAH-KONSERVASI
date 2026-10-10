import type { Severity } from "../../types";

const severityClass: Record<Severity, string> = {
  Kritis: "status-critical",
  Siaga: "status-alert",
  Waspada: "status-watch",
  Normal: "status-normal"
};

export default function StatusBadge({ severity }: { severity: Severity }) {
  return <span className={`status-badge ${severityClass[severity]}`}><i aria-hidden="true" />{severity}</span>;
}

