// Stand-in for real product photography (none has been sourced yet). Used
// anywhere a product/category image would normally go.
export function PlaceholderImage({
  height,
  caption = 'productfoto',
  className = '',
}: {
  height?: number | string
  caption?: string
  className?: string
}) {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{
        height,
        background: 'repeating-linear-gradient(45deg,#e4e8e2,#e4e8e2 10px,#d8ded4 10px,#d8ded4 20px)',
      }}
    >
      <span className="px-4 text-center font-mono text-[11px] text-[#5c665e]">{caption}</span>
    </div>
  )
}
