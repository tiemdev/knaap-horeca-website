import { useState, type ChangeEvent } from "react"
import { Link, useLocation } from "react-router-dom"
import { Fragment } from "react/jsx-runtime"
import { contentLabel, minimumOrderLabel, orderUnitLabel, packagingLabel, type Product } from "../data/products"
import { useAuthRedirectState } from "../hooks/useAuthRedirect"
import { useAuth } from "../hooks/useAuth"
import { PlaceholderImage } from "./PlaceholderImage"

type ProductDetailState = {
    quantity: number
    packagingIndex: number
}

const initialState: ProductDetailState = { quantity: 1, packagingIndex: 0 }

export function ProductDetail({ product }: { product: Product }) {
    const location = useLocation()
    const restoredState = location.state as ProductDetailState | null
    const [state, setState] = useState(restoredState ?? initialState)
    const authRedirectState = useAuthRedirectState(state)
    const { isLoggedIn } = useAuth()

    const selectedPackaging = product.packaging[state.packagingIndex]

    function decrement() {
        setState(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))
    }

    function increment() {
        setState(prev => ({ ...prev, quantity: prev.quantity + 1 }))
    }

    function handleQuantityChange(e: ChangeEvent<HTMLInputElement>) {
        const value = Math.floor(Number(e.target.value))
        setState(prev => ({ ...prev, quantity: Number.isFinite(value) ? Math.max(1, value) : 1 }))
    }

    function handlePackagingChange(e: ChangeEvent<HTMLSelectElement>) {
        setState(prev => ({ ...prev, packagingIndex: Number(e.target.value) }))
    }

    const specs = [
        { label: 'Inhoud', value: contentLabel(selectedPackaging) },
        { label: 'Verpakking', value: packagingLabel(selectedPackaging) },
        ...(product.alcoholPercentage ? [{ label: 'Alcoholpercentage', value: product.alcoholPercentage }] : []),
        { label: 'Houdbaarheid', value: product.shelfLife },
        { label: 'Minimale afname', value: minimumOrderLabel(selectedPackaging) },
    ]

    return (
        <div>
            {/* Product detail */}
            <div className="flex flex-col gap-8 px-5 py-7 sm:px-10 sm:pb-12 lg:flex-row lg:gap-12">
                {/* Gallery */}
                <div className="flex flex-col gap-3.5 lg:w-[420px] lg:shrink-0">
                    <PlaceholderImage caption="productfoto — hoofdafbeelding" className="h-[260px] rounded-md sm:h-[380px]" />
                    <div className="flex gap-2.5 overflow-x-auto">
                        {[true, false, false].map((active, i) => (
                            <div
                                key={i}
                                className={`h-[78px] w-[78px] shrink-0 cursor-pointer rounded ${active ? 'border-2 border-[#123f30]' : 'border border-[#ececec]'}`}
                                style={{ background: 'repeating-linear-gradient(45deg,#e4e8e2,#e4e8e2 8px,#d8ded4 8px,#d8ded4 16px)' }}
                            />
                        ))}
                    </div>
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col gap-4.5">
                    <div>
                        <span className="text-[13px] font-bold uppercase tracking-[.03em] text-[#68715e]">
                            {product.category} · {product.subcategory}
                        </span>
                        <h1 className="mb-0 mt-1.5 text-2xl font-bold text-[#123f30] sm:text-[28px]">{product.name}</h1>
                        <span className="text-[13px] text-[#8a938b]">Artikelnummer {product.articleNumber} · {product.brand}</span>
                    </div>

                    {!isLoggedIn ? (
                        <div className="flex flex-col gap-3 rounded-md bg-[#f6f7f5] p-5.5">
                            <div className="flex items-baseline gap-2.5">
                                <span className="text-xl font-bold text-[#123f30] sm:text-[22px]">Log in voor uw prijs</span>
                            </div>
                            <p className="m-0 text-[13.5px] leading-relaxed text-[#5c665e]">
                                Groothandelsprijzen zijn zichtbaar na inloggen met uw zakelijk account. Nog geen account? Vraag er vandaag een aan.
                            </p>
                            <div className="mt-1 flex flex-col gap-3 sm:flex-row">
                                <Link to="/login" state={authRedirectState} className="flex min-h-11 items-center justify-center rounded bg-[#123f30] px-5.5 text-[14.5px] font-semibold text-white no-underline">Inloggen</Link>
                                <Link to="/register" state={authRedirectState} className="flex min-h-11 items-center justify-center rounded bg-[#c9a34a] px-5.5 text-[14.5px] font-bold text-[#123018] no-underline">Account aanvragen</Link>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3 rounded-md bg-[#f6f7f5] p-5.5">
                            <div className="flex items-baseline gap-2.5">
                                <span className="text-xl font-bold text-[#123f30] sm:text-[22px]">€ {product.price.toFixed(2)}</span>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-wrap items-center gap-3.5">
                        <span className="text-[13.5px] font-semibold text-[#20291f]">Bestellen per:</span>
                        <select
                            value={state.packagingIndex}
                            onChange={handlePackagingChange}
                            className="min-h-11 cursor-pointer rounded border border-[#d7dcd6] bg-white px-4 text-sm font-semibold text-[#3a423b] outline-none"
                        >
                            {product.packaging.map((packaging, i) => (
                                <option key={i} value={i}>
                                    {orderUnitLabel(packaging)}
                                </option>
                            ))}
                        </select>
                        <div className="flex min-h-11 items-center gap-2 rounded border border-[#d7dcd6] px-2.5 text-sm text-[#3a423b]">
                            <button
                                type="button"
                                onClick={decrement}
                                aria-label="Aantal verlagen"
                                className="flex h-7 w-7 items-center justify-center rounded font-semibold text-[#3a423b] hover:bg-[#f6f7f5]"
                            >
                                −
                            </button>
                            <input
                                type="number"
                                min={1}
                                value={state.quantity}
                                onChange={handleQuantityChange}
                                aria-label="Aantal"
                                className="w-12 border-0 bg-transparent text-center outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            />
                            <button
                                type="button"
                                onClick={increment}
                                aria-label="Aantal verhogen"
                                className="flex h-7 w-7 items-center justify-center rounded font-semibold text-[#3a423b] hover:bg-[#f6f7f5]"
                            >
                                +
                            </button>
                        </div>
                        {isLoggedIn ? (
                            <span className="flex min-h-11 w-full items-center justify-center rounded bg-[#123f30] px-5.5 text-[14.5px] font-semibold text-white sm:w-auto cursor-pointer">Toevoegen</span>
                        ) : (
                            <Link to="/login" state={authRedirectState} className="flex min-h-11 w-full items-center justify-center rounded bg-[#eef2ee] px-5.5 text-[14.5px] font-semibold text-[#8a938b] sm:w-auto">Toevoegen - log in</Link>
                        )}
                    </div>

                    <div className="flex flex-col gap-2.5 border-t border-[#ececec] pt-4.5">
                        <h4 className="m-0 text-sm font-bold text-[#123f30]">Specificaties</h4>
                        <div className="grid grid-cols-[160px_1fr] gap-y-2 text-[13.5px] text-[#3a423b]">
                            {specs.map(s => (
                                <Fragment key={s.label}>
                                    <span className="text-[#8a938b]">{s.label}</span>
                                    <span>{s.value}</span>
                                </Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
