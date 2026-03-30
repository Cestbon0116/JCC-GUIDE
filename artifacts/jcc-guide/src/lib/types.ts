export interface Equipment {
  equipmentId: number;
  equipmentName: string | null;
  equipmentImg: string | null;
}

export interface Piece {
  pieceId: number;
  pieceName: string;
  img: string;
  price: number;
  starNum: number;
  equipmentList: Equipment[];
}

export interface LineupChange {
  updateType: number;
  updateValue: number;
}

export interface LineupExtraData {
  img: string | null;
  levelRate_7: number;
  levelRate_8: number;
  levelRate_9: number;
  authorName: string | null;
  campName: string | null;
  campCode: string | null;
  campCoreNum: number;
  campUrl: string | null;
}

export interface LineupRow {
  score: number;
  groupId: string;
  allPickRate: number;
  avgRanking: number;
  pickRate_1: number;
  pickRate_4: number;
  pieceList: Piece[];
  extraData: LineupExtraData;
  change: {
    allPickRate: LineupChange;
    avgRanking: LineupChange;
    pickRate_4: LineupChange;
    pickRate_1: LineupChange;
  };
}

export interface GameMode {
  name: string;
  filter: string;
  num: number;
  updateTime: string;
}

export interface JSONData {
  data: {
    result: {
      gameMode: GameMode[];
      rows: LineupRow[];
    };
  };
}

// Hero ranking types (aid=50)
export interface HeroTrait {
  name: string;
  color: string;
}

export interface HeroEquipItem {
  equipmentId: number;
  img: string;
}

export interface HeroExtraData {
  traitList: HeroTrait[];
  price: number;
  equipment: HeroEquipItem[];
  tag: string[];
}

export interface HeroRankRow {
  id: number;
  name: string;
  img: string;
  trend: number;
  extraData: HeroExtraData;
  allPickRate: [number, number];
  avgRanking: number;
  pickRate_4: number;
  pickRate_1: number;
}

export interface HeroRankData {
  data: {
    result: {
      rows: HeroRankRow[];
    };
  };
}

// Trait ranking types (aid=54)
export interface TraitExtraData {
  index: number;
  num: number;
  color: number;
}

export interface TraitRankRow {
  id: number;
  name: string;
  img: string;
  numList: string[];
  trend: number;
  extraData: TraitExtraData;
  allPickRate: [number, number];
  avgRanking: number;
  pickRate_4: number;
  pickRate_1: number;
}

export interface TraitRankData {
  data: {
    result: {
      rows: TraitRankRow[];
    };
  };
}

// Rune ranking types (aid=51)
export interface RuneStageData {
  stagePickRate: number;
  avgRanking: number;
}

export interface RuneExtraData {
  colorType: number;
  desc: string;
  stage: RuneStageData[];
}

export interface RuneRankRow {
  id: number;
  name: string;
  img: string;
  trend: number;
  extraData: RuneExtraData;
  allPickRate: [number, number];
  avgRanking: number;
  pickRate_4: number;
  pickRate_1: number;
}

export interface RuneRankData {
  data: {
    result: {
      rows: RuneRankRow[];
    };
  };
}

// Equipment ranking types (aid=53)
export interface EquipPieceRef {
  pieceId: number;
  img: string;
}

export interface EquipExtraData {
  type: string;
  piece: EquipPieceRef[];
  tag: string[];
}

export interface EquipRankRow {
  id: number;
  name: string;
  img: string;
  trend: number;
  extraData: EquipExtraData;
  allPickRate: [number, number];
  avgRanking: number;
  pickRate_4: number;
  pickRate_1: number;
}

export interface EquipRankData {
  data: {
    result: {
      rows: EquipRankRow[];
    };
  };
}
