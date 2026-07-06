// Fake sample data for local development / design purposes.
// Category and subcategory names are based on the real taxonomy of
// vdknaap.comperex.nl; product names, brands, prices and article numbers
// are fictional (the live site gates all product listings behind a B2B login).

export type VolumeUnit = 'ml' | 'cl' | 'L'
export type WeightUnit = 'g' | 'kg'
export type CountUnit = 'stuks'
export type Unit = VolumeUnit | WeightUnit | CountUnit

export type BottleMaterial = 'glas' | 'PET'

// A crate of bottles, e.g. "24×30cl krat"
export type Crate = {
  form: 'Krat'
  bottles: number
  material: BottleMaterial
  content: number
  unit: VolumeUnit
  deposit?: boolean
}

// Cans grouped in a tray, e.g. "24×33cl tray"
export type Tray = {
  form: 'Tray'
  cans: number
  content: number
  unit: VolumeUnit
}

// A tapped keg
export type Keg = {
  form: 'Fust'
  content: number
  unit: VolumeUnit
  deposit?: boolean
}

// A box holding a number of units (bottles, bags, pieces); content/unit
// describe the size of a single unit and are omitted when not meaningful
// (e.g. a box of 100 loose tea bags).
export type Box = {
  form: 'Doos'
  units: number
  content?: number
  unit?: Unit
}

export type BagInBox = {
  form: 'Bag-in-Box'
  content: number
  unit: VolumeUnit
}

// A single sealed container: bottle, bag, carton, jar, tub or jerrycan
export type Container = {
  form: 'Fles' | 'Zak' | 'Pak' | 'Pot' | 'Bak' | 'Jerrycan'
  content: number
  unit: Unit
}

// Non-consumable packaging with no meaningful content/volume (e.g. a parts kit)
export type SetPackaging = {
  form: 'Set'
}

export type Packaging = Crate | Tray | Keg | Box | BagInBox | Container | SetPackaging

// Short display label matching the site's "Krat · statiegeld excl." convention
export function packagingLabel(packaging: Packaging): string {
  switch (packaging.form) {
    case 'Krat':
    case 'Fust':
      return packaging.deposit ? `${packaging.form} · statiegeld excl.` : packaging.form
    default:
      return packaging.form
  }
}

// "Inhoud" spec value, e.g. "24 x 30 cl", "30 L", "6 x 75 cl"
export function contentLabel(packaging: Packaging): string {
  switch (packaging.form) {
    case 'Krat':
      return `${packaging.bottles} x ${packaging.content} ${packaging.unit}`
    case 'Tray':
      return `${packaging.cans} x ${packaging.content} ${packaging.unit}`
    case 'Fust':
    case 'Bag-in-Box':
      return `${packaging.content} ${packaging.unit}`
    case 'Doos':
      return packaging.content !== undefined && packaging.unit
        ? `${packaging.units} x ${packaging.content} ${packaging.unit}`
        : `${packaging.units} stuks`
    case 'Set':
      return '—'
    default:
      // Fles | Zak | Pak | Pot | Bak | Jerrycan
      return `${packaging.content} ${packaging.unit}`
  }
}

// "Minimale afname" spec value, derived from the packaging form
export function minimumOrderLabel(packaging: Packaging): string {
  switch (packaging.form) {
    case 'Krat':
      return '1 krat'
    case 'Tray':
      return '1 tray'
    case 'Fust':
      return '1 fust'
    case 'Doos':
      return '1 doos'
    default:
      return `1 ${packaging.form.toLowerCase()}`
  }
}

// "Bestellen per" unit pill label, e.g. "Krat (24 flesjes)", "Tray (24 blikjes)"
export function orderUnitLabel(packaging: Packaging): string {
  switch (packaging.form) {
    case 'Krat':
      return `Krat (${packaging.bottles} flesjes)`
    case 'Tray':
      return `Tray (${packaging.cans} blikjes)`
    case 'Doos':
      return `Doos (${packaging.units} stuks)`
    default:
      return packaging.form
  }
}

