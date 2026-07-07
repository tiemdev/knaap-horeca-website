import { PageLayout } from '../components/PageLayout'
import { FormField, fieldInputClass } from '../components/FormField'

type Location = {
  name: string
  addressLines: string[]
  tel: string
  telHref: string
  email: string
}

const locations: Location[] = [
  {
    name: 'Knaap Horeca Vlaardingen',
    addressLines: ['4e Industriestraat 45', '3133 EK Vlaardingen'],
    tel: '010 - 434 20 97',
    telHref: '+31104342097',
    email: 'info@knaaphoreca.nl',
  },
  {
    name: 'Knaap Horeca Zeeland',
    addressLines: ['Handelsweg 50', '4387 PC Vlissingen'],
    tel: '0118 - 855 163',
    telHref: '+31118855163',
    email: 'stefan@knaaphoreca.nl',
  },
]

export function ContactPage() {
  return (
    <PageLayout
      headerProps={{ showSearch: false }}
      breadcrumbs={[{ url: '/', title: 'Home' }, { url: '/contact', title: 'Contact' }]}
    >
        <div className="px-5 py-10 sm:px-10 sm:py-14">
          <div className="mx-auto flex max-w-[760px] flex-col gap-10">
            <div>
              <h1 className="m-0 text-2xl font-bold text-[#123f30] sm:text-[28px]">Neem contact met ons op</h1>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[#68715e]">
                Knaap Horeca heeft twee vestigingen - Vlaardingen en Zeeland - elk met een eigen aanspreekpunt.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {locations.map(loc => (
                <div key={loc.name} className="flex flex-col gap-3 rounded-md bg-[#f6f7f5] p-5 sm:p-6">
                  <h2 className="m-0 text-base font-bold text-[#123f30]">{loc.name}</h2>
                  <div className="flex flex-col text-[13.5px] leading-relaxed text-[#3a423b]">
                    {loc.addressLines.map(line => (
                      <span key={line}>{line}</span>
                    ))}
                  </div>
                  <div className="flex flex-col gap-1 text-[13.5px]">
                    <a href={`tel:${loc.telHref}`} className="font-semibold text-[#123f30] no-underline">{loc.tel}</a>
                    <a href={`mailto:${loc.email}`} className="font-semibold text-[#123f30] no-underline">{loc.email}</a>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.name + ' ' + loc.addressLines.join(', '))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] font-bold text-[#c9a34a] no-underline"
                  >
                    Bekijk op Google Maps →
                  </a>
                </div>
              ))}
            </div>

            <section className="flex flex-col gap-4 border-t border-[#ececec] pt-8">
              <div>
                <h2 className="m-0 text-lg font-bold text-[#123f30] sm:text-xl">Stuur ons een bericht</h2>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#68715e]">
                  Liever direct een vraag stellen? Vul het formulier in en wij nemen zo snel mogelijk contact met u op.
                </p>
              </div>

              <form className="flex flex-col gap-5">
                <FormField label="Naam" required>
                  <input type="text" required className={fieldInputClass} />
                </FormField>
                <FormField label="E-mailadres" required>
                  <input type="email" required className={fieldInputClass} />
                </FormField>
                <FormField label="Verzoek" required>
                  <textarea required rows={5} className={`${fieldInputClass} resize-y`} />
                </FormField>

                <button
                  type="submit"
                  className="flex min-h-11 items-center justify-center rounded bg-[#123f30] text-sm font-semibold text-white sm:w-auto sm:self-start sm:px-6.5"
                >
                  Versturen
                </button>
              </form>
            </section>
          </div>
        </div>
    </PageLayout>
  )
}
