export interface Character {
  id: number;
  name: string;
  status: string;
  gender: string;
  image: string;
}

export interface ICharacterResponse {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string | null;
  };
  results: Character[];
}
