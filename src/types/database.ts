export interface Character {
  id: number;
  name: string;
  fullName?: string;
  age?: number;
  country?: string;
  fightingStyle?: string;
  bio?: string;
  imageUrl: string;
  height?: string;
  weight?: string;
  bloodType?: string;
  occupation?: string;
  hobbies?: string;
  likes?: string;
  dislikes?: string;
  debut?: string;
  votes: number;
  wins: number;
  battles: number;
  winRate: number;
  isActive: boolean;
}

export interface Battle {
  id: number;
  character1Id: number;
  character2Id: number;
  winnerId: number;
  timestamp: string;
}

export interface Streak {
  id: number;
  characterId: number;
  streakCount: number;
  isActive: boolean;
  startedAt: string;
  endedAt?: string;
}
