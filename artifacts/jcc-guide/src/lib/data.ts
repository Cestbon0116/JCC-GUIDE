import { JSONData, HeroRankData, TraitRankData, RuneRankData, EquipRankData, HeroRankRow, TraitRankRow, RuneRankRow, EquipRankRow } from "./types";

// @ts-ignore
import lineupRaw from "@assets/1_阵容排行_1774862909125.json";
// @ts-ignore
import heroRaw from "@assets/2_弈子排行_1774862909125.json";
// @ts-ignore
import traitRaw from "@assets/3_羁绊排行_1774862909125.json";
// @ts-ignore
import runeRaw from "@assets/4_符文排行_1774862909125.json";
// @ts-ignore
import equipRaw from "@assets/5_装备排行_1774862909125.json";

const lineupData = lineupRaw as JSONData;
const heroData = heroRaw as HeroRankData;
const traitData = traitRaw as TraitRankData;
const runeData = runeRaw as RuneRankData;
const equipData = equipRaw as EquipRankData;

// ── Lineup data ──────────────────────────────────────────────────────────────
export const gameModes = lineupData.data.result.gameMode;
export const allLineups = lineupData.data.result.rows;

export type Tier = "S" | "A" | "B" | "C";

export function getTier(row: { pickRate_4: number; pickRate_1: number }): Tier {
  const p4 = row.pickRate_4;
  const p1 = row.pickRate_1;
  if (p4 >= 60 || p1 >= 20) return "S";
  if (p4 >= 50 || p1 >= 12) return "A";
  if (p4 >= 38 || p1 >= 7) return "B";
  return "C";
}

// ── Hero ranking data ─────────────────────────────────────────────────────────
export const allHeroes: HeroRankRow[] = heroData.data?.result?.rows ?? [];

// ── Trait ranking data ────────────────────────────────────────────────────────
export const allTraits: TraitRankRow[] = traitData.data?.result?.rows ?? [];

// ── Rune ranking data ─────────────────────────────────────────────────────────
export const allRunes: RuneRankRow[] = runeData.data?.result?.rows ?? [];

// ── Equipment ranking data ────────────────────────────────────────────────────
export const allEquipments: EquipRankRow[] = equipData.data?.result?.rows ?? [];
