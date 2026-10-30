/**
 * Floating invitation to the star map. Full label from `sm`; on a phone it
 * shrinks to a short visible "Decode" label so the hint stays discoverable
 * without covering the content, and it respects the iOS safe area.
 */
export default function Beacon({ onOpen }) {
  return (
    <button
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label="Incoming signal: tap to decode"
      className="beacon fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-40 flex max-w-[calc(100vw-2rem)] cursor-pointer items-center gap-2 rounded-full border border-amber/70 bg-[#190f02]/90 px-3.5 py-2.5 font-semibold text-amber shadow-[0_18px_40px_-20px] shadow-amber/50 backdrop-blur transition-colors hover:bg-[#241603] sm:gap-3 sm:px-4 sm:py-3"
    >
      <span className="dot h-3 w-3 flex-none rounded-full bg-amber" aria-hidden="true" />
      <span className="hidden text-sm sm:inline" aria-hidden="true">Incoming signal: tap to decode</span>
      <span className="text-sm sm:hidden" aria-hidden="true">Decode ✦</span>
    </button>
  )
}
