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
