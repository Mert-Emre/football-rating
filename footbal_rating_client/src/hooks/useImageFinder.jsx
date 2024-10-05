export const useImageFinder = (team) => {
  const library = {
    Alanyaspor: "/images/teams/alanyaspor.png",
    Pendikspor: "/images/teams/pendikspor.png",
    Konyaspor: "/images/teams/konyaspor.png",
    "Başakşehir FK": "/images/teams/basaksehir.png",
    Fenerbahçe: "/images/teams/fenerbahce.png",
    "MKE Ankaragücü": "/images/teams/ankaragucu.png",
    "Fatih Karagümrük": "/images/teams/karagumruk.png",
    "Çaykur Rizespor": "/images/teams/rizespor.png",
    "Adana Demirspor": "/images/teams/adanademirspor.png",
    Hatayspor: "/images/teams/hatayspor.png",
    Sivasspor: "/images/teams/sivasspor.png",
    Beşiktaş: "/images/teams/besiktas.png",
    Kayserispor: "/images/teams/kayserispor.png",
    Antalyaspor: "/images/teams/antalyaspor.png",
    İstanbulspor: "/images/teams/istanbulspor.png",
    "Yılport Samsunspor": "/images/teams/samsunspor.png",
    Galatasaray: "/images/teams/galatasaray.png",
    "Gaziantep FK": "/images/teams/gaziantep.png",
    Trabzonspor: "/images/teams/trabzonspor.png",
    Kasımpaşa: "/images/teams/kasimpasa.png",
  };
  return library[team];
};
