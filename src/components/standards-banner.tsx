export const standards = [
  { name: "OWASP ASVS 4.0", label: "AppSec Standard" },
  { name: "PTES Framework", label: "Penetration Testing Execution" },
  { name: "NIST SP 800-115", label: "Security Assessment" },
  { name: "MITRE ATT&CK", label: "Adversary Emulation" },
  { name: "OSSTMM 3.0", label: "Testing Methodology" },
  { name: "CERT-In Guidelines", label: "Cyber Security Framework" },
  { name: "ISO 27001 & SOC 2", label: "Audit Readiness" },
];

export function StandardsBanner() {
  return (
    <aside className="standards-banner" aria-label="Testing Methodologies and Standards">
      <div className="site-container">
        <div className="standards-inner">
          <span className="standards-label">BENCHMARKED AGAINST:</span>
          <ul className="standards-list">
            {standards.map((s) => (
              <li key={s.name} className="standard-tag">
                <span className="standard-name">{s.name}</span>
                <span className="standard-sub">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
