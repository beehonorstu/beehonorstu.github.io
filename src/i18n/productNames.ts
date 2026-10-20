// Display names copied from the Android app's localized @string/app_name.
// Languages without a localized Android name use the default English label.
// Android values-in supplies Indonesian; values-pt-rBR supplies Portuguese.
const names: Record<string, string> = {
  ar: 'خبير الشحن',
  de: 'Ladeexperte',
  es: 'Carga Experta',
  fr: 'Expert Recharge',
  id: 'Cas Pro',
  it: 'Esperto Ricarica',
  ja: '充電エキスパート',
  ko: '충전 전문가',
  nl: 'Laadexpert',
  pl: 'Ładowanie Pro',
  pt: 'Carga Expert',
  th: 'ชาร์จโปร',
  tr: 'Şarj Uzmanı',
  tw: '充電專家',
  zh: '充电专家',
};

export function getChargeExpertName(lang: string): string {
  return names[lang] ?? 'Charge Expert';
}
