import { Link } from "react-router-dom";

export function UtilityBar() {
  return (
    <div className="flex items-center justify-center sm:justify-between border-b border-[#e0e4de] bg-[#f6f7f5] px-5 py-2 text-[12.5px] text-[#4a534c] sm:px-10">
      <span>Alleen voor horeca &amp; retail zakelijk</span>
      <div className="hidden items-center gap-6 sm:flex">
        <span>Bel: <a href={`tel:010 434 2097`} className="font-semibold text-[#123f30] no-underline">010 434 2097</a></span>
        <span>Email: <a href={`mailto:info@knaaphoreca.nl`} className="font-semibold text-[#123f30] no-underline">info@knaaphoreca.nl</a></span>
        <Link to="/contact" className="text-[#4a534c] no-underline">Contact</Link>
      </div>
    </div>
  )
}
