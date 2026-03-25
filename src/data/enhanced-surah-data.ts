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

  // Surah 36: Ya-Sin
  36: {
    number: 36,
    circumstances:
      "A Makkan surah called 'the heart of the Quran' by the Prophet ﷺ who encouraged reciting it over those who are dying and for the deceased. It addresses the fundamental themes that the early Muslims faced: resurrection denial, prophetic rejection, and the evidence of Allah's power in creation. The powerful narrative of the man who came running from the city to support the messengers provides an inspiring model of faith.",
    themes: [
      {
        title: "Prophetic Mission",
        explanation:
          "The Prophet ﷺ is confirmed as a messenger on a straight path - his role validated against deniers.",
      },
      {
        title: "Resurrection Evidence",
        explanation:
          "Multiple signs in nature prove Allah's ability to resurrect: dead earth revived, day and night cycles, the ark of Nuh.",
      },
      {
        title: "The Believing Man",
        explanation:
          "The unnamed man who defended the messengers and was martyred shows true faith means supporting truth regardless of cost.",
      },
      {
        title: "Divine Creative Power",
        explanation:
          "'Be, and it is' (Kun fa-yakun) - Allah's command creates instantly; resurrection requires only His word.",
      },
    ],
    insights: [
      "The heart of the Quran addresses the heart's essential questions: Is this real? Will we return? Does my life matter?",
      "The believing man wished his people knew of his reward - concern for others' guidance continues even after death.",
      "Resurrection is easier for Allah than initial creation - yet we struggle to believe despite witnessing creation daily.",
    ],
    reflectionPrompts: [
      "What 'dead' aspects of your spiritual life need the revival that Ya-Sin describes?",
      "Like the man from the city, what truths do you need to support even if unpopular?",
    ],
    relatedSurahs: [67, 78],
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
