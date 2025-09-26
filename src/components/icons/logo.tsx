import { cn } from "@/lib/utils";

const Logo = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("h-6 w-6", className)}
    {...props}
  >
    <title>MediPass Logo</title>
    <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H17.5A2.5 2.5 0 0 1 20 4.5v15a2.5 2.5 0 0 1-2.5 2.5H6.5A2.5 2.5 0 0 1 4 19.5v-15Z" />
    <path d="M9 12h6" />
    <path d="M12 9v6" />
  </svg>
);

export default Logo;
