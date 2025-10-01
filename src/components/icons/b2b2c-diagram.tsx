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
        <marker id="arrow-primary" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--primary))" />
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
    <g transform="translate(50, 200)">
      <rect width="200" height="100" fill="hsl(var(--card))" className="box" />
      <text x="100" y="35" textAnchor="middle" className="label">Rumah Sakit</text>
      <text x="100" y="55" textAnchor="middle" className="desc">(Business Customer)</text>
      <text x="100" y="80" textAnchor="middle" className="label" fill="hsl(var(--primary))" fontSize="12">Value: Efisiensi</text>
    </g>

    {/* Patient Box */}
    <g transform="translate(550, 200)">
      <rect width="200" height="100" fill="hsl(var(--card))" className="box" />
      <text x="100" y="35" textAnchor="middle" className="label">Pasien</text>
      <text x="100" y="55" textAnchor="middle" className="desc">(End Consumer)</text>
      <text x="100" y="80" textAnchor="middle" className="label" fill="hsl(var(--primary))" fontSize="12">Value: Kemudahan</text>
    </g>

    {/* Arrows and Text */}
    {/* 1. B2B: MediPass -> Hospital */}
    <g>
        <path d="M 360 90 Q 300 150, 200 190" stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
        <text x="270" y="130" textAnchor="middle" className="label" fontSize="14">1. Jual Lisensi (B2B)</text>
    </g>
    
    {/* Membayar: Hospital -> MediPass */}
     <g>
        <path d="M 250 195 Q 310 130, 390 100" stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
        <text x="320" y="145" textAnchor="middle" className="label" fontSize="14" transform="rotate(-15 320 145)">Membayar</text>
    </g>

    {/* 2. B2C: Hospital -> Patient */}
    <g>
        <path d="M 260 250 H 540" className="dashed-line" />
        <text x="400" y="240" textAnchor="middle" className="label" fontSize="14" fill="hsl(var(--muted-foreground))">2. Rumah Sakit Mengajak Pasien</text>
    </g>
    
    {/* 3. Value Exchange: Patient -> Hospital */}
     <g>
        <path d="M 540 260 Q 400 330, 260 260" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" markerEnd="url(#arrow-primary)" />
        <text x="400" y="310" textAnchor="middle" className="label" fill="hsl(var(--primary))" fontSize="14">3. Pertukaran Data via QR Code</text>
    </g>

  </svg>
);

export default B2B2CDiagram;
