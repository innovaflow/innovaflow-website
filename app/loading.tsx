import GradientText from '@/components/ui/GradientText'

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        {/* Logo with pulse animation */}
        <div className="text-5xl font-bold animate-pulse">
          <GradientText>InnovaFlow</GradientText>
        </div>

        {/* Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-background-surface-secondary" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-accent animate-spin" />
        </div>

        {/* Optional loading text */}
        <p className="text-text-secondary text-sm animate-pulse">
          Caricamento...
        </p>
      </div>
    </div>
  )
}
