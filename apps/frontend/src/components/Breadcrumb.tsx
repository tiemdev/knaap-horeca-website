import { Link } from 'react-router-dom'

export type Breadcrumb = {
  url: string
  title: string
}

export function Breadcrumb({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) {
  return (
        <div className="px-5 pt-4 text-[13px] text-[#68715e] sm:px-10">
            {breadcrumbs.map((breadcrumb, index) => (
                <span key={breadcrumb.url + breadcrumb.title}>
                    {index > 0 && <span>&nbsp;/&nbsp;</span>}
                    {index < breadcrumbs.length - 1 ? (
                        <Link to={breadcrumb.url} className="text-[#68715e] no-underline">{breadcrumb.title}</Link>
                    ) : (
                        <span className="font-semibold text-[#123f30]">{breadcrumb.title}</span>
                    )}
                </span>
            ))}
        </div>
    )
}