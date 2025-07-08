const zodiacSigns = [
  { name: '*♑ Capricornus (Goat)*', symbol: 'Capricorn', start: '12-22', end: '01-19' },
  { name: '*♒ Aquarius (Water Bearer)*', symbol: 'Aquarius', start: '01-20', end: '02-18' },
  { name: '*♓ Pisces (Fish)*', symbol: 'Pisces', start: '02-19', end: '03-20' },
  { name: '*♈ Aries (Ram)*', symbol: 'Aries', start: '03-21', end: '04-19' },
  { name: '*♉ Taurus (Bull)*', symbol: 'Taurus', start: '04-20', end: '05-20' },
  { name: '*♊ Gemini (Twins)*', symbol: 'Gemini', start: '05-21', end: '06-21' },
  { name: '*♋ Cancer (Crab)*', symbol: 'Cancer', start: '06-22', end: '07-22' },
  { name: '*♌ Leo (Lion)*', symbol: 'Leo', start: '07-23', end: '08-22' },
  { name: '*♍ Virgo (Virgin)*', symbol: 'Virgo', start: '08-23', end: '09-22' },
  { name: '*♎ Libra (Balance)*', symbol: 'Libra', start: '09-23', end: '10-23' },
  { name: '*♏ Scorpius (Scorpion)*', symbol: 'Scorpio', start: '10-24', end: '11-21' },
  { name: '*♐ Sagittarius (Archer)*', symbol: 'Sagittarius', start: '11-22', end: '12-21' },
];

export function getHoroscope(birthDate: Date): string {
  const month = birthDate.getUTCMonth() + 1;
  const day = birthDate.getUTCDate();

  for (const zodiac of zodiacSigns) {
    const [startMonth, startDay] = zodiac.start.split('-').map(Number);
    const [endMonth, endDay] = zodiac.end.split('-').map(Number);

    const start = new Date(Date.UTC(2000, startMonth - 1, startDay));
    const end = new Date(Date.UTC(2000, endMonth - 1, endDay));
    const current = new Date(Date.UTC(2000, month - 1, day));

    if (startMonth > endMonth) {
      if (current >= start || current <= end) return zodiac.name;
    } else {
      if (current >= start && current <= end) return zodiac.name;
    }
  }

  return 'Unknown Zodiac';
}