export interface Product {
  id: string
  name: string
  category: "Bier" | "Frisdrank" | "Wijn" | "Gedistilleerd" | "Koffie" | "Thee" | "Food" | "Non-food"
  subcategory: string
  brand: string
  packaging: Packaging[]
  articleNumber: string
  price: number // fake ex-btw groothandelsprijs
  alcoholPercentage?: string // e.g. '5,0%' — omitted for non-alcoholic categories
  shelfLife: string // "Houdbaarheid", e.g. '9 maanden' or 'Onbeperkt'
}

export interface Category {
  label: string
  slug: string
  subcategories: string[]
}

export const categories: Category[] = [
  {
    label: 'Bier',
    slug: 'bier',
    subcategories: [
      'Pilsener', 'Blond', 'Wit', 'Weizen', 'Ale/IPA', 'Dubbel', 'Tripel',
      'Quadrupel', 'Trappist', 'Abdij', 'Alcoholvrij/arm', 'Amber', 'Bokbier',
      'Fruitbier', 'Radler', 'Seizoensbier', 'Stout', 'Speciaal', 'Cider', 'Overig',
    ],
  },
  {
    label: 'Frisdrank',
    slug: 'frisdrank',
    subcategories: ['Cola', 'Sappen', 'Energy drinks', 'Mineraalwater', 'Siropen'],
  },
  {
    label: 'Wijn',
    slug: 'wijn',
    subcategories: [
      'Port/Sherry/Vermout', 'Mousserend', 'Rood', 'Wit', 'Rosé',
      'Dessertwijn', 'Alcoholvrij', 'Diverse',
    ],
  },
  {
    label: 'Gedistilleerd',
    slug: 'gedistilleerd',
    subcategories: [
      'Hard Seltzer', 'Hard Iced Tea', 'Jenever/Vieux', 'Bitters', 'Advocaat',
      'Cognac/Armagnac', 'Whisky/Bourbon', 'Gin', 'Rum/Cachaca', 'Vodka',
      'Likeur', 'Tequila/Mezcal', 'Calvados', 'Grappa/Eau de Vie',
    ],
  },
  {
    label: 'Koffie',
    slug: 'koffie',
    subcategories: ['Koffiebonen', 'Gemalen koffie', 'Cacao'],
  },
  {
    label: 'Thee',
    slug: 'thee',
    subcategories: ['Zwarte thee', 'Groene thee', 'Kruidenthee'],
  },
  {
    label: 'Food',
    slug: 'food',
    subcategories: ['Koek & snoep', 'Chips & snacks', 'Sauzen & soepen', 'Diepvries & friet', 'Brood', 'IJs'],
  },
  {
    label: 'Non-food',
    slug: 'non-food',
    subcategories: ['Glaswerk', 'Wegwerpartikelen', 'Papierwaren', 'Reiniging', 'Horeca-apparatuur', 'CO2 & gas'],
  },
]

