import pkg from 'number-to-words';
const { toWords } = pkg;

const REMOVED_WORDS = {
  room: '',
  rooms: '',
  bed: '',
  size: '',
  standard: '',
  'with a': '',
  with: '',
  and: '',
  guest: '',
  guestroom: '', 
  'non-smoking': '',
  'four seasons': '',
  'fairmont': '',
  'free': '',
  wifi: '',
  'internet access': '',
  'internet': '',
  'high speed': '',
  'camera': '', 
  'for': '',
  'adults only': '',
  'one bedroom': '', 
  'multiplebed': '',
  'only': '',
  'basic': '', 
  'up to': ' ',
  use:'',
  in: '',
  preferred: '',
  exclusive: '', 
  'open plan': '', 
  'ground floor': '',
  'hilton': '',
  'conrad': '',
  'view': '',
  'kitchen': '',
  'laundry': '',
  'sofa': '',
  'sofabed':''
}
const EXTREME_REMOVED_WORDS = {
  double: '',
  
}

const DIRECT_REPLACEMENTS: Record<string, string> = {

  // VIEWS
  sea: 'ocean',
  ocn: 'ocean',
  wtr: 'water',
  bch: 'beach',
  beds: 'bed',
  ctyrd : 'courtyard',
  cty: 'city',
  vw: 'view',
  views: 'view',
  frnt: 'front',
  'no view': 'noview',
  'beach front': 'beachfront',
  'ocean front': 'oceanfront',
  'water front': 'waterfront',
  'lake front': 'lakefront',
  'hbr': 'harbour',
  'harbor': 'harbour',
  'gdn': 'garden',
  'mtn': 'mountain',
  'cityview': 'city view',
  'gardenview': 'garden view',
  'poolview': 'pool view',
  'oceanview': 'ocean view',
  'side ocean': 'partial ocean',
  'lateral ocean': 'partial ocean',
  'riverview': 'river view',
  'lakeview': 'lake view',
  'mountainview': 'mountain view',
  'parkview': 'park view',
  'bayview': 'bay view',
  'harborview': 'harbour view',
  'harbourview': 'harbour view',
  'canalview': 'canal view',
  'resortview': 'resort view',
  'courtyardview': 'courtyard view',
  'lagoonview': 'lagoon view',
  'landview': 'land view',
  'beachview': 'beach view',
  'marinaview': 'marina view',
  'pool side': 'poolside',
  'honey moon': 'honeymoon',
  'park side': 'parkside',
  'lake side': 'lakeside',
  'garden area': 'garden', 
  'courtyard area': 'courtyard',
  
  // BED CONFIG
  queens: 'queen',
  kings: 'king',
  doubles: 'double',
  twins: 'twin',
  'one king': 'king',
  'one queen': 'queen',
  'one double': 'double',
  'two twin bed': 'twin',
  'semi double': 'semidouble',
  doble: 'double',
  'sofa bed': 'sofabed',
  'bunk beds': 'bunkbed',
  'bunk bed': 'bunkebed',

  // ROOM CLASSIFICATION
  'comfrt': 'comfort',
  'premiere': 'premier',
  dlx: 'deluxe',
  delx: 'deluxe',
  presidencial: 'presidential',


  // EXTRAS
  'upper floor': 'high floor',
  'high floor': 'highfloor',
  'hi floor': 'highfloor',
  'roof top': 'rooftop',
  'smoking': 'smok',
  'smk': 'smok',
  'no smok': 'non-smoking',
  'non smok': 'non-smoking',
  bathtub: 'tub',
  'bath tub': 'tub',

  // BEDROOMS
  bdrm: 'bedroom',
  bdrms: 'bedroom',
  bedrm: 'bedroom',
  bdroom: 'bedroom',
  bedrooms: 'bedroom',
  'onebedroom': 'one bedroom',
  'twobedroom': 'two bedroom',
  'twobedrooms': 'two bedroom',
  'threebedroom': 'three bedroom',
  'threebedrooms': 'three bedroom',
  'fourbedroom': 'four bedroom',
  
}

