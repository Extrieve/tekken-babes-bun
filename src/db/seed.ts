import { db } from "./index";
import { characters } from "./schema";

const tekkenCharacters = [
  {
    name: "Nina Williams",
    fullName: "Nina Williams",
    age: 24, // Chronologically older due to cryosleep
    country: "Ireland",
    fightingStyle: "Assassination martial arts based on Aikido",
    bio: "A cold-blooded Irish assassin who works for the highest bidder. Nina is known for her deadly efficiency and complex relationship with her sister Anna. She was put into cryogenic sleep and has been involved in numerous assassination contracts.",
    imageUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop",
    height: "5'7\"",
    weight: "119 lbs",
    bloodType: "A",
    occupation: "Assassin",
    hobbies: "Shopping",
    likes: "Efficiency, Precision",
    dislikes: "Incompetence, Anna Williams",
    debut: "Tekken 1",
    votes: 0,
    wins: 0,
  },
  {
    name: "Anna Williams",
    fullName: "Anna Williams",
    age: 22, // Chronologically older due to cryosleep
    country: "Ireland",
    fightingStyle: "Assassination martial arts based on Aikido",
    bio: "Nina's younger sister and rival assassin. Anna is more flamboyant and emotional than her sister, but equally deadly. Their sibling rivalry has become legendary in the Tekken universe.",
    imageUrl:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop",
    height: "5'7\"",
    weight: "117 lbs",
    bloodType: "A",
    occupation: "Assassin",
    hobbies: "Teasing Nina",
    likes: "Fashion, Attention",
    dislikes: "Nina Williams, Being ignored",
    debut: "Tekken 1",
    votes: 0,
    wins: 0,
  },
  {
    name: "Christie Monteiro",
    fullName: "Christie Monteiro",
    age: 19,
    country: "Brazil",
    fightingStyle: "Capoeira",
    bio: "A Brazilian Capoeira fighter with a warm personality and strong sense of justice. She learned Capoeira from her grandfather and fights to protect those she loves. Known for her acrobatic fighting style and positive attitude.",
    imageUrl:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop",
    height: "5'6\"",
    weight: "106 lbs",
    bloodType: "AB",
    occupation: "Student",
    hobbies: "Dancing, Beach volleyball",
    likes: "Dancing, Her grandfather",
    dislikes: "Injustice, Bullies",
    debut: "Tekken 4",
    votes: 0,
    wins: 0,
  },
  {
    name: "Lili",
    fullName: "Emilie De Rochefort",
    age: 16,
    country: "Monaco",
    fightingStyle: "Street fighting based on gymnastics and dance",
    bio: "A wealthy heiress who fights for the thrill of it. Lili comes from a privileged background but seeks excitement through street fighting. She has a rivalry with Asuka and enjoys the adrenaline of combat.",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop",
    height: "5'6\"",
    weight: "126 lbs",
    bloodType: "A",
    occupation: "Student/Heiress",
    hobbies: "Shopping, Gymnastics",
    likes: "Fighting, Expensive things",
    dislikes: "Boredom, Losing",
    debut: "Tekken 5: Dark Resurrection",
    votes: 0,
    wins: 0,
  },
  {
    name: "Asuka Kazama",
    fullName: "Asuka Kazama",
    age: 17,
    country: "Japan",
    fightingStyle: "Kazama-style Traditional Martial Arts",
    bio: "A hot-headed Japanese high school student with a strong sense of justice. She can't stand seeing people being bullied and often gets into fights to protect others. She's related to Jin Kazama and Jun Kazama.",
    imageUrl:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=500&fit=crop",
    height: "5'4\"",
    weight: "108 lbs",
    bloodType: "B",
    occupation: "High school student",
    hobbies: "Gardening, Fortune telling",
    likes: "Justice, Helping others",
    dislikes: "Bullies, Lili",
    debut: "Tekken 5",
    votes: 0,
    wins: 0,
  },
  {
    name: "Xiaoyu",
    fullName: "Ling Xiaoyu",
    age: 18,
    country: "China",
    fightingStyle: "Various Chinese martial arts",
    bio: "A cheerful Chinese martial artist who is obsessed with amusement parks and Jin Kazama. Despite her bubbly personality, she's a skilled fighter who combines various Chinese martial arts styles.",
    imageUrl:
      "https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=400&h=500&fit=crop",
    height: "5'1\"",
    weight: "93 lbs",
    bloodType: "A",
    occupation: "Student",
    hobbies: "Amusement parks, Pandas",
    likes: "Jin Kazama, Fun",
    dislikes: "Studying, Serious situations",
    debut: "Tekken 3",
    votes: 0,
    wins: 0,
  },
  {
    name: "Jun Kazama",
    fullName: "Jun Kazama",
    age: 29,
    country: "Japan",
    fightingStyle: "Kazama-style Traditional Martial Arts",
    bio: "A gentle and compassionate WWWC officer who has the ability to sense the presence of the Devil Gene. She's Jin's mother and Kazuya's former lover, known for her pure heart and desire to save others.",
    imageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop",
    height: "5'4\"",
    weight: "119 lbs",
    bloodType: "A",
    occupation: "WWWC Officer",
    hobbies: "Meditation, Nature walks",
    likes: "Peace, Nature",
    dislikes: "Violence, The Devil Gene",
    debut: "Tekken 2",
    votes: 0,
    wins: 0,
  },
  {
    name: "Zafina",
    fullName: "Zafina",
    age: 24,
    country: "Unknown (Middle East)",
    fightingStyle: "Ancient assassination arts",
    bio: "A mysterious assassin who serves as a guardian of an ancient tomb. She fights using ancient assassination techniques and has the ability to contort her body in impossible ways.",
    imageUrl:
      "https://images.unsplash.com/photo-1509783405085-c27c5d94b552?w=400&h=500&fit=crop",
    height: "5'8\"",
    weight: "128 lbs",
    bloodType: "Unknown",
    occupation: "Guardian/Assassin",
    hobbies: "Archaeology, Ancient texts",
    likes: "Ancient secrets, Solitude",
    dislikes: "Disruption of ancient sites",
    debut: "Tekken 6",
    votes: 0,
    wins: 0,
  },
  {
    name: "Kazumi Mishima",
    fullName: "Kazumi Mishima",
    age: 27,
    country: "Japan",
    fightingStyle: "Hachijo-style karate",
    bio: "Heihachi's late wife and Kazuya's mother. A member of the Hachijo clan with the power to transform into a tiger-like demon. She appears calm and loving but harbors the Devil Gene.",
    imageUrl:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=500&fit=crop",
    height: "5'5\"",
    weight: "119 lbs",
    bloodType: "A",
    occupation: "Hachijo clan member",
    hobbies: "Tea ceremony, Tiger training",
    likes: "Family, Tradition",
    dislikes: "The Mishima bloodline's fate",
    debut: "Tekken 7",
    votes: 0,
    wins: 0,
  },
  {
    name: "Julia Chang",
    fullName: "Julia Chang",
    age: 20,
    country: "USA",
    fightingStyle: "Chinese martial arts based on Mizongquan",
    bio: "An adopted daughter of Michelle Chang who fights to restore her forest homeland. She's also a skilled streamer and content creator, balancing her environmental activism with her online presence.",
    imageUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop",
    height: "5'4\"",
    weight: "117 lbs",
    bloodType: "B",
    occupation: "Environmental activist/Streamer",
    hobbies: "Streaming, Environmental research",
    likes: "Nature, Technology",
    dislikes: "Deforestation, Pollution",
    debut: "Tekken 3",
    votes: 0,
    wins: 0,
  },
];

async function seedDatabase() {
  console.log("Seeding database with Tekken characters...");

  try {
    // Clear existing data
    await db.delete(characters);

    // Insert new characters
    for (const character of tekkenCharacters) {
      await db.insert(characters).values(character);
      console.log(`✅ Added ${character.name}`);
    }

    console.log("🎉 Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
}

export { seedDatabase };
