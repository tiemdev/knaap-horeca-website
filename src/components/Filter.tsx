import { Link } from "react-router";
import type { Product } from "../data/products";

export type ActiveFilters = {
    subcategory: SingleFilter[];
    brand: SingleFilter[];
    packaging: SingleFilter[];
};

type SingleFilter = {
    name: string;
    value: boolean;
};


export function Filter({ 
    value,
    onChange,
    perPage,
    onPerPageChange
 }: { 
    value: ActiveFilters;
    onChange: (value: ActiveFilters) => void 
    perPage: number;
    onPerPageChange: (value: number) => void;
}) {
    // Toggle one filter within a given group, then report the whole new ActiveFilters up
    function handleToggle(group: keyof ActiveFilters, name: string, checked: boolean) {
        onChange({
            ...value,
            [group]: value[group].map(f =>
                f.name === name ? { ...f, value: checked } : f
            ),
        });
    }

    return (
        <div className="flex w-full flex-col gap-6.5">
            <FilterGroup
                title="Subcategorie"
                filters={value.subcategory}
                onToggle={(name, checked) => handleToggle('subcategory', name, checked)}
            />
            <FilterGroup
                title="Merk"
                filters={value.brand}
                onToggle={(name, checked) => handleToggle('brand', name, checked)}
            />
            <FilterGroup
                title="Verpakking"
                filters={value.packaging}
                onToggle={(name, checked) => handleToggle('packaging', name, checked)}
            />
            <div>
                <h4 style={{ margin: '0 0 12px', fontSize: '13.5px', color: '#123f30', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.03em' }}>
                    Per pagina
                </h4>
                <select
                    value={perPage}
                    onChange={(e) => onPerPageChange(Number(e.target.value))}
                    style={{ width: '100%', padding: '8px 10px', fontSize: '14px', border: '1px solid #d7dcd6', borderRadius: '4px', color: '#3a423b', accentColor: '#123f30' }}
                >
                    {[6, 12, 24, 48].map(n => (
                        <option key={n} value={n}>{n}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col gap-2 rounded-md bg-[#f6f7f5] p-4.5">
                <span className="text-[13.5px] font-bold text-[#123f30]">Prijzen op aanvraag</span>
                <span className="text-[12.5px] leading-relaxed text-[#5c665e]">
                    Log in met uw zakelijk account om groothandelsprijzen te bekijken.
                </span>
                <Link to="/register" className="text-[13px] font-bold text-[#c9a34a] no-underline">Account aanvragen →</Link>
            </div>
        </div>
    )
}

function FilterGroup({ title, filters, onToggle }: {
    title: string;
    filters: SingleFilter[];
    onToggle: (name: string, checked: boolean) => void;
}) {
    return (
        <div>
            <h4 className="mb-3 text-[13.5px] font-bold uppercase tracking-[.03em] text-[#123f30]">
                {title}
            </h4>
            <div className="flex flex-col gap-2.5 text-sm text-[#3a423b]">
                {filters.map((filter) => (
                    <label key={filter.name} className="flex min-h-7 cursor-pointer items-center gap-2">
                        <input
                            type="checkbox"
                            checked={filter.value}
                            onChange={(e) => onToggle(filter.name, e.target.checked)}
                            className="h-4 w-4 accent-[#123f30]"
                        />
                        {filter.name}
                    </label>
                ))}
            </div>
        </div>
    )
}

export function getActiveFilters(categoryProducts: Product[]): ActiveFilters {
    const subcategories = [...new Set(categoryProducts.map(c => c.subcategory))].map(subcategory => ({ name: subcategory, value: false }));
    const brands = [...new Set(categoryProducts.map(c => c.brand))].map(brand => ({ name: brand, value: false }));
    const packaging = [...new Set(categoryProducts.map(c => c.packaging[0].form))].map(packaging => ({ name: packaging, value: false }));

    return {
        subcategory: subcategories,
        brand: brands,
        packaging: packaging
    };
}

export function applyFilters(products: Product[], filters: ActiveFilters): Product[] {
    const checkedNames = (group: SingleFilter[]) =>
        group.filter(f => f.value).map(f => f.name);

    const subcats = checkedNames(filters.subcategory);
    const brands = checkedNames(filters.brand);
    const packagings = checkedNames(filters.packaging);

    return products.filter(p =>
        (subcats.length === 0 || subcats.includes(p.subcategory)) &&
        (brands.length === 0 || brands.includes(p.brand)) &&
        (packagings.length === 0 || packagings.includes(p.packaging[0].form))
    );
}

// Build ActiveFilters from URL params: start from all-false defaults,
// then flip to true any name listed in the corresponding query param.
export function getActiveFiltersFromParams(
    categoryProducts: Product[],
    params: URLSearchParams
): ActiveFilters {
    const base = getActiveFilters(categoryProducts);

    const applyGroup = (group: SingleFilter[], paramKey: keyof ActiveFilters) => {
        const checked = new Set((params.get(paramKey)?.split(',') ?? []).filter(Boolean));
        return group.map(f => ({ ...f, value: checked.has(f.name) }));
    };

    return {
        subcategory: applyGroup(base.subcategory, 'subcategory'),
        brand: applyGroup(base.brand, 'brand'),
        packaging: applyGroup(base.packaging, 'packaging'),
    };
}

// Turn ActiveFilters into a plain object of comma-joined checked names,
// omitting groups with nothing checked so the URL stays clean.
export function filtersToParams(filters: ActiveFilters): Record<string, string> {
    const out: Record<string, string> = {};
    (['subcategory', 'brand', 'packaging'] as const).forEach(key => {
        const checked = filters[key].filter(f => f.value).map(f => f.name);
        if (checked.length > 0) out[key] = checked.join(',');
    });
    return out;
}