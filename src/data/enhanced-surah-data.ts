/**
 * Enhanced Surah Data
 * Detailed circumstances, themes with explanations, insights, and reflection prompts
 */

/** Theme with explanation */
export interface SurahTheme {
  title: string;
  explanation: string;
}

/** Enhanced surah data structure */
export interface EnhancedSurahData {
  number: number;
  circumstances: string; // Asbab al-Nuzul - 50-150 words
  themes: SurahTheme[]; // 3-5 themes with explanations
  insights: string[]; // 2-4 learning insights
  reflectionPrompts: string[]; // 1-2 reflection questions
  relatedSurahs?: number[]; // Related surah numbers
}

/** Enhanced data for pilot surahs */
export const enhancedSurahData: Record<number, EnhancedSurahData> = {
  // Surah 1: Al-Fatiha
  1: {
    number: 1,
    circumstances:
      "Al-Fatiha is unique among all surahs as the essential prayer recited in every unit of salah. Though revealed early in Makkah, scholars note it was revealed twice - once in Makkah and once in Madinah - emphasizing its paramount importance. It encapsulates the entire message of the Quran: praise of Allah, acknowledgment of His sovereignty, seeking guidance, and the straight path. The Prophet ﷺ called it 'the greatest surah in the Quran' and 'the Seven Oft-Repeated Verses.'",
    themes: [
      {
        title: "Divine Praise",
        explanation:
          "Opens with praise of Allah as Lord of all worlds, establishing the proper relationship between Creator and creation.",
      },
      {
        title: "Seeking Guidance",
        explanation:
          "The core supplication is for guidance to the straight path - the most essential human need.",
      },
      {
        title: "The Three Groups",
        explanation:
          "Humanity is divided into those blessed, those who earned anger, and those astray - clarifying the consequences of choices.",
      },
      {
        title: "Conversation with Allah",
        explanation:
          "The surah is a dialogue - when recited, Allah responds to each verse, making it uniquely interactive.",
      },
    ],
    insights: [
      "Every prayer begins with praise, not requests - teaching us gratitude precedes asking.",
      "We ask for guidance multiple times daily, acknowledging our constant need for direction.",
      "The path is described as 'straight' (sirat al-mustaqim) - singular and clear, not many confusing options.",
    ],
    reflectionPrompts: [
      "When you recite Al-Fatiha in prayer, do you feel the conversation with Allah?",
      "What does asking for guidance 17+ times daily reveal about our nature?",
    ],
    relatedSurahs: [2, 112],
  },

  // Surah 3: Al-Imran (The Family of Imran)
  3: {
    number: 3,
    circumstances:
      "Revealed in Madinah, primarily after the Battle of Uhud (625 CE). Part of it was revealed when a Christian delegation from Najran came to discuss theology with the Prophet ﷺ. It addresses the lessons from Uhud and engages in dialogue with the People of the Book about the nature of Prophet Isa (Jesus) and his family.",
    themes: [
      {
        title: "Unity of Divine Message",
        explanation:
          "All prophets taught the same core message of Tawhid - there is no contradiction between them.",
      },
      {
        title: "Lessons from Uhud",
        explanation:
          "Analyzing the setback at Uhud, emphasizing the importance of obedience to the Prophet ﷺ and patience in adversity.",
      },
      {
        title: "Dialogue with Christians",
        explanation:
          "Clarifying the true nature of Isa and Maryam, inviting to common ground between faiths.",
      },
      {
        title: "Steadfastness in Trials",
        explanation:
          "Patience during hardship and trusting Allah's plan, even when outcomes seem unfavorable.",
      },
      {
        title: "Prohibition of Riba",
        explanation:
          "Economic ethics and avoiding usury, establishing foundations for Islamic finance.",
      },
    ],
    insights: [
      "Setbacks can be opportunities for growth and self-reflection.",
      "True success is measured by faithfulness, not worldly outcomes.",
      "Interfaith dialogue should be based on common ground - 'a word equal between us and you.'",
    ],
    reflectionPrompts: [
      "How do you respond to setbacks? What lessons can be extracted from difficulties?",
      "What common ground can you find with people of other faiths?",
    ],
    relatedSurahs: [2, 4, 5],
  },

  // Surah 4: An-Nisa (The Women)
  4: {
    number: 4,
    circumstances:
      "Revealed in Madinah over several years (approximately 625-627 CE), largely after Uhud when many Muslim men had been martyred, leaving widows and orphans. It established comprehensive legislation for protecting women's rights, inheritance, and family structure.",
    themes: [
      {
        title: "Women's Rights",
        explanation:
          "Establishing inheritance rights, marriage rights, and dignified treatment for women in society.",
      },
      {
        title: "Orphan Protection",
        explanation:
          "Just treatment and protection of property rights for orphans - a central concern after Uhud.",
      },
      {
        title: "Family Law",
        explanation:
          "Comprehensive guidance on marriage, divorce, and domestic responsibilities.",
      },
      {
        title: "Social Justice",
        explanation:
          "Standing for justice even against oneself or family - 'be persistently standing firm in justice.'",
      },
      {
        title: "Hypocrisy Exposed",
        explanation:
          "Characteristics and warnings about the hypocrites who undermine the community from within.",
      },
    ],
    insights: [
      "Islam elevated women's status by granting them inheritance and property rights unprecedented in that era.",
      "Justice must be upheld even when it's against personal or family interest.",
      "The family unit is foundational to a healthy society and deserves detailed guidance.",
    ],
    reflectionPrompts: [
      "How can you better uphold justice in your family relationships?",
      "What responsibilities do you have toward vulnerable members of your community?",
    ],
    relatedSurahs: [2, 3, 5],
  },

  // Surah 5: Al-Ma'idah (The Table Spread)
  5: {
    number: 5,
    circumstances:
      "Among the last surahs revealed, mostly in Madinah (approximately 629-632 CE). Contains the famous verse revealed at Arafat during the Farewell Pilgrimage: 'This day I have perfected for you your religion.' It addresses final legislation, covenants, and relations with People of the Book.",
    themes: [
      {
        title: "Fulfilling Covenants",
        explanation:
          "The obligation to honor commitments and contracts - 'O you who believe, fulfill your contracts.'",
      },
      {
        title: "Dietary Laws",
        explanation:
          "Clarification of halal and haram foods, hunting regulations, and exceptions during necessity.",
      },
      {
        title: "Perfection of Religion",
        explanation:
          "The completion of Islamic law and guidance - 'This day I have perfected for you your religion.'",
      },
      {
        title: "Justice and Fairness",
        explanation:
          "Not letting hatred of a people lead to injustice - 'Be just; that is nearer to righteousness.'",
      },
      {
        title: "Story of Isa's Disciples",
        explanation:
          "The table spread miracle and the faith of Isa's disciples as an example.",
      },
    ],
    insights: [
      "Covenants and promises are sacred and must be honored, even with those we disagree with.",
      "Justice must be maintained even toward those you dislike - emotions don't override ethics.",
      "The religion was completed and perfected - no additions or subtractions are needed.",
    ],
    reflectionPrompts: [
      "What covenants or commitments in your life need more attention?",
      "Do you maintain justice toward those you disagree with?",
    ],
    relatedSurahs: [2, 3, 4],
  },

  // Surah 6: Al-An'am (The Cattle)
  6: {
    number: 6,
    circumstances:
      "Revealed entirely at once in Makkah during the Year of Sorrow (619 CE), a time of immense hardship after the deaths of Khadijah and Abu Talib. It was revealed to strengthen the Prophet's ﷺ resolve with powerful arguments for Tawhid against the polytheists.",
    themes: [
      {
        title: "Tawhid (Oneness of Allah)",
        explanation:
          "Comprehensive arguments against polytheism, establishing Allah's exclusive right to worship.",
      },
      {
        title: "Signs in Creation",
        explanation:
          "The natural world as evidence of the Creator - gardens, stars, rain, and livestock.",
      },
      {
        title: "Prophetic Mission",
        explanation:
          "The role and struggles of messengers throughout history, consoling the Prophet ﷺ.",
      },
      {
        title: "Refutation of Shirk",
        explanation:
          "Logical dismantling of idol worship and associating partners with Allah.",
      },
      {
        title: "Dietary Clarifications",
        explanation:
          "Correcting pagan superstitions about food and establishing what Allah has actually forbidden.",
      },
    ],
    insights: [
      "The natural world is full of signs pointing to the Creator for those who reflect.",
      "Truth must be proclaimed regardless of how people respond - the messenger's duty is to convey.",
      "Superstitions and innovations in religion must be rejected in favor of authentic revelation.",
    ],
    reflectionPrompts: [
      "What signs in creation strengthen your faith?",
      "Are there any cultural practices you follow that contradict authentic teachings?",
    ],
    relatedSurahs: [7, 10, 11],
  },

  // Surah 7: Al-A'raf (The Heights)
  7: {
    number: 7,
    circumstances:
      "Revealed in Makkah during the middle Makkan period. It provides extensive narratives of previous prophets and their peoples, serving as both consolation for the Prophet ﷺ and warning to the Quraysh. The 'A'raf' refers to the elevated place between Paradise and Hell.",
    themes: [
      {
        title: "Stories of Prophets",
        explanation:
          "Detailed accounts of Adam, Nuh, Hud, Salih, Lut, Shu'ayb, and Musa - each with lessons.",
      },
      {
        title: "Consequences of Rejection",
        explanation:
          "The fate of nations that denied their messengers - 'Ad, Thamud, people of Lut.",
      },
      {
        title: "The A'raf",
        explanation:
          "Those on the heights between Paradise and Hell - whose good and bad deeds are equal.",
      },
      {
        title: "Satan's Enmity",
        explanation:
          "Iblis's vow to mislead humanity from every direction - his methods and tactics exposed.",
      },
      {
        title: "Human Nature",
        explanation:
          "The covenant taken from all souls before creation - 'Am I not your Lord?'",
      },
    ],
    insights: [
      "Every nation received guidance; rejection has inevitable consequences.",
      "Satan's methods are consistent: false promises and gradual deviation from the straight path.",
      "Humanity has an innate recognition of their Lord (fitrah) from the primordial covenant.",
    ],
    reflectionPrompts: [
      "Which prophet's story resonates most with your current situation?",
      "How do you guard against Satan's gradual deceptions in your life?",
    ],
    relatedSurahs: [6, 10, 11, 26],
  },

  // Surah 8: Al-Anfal (The Spoils of War)
  8: {
    number: 8,
    circumstances:
      "Revealed in Madinah shortly after the Battle of Badr (624 CE), Islam's first major military victory. It addresses the distribution of war spoils, the ethics of warfare, and lessons from the miraculous victory against a much larger force.",
    themes: [
      {
        title: "Distribution of Spoils",
        explanation:
          "Rules for dividing war gains fairly - one-fifth to Allah and His messenger, the rest to the fighters.",
      },
      {
        title: "Divine Assistance at Badr",
        explanation:
          "Angels, rain, and other miraculous aid that secured victory for the outnumbered Muslims.",
      },
      {
        title: "Ethics of Warfare",
        explanation:
          "Rules of engagement, treatment of prisoners, and when fighting is sanctioned.",
      },
      {
        title: "Qualities of Believers",
        explanation:
          "Faith, trust in Allah, unity, and obedience to leadership during conflict.",
      },
      {
        title: "Breaking Treaties",
        explanation:
          "How to deal with those who violate agreements and the importance of maintaining trust.",
      },
    ],
    insights: [
      "Victory comes from Allah, not superior numbers or weapons - 'You did not kill them, but Allah killed them.'",
      "War has ethical boundaries that must be observed even against enemies.",
      "Internal unity is essential for external success - discord weakens the community.",
    ],
    reflectionPrompts: [
      "How do you handle situations where you're outnumbered or outmatched?",
      "What role does trust in Allah play during your struggles?",
    ],
    relatedSurahs: [3, 9, 47],
  },

  // Surah 9: At-Tawbah (The Repentance)
  9: {
    number: 9,
    circumstances:
      "Revealed in Madinah in 631 CE, among the last surahs revealed. Unique in not beginning with Bismillah. It was revealed after the Conquest of Makkah and addresses the final relations with polytheist tribes, hypocrites, and the Tabuk expedition.",
    themes: [
      {
        title: "Annulment of Treaties",
        explanation:
          "Ending agreements with polytheists who repeatedly violated their commitments.",
      },
      {
        title: "Exposure of Hypocrites",
        explanation:
          "Detailed description of hypocrite characteristics - their excuses, behavior, and fate.",
      },
      {
        title: "Tabuk Expedition",
        explanation:
          "Distinguishing those who participated in hardship from those who stayed behind with excuses.",
      },
      {
        title: "Repentance and Forgiveness",
        explanation:
          "Allah's mercy for those who sincerely repent - the door remains open until death.",
      },
      {
        title: "Charity and Zakah",
        explanation:
          "Proper distribution of charity and the eight categories of zakah recipients.",
      },
    ],
    insights: [
      "True repentance requires sincerity and changed behavior, not just words.",
      "Hypocrisy is more dangerous than open opposition - it corrodes from within.",
      "Actions reveal true faith, especially during times of hardship when excuses are easy.",
    ],
    reflectionPrompts: [
      "Are there areas in your life where actions don't match stated beliefs?",
      "What does genuine repentance look like in your life?",
    ],
    relatedSurahs: [8, 47, 48],
  },

  // Surah 10: Yunus (Jonah)
  10: {
    number: 10,
    circumstances:
      "Revealed in Makkah during the late Makkan period. It emphasizes the truth of revelation, the stories of previous prophets (especially Yunus, Musa, and Nuh), and offers reassurance to the Prophet ﷺ during opposition.",
    themes: [
      {
        title: "Truth of the Quran",
        explanation:
          "The Quran is not fabricated - a challenge is issued to produce something similar.",
      },
      {
        title: "Story of Yunus",
        explanation:
          "His people's unique repentance that saved them from destruction - the only nation to repent in time.",
      },
      {
        title: "Divine Decree",
        explanation:
          "Everything happens by Allah's will and knowledge - nothing occurs outside His plan.",
      },
      {
        title: "Patience in Adversity",
        explanation:
          "Following the example of previous prophets who endured opposition with patience.",
      },
      {
        title: "Inevitability of Judgment",
        explanation:
          "No escape from accountability - every soul will face its record.",
      },
    ],
    insights: [
      "Sincere repentance, even at the last moment, can bring salvation - Yunus's people prove this.",
      "The Quran's eloquence and wisdom are self-evident proofs of its divine origin.",
      "Patience during hardship is the way of all prophets - you are in noble company.",
    ],
    reflectionPrompts: [
      "What can you learn from Yunus's people who repented and were saved?",
      "How do you maintain hope when facing persistent opposition?",
    ],
    relatedSurahs: [6, 7, 11, 37],
  },

  // Surah 11: Hud
  11: {
    number: 11,
    circumstances:
      "Revealed in Makkah during a period of intense persecution. It presents detailed accounts of prophets Nuh, Hud, Salih, Ibrahim, Lut, and Shu'ayb, emphasizing their perseverance and the destruction of their rejecting peoples. The Prophet ﷺ said this surah and its sisters (like Al-Waqi'ah) 'turned his hair gray' due to their weight.",
    themes: [
      {
        title: "Prophetic Perseverance",
        explanation:
          "Steadfastness despite prolonged opposition - Nuh preached for 950 years.",
      },
      {
        title: "Destruction of Nations",
        explanation:
          "Detailed accounts of punished peoples - the flood, the scream, stones from the sky.",
      },
      {
        title: "The Flood of Nuh",
        explanation:
          "The dialogue with his disbelieving son - family ties don't guarantee salvation.",
      },
      {
        title: "Consistency of Message",
        explanation:
          "All prophets called to the same fundamentals - Tawhid and righteousness.",
      },
      {
        title: "Warning and Hope",
        explanation:
          "Destruction for rejecters, but salvation always available for those who believe.",
      },
    ],
    insights: [
      "The prophetic path requires immense patience - Nuh's 950 years puts our struggles in perspective.",
      "Family ties don't guarantee salvation; faith does - Nuh's son drowned despite his lineage.",
      "Allah's punishment comes when all chances for repentance have been exhausted.",
    ],
    reflectionPrompts: [
      "What keeps you steadfast when facing prolonged difficulty?",
      "How do you balance hope for others' guidance with acceptance of their choices?",
    ],
    relatedSurahs: [7, 10, 26],
  },

  // Surah 13: Ar-Ra'd (The Thunder)
  13: {
    number: 13,
    circumstances:
      "Revealed in Madinah (though some say late Makkah). Its name comes from the verse stating that thunder glorifies Allah's praise. It addresses those who demanded miracles, explaining that guidance comes through revelation, not spectacles. The surah emphasizes Allah's knowledge of all things, seen and unseen.",
    themes: [
      {
        title: "Signs in Nature",
        explanation:
          "Thunder, lightning, rain, and growth serve as evidence of Allah's power and creative ability.",
      },
      {
        title: "Guidance Through Revelation",
        explanation:
          "Miracles don't compel faith; the Quran itself is the sufficient miracle for sincere seekers.",
      },
      {
        title: "Allah's Complete Knowledge",
        explanation:
          "He knows what every female carries and what the wombs gain or lose - nothing is hidden.",
      },
      {
        title: "Angels Recording Deeds",
        explanation:
          "Guardian angels who record every action, constantly present and aware of all we do.",
      },
      {
        title: "Reward for Patience",
        explanation:
          "Those who are patient seeking Allah's face will have the ultimate abode in Paradise.",
      },
    ],
    insights: [
      "Natural phenomena are not random but worship Allah in their own way - thunder glorifies Him.",
      "Demanding miracles is often a sign of insincerity; the Quran suffices for those who truly seek.",
      "Change comes from within: 'Allah will not change the condition of a people until they change themselves.'",
    ],
    reflectionPrompts: [
      "When you hear thunder, do you remember it glorifies Allah?",
      "What internal change must you make before expecting external change in your life?",
    ],
    relatedSurahs: [2, 6, 10],
  },

  // Surah 14: Ibrahim (Abraham)
  14: {
    number: 14,
    circumstances:
      "Revealed in Makkah during the period of persecution. Named after Ibrahim's prayer when he settled his family in the barren valley of Makkah. It addresses the nature of prophethood, gratitude versus ingratitude, and includes Ibrahim's profound supplications that Muslims still recite today.",
    themes: [
      {
        title: "Light and Darkness",
        explanation:
          "The Quran brings people from darkness into light - a recurring metaphor for guidance.",
      },
      {
        title: "Prophets Speaking Native Languages",
        explanation:
          "Every messenger was sent in his people's tongue for clarity - no language barrier to truth.",
      },
      {
        title: "Ibrahim's Supplications",
        explanation:
          "His prayers for Makkah, his descendants, and all believers continue to be answered.",
      },
      {
        title: "Gratitude vs. Ingratitude",
        explanation:
          "'If you are grateful, I will increase you' - gratitude multiplies blessings.",
      },
      {
        title: "The Tree Parable",
        explanation:
          "Good words are like good trees with firm roots and branches in the sky; bad words like uprooted trees.",
      },
    ],
    insights: [
      "A good word is like a tree: rooted, fruitful, reaching heavenward - while bad words are like uprooted trees.",
      "Ibrahim prayed for future generations including us - we are answers to his ancient prayers.",
      "Gratitude multiplies blessings; ingratitude leads to severe punishment.",
    ],
    reflectionPrompts: [
      "Are your words like firmly-rooted trees or like uprooted weeds?",
      "How do you show gratitude in a way that might increase your blessings?",
    ],
    relatedSurahs: [2, 6, 16],
  },

  // Surah 15: Al-Hijr (The Rocky Tract)
  15: {
    number: 15,
    circumstances:
      "Revealed in Makkah, named after the rocky region where the people of Thamud (Salih's people) lived. It was revealed during a period when the Prophet ﷺ faced ridicule, and it reassures him while warning those who mock. Contains the story of Iblis's refusal to prostrate and his request for respite.",
    themes: [
      {
        title: "Preservation of the Quran",
        explanation:
          "'We have sent down the Reminder and We will preserve it' - a divine guarantee unique to the Quran.",
      },
      {
        title: "Stories of Destroyed Nations",
        explanation:
          "People of Lut, companions of the thicket, people of Al-Hijr - all destroyed for rejection.",
      },
      {
        title: "Creation of Adam and Iblis",
        explanation:
          "The angels prostrated to Adam; Iblis refused out of arrogance and was expelled.",
      },
      {
        title: "Iblis's Limited Power",
        explanation:
          "He can only mislead those who choose to follow him - no power over sincere servants.",
      },
      {
        title: "Consolation for the Prophet",
        explanation:
          "'We know your heart is distressed by what they say' - divine acknowledgment of his pain.",
      },
    ],
    insights: [
      "The Quran's preservation is divinely guaranteed - a unique promise among all scriptures.",
      "Iblis has no power over sincere servants - his influence requires our consent and choice.",
      "The Prophet ﷺ was commanded to glorify and prostrate when distressed - worship as healing.",
    ],
    reflectionPrompts: [
      "How does knowing the Quran is divinely preserved affect how you approach it?",
      "When facing ridicule for your faith, how do you find consolation?",
    ],
    relatedSurahs: [7, 11, 26],
  },

  // Surah 16: An-Nahl (The Bee)
  16: {
    number: 16,
    circumstances:
      "Revealed in Makkah (with some Madani verses), named after the bee which Allah inspired to build hives and produce honey. One of the most comprehensive surahs cataloging Allah's blessings - from livestock to rain to the diversity of colors. Addresses gratitude and the consequences of ingratitude.",
    themes: [
      {
        title: "Catalog of Blessings",
        explanation:
          "Livestock, crops, seas, mountains, stars, and more are enumerated as divine gifts.",
      },
      {
        title: "The Bee's Inspiration",
        explanation:
          "Allah taught the bee to build hives and produce honey - a drink of healing for mankind.",
      },
      {
        title: "Diversity as Divine Sign",
        explanation:
          "Variations in colors, languages, and forms are intentional signs of Allah's creativity.",
      },
      {
        title: "Justice and Good Conduct",
        explanation:
          "The famous verse commanding justice, ihsan (excellence), and helping relatives.",
      },
      {
        title: "Breaking Oaths",
        explanation:
          "Warning against using oaths for deception and the gravity of breaking promises.",
      },
    ],
    insights: [
      "Honey has healing properties - a scientific fact stated 1400 years before modern medicine confirmed it.",
      "The diversity in creation (colors, languages, abilities) is intentional beauty, not random accident.",
      "Allah commands justice, ihsan (excellence), and giving to relatives in one comprehensive verse (16:90).",
    ],
    reflectionPrompts: [
      "How many blessings mentioned in this surah do you benefit from daily?",
      "Do you practice justice, excellence, AND family generosity as one integrated command?",
    ],
    relatedSurahs: [6, 14, 35],
  },

  // Surah 17: Al-Isra (The Night Journey)
  17: {
    number: 17,
    circumstances:
      "Revealed in Makkah, commemorating the miraculous Night Journey (Isra) from Makkah to Jerusalem and the Ascension (Mi'raj) through the heavens, approximately one year before Hijra. This journey, occurring after the Year of Sorrow, was a divine honor when earthly support had been lost. The five daily prayers were prescribed during this journey.",
    themes: [
      {
        title: "The Night Journey",
        explanation:
          "From Masjid al-Haram to Masjid al-Aqsa in one night - a miraculous divine gift.",
      },
      {
        title: "Bani Israel's History",
        explanation:
          "Their rises and falls, twice corrupting the land and facing consequences.",
      },
      {
        title: "Ethical Commandments",
        explanation:
          "A comprehensive code including parent treatment, avoiding excess, and walking with humility.",
      },
      {
        title: "The Quran's Uniqueness",
        explanation:
          "Challenge to produce anything like it; it heals believers and increases oppressors in loss.",
      },
      {
        title: "Satan's Promise",
        explanation:
          "He will attack from front, back, left, and right - but not from above, where Allah's mercy descends.",
      },
    ],
    insights: [
      "The journey linked Makkah and Jerusalem, uniting the entire Abrahamic prophetic legacy.",
      "Parent treatment is listed right after Tawhid - second only to Allah's rights over us.",
      "Walking arrogantly is forbidden: 'You will never tear the earth or reach the mountains in height.'",
    ],
    reflectionPrompts: [
      "How do you treat your parents, especially in their old age?",
      "Do you walk with humility, remembering you cannot pierce the earth or match the mountains?",
    ],
    relatedSurahs: [18, 53, 81],
  },

  // Surah 20: Ta-Ha
  20: {
    number: 20,
    circumstances:
      "Revealed in Makkah. It is reported that Umar ibn al-Khattab converted to Islam after hearing this surah recited by his sister. The surah primarily tells the story of Musa in great detail - from his birth, to the burning bush, to confronting Pharaoh, to the golden calf incident.",
    themes: [
      {
        title: "Musa's Complete Story",
        explanation:
          "Birth, calling at the burning bush, miracles, confrontation with Pharaoh, and leading his people.",
      },
      {
        title: "The Burning Bush",
        explanation:
          "Allah's direct speech to Musa: 'I am Allah, there is no god but Me, so worship Me.'",
      },
      {
        title: "Pharaoh's Arrogance",
        explanation:
          "His claim to divinity and ultimate drowning - a warning to all tyrants.",
      },
      {
        title: "The Golden Calf",
        explanation:
          "Samiri's deception and the people's failure during Musa's absence on the mountain.",
      },
      {
        title: "Adam's Story",
        explanation:
          "His creation, Satan's deception, his repentance - and Allah's forgiveness and guidance.",
      },
    ],
    insights: [
      "Musa was afraid and Allah reassured him - even prophets experienced human emotions.",
      "Pharaoh's magicians recognized truth and submitted despite Pharaoh's death threats.",
      "Adam's sin and repentance teaches that mistakes don't define us; returning to Allah does.",
    ],
    reflectionPrompts: [
      "When facing a 'Pharaoh' in your life, what gives you courage like Musa?",
      "Have you ever recognized truth and submitted despite social pressure?",
    ],
    relatedSurahs: [7, 26, 28],
  },

  // Surah 21: Al-Anbiya (The Prophets)
  21: {
    number: 21,
    circumstances:
      "Revealed in Makkah, this surah mentions more prophets than almost any other - approximately 16 prophets are named or referenced. It emphasizes that all prophets shared the same essential message and faced similar challenges, providing solidarity for the Prophet ﷺ facing his own opposition.",
    themes: [
      {
        title: "Unity of Prophetic Message",
        explanation:
          "All prophets called to the same truth: worship Allah alone with no partners.",
      },
      {
        title: "Stories of Multiple Prophets",
        explanation:
          "Ibrahim, Lut, Nuh, Dawud, Sulayman, Ayyub, Yunus, and more - each with lessons.",
      },
      {
        title: "Ibrahim and the Idols",
        explanation:
          "His logical dismantling of idol worship by breaking them and challenging the people.",
      },
      {
        title: "Trials of Prophets",
        explanation:
          "Ayyub's patience in illness, Yunus's regret in the whale, Zakariyya's prayer for a child.",
      },
      {
        title: "Resurrection Certainty",
        explanation:
          "All will return to Allah for judgment - 'as We began the first creation, We will repeat it.'",
      },
    ],
    insights: [
      "Ibrahim used reason: when the idols couldn't defend themselves, their worship was exposed as absurd.",
      "Every prophet faced mockery and denial - opposition to truth is ancient, not a new phenomenon.",
      "Yunus's prayer from the whale's belly ('La ilaha illa anta...') is a model supplication for distress.",
    ],
    reflectionPrompts: [
      "Which prophet's trial most resembles something you're currently facing?",
      "Can you use Ibrahim's logical approach when discussing faith with others?",
    ],
    relatedSurahs: [6, 11, 37],
  },

  // Surah 22: Al-Hajj (The Pilgrimage)
  22: {
    number: 22,
    circumstances:
      "One of the few surahs with both Makki and Madani verses. It addresses the rituals of Hajj, the ancient practice restored by Ibrahim. It also contains powerful imagery of the Day of Judgment (the earthquake of the Hour) and permission for self-defense, which came after years of persecution.",
    themes: [
      {
        title: "The Earthquake of the Hour",
        explanation:
          "A terrifying description of Judgment Day's beginning that will make nursing mothers forget their infants.",
      },
      {
        title: "Hajj Rituals",
        explanation:
          "The ancient rites established by Ibrahim and restored by Islam for all believers.",
      },
      {
        title: "Permission to Fight",
        explanation:
          "First Quranic permission for defensive combat after years of patient endurance of oppression.",
      },
      {
        title: "All Creation Prostrates",
        explanation:
          "Everything in heavens and earth prostrates to Allah - sun, moon, stars, mountains, trees, animals.",
      },
      {
        title: "The Fly Challenge",
        explanation:
          "Idols cannot even create a fly; if a fly took something from them, they couldn't retrieve it.",
      },
    ],
    insights: [
      "Hajj connects Muslims to Ibrahim's legacy - ancient monotheism restored and continued.",
      "Permission to fight was reluctant and defensive - peace was always the preferred state.",
      "The fly parable devastates idol worship with simple, undeniable logic anyone can understand.",
    ],
    reflectionPrompts: [
      "If you've performed Hajj, did you feel the connection to Ibrahim's ancient legacy?",
      "How does the fly challenge reshape your understanding of false dependencies in your life?",
    ],
    relatedSurahs: [2, 3, 5],
  },

  // Surah 23: Al-Mu'minun (The Believers)
  23: {
    number: 23,
    circumstances:
      "Revealed in Makkah, it opens with a description of successful believers and their characteristics. When these opening verses were revealed, the Prophet ﷺ said whoever embodies these traits will inherit Paradise. It provides a roadmap for spiritual success.",
    themes: [
      {
        title: "Characteristics of Believers",
        explanation:
          "Humility in prayer, avoiding vain talk, giving zakah, guarding chastity, keeping trusts and promises.",
      },
      {
        title: "Stages of Human Creation",
        explanation:
          "From clay to sperm-drop to clot to bones to flesh - detailed embryological description.",
      },
      {
        title: "Stories of Prophets",
        explanation:
          "Nuh, an unnamed messenger, Musa and Harun, Isa and Maryam - all faced similar rejection.",
      },
      {
        title: "Denial Despite Evidence",
        explanation:
          "Each community rejected their messenger with similar excuses across generations.",
      },
      {
        title: "Final Accountability",
        explanation:
          "No family ties will help on that Day; everyone stands alone before Allah.",
      },
    ],
    insights: [
      "Success (falah) begins with khushu' (humility/focus) in prayer - everything else builds on this foundation.",
      "The Quran described embryonic development stages with remarkable accuracy 1400 years ago.",
      "Avoiding 'laghw' (vain, useless speech and distractions) is a distinguishing trait of successful believers.",
    ],
    reflectionPrompts: [
      "How many of the seven opening characteristics do you consistently practice?",
      "What 'laghw' (useless distractions) should you turn away from?",
    ],
    relatedSurahs: [24, 70, 90],
  },

  // Surah 24: An-Nur (The Light)
  24: {
    number: 24,
    circumstances:
      "Revealed in Madinah after the slander incident (Ifk) against Aisha رضي الله عنها. Hypocrites spread false accusations about her honor. This surah vindicated her, established strict rules for accusations of adultery (requiring four witnesses), and provided comprehensive guidance on modesty, household etiquette, and the famous 'Light Verse.'",
    themes: [
      {
        title: "Laws of Accusation",
        explanation:
          "Four witnesses required for adultery accusations; false accusers receive 80 lashes.",
      },
      {
        title: "The Ifk Incident",
        explanation:
          "Vindication of Aisha and crucial lessons about the sin of spreading gossip.",
      },
      {
        title: "The Light Verse",
        explanation:
          "'Allah is the Light of the heavens and earth' - profound mystical imagery of divine guidance.",
      },
      {
        title: "Modesty Guidelines",
        explanation:
          "Lowering gaze, covering adornments, seeking permission before entering homes.",
      },
      {
        title: "Household Etiquette",
        explanation:
          "Children and servants should ask permission at three times: Fajr, noon rest, and after Isha.",
      },
    ],
    insights: [
      "Spreading rumors, even without inventing them, is sinful - 'you received it with your tongues.'",
      "The four-witness requirement makes adultery accusations nearly impossible, protecting honor.",
      "The Light Verse inspired centuries of Islamic spirituality, philosophy, and art.",
    ],
    reflectionPrompts: [
      "Do you verify information before passing it on, or do you spread rumors carelessly?",
      "How does the imagery of Allah as Light affect your understanding of guidance?",
    ],
    relatedSurahs: [23, 33, 65],
  },

  // Surah 25: Al-Furqan (The Criterion)
  25: {
    number: 25,
    circumstances:
      "Revealed in Makkah, 'Al-Furqan' means the criterion that distinguishes truth from falsehood. The surah addresses objections raised by the Quraysh about the Prophet ﷺ - why does he eat food and walk in markets? Why wasn't an angel sent instead? It ends with beautiful descriptions of the 'servants of the Most Merciful.'",
    themes: [
      {
        title: "The Quran as Criterion",
        explanation:
          "It distinguishes truth from falsehood, guidance from misguidance, for all who seek.",
      },
      {
        title: "Objections Answered",
        explanation:
          "Why a human messenger? Why not more miracles? Why not revealed all at once? - All addressed.",
      },
      {
        title: "Regret of Disbelievers",
        explanation:
          "They'll bite their hands wishing they had followed the Messenger and avoided bad company.",
      },
      {
        title: "Servants of the Most Merciful",
        explanation:
          "Those who walk humbly, spend moderately, avoid shirk and murder, and pray at night.",
      },
      {
        title: "Gradual Revelation",
        explanation:
          "The Quran was revealed gradually to strengthen the Prophet's heart and address events.",
      },
    ],
    insights: [
      "The Prophet ﷺ being human (eating, walking in markets) is a mercy, not a deficiency.",
      "Taking wrong friends leads to eternal regret - 'Woe to me, I wish I hadn't taken so-and-so as a friend.'",
      "The beautiful ending describes ideal believers: humble, balanced, prayerful, and ever-repentant.",
    ],
    reflectionPrompts: [
      "Do your friends bring you closer to or further from guidance?",
      "Which traits of 'Ibad ar-Rahman' (servants of the Most Merciful) do you embody?",
    ],
    relatedSurahs: [17, 23, 76],
  },

  // Surah 26: Ash-Shu'ara (The Poets)
  26: {
    number: 26,
    circumstances:
      "Revealed during the middle Makkan period when the Quraysh intensified their opposition. The surah presents multiple prophet stories as evidence of the consistent pattern: messengers rejected, but truth ultimately triumphs.",
    themes: [
      {
        title: "Stories of the Prophets",
        explanation:
          "Moses, Abraham, Noah, Hud, Salih, Lot, and Shu'ayb - each faced rejection.",
      },
      {
        title: "Pattern of Rejection",
        explanation:
          "Every community rejected their messenger with similar excuses.",
      },
      {
        title: "Divine Victory",
        explanation:
          "Truth triumphed in every story, providing comfort to the Prophet ﷺ.",
      },
      {
        title: "Poets vs Prophets",
        explanation:
          "Distinguishes prophetic revelation from mere poetry that the Quraysh accused.",
      },
    ],
    insights: [
      "The repeated refrain 'Your Lord is the Almighty, the Merciful' appears eight times.",
      "Opposition to truth follows predictable patterns across history.",
      "Poetry can mislead, but divine revelation guides to truth.",
    ],
    reflectionPrompts: [
      "Which prophet's story in this surah resonates most with challenges you face?",
      "How do you distinguish guidance from entertainment in what you consume?",
    ],
    relatedSurahs: [7, 11, 27],
  },

  // Surah 27: An-Naml (The Ant)
  27: {
    number: 27,
    circumstances:
      "Revealed in the middle Makkan period. Named after the ant whose words to her colony Solomon understood. The surah highlights wisdom, knowledge, and the signs of Allah in creation.",
    themes: [
      {
        title: "Solomon's Kingdom",
        explanation:
          "His command over jinn, birds, and understanding of all creatures.",
      },
      {
        title: "The Queen of Sheba",
        explanation:
          "Her journey from disbelief to submission through wisdom, not force.",
      },
      {
        title: "Signs in Nature",
        explanation:
          "Creatures like ants and hoopoes demonstrate divine wisdom.",
      },
      {
        title: "Knowledge and Wisdom",
        explanation:
          "True knowledge leads to recognizing Allah's power.",
      },
    ],
    insights: [
      "The ant's awareness shows that even the smallest creatures have understanding.",
      "The Queen of Sheba was convinced by evidence and reasoning, not compulsion.",
      "Solomon's gratitude increased despite his immense blessings.",
    ],
    reflectionPrompts: [
      "What can you learn from creatures often considered insignificant?",
      "How does sincere investigation lead to truth, like the Queen of Sheba's journey?",
    ],
    relatedSurahs: [26, 28, 34],
  },

  // Surah 28: Al-Qasas (The Stories)
  28: {
    number: 28,
    circumstances:
      "Revealed during the middle Makkan period when persecution intensified. The detailed story of Moses' life, from infancy to prophethood, parallels the Prophet's ﷺ own journey and provides hope.",
    themes: [
      {
        title: "Moses' Complete Story",
        explanation:
          "The most detailed account of Moses from birth to mission.",
      },
      {
        title: "From Weakness to Strength",
        explanation:
          "Moses was vulnerable as an infant, yet Allah's plan protected him.",
      },
      {
        title: "Qarun's Arrogance",
        explanation:
          "Wealth leads to destruction when it causes arrogance.",
      },
      {
        title: "Divine Promise",
        explanation:
          "Allah promises the Prophet ﷺ return to his homeland (Makkah).",
      },
    ],
    insights: [
      "Moses' mother's trust in Allah during the most terrifying moment is our model.",
      "Pharaoh's own household raised his eventual opponent - divine irony.",
      "The verse about returning home gave the Prophet ﷺ hope during hardship.",
    ],
    reflectionPrompts: [
      "When have you witnessed Allah's plan working through unlikely means?",
      "What does Qarun's story teach about the dangers of wealth?",
    ],
    relatedSurahs: [26, 27, 20],
  },

  // Surah 29: Al-'Ankabut (The Spider)
  29: {
    number: 29,
    circumstances:
      "Revealed in the late Makkan period when some Muslims were being tortured. The surah addresses trials as necessary tests of faith and warns against the fragility of false supports.",
    themes: [
      {
        title: "Trials Test Faith",
        explanation:
          "Belief must be tested; claiming faith isn't enough.",
      },
      {
        title: "The Spider's Web",
        explanation:
          "Those who take protectors besides Allah have fragile foundations.",
      },
      {
        title: "Stories of Tested Prophets",
        explanation:
          "Noah, Abraham, Lot - all faced trials before victory.",
      },
      {
        title: "Striving and Guidance",
        explanation:
          "Those who strive for Allah will be guided to His paths.",
      },
    ],
    insights: [
      "The spider web metaphor: appears strong but crumbles under pressure.",
      "Parental pressure to abandon faith is addressed directly.",
      "The closing verse promises guidance to those who sincerely strive.",
    ],
    reflectionPrompts: [
      "What false securities might you be relying on instead of Allah?",
      "How do trials actually strengthen your faith rather than weaken it?",
    ],
    relatedSurahs: [30, 31, 28],
  },

  // Surah 30: Ar-Rum (The Romans)
  30: {
    number: 30,
    circumstances:
      "Revealed around 615 CE after the Persians defeated the Romans. The Quraysh rejoiced at the defeat of the People of the Book. The surah prophesied Rome's victory within 'a few years' - fulfilled in 624 CE.",
    themes: [
      {
        title: "Prophecy of Roman Victory",
        explanation:
          "A precise prediction that came true within a decade.",
      },
      {
        title: "Rise and Fall of Nations",
        explanation:
          "Allah controls the affairs of nations and history.",
      },
      {
        title: "Signs in Creation",
        explanation:
          "The universe, human relationships, and diversity all point to Allah.",
      },
      {
        title: "Fitrah - Natural Disposition",
        explanation:
          "Islam aligns with humanity's innate nature.",
      },
    ],
    insights: [
      "This prophecy was a tremendous proof when it came true at Badr's time.",
      "The verse about creating spouses for tranquility is frequently recited at weddings.",
      "Human diversity in languages and colors is described as a sign, not a division.",
    ],
    reflectionPrompts: [
      "How do fulfilled prophecies strengthen your faith in the Quran?",
      "What signs in your own life point you toward recognizing your Creator?",
    ],
    relatedSurahs: [29, 31, 85],
  },

  // Surah 31: Luqman
  31: {
    number: 31,
    circumstances:
      "Revealed in the middle Makkan period. Named after the wise sage Luqman, whose advice to his son forms the heart of the surah. It addresses proper upbringing and parent-child relationships.",
    themes: [
      {
        title: "Wisdom of Luqman",
        explanation:
          "Timeless parental advice: tawhid, prayer, patience, humility.",
      },
      {
        title: "Parent-Child Bond",
        explanation:
          "Honor parents, but not in disobedience to Allah.",
      },
      {
        title: "Humility in Conduct",
        explanation:
          "Walk moderately, lower your voice - character matters.",
      },
      {
        title: "Allah's Infinite Knowledge",
        explanation:
          "Nothing is hidden, even a mustard seed in a rock.",
      },
    ],
    insights: [
      "Luqman's first advice is about tawhid - the foundation of all wisdom.",
      "The surah balances parental rights with limits when they contradict faith.",
      "Walking with arrogance and raising voice are explicitly condemned.",
    ],
    reflectionPrompts: [
      "Which piece of Luqman's advice do you most need to apply today?",
      "How do you balance honoring parents while maintaining your principles?",
    ],
    relatedSurahs: [17, 46, 29],
  },

  // Surah 32: As-Sajdah (The Prostration)
  32: {
    number: 32,
    circumstances:
      "Revealed in the middle Makkan period. The Prophet ﷺ regularly recited this surah along with Al-Mulk before sleeping. It contains a verse of prostration about those who fall in worship when reminded of Allah's signs.",
    themes: [
      {
        title: "Creation of Humanity",
        explanation:
          "From clay to ensouled being - our noble origin and destiny.",
      },
      {
        title: "Resurrection",
        explanation:
          "The One who created from nothing can surely recreate.",
      },
      {
        title: "Signs of the Sincere",
        explanation:
          "They forsake their beds to pray at night in hope and fear.",
      },
      {
        title: "Meeting with Allah",
        explanation:
          "The reality of the afterlife that the disbelievers denied.",
      },
    ],
    insights: [
      "The description of night prayer (tahajjud) is one of the most beautiful in the Quran.",
      "Hidden rewards await those who sacrifice sleep for worship.",
      "The surah was part of the Prophet's ﷺ nightly routine.",
    ],
    reflectionPrompts: [
      "What keeps you from establishing regular night prayer?",
      "How does reflecting on creation strengthen your belief in resurrection?",
    ],
    relatedSurahs: [67, 76, 17],
  },

  // Surah 33: Al-Ahzab (The Confederates)
  33: {
    number: 33,
    circumstances:
      "Revealed in Madinah around 5 AH, primarily addressing the Battle of the Trench when multiple tribes confederated against the Muslims. Also contains legislation about the Prophet's household and social reforms.",
    themes: [
      {
        title: "Battle of the Trench",
        explanation:
          "When all Arabia united against Madinah, Allah sent unseen forces.",
      },
      {
        title: "Hypocrites Exposed",
        explanation:
          "Crisis revealed those with weak faith who wanted to flee.",
      },
      {
        title: "Mothers of the Believers",
        explanation:
          "Special status and regulations for the Prophet's wives.",
      },
      {
        title: "Social Reforms",
        explanation:
          "Adoption, hijab, and addressing the Prophet properly.",
      },
    ],
    insights: [
      "True faith is proven during crisis, not during ease.",
      "The trench strategy showed creative problem-solving in defense.",
      "The surah establishes that the Prophet's wives are 'mothers' to all believers.",
    ],
    reflectionPrompts: [
      "How do you respond when challenges seem overwhelming?",
      "What does the hypocrites' behavior during crisis teach about testing faith?",
    ],
    relatedSurahs: [59, 24, 66],
  },

  // Surah 34: Saba (Sheba)
  34: {
    number: 34,
    circumstances:
      "Revealed in the middle Makkan period. The surah discusses the kingdom of Sheba (Saba) in Yemen, which was blessed but destroyed when they became ungrateful. Contrasts with David and Solomon's gratitude.",
    themes: [
      {
        title: "Grateful vs Ungrateful",
        explanation:
          "David and Solomon thanked Allah; Saba rejected blessings.",
      },
      {
        title: "Fleeting Worldly Power",
        explanation:
          "Great civilizations perished when they forgot their source.",
      },
      {
        title: "Resurrection Reality",
        explanation:
          "The disbelievers mock, but every atom is accounted for.",
      },
      {
        title: "Satan's Admission",
        explanation:
          "On Judgment Day, Satan will disown those who followed him.",
      },
    ],
    insights: [
      "The civilization of Saba was real - archaeological evidence confirms it.",
      "The dam burst at Ma'rib was a historical event referenced in the Quran.",
      "Few are truly grateful - gratitude is rare and precious.",
    ],
    reflectionPrompts: [
      "Which blessings do you take for granted that could be taken away?",
      "How do you express gratitude actively, not just verbally?",
    ],
    relatedSurahs: [27, 21, 38],
  },

  // Surah 35: Fatir (The Originator)
  35: {
    number: 35,
    circumstances:
      "Revealed in the middle Makkan period. 'Fatir' means the One who originates creation. The surah emphasizes Allah's creative power and the consistent rejection of messengers throughout history.",
    themes: [
      {
        title: "Allah the Creator",
        explanation:
          "Angels with multiple wings, diverse creation - all from Allah.",
      },
      {
        title: "Satan's Enmity",
        explanation:
          "He is a clear enemy; do not follow his footsteps.",
      },
      {
        title: "Inheritance of the Book",
        explanation:
          "Muslims inherit the scripture; some wrong themselves, some excel.",
      },
      {
        title: "Equality of the Dead and Living",
        explanation:
          "The Prophet cannot make the dead (in heart) hear.",
      },
    ],
    insights: [
      "The diversity of mountains, fruits, and people all demonstrate divine artistry.",
      "Three categories of Muslims: those who wrong themselves, moderate, and forerunners.",
      "True scholars are those who fear Allah most.",
    ],
    reflectionPrompts: [
      "Which category of scripture-inheritors do you fall into?",
      "How does knowledge of Allah lead to proper fear of Him?",
    ],
    relatedSurahs: [36, 34, 6],
  },

  // Surah 36: Ya-Sin
  36: {
    number: 36,
    circumstances:
      "Revealed in the middle Makkan period. Called 'the heart of the Quran' by the Prophet ﷺ, it addresses the fundamentals: tawhid, prophethood, and resurrection. Often recited for the dying and at funerals due to its powerful themes of life, death, and resurrection.",
    themes: [
      {
        title: "Heart of the Quran",
        explanation:
          "Encapsulates core beliefs in tawhid, risalah, and akhirah.",
      },
      {
        title: "The People of the Town",
        explanation:
          "Three messengers sent, all rejected - a warning to Quraysh.",
      },
      {
        title: "Signs of Resurrection",
        explanation:
          "The dead earth reviving, the orbits of sun and moon - all point to the Hereafter.",
      },
      {
        title: "Divine Power",
        explanation:
          "'Be, and it is' - Allah's command creates without effort.",
      },
    ],
    insights: [
      "The Prophet ﷺ encouraged reciting Ya-Sin for the dying - it eases the soul's departure.",
      "The believing man from the edge of the city represents those who accept truth despite isolation.",
      "Everything travels in its orbit - the universe demonstrates perfect divine order.",
    ],
    reflectionPrompts: [
      "When you see nature's revival after rain, what does it remind you about resurrection?",
      "How can you be like the believing man - supporting truth even when it's unpopular?",
    ],
    relatedSurahs: [35, 37, 67],
  },

  // Surah 37: As-Saffat (Those Ranged in Ranks)
  37: {
    number: 37,
    circumstances:
      "Revealed in the middle Makkan period. Named after the angels who stand in ranks worshipping Allah. The surah forcefully refutes polytheism and recounts stories of prophets who faced rejection: Noah, Abraham, Moses, Elias, Lot, and Jonah.",
    themes: [
      {
        title: "Angels in Worship",
        explanation:
          "The unseen realm filled with obedient beings arranged in ranks.",
      },
      {
        title: "Abraham's Sacrifice",
        explanation:
          "The story of his willingness to sacrifice his son, ransomed by Allah.",
      },
      {
        title: "Prophetic Perseverance",
        explanation:
          "Each prophet faced mockery but remained steadfast.",
      },
      {
        title: "Refutation of Polytheism",
        explanation:
          "False gods cannot help themselves, let alone their worshippers.",
      },
    ],
    insights: [
      "Ibrahim's dream and his son's willing submission show the ultimate test of faith.",
      "The ransom of the sacrifice established the ritual of Eid al-Adha.",
      "Jonah's story shows that even prophets face consequences for hasty decisions.",
    ],
    reflectionPrompts: [
      "What are you willing to sacrifice for Allah's sake?",
      "How does knowing angels worship in ranks affect your own prayer posture?",
    ],
    relatedSurahs: [36, 38, 21],
  },

  // Surah 38: Sad
  38: {
    number: 38,
    circumstances:
      "Revealed in the middle Makkan period when Quraysh leaders approached Abu Talib to pressure the Prophet ﷺ to stop preaching. The surah strengthens the Prophet's resolve through stories of David, Solomon, and Job - leaders and servants of Allah who faced trials.",
    themes: [
      {
        title: "Arrogance of Rejection",
        explanation:
          "The Quraysh rejected the Prophet out of pride, not reason.",
      },
      {
        title: "David's Repentance",
        explanation:
          "Even a great king made mistakes and sought forgiveness immediately.",
      },
      {
        title: "Solomon's Test",
        explanation:
          "Given immense power, he remained grateful and devoted.",
      },
      {
        title: "Iblis's Pride",
        explanation:
          "Satan's refusal to prostrate stemmed from arrogance - the root of all sin.",
      },
    ],
    insights: [
      "David's immediate repentance when corrected is the model for believers.",
      "Solomon asked for a kingdom no one after him could have - ambition can be righteous.",
      "Job's patience through suffering shows faith endures even when blessings are removed.",
    ],
    reflectionPrompts: [
      "When corrected, do you respond with immediate repentance like David?",
      "What does Iblis's story teach about the danger of considering yourself superior?",
    ],
    relatedSurahs: [37, 39, 21],
  },

  // Surah 39: Az-Zumar (The Groups)
  39: {
    number: 39,
    circumstances:
      "Revealed in the late Makkan period, near the time of the migration to Abyssinia. The surah emphasizes sincerity in worship and Allah's exclusive right to devotion. Named 'The Groups' after the description of people being led to Paradise and Hell in groups.",
    themes: [
      {
        title: "Sincerity in Worship",
        explanation:
          "Pure devotion to Allah alone, without any partners.",
      },
      {
        title: "Groups to Paradise and Hell",
        explanation:
          "The dramatic scene of people being led in throngs to their final abodes.",
      },
      {
        title: "The Hopeful Verse",
        explanation:
          "'Do not despair of Allah's mercy' - even after excess in sin.",
      },
      {
        title: "Night Worship",
        explanation:
          "The one who prays at night is not equal to the heedless.",
      },
    ],
    insights: [
      "The verse about not despairing is called the most hopeful verse in the Quran.",
      "Standing, prostrating at night distinguishes the mindful from the unmindful.",
      "The gates of Paradise will be opened with 'Peace be upon you' - eternal welcome.",
    ],
    reflectionPrompts: [
      "What prevents you from being among those who worship at night?",
      "How does the most hopeful verse affect your view of repentance?",
    ],
    relatedSurahs: [38, 40, 50],
  },

  // Surah 40: Ghafir (The Forgiver)
  40: {
    number: 40,
    circumstances:
      "First of the seven 'Ha Mim' surahs, revealed in the late Makkan period. The surah highlights Allah's forgiveness while warning of the consequences of arrogance. Features the powerful story of the believing man from Pharaoh's family who concealed his faith.",
    themes: [
      {
        title: "Allah the Forgiver",
        explanation:
          "Opens emphasizing divine forgiveness for those who repent.",
      },
      {
        title: "The Secret Believer",
        explanation:
          "A man from Pharaoh's family who concealed faith until he had to speak.",
      },
      {
        title: "Arrogance's End",
        explanation:
          "Pharaoh's pride led to his destruction despite clear signs.",
      },
      {
        title: "Prayer and Response",
        explanation:
          "'Call upon Me; I will respond' - a direct divine promise.",
      },
    ],
    insights: [
      "The believing man used wisdom - concealing faith when necessary, speaking when crucial.",
      "His arguments were logical: 'If he is lying, his lie is upon him; if he is truthful, you benefit.'",
      "'Call upon Me; I will respond' is among the most comforting promises in the Quran.",
    ],
    reflectionPrompts: [
      "When should you conceal faith and when must you speak up?",
      "How often do you actually call upon Allah expecting a response?",
    ],
    relatedSurahs: [41, 28, 39],
  },

  // Surah 41: Fussilat (Explained in Detail)
  41: {
    number: 41,
    circumstances:
      "Second of the 'Ha Mim' surahs, revealed during intense persecution. When the Prophet ﷺ recited this surah to 'Utbah ibn Rabi'ah, a Quraysh leader, he was so moved he returned to his people saying, 'Leave this man alone, for his words will have great impact.'",
    themes: [
      {
        title: "Quran Explained in Detail",
        explanation:
          "The Book whose verses are clear in Arabic for understanding.",
      },
      {
        title: "Creation in Six Days",
        explanation:
          "The heavens and earth created methodically, demonstrating divine order.",
      },
      {
        title: "Good Repels Evil",
        explanation:
          "Respond to bad with good, and enemies become friends.",
      },
      {
        title: "The Skins Will Testify",
        explanation:
          "On Judgment Day, bodies will testify against their owners.",
      },
    ],
    insights: [
      "The principle 'Good and evil are not equal; repel with what is better' transformed relationships.",
      "Utbah, a hardened opponent, was momentarily stunned by the Quran's power.",
      "Our own limbs become witnesses - nothing remains hidden.",
    ],
    reflectionPrompts: [
      "Can you recall a time when responding to evil with good transformed a relationship?",
      "How would you live differently if your body would testify against you?",
    ],
    relatedSurahs: [40, 42, 36],
  },

  // Surah 42: Ash-Shura (The Consultation)
  42: {
    number: 42,
    circumstances:
      "Third of the 'Ha Mim' surahs, revealed in the late Makkan period. Named after the verse praising those who conduct their affairs through mutual consultation (shura). The surah discusses revelation, unity, and community governance.",
    themes: [
      {
        title: "Consultation (Shura)",
        explanation:
          "Believers conduct affairs through mutual consultation - a governance principle.",
      },
      {
        title: "One Religion",
        explanation:
          "The same religion was ordained for Noah, Abraham, Moses, and Jesus.",
      },
      {
        title: "No Compulsion",
        explanation:
          "The Prophet guides but cannot control hearts - Allah guides whom He wills.",
      },
      {
        title: "Patience and Forgiveness",
        explanation:
          "Those who forgive and are patient are among the resolute.",
      },
    ],
    insights: [
      "Shura (consultation) is placed alongside prayer and charity as a mark of believers.",
      "The religion's core never changed across prophets - only details differed.",
      "Forgiving when wronged is described as 'truly among matters requiring resolve.'",
    ],
    reflectionPrompts: [
      "How do you incorporate shura in your family and community decisions?",
      "When was the last time you forgave someone who wronged you?",
    ],
    relatedSurahs: [41, 43, 3],
  },

  // Surah 43: Az-Zukhruf (The Gold Ornaments)
  43: {
    number: 43,
    circumstances:
      "Fourth of the 'Ha Mim' surahs. The surah criticizes materialistic values - gold ornaments (zukhruf) represent worldly distractions. It refutes worship of angels as daughters of Allah and addresses the Quraysh's attachment to their ancestors' ways.",
    themes: [
      {
        title: "Worldly Ornaments",
        explanation:
          "Gold and luxury are trivial in Allah's sight - given even to disbelievers.",
      },
      {
        title: "Blind Following of Ancestors",
        explanation:
          "The excuse 'We found our fathers upon this' is rejected.",
      },
      {
        title: "Abraham's Example",
        explanation:
          "He rejected his father's idolatry despite family pressure.",
      },
      {
        title: "Jesus Clarified",
        explanation:
          "He was a servant of Allah, not divine - correcting Christian beliefs.",
      },
    ],
    insights: [
      "If worldly wealth indicated divine favor, disbelievers would have been given more.",
      "Abraham is the model of rejecting family tradition when it contradicts truth.",
      "Jesus will testify that he never claimed divinity.",
    ],
    reflectionPrompts: [
      "What 'gold ornaments' distract you from what truly matters?",
      "Do you follow traditions because of truth or because 'that's what we've always done'?",
    ],
    relatedSurahs: [42, 44, 19],
  },

  // Surah 44: Ad-Dukhan (The Smoke)
  44: {
    number: 44,
    circumstances:
      "Fifth of the 'Ha Mim' surahs. Revealed during a severe famine in Makkah when the sky appeared hazy from drought. The Quraysh were suffering, and the surah speaks of the 'smoke' as both a literal and eschatological sign.",
    themes: [
      {
        title: "The Smoke",
        explanation:
          "A sign of punishment - whether the Makkan famine or a future event.",
      },
      {
        title: "Revelation on a Blessed Night",
        explanation:
          "The Quran was revealed on Laylat al-Qadr, the Night of Decree.",
      },
      {
        title: "Pharaoh's Destruction",
        explanation:
          "Despite honor and luxury, arrogance led to drowning.",
      },
      {
        title: "Tree of Zaqqum",
        explanation:
          "The hellish tree that feeds the sinful - a terrifying image.",
      },
    ],
    insights: [
      "The famine made the Quraysh see 'smoke' everywhere - a partial fulfillment.",
      "Laylat al-Qadr is described as when every matter is decreed.",
      "Pharaoh's resources couldn't save him - a warning to Quraysh elites.",
    ],
    reflectionPrompts: [
      "How do you prepare for Laylat al-Qadr knowing every matter is decreed?",
      "What does Pharaoh's end teach about the limits of worldly power?",
    ],
    relatedSurahs: [43, 45, 97],
  },

  // Surah 45: Al-Jathiyah (The Kneeling)
  45: {
    number: 45,
    circumstances:
      "Sixth of the 'Ha Mim' surahs. Named after the image of nations kneeling before their record books on Judgment Day. The surah warns against following desires and mocking divine signs.",
    themes: [
      {
        title: "Nations Kneeling",
        explanation:
          "Every nation will kneel when called to its record on Judgment Day.",
      },
      {
        title: "Following Desires",
        explanation:
          "Those who take their own desires as god are truly lost.",
      },
      {
        title: "Signs in Creation",
        explanation:
          "The heavens, earth, and creatures are signs for those who reflect.",
      },
      {
        title: "Recorded Deeds",
        explanation:
          "The Book will speak with truth - nothing was left unrecorded.",
      },
    ],
    insights: [
      "Taking desire as a deity is a profound description of spiritual slavery.",
      "Kneeling before records - even the proudest will be humbled.",
      "The deniers' mockery is recorded as evidence against them.",
    ],
    reflectionPrompts: [
      "In what ways might you be following desires instead of guidance?",
      "How would you feel kneeling before your own record book?",
    ],
    relatedSurahs: [44, 46, 40],
  },

  // Surah 46: Al-Ahqaf (The Sand Dunes)
  46: {
    number: 46,
    circumstances:
      "The seventh and final 'Ha Mim' surah. Named after the sand dunes where the people of 'Ad lived. Revealed in late Makkah, it addresses the Quraysh through the story of 'Ad's destruction and mentions a group of jinn who accepted Islam after hearing the Quran.",
    themes: [
      {
        title: "Warning Through History",
        explanation:
          "The people of 'Ad were destroyed despite their strength - a warning to Quraysh.",
      },
      {
        title: "Jinn Accept Islam",
        explanation:
          "A delegation of jinn heard the Quran and returned to warn their people.",
      },
      {
        title: "Kindness to Parents",
        explanation:
          "Carry them in kindness, especially as they age - detailed commands.",
      },
      {
        title: "Patience of Messengers",
        explanation:
          "Be patient like the messengers of firm resolve before you.",
      },
    ],
    insights: [
      "The jinn recognized the Quran as truth instantly - sometimes outsiders see what insiders miss.",
      "The detailed description of honoring parents covers pregnancy, nursing, and old age.",
      "The 'Ulul-Azm' (messengers of firm resolve) are the model for patience.",
    ],
    reflectionPrompts: [
      "How are you caring for your parents in their vulnerability?",
      "What can you learn from the jinn's immediate acceptance of truth?",
    ],
    relatedSurahs: [45, 72, 31],
  },

  // Surah 47: Muhammad
  47: {
    number: 47,
    circumstances:
      "A Madinan surah revealed after the Muslims arrived in Madinah but before Badr. Named after the Prophet ﷺ, it is also called 'Al-Qital' (Fighting) as it addresses the reality of armed conflict that the Muslims would face. It prepares the community for the challenges ahead.",
    themes: [
      {
        title: "Permission to Fight",
        explanation:
          "Those who fight have their deeds not wasted - legitimizing defensive warfare.",
      },
      {
        title: "Rivers of Paradise",
        explanation:
          "Detailed description of Paradise: rivers of water, milk, wine, and honey.",
      },
      {
        title: "Hypocrites Exposed",
        explanation:
          "Some claim faith but hearts are diseased - revealed through their actions.",
      },
      {
        title: "Obeying the Prophet",
        explanation:
          "Obedience to Muhammad ﷺ is essential - rejecting him nullifies deeds.",
      },
    ],
    insights: [
      "The four rivers of Paradise counter the hardship of desert life Muslims endured.",
      "Hypocrites are recognized by their speech - 'You will surely know them by the tone.'",
      "The Prophet's ﷺ name appears, emphasizing that following him is following Allah.",
    ],
    reflectionPrompts: [
      "How do your actions reveal your true beliefs versus what you claim?",
      "What does it mean practically to obey the Prophet ﷺ today?",
    ],
    relatedSurahs: [48, 8, 63],
  },

  // Surah 48: Al-Fath (The Victory)
  48: {
    number: 48,
    circumstances:
      "Revealed after the Treaty of Hudaybiyyah (6 AH), which initially seemed like a setback but the Quran calls it a 'clear victory.' The treaty's terms favored Quraysh superficially, but it led to exponential growth in Islam and eventually the conquest of Makkah.",
    themes: [
      {
        title: "Victory in Apparent Defeat",
        explanation:
          "What seemed like loss was actually Allah's plan for greater success.",
      },
      {
        title: "Bay'at ar-Ridwan",
        explanation:
          "The pledge under the tree - Allah was pleased with those who pledged.",
      },
      {
        title: "Future Conquests Promised",
        explanation:
          "Many gains would come from this treaty - prophecy fulfilled.",
      },
      {
        title: "Description of Believers",
        explanation:
          "Hard against disbelievers, merciful among themselves - marks of true faith.",
      },
    ],
    insights: [
      "The Prophet ﷺ called this surah 'more beloved to me than all the world contains.'",
      "Those who pledged under the tree received divine pleasure - a unique honor.",
      "The prophecy of entering Makkah was fulfilled two years later.",
    ],
    reflectionPrompts: [
      "When have apparent setbacks turned into unexpected blessings?",
      "Do you balance being firm for truth while being gentle with believers?",
    ],
    relatedSurahs: [47, 110, 61],
  },

  // Surah 49: Al-Hujurat (The Private Chambers)
  49: {
    number: 49,
    circumstances:
      "A Madinan surah addressing social ethics and community behavior. Named after the private rooms of the Prophet's ﷺ wives, where some Bedouin called out disrespectfully. It establishes principles of verification, reconciliation, and human dignity.",
    themes: [
      {
        title: "Verify Before Acting",
        explanation:
          "When news comes from a fasiq (corrupt person), verify it before acting.",
      },
      {
        title: "Reconciliation",
        explanation:
          "If two groups of believers fight, make peace between them.",
      },
      {
        title: "Avoiding Mockery",
        explanation:
          "Don't mock others - they may be better than you in Allah's sight.",
      },
      {
        title: "Human Brotherhood",
        explanation:
          "All humanity from one man and woman - the most honored is the most righteous.",
      },
    ],
    insights: [
      "The verification principle prevents rumors from destroying communities.",
      "Suspicion, spying, and backbiting are equated with eating dead flesh.",
      "Diversity of nations and tribes is for recognition, not discrimination.",
    ],
    reflectionPrompts: [
      "How carefully do you verify information before sharing or acting?",
      "What assumptions about others do you need to abandon?",
    ],
    relatedSurahs: [24, 33, 58],
  },

  // Surah 50: Qaf
  50: {
    number: 50,
    circumstances:
      "A Makkan surah named after the Arabic letter Qaf. The Prophet ﷺ frequently recited it in the Eid and Friday prayers. It addresses resurrection and the Day of Judgment with vivid imagery, emphasizing that Allah is closer than one's jugular vein.",
    themes: [
      {
        title: "Closeness of Allah",
        explanation:
          "'We are closer to him than his jugular vein' - constant divine awareness.",
      },
      {
        title: "Recording Angels",
        explanation:
          "Two angels record every word - nothing escapes documentation.",
      },
      {
        title: "Death's Reality",
        explanation:
          "The stupor of death arrives - 'This is what you were trying to escape.'",
      },
      {
        title: "Hell's Capacity",
        explanation:
          "'Are you filled?' Hell asks, 'Is there more?' - a terrifying exchange.",
      },
    ],
    insights: [
      "The jugular vein metaphor emphasizes that Allah knows our innermost thoughts.",
      "Every utterance is recorded - this creates accountability for speech.",
      "The Prophet ﷺ chose this surah for public gatherings due to its impact.",
    ],
    reflectionPrompts: [
      "How would your speech change knowing two angels record every word?",
      "What does Allah's closeness mean for your daily consciousness?",
    ],
    relatedSurahs: [39, 36, 75],
  },

  // Surah 51: Adh-Dhariyat (The Scattering Winds)
  51: {
    number: 51,
    circumstances:
      "A Makkan surah opening with oaths about cosmic phenomena. It contains the story of Ibrahim hosting angels and the destruction of the people of Lot. The famous verse 'I did not create jinn and mankind except to worship Me' defines humanity's purpose.",
    themes: [
      {
        title: "Purpose of Creation",
        explanation:
          "Jinn and humans were created solely to worship Allah - the defining verse.",
      },
      {
        title: "Ibrahim's Guests",
        explanation:
          "He hosted angels unknowingly, showing ideal hospitality.",
      },
      {
        title: "Signs in Nature",
        explanation:
          "The winds, clouds, ships - all demonstrate divine power.",
      },
      {
        title: "Allah Provides",
        explanation:
          "He is the Provider (Ar-Razzaq) - no sustenance depends on creation.",
      },
    ],
    insights: [
      "'To worship Me' is the answer to 'Why do I exist?' - life's central question answered.",
      "Ibrahim's hospitality to strangers is the model for Muslim generosity.",
      "Allah needs nothing from creation - worship benefits the worshipper.",
    ],
    reflectionPrompts: [
      "How does knowing your purpose is worship change daily priorities?",
      "When did you last show hospitality like Ibrahim without knowing the guest's status?",
    ],
    relatedSurahs: [52, 11, 15],
  },

  // Surah 52: At-Tur (The Mount)
  52: {
    number: 52,
    circumstances:
      "A Makkan surah named after Mount Sinai where Moses received revelation. It opens with powerful oaths and describes the terrors of Judgment Day alongside the bliss of Paradise. When Jubayr ibn Mut'im heard the Prophet ﷺ recite this, his heart entered Islam.",
    themes: [
      {
        title: "Oaths of Certainty",
        explanation:
          "By the Mount, the Book, the frequented House - major oaths affirming truth.",
      },
      {
        title: "Punishment Inevitable",
        explanation:
          "No one can avert the punishment when it comes.",
      },
      {
        title: "Paradise's Companionship",
        explanation:
          "Families reunited in Paradise - righteous children joined to parents.",
      },
      {
        title: "Prophet Not a Soothsayer",
        explanation:
          "Accusations of poetry and madness refuted systematically.",
      },
    ],
    insights: [
      "Jubayr's heart was conquered by this surah's power - evidence of Quran's impact.",
      "Children's righteousness can elevate parents' ranks in Paradise.",
      "The challenges to produce something like the Quran remain unanswered.",
    ],
    reflectionPrompts: [
      "What verses have had a profound impact on your heart?",
      "How are you raising children whose righteousness could benefit you eternally?",
    ],
    relatedSurahs: [51, 53, 95],
  },

  // Surah 53: An-Najm (The Star)
  53: {
    number: 53,
    circumstances:
      "A Makkan surah describing the Prophet's ﷺ ascension (Mi'raj) and his encounter with Jibreel in his true angelic form. Famous for being the first surah recited publicly in Makkah, after which both believers and disbelievers prostrated at its powerful conclusion.",
    themes: [
      {
        title: "Prophet's Ascension",
        explanation:
          "He saw Jibreel at Sidrat al-Muntaha - the furthest boundary.",
      },
      {
        title: "The Heart Did Not Lie",
        explanation:
          "What the Prophet ﷺ saw was true vision, not imagination.",
      },
      {
        title: "False Goddesses",
        explanation:
          "Lat, Uzza, and Manat are mere names with no power.",
      },
      {
        title: "Individual Accountability",
        explanation:
          "No bearer of burdens bears another's burden.",
      },
    ],
    insights: [
      "Even enemies prostrated when they heard this surah - its power transcended hostility.",
      "The Prophet ﷺ saw Allah's greatest signs at the Lote Tree.",
      "Intercession belongs to Allah - false gods cannot intercede.",
    ],
    reflectionPrompts: [
      "What does the Mi'raj teach about the Prophet's ﷺ status?",
      "How do you apply 'no soul bears another's burden' to your life?",
    ],
    relatedSurahs: [17, 81, 54],
  },

  // Surah 54: Al-Qamar (The Moon)
  54: {
    number: 54,
    circumstances:
      "A Makkan surah opening with the splitting of the moon - a miracle the Prophet ﷺ performed when the Quraysh demanded a sign. Despite witnessing it, they called it 'persistent magic.' The refrain 'We have made the Quran easy to remember' appears four times.",
    themes: [
      {
        title: "The Moon Split",
        explanation:
          "A physical miracle witnessed by Quraysh, yet they still rejected.",
      },
      {
        title: "Quran Made Easy",
        explanation:
          "'We have made the Quran easy for remembrance' - divine facilitation.",
      },
      {
        title: "Destroyed Nations",
        explanation:
          "People of Noah, 'Ad, Thamud, Lot, Pharaoh - all destroyed for rejection.",
      },
      {
        title: "Swiftness of Punishment",
        explanation:
          "When Allah's decree comes, it is like the blink of an eye.",
      },
    ],
    insights: [
      "The moon splitting was witnessed and still rejected - miracles don't guarantee faith.",
      "The Quran's ease of memorization is unique - no other book is memorized by millions.",
      "Each destroyed nation thought they were exceptions - a warning against arrogance.",
    ],
    reflectionPrompts: [
      "Why don't miracles guarantee faith? What does guarantee it?",
      "How are you taking advantage of the Quran being 'made easy'?",
    ],
    relatedSurahs: [53, 69, 77],
  },

  // Surah 57: Al-Hadid (The Iron)
  57: {
    number: 57,
    circumstances:
      "A Madinan surah revealed after the community was established but facing financial challenges. It calls for spending in Allah's cause and discusses the nature of worldly life. Named after iron, which Allah 'sent down' with mighty power and benefits.",
    themes: [
      {
        title: "Spending Before Victory",
        explanation:
          "Those who spent before the conquest have greater rank than those after.",
      },
      {
        title: "Light on the Bridge",
        explanation:
          "On Judgment Day, believers will have light running before them.",
      },
      {
        title: "Worldly Life's Reality",
        explanation:
          "Life is play, amusement, beautification, boasting - then withers like plants.",
      },
      {
        title: "Iron Sent Down",
        explanation:
          "Iron has mighty power and benefits - material blessings serve divine purposes.",
      },
    ],
    insights: [
      "Everything in creation glorifies Allah - a universal chorus of praise.",
      "The hypocrites will beg for light but a wall will separate them from believers.",
      "Monasticism was invented, not prescribed - balance in worship is commanded.",
    ],
    reflectionPrompts: [
      "What would you sacrifice before seeing victory, not knowing the outcome?",
      "How do you balance worldly engagement with spiritual priorities?",
    ],
    relatedSurahs: [59, 61, 64],
  },

  // Surah 58: Al-Mujadilah (The Pleading Woman)
  58: {
    number: 58,
    circumstances:
      "A Madinan surah beginning with Khawlah bint Tha'labah's complaint about her husband's zihar (a pre-Islamic form of divorce). Allah heard her plea and revealed legislation abolishing this practice. The surah also addresses secret conversations and gatherings.",
    themes: [
      {
        title: "Allah Hears All",
        explanation:
          "Khawlah complained and Allah heard from above seven heavens.",
      },
      {
        title: "Zihar Abolished",
        explanation:
          "The unjust pre-Islamic divorce practice was forbidden with expiation.",
      },
      {
        title: "Secret Councils",
        explanation:
          "Private conversations should not be for sin and aggression.",
      },
      {
        title: "Making Room in Gatherings",
        explanation:
          "When asked to make room, do so - Allah will make room for you.",
      },
    ],
    insights: [
      "Khawlah's persistence led to revelation - one woman's voice changed Islamic law.",
      "Aisha remarked: 'Blessed is the One whose hearing encompasses all things.'",
      "The etiquette of gatherings reflects inner character.",
    ],
    reflectionPrompts: [
      "When have you seen persistence in seeking justice rewarded?",
      "How do your private conversations reflect your true character?",
    ],
    relatedSurahs: [33, 49, 65],
  },

  // Surah 59: Al-Hashr (The Gathering)
  59: {
    number: 59,
    circumstances:
      "A Madinan surah revealed after the expulsion of Banu Nadir (4 AH), a Jewish tribe that broke their treaty and plotted against the Prophet ﷺ. It contains some of Allah's most beautiful names and discusses the distribution of war gains.",
    themes: [
      {
        title: "Banu Nadir's Expulsion",
        explanation:
          "They thought their fortresses would protect them, but Allah reached them.",
      },
      {
        title: "Fay' Distribution",
        explanation:
          "Gains without fighting belong to specific categories - fair distribution.",
      },
      {
        title: "The Ansar's Preference",
        explanation:
          "They preferred the Muhajirun over themselves despite their own need.",
      },
      {
        title: "Allah's Beautiful Names",
        explanation:
          "The closing verses contain multiple divine names - profound theology.",
      },
    ],
    insights: [
      "The Ansar's preference (ithar) over themselves is praised as ultimate generosity.",
      "Security without Allah is illusion - the strongest fortress falls to His decree.",
      "The final verses are among the most theologically rich in the Quran.",
    ],
    reflectionPrompts: [
      "When have you preferred others' needs over your own despite difficulty?",
      "Which of Allah's names in this surah resonates most with your current situation?",
    ],
    relatedSurahs: [8, 33, 57],
  },

  // Surah 60: Al-Mumtahanah (The Examined Woman)
  60: {
    number: 60,
    circumstances:
      "A Madinan surah revealed after Hatib ibn Abi Balta'ah secretly warned the Quraysh about the upcoming conquest of Makkah. It also addresses how to treat believing women who migrate and the boundaries of alliance with disbelievers.",
    themes: [
      {
        title: "Hatib's Mistake",
        explanation:
          "Even a Badr veteran erred, but sincere intention was considered.",
      },
      {
        title: "Abraham's Example",
        explanation:
          "He declared separation from his polytheist people - a model.",
      },
      {
        title: "Examining Women",
        explanation:
          "Test believing women who migrate - if sincere, accept them.",
      },
      {
        title: "Friendship Boundaries",
        explanation:
          "Don't take Allah's enemies as allies, revealing secrets to them.",
      },
    ],
    insights: [
      "Hatib's excuse (protecting family in Makkah) was understood, though wrong.",
      "The believing women's examination protected the community from spies.",
      "Kindness to non-hostile non-Muslims is explicitly permitted.",
    ],
    reflectionPrompts: [
      "How do you balance family loyalty with higher principles?",
      "What boundaries do you maintain in relationships with those hostile to your faith?",
    ],
    relatedSurahs: [9, 58, 66],
  },

  // Surah 61: As-Saff (The Ranks)
  61: {
    number: 61,
    circumstances:
      "A Madinan surah addressing the importance of unity in faith and action. It rebukes those who say what they don't do and prophecies the coming of Ahmad (Muhammad ﷺ) through Jesus's words. Named after believers who stand in solid ranks.",
    themes: [
      {
        title: "Saying and Doing",
        explanation:
          "Allah despises those who say what they don't do - integrity required.",
      },
      {
        title: "Solid Ranks",
        explanation:
          "Allah loves those who fight in His cause in solid formation.",
      },
      {
        title: "Ahmad Prophesied",
        explanation:
          "Jesus announced a messenger after him named Ahmad.",
      },
      {
        title: "Helpers of Allah",
        explanation:
          "Be like Jesus's disciples who said 'We are Allah's helpers.'",
      },
    ],
    insights: [
      "The disconnect between words and actions is hateful to Allah.",
      "Jesus explicitly named Muhammad ﷺ - connecting the two prophets.",
      "Standing in ranks symbolizes unity of purpose and mutual support.",
    ],
    reflectionPrompts: [
      "Where is there a gap between what you say and what you do?",
      "How can you be a 'helper of Allah' in your current circumstances?",
    ],
    relatedSurahs: [3, 57, 62],
  },

  // Surah 62: Al-Jumu'ah (Friday)
  62: {
    number: 62,
    circumstances:
      "A Madinan surah establishing the Friday prayer obligation. Revealed when a trade caravan arrived during the Prophet's ﷺ sermon and many left to see it. It emphasizes prioritizing worship over worldly gains.",
    themes: [
      {
        title: "Friday Prayer Obligation",
        explanation:
          "When called, hasten to remembrance of Allah and leave trade.",
      },
      {
        title: "Example of Donkey",
        explanation:
          "Those who carry scripture but don't apply it are like donkeys carrying books.",
      },
      {
        title: "Messenger to the Unlettered",
        explanation:
          "Allah sent among the unlettered a messenger to purify and teach.",
      },
      {
        title: "What Allah Has is Better",
        explanation:
          "What is with Allah is better than amusement and trade.",
      },
    ],
    insights: [
      "The 'donkey carrying books' imagery is a powerful critique of knowledge without action.",
      "Friday prayer is a weekly community gathering - social and spiritual unity.",
      "Rushing to trade during sermon showed misplaced priorities - corrected by revelation.",
    ],
    reflectionPrompts: [
      "Do you carry knowledge without applying it?",
      "What 'trade' or distractions pull you away from remembrance of Allah?",
    ],
    relatedSurahs: [61, 63, 9],
  },

  // Surah 63: Al-Munafiqun (The Hypocrites)
  63: {
    number: 63,
    circumstances:
      "A Madinan surah exposing the hypocrites' characteristics, particularly Abdullah ibn Ubayy who said 'the more honored will expel the lesser' about the Muhajirun. The Prophet's ﷺ own son offered to kill his father, but the Prophet ﷺ refused.",
    themes: [
      {
        title: "Hypocrites' Appearance",
        explanation:
          "Their bodies impress you, they speak eloquently - but hollow inside.",
      },
      {
        title: "Ibn Ubayy's Words",
        explanation:
          "He claimed Madinans should expel the Muhajirun - exposed by revelation.",
      },
      {
        title: "Propped-Up Timbers",
        explanation:
          "Hypocrites are like propped wood - appear solid but are hollow.",
      },
      {
        title: "Spending Before Death",
        explanation:
          "Spend from provision before death - then no delay is granted.",
      },
    ],
    insights: [
      "Physical presence and eloquent speech don't indicate faith.",
      "Abdullah ibn Ubayy's son remained faithful despite his father's hypocrisy.",
      "The 'propped timber' metaphor captures external appearance vs internal emptiness.",
    ],
    reflectionPrompts: [
      "How do you distinguish genuine faith from impressive presentation?",
      "What are you delaying that death will not delay?",
    ],
    relatedSurahs: [9, 47, 58],
  },

  // Surah 64: At-Taghabun (The Mutual Loss and Gain)
  64: {
    number: 64,
    circumstances:
      "A Madinan surah (though some say partially Makkan) addressing the Day of Judgment when true loss and gain become apparent. It warns that family and wealth can be distractions and emphasizes obedience and spending.",
    themes: [
      {
        title: "Day of Taghabun",
        explanation:
          "The day of mutual loss - when the deceived realize their loss.",
      },
      {
        title: "Family as Trial",
        explanation:
          "Your spouses and children may be enemies to you - be cautious.",
      },
      {
        title: "Obeying Within Ability",
        explanation:
          "Fear Allah as much as you can - mercy within obligation.",
      },
      {
        title: "Lending to Allah",
        explanation:
          "If you lend Allah a good loan, He will multiply it.",
      },
    ],
    insights: [
      "The mutual loss: believers gain what disbelievers lose, and vice versa.",
      "Family can distract from duty - love must not override obedience.",
      "'As much as you can' shows Islam's practicality and mercy.",
    ],
    reflectionPrompts: [
      "Has family ever held you back from what's right?",
      "What good loan can you give Allah today?",
    ],
    relatedSurahs: [57, 65, 59],
  },

  // Surah 65: At-Talaq (The Divorce)
  65: {
    number: 65,
    circumstances:
      "A Madinan surah detailing divorce procedures with precision. It protects women's rights during the waiting period ('iddah), ensures housing, and establishes the principle that 'Allah will provide a way out' for those who fear Him.",
    themes: [
      {
        title: "Proper Divorce Procedure",
        explanation:
          "Divorce during purity, count the 'iddah, don't expel women unjustly.",
      },
      {
        title: "Allah Provides a Way Out",
        explanation:
          "Whoever fears Allah, He makes a way out and provides unexpectedly.",
      },
      {
        title: "Housing Rights",
        explanation:
          "House divorced women according to your means - don't harm them.",
      },
      {
        title: "Nursing Compensation",
        explanation:
          "If they nurse your children, compensate them fairly.",
      },
    ],
    insights: [
      "The 'way out' verse is one of the most comforting for those in difficulty.",
      "Women's rights during divorce are detailed - housing, maintenance, dignity.",
      "The surah ends warning of destroyed nations - divorce laws are serious.",
    ],
    reflectionPrompts: [
      "How do you see taqwa (consciousness of Allah) creating solutions?",
      "In difficult relationships, how do you maintain rights while seeking solutions?",
    ],
    relatedSurahs: [2, 4, 66],
  },

  // Surah 66: At-Tahrim (The Prohibition)
  66: {
    number: 66,
    circumstances:
      "A Madinan surah addressing a domestic situation where the Prophet ﷺ forbade himself something lawful to please his wives. It discusses household matters while drawing lessons about the wives of Noah and Lot versus Pharaoh's wife and Maryam.",
    themes: [
      {
        title: "Don't Prohibit the Lawful",
        explanation:
          "The Prophet ﷺ was gently corrected for forbidding what Allah made lawful.",
      },
      {
        title: "Protecting Families",
        explanation:
          "Protect yourselves and families from Fire - active spiritual leadership.",
      },
      {
        title: "Contrasting Women",
        explanation:
          "Noah's and Lot's wives were disbelievers; Pharaoh's wife and Maryam were righteous.",
      },
      {
        title: "Sincere Repentance",
        explanation:
          "Turn to Allah with sincere repentance (tawbatan nasuhah).",
      },
    ],
    insights: [
      "Even prophets' households had tensions - normalizing marital challenges.",
      "A woman's faith is independent - righteous despite an evil spouse, or evil despite a righteous spouse.",
      "'Tawbatan nasuhah' means repentance so sincere one never returns to the sin.",
    ],
    reflectionPrompts: [
      "How do you actively protect your family from spiritual harm?",
      "What does sincere repentance look like in your life?",
    ],
    relatedSurahs: [33, 65, 24],
  },

  // Surah 69: Al-Haqqah (The Inevitable Reality)
  69: {
    number: 69,
    circumstances:
      "A Makkan surah emphasizing the certainty of Judgment Day. It vividly describes the destruction of past nations and the dramatic events of resurrection. The opening rhetorical question 'What is the Inevitable?' creates urgency and awe.",
    themes: [
      {
        title: "The Inevitable Hour",
        explanation:
          "A name for Judgment Day that emphasizes its absolute certainty.",
      },
      {
        title: "Destroyed Nations",
        explanation:
          "Thamud, 'Ad, Pharaoh - all destroyed by specific punishments.",
      },
      {
        title: "Books of Deeds",
        explanation:
          "Right hand receives book with joy; left hand with regret and chains.",
      },
      {
        title: "Quran's Authenticity",
        explanation:
          "Not poetry or soothsaying - a revelation from the Lord of worlds.",
      },
    ],
    insights: [
      "The screaming wind that destroyed 'Ad lasted seven nights and eight days.",
      "The one who receives his book in left hand will wish he had never been given it.",
      "If the Prophet ﷺ fabricated anything, his life vein would be cut - proving his honesty.",
    ],
    reflectionPrompts: [
      "Which hand do you expect to receive your book in? What can you change now?",
      "How does the certainty of judgment affect your daily choices?",
    ],
    relatedSurahs: [56, 77, 78],
  },

  // Surah 70: Al-Ma'arij (The Ascending Stairways)
  70: {
    number: 70,
    circumstances:
      "A Makkan surah named after the stairways by which angels ascend. A skeptic asked mockingly when punishment would come; the surah responds that angels take 50,000 years to ascend - divine time differs from human perception.",
    themes: [
      {
        title: "Angels Ascending",
        explanation:
          "Angels and Spirit ascend in a day equal to 50,000 years.",
      },
      {
        title: "Human Nature",
        explanation:
          "Man is created anxious, impatient, withholding when blessed.",
      },
      {
        title: "Exceptions",
        explanation:
          "Those who pray, give charity, guard chastity - they overcome human weakness.",
      },
      {
        title: "No Ransom Accepted",
        explanation:
          "On that Day, no relative or ransom can save anyone.",
      },
    ],
    insights: [
      "The critique of human nature is balanced by exceptions who struggle against it.",
      "Family bonds dissolve on Judgment Day - each soul for itself.",
      "Prayer is described as constant (da'imun) - not sporadic but sustained.",
    ],
    reflectionPrompts: [
      "How do you combat the natural tendency toward anxiety and impatience?",
      "Is your prayer 'constant' or sporadic?",
    ],
    relatedSurahs: [69, 71, 79],
  },

  // Surah 71: Nuh (Noah)
  71: {
    number: 71,
    circumstances:
      "A Makkan surah entirely dedicated to Prophet Nuh's story. He preached for 950 years yet few believed. The surah captures his prayers, methods, frustration, and ultimate supplication against his people - a mirror for the Prophet ﷺ facing similar rejection.",
    themes: [
      {
        title: "Decades of Preaching",
        explanation:
          "Nuh called his people night and day for centuries with little result.",
      },
      {
        title: "Multiple Methods",
        explanation:
          "He tried public preaching, private counsel, appeals to reason and emotion.",
      },
      {
        title: "Stubborn Rejection",
        explanation:
          "They put fingers in ears, covered themselves, persisted arrogantly.",
      },
      {
        title: "Final Supplication",
        explanation:
          "Nuh prayed against them only after Allah confirmed none would believe.",
      },
    ],
    insights: [
      "950 years of effort - success is measured by faithfulness, not numbers.",
      "Nuh's diverse methods show prophetic creativity in dawah.",
      "The supplication against his people came only after divine confirmation.",
    ],
    reflectionPrompts: [
      "How patient are you in calling others to good, even without seeing results?",
      "What methods do you vary in communicating truth?",
    ],
    relatedSurahs: [11, 23, 54],
  },

  // Surah 72: Al-Jinn
  72: {
    number: 72,
    circumstances:
      "A Makkan surah revealing that a group of jinn listened to the Prophet ﷺ reciting Quran and returned to their people as believers and warners. It provides rare insight into the jinn world, their diversity in faith, and their acknowledgment of Muhammad ﷺ.",
    themes: [
      {
        title: "Jinn Accept Islam",
        explanation:
          "They heard the Quran and recognized it as guiding to truth.",
      },
      {
        title: "Diversity Among Jinn",
        explanation:
          "Some are Muslims, some deviated - like humans, they have free will.",
      },
      {
        title: "Heaven Guarded",
        explanation:
          "Jinn can no longer eavesdrop on heaven - shooting stars guard it.",
      },
      {
        title: "Mosques for Allah Alone",
        explanation:
          "Worship spaces are for Allah exclusively - no partners.",
      },
    ],
    insights: [
      "The jinn's immediate recognition of truth contrasts with Quraysh's stubborn denial.",
      "Even the unseen realm has believers and disbelievers - accountability is universal.",
      "The Prophet ﷺ was sent to both humans and jinn.",
    ],
    reflectionPrompts: [
      "What barriers prevent you from recognizing truth as quickly as these jinn did?",
      "How does knowing jinn exist affect your worldview?",
    ],
    relatedSurahs: [46, 55, 15],
  },

  // Surah 73: Al-Muzzammil (The Enshrouded One)
  73: {
    number: 73,
    circumstances:
      "A very early Makkan surah addressing the Prophet ﷺ as 'the one wrapped in garments.' It establishes night prayer (tahajjud) as preparation for the weighty revelation to come. Initially, long night prayers were obligatory, later reduced to what is feasible.",
    themes: [
      {
        title: "Night Prayer Established",
        explanation:
          "Stand in prayer at night - half, less, or more - reciting Quran.",
      },
      {
        title: "Weighty Words Coming",
        explanation:
          "A heavy word will be cast upon you - preparation through worship.",
      },
      {
        title: "Night's Special Quality",
        explanation:
          "Night prayer is more impactful for the soul and clearer for recitation.",
      },
      {
        title: "Mercy in Reduction",
        explanation:
          "Allah knows you cannot maintain it - pray what is easy for you.",
      },
    ],
    insights: [
      "The Prophet ﷺ was prepared for revelation through extensive night worship.",
      "Night hours are described as having stronger spiritual impact.",
      "The reduction shows Allah's mercy - He doesn't burden beyond capacity.",
    ],
    reflectionPrompts: [
      "What spiritual disciplines prepare you for life's challenges?",
      "How can you incorporate even small amounts of night prayer?",
    ],
    relatedSurahs: [74, 76, 32],
  },

  // Surah 74: Al-Muddathir (The Cloaked One)
  74: {
    number: 74,
    circumstances:
      "Among the earliest revelations. After the terrifying first encounter with Jibreel, the Prophet ﷺ returned home trembling, asking Khadijah to cover him. Then came: 'O you wrapped in garments, arise and warn!' - the command to begin public preaching.",
    themes: [
      {
        title: "Command to Warn",
        explanation:
          "Rise and warn - the prophetic mission officially begins.",
      },
      {
        title: "Magnify Your Lord",
        explanation:
          "Declare Allah's greatness before declaring the message.",
      },
      {
        title: "Saqar (Hell)",
        explanation:
          "Nineteen angels guard it - a response to mockery about this number.",
      },
      {
        title: "Self-Inflicted Doom",
        explanation:
          "The disbeliever who rejected truth brought punishment upon himself.",
      },
    ],
    insights: [
      "The transition from private terror to public mission happened quickly.",
      "Purification (tahhir) precedes preaching - internal preparation first.",
      "The mockers who laughed at 'nineteen angels' didn't understand divine wisdom.",
    ],
    reflectionPrompts: [
      "What fears hold you back from fulfilling your calling?",
      "Have you purified your intention before calling others?",
    ],
    relatedSurahs: [73, 96, 68],
  },

  // Surah 75: Al-Qiyamah (The Resurrection)
  75: {
    number: 75,
    circumstances:
      "A Makkan surah opening with an oath by the Day of Resurrection and the self-reproaching soul. It addresses those who denied resurrection, describing the moment of death, the gathering of bones, and the soul's self-awareness.",
    themes: [
      {
        title: "Self-Reproaching Soul",
        explanation:
          "The conscience (nafs lawwamah) that blames itself is honored by Allah's oath.",
      },
      {
        title: "Resurrection of Bones",
        explanation:
          "Can bones be reassembled? Yes, even fingertips can be perfectly recreated.",
      },
      {
        title: "Moment of Death",
        explanation:
          "When soul reaches collarbone, no healer or reciter can help.",
      },
      {
        title: "Faces Radiant and Dark",
        explanation:
          "That Day, some faces beam with light; others know disaster awaits.",
      },
    ],
    insights: [
      "The fingertip detail (unique fingerprints) is a remarkable scientific allusion.",
      "The self-blaming soul is praised - self-awareness of sin leads to repentance.",
      "Death's inevitability makes worldly attachment futile.",
    ],
    reflectionPrompts: [
      "How active is your self-reproaching soul in correcting you?",
      "What would you do differently if you knew death was at your collarbone?",
    ],
    relatedSurahs: [56, 69, 82],
  },

  // Surah 76: Al-Insan/Ad-Dahr (The Human/Time)
  76: {
    number: 76,
    circumstances:
      "A Madinan surah (though some say Makkan) describing human creation from a drop, then guidance to gratitude or ingratitude. It contains detailed Paradise descriptions and was revealed about Ali, Fatimah, and their family giving away food while fasting.",
    themes: [
      {
        title: "Human's Humble Origin",
        explanation:
          "There was a time when human was nothing mentioned - created from a drop.",
      },
      {
        title: "Grateful or Ungrateful",
        explanation:
          "We guided the way; whether grateful or ungrateful is their choice.",
      },
      {
        title: "Paradise in Detail",
        explanation:
          "Garments of silk, silver vessels, spring of Salsabil - vivid imagery.",
      },
      {
        title: "Feeding Despite Need",
        explanation:
          "They feed the poor, orphan, captive despite loving the food themselves.",
      },
    ],
    insights: [
      "The occasion of revelation about Ali's family shows the reward for sacrificial giving.",
      "Paradise imagery includes sensory pleasures sanctified by divine context.",
      "Human insignificance before creation contrasts with potential through gratitude.",
    ],
    reflectionPrompts: [
      "Would you give away food you desperately need?",
      "How does knowing your humble origin affect your pride?",
    ],
    relatedSurahs: [32, 56, 83],
  },

  // Surah 77: Al-Mursalat (Those Sent Forth)
  77: {
    number: 77,
    circumstances:
      "A Makkan surah opening with oaths about winds or angels sent forth. The refrain 'Woe that Day to the deniers' repeats ten times, creating a powerful rhythmic warning. It describes creation's signs and Judgment Day's terrors.",
    themes: [
      {
        title: "Winds/Angels Sent",
        explanation:
          "Oaths by those sent forth in succession - cosmic or angelic forces.",
      },
      {
        title: "Woe to Deniers",
        explanation:
          "Ten times the refrain repeats - emphasizing the warning.",
      },
      {
        title: "Creation Signs",
        explanation:
          "Did We not create you from fluid? Place you in a secure lodging?",
      },
      {
        title: "No Shade from Fire",
        explanation:
          "That Day, no cool shade - only shadows of smoke in three columns.",
      },
    ],
    insights: [
      "The repetitive refrain creates almost musical emphasis on accountability.",
      "The secure lodging (womb) is a sign of Allah's care from the beginning.",
      "Deniers are told to enjoy briefly - their enjoyment is temporary.",
    ],
    reflectionPrompts: [
      "What signs of creation do you overlook daily?",
      "How does repetition in the Quran affect your attention?",
    ],
    relatedSurahs: [56, 78, 79],
  },

  // Surah 78: An-Naba (The News)
  78: {
    number: 78,
    circumstances:
      "A Makkan surah beginning with 'About what are they asking?' - referring to debates about resurrection. It systematically presents creation's evidence and describes both Paradise's delights and Hell's punishments in vivid contrast.",
    themes: [
      {
        title: "The Great News",
        explanation:
          "The resurrection they dispute - about it they will come to know.",
      },
      {
        title: "Creation Evidence",
        explanation:
          "Earth as bed, mountains as pegs, pairs created, night for rest.",
      },
      {
        title: "Day of Sorting",
        explanation:
          "The trumpet blown, people come in crowds, heaven opened with gates.",
      },
      {
        title: "Paradise and Hell Contrasted",
        explanation:
          "Gardens, grapes, companions vs. ambush, boiling water, scalding wind.",
      },
    ],
    insights: [
      "The list of creation signs builds an overwhelming case for the Creator's power.",
      "Hell is described as 'lying in ambush' - waiting for the arrogant.",
      "Paradise rewards are physical and spiritual - both dignified and delightful.",
    ],
    reflectionPrompts: [
      "Which creation sign mentioned most powerfully points you to Allah?",
      "How do you prepare for the 'Day of Sorting'?",
    ],
    relatedSurahs: [77, 79, 80],
  },

  // Surah 79: An-Nazi'at (Those Who Pull Out)
  79: {
    number: 79,
    circumstances:
      "A Makkan surah opening with oaths about angels who extract souls - some violently (from disbelievers), some gently (from believers). It recounts Musa's encounter with Pharaoh and describes the cataclysmic events of Judgment Day.",
    themes: [
      {
        title: "Angels Extracting Souls",
        explanation:
          "Some pull out violently, others draw out gently - based on the person's state.",
      },
      {
        title: "Musa and Pharaoh",
        explanation:
          "The great story of confrontation between truth and arrogant power.",
      },
      {
        title: "The Great Overwhelming",
        explanation:
          "When the greatest calamity comes, man will remember his striving.",
      },
      {
        title: "Paradise and Hell",
        explanation:
          "Whoever feared standing before Allah has Paradise; who transgressed has Fire.",
      },
    ],
    insights: [
      "The violent extraction for disbelievers vs gentle drawing for believers motivates preparation.",
      "Pharaoh's story is summarized as pure arrogance meeting divine power.",
      "'When is the Hour?' - the Prophet ﷺ is told he's only a warner, not its timekeeper.",
    ],
    reflectionPrompts: [
      "Do you fear standing before your Lord? How does that fear manifest?",
      "What kind of soul extraction do you expect - and are you preparing accordingly?",
    ],
    relatedSurahs: [78, 80, 81],
  },

  // Surah 93: Ad-Duha (The Morning Light)
  93: {
    number: 93,
    circumstances:
      "Revealed after a painful pause in revelation that lasted several weeks or months. The Quraysh mocked the Prophet ﷺ, saying his Lord had abandoned him. His aunt or a neighbor reportedly taunted, 'Your devil has forsaken you.' This caused deep distress to the Prophet ﷺ. Then came this surah - a divine embrace reassuring him that Allah had not abandoned him and would never abandon him. It marks one of the most tender moments in Quranic revelation.",
    themes: [
      {
        title: "Divine Comfort",
        explanation:
          "Allah reassures His beloved that silence is not abandonment - sometimes the pause itself is part of the plan.",
      },
      {
        title: "Past Blessings as Proof",
        explanation:
          "Allah reminds the Prophet of his orphanhood, poverty, and confusion - all overcome through divine care.",
      },
      {
        title: "The Ascending Future",
        explanation:
          "The Hereafter will be better than the present, and each stage of life will be better than the last.",
      },
      {
        title: "Gratitude Through Action",
        explanation:
          "Remembering past blessings should translate into caring for orphans, helping the needy, and proclaiming Allah's favor.",
      },
    ],
    insights: [
      "Difficult periods are temporary tests, not signs of divine displeasure or abandonment.",
      "Our past struggles, once overcome, become proof of Allah's continuous care.",
      "Gratitude is expressed through action - caring for others as we were cared for.",
      "The night (difficulty) always gives way to morning (relief) - this is Allah's pattern.",
    ],
    reflectionPrompts: [
      "What past difficulties in your life now appear as hidden blessings?",
      "How can you show gratitude for being guided by helping others find their way?",
    ],
    relatedSurahs: [94, 108],
  },

  // Surah 94: Ash-Sharh (The Expansion)
  94: {
    number: 94,
    circumstances:
      "Revealed immediately after or alongside Ad-Duha, continuing the same theme of divine comfort. Some scholars consider them essentially one surah. It references the 'expansion of the chest' - when the Prophet's chest was spiritually opened and purified, removing the burden of pre-Islamic confusion. This surah provides the famous principle 'With hardship comes ease' - repeated twice for emphasis, promising that relief is inherent within every difficulty.",
    themes: [
      {
        title: "Spiritual Expansion",
        explanation:
          "Allah expanded the Prophet's heart for faith, wisdom, and resilience - a gift that enabled his mission.",
      },
      {
        title: "Burden Lifted",
        explanation:
          "The weight of confusion and the burden of prophethood were made bearable through divine support.",
      },
      {
        title: "Hardship Contains Ease",
        explanation:
          "The Arabic uses definite article for hardship (singular) but indefinite for ease - one hardship, multiple eases.",
      },
      {
        title: "Active Gratitude",
        explanation:
          "When free from one task, engage in another good deed; always turn to Allah in devotion.",
      },
    ],
    insights: [
      "The same difficulty (al-usr) is mentioned twice, but ease (yusr) appears twice without 'the' - suggesting multiple eases for each hardship.",
      "Spiritual capacity can be expanded - the heart that once found guidance heavy can be opened to embrace it.",
      "Relief doesn't come after hardship ends, but within it - they coexist.",
    ],
    reflectionPrompts: [
      "Can you identify the 'ease' that exists within your current challenges?",
      "What burdens has Allah lifted from you that you may have forgotten?",
    ],
    relatedSurahs: [93, 73],
  },

  // Surah 96: Al-Alaq (The Clot)
  96: {
    number: 96,
    circumstances:
      "The first five verses are the very first Quranic revelation, received in the Cave of Hira during the month of Ramadan, 610 CE. The Prophet ﷺ, then 40 years old, was approached by Jibreel who commanded 'Read!' (Iqra'). The Prophet, unlettered, responded 'I cannot read.' After being embraced tightly three times, the angel recited these verses. The Prophet ﷺ descended trembling to Khadijah who comforted him with the famous words: 'Allah will never disgrace you.' The remaining verses were revealed later, addressing Abu Jahl's opposition.",
    themes: [
      {
        title: "Knowledge Through Revelation",
        explanation:
          "The first command is 'Read/Recite' - establishing that Islam is built on knowledge, learning, and divine guidance.",
      },
      {
        title: "Human Creation",
        explanation:
          "Humanity's humble origin from a clinging clot contrasts with our potential for knowledge and closeness to Allah.",
      },
      {
        title: "The Pen's Honor",
        explanation:
          "Allah taught by the pen - writing and knowledge transmission are sacred acts in Islam.",
      },
      {
        title: "Warning Against Arrogance",
        explanation:
          "The later verses warn against those who, seeing themselves as self-sufficient, oppose truth and obstruct worship.",
      },
    ],
    insights: [
      "The first revelation wasn't about law or ritual, but about learning - establishing Islam's intellectual foundation.",
      "Being unlettered didn't disqualify the Prophet; Allah teaches whomever He wills.",
      "Human arrogance stems from perceiving self-sufficiency, forgetting our complete dependence on Allah.",
      "The command 'Iqra' continues - every Muslim is commanded to seek knowledge.",
    ],
    reflectionPrompts: [
      "What does it mean that the first divine command was about reading and learning?",
      "How does remembering your humble origins affect your relationship with knowledge?",
    ],
    relatedSurahs: [68, 73, 74],
  },

  // Surah 112: Al-Ikhlas (Sincerity/Purity)
  112: {
    number: 112,
    circumstances:
      "Revealed when the Quraysh polytheists and some Jewish scholars asked the Prophet to describe Allah: 'What is your Lord made of? Gold, silver, or what?' This surah came as the definitive answer - the purest statement of monotheism. The Prophet ﷺ said it equals one-third of the Quran in meaning, as the Quran's message revolves around Allah's nature, His commands, and the afterlife. This surah comprehensively addresses Allah's nature.",
    themes: [
      {
        title: "Absolute Oneness",
        explanation:
          "Allah is One (Ahad) - not just numerically, but in His essence, attributes, and actions. Nothing compares.",
      },
      {
        title: "Self-Sufficiency",
        explanation:
          "As-Samad means the one to whom all creation turns in need, while He needs nothing from anyone.",
      },
      {
        title: "Beyond Reproduction",
        explanation:
          "Allah neither begets nor is begotten - rejecting both the pagan idea of divine offspring and any origin for Allah.",
      },
      {
        title: "Absolute Uniqueness",
        explanation:
          "Nothing is comparable to Him - no analogy, no partner, no equal in any attribute.",
      },
    ],
    insights: [
      "Four verses capture the essence of divine reality more precisely than volumes of philosophy.",
      "Every false belief about God is corrected: anthropomorphism, trinity, divine children, multiple gods.",
      "Reciting this surah is beloved to Allah - a companion who recited it repeatedly was told 'Your love for it will enter you into Paradise.'",
    ],
    reflectionPrompts: [
      "How does truly understanding Allah's oneness affect how you worship?",
      "What modern forms of 'shirk' (associating partners) does this surah address?",
    ],
    relatedSurahs: [1, 113, 114],
  },

  // Surah 113: Al-Falaq (The Daybreak)
  113: {
    number: 113,
    circumstances:
      "Revealed alongside Al-Nas as the two protective surahs (Al-Mu'awwidhatan). According to authentic narrations, they were revealed when the Prophet ﷺ was afflicted by magic cast by Labid ibn A'sam, causing him distress. Jibreel came and taught him these surahs for protection. The Prophet ﷺ would recite them every night before sleep, blowing into his hands and wiping over his body. He commanded us to recite them, saying 'You will never recite anything like them.'",
    themes: [
      {
        title: "Seeking Divine Refuge",
        explanation:
          "True protection comes only from Allah - we are taught to consciously seek His shelter from harm.",
      },
      {
        title: "Darkness and Evil",
        explanation:
          "Night's darkness symbolizes times of vulnerability when evil intensifies - requiring heightened awareness.",
      },
      {
        title: "Envy's Danger",
        explanation:
          "The envier's evil eye is real and dangerous enough to warrant divine protection - a reminder to guard our hearts.",
      },
      {
        title: "Hidden Harms",
        explanation:
          "Magic and secret plots exist - protection comes through connection to Allah, not paranoia.",
      },
    ],
    insights: [
      "Acknowledging that evil exists and can harm us is not weakness but wisdom - leading us to the true Protector.",
      "The Prophet ﷺ himself was affected by magic, showing that trials can reach anyone, but relief comes from Allah.",
      "Regular recitation creates a spiritual shield - prophetic medicine for the soul.",
    ],
    reflectionPrompts: [
      "What 'darkness' in your life requires you to seek Allah's protection more consciously?",
      "How does knowing the Prophet ﷺ sought refuge affect your own practice of these surahs?",
    ],
    relatedSurahs: [112, 114],
  },

  // Surah 114: An-Nas (Mankind)
  114: {
    number: 114,
    circumstances:
      "The final surah in Quranic order, revealed alongside Al-Falaq for protection against evil. While Al-Falaq addresses external evils, An-Nas focuses on the internal threat - the whispering of Shaytan that enters the heart. The surah emphasizes Allah as Lord, King, and God of mankind, invoking His relationship with humanity three times before describing the lurking whisperer who retreats when Allah is remembered.",
    themes: [
      {
        title: "Triple Divine Relationship",
        explanation:
          "Rabb (Lord/Nurturer), Malik (King/Sovereign), and Ilah (God) - three dimensions of Allah's relationship with us.",
      },
      {
        title: "The Whispering Enemy",
        explanation:
          "Shaytan's method is subtle suggestion in the heart - not force, but insidious influence.",
      },
      {
        title: "The Retreating Whisperer",
        explanation:
          "When we remember Allah, Shaytan retreats (khannas) - showing dhikr's protective power.",
      },
      {
        title: "Jinn and Human Tempters",
        explanation:
          "Evil whispers come from both jinn (devils) and humans (bad companions, media, thoughts) - both require protection.",
      },
    ],
    insights: [
      "The Quran ends not with a statement but a prayer - our final lesson is to keep asking Allah for protection.",
      "Shaytan cannot force us; he can only suggest. Our agency remains - we choose whether to listen.",
      "The remedy is simple: remember Allah. When you do, the whisperer has no power.",
      "Human 'shayateen' - people who tempt us to wrong - are as dangerous as jinn.",
    ],
    reflectionPrompts: [
      "What recurring 'whispers' do you need to seek protection from?",
      "How can you increase dhikr to make the whisperer retreat more often?",
    ],
    relatedSurahs: [112, 113],
  },

  // Surah 2: Al-Baqarah (The Cow)
  2: {
    number: 2,
    circumstances:
      "The longest surah, revealed gradually throughout the Madinan period over approximately eight years. It addresses the new Muslim community's needs: establishing laws, refuting arguments from Jewish tribes in Madinah, and providing comprehensive guidance for building a just society. Named after the story of the cow that the Israelites were commanded to sacrifice - a narrative illustrating excessive questioning and reluctance to obey. The final two verses were revealed during Mi'raj, the night journey.",
    themes: [
      {
        title: "Guidance for the Mindful",
        explanation:
          "Opens declaring the Quran as guidance for the muttaqeen - those conscious of Allah and seeking direction.",
      },
      {
        title: "Stories of Previous Nations",
        explanation:
          "Detailed accounts of Bani Israel serve as lessons - their mistakes warn us, their prophets inspire us.",
      },
      {
        title: "Legal Foundations",
        explanation:
          "Fasting, Hajj, jihad, financial laws, marriage, divorce - the building blocks of Islamic society.",
      },
      {
        title: "The Throne Verse",
        explanation:
          "Ayat al-Kursi (2:255) is the greatest verse in the Quran - a comprehensive statement of Allah's sovereignty.",
      },
    ],
    insights: [
      "The story of Adam establishes human potential for both error and repentance - we can return to Allah.",
      "The cow story shows how simple commands become difficult when we complicate them with excessive questions.",
      "Verse 286: 'Allah does not burden a soul beyond its capacity' - our tests are calibrated to our strength.",
    ],
    reflectionPrompts: [
      "Do you ever complicate simple commands through excessive questioning?",
      "How does knowing Allah tests within your capacity change your response to hardship?",
    ],
    relatedSurahs: [1, 3, 5],
  },

  // Surah 55: Ar-Rahman (The Most Merciful)
  55: {
    number: 55,
    circumstances:
      "A Makkan surah unique for its poetic repetition - 'Which of your Lord's favors will you deny?' appears 31 times, addressing both humans and jinn. It was one of the first surahs recited publicly when the Prophet ﷺ gathered both Quraysh and jinn at Ukaz fair. The jinn responded positively while many humans rejected. It catalogs Allah's countless blessings, overwhelming the listener with gratitude.",
    themes: [
      {
        title: "The Divine Name Ar-Rahman",
        explanation:
          "Opens with Allah's most intimate name of mercy - setting the entire surah's tone of divine generosity.",
      },
      {
        title: "Teaching the Quran",
        explanation:
          "The first blessing mentioned is teaching the Quran - establishing knowledge of revelation as the greatest gift.",
      },
      {
        title: "Balance in Creation",
        explanation:
          "Justice and balance (mizan) pervade creation - from cosmic scales to marketplace transactions.",
      },
      {
        title: "Gardens of Paradise",
        explanation:
          "Detailed descriptions of Paradise's rewards - a preview that makes this world's sacrifices worthwhile.",
      },
    ],
    insights: [
      "The repetition isn't redundancy but emphasis - like waves of blessing overwhelming denial.",
      "Addressing humans and jinn together shows our shared accountability and shared capacity for blessing.",
      "Beauty is mentioned as a blessing - aesthetics matter in Islam; Allah made things beautiful not just functional.",
    ],
    reflectionPrompts: [
      "Of the blessings listed, which do you take most for granted?",
      "How would your day change if you genuinely couldn't deny each of Allah's favors?",
    ],
    relatedSurahs: [56, 76],
  },

  // Surah 56: Al-Waqi'ah (The Event)
  56: {
    number: 56,
    circumstances:
      "A Makkan surah about the Day of Judgment, called 'The Event' because it will inevitably occur. The Prophet ﷺ said: 'Whoever recites Al-Waqi'ah every night will never be afflicted by poverty.' It divides humanity into three groups on that Day and provides vivid descriptions of each group's fate. The surah also challenges humans to reflect on their food, water, and fire - daily necessities they couldn't create.",
    themes: [
      {
        title: "The Three Groups",
        explanation:
          "Humanity divides into: the foremost (sabiqun), companions of the right, and companions of the left - three distinct destinies.",
      },
      {
        title: "Inevitable Reality",
        explanation:
          "The Event cannot be denied or delayed - calling it 'waqi'ah' (that which falls/happens) emphasizes certainty.",
      },
      {
        title: "Signs in Sustenance",
        explanation:
          "Your crops, water, and fire - did you create them? Daily necessities prove your dependence on Allah.",
      },
      {
        title: "The Quran's Honor",
        explanation:
          "The surah's end emphasizes the Quran's nobility - it should not be touched except by the purified.",
      },
    ],
    insights: [
      "The three groups aren't binary - there's a special elite (sabiqun) who go beyond mere 'good enough.'",
      "Contemplating the origin of your food and drink is itself an act of worship and recognition.",
      "The connection between this surah and provision (rizq) shows that worldly sustenance connects to eternal awareness.",
    ],
    reflectionPrompts: [
      "Which of the three groups do you aspire to, and what distinguishes them?",
      "When you eat and drink, do you remember you couldn't create these essentials?",
    ],
    relatedSurahs: [55, 78],
  },

  // Surah 67: Al-Mulk (The Dominion)
  67: {
    number: 67,
    circumstances:
      "A Makkan surah the Prophet ﷺ called 'the protector from the punishment of the grave.' He would recite it every night before sleeping and said: 'I wish it was in the heart of every believer.' Its 30 verses are easy to memorize, making this protection accessible. The surah challenges readers to find any flaw in creation and describes the stars as missiles against devils, addressing the Quraysh who used celestial navigation.",
    themes: [
      {
        title: "Divine Sovereignty",
        explanation:
          "All dominion (mulk) belongs to Allah - He is capable of all things, including resurrection.",
      },
      {
        title: "Death as Test",
        explanation:
          "Life and death were created to test which of us is best in deeds - quality over quantity.",
      },
      {
        title: "Flawless Creation",
        explanation:
          "Look again and again at the sky - you'll find no inconsistency. Creation's perfection proves the Creator.",
      },
      {
        title: "Warning to Deniers",
        explanation:
          "Hellfire awaits those who reject - they'll admit 'If only we had listened or used reason.'",
      },
    ],
    insights: [
      "We're tested not on how much we do, but how well - 'which of you is best in deed,' not 'most in deed.'",
      "The surah intercedes in the grave - making nightly recitation a shield for one's most vulnerable moment.",
      "Deniers will confess they didn't listen or reason - two faculties we must engage with revelation.",
    ],
    reflectionPrompts: [
      "Are you focused on the quantity or quality of your deeds?",
      "Have you made this surah's nightly recitation a habit for its promised protection?",
    ],
    relatedSurahs: [36, 78],
  },

  // Surah 18: Al-Kahf (The Cave)
  18: {
    number: 18,
    circumstances:
      "Revealed when the Quraysh, advised by Madinan Jews, tested the Prophet ﷺ with three questions: about young men who slept in a cave, a great traveler, and the soul. This surah answered two of them. The Prophet ﷺ prescribed reciting it every Friday, promising light between two Fridays. The first and last ten verses protect from Dajjal (the Antichrist). It contains four profound stories, each addressing different trials.",
    themes: [
      {
        title: "Protection from Trials",
        explanation:
          "Four stories address four fitnahs: faith (youth), wealth (two gardens), knowledge (Musa and Khidr), power (Dhul-Qarnayn).",
      },
      {
        title: "True Wealth",
        explanation:
          "The proud garden owner lost everything; his humble companion's 'What Allah wills' protected him from envy and loss.",
      },
      {
        title: "Hidden Wisdom",
        explanation:
          "Khidr's actions seemed wrong until explained - teaching us that Allah's wisdom transcends our limited understanding.",
      },
      {
        title: "Power with Righteousness",
        explanation:
          "Dhul-Qarnayn used his authority justly, refusing to oppress even when able - a model for ethical leadership.",
      },
    ],
    insights: [
      "The youth fled to a cave for faith - sometimes protecting religion requires physical withdrawal.",
      "Saying 'Ma sha Allah' (what Allah wills) protects blessings from envy - including our own self-admiration.",
      "Musa ﷺ, despite his prophethood, was sent to learn from another - we never stop being students.",
      "The Dajjal connection suggests these four trials will intensify before the end times.",
    ],
    reflectionPrompts: [
      "Which of the four trials (faith, wealth, knowledge, power) is most challenging for you?",
      "When facing events you don't understand, can you trust Allah's hidden wisdom like Musa eventually did?",
    ],
    relatedSurahs: [17, 19],
  },

  // Surah 19: Maryam (Mary)
  19: {
    number: 19,
    circumstances:
      "Revealed in Makkah and notably recited by Ja'far ibn Abi Talib before the Negus of Abyssinia when Muslims sought asylum. When he reached the verses about Maryam and Isa, the Christian king wept, saying 'This and what Jesus brought come from the same source.' It led to his protection of the Muslim emigrants. The surah emphasizes mercy (rahma appears 16 times) and is named after the only woman to have a surah titled after her.",
    themes: [
      {
        title: "Divine Mercy in Prophetic Families",
        explanation:
          "Stories of Zakariyya, Yahya, Maryam, Isa, and Ibrahim show mercy flowing through generations.",
      },
      {
        title: "Miraculous Births",
        explanation:
          "Yahya to elderly parents, Isa to a virgin - Allah's power transcends natural law when He wills.",
      },
      {
        title: "Honoring the Righteous",
        explanation:
          "Maryam is defended, Isa clarifies his mission from the cradle - Allah protects His servants' honor.",
      },
      {
        title: "Warning Against False Claims",
        explanation:
          "Attributing a son to Allah nearly causes heavens to collapse - a warning against Christian theology of that era.",
      },
    ],
    insights: [
      "The only woman named in the Quran has an entire surah - her status transcends any cultural diminishment of women.",
      "Isa spoke from the cradle to defend his mother - miracles serve to protect the innocent.",
      "Zakariyya's persistence in dua despite old age teaches that age is no barrier to asking Allah.",
    ],
    reflectionPrompts: [
      "How does Maryam's patience under accusation inspire your response to being misunderstood?",
      "What 'impossible' duas have you stopped making because they seemed beyond hope?",
    ],
    relatedSurahs: [3, 18, 21],
  },

  // Surah 12: Yusuf (Joseph)
  12: {
    number: 12,
    circumstances:
      "Revealed during the 'Year of Sorrow' after the deaths of Khadijah and Abu Talib, when the Prophet ﷺ faced his darkest period. Allah sent the most consoling story: Yusuf ﷺ, who faced family betrayal, slavery, false accusation, imprisonment, yet emerged as Egypt's minister and forgave his brothers. It is the only surah that tells one complete story, and the Prophet ﷺ called it 'the best of stories' as the opening verse states.",
    themes: [
      {
        title: "Beauty in Every Form",
        explanation:
          "Yusuf was given half of all beauty, but his spiritual beauty - patience, purity, and forgiveness - surpassed his physical.",
      },
      {
        title: "Patience Through Trials",
        explanation:
          "The well, slavery, seduction, prison - each test was preparation for leadership and reunion.",
      },
      {
        title: "Dreams and Divine Plan",
        explanation:
          "Yusuf's childhood dream was fulfilled decades later - Allah's promises unfold in His time.",
      },
      {
        title: "Forgiveness Over Revenge",
        explanation:
          "When Yusuf had power, he chose mercy: 'No blame upon you today' - the pinnacle of noble character.",
      },
    ],
    insights: [
      "Revealed when the Prophet ﷺ lost everything, showing that after every loss, restoration awaits.",
      "Ya'qub's 'beautiful patience' (sabr jameel) is patience without complaint - a different level of trust.",
      "Yusuf's protection from Zuleikha wasn't removal from the situation but strength within it.",
    ],
    reflectionPrompts: [
      "Which of Yusuf's many trials would be hardest for you? What quality would you need most?",
      "When you have power over someone who wronged you, do you choose Yusuf's path of forgiveness?",
    ],
    relatedSurahs: [11, 38],
  },

  // Surah 103: Al-Asr (Time)
  103: {
    number: 103,
    circumstances:
      "A brief Makkan surah of only three verses, yet Imam Shafi'i said if only this surah was revealed, it would be sufficient guidance for humanity. The companions would not part ways without reciting it to each other. It diagnoses the human condition (loss) and prescribes four remedies: faith, good deeds, mutual encouragement to truth, and mutual encouragement to patience. Its brevity makes it memorizable; its depth makes it inexhaustible.",
    themes: [
      {
        title: "Time as Witness",
        explanation:
          "Allah swears by time itself - the medium through which our test unfolds and our choices accumulate.",
      },
      {
        title: "Universal Loss",
        explanation:
          "All humans are in loss - this is the default state. The exception requires active effort.",
      },
      {
        title: "Four Conditions of Success",
        explanation:
          "Faith, righteous deeds, encouraging truth, encouraging patience - all four are necessary, none alone sufficient.",
      },
      {
        title: "Community Obligation",
        explanation:
          "Two of the four conditions involve others - faith cannot be purely individual; we must help each other.",
      },
    ],
    insights: [
      "Time is passing whether we use it well or not - it's evidence against us unless we invest it properly.",
      "The exception is grammatically structured as four AND conditions - missing one means loss.",
      "Half the remedy is social: encouraging truth and patience requires community. Islam is not solitary.",
    ],
    reflectionPrompts: [
      "Which of the four conditions do you most neglect?",
      "Who in your life encourages you to truth and patience, and who do you encourage?",
    ],
    relatedSurahs: [95, 102],
  },

  // Surah 110: An-Nasr (The Victory)
  110: {
    number: 110,
    circumstances:
      "The last surah revealed in its entirety, coming during the Farewell Pilgrimage approximately 80 days before the Prophet's ﷺ death. Upon hearing it, Abu Bakr wept, understanding it announced the Prophet's mission was complete. The Prophet ﷺ himself said: 'An announcer of my death has come.' The surah instructs glorification and seeking forgiveness when victory comes - the response to success is not celebration but humility.",
    themes: [
      {
        title: "Victory Belongs to Allah",
        explanation:
          "The help (nasr) is from Allah, not human effort alone - victory should increase gratitude, not pride.",
      },
      {
        title: "Mass Conversion",
        explanation:
          "People enter Islam in crowds (afwaja) - the fruit of years of patient struggle becomes apparent.",
      },
      {
        title: "Response to Success",
        explanation:
          "At victory's peak, glorify Allah and seek forgiveness - the opposite of worldly celebration.",
      },
      {
        title: "Mission Completion",
        explanation:
          "The Prophet's ﷺ mission was complete with this revelation - a subtle announcement of his impending departure.",
      },
    ],
    insights: [
      "Success should trigger istighfar (seeking forgiveness), not pride - purifying us from any self-attribution.",
      "Abu Bakr's tears at a 'victory' surah show his deep understanding - he heard what others missed.",
      "The Prophet ﷺ increased his prayers after this surah, preparing for his return to Allah.",
    ],
    reflectionPrompts: [
      "When you succeed, is your first instinct gratitude and humility or pride?",
      "How does knowing this was the Prophet's final revelation affect how you receive it?",
    ],
    relatedSurahs: [48, 108],
  },

  // Surah 108: Al-Kawthar (Abundance)
  108: {
    number: 108,
    circumstances:
      "The shortest surah, revealed when the Prophet's ﷺ son passed away and the Quraysh mocked him as 'abtar' (cut off, without male descendants to continue his legacy). Allah responded with the ultimate consolation: Al-Kawthar, a river in Paradise, and the promise that the Prophet's legacy would outlast his enemies. Today, billions say his name in prayer while the mockers are forgotten - the prophecy fulfilled.",
    themes: [
      {
        title: "Abundant Divine Compensation",
        explanation:
          "Whatever loss the Prophet ﷺ felt, Allah gave more - Al-Kawthar is infinite good in exchange for finite grief.",
      },
      {
        title: "Response to Blessing",
        explanation:
          "Pray and sacrifice for your Lord - gratitude is expressed through devoted worship.",
      },
      {
        title: "Enemies Forgotten",
        explanation:
          "'Your enemy is cut off' - history has proven this. The mockers are nameless; the Prophet ﷺ is immortal.",
      },
      {
        title: "Comfort in Grief",
        explanation:
          "This surah was grief counseling - teaching that Allah compensates beyond measure.",
      },
    ],
    insights: [
      "Three verses transformed mockery into prophecy - the 'cut off' man has billions of followers.",
      "Al-Kawthar's water is whiter than milk, sweeter than honey - those who drink will never thirst again.",
      "When mocked or bereaved, remember: Allah's compensation makes every loss insignificant.",
    ],
    reflectionPrompts: [
      "What 'Al-Kawthar' has Allah given you that outweighs your losses?",
      "How does the fate of the Prophet's ﷺ mockers affect how you respond to those who mock your faith?",
    ],
    relatedSurahs: [93, 94, 110],
  },

  // Surah 68: Al-Qalam (The Pen)
  68: {
    number: 68,
    circumstances:
      "One of the earliest revelations, defending the Prophet ﷺ against accusations of madness. The Quraysh called him majnoon (possessed/mad) for his message. Allah swears by the pen - the instrument of knowledge and civilization - to refute them. The surah includes the story of the garden owners whose crops were destroyed for refusing to share, a warning to Makkan merchants who hoarded wealth.",
    themes: [
      {
        title: "The Honor of Writing",
        explanation:
          "Allah swears by the pen and what is written - establishing the sacred nature of knowledge transmission.",
      },
      {
        title: "Prophetic Character",
        explanation:
          "The Prophet ﷺ is on exalted character (khuluq adheem) - the greatest testimony to his person.",
      },
      {
        title: "Greed's Consequences",
        explanation:
          "The garden story shows how refusing to share led to total loss - a warning about charitable neglect.",
      },
      {
        title: "Patience Against Accusation",
        explanation:
          "Don't obey every worthless oath-maker, slanderer, or hinderer of good - be patient, like Yunus was commanded.",
      },
    ],
    insights: [
      "'You are on exalted character' - this single verse is the Prophet's ﷺ eternal character reference.",
      "The pen's honor establishes that Islam values literacy, scholarship, and preserved knowledge.",
      "Jonah (Yunus) is mentioned as a warning - don't leave your post in frustration as he initially did.",
    ],
    reflectionPrompts: [
      "How does the Prophet's ﷺ character being praised by Allah shape how you study his life?",
      "What wealth do you withhold that, like the garden, might be taken if not shared?",
    ],
    relatedSurahs: [96, 73],
  },
};

/**
 * Get enhanced data for a surah
 */
export function getEnhancedSurahData(
  surahNumber: number
): EnhancedSurahData | undefined {
  return enhancedSurahData[surahNumber];
}

/**
 * Check if enhanced data exists for a surah
 */
export function hasEnhancedSurahData(surahNumber: number): boolean {
  return surahNumber in enhancedSurahData;
}
