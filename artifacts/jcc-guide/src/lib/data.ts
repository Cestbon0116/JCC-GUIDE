import { JSONData, LineupRow, Piece, Equipment } from "./types";
// @ts-ignore - Assuming the alias is working or the file exists at this exact path
import rawData from "@assets/output_1774860524145.json";

const data = rawData as JSONData;

export const gameModes = data.data.result.gameMode;
export const allLineups = data.data.result.rows;

export type Tier = "S" | "A" | "B" | "C";

export function getTier(row: LineupRow): Tier {
  const p4 = row.pickRate_4;
  const p1 = row.pickRate_1;
  if (p4 >= 60 || p1 >= 20) return "S";
  if (p4 >= 50 || p1 >= 12) return "A";
  if (p4 >= 38 || p1 >= 7) return "B";
  return "C";
}

// Derived Data: Heroes
export interface HeroStat extends Piece {
  appearanceCount: number;
  recommendedEquipments: Equipment[];
}

export const getUniqueHeroes = (): HeroStat[] => {
  const heroMap = new Map<number, HeroStat>();

  allLineups.forEach((row) => {
    row.pieceList.forEach((piece) => {
      if (!heroMap.has(piece.pieceId)) {
        heroMap.set(piece.pieceId, {
          ...piece,
          starNum: 0, // Reset specific game state
          appearanceCount: 1,
          recommendedEquipments: [...piece.equipmentList],
        });
      } else {
        const existing = heroMap.get(piece.pieceId)!;
        existing.appearanceCount++;
        // Add unique equipments
        piece.equipmentList.forEach((eq) => {
          if (!existing.recommendedEquipments.find((e) => e.equipmentId === eq.equipmentId)) {
            existing.recommendedEquipments.push(eq);
          }
        });
      }
    });
  });

  return Array.from(heroMap.values()).sort((a, b) => b.appearanceCount - a.appearanceCount);
};

// Derived Data: Equipments
export interface EquipStat extends Equipment {
  usedBy: { heroName: string; img: string }[];
}

export const getUniqueEquipments = (): EquipStat[] => {
  const equipMap = new Map<number, EquipStat>();

  allLineups.forEach((row) => {
    row.pieceList.forEach((piece) => {
      piece.equipmentList.forEach((eq) => {
        if (!eq.equipmentName) return; // Skip null names
        
        if (!equipMap.has(eq.equipmentId)) {
          equipMap.set(eq.equipmentId, {
            ...eq,
            usedBy: [{ heroName: piece.pieceName, img: piece.img }],
          });
        } else {
          const existing = equipMap.get(eq.equipmentId)!;
          if (!existing.usedBy.find((h) => h.heroName === piece.pieceName)) {
            existing.usedBy.push({ heroName: piece.pieceName, img: piece.img });
          }
        }
      });
    });
  });

  return Array.from(equipMap.values()).sort((a, b) => b.usedBy.length - a.usedBy.length);
};

// Derived Data: Traits
export interface TraitStat {
  name: string;
  img: string;
  lineupCount: number;
  topLineupNames: string[];
}

export const getUniqueTraits = (): TraitStat[] => {
  const traitMap = new Map<string, TraitStat>();

  allLineups.forEach((row) => {
    if (!row.extraData.campName) return;
    
    // Extract trait name (usually before the space)
    const parts = row.extraData.campName.split(" ");
    const traitName = parts[0];
    
    if (!traitName) return;

    if (!traitMap.has(traitName)) {
      traitMap.set(traitName, {
        name: traitName,
        img: row.extraData.img || "",
        lineupCount: 1,
        topLineupNames: [row.extraData.campName],
      });
    } else {
      const existing = traitMap.get(traitName)!;
      existing.lineupCount++;
      if (existing.topLineupNames.length < 3) {
        existing.topLineupNames.push(row.extraData.campName);
      }
      // Update image if previous was empty
      if (!existing.img && row.extraData.img) {
        existing.img = row.extraData.img;
      }
    }
  });

  return Array.from(traitMap.values()).sort((a, b) => b.lineupCount - a.lineupCount);
};
