import type { Battle, Character, Streak } from "../types/database";

// In-memory storage (will be replaced with database later)
const characters: Character[] = [
  {
    id: 1,
    name: "Nina Williams",
    fullName: "Nina Williams",
    age: 24,
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
    battles: 0,
    winRate: 0,
    isActive: true,
  },
  {
    id: 2,
    name: "Anna Williams",
    fullName: "Anna Williams",
    age: 22,
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
    battles: 0,
    winRate: 0,
    isActive: true,
  },
  {
    id: 3,
    name: "Christie",
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
    battles: 0,
    winRate: 0,
    isActive: true,
  },
  {
    id: 4,
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
    battles: 0,
    winRate: 0,
    isActive: true,
  },
  {
    id: 5,
    name: "Asuka",
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
    battles: 0,
    winRate: 0,
    isActive: true,
  },
  {
    id: 6,
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
    battles: 0,
    winRate: 0,
    isActive: true,
  },
  {
    id: 7,
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
    battles: 0,
    winRate: 0,
    isActive: true,
  },
  {
    id: 8,
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
    battles: 0,
    winRate: 0,
    isActive: true,
  },
  {
    id: 9,
    name: "Kazumi",
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
    battles: 0,
    winRate: 0,
    isActive: true,
  },
  {
    id: 10,
    name: "Julia",
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
    battles: 0,
    winRate: 0,
    isActive: true,
  },
];

const battles: Battle[] = [];
const streaks: Streak[] = [];
let nextBattleId = 1;
let nextStreakId = 1;

// Character service functions
export const characterService = {
  // Get all characters
  getAllCharacters: async (): Promise<Character[]> => {
    // Simulate a small delay to make it async
    await new Promise(resolve => setTimeout(resolve, 1));
    return characters.filter((char) => char.isActive);
  },

  // Get character by ID
  getCharacterById: async (id: number): Promise<Character | null> => {
    await new Promise(resolve => setTimeout(resolve, 1));
    return characters.find((char) => char.id === id && char.isActive) || null;
  },

  // Get random characters for battle
  getRandomCharacters: async (count: number = 2): Promise<Character[]> => {
    await new Promise(resolve => setTimeout(resolve, 1));
    const activeCharacters = characters.filter((char) => char.isActive);
    const shuffled = [...activeCharacters].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  },

  // Update character stats
  updateCharacterStats: async (
    id: number,
    updates: Partial<Pick<Character, "votes" | "wins" | "battles" | "winRate">>
  ): Promise<Character | null> => {
    await new Promise(resolve => setTimeout(resolve, 1));
    const charIndex = characters.findIndex((char) => char.id === id);
    if (charIndex === -1) return null;

    characters[charIndex] = { ...characters[charIndex], ...updates };

    // Recalculate win rate if battles is updated
    if (updates.battles !== undefined && characters[charIndex].battles > 0) {
      characters[charIndex].winRate =
        characters[charIndex].wins / characters[charIndex].battles;
    }

    return characters[charIndex];
  },

  // Get leaderboard (sorted by wins, then by win rate)
  getLeaderboard: async (): Promise<Character[]> => {
    await new Promise(resolve => setTimeout(resolve, 1));
    return characters
      .filter((char) => char.isActive)
      .sort((a, b) => {
        if (b.wins !== a.wins) return b.wins - a.wins;
        return b.winRate - a.winRate;
      });
  },
};

// Battle service functions
export const battleService = {
  // Record a battle
  recordBattle: async (
    character1Id: number,
    character2Id: number,
    winnerId: number
  ): Promise<Battle> => {
    await new Promise(resolve => setTimeout(resolve, 1));
    
    const battle: Battle = {
      id: nextBattleId++,
      character1Id,
      character2Id,
      winnerId,
      timestamp: new Date().toISOString(),
    };

    battles.push(battle);

    // Update character stats
    try {
      const char1 = await characterService.getCharacterById(character1Id);
      const char2 = await characterService.getCharacterById(character2Id);

      if (char1) {
        await characterService.updateCharacterStats(character1Id, {
          battles: char1.battles + 1,
          wins: winnerId === character1Id ? char1.wins + 1 : char1.wins,
          votes: char1.votes + (winnerId === character1Id ? 1 : 0),
        });
      }

      if (char2) {
        await characterService.updateCharacterStats(character2Id, {
          battles: char2.battles + 1,
          wins: winnerId === character2Id ? char2.wins + 1 : char2.wins,
          votes: char2.votes + (winnerId === character2Id ? 1 : 0),
        });
      }
    } catch (error) {
      console.warn('Error updating character stats in recordBattle:', error);
    }

    return battle;
  },

  // Get battle history
  getBattleHistory: async (limit?: number): Promise<Battle[]> => {
    await new Promise(resolve => setTimeout(resolve, 1));
    const sorted = battles.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    return limit ? sorted.slice(0, limit) : sorted;
  },
};

// Streak service functions
export const streakService = {
  // Get current streak for character
  getCurrentStreak: async (characterId: number): Promise<Streak | null> => {
    await new Promise(resolve => setTimeout(resolve, 1));
    return (
      streaks.find(
        (streak) => streak.characterId === characterId && streak.isActive
      ) || null
    );
  },

  // Update or create streak
  updateStreak: async (characterId: number, won: boolean): Promise<Streak> => {
    await new Promise(resolve => setTimeout(resolve, 1));
    
    try {
      let streak = await streakService.getCurrentStreak(characterId);

      if (won) {
        if (streak) {
          streak.streakCount += 1;
        } else {
          streak = {
            id: nextStreakId++,
            characterId,
            streakCount: 1,
            isActive: true,
            startedAt: new Date().toISOString(),
          };
          streaks.push(streak);
        }
      } else if (streak) {
        // End the streak
        streak.isActive = false;
        streak.endedAt = new Date().toISOString();
      }

      return (
        streak || {
          id: nextStreakId++,
          characterId,
          streakCount: 0,
          isActive: false,
          startedAt: new Date().toISOString(),
          endedAt: new Date().toISOString(),
        }
      );
    } catch (error) {
      console.warn('Error in updateStreak:', error);
      return {
        id: nextStreakId++,
        characterId,
        streakCount: 0,
        isActive: false,
        startedAt: new Date().toISOString(),
        endedAt: new Date().toISOString(),
      };
    }
  },

  // Get all active streaks
  getActiveStreaks: async (): Promise<Streak[]> => {
    await new Promise(resolve => setTimeout(resolve, 1));
    return streaks.filter(
      (streak) => streak.isActive && streak.streakCount > 0
    );
  },
};
