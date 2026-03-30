export const EMBLEM_MAP: Record<string, string> = {
  "比尔吉沃特": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41601.png",
  "德玛西亚": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41602.png",
  "迅击战士": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41621.png",
  "护卫": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41616.png",
  "主宰": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41619.png",
  "弗雷尔卓德": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41603.png",
  "法师": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41623.png",
  "斗士": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41614.png",
  "征服者": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41624.png",
  "约德尔人": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41612.png",
  "艾欧尼亚": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41604.png",
  "诺克萨斯": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41606.png",
  "以绪塔尔": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41605.png",
  "皮尔特沃夫": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41607.png",
  "神盾使": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41625.png",
  "虚空": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41611.png",
  "神谕者": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41618.png",
  "祖安": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41613.png",
  "枪手": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41617.png",
  "狙神": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41620.png",
  "耀光使": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41615.png",
  "裁决战士": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41622.png",
};

export function getEmblemImg(traitName: string): string | null {
  const key = traitName.replace(/^\d+\s+/, "").trim();
  return EMBLEM_MAP[key] ?? null;
}

export function getEmblemImgFromCampName(campName: string): string | null {
  const firstPart = campName.split(/[\s·]/)[0].trim();
  return EMBLEM_MAP[firstPart] ?? null;
}