const BOUNDARY_REPLACEMENTS: Record<string, string> = {
  // ROOM CLASSIFICATION
  frnt: 'front',
  jr: ' junior',
  jnr: 'junior',
  ste: 'suite',
  suit: 'suite',
  acc: 'accessible',
  ada: 'accessible',
  'de lux': 'deluxe',
  'de luxe': 'deluxe',
  clb: 'club',
  cb: 'club',
  'club access': 'club',
  exec: 'executive',
  exe: 'executive',
  stud: 'studio',
  apmt: 'apartment',
  hear: 'hearing',
  mob: 'mobility',
  apt: 'apartment',
  'pent house': 'penthouse',
  grande: 'grand',
  'premiere': 'premier',
  'terr': 'terrace',
  'crnr': 'corner',


  // BED CONFIG
  bd: 'bed',
  qn: 'queen',
  qns: 'queen', 
  kg: 'king',
  kng: 'king',
  kngs: 'king',
  dbl: 'double',
  dbls: 'double',
  db: 'double',
  onek: 'king',
  onekg: 'king',
  onekng: 'king',
  oneking: 'king',
  oneq: 'queen',
  onequeen: 'queen',
  oneqn: 'queen',
  'two beds': 'twin',
  twok: 'two king',
  twokg: 'two king',
  twokng: 'two king',
  twoks: 'two king',
  twokgs: 'two king',
  twokngs: 'two king',
  twoqn: 'two queen',
  twoqueen: 'two queen',
  twoqns: 'two queen',
  twodb: 'two double',
  twodbl: 'two double',
  twodouble: 'two double',
  twodbls: 'two double',
  twodoubles: 'two double',
  twoqueens: 'two queen',
  'double double': 'two double',
  'queen queen': 'two queen',
  'king king': 'two king',
  'two twins': 'twin',
  'two single beds': 'twin',
  kingsize: 'king',
  queensize: 'queen',
  'double twin': 'double or twin',
  'twin or double': 'double or twin',
  'multiple beds': 'multiplebed',
  'multiple bed': 'multiplebed',
  'full double bed': 'double',

// EQUIVALENTS
  'double king size bed': 'king',
  'double king bed': 'king',
  'double room king' : 'king',
  'double room one king': 'king',
  'double queen bed': 'double', // or 'queen'
  'double queen size bed': 'double', // or 'queen'
  'double room queen': 'double', // or 'queen'
  'double room one queen': 'double', // or 'queen'
  'double room two twin beds': 'twin',

  'double deluxe king': 'deluxe king',
  'double deluxe queen': 'deluxe double', // or 'deluxe queen'
  'double superior king': 'superior king',
  'double superior queen': 'superior double', // or '"" queen'
  'double premium king': 'premium king',
  'double premium queen': 'premium double', // or '"" queen'
  'double classic king': 'classic king',
  'double classic queen': 'classic double', // or '"" queen'
  'double executive king': 'executive king',
  'double executive queen': 'executive double', // or '"" queen'
  'double premier king': 'premier king',
  'double premier queen': 'premier double', // or '"" queen'
  'double basic king': 'basic king',
  'double basic queen': 'basic double', // or '"" queen'
  'double standard king': 'standard king',
  'double standard queen': 'standard double', // or '"" queen'
  'double economy king': 'economy king',
  'double economy queen': 'economy double', // or '"" queen'

  'suite one king': 'suite',
  'suite king size': 'suite',
  'king suite': 'suite',
  'suite king': 'suite',
  'king bed suite': 'suite',
  'one king bed suite': 'suite',
  'suite with king': 'suite',
  'suite double bed': 'suite',
  'suite one double bed': 'suite',
  'suite with double bed': 'suite',

  // EXTRAS
  rm: 'room',
  flr: 'floor',
  nsmk: 'non-smoking',
  ns: 'non-smoking',
  nosmk: 'non-smoking',
  blcny: 'balcony',
  balcny: 'balcony',
  balc: 'balcony',
  blc: 'balcony',
  'refrigerator': 'fridge',
  'micro fridge': 'microwave and fridge',
  'larger': 'large',
  'kitchenette': 'kitchen',
  'lndry': 'laundry',
  'private pool': 'pool',


  // FACILITIES
  'ri sh': 'rollin shower',
  'rishw': 'rollin shower',
  'ri' : 'rollin',
  'roll in': 'rollin',
  'shwr': 'shower',
  'rishwr': 'rollin shower',
  'ris': 'rollin shower',
  'walk in shower': 'walkin shower',
  
  // OCCUPANCY
  'two adults and one child': 'two and one',
  'twoad and onech': 'two and one',
  'two adults and two children': 'two and two',
  'two adults and two child': 'two and two',
  'two adults and two childs': 'two and two',
  'twoad and twoch': 'two and two',
  'three adults and one child': 'three and one',
  'threead and onech': 'three and one',
  'persons': 'people',
  'person': 'people',
  'peoples': 'people',
  'ad': 'adult',
  'ch': 'child',
  'children': 'child',
  'single use': 'single',
  'one pax': 'single',
  'capacity one': 'single', 
  'capacityone': 'single',
  'individual use': 'single',
  'individual': 'single',
  'sole use': 'single',
  'solo': 'single',
  'one people': 'single',
  'three pax': 'triple',
  'threepax': 'triple',
  'capacity three': 'triple',
  'capacitythree': 'triple',
  'three guests': 'triple',
  'three adults': 'triple',
  'threead': 'triple',
  'three people': 'triple',
  'quadruple': 'quad',
  'four people': 'quad',
  'four pax': 'quad',
  'fourpax': 'quad',
  'capacity four': 'quad',
  'capacityfour': 'quad',
  'four guests': 'quad',
  'four adults': 'quad',
  'pax': 'people',
}

