export const site = {
  name: "hhh电台",
  englishName: "HHH RADIO",
  description: "一份关于研究、制作与漫游的个人刊物。记录做过的事，也给尚未命名的兴趣留一扇门。",
  author: "hhh",
  locale: "zh-CN",
  nav: [
    { href: "/essays/", label: "放映室", sublabel: "Essays" },
    { href: "/projects/", label: "工坊", sublabel: "Projects" },
    { href: "/research/", label: "读片室", sublabel: "Research" },
    { href: "/signals/", label: "天线间", sublabel: "Signals" }
  ]
} as const;

export const collectionMeta = {
  essays: {
    label: "放映室",
    english: "Essays",
    code: "ROOM 01",
    description: "长文、阶段判断与生活实验。这里收录经过整理、愿意长期保留的表达。",
    accent: "coral"
  },
  projects: {
    label: "工坊",
    english: "Projects",
    code: "ROOM 02",
    description: "做出来的东西，以及它们从问题走到结果的过程、证据与取舍。",
    accent: "green"
  },
  research: {
    label: "读片室",
    english: "Research",
    code: "ROOM 03",
    description: "生物医学工程、影像、数据与方法。结论之外，也保留可以复查的路径。",
    accent: "yellow"
  },
  signals: {
    label: "天线间",
    english: "Signals",
    code: "ROOM 04",
    description: "语言、音乐、无线电、解谜、图寻，以及下一种还没有名字的好奇。",
    accent: "blue"
  }
} as const;

export type CollectionName = keyof typeof collectionMeta;
