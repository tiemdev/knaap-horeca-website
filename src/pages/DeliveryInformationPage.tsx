import { UtilityBar } from '../components/UtilityBar'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Breadcrumb } from '../components/Breadcrumb'

type Region = { title: string; intro: string; places: string[] }

const regions: Region[] = [
  {
    title: 'Knaap Horeca - Vlaardingen',
    intro: "Vanuit de vestiging in Vlaardingen belevert Knaap Horeca o.a. de volgende plaatsen/regio's:",
    places: [
      'Vlaardingen & Schiedam',
      'in het Westland',
      'Hoek van Holland',
      'Den Haag & Delft',
      'Rotterdam',
      'Spijkenisse',
      'Hellevoetsluis',
      'in de Hoekse Waard',
      'in Voorne-Putten',
    ],
  },
  {
    title: 'Knaap Horeca - Zeeland',
    intro: "Vanuit de vestiging in Vlissingen belevert Knaap Zeeland o.a. de volgende plaatsen/regio's:",
    places: [
      'Middelburg & Vlissingen',
      'Goes',
      'Renesse & Zierikzee',
      'Walcheren',
      'Noord- & Zuid-Beveland',
      'Tholen & Sint Philipsland',
      'Schouwen-Duiveland',
      'langs de hele Zeeuwse Kust',
      'en ook Goeree-Overflakkee',
    ],
  },
]

export function DeliveryInformationPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <UtilityBar />
      <Header showSearch={false} />
      <Breadcrumb breadcrumbs={[{ url: '/', title: 'Home' }, { url: '/bezorging', title: 'Bezorging' }]} />

      <main className="flex-1">
      <div className="px-5 py-10 sm:px-10 sm:py-14">
        <div className="mx-auto flex max-w-[760px] flex-col gap-10">
          <h1 className="m-0 text-2xl font-bold text-[#123f30] sm:text-[28px]">Bezorging</h1>

          {regions.map(region => (
            <section key={region.title} className="flex flex-col gap-4 border-t border-[#ececec] pt-8 first:border-t-0 first:pt-0">
              <h2 className="m-0 text-lg font-bold text-[#123f30] sm:text-xl">{region.title}</h2>
              <p className="m-0 text-[13.5px] leading-relaxed text-[#3a423b]">{region.intro}</p>
              <ul className="m-0 grid grid-cols-1 gap-x-6 gap-y-1.5 pl-4 text-[13.5px] text-[#3a423b] sm:grid-cols-2">
                {region.places.map(place => (
                  <li key={place}>{place}</li>
                ))}
              </ul>
            </section>
          ))}

          <section className="flex flex-col gap-3 border-t border-[#ececec] pt-8 text-[13.5px] leading-relaxed text-[#3a423b]">
            <p className="m-0">
              In principe komen we 2 keer per week in de genoemde plaatsen, op vaste dagen, maar uitzonderingen hierop zijn uiteraard altijd mogelijk.
            </p>
            <p className="m-0">
              Samen met u, uw accountmanager en logistiek bepalen we wat voor u het beste bezorgmoment is. Op verzoek en waar mogelijk, leveren we op de dag van bestelling.
            </p>
          </section>

          <div className="flex flex-col gap-2 rounded-md bg-[#f6f7f5] p-5 sm:p-6">
            <span className="text-[13.5px] font-bold text-[#123f30]">Zelf afhalen</span>
            <span className="text-[13.5px] leading-relaxed text-[#5c665e]">
              U kunt uw bestelling ook afhalen in ons magazijn: 4e Industriestraat 45 te Vlaardingen of Handelsweg 50 te Vlissingen.
            </span>
          </div>
        </div>
      </div>

      </main>

      <Footer />
    </div>
  )
}