const SECOND_BOUNDARY_REPLACEMENTS: Record<string, string> = {
  jr: ' junior',
  jnr: 'junior',
  ste: 'suite',
  suit: 'suite',
  acc: 'accessible',
  ada: 'accessible',
  'de lux': 'deluxe',
  'de luxe': 'deluxe',
  bd: 'bed',
  qn: 'queen',
  qns: 'queen', 
  kg: 'king',
  kng: 'king',
  kngs: 'king',
  dbl: 'double',
  dbls: 'double',
  db: 'double',
  rm: 'room',
  flr: 'floor',
  nsmk: 'non-smoking',
  ns: 'non-smoking',
  ocn: 'ocean',
  hear: 'hearing',
  mob: 'mobility',
  wtr: 'water',
  wtrfrnt: 'waterfront',
  ocnfrnt: 'oceanfront',
  oceanfrnt: 'oceanfront',
  frnt: 'front',
  blcny: 'balcony',
  balcny: 'balcony',
  balc: 'balcony',
  blc: 'balcony',
  clb: 'club',
  cb: 'club',
  exec: 'executive',
  exe: 'executive',
  nosmk: 'non-smoking',
  apmt: 'apartment',
  onek: 'king',
  onekg: 'king',
  onekng: 'king',
  oneking: 'king',
  oneq: 'queen',
  onequeen: 'queen',
  oneqn: 'queen',
  twok: 'two king',
  twokg: 'two king',
  twokng: 'two king',
  twoks: 'two king',
  twokgs: 'two king',
  twokngs: 'two king',
  twoqn: 'two queen',
  twoqueen: 'two queen',
  twoqns: 'two queen',
  twodb: 'two double',
  twodbl: 'two double',
  twodouble: 'two double',
  twodbls: 'two double',
  twodoubles: 'two double',
  twoqueens: 'two queen',
  views: 'view',
  apt: 'apartment',
  'pent house': 'penthouse',
  grande: 'grand',
  'no view': 'noview',
  'park side': 'parkside',
  'lake side': 'lakeside',
  'double double': 'two double',
  'queen queen': 'two queen',
  'king king': 'two king',
  'ri sh': 'rollin shower',
  'rishw': 'rollin shower',
  'ri' : 'rollin',
  'roll in': 'rollin',
  'shwr': 'shower',
  'rishwr': 'rollin shower',
  'ris': 'rollin shower',
  'two twins': 'twin',
  'two single beds': 'twin',
  kingsize: 'king',
  queensize: 'queen',
  'premiere': 'premier',
  'persons': 'people',
  'person': 'people',
  'peoples': 'people',
  'ad': 'adult',
  'ch': 'child',
  'children': 'child',
  'sgl': 'single',
  'single use': 'single',
  'one pax': 'single',
  'capacity one': 'single', 
  'capacityone': 'single',
  'individual use': 'single',
  'individual': 'single',
  'sole use': 'single',
  'one people': 'single',
  'three pax': 'triple',
  'threepax': 'triple',
  'capacity three': 'triple',
  'capacitythree': 'triple',
  'three guests': 'triple',
  'three adults': 'triple',
  'threead': 'triple',
  'three people': 'triple',
  'quadruple': 'quad',
  'four people': 'quad',
  'four pax': 'quad',
  'fourpax': 'quad',
  'capacity four': 'quad',
  'capacityfour': 'quad',
  'four guests': 'quad',
  'four adults': 'quad',

  'double twin': 'double or twin',
  'twin or double': 'double or twin',
  'multiple beds': 'multiplebed',
  'multiple bed': 'multiplebed',
  'full double bed': 'double',
  
  'double king size bed': 'king',
  'double king bed': 'king',
  'double queen bed': 'queen',
  'double queen size bed': 'queen',

  'double room king' : 'king',
  'double room one king': 'king',
  'double room queen': 'queen',
  'double room one queen': 'queen',
  'double room two twin beds': 'twin',
  
  
  'double deluxe king': 'deluxe king',
  'double deluxe queen': 'deluxe queen',
  'double superior king': 'superior king',
  'double superior queen': 'superior queen',
  'double premium king': 'premium king',
  'double premium queen': 'premium queen', 
  'double classic king': 'classic king',
  'double classic queen': 'classic queen',
  'double executive king': 'executive king',
  'double executive queen': 'executive queen',
  'double premier king': 'premier king',
  'double premier queen': 'premier queen',
  'double basic king': 'basic king',
  'double basic queen': 'basic queen',
  'double standard king': 'standard king',
  'double standard queen': 'standard queen',
  'double economy king': 'economy king',
  'double economy queen': 'economy queen',


  'suite one king': 'suite',
  'suite king size': 'suite',
  'king suite': 'suite',
  'suite king': 'suite',
  'king bed suite': 'suite',
  'one king bed suite': 'suite',
  'suite with king': 'suite',

  'suite double bed': 'suite',
  'suite one double bed': 'suite',
  'suite with double bed': 'suite',

  'refrigerator': 'fridge',
 'micro fridge': 'microwave and fridge',
 'larger': 'large'
}

