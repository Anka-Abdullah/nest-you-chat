const messages: Record<string, string> = {
  Aries: 'Today brings opportunities for growth.',
  Taurus: 'A calm day awaits you.',
  Gemini: 'Expect some exciting news soon.',
  Cancer: 'Take time to focus on yourself.',
  Leo: 'Your charisma shines brightly.',
  Virgo: 'Details will matter today.',
  Libra: 'Balance is key in your decisions.',
  Scorpio: 'Embrace change and transformation.',
  Sagittarius: 'Adventure is on the horizon.',
  Capricorn: 'Hard work will pay off.',
  Aquarius: 'Innovative ideas come naturally.',
  Pisces: 'Listen to your intuition.',
};

export function getHoroscope(zodiac: string): string {
  return messages[zodiac] || 'Have a great day!';
}
