export const emergencyReply =
  'This sounds like a medical emergency. Please contact local emergency services immediately or go to the nearest emergency room.';

export function getAuraReply(question) {
  const normalized = question
    .toLocaleLowerCase('pl')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ł/g, 'l');

  const emergencyPatterns = [
    /bol.{0,12}klatce/,
    /(?:siln|obfit).{0,14}krwaw/,
    /duszno/,
    /nagl.{0,20}(?:dretw|paraliz|utrat.{0,16}(?:wzrok|widzen)|niewidze)/,
    /(?:nagl|gwaltown).{0,20}(?:utrat.{0,16}(?:wzrok|widzen)|niewidze)/,
    /(?:nie moge|trudno).{0,12}oddychac/,
    /chest.{0,10}pain|pain.{0,10}chest/,
    /severe.{0,12}bleed/,
    /shortness.{0,12}breath/,
    /sudden.{0,15}numb/,
    /sudden.{0,12}(?:blind|vision loss|loss of sight)/,
  ];
  if (emergencyPatterns.some((pattern) => pattern.test(normalized))) {
    return { text: emergencyReply, emergency: true };
  }

  if (/(?:umow|rezerw|przeloz|zmien termin|wizyta|dostepn.{0,12}termin)/.test(normalized)) {
    return { text: 'Wizytę umówisz lub przełożysz telefonicznie. Zadzwoń do rejestracji pod numer 85 661 01 07. Nie mam dostępu do kalendarza i nie potwierdzam rezerwacji online.', link: true };
  }
  if (/(?:godzin|otwart|czynna|czynne)/.test(normalized)) {
    return { text: 'Publiczny katalog podaje godziny od poniedziałku do piątku, 07:30–18:00. Godziny mogą się zmienić — potwierdź je w rejestracji: 85 661 01 07.', link: true };
  }
  if (/(?:adres|dojech|dojazd|gdzie|map|parking)/.test(normalized)) {
    return { text: 'Adres poradni: ul. Wincentego Witosa 36 lok. 108, 15-660 Białystok. Nie mam potwierdzonych informacji o parkingu. W sprawie dojazdu zadzwoń pod 85 661 01 07.', link: true };
  }
  if (/(?:nfz|ubezpiec|platn|cena|koszt|skierow)/.test(normalized)) {
    return { text: 'Nie mam potwierdzonych informacji o zasadach płatności, ubezpieczeniu ani wymaganych skierowaniach. Zadzwoń do rejestracji pod numer 85 661 01 07.', link: true };
  }
  if (/(?:przygot|badani|kropl|lek|recept|objaw|bol|widze|widzen|oko|oczu|chorob|diagnoz|lecz)/.test(normalized)) {
    return { text: 'Jestem wirtualną asystentką administracyjną i nie udzielam porad medycznych. W sprawie pytania klinicznego skontaktuj się z personelem poradni pod numerem 85 661 01 07.', link: true };
  }
  if (/(?:dorosl|dziec|dzieci|okulist)/.test(normalized)) {
    return { text: 'Publiczne katalogi wymieniają poradnię okulistyczną dla dorosłych i poradnię okulistyczną dla dzieci. Szczegóły i dostępność potwierdź w rejestracji.', link: true };
  }
  return { text: 'Nie mam potwierdzonej odpowiedzi na to pytanie. Rejestracja pomoże pod numerem 85 661 01 07.', link: true };
}
