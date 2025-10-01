import { cn } from "@/lib/utils";

const B2B2CDiagram = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 800 400"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("font-sans", className)}
    {...props}
  >
    <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--foreground))" />
        </marker>
        <style>
            {`
                .label { font-size: 16px; font-weight: 600; fill: hsl(var(--foreground)); }
                .desc { font-size: 12px; fill: hsl(var(--muted-foreground)); }
                .box { stroke: hsl(var(--border)); stroke-width: 1; rx: 8; ry: 8; }
                .line { stroke: hsl(var(--foreground)); stroke-width: 1.5; marker-end: url(#arrow); }
                .dashed-line { stroke: hsl(var(--muted-foreground)); stroke-width: 1.5; stroke-dasharray: 5, 5; }
            `}
        </style>
    </defs>

    {/* MediPass Box */}
    <g transform="translate(325, 20)">
      <rect width="150" height="70" fill="hsl(var(--primary))" className="box" />
      <text x="75" y="35" textAnchor="middle" className="label" fill="hsl(var(--primary-foreground))">MediPass</text>
      <text x="75" y="55" textAnchor="middle" className="desc" fill="hsl(var(--primary-foreground))">(Our Company)</text>
    </g>

    {/* Hospital Box */}
    <g transform="translate(50, 160)">
      <rect width="200" height="100" fill="hsl(var(--card))" className="box" />
      <text x="100" y="35" textAnchor="middle" className="label">Rumah Sakit</text>
      <text x="100" y="55" textAnchor="middle" className="desc">(Business Customer)</text>
      <text x="100" y="80" textAnchor="middle" className="label" fill="hsl(var(--primary))" fontSize="12">Value: Efisiensi</text>
    </g>

    {/* Patient Box */}
    <g transform="translate(550, 160)">
      <rect width="200" height="100" fill="hsl(var(--card))" className="box" />
      <text x="100" y="35" textAnchor="middle" className="label">Pasien</text>
      <text x="100" y="55" textAnchor="middle" className="desc">(End Consumer)</text>
      <text x="100" y="80" textAnchor="middle" className="label" fill="hsl(var(--primary))" fontSize="12">Value: Kemudahan</text>
    </g>

    {/* Arrows and Text */}
    {/* B2B: MediPass -> Hospital */}
    <g>
        <path d="M 325 55 Q 275 80, 250 160" stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
        <text x="250" y="100" textAnchor="middle" className="label" fontSize="12">1. Jual Lisensi (B2B)</text>
    </g>
    <g>
        <path d="M 250 260 Q 275 300, 325 210" stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
        <text x="250" y="285" textAnchor="middle" className="label" fontSize="12">Membayar</text>
    </g>

    {/* B2C: Hospital -> Patient */}
    <g>
        <path d="M 250 210 H 550" className="dashed-line" />
        <text x="400" y="200" textAnchor="middle" className="label" fontSize="12" fill="hsl(var(--muted-foreground))">2. Rumah Sakit Mengajak Pasien</text>
    </g>
    
    {/* Value Exchange: Patient -> Hospital */}
     <g>
        <path d="M 550 210 Q 400 300, 250 210" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
        <text x="400" y="260" textAnchor="middle" className="label" fill="hsl(var(--primary))" fontSize="14">3. Pertukaran Data via QR Code</text>
    </g>

  </svg>
);

export default B2B2CDiagram;
