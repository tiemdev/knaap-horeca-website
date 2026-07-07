import { PageLayout } from '../components/PageLayout'

type Block = { heading?: string; text: string }
type Section = { title: string; blocks: Block[] }

const sections: Section[] = [
  {
    title: 'Knaap Horeca... sinds 1881',
    blocks: [
      {
        text: 'In 1881 was de oprichter van ons bedrijf, de heer C.F. van der Knaap, uitbater van Café de Molm aan de Smalle Havenstraat in Vlaardingen. In 1928 nam hij Hotel-Restaurant-Café, "De Hollandsche Tuin" over. Een zeer goed lopende en goed bekend staand hotel, waar naast eten en slapen ook vergaderingen en zelfs veilingen gehouden werden.',
      },
      {
        text: 'Naast het hotel stond de stalhouderij en hier werd door de zoon van de oprichter, F.A. van der Knaap, een drankenhandel en limonadefabriek gestart. Deze drankenhandel groeide gestaag en verhuisde heel Vlaardingen door.',
      },
      {
        text: 'In 1963 nam de kleinzoon van de oprichter, weer een C.F. van der Knaap, de leiding van het bedrijf op zich. Zijn jongste zoon, Erik van der Knaap voert nu de directie vanuit een modern magazijn aan de rand van het centrum van Vlaardingen.',
      },
      {
        text: 'U bent van harte welkom om een keer een kijkje te komen nemen! Neem contact op voor een vrijblijvend gesprek en informeer naar de mogelijkheden via info@knaaphoreca.nl of 010 - 434 20 97.',
      },
    ],
  },
  {
    title: 'Knaap Wijnen... sinds 2010',
    blocks: [
      {
        text: 'Als wijnspecialist levert KnaapWijnen maatwerk aan horeca, slijterijen, instellingen en bedrijven. Van huiswijn van het vat tot exclusieve topwijnen, altijd per stuk te bestellen en dus geen of minder eigen voorraad nodig.',
      },
      {
        heading: 'Een goede keuze',
        text: 'De wijnkaart van een horecabedrijf is mede bepalend voor het karakter van de zaak. Een mooi glas wijn dat aansluit bij het gerecht verdient aandacht. KnaapWijnen begeleidt u in uw keuze. Met wijn-spijs advies, een originele huiswijn of juist een exclusieve wijn uit het hogere segment. Een passend aperitief, mooie wijn-spijs combinatie of receptiewijn maken de gelegenheid compleet.',
      },
      {
        heading: 'Kennis van zaken',
        text: 'KnaapWijnen helpt graag bij de begeleiding van uw personeel met (bij)scholing en proeverijen. Hoe wordt de juiste wijn, op een plezierige manier, aan uw gasten geserveerd? Waarom de keuze bij een bepaald gerecht? Ook voor ervaren, gediplomeerde werknemers blijft het wenselijk om de kennis op peil te houden. Technische kennis en achtergrondinformatie is direct bruikbaar in de praktijk en maakt het horecavak leuk en werkt motiverend. Uw gasten zullen de begeleiding aan tafel enorm waarderen.',
      },
      {
        heading: 'Prijs/kwaliteit',
        text: 'KnaapWijnen is onafhankelijk en werkt met meerdere importeurs. Dit geeft veel mogelijkheden voor de samenstelling van het assortiment maar zorgt ook voor strakke prijzen. Een commercieel succesvolle wijn of die ene bijzondere fles; ze zijn allen leverbaar. Door gebruik te maken van de logistiek van KnaapHoreca houden we de kosten laag.',
      },
      {
        heading: 'Business to Business',
        text: 'Voor de zakelijke markt heeft KnaapWijnen een uitgebreide brochure beschikbaar. Mooie originele geschenkverpakkingen die wij ook kunnen personaliseren. Kist naar eigen keuze, of moderne full colour foto opdruk van het voltallige personeel? Bedrijfslogo, of een geheel eigen ontwerp? Uit voorraad leverbaar of maatwerk voor ieder budget. Uw bestelling wordt op locatie afgeleverd. Vraagt u naar de mogelijkheden.',
      },
    ],
  },
  {
    title: 'Knaap Zeeland... sinds 2018',
    blocks: [
      {
        text: 'Vanuit de vestiging in Vlissingen is Stefan Hillebrand verantwoordelijk voor de levering van een uitgebreid assortiment (speciaal) bier, frisdranken, wijn en gedistilleerd. Neem contact op voor een vrijblijvend gesprek en informeer naar de mogelijkheden via stefan@knaaphoreca.nl of 0118 - 855 163.',
      },
    ],
  },
]

export function AboutPage() {
  return (
    <PageLayout
      headerProps={{ showSearch: false }}
      breadcrumbs={[{ url: '/', title: 'Home' }, { url: '/over-ons', title: 'Over ons' }]}
    >
      <div className="px-5 py-10 sm:px-10 sm:py-14">
        <div className="mx-auto flex max-w-[760px] flex-col gap-10">
          <h1 className="m-0 text-2xl font-bold text-[#123f30] sm:text-[28px]">Over ons</h1>

          {sections.map(section => (
            <section key={section.title} className="flex flex-col gap-4 border-t border-[#ececec] pt-8 first:border-t-0 first:pt-0">
              <h2 className="m-0 text-lg font-bold text-[#123f30] sm:text-xl">{section.title}</h2>
              <div className="flex flex-col gap-4">
                {section.blocks.map((block, i) => (
                  <div key={i} className="flex flex-col gap-1.5">
                    {block.heading && (
                      <h3 className="m-0 text-sm font-bold uppercase tracking-[.03em] text-[#68715e]">{block.heading}</h3>
                    )}
                    <p className="m-0 text-[13.5px] leading-relaxed text-[#3a423b]">{block.text}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