const EXACT_MATCH_REPLACEMENTS: Record<string, string> = {
  'standard room': 'standard double room',
  'room standard': 'standard double room',
  'economy room': 'economy double room',
  'room economy': 'economy double room',
  'room deluxe': 'deluxe double room',
  'deluxe room': 'deluxe double room',
  'superior room': 'superior double room',
  'room superior': 'superior double room', 
  'premium room': 'premium double room', 
  'room premium': 'premium double room', 
  'classic room': 'classic double room', 
  'room classic': 'classic double room', 
  'executive room': 'executive double room', 
  'room executive': 'executive double room',
  'premier room': 'premier double room', 
  'room premier': 'premier double room',
  'luxury room': 'luxury double room',
  'room luxury': 'luxury double room', 
  'basic room': 'basic double room', 
  'room basic': 'basic double room',

  'double two queen beds': 'two queen',
  'double two queen beds non smoking': 'two queen',
  'double deluxe two queen beds': 'deluxe two queen',

  'suite deluxe king bed': 'deluxe suite',
  'junior suite deluxe king bed': 'deluxe junior suite',
  'suite superior king bed': 'superior suite', 
  'junior suite superior king bed': 'superior junior suite',
  'suite premium king bed': 'premium suite', 
  'junior suite premium king bed': 'junior premium suite', 
  'suite premier king bed': 'premier suite', 
  'junior suite premier king bed': 'junior premier suite', 
  'suite executive king bed': 'executive suite',
  'junior suite executive king bed': 'junior executive suite',
  'suite classic king bed': 'classic suite', 
  'junior suite classic king bed': 'classic suite junior', 

 
}

