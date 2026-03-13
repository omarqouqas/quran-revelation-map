/**
 * Tanzil.net Revelation Order Notes
 *
 * Source: https://tanzil.net/docs/revelation_order
 * Based on: "The History of the Quran" by Allamah Abu Abd Allah al-Zanjani
 * Tradition: Ibn Abbas narrations
 *
 * These notes document verse-level exceptions where specific ayat within
 * a surah were revealed at a different location/time than the rest of the surah.
 * Empty string means no exception noted in the Tanzil table.
 *
 * IMPORTANT: The revelation order of a surah is based on the revelation of
 * the FIRST ayat of the surah, not the revelation of the whole surah.
 */

export const tanzilNotes: Record<number, string> = {
  // === MECCAN SURAHS (Revelation Order 1-86) ===

  96: "", // Al-Alaq — 1st revealed
  68: "Except verses 17-33 and 48-50, from Medina",
  73: "Except verses 10, 11, and 20, from Medina",
  74: "", // Al-Muddaththir
  1: "", // Al-Fatiha
  111: "", // Al-Masad
  81: "", // At-Takwir
  87: "", // Al-A'laa
  92: "", // Al-Lail
  89: "", // Al-Fajr
  93: "", // Ad-Dhuhaa
  94: "", // Ash-Sharh
  103: "", // Al-Asr
  100: "", // Al-Aadiyaat
  108: "", // Al-Kawthar
  102: "", // At-Takaathur
  107: "Only verses 1-3 from Mecca; the rest from Medina",
  109: "", // Al-Kaafiroon
  105: "", // Al-Fil
  113: "", // Al-Falaq
  114: "", // An-Naas
  112: "", // Al-Ikhlaas
  53: "Except verse 32, from Medina",
  80: "", // Abasa
  97: "", // Al-Qadr
  91: "", // Ash-Shams
  85: "", // Al-Burooj
  95: "", // At-Tin
  106: "", // Quraish
  101: "", // Al-Qaari'a
  75: "", // Al-Qiyaama
  104: "", // Al-Humaza
  77: "Except verse 48, from Medina",
  50: "Except verse 38, from Medina",
  90: "", // Al-Balad
  86: "", // At-Taariq
  54: "Except verses 44-46, from Medina",
  38: "", // Saad
  7: "Except verses 163-170, from Medina",
  72: "", // Al-Jinn
  36: "Except verse 45, from Medina",
  25: "Except verses 68-70, from Medina",
  35: "", // Faatir
  19: "Except verses 58 and 71, from Medina",
  20: "Except verses 130 and 131, from Medina",
  56: "Except verses 81 and 82, from Medina",
  26: "Except verses 197 and 224-227, from Medina",
  27: "", // An-Naml
  28: "Except verses 52-55 from Medina, and verse 85 from Juhfa at the time of the Hijra",
  17: "Except verses 26, 32, 33, 57, and 73-80, from Medina",
  10: "Except verses 40, 94, 95, and 96, from Medina",
  11: "Except verses 12, 17, and 114, from Medina",
  12: "Except verses 1, 2, 3, and 7, from Medina",
  15: "Except verse 87, from Medina",
  6: "Except verses 20, 23, 91, 93, 114, 151, 152, and 153, from Medina",
  37: "", // As-Saaffaat
  31: "Except verses 27-29, from Medina",
  34: "", // Saba
  39: "", // Az-Zumar
  40: "Except verses 56 and 57, from Medina",
  41: "", // Fussilat
  42: "Except verses 23, 24, 25, and 27, from Medina",
  43: "Except verse 54, from Medina",
  44: "", // Ad-Dukhaan
  45: "Except verse 14, from Medina",
  46: "Except verses 10, 15, and 35, from Medina",
  51: "", // Adh-Dhaariyat
  88: "", // Al-Ghaashiya
  18: "Except verse 28 and verses 83-101, from Medina",
  16: "Except the last three verses, from Medina",
  71: "", // Nooh
  14: "Except verses 28 and 29, from Medina",
  21: "", // Al-Anbiyaa
  23: "", // Al-Muminoon
  32: "Except verses 16-20, from Medina",
  52: "", // At-Tur
  67: "", // Al-Mulk
  69: "", // Al-Haaqqa
  70: "", // Al-Ma'aarij
  78: "", // An-Naba
  79: "", // An-Naazi'aat
  82: "", // Al-Infitaar
  84: "", // Al-Inshiqaaq
  30: "Except verse 17, from Medina",
  29: "Except verses 1-11, from Medina",
  83: "", // Al-Mutaffifin

  // === MEDINAN SURAHS (Revelation Order 87-114) ===

  2: "Except verse 281, revealed at Mina at the time of the Farewell Pilgrimage",
  8: "Except verses 30-36, from Mecca",
  3: "", // Aal-i-Imraan
  33: "", // Al-Ahzaab
  60: "", // Al-Mumtahana
  4: "", // An-Nisaa
  99: "", // Az-Zalzala
  57: "", // Al-Hadid
  47: "Except verse 13, revealed during the Prophet's Hijra",
  13: "", // Ar-Ra'd
  55: "", // Ar-Rahmaan
  76: "", // Al-Insaan
  65: "", // At-Talaaq
  98: "", // Al-Bayyina
  59: "", // Al-Hashr
  24: "", // An-Noor
  22: "Except verses 52-55, revealed between Mecca and Medina",
  63: "", // Al-Munaafiqoon
  58: "", // Al-Mujaadila
  49: "", // Al-Hujuraat
  66: "", // At-Tahrim
  64: "", // At-Taghaabun
  61: "", // As-Saff
  62: "", // Al-Jumu'a
  48: "Revealed while returning from Hudaybiyyah",
  5: "Except verse 3, revealed at Arafat during the Farewell Pilgrimage",
  9: "Except the last two verses, from Mecca",
  110: "Revealed at Mina during the Farewell Pilgrimage, but regarded as a Medinan surah",
};

/**
 * Count of surahs with verse-level exception notes
 * (for verification: should be approximately 40)
 */
export const surahsWithNotes = Object.entries(tanzilNotes).filter(
  ([, note]) => note !== ""
).length;

/**
 * Get the Tanzil note for a specific surah
 * Returns empty string if no note exists
 */
export function getTanzilNote(surahNumber: number): string {
  return tanzilNotes[surahNumber] ?? "";
}
