export default function CediIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <span className={className} aria-hidden>
        <span className="font-medium">₵</span>
    </span>
  );
}