const MATCH_REPLACEMENT: Record<string, string> = { //applies to expedia room name only
  'standard room': 'standard double or twin',
  'room standard': 'standard double or twin',
  'economy room': 'economy double or twin',
  'room economy': 'economy double or twin',
  'room deluxe': 'deluxe double or twin',
  'deluxe room': 'deluxe double or twin',
  'superior room': 'superior double or twin',
  'room superior': 'superior double or twin', 
  'premium room': 'premium double or twin', 
  'room premium': 'premium double or twin', 
  'classic room': 'classic double or twin', 
  'room classic': 'classic double or twin', 
  'executive room': 'executive double or twin', 
  'room executive': 'executive double or twin',
  'premier room': 'premier double or twin', 
  'room premier': 'premier double or twin',
  'basic room': 'basic double or twin', 
  'room basic': 'basic double or twin',
}

const DOUBLE: Record<string, string> = { //applies to expedia room name only
  'double or twin': 'double',
}

const TWIN: Record<string, string> = { //applies to expedia room name only
  'double or twin': 'twin',
}

const FORBIDDEN_WORDS = new Set([
 'twin'
]);

const exactMatchReplace = (supplierRoom: string, Match_Replacements: Record<string, string>): string => {
  return Match_Replacements[supplierRoom] ?? supplierRoom;
}

const replaceNumericalWords = (supplierRoom: string) => {
  // should replace any numerical words with the word equivalent e.g 1 => 'one'
  return supplierRoom.replace(/\d+/g, (match) => {
    const num = parseInt(match)
    return ` ${toWords(num)} `
  }).replace(/\s+/g, ' ').trim()
}

const regexReduceReplace = (supplierRoom: string, replacements: Record<string, string>, boundary: boolean = false, remove: boolean = false) => {
  // replace using our dictionary lists in order
  // boundary is used to ensure we only replace whole words
  // remove is used to remove the word if it is found
  return Object.entries(replacements).reduce((result, [search, replace]) => {
    return result.replace(new RegExp(`${boundary ? `\\b${search}\\b` : `${search}`}`, 'g'), remove ? '' : replace)
  }, supplierRoom)
}

const latinise = (supplierRoom: string) => {
  // latinise the string e.g á => a
  return supplierRoom.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
}

const getUniqueWords = (sortedWords: string) => {
  // returns a string of unique words
  const words = sortedWords.split(' ')
  const uniqueWords = Array.from(new Set(words))
  return uniqueWords.join(' ')
}

