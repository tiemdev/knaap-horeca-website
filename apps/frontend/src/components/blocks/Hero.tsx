import { Link } from "react-router-dom";
import type { AuthRedirectState } from "../../hooks/useAuthRedirect";

export function Hero({ authRedirectState }: { authRedirectState: AuthRedirectState }) {
    return (
      <div className="flex flex-col items-center bg-[#123f30] lg:flex-row">
        <div className="flex flex-col gap-4.5 px-5 py-10 sm:px-12 sm:py-16 lg:flex-1">
          <span className="text-[12.5px] font-bold uppercase tracking-[.08em] text-[#c9a34a]">
            Sinds 1881 · 140 jaar
          </span>
          <h1 className="m-0 max-w-[480px] text-[26px] font-bold leading-[1.18] text-white sm:text-[32px] lg:text-[42px]">
            Uw horecagroothandel voor dranken, food &amp; non-food
          </h1>
          <p className="m-0 max-w-[460px] text-base leading-relaxed text-[#cfe0d3]">
            Eén leverancier voor heel uw assortiment — scherpe groothandelsprijzen, vaste kwaliteit en levering door heel Nederland.
          </p>
          <div className="mt-2 flex flex-col gap-3.5 sm:flex-row">
            <Link
              to="/catalog"
              className="flex min-h-11 items-center justify-center rounded bg-[#c9a34a] px-6.5 text-[15px] font-bold text-[#123018] no-underline"
            >
              Bekijk assortiment
            </Link>
            <Link to="/register" state={authRedirectState} className="flex min-h-11 items-center justify-center rounded border-2 border-white px-6.5 text-[15px] font-semibold text-white no-underline">
              Vraag een account aan
            </Link>
          </div>
        </div>
        <div
          className="flex min-h-[220px] w-full items-center justify-center self-stretch lg:min-h-[380px] lg:flex-1"
          style={{ background: 'repeating-linear-gradient(45deg,#1c5340,#1c5340 14px,#164635 14px,#164635 28px)' }}
        >
          <span className="rounded-sm bg-[#123f30cc] px-3 py-1.5 font-mono text-[13px] text-[#cfe0d3]">
            sfeerfoto - magazijn
          </span>
        </div>
      </div>
    )
}