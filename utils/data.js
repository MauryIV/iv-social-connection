function generateUsername() {
  const adjectives = ['cool', 'blueberry', 'tech', 'jazz', 'mountain', 'sunny', 'gaming', 'coffee', 'moonlight', 'adventure', 'secret', 'banana', 'guitar', 'star', 'snowboard', 'coding', 'bookworm', 'beach', 'pizza', 'skydiver', 'movie', 'dance', 'theGreat', 'coffeeShop', 'music', 'wilderness', 'techEnthusiast', 'sunset', 'snowball', 'codeSlinger', 'soccer', 'jungle', 'tea', 'moonwalker'];
  const nouns = ['Coder', 'Pie', 'Ninja', 'PianoPlayer', 'Explorer', 'Guru', 'PizzaLover', 'Dreamer', 'Dayz', 'Mastermind', 'Addict', 'Serenade', 'Seeker', 'AgentX', 'Split', 'Wizard', 'Hero', 'Gazer', 'Pro', 'Warrior', 'Bum', 'Fanatic', 'Fighter', 'Buff', 'King', 'Gatsby', 'Regular', 'Champion', 'Maestro', 'Crusader', 'Explorer', 'Enthusiast', 'Chaser', 'Ninja', 'Lover', '2022'];

  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdjective}${randomNoun}${Math.floor(Math.random() * 42)}`;
}

function generateEmail(username) {
  const domains = ['example.com', 'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  return `${username}@${randomDomain}`;
}

function generateThought() {
  const thoughtText = 'JavaScript is cool.';
  return thoughtText;
}

module.exports = { generateUsername, generateEmail, generateThought };