const specialReplacements = (supplierRoom: string) => {
  //  w/ to with
  // + or & to and
  return supplierRoom
    .replace(/w\//g, 'with ')
    .replace(/\+/g, ' and ')
    .replace(/&/g, ' and ')
    .replace(/queen\/queen/g, 'two queen')
    .replace(/king\/king/g, 'two king')
    .replace(/double\/double/g, 'two double')
    .replace(/[0-9.,-]+\s?(sqft|sqmt|sqm|sqm|sqf|sq|m²|m2|sq ft|sq feet)\b/g, '')
    .replace(/mb\/hr/g, 'mobility hearing')
    .replace(/double\/twin/g, 'double or twin')
    .replace(/twin\/double/g, 'double or twin')
    .replace(/\b\d+\s?(sf)\s?[\/|,]\s?\d+\s?(sm)\b/g, '')
    .replace(/\bbreakfast from [a-z]+, \d+ \d+ to [a-z]+, \d+ \d+\b/g, '')
}

const removeSpaces = (supplierRoom: string) => {
  // removes any extra spaces
  return supplierRoom.replace(/\s+/g, ' ').trim()
}

const formatRoomString = (supplierRoom: string) => {    //used in loop 1
  // lowercase and latinise before we start
  const lowercase = supplierRoom.toLowerCase()
  const latinised = latinise(lowercase)

  // replace numbers and known special characters, removing any other special characters
  const specialReplaced = specialReplacements(latinised)
  const replacedNumericalWords = replaceNumericalWords(specialReplaced)
  const formattedRoomString = replacedNumericalWords.replace(/[^a-zA-Z0-9\s]/g, ' ') // ignore special characters
  const formattedRoomStringRS = removeSpaces(formattedRoomString) // remove extra spaces

  // replace using our dictionary lists in order
  const replacedMatchWords = exactMatchReplace(formattedRoomStringRS, EXACT_MATCH_REPLACEMENTS)
  const replacedBoundaryWords = regexReduceReplace(replacedMatchWords, BOUNDARY_REPLACEMENTS, true, false)
  const replacedDirectWords = regexReduceReplace(replacedBoundaryWords, DIRECT_REPLACEMENTS, false, false)
  const removedSpecialWords = regexReduceReplace(replacedDirectWords, REMOVED_WORDS, true, true)
  const removedSpecialWordsRS = removeSpaces(removedSpecialWords) // remove extra spaces

  // sort and remove duplicates
  const sortedWords = removedSpecialWordsRS.split(' ').sort().join(' ')
  const uniqueWords = getUniqueWords(sortedWords)
  return uniqueWords
}

// formatting for expedia room names only (includes DOUBLE replacement)
const formatRoomStringExpediaDouble = (supplierRoom: string) => {     //used in loop 1
  // lowercase and latinise before we start
  const lowercase = supplierRoom.toLowerCase()
  const latinised = latinise(lowercase)

  // replace numbers and known special characters, removing any other special characters
  const specialReplaced = specialReplacements(latinised)
  const replacedNumericalWords = replaceNumericalWords(specialReplaced)
  const formattedRoomString = replacedNumericalWords.replace(/[^a-zA-Z0-9\s]/g, ' ') // ignore special characters
  const formattedRoomStringRS = removeSpaces(formattedRoomString) // remove extra spaces

  // replace using our dictionary lists in order
  const replacedMatchWords = exactMatchReplace(formattedRoomStringRS, EXACT_MATCH_REPLACEMENTS)
  const replacedBoundaryWords = regexReduceReplace(replacedMatchWords, BOUNDARY_REPLACEMENTS, true, false)
  const replacedDirectWords = regexReduceReplace(replacedBoundaryWords, DIRECT_REPLACEMENTS, false, false)
  const removedSpecialWords = regexReduceReplace(replacedDirectWords, REMOVED_WORDS, true, true)
  const replacedDoubleOrTwin = regexReduceReplace(removedSpecialWords, DOUBLE, true, false)  //KEY DIFFERENCE
  const removedSpecialWordsRS = removeSpaces(replacedDoubleOrTwin) // remove extra spaces

  // sort and remove duplicates
  const sortedWords = removedSpecialWordsRS.split(' ').sort().join(' ')
  const uniqueWords = getUniqueWords(sortedWords)
  return uniqueWords
}

const formatRoomString2 = (supplierRoom: string) => {     //used in loop 2
  // lowercase and latinise before we start
  const lowercase = supplierRoom.toLowerCase()
  const latinised = latinise(lowercase)

  // replace numbers and known special characters, removing any other special characters
  const specialReplaced = specialReplacements(latinised)
  const replacedNumericalWords = replaceNumericalWords(specialReplaced)
  const formattedRoomString = replacedNumericalWords.replace(/[^a-zA-Z0-9\s]/g, ' ') // ignore special characters
  const formattedRoomStringRS = removeSpaces(formattedRoomString) // remove extra spaces

  // replace using our dictionary lists in order
  const replacedBoundaryWords = regexReduceReplace(formattedRoomStringRS, SECOND_BOUNDARY_REPLACEMENTS, true, false)  // BOUNDARY_REPLACEMENTS2!
  const replacedDirectWords = regexReduceReplace(replacedBoundaryWords, DIRECT_REPLACEMENTS, false, false)
  const removedSpecialWords = regexReduceReplace(replacedDirectWords, REMOVED_WORDS, true, true)
  const removedSpecialWordsRS = removeSpaces(removedSpecialWords) // remove extra spaces

  // sort and remove duplicates
  const sortedWords = removedSpecialWordsRS.split(' ').sort().join(' ')
  const uniqueWords = getUniqueWords(sortedWords)
  return uniqueWords
}

const formatRoomStringExpedia2 = (supplierRoom: string) => {      //used in loop 2
  // lowercase and latinise before we start
  const lowercase = supplierRoom.toLowerCase()
  const latinised = latinise(lowercase)

  // replace numbers and known special characters, removing any other special characters
  const specialReplaced = specialReplacements(latinised)
  const replacedNumericalWords = replaceNumericalWords(specialReplaced)
  const formattedRoomString = replacedNumericalWords.replace(/[^a-zA-Z0-9\s]/g, ' ') // ignore special characters
  const formattedRoomStringRS = removeSpaces(formattedRoomString) // remove extra spaces

  // replace using our dictionary lists in order
  const replacedMatchedWords = regexReduceReplace(formattedRoomStringRS, MATCH_REPLACEMENT,true,false)
  const replacedBoundaryWords = regexReduceReplace(replacedMatchedWords, SECOND_BOUNDARY_REPLACEMENTS, true, false) 
  const replacedDirectWords = regexReduceReplace(replacedBoundaryWords, DIRECT_REPLACEMENTS, false, false)
  const removedSpecialWords = regexReduceReplace(replacedDirectWords, REMOVED_WORDS, true, true)
  const removedSpecialWordsRS = removeSpaces(removedSpecialWords) // remove extra spaces

  // sort and remove duplicates
  const sortedWords = removedSpecialWordsRS.split(' ').sort().join(' ')
  const uniqueWords = getUniqueWords(sortedWords)
  return uniqueWords
}

const formatRoomStringExpediaTWIN = (supplierRoom: string) => {       //used in loop 3
  // lowercase and latinise before we start
  const lowercase = supplierRoom.toLowerCase()
  const latinised = latinise(lowercase)

  // replace numbers and known special characters, removing any other special characters
  const specialReplaced = specialReplacements(latinised)
  const replacedNumericalWords = replaceNumericalWords(specialReplaced)
  const formattedRoomString = replacedNumericalWords.replace(/[^a-zA-Z0-9\s]/g, ' ') // ignore special characters
  const formattedRoomStringRS = removeSpaces(formattedRoomString) // remove extra spaces

  // replace using our dictionary lists in order
  const replacedBoundaryWords = regexReduceReplace(formattedRoomStringRS, BOUNDARY_REPLACEMENTS, true, false)
  const replacedDirectWords = regexReduceReplace(replacedBoundaryWords, DIRECT_REPLACEMENTS, false, false)
  const removedSpecialWords = regexReduceReplace(replacedDirectWords, REMOVED_WORDS, true, true)
  const replacedDoubleOrTwin = regexReduceReplace(removedSpecialWords, TWIN, true, false)  //KEY DIFFERENCE - replaces 'double or twin' to 'twin' just for expedia room name
  const removedExtreme = regexReduceReplace(replacedDoubleOrTwin, EXTREME_REMOVED_WORDS,true,true)
  const removedSpecialWordsRS = removeSpaces(removedExtreme) // remove extra spaces

  // sort and remove duplicates
  const sortedWords = removedSpecialWordsRS.split(' ').sort().join(' ')
  const uniqueWords = getUniqueWords(sortedWords)
  return uniqueWords
}
const formatRoomString3 = (supplierRoom: string) => {    //used in loop  3
  // lowercase and latinise before we start
  const lowercase = supplierRoom.toLowerCase()
  const latinised = latinise(lowercase)

  // replace numbers and known special characters, removing any other special characters
  const specialReplaced = specialReplacements(latinised)
  const replacedNumericalWords = replaceNumericalWords(specialReplaced)
  const formattedRoomString = replacedNumericalWords.replace(/[^a-zA-Z0-9\s]/g, ' ') // ignore special characters
  const formattedRoomStringRS = removeSpaces(formattedRoomString) // remove extra spaces

  // replace using our dictionary lists in order
  const replacedMatchWords = exactMatchReplace(formattedRoomStringRS, EXACT_MATCH_REPLACEMENTS)
  const replacedBoundaryWords = regexReduceReplace(replacedMatchWords, BOUNDARY_REPLACEMENTS, true, false)
  const replacedDirectWords = regexReduceReplace(replacedBoundaryWords, DIRECT_REPLACEMENTS, false, false)
  const removedSpecialWords = regexReduceReplace(replacedDirectWords, REMOVED_WORDS, true, true)
  const removedExtreme = regexReduceReplace(removedSpecialWords, EXTREME_REMOVED_WORDS, true, true)
  const removedSpecialWordsRS = removeSpaces(removedExtreme) // remove extra spaces

  // sort and remove duplicates
  const sortedWords = removedSpecialWordsRS.split(' ').sort().join(' ')
  const uniqueWords = getUniqueWords(sortedWords)
  return uniqueWords
}
const containsAllWords = (masterWords: string, childWords: string): boolean => {
  const masterWordSet = new Set(masterWords.split(' '));
  const childWordSet = new Set(childWords.split(' '));
  
  // Get the extra words in child that aren't in master
  const extraWords = Array.from(childWordSet).filter(word => !masterWordSet.has(word));
  
  // Check if any extra words are in the forbidden set
  const hasForbiddenWords = extraWords.some(word => FORBIDDEN_WORDS.has(word));
  if (hasForbiddenWords) {
    return false;
  }
  
  // Check if all words from master are in child
  return Array.from(masterWordSet).every(word => childWordSet.has(word));
}

//1st
const verifyRoomString1 = (supplierRoomA: string, supplierRoomB: string): boolean => {
  if (!supplierRoomA || !supplierRoomB) {
    return false
  }

  const formattedSupplierRoomA = formatRoomString(supplierRoomA)
  const formattedSupplierRoomB = formatRoomStringExpediaDouble(supplierRoomB)

  if (formattedSupplierRoomA === formattedSupplierRoomB) {
    console.log('round 1');
    console.log(formattedSupplierRoomA,';',formattedSupplierRoomB);
    return true; 
  }
  // check if formattedSupplierRoomA is equal to formattedSupplierRoomB while ignoring word order
  return containsAllWords(formattedSupplierRoomB,formattedSupplierRoomA)
}

//2nd
const verifyRoomString2 = (supplierRoomA: string, supplierRoomB: string): boolean => {
  if (!supplierRoomA || !supplierRoomB) {
    return false
  }

  const formattedSupplierRoomA = formatRoomString2(supplierRoomA)
  const formattedSupplierRoomB = formatRoomStringExpedia2(supplierRoomB)

  if (formattedSupplierRoomA === formattedSupplierRoomB) {
    console.log('round 2');
    console.log(formattedSupplierRoomA,';',formattedSupplierRoomB);

    return true
  }
  // check if formattedSupplierRoomA is equal to formattedSupplierRoomB while ignoring word order
  return containsAllWords(formattedSupplierRoomB,formattedSupplierRoomA)
}

//3rd
const verifyRoomString3 = (supplierRoomA: string, supplierRoomB: string): boolean => {
  if (!supplierRoomA || !supplierRoomB) {
    return false
  }

  const formattedSupplierRoomA = formatRoomString3(supplierRoomA)
  const formattedSupplierRoomB = formatRoomStringExpediaTWIN(supplierRoomB)

  if (formattedSupplierRoomA === formattedSupplierRoomB) {
    console.log('round 3');
    console.log(formattedSupplierRoomA,";",formattedSupplierRoomB);


    return true
  }
  // check if formattedSupplierRoomA is equal to formattedSupplierRoomB while ignoring word order
  return containsAllWords(formattedSupplierRoomB,formattedSupplierRoomA)
}



export const verifyRoomString = (supplierRoomA: string, supplierRoomB: string): boolean => {
  if (!supplierRoomA || !supplierRoomB) {
    return false
  }

  // First try exact matches with all three verification methods
  const verified1 = verifyRoomString1(supplierRoomA, supplierRoomB);
  if (verified1) {
    return true
  }

  const verified2 = verifyRoomString2(supplierRoomA, supplierRoomB);
  if (verified2) {
    return true
  }

  return verifyRoomString3(supplierRoomA, supplierRoomB);
  
}

// Main function to process room strings
export const processRoomStrings = (eps_room: string, supplierroom: string): boolean => {
  return verifyRoomString(supplierroom, eps_room);
}

// Example usage function
export const exampleUsage = () => {
  const supplier = 'deluxe room, 1 king bed'
  const expedia = "deluxe room, king"
  
  console.log('Processing room strings:')
  console.log('Supplier room:', supplier)
  console.log('Expedia room:', expedia)
  console.log('Match result:', processRoomStrings(expedia, supplier))
}