export const products: Product[] = [
  // Bier
  { id: 'bier-01', name: 'Pilsner 24x30cl', category: 'Bier', subcategory: 'Pilsener', brand: 'Merk A', packaging: [{ form: 'Krat', bottles: 24, material: 'glas', content: 30, unit: 'cl', deposit: true }], articleNumber: '10234', price: 18.95, alcoholPercentage: '5,0%', shelfLife: '9 maanden' },
  { id: 'bier-02', name: 'Weizen 24x50cl', category: 'Bier', subcategory: 'Weizen', brand: 'Merk B', packaging: [{ form: 'Krat', bottles: 24, material: 'glas', content: 50, unit: 'cl' }], articleNumber: '10241', price: 24.5, alcoholPercentage: '5,2%', shelfLife: '6 maanden' },
  { id: 'bier-03', name: 'Speciaalbier IPA 24x33cl blik', category: 'Bier', subcategory: 'Ale/IPA', brand: 'Merk C', packaging: [{ form: 'Tray', cans: 24, content: 33, unit: 'cl' }], articleNumber: '10298', price: 27.95, alcoholPercentage: '6,5%', shelfLife: '6 maanden' },
  { id: 'bier-04', name: 'Alcoholvrij Pils 24x30cl', category: 'Bier', subcategory: 'Alcoholvrij/arm', brand: 'Merk A', packaging: [{ form: 'Krat', bottles: 24, material: 'glas', content: 30, unit: 'cl' }], articleNumber: '10310', price: 19.5, alcoholPercentage: '0,0%', shelfLife: '9 maanden' },
  { id: 'bier-05', name: 'Radler 24x33cl blik', category: 'Bier', subcategory: 'Radler', brand: 'Merk B', packaging: [{ form: 'Tray', cans: 24, content: 33, unit: 'cl' }], articleNumber: '10355', price: 20.25, alcoholPercentage: '2,0%', shelfLife: '6 maanden' },
  { id: 'bier-06', name: 'Bierfust Pilsener 30L', category: 'Bier', subcategory: 'Pilsener', brand: 'Merk A', packaging: [{ form: 'Fust', content: 30, unit: 'L', deposit: true }], articleNumber: '10402', price: 74.95, alcoholPercentage: '5,0%', shelfLife: '3 maanden' },
  { id: 'bier-07', name: 'Tripel 24x33cl', category: 'Bier', subcategory: 'Tripel', brand: 'Merk C', packaging: [{ form: 'Krat', bottles: 24, material: 'glas', content: 33, unit: 'cl' }], articleNumber: '10415', price: 32.5, alcoholPercentage: '8,5%', shelfLife: '12 maanden' },
  { id: 'bier-08', name: 'Bokbier 24x30cl', category: 'Bier', subcategory: 'Bokbier', brand: 'Merk B', packaging: [{ form: 'Krat', bottles: 24, material: 'glas', content: 30, unit: 'cl' }], articleNumber: '10440', price: 22.95, alcoholPercentage: '7,0%', shelfLife: '9 maanden' },
  { id: 'bier-09', name: 'Fruitbier Kriek 24x25cl', category: 'Bier', subcategory: 'Fruitbier', brand: 'Merk C', packaging: [{ form: 'Krat', bottles: 24, material: 'glas', content: 25, unit: 'cl' }], articleNumber: '10461', price: 29.5, alcoholPercentage: '3,5%', shelfLife: '9 maanden' },
  { id: 'bier-10', name: 'Stout 24x33cl blik', category: 'Bier', subcategory: 'Stout', brand: 'Merk A', packaging: [{ form: 'Tray', cans: 24, content: 33, unit: 'cl' }], articleNumber: '10478', price: 30.95, alcoholPercentage: '6,0%', shelfLife: '9 maanden' },
  { id: 'bier-11', name: 'Cider Fust 20L', category: 'Bier', subcategory: 'Cider', brand: 'Merk B', packaging: [{ form: 'Fust', content: 20, unit: 'L', deposit: true }], articleNumber: '10502', price: 58.0, alcoholPercentage: '4,5%', shelfLife: '3 maanden' },
  { id: 'bier-12', name: 'Trappist 24x33cl', category: 'Bier', subcategory: 'Trappist', brand: 'Merk C', packaging: [{ form: 'Krat', bottles: 24, material: 'glas', content: 33, unit: 'cl' }], articleNumber: '10519', price: 39.95, alcoholPercentage: '9,0%', shelfLife: '18 maanden' },

  // Frisdrank
  { id: 'fris-01', name: 'Cola 24x33cl blik', category: 'Frisdrank', subcategory: 'Cola', brand: 'Merk A', packaging: [{ form: 'Tray', cans: 24, content: 33, unit: 'cl' }], articleNumber: '20101', price: 15.5, shelfLife: '9 maanden' },
  { id: 'fris-02', name: 'Cola Zero 24x33cl blik', category: 'Frisdrank', subcategory: 'Cola', brand: 'Merk A', packaging: [{ form: 'Tray', cans: 24, content: 33, unit: 'cl' }], articleNumber: '20102', price: 15.5, shelfLife: '9 maanden' },
  { id: 'fris-03', name: 'Sinaasappelsap 6x1L', category: 'Frisdrank', subcategory: 'Sappen', brand: 'Merk B', packaging: [{ form: 'Doos', units: 6, content: 1, unit: 'L' }], articleNumber: '20140', price: 12.95, shelfLife: '12 maanden' },
  { id: 'fris-04', name: 'Appelsap 12x20cl pak', category: 'Frisdrank', subcategory: 'Sappen', brand: 'Merk B', packaging: [{ form: 'Doos', units: 12, content: 20, unit: 'cl' }], articleNumber: '20147', price: 9.5, shelfLife: '12 maanden' },
  { id: 'fris-05', name: 'Energy Drink 24x25cl blik', category: 'Frisdrank', subcategory: 'Energy drinks', brand: 'Merk C', packaging: [{ form: 'Tray', cans: 24, content: 25, unit: 'cl' }], articleNumber: '20188', price: 22.0, shelfLife: '12 maanden' },
  { id: 'fris-06', name: 'Mineraalwater Bruisend 24x50cl', category: 'Frisdrank', subcategory: 'Mineraalwater', brand: 'Merk A', packaging: [{ form: 'Tray', cans: 24, content: 50, unit: 'cl' }], articleNumber: '20210', price: 11.25, shelfLife: '24 maanden' },
  { id: 'fris-07', name: 'Mineraalwater Plat 6x1,5L', category: 'Frisdrank', subcategory: 'Mineraalwater', brand: 'Merk A', packaging: [{ form: 'Doos', units: 6, content: 1.5, unit: 'L' }], articleNumber: '20214', price: 6.75, shelfLife: '24 maanden' },
  { id: 'fris-08', name: 'Tonic 24x20cl blik', category: 'Frisdrank', subcategory: 'Cola', brand: 'Merk C', packaging: [{ form: 'Tray', cans: 24, content: 20, unit: 'cl' }], articleNumber: '20233', price: 16.95, shelfLife: '9 maanden' },
  { id: 'fris-09', name: 'Grenadine Siroop 1L', category: 'Frisdrank', subcategory: 'Siropen', brand: 'Merk B', packaging: [{ form: 'Fles', content: 1, unit: 'L' }], articleNumber: '20260', price: 4.5, shelfLife: '18 maanden' },

  // Wijn
  { id: 'wijn-01', name: 'Huiswijn Rood 6x75cl', category: 'Wijn', subcategory: 'Rood', brand: 'Merk A', packaging: [{ form: 'Doos', units: 6, content: 75, unit: 'cl' }, { form: 'Fles', content: 75, unit: 'cl'}], articleNumber: '30110', price: 28.5, alcoholPercentage: '13,0%', shelfLife: '24 maanden' },
  { id: 'wijn-02', name: 'Huiswijn Wit 6x75cl', category: 'Wijn', subcategory: 'Wit', brand: 'Merk A', packaging: [{ form: 'Doos', units: 6, content: 75, unit: 'cl' }], articleNumber: '30111', price: 28.5, alcoholPercentage: '12,0%', shelfLife: '18 maanden' },
  { id: 'wijn-03', name: 'Rosé Provence 6x75cl', category: 'Wijn', subcategory: 'Rosé', brand: 'Merk B', packaging: [{ form: 'Doos', units: 6, content: 75, unit: 'cl' }], articleNumber: '30145', price: 34.95, alcoholPercentage: '12,5%', shelfLife: '18 maanden' },
  { id: 'wijn-04', name: 'Prosecco 6x75cl', category: 'Wijn', subcategory: 'Mousserend', brand: 'Merk C', packaging: [{ form: 'Doos', units: 6, content: 75, unit: 'cl' }], articleNumber: '30180', price: 42.0, alcoholPercentage: '11,0%', shelfLife: '18 maanden' },
  { id: 'wijn-05', name: 'Cava Brut 6x75cl', category: 'Wijn', subcategory: 'Mousserend', brand: 'Merk C', packaging: [{ form: 'Doos', units: 6, content: 75, unit: 'cl' }], articleNumber: '30183', price: 38.5, alcoholPercentage: '11,5%', shelfLife: '24 maanden' },
  { id: 'wijn-06', name: 'Port Ruby 75cl', category: 'Wijn', subcategory: 'Port/Sherry/Vermout', brand: 'Merk B', packaging: [{ form: 'Fles', content: 75, unit: 'cl' }], articleNumber: '30205', price: 11.95, alcoholPercentage: '19,0%', shelfLife: '36 maanden' },
  { id: 'wijn-07', name: 'Wijn Bag-in-Box Rood 5L', category: 'Wijn', subcategory: 'Diverse', brand: 'Merk A', packaging: [{ form: 'Bag-in-Box', content: 5, unit: 'L' }], articleNumber: '30240', price: 32.0, alcoholPercentage: '13,0%', shelfLife: '12 maanden' },
  { id: 'wijn-08', name: 'Alcoholvrije Wijn Wit 6x75cl', category: 'Wijn', subcategory: 'Alcoholvrij', brand: 'Merk C', packaging: [{ form: 'Doos', units: 6, content: 75, unit: 'cl' }], articleNumber: '30260', price: 26.5, alcoholPercentage: '0,0%', shelfLife: '12 maanden' },

  // Gedistilleerd
  { id: 'gedist-01', name: 'Jonge Jenever 1L', category: 'Gedistilleerd', subcategory: 'Jenever/Vieux', brand: 'Merk A', packaging: [{ form: 'Fles', content: 1, unit: 'L' }], articleNumber: '40110', price: 13.95, alcoholPercentage: '35,0%', shelfLife: '60 maanden' },
  { id: 'gedist-02', name: 'London Dry Gin 70cl', category: 'Gedistilleerd', subcategory: 'Gin', brand: 'Merk B', packaging: [{ form: 'Fles', content: 70, unit: 'cl' }], articleNumber: '40145', price: 17.5, alcoholPercentage: '40,0%', shelfLife: '60 maanden' },
  { id: 'gedist-03', name: 'Vodka 1L', category: 'Gedistilleerd', subcategory: 'Vodka', brand: 'Merk C', packaging: [{ form: 'Fles', content: 1, unit: 'L' }], articleNumber: '40170', price: 15.95, alcoholPercentage: '37,5%', shelfLife: '60 maanden' },
  { id: 'gedist-04', name: 'Blended Whisky 70cl', category: 'Gedistilleerd', subcategory: 'Whisky/Bourbon', brand: 'Merk A', packaging: [{ form: 'Fles', content: 70, unit: 'cl' }], articleNumber: '40205', price: 19.95, alcoholPercentage: '40,0%', shelfLife: '60 maanden' },
  { id: 'gedist-05', name: 'Witte Rum 1L', category: 'Gedistilleerd', subcategory: 'Rum/Cachaca', brand: 'Merk B', packaging: [{ form: 'Fles', content: 1, unit: 'L' }], articleNumber: '40230', price: 16.5, alcoholPercentage: '37,5%', shelfLife: '60 maanden' },
  { id: 'gedist-06', name: 'Cognac VS 70cl', category: 'Gedistilleerd', subcategory: 'Cognac/Armagnac', brand: 'Merk C', packaging: [{ form: 'Fles', content: 70, unit: 'cl' }], articleNumber: '40255', price: 29.95, alcoholPercentage: '40,0%', shelfLife: '60 maanden' },
  { id: 'gedist-07', name: 'Advocaat 1L', category: 'Gedistilleerd', subcategory: 'Advocaat', brand: 'Merk A', packaging: [{ form: 'Fles', content: 1, unit: 'L' }], articleNumber: '40280', price: 9.95, alcoholPercentage: '14,0%', shelfLife: '18 maanden' },
  { id: 'gedist-08', name: 'Hard Seltzer 12x33cl blik', category: 'Gedistilleerd', subcategory: 'Hard Seltzer', brand: 'Merk B', packaging: [{ form: 'Tray', cans: 12, content: 33, unit: 'cl' }], articleNumber: '40300', price: 21.5, alcoholPercentage: '4,5%', shelfLife: '9 maanden' },
  { id: 'gedist-09', name: 'Amaretto Likeur 70cl', category: 'Gedistilleerd', subcategory: 'Likeur', brand: 'Merk C', packaging: [{ form: 'Fles', content: 70, unit: 'cl' }], articleNumber: '40322', price: 14.5, alcoholPercentage: '24,0%', shelfLife: '24 maanden' },

  // Koffie
  { id: 'koffie-01', name: 'Filterkoffie 1kg', category: 'Koffie', subcategory: 'Gemalen koffie', brand: 'Merk A', packaging: [{ form: 'Zak', content: 1, unit: 'kg' }], articleNumber: '50110', price: 12.95, shelfLife: '12 maanden' },
  { id: 'koffie-02', name: 'Espressobonen 1kg', category: 'Koffie', subcategory: 'Koffiebonen', brand: 'Merk B', packaging: [{ form: 'Zak', content: 1, unit: 'kg' }], articleNumber: '50135', price: 15.5, shelfLife: '12 maanden' },
  { id: 'koffie-03', name: 'Instant Koffie 500g', category: 'Koffie', subcategory: 'Gemalen koffie', brand: 'Merk C', packaging: [{ form: 'Pot', content: 500, unit: 'g' }], articleNumber: '50160', price: 9.95, shelfLife: '24 maanden' },
  { id: 'koffie-04', name: 'Cacaopoeder 1kg', category: 'Koffie', subcategory: 'Cacao', brand: 'Merk A', packaging: [{ form: 'Zak', content: 1, unit: 'kg' }], articleNumber: '50185', price: 8.5, shelfLife: '18 maanden' },

  // Thee
  { id: 'thee-01', name: 'Zwarte Thee 100 zakjes', category: 'Thee', subcategory: 'Zwarte thee', brand: 'Merk B', packaging: [{ form: 'Doos', units: 100 }], articleNumber: '60110', price: 7.95, shelfLife: '24 maanden' },
  { id: 'thee-02', name: 'Groene Thee Sencha 100 zakjes', category: 'Thee', subcategory: 'Groene thee', brand: 'Merk C', packaging: [{ form: 'Doos', units: 100 }], articleNumber: '60135', price: 8.5, shelfLife: '18 maanden' },
  { id: 'thee-03', name: 'Kruidenthee Assortiment 100 zakjes', category: 'Thee', subcategory: 'Kruidenthee', brand: 'Merk A', packaging: [{ form: 'Doos', units: 100 }], articleNumber: '60160', price: 9.25, shelfLife: '18 maanden' },

  // Food
  { id: 'food-01', name: 'Chips Naturel 20x40g', category: 'Food', subcategory: 'Chips & snacks', brand: 'Merk A', packaging: [{ form: 'Doos', units: 20, content: 40, unit: 'g' }], articleNumber: '70110', price: 14.5, shelfLife: '6 maanden' },
  { id: 'food-02', name: 'Frites 2,5kg', category: 'Food', subcategory: 'Diepvries & friet', brand: 'Merk B', packaging: [{ form: 'Zak', content: 2.5, unit: 'kg' }], articleNumber: '70140', price: 6.95, shelfLife: '18 maanden' },
  { id: 'food-03', name: 'Currysaus 5L', category: 'Food', subcategory: 'Sauzen & soepen', brand: 'Merk C', packaging: [{ form: 'Jerrycan', content: 5, unit: 'L' }], articleNumber: '70170', price: 11.5, shelfLife: '12 maanden' },
  { id: 'food-04', name: 'Tomatensoep 1L', category: 'Food', subcategory: 'Sauzen & soepen', brand: 'Merk A', packaging: [{ form: 'Pak', content: 1, unit: 'L' }], articleNumber: '70190', price: 3.95, shelfLife: '12 maanden' },
  { id: 'food-05', name: 'Koekjes Assortiment 24x50g', category: 'Food', subcategory: 'Koek & snoep', brand: 'Merk B', packaging: [{ form: 'Doos', units: 24, content: 50, unit: 'g' }], articleNumber: '70215', price: 13.95, shelfLife: '9 maanden' },
  { id: 'food-06', name: 'Vanille-ijs 5L bak', category: 'Food', subcategory: 'IJs', brand: 'Merk C', packaging: [{ form: 'Bak', content: 5, unit: 'L' }], articleNumber: '70240', price: 18.5, shelfLife: '12 maanden' },
  { id: 'food-07', name: 'Broodjes Wit 12 stuks', category: 'Food', subcategory: 'Brood', brand: 'Merk A', packaging: [{ form: 'Zak', content: 12, unit: 'stuks' }], articleNumber: '70260', price: 4.5, shelfLife: '2 dagen' },

  // Non-food
  { id: 'nonfood-01', name: 'Bierglas 25cl, doos 12', category: 'Non-food', subcategory: 'Glaswerk', brand: 'Merk A', packaging: [{ form: 'Doos', units: 12, content: 25, unit: 'cl' }], articleNumber: '80110', price: 19.95, shelfLife: 'Onbeperkt' },
  { id: 'nonfood-02', name: 'Bierviltjes 1000st', category: 'Non-food', subcategory: 'Papierwaren', brand: 'Merk B', packaging: [{ form: 'Pak', content: 1000, unit: 'stuks' }], articleNumber: '80135', price: 3.5, shelfLife: 'Onbeperkt' },
  { id: 'nonfood-03', name: 'Wijnglas 35cl, doos 6', category: 'Non-food', subcategory: 'Glaswerk', brand: 'Merk C', packaging: [{ form: 'Doos', units: 6, content: 35, unit: 'cl' }], articleNumber: '80160', price: 14.5, shelfLife: 'Onbeperkt' },
  { id: 'nonfood-04', name: 'Rietjes Papier 250st', category: 'Non-food', subcategory: 'Wegwerpartikelen', brand: 'Merk A', packaging: [{ form: 'Pak', content: 250, unit: 'stuks' }], articleNumber: '80185', price: 6.95, shelfLife: 'Onbeperkt' },
  { id: 'nonfood-05', name: 'Servetten Wit 500st', category: 'Non-food', subcategory: 'Papierwaren', brand: 'Merk B', packaging: [{ form: 'Pak', content: 500, unit: 'stuks' }], articleNumber: '80210', price: 8.5, shelfLife: 'Onbeperkt' },
  { id: 'nonfood-06', name: 'Vaatwastabletten 100st', category: 'Non-food', subcategory: 'Reiniging', brand: 'Merk C', packaging: [{ form: 'Doos', units: 100 }], articleNumber: '80235', price: 22.95, shelfLife: '24 maanden' },
  { id: 'nonfood-07', name: 'CO2-patronen 16g, 24st', category: 'Non-food', subcategory: 'CO2 & gas', brand: 'Merk A', packaging: [{ form: 'Doos', units: 24, content: 16, unit: 'g' }], articleNumber: '80260', price: 17.5, shelfLife: 'Onbeperkt' },
  { id: 'nonfood-08', name: 'Tapkraan Onderdelenset', category: 'Non-food', subcategory: 'Horeca-apparatuur', brand: 'Merk B', packaging: [{ form: 'Set' }], articleNumber: '80285', price: 45.0, shelfLife: 'Onbeperkt' },
]
