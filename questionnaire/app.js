const QUESTIONNAIRE_VERSION = "2026.10-v1";
const STORAGE_KEY = "hhhblog.questionnaire.v1";

const option = (value, label, description = "") => ({ value, label, description });

const sections = [
  {
    id: "origin",
    index: "01",
    title: "起点与方向",
    description: "先不谈框架和服务器。这里要确认的是：这个网站为什么值得存在，它与你的关系是什么。",
    questions: [
      {
        id: "working_title",
        depth: 1,
        type: "short",
        title: "先给这个网站一个临时称呼。",
        note: "可以是真名、网名、一个意象，或者先写“还没想好”。",
        placeholder: "例如：Hsz's Field Notes / 某某信号站 / 暂无",
      },
      {
        id: "site_relation",
        depth: 1,
        required: true,
        type: "choice",
        title: "如果网站是一处空间，你最希望它像什么？",
        options: [
          option("study", "公开书房", "以文章、阅读与思考为中心，安静但允许别人进来。"),
          option("archive", "长期档案馆", "把项目、经历、材料和变化可靠地保存下来。"),
          option("lab", "开放实验台", "过程、半成品、失败和新工具都可以被看见。"),
          option("salon", "小型会客厅", "让真正合拍的人认识你，并留下联系入口。"),
          option("magazine", "个人杂志", "有选题、有编排、有鲜明编辑观点和视觉气质。"),
          option("playground", "网络游乐场", "互动、彩蛋和偶发实验比规整栏目更重要。"),
        ],
      },
      {
        id: "why_now",
        depth: 1,
        required: true,
        type: "long",
        title: "为什么是现在？你希望网站解决什么遗憾、需求或冲动？",
        placeholder: "想到什么写什么。比如：内容散落、想留下成长轨迹、希望被同路人找到、想拥有不受平台限制的表达空间……",
      },
      {
        id: "three_year_win",
        depth: 1,
        required: true,
        type: "multi",
        max: 3,
        title: "三年后回头看，哪些结果会让你觉得这个网站做值了？",
        note: "最多选三项。",
        options: [
          option("body_of_work", "形成一套可回看的作品与思想记录"),
          option("collaborators", "认识了真正合拍的朋友或合作伙伴"),
          option("career", "为升学、科研或职业机会提供了可信凭证"),
          option("helped_people", "一些内容持续帮到了陌生人"),
          option("thinking", "写作让自己的思考更清楚、更成体系"),
          option("identity", "建立了一个比社交平台更完整的数字身份"),
          option("community", "围绕兴趣形成一个小而稳定的读者圈"),
          option("income", "带来适度收入、咨询或项目机会"),
          option("joy", "它一直很好玩，所以我愿意继续做"),
        ],
      },
      {
        id: "visitor_feeling",
        depth: 1,
        required: true,
        type: "multi",
        max: 3,
        title: "一个陌生人逛完网站，你最希望他带走哪几种感受？",
        note: "最多选三项。",
        options: [
          option("credible", "这个人做事扎实，值得信任"),
          option("curious", "这个人的兴趣版图很大，想继续探索"),
          option("warm", "这里有人味，愿意以后再来"),
          option("sharp", "观点清楚，有自己的判断"),
          option("useful", "带走了有用的方法、资源或灵感"),
          option("beautiful", "这个空间很好看，而且有辨识度"),
          option("unfinished", "它在持续生长，我想看看下一步"),
          option("surprised", "没想到这些领域可以这样连在一起"),
        ],
      },
      {
        id: "identity_mix",
        depth: 2,
        type: "scale",
        title: "你希望网站里的“专业身份”和“私人生命”如何配比？",
        min: 0,
        max: 100,
        step: 10,
        defaultValue: 50,
        leftLabel: "0：几乎纯专业",
        rightLabel: "100：完整而私人",
        unit: "% 私人表达",
      },
      {
        id: "privacy_posture",
        depth: 2,
        type: "choice",
        title: "对公开表达，你目前更接近哪种姿态？",
        options: [
          option("open", "大体开放", "只要不涉及明确隐私，愿意真实地写。"),
          option("curated", "有意识地策展", "真实，但只公开适合长期留存的那一面。"),
          option("layers", "分层公开", "公开内容之外，希望保留链接可见或受限内容。"),
          option("alias", "偏匿名或弱身份", "内容本身比现实身份关联更重要。"),
          option("unsure", "还没想好", "先做可调整的边界。"),
        ],
      },
      {
        id: "anti_site",
        depth: 3,
        type: "multi",
        max: 4,
        title: "哪些结果会让你觉得网站“做歪了”？",
        note: "最多选四项。",
        options: [
          option("resume", "像一份加长简历"),
          option("template", "像套模板换了名字"),
          option("performance", "为了更新而表演生活"),
          option("maintenance", "维护成本吞掉创作欲"),
          option("tech_demo", "只剩技术炫技，内容反而变薄"),
          option("too_serious", "太严肃，容不下随意和荒诞"),
          option("too_messy", "太散乱，自己以后都找不到东西"),
          option("tracking", "依赖追踪、广告或流量焦虑"),
        ],
      },
    ],
  },
  {
    id: "content",
    index: "02",
    title: "内容宇宙",
    description: "把已知兴趣和还没被命名的兴趣一起放进来。栏目可以后定，先看你真正愿意长期留下什么。",
    questions: [
      {
        id: "content_pillars",
        depth: 1,
        required: true,
        type: "multi",
        max: 7,
        title: "下面哪些主题值得成为网站里长期生长的主干？",
        note: "最多选七项；这不是承诺，只是在画地图。",
        options: [
          option("bme", "生物医学工程与科研"),
          option("imaging", "医学图像、数据与算法"),
          option("hardware", "电子、嵌入式、传感器与 PCB"),
          option("ai", "AI、Agent 与工具实验"),
          option("systems", "VPS、网络、自动化与数字基础设施"),
          option("learning", "学习方法、文献阅读与知识管理"),
          option("projects", "项目复盘与工程笔记"),
          option("essays", "个人随笔与社会观察"),
          option("music", "音乐、演出与声音"),
          option("cities", "城市、旅行、街头与跨文化经验"),
          option("visual", "摄影、影像与视觉收藏"),
          option("life", "日常、阶段状态与生活实验"),
          option("curation", "链接、作品与资源策展"),
          option("unknown", "还无法归类的新兴趣"),
        ],
      },
      {
        id: "unlisted_interests",
        depth: 1,
        type: "long",
        title: "有哪些兴趣、怪癖或长期好奇没有出现在上面？",
        placeholder: "越杂越好。可以写具体对象，也可以写某类感觉：旧地图、材料触感、城市基础设施、政治史、某种游戏机制……",
      },
      {
        id: "format_rank",
        depth: 1,
        required: true,
        type: "rank",
        max: 5,
        title: "按你最可能持续产出的顺序，点选五种内容形态。",
        note: "已选项再次点击可撤回。",
        options: [
          option("essay", "完整长文 / 深度文章"),
          option("note", "短笔记 / 灵感碎片"),
          option("project", "项目案例 / 制作日志"),
          option("tutorial", "教程 / 方法说明"),
          option("reading", "论文或书影音阅读卡"),
          option("photo", "照片组 / 视觉札记"),
          option("linklog", "链接摘录 / 周期性策展"),
          option("now", "近况 / Now / 周月报"),
          option("dataset", "数据、代码与可复现实验"),
          option("conversation", "访谈 / 对谈 / 问答"),
        ],
      },
      {
        id: "content_depth_mix",
        depth: 2,
        type: "choice",
        title: "你理想中的内容节奏更像哪一种？",
        options: [
          option("slow", "少而深", "宁愿一个月写一篇，也希望它经得住几年后重读。"),
          option("layers", "长短分层", "短笔记保持流动，成熟后沉淀成专题或长文。"),
          option("stream", "高频信号流", "频繁记录，接受零碎、现场感和不完整。"),
          option("seasonal", "项目季节制", "围绕阶段性研究或兴趣集中发布。"),
          option("unknown", "让实际习惯决定"),
        ],
      },
      {
        id: "publishing_rhythm",
        depth: 1,
        type: "choice",
        title: "在不制造压力的前提下，你觉得哪种更新频率现实？",
        options: [
          option("weekly", "每周至少有一条新东西"),
          option("biweekly", "两周左右一次"),
          option("monthly", "每月一到两次"),
          option("project", "不按日历，跟着项目节点"),
          option("bursts", "一阵一阵地集中更新"),
          option("unknown", "完全不知道，先观察三个月"),
        ],
      },
      {
        id: "language_mix",
        depth: 2,
        type: "choice",
        title: "语言上，你希望网站如何面对中文与英文？",
        options: [
          option("zh", "中文为主"),
          option("zh_abstract", "中文正文 + 英文摘要或项目信息"),
          option("bilingual_selected", "重点内容双语，其余按自然语言写"),
          option("bilingual_full", "尽量完整双语"),
          option("natural", "每篇选择最顺手的语言"),
          option("later", "首版单语，架构预留双语"),
        ],
      },
      {
        id: "unfinished_content",
        depth: 2,
        type: "choice",
        title: "半成品、失败记录和会变化的观点，应该怎样出现？",
        options: [
          option("public", "直接公开，并清楚标注状态"),
          option("incubator", "先进入“培育中”区域，成熟后转正"),
          option("selected", "只公开对别人仍有价值的失败与过程"),
          option("private", "网站只放相对完成的成果"),
          option("case_by_case", "按题材决定"),
        ],
      },
      {
        id: "seed_posts",
        depth: 1,
        required: true,
        type: "long",
        title: "如果明天网站就上线，你最想先放进去的三到十个具体内容是什么？",
        placeholder: "不必像正式标题。写项目名、一次经历、一个教程、一组照片、一个未解问题都可以。",
      },
      {
        id: "recurring_series",
        depth: 3,
        type: "long",
        title: "有没有适合做成固定系列的东西？",
        placeholder: "例如：每月工具箱、城市夜行记录、实验台周报、失败档案、正在读、设备拆解……",
      },
    ],
  },
  {
    id: "audience",
    index: "03",
    title: "读者与边界",
    description: "个人网站不必讨好所有人。明确谁会来、能看到什么、如何与你建立联系，会直接影响首页和信息架构。",
    questions: [
      {
        id: "audience_rank",
        depth: 1,
        required: true,
        type: "rank",
        max: 5,
        title: "按重要程度，点选你最在意的五类读者。",
        options: [
          option("future_self", "几年后的自己"),
          option("peers", "同专业或相近兴趣的同龄人"),
          option("researchers", "老师、研究者与潜在导师"),
          option("collaborators", "潜在合作者、团队或客户"),
          option("friends", "现实中的朋友与熟人"),
          option("recruiters", "招生、招聘或评审者"),
          option("beginners", "刚进入某个领域的人"),
          option("strangers", "偶然从搜索或链接来到的陌生人"),
          option("international", "非中文读者与跨文化朋友"),
        ],
      },
      {
        id: "first_visit_goal",
        depth: 1,
        required: true,
        type: "choice",
        title: "第一次来的人，最好在三十秒内明白什么？",
        options: [
          option("who", "你是谁，以及你正在走向哪里"),
          option("work", "你做过的最好作品和项目"),
          option("ideas", "你最近在思考什么"),
          option("world", "网站里有哪些值得探索的主题世界"),
          option("vibe", "先感受到气质，再慢慢认识人"),
          option("current", "你此刻正在做什么、需要什么"),
        ],
      },
      {
        id: "homepage_actions",
        depth: 2,
        type: "multi",
        max: 3,
        title: "你最希望访问者接下来做什么？",
        note: "最多选三项。",
        options: [
          option("read", "读完一篇代表作"),
          option("browse", "顺着主题继续逛"),
          option("project", "查看项目细节或下载成果"),
          option("contact", "给你发一封有内容的邮件"),
          option("subscribe", "订阅 RSS 或邮件更新"),
          option("return", "记住这里，以后再回来"),
          option("nothing", "什么都不用做，舒服地看完即可"),
        ],
      },
      {
        id: "identity_disclosure",
        depth: 2,
        type: "choice",
        title: "现实身份信息准备公开到什么程度？",
        options: [
          option("full", "真实姓名、经历与公开联系方式"),
          option("professional", "真实专业身份，但控制生活细节"),
          option("partial", "网名为主，需要时再展示实名材料"),
          option("alias", "尽量与现实身份解耦"),
          option("undecided", "尚未决定，先采用保守默认值"),
        ],
      },
      {
        id: "public_boundaries",
        depth: 2,
        type: "multi",
        title: "哪些内容需要默认保持谨慎或不公开？",
        options: [
          option("people", "他人的姓名、照片和私人故事"),
          option("location", "实时位置、住址与具体行程"),
          option("research", "未发表科研、数据与合作细节"),
          option("work", "团队、机构或客户内部信息"),
          option("finance", "资产、交易与财务细节"),
          option("health", "健康与高度私密经历"),
          option("politics", "可能带来现实风险的公共议题"),
          option("none", "没有固定禁区，逐篇判断"),
        ],
      },
      {
        id: "contact_style",
        depth: 1,
        type: "choice",
        title: "陌生人想联系你时，你希望入口是什么样？",
        options: [
          option("email", "公开邮箱，直接写信"),
          option("form", "站内表单，减少垃圾邮件"),
          option("social", "引导到一个常用社交平台"),
          option("structured", "按合作、交流、纠错等目的分入口"),
          option("limited", "只在特定页面留下联系方式"),
          option("none", "暂时不提供陌生人联系入口"),
        ],
      },
      {
        id: "community_model",
        depth: 3,
        type: "choice",
        title: "你对评论和读者互动的真实期待是什么？",
        options: [
          option("comments", "希望每篇文章下都能讨论"),
          option("guestbook", "比起逐篇评论，更喜欢一个留言簿"),
          option("email_reply", "公开阅读，私下邮件交流"),
          option("external", "讨论留在社交平台或社区"),
          option("none", "内容是单向发布，不需要互动系统"),
          option("later", "先不做，出现真实需求再加"),
        ],
      },
      {
        id: "meaningful_metric",
        depth: 3,
        type: "long",
        title: "什么比访问量更能说明网站有价值？",
        placeholder: "例如：某封来信、内容被引用、自己持续更新、认识一个朋友、一个项目因此发生……",
      },
    ],
  },
  {
    id: "aesthetic",
    index: "04",
    title: "视觉直觉",
    description: "这里不要求你懂设计术语。选让你愿意长期住进去的感觉，而不是只在截图里惊艳一次的风格。",
    questions: [
      {
        id: "mood_direction",
        depth: 1,
        required: true,
        type: "mood",
        title: "先凭直觉选一个最接近的视觉世界。",
        options: [
          option("editorial", "白昼编辑部", "清醒、易读、有报刊秩序"),
          option("console", "夜行控制台", "深色、精密、带仪器感"),
          option("magazine", "独立杂志", "大胆编排、强对比、有态度"),
          option("archive", "自然档案馆", "克制、温和、像标本与手记"),
          option("play", "数字游乐场", "鲜活、意外、允许古怪"),
          option("gallery", "极简画廊", "安静留白，让作品和图像说话"),
        ],
      },
      {
        id: "theme_behavior",
        depth: 1,
        required: true,
        type: "choice",
        title: "明暗主题更接近哪种期待？",
        compact: true,
        options: [
          option("light", "以明亮为主"),
          option("dark", "以深色为主"),
          option("system", "跟随设备设置"),
          option("switch", "默认一种，但让访客切换"),
          option("time", "随时间或场景变化"),
          option("unsure", "由整体方案决定"),
        ],
      },
      {
        id: "visual_density",
        depth: 2,
        type: "choice",
        title: "一屏里你喜欢看到多少信息？",
        options: [
          option("dense", "偏密", "像编辑部、终端或资料索引，适合快速扫描。"),
          option("balanced", "适中", "列表紧凑，正文舒展。"),
          option("spacious", "偏疏", "一件事占足空间，阅读节奏更慢。"),
          option("adaptive", "按内容变化", "索引密、文章松、项目页更视觉化。"),
        ],
      },
      {
        id: "type_feeling",
        depth: 2,
        type: "choice",
        title: "哪类文字气质最像你想要的声音？",
        options: [
          option("serif", "偏人文的衬线正文", "像书和长篇杂志，适合慢读。"),
          option("sans", "清晰现代的无衬线", "直接、干净、跨设备稳定。"),
          option("mono", "明显的等宽语言", "像实验记录、代码和设备界面。"),
          option("mixed", "有意识地混排", "标题、正文、数据各有不同语气。"),
          option("unsure", "看实际页面再判断"),
        ],
      },
      {
        id: "color_attitude",
        depth: 2,
        type: "multi",
        max: 4,
        title: "你希望颜色承担什么角色？",
        note: "最多选四项。",
        options: [
          option("bw", "黑白是骨架，颜色只做信号"),
          option("cool", "喜欢冷色与夜晚感"),
          option("warm", "需要一点温度和生活气"),
          option("primary", "接受鲜明、高对比的主色"),
          option("muted", "更偏低饱和、耐看的颜色"),
          option("topic", "不同主题拥有不同色彩"),
          option("image", "让照片决定每页的色彩"),
          option("surprise", "允许偶尔出现突兀但好玩的颜色"),
        ],
      },
      {
        id: "motion_level",
        depth: 2,
        type: "scale",
        title: "你对页面动效的接受度有多高？",
        note: "动效越多，个性和沉浸感可能越强，也更需要克制与维护。",
        min: 0,
        max: 100,
        step: 10,
        defaultValue: 40,
        leftLabel: "0：几乎静止",
        rightLabel: "100：明显动态体验",
        unit: "% 动态感",
      },
      {
        id: "image_treatment",
        depth: 2,
        type: "choice",
        title: "照片、项目图和截图在网站里应该是什么地位？",
        options: [
          option("hero", "是主角，很多页面从图像开始"),
          option("evidence", "是证据，服务于项目与文章说明"),
          option("diary", "是日记，允许随手和不完美"),
          option("curated", "少而精，每张都经过选择和处理"),
          option("minimal", "文字优先，图像只在必要时出现"),
          option("mixed", "不同栏目采用不同策略"),
        ],
      },
      {
        id: "aesthetic_pairs",
        depth: 3,
        type: "pairs",
        title: "对每组气质，选更靠近左边、中间还是右边。",
        rows: [
          { id: "order", left: "秩序严密", right: "自由生长" },
          { id: "tone", left: "冷静理性", right: "亲密感性" },
          { id: "era", left: "未来设备", right: "旧物档案" },
          { id: "voice", left: "严肃可信", right: "幽默好玩" },
          { id: "finish", left: "精心完成", right: "保留现场" },
          { id: "signature", left: "低调耐看", right: "强烈难忘" },
        ],
      },
      {
        id: "aesthetic_references",
        depth: 2,
        type: "long",
        title: "有哪些网站、应用、书刊、专辑、电影、空间或物件让你觉得“这个感觉对”？",
        placeholder: "不必提供链接，也不必与博客有关。写名字和你喜欢的具体部分即可。",
      },
    ],
  },
  {
    id: "experience",
    index: "05",
    title: "结构与体验",
    description: "这一章决定访问者如何进入、迷路、重新找到东西，以及网站应该更像一条时间线还是一张世界地图。",
    questions: [
      {
        id: "homepage_shape",
        depth: 1,
        required: true,
        type: "choice",
        title: "首页最适合以什么方式展开？",
        options: [
          option("latest", "最近更新流", "一进来就看到最新文章、笔记和状态。"),
          option("worlds", "主题世界地图", "先看到几个兴趣入口，再进入各自的内容体系。"),
          option("signature", "代表作与自我介绍", "快速建立“你是谁、做过什么”的印象。"),
          option("dashboard", "此刻仪表盘", "展示正在做、正在读、最近更新与实时信号。"),
          option("visual", "视觉拼贴", "用照片、项目图和少量文字建立第一印象。"),
          option("hybrid", "混合首页", "一屏内兼顾身份、入口与最近更新。"),
        ],
      },
      {
        id: "discovery_paths",
        depth: 2,
        type: "multi",
        max: 6,
        title: "你喜欢读者通过哪些路径发现内容？",
        options: [
          option("timeline", "按时间连续浏览"),
          option("topics", "按主题与栏目进入"),
          option("tags", "通过细粒度标签串联"),
          option("series", "跟着专题或系列顺序读"),
          option("links", "沿文章内部链接自然跳转"),
          option("graph", "在可视化关系图中探索"),
          option("search", "直接搜索关键词"),
          option("random", "随机漫游或“再来一篇”"),
        ],
      },
      {
        id: "feature_appetite",
        depth: 2,
        type: "multi",
        max: 10,
        title: "哪些功能让你真的有兴趣，而不只是“好像博客都该有”？",
        options: [
          option("search", "全文搜索"),
          option("rss", "RSS / Atom 订阅"),
          option("newsletter", "邮件订阅"),
          option("comments", "评论或留言簿"),
          option("graph", "知识关系图"),
          option("projects", "结构化项目档案"),
          option("now", "Now / Uses / About 页面"),
          option("reading", "阅读、收听或观看记录"),
          option("status", "服务状态或自动化数据"),
          option("download", "PDF、代码、数据等下载"),
          option("webmention", "来自独立网站的回应与引用"),
          option("private", "受限或仅链接可见的内容"),
          option("map", "地点地图或旅行足迹"),
          option("none", "首版只要内容浏览"),
        ],
      },
      {
        id: "search_importance",
        depth: 2,
        type: "choice",
        title: "假设内容积累到五百篇，找东西时你最看重什么？",
        options: [
          option("fast", "一个快速、容错的搜索框"),
          option("taxonomy", "清楚稳定的分类和标签"),
          option("curated", "由你维护的精选入口与索引页"),
          option("links", "双向链接和上下文关系"),
          option("external", "站内结构简单，交给搜索引擎"),
          option("mixed", "搜索、分类和人工索引并用"),
        ],
      },
      {
        id: "mobile_context",
        depth: 1,
        type: "multi",
        max: 4,
        title: "你和读者最可能在哪些场景使用这个网站？",
        options: [
          option("desktop_read", "电脑上认真长读"),
          option("phone_browse", "手机上碎片浏览"),
          option("lab_reference", "实验室或工作现场查资料"),
          option("share", "聊天中打开一条分享链接"),
          option("presentation", "面试、交流或展示时现场打开"),
          option("travel", "移动网络或海外环境下访问"),
          option("print", "打印或导出为 PDF 阅读"),
        ],
      },
      {
        id: "playful_features",
        depth: 3,
        type: "multi",
        max: 4,
        title: "哪些小机关会让网站更像你？",
        options: [
          option("ambient", "可选的环境声或声音场景"),
          option("night", "随时间变化的夜间状态"),
          option("random", "随机进入一篇旧内容"),
          option("constellation", "兴趣或文章关系的可视化星图"),
          option("command", "像命令面板一样快速跳转"),
          option("live", "来自设备、服务或自动化的实时信号"),
          option("secret", "需要探索才能发现的隐藏页面"),
          option("season", "按季节或项目阶段换皮肤"),
          option("none", "不需要，内容本身就是体验"),
        ],
      },
      {
        id: "accessibility_priority",
        depth: 2,
        type: "multi",
        title: "哪些可用性底线对你重要？",
        options: [
          option("contrast", "文字对比度和字号舒适"),
          option("keyboard", "键盘可以完整操作"),
          option("motion", "可减少或关闭动效"),
          option("alt", "图片有替代文字"),
          option("reader", "阅读器和语义结构友好"),
          option("slow_network", "慢网络下也能快速打开"),
          option("print", "打印与导出排版清楚"),
          option("all", "把这些都当作默认质量要求"),
        ],
      },
      {
        id: "audio_role",
        depth: 3,
        type: "choice",
        title: "声音如果进入网站，最适合扮演什么角色？",
        options: [
          option("none", "不需要声音"),
          option("articles", "少量文章附带口述或音频记录"),
          option("ambient", "访客主动开启的环境声"),
          option("original", "自己的录音、声音采样或播放列表"),
          option("links", "只链接合法平台上的音乐内容"),
          option("experiment", "以后作为独立实验再考虑"),
        ],
      },
    ],
  },
  {
    id: "workflow",
    index: "06",
    title: "创作工作流",
    description: "网站只有接上你已经在用的记录与产出方式，才可能长期更新。这里关心的是摩擦，而不是工具信仰。",
    questions: [
      {
        id: "source_inputs",
        depth: 1,
        type: "multi",
        title: "新内容通常会从哪里长出来？",
        options: [
          option("notes", "日常笔记与随手记录"),
          option("research", "论文、实验与科研材料"),
          option("code", "代码仓库、Issue 与项目日志"),
          option("photos", "相册、截图与拍摄素材"),
          option("voice", "语音备忘或口述"),
          option("chat", "与 AI 或朋友的对话"),
          option("bookmarks", "收藏、RSS 与网页标注"),
          option("documents", "Word、PPT、PDF 或课程材料"),
          option("hardware", "设备数据、示波器图与设计文件"),
        ],
      },
      {
        id: "current_content_homes",
        depth: 2,
        type: "multi",
        title: "你的材料现在主要散落在哪里？",
        options: [
          option("obsidian", "Obsidian 或 Markdown 文件"),
          option("notion", "Notion / 语雀 / 飞书文档"),
          option("word", "Word / WPS / 本地文档"),
          option("zotero", "Zotero 与文献管理器"),
          option("github", "GitHub / Git 仓库"),
          option("cloud", "网盘与云盘"),
          option("social", "社交平台历史内容"),
          option("phone", "手机备忘录、相册与聊天收藏"),
          option("paper", "纸质本、手写材料"),
          option("none", "还没有成体系的素材库"),
        ],
      },
      {
        id: "writing_surface",
        depth: 1,
        required: true,
        type: "choice",
        title: "发布一篇普通内容时，你最愿意在哪儿完成主要编辑？",
        note: "这会影响是否需要后台。选择文件写作，长期可控性更高；选择网页后台，日常摩擦更低。",
        options: [
          option("obsidian", "Obsidian / Markdown 编辑器"),
          option("code", "VS Code、Cursor 等代码编辑器"),
          option("cms", "网站里的可视化写作后台"),
          option("docs", "熟悉的文档工具，再同步到网站"),
          option("phone", "手机端随时写和发"),
          option("hybrid", "长文用文件，短内容用轻量入口"),
          option("agent", "把材料交给 AI 整理后再审核发布"),
        ],
      },
      {
        id: "git_comfort",
        depth: 2,
        type: "scale",
        title: "你目前对 Git 提交、分支和冲突处理有多自在？",
        min: 0,
        max: 100,
        step: 10,
        defaultValue: 50,
        leftLabel: "0：希望完全不碰",
        rightLabel: "100：可以把它当日常工具",
        unit: "% 熟悉度",
      },
      {
        id: "publish_trigger",
        depth: 1,
        required: true,
        type: "choice",
        title: "理想的“发布”动作有多重？",
        options: [
          option("button", "点一次发布按钮"),
          option("file", "把文件放进指定文件夹"),
          option("git", "提交并推送 Git"),
          option("sync", "从笔记库自动同步符合条件的内容"),
          option("review", "AI 整理成草稿，我确认后发布"),
          option("batch", "定期集中整理和发布一批内容"),
        ],
      },
      {
        id: "structure_tolerance",
        depth: 2,
        type: "choice",
        title: "写作时填写标题、日期、标签、摘要等结构化信息，你能接受多少？",
        options: [
          option("minimal", "只写标题和正文，其余自动推断"),
          option("small", "接受三到五个固定字段"),
          option("rich", "项目、论文等内容可以有完整字段"),
          option("templates", "用模板预填，我再修改"),
          option("agent", "让 AI 建议字段，我负责确认"),
        ],
      },
      {
        id: "media_routine",
        depth: 2,
        type: "choice",
        title: "图片、视频、图表和附件的处理方式，哪种最现实？",
        options: [
          option("manual", "自己命名、压缩、写说明并放入素材目录"),
          option("automatic", "拖进去后自动压缩、重命名和生成尺寸"),
          option("external", "主要使用相册、视频站或对象存储链接"),
          option("mixed", "核心素材本地管理，大文件走外部服务"),
          option("unknown", "素材不多，先用简单流程"),
        ],
      },
      {
        id: "ai_role",
        depth: 2,
        type: "multi",
        max: 6,
        title: "AI 在内容工作流中可以做哪些事？",
        options: [
          option("brainstorm", "提问、发散与选题"),
          option("outline", "整理结构与提纲"),
          option("polish", "润色、翻译与摘要"),
          option("metadata", "生成标签、摘要和关联建议"),
          option("migration", "把旧材料批量整理成统一格式"),
          option("review", "检查事实、链接和发布前质量"),
          option("automation", "代办提交、构建和发布流程"),
          option("minimal", "尽量不介入正文创作"),
        ],
      },
      {
        id: "artifact_ecosystem",
        depth: 3,
        type: "multi",
        title: "网站内容需要和哪些产出格式互相流动？",
        options: [
          option("markdown", "Markdown / MDX"),
          option("obsidian", "Obsidian 双向链接与属性"),
          option("zotero", "Zotero 引用与文献条目"),
          option("docx", "Word / DOCX"),
          option("pdf", "PDF / 打印稿"),
          option("ppt", "PPT / 演示稿"),
          option("notebook", "Jupyter Notebook"),
          option("repo", "代码仓库与 README"),
          option("rss", "RSS 阅读器与稍后读"),
        ],
      },
      {
        id: "workflow_friction",
        depth: 1,
        type: "long",
        title: "过去有哪些摩擦最容易让你停止记录或发布？",
        placeholder: "例如：图片太麻烦、想一次写完、平台编辑器难用、分类纠结、怕内容不够成熟、部署容易忘……",
      },
    ],
  },
  {
    id: "technology",
    index: "07",
    title: "技术与所有权",
    description: "不需要先选框架。先确定你愿意用多少复杂度，换取多少控制力、动态能力和迁移自由。",
    questions: [
      {
        id: "control_tradeoff",
        depth: 1,
        required: true,
        type: "choice",
        title: "在“省心”和“完全掌控”之间，你更想站在哪里？",
        options: [
          option("managed", "优先省心", "愿意依赖成熟平台，更新和安全维护尽量交给服务商。"),
          option("balanced", "平衡型", "内容和域名归自己，构建与托管使用可靠云服务。"),
          option("owned", "偏自主", "核心代码、内容和数据都可迁移，接受一定维护。"),
          option("selfhost", "高度自托管", "服务器、数据库和服务尽量掌握在自己手里。"),
          option("staged", "分阶段", "首版省心上线，真实需求出现后再增加自主程度。"),
        ],
      },
      {
        id: "dynamic_needs",
        depth: 2,
        type: "multi",
        max: 8,
        title: "哪些功能真的需要服务器在访问时处理数据？",
        note: "文章和搜索都可以纯静态完成；账号、私密内容、实时数据通常需要后端。",
        options: [
          option("none", "暂时没有，静态网站就够"),
          option("comments", "评论、留言或反应"),
          option("forms", "联系表单"),
          option("newsletter", "邮件订阅"),
          option("analytics", "访问统计"),
          option("live", "设备、VPS 或自动化实时状态"),
          option("account", "登录与个人账号"),
          option("private", "受限内容和权限"),
          option("api", "对外 API 或机器可读数据"),
          option("recommend", "个性化推荐或阅读状态"),
        ],
      },
      {
        id: "content_engine",
        depth: 2,
        type: "choice",
        title: "内容的“真源”最好放在哪里？",
        note: "真源指以后换平台时最希望带走的那份原始内容。",
        options: [
          option("files", "普通 Markdown 文件与图片目录"),
          option("obsidian", "Obsidian 知识库"),
          option("git", "与网站代码一起放在 Git 仓库"),
          option("headless", "独立内容后台，网站通过接口读取"),
          option("database", "数据库中的结构化内容"),
          option("hybrid", "文章用文件，动态数据用数据库"),
          option("recommend", "交给你根据工作流推荐"),
        ],
      },
      {
        id: "audience_region",
        depth: 1,
        required: true,
        type: "choice",
        title: "访问地域的优先级是什么？",
        note: "中国大陆直连稳定、全球速度、域名备案和部署地点之间会相互影响。",
        options: [
          option("mainland", "中国大陆访问体验最重要"),
          option("global", "全球与海外访问最重要"),
          option("balanced", "大陆与海外都希望基本稳定"),
          option("campus", "主要是校园、同行与熟人访问"),
          option("unknown", "目前没有明确受众地域"),
        ],
      },
      {
        id: "domain_state",
        depth: 1,
        type: "choice",
        title: "域名现在是什么状态？",
        options: [
          option("owned", "已有合适域名"),
          option("owned_unsure", "有域名，但不确定是否用于博客"),
          option("need", "需要一起选择和购买"),
          option("subdomain", "先用平台子域名或现有域名的子域"),
          option("later", "本地版本确定后再处理"),
        ],
      },
      {
        id: "analytics_posture",
        depth: 2,
        type: "choice",
        title: "你希望了解访问情况到什么程度？",
        options: [
          option("none", "不统计，完全不关心数字"),
          option("basic", "只看匿名访问量、热门页面和来源"),
          option("privacy", "使用隐私友好的自托管或付费统计"),
          option("detailed", "需要事件、路径、地区等较详细分析"),
          option("server", "只保留服务器日志，需要时再看"),
          option("later", "先不接，发布后再决定"),
        ],
      },
      {
        id: "source_openness",
        depth: 2,
        type: "choice",
        title: "网站源码和内容仓库希望公开到什么程度？",
        options: [
          option("all_public", "源码与公开内容都开源"),
          option("code_public", "源码公开，内容库单独管理"),
          option("private", "代码与内容都用私有仓库"),
          option("template", "网站私有，但以后整理出公开模板"),
          option("unsure", "暂时私有，成熟后再判断"),
        ],
      },
      {
        id: "external_integrations",
        depth: 3,
        type: "long",
        title: "有哪些现成服务、设备或数据源，你会想让网站接入？",
        placeholder: "例如：GitHub、豆瓣、Last.fm、Spotify、Zotero、Readwise、VPS 状态、天气、自己的 API、相册……",
      },
      {
        id: "security_boundaries",
        depth: 3,
        type: "multi",
        title: "技术上哪些边界需要从第一天就守住？",
        options: [
          option("secrets", "密钥绝不进入公开代码或浏览器"),
          option("admin", "管理入口需要强认证"),
          option("personal", "个人数据尽量不交给第三方"),
          option("forms", "表单要防垃圾与滥用"),
          option("updates", "依赖和安全更新有明确流程"),
          option("isolation", "网站与个人 VPS 其他服务隔离"),
          option("minimal", "尽量减少数据库、账号和攻击面"),
          option("guidance", "我不确定，希望方案里明确说明"),
        ],
      },
    ],
  },
  {
    id: "maintenance",
    index: "08",
    title: "维护与成本",
    description: "一个好方案不仅能上线，还要能在忙碌、换电脑、兴趣转移甚至几年停更后继续活着。",
    questions: [
      {
        id: "monthly_time",
        depth: 1,
        required: true,
        type: "choice",
        title: "除了写内容，你每月愿意花多少时间维护网站本身？",
        options: [
          option("zero", "接近 0：最好自动运行"),
          option("one", "约 1 小时：处理更新和小问题"),
          option("three", "2–4 小时：愿意持续微调"),
          option("day", "半天到一天：把维护也当爱好"),
          option("seasonal", "平时很少，偶尔集中折腾"),
        ],
      },
      {
        id: "monthly_budget",
        depth: 1,
        required: true,
        type: "choice",
        title: "域名之外，长期可接受的月均维护费用是多少？",
        note: "免费方案通常够用；付费主要换取更省心、稳定的动态服务或更大资源。",
        options: [
          option("free", "尽量为 0 元"),
          option("low", "0–30 元"),
          option("medium", "30–100 元"),
          option("high", "100–300 元"),
          option("value", "不设固定值，只要收益明确"),
          option("unknown", "先给我看不同档位的差异"),
        ],
      },
      {
        id: "maintenance_style",
        depth: 2,
        type: "choice",
        title: "面对软件更新与小故障，你更像哪一种人？",
        options: [
          option("hands_off", "希望它自己恢复，我只收结果"),
          option("checklist", "给我清楚的检查表，我可以处理"),
          option("debug", "愿意看日志、升级依赖和排查问题"),
          option("rebuild", "技术栈过时后，愿意几年重做一次"),
          option("agent", "希望让 AI 代理承担例行维护，我审核变更"),
        ],
      },
      {
        id: "dependency_tolerance",
        depth: 2,
        type: "choice",
        title: "你如何看待插件、第三方 API 和外部平台依赖？",
        options: [
          option("minimal", "能少则少，宁可功能简单"),
          option("stable", "只用成熟、容易替换的依赖"),
          option("pragmatic", "好用就用，但保留导出与替代路径"),
          option("experimental", "愿意尝鲜，坏了再修"),
          option("managed", "付费换稳定也可以"),
        ],
      },
      {
        id: "backup_expectation",
        depth: 2,
        type: "choice",
        title: "哪种备份结果会让你安心？",
        options: [
          option("git", "Git 历史 + 本机副本"),
          option("cloud", "Git + 独立云盘或对象存储"),
          option("multi", "本机、代码托管和离线备份三份"),
          option("export", "平台自动备份，并可完整导出"),
          option("plan", "希望交付时给出明确备份与恢复方案"),
        ],
      },
      {
        id: "handoff_expectation",
        depth: 1,
        type: "multi",
        max: 6,
        title: "项目交付后，哪些材料对你最有用？",
        options: [
          option("readme", "一份从零启动和部署的说明"),
          option("architecture", "架构图与关键取舍说明"),
          option("content_guide", "写作、图片和发布规范"),
          option("runbook", "故障排查、备份和恢复手册"),
          option("costs", "服务、账号和费用清单"),
          option("automation", "自动化任务与密钥位置说明"),
          option("roadmap", "后续升级路线和暂缓功能清单"),
          option("recording", "关键操作的短演示或截图"),
        ],
      },
      {
        id: "hiatus_behavior",
        depth: 2,
        type: "choice",
        title: "如果一年没有更新，网站应该怎样表现？",
        options: [
          option("quiet", "安静保留，旧内容仍然完整可读"),
          option("status", "显示“暂时休眠”，说明最近状态"),
          option("archive", "自动进入档案模式，关闭动态功能"),
          option("digest", "首页改为最值得看的内容索引"),
          option("redirect", "只保留身份页，并指向新的主要空间"),
        ],
      },
      {
        id: "moderation_capacity",
        depth: 3,
        type: "choice",
        title: "如果开放评论或投稿，你愿意承担多少审核？",
        options: [
          option("none", "不想承担，功能设计应避开审核"),
          option("low", "每周集中看一次"),
          option("manual", "所有内容先审核再公开"),
          option("trusted", "登录或受信任读者可直接发"),
          option("later", "出现真实社区后再决定"),
        ],
      },
    ],
  },
  {
    id: "future",
    index: "09",
    title: "未来与人生",
    description: "网站也可以是一种面向未来的选择：它公开什么，就会吸引什么；它持续保存什么，就会塑造你如何理解自己。",
    questions: [
      {
        id: "future_roles",
        depth: 1,
        type: "multi",
        max: 5,
        title: "未来五到十年，你愿意让哪些身份逐渐变得更重要？",
        options: [
          option("scientist", "研究者 / 科学家"),
          option("engineer", "工程师 / 制作者"),
          option("founder", "创业者 / 产品创造者"),
          option("writer", "作者 / 公共表达者"),
          option("teacher", "教师 / 知识分享者"),
          option("curator", "策展者 / 信息连接者"),
          option("artist", "艺术与审美实践者"),
          option("organizer", "社群组织者 / 协作者"),
          option("explorer", "跨文化旅行者 / 世界观察者"),
          option("undefined", "不想过早定义，保留流动性"),
        ],
      },
      {
        id: "opportunities",
        depth: 2,
        type: "multi",
        max: 4,
        title: "你愿意让网站吸引哪些机会？",
        options: [
          option("research", "科研合作与学术交流"),
          option("engineering", "工程、开源与产品项目"),
          option("study", "升学、访问与跨学科机会"),
          option("speaking", "写作、演讲与播客邀请"),
          option("community", "社群、活动与策展"),
          option("consulting", "咨询、自由职业或商业合作"),
          option("friendship", "没有明确目的的长期友谊"),
          option("none", "不以机会为目标"),
        ],
      },
      {
        id: "ideal_day",
        depth: 3,
        type: "long",
        title: "描述一个你真正向往的普通工作日。",
        note: "地点、节奏、和谁一起、做什么、晚上如何结束，都可以写。这往往比职位名称更能说明方向。",
        placeholder: "不是最辉煌的一天，而是愿意重复很多次的普通一天……",
      },
      {
        id: "site_evolution",
        depth: 1,
        required: true,
        type: "choice",
        title: "你希望网站随人生变化时，采用哪种演化方式？",
        options: [
          option("one_home", "始终是一座房子，不断增建新房间"),
          option("editions", "像杂志分期，每个阶段有独立主题"),
          option("layers", "新身份覆盖上来，但旧层仍然可见"),
          option("archive_rebuild", "旧版封存，重要节点彻底改版"),
          option("network", "逐渐分化成主站和多个专题子站"),
          option("unknown", "现在只设计未来两三年"),
        ],
      },
      {
        id: "digital_legacy",
        depth: 2,
        type: "choice",
        title: "十几年后，你希望这些内容怎样被保存？",
        options: [
          option("living", "继续是一座可更新的网站"),
          option("archive", "可以冻结成完整、可浏览的静态档案"),
          option("export", "能导出为普通文件，由自己决定去处"),
          option("selected", "只保留经过整理的代表内容"),
          option("temporary", "不执着永久，阶段结束即可放下"),
          option("unknown", "希望方案保留多种可能"),
        ],
      },
      {
        id: "weird_interests",
        depth: 1,
        type: "long",
        title: "还有哪些“不够成体系但就是很喜欢”的东西，应该给它们留一扇门？",
        placeholder: "越具体越有用。可以是一位音乐人、一条街、一类机械结构、一段历史、一种声音或某种网上文化。",
      },
      {
        id: "impossible_feature",
        depth: 3,
        type: "long",
        title: "先不考虑预算和技术，你最想让这个网站做到的一件不切实际的事是什么？",
        placeholder: "大胆一点。我们未必照做，但它能暴露真正想要的体验。",
      },
      {
        id: "easter_egg",
        depth: 3,
        type: "long",
        title: "如果网站只能藏一个彩蛋，你想把什么留给认真探索的人？",
        placeholder: "一个隐藏房间、一段声音、一封信、一个小游戏、一张地图，或者别的东西。",
      },
    ],
  },
  {
    id: "final",
    index: "10",
    title: "收束与决策",
    description: "最后把模糊偏好变成路线选择的约束。我会用这一章来判断哪些方案值得提出，哪些应该主动排除。",
    questions: [
      {
        id: "nonnegotiables",
        depth: 1,
        required: true,
        type: "long",
        title: "请写下三条不可妥协的要求。",
        placeholder: "例如：大陆能正常打开；内容必须容易迁移；不要像求职主页；手机端必须舒服；维护不能超过每月一小时……",
      },
      {
        id: "tradeoffs",
        depth: 2,
        type: "multi",
        max: 4,
        title: "为了先做出一个好用的版本，你愿意暂时牺牲什么？",
        options: [
          option("features", "复杂动态功能"),
          option("visual", "高度定制的视觉细节"),
          option("speed", "极致加载速度"),
          option("editor", "可视化写作后台"),
          option("automation", "完整自动化工作流"),
          option("bilingual", "完整双语"),
          option("china", "中国大陆的极致访问速度"),
          option("zero_cost", "完全零费用"),
          option("nothing", "首版也不想明显妥协，宁愿慢一点"),
        ],
      },
      {
        id: "v1_scope",
        depth: 1,
        required: true,
        type: "choice",
        title: "第一版做到什么程度，你会愿意真正开始使用？",
        options: [
          option("weekend", "最小版本", "首页、文章、关于、RSS，尽快开始写。"),
          option("solid", "完整基础版", "核心栏目、搜索、项目页、内容工作流都可用。"),
          option("signature", "有代表性的首发版", "基础功能之外，至少有一个鲜明体验或视觉记忆点。"),
          option("platform", "个人数字平台", "整合知识库、动态数据、自动化与长期运营能力。"),
          option("prototype", "先做两个视觉原型", "看到实际页面后再决定首版范围。"),
        ],
      },
      {
        id: "launch_window",
        depth: 1,
        type: "choice",
        title: "你希望本地可用版本大致在什么节奏出现？",
        options: [
          option("fast", "几天内先看到可操作原型"),
          option("weeks", "一到三周，边看边迭代"),
          option("month", "一个月左右，先把内容和系统想细"),
          option("open", "没有截止时间，以方向正确为主"),
          option("milestone", "跟某个升学、项目或个人节点同步"),
        ],
      },
      {
        id: "collaboration_style",
        depth: 1,
        required: true,
        type: "choice",
        title: "下一步你最希望我怎样帮助你做决定？",
        options: [
          option("three", "给三套差异明显的完整路线", "逐套讲效果、技术、成本、工作流与取舍。"),
          option("recommend", "给明确主张", "提出主方案和一个备选，并说明为什么。"),
          option("prototype", "先做两三个首页方向原型", "用实际观感帮助我们收敛。"),
          option("architecture", "先把内容与技术架构定清", "视觉在结构稳定后继续讨论。"),
          option("dialogue", "继续一轮针对性访谈", "根据这份答案追问最关键的矛盾。"),
        ],
      },
      {
        id: "anything_else",
        depth: 1,
        type: "long",
        title: "还有什么是前面没有问到，但会影响这个网站的？",
        placeholder: "任何补充、矛盾、担忧、期待，或者想对未来网站说的一句话。",
      },
    ],
  },
];

const depthNames = { 1: "轻量", 2: "标准", 3: "深潜" };
let state = loadState();
let activeSection = sections[0].id;
let saveTimer;
let toastTimer;
let observer;

const sectionRoot = document.querySelector("#section-root");
const chapterNav = document.querySelector("#chapter-nav");
const form = document.querySelector("#survey-form");
const toast = document.querySelector("#toast");

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && typeof saved === "object") {
      return {
        depth: [1, 2, 3].includes(Number(saved.depth)) ? Number(saved.depth) : 2,
        answers: saved.answers && typeof saved.answers === "object" ? saved.answers : {},
        lastSaved: saved.lastSaved || null,
      };
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
  return { depth: 2, answers: {}, lastSaved: null };
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function questionNumber(sectionIndex, questionIndex) {
  return `${String(sectionIndex + 1).padStart(2, "0")}.${String(questionIndex + 1).padStart(2, "0")}`;
}

function visibleQuestions(section) {
  return section.questions.filter((question) => question.depth <= state.depth);
}

function allVisibleQuestions() {
  return sections.flatMap((section) => visibleQuestions(section));
}

function isAnswered(question) {
  const value = state.answers[question.id];
  if (Array.isArray(value)) return value.length > 0;
  if (value && typeof value === "object") return Object.keys(value).length > 0;
  return value !== undefined && value !== null && String(value).trim() !== "";
}

function optionByValue(question, value) {
  return question.options?.find((item) => item.value === value);
}

function renderNav() {
  chapterNav.innerHTML = sections
    .map((section) => {
      const visible = visibleQuestions(section);
      const answered = visible.filter(isAnswered).length;
      return `
        <button class="chapter-link${section.id === activeSection ? " is-active" : ""}" type="button" data-section-target="${section.id}">
          <span class="chapter-number">${section.index}</span>
          <span>${escapeHtml(section.title)}</span>
          <span class="chapter-count">${answered}/${visible.length}</span>
        </button>
      `;
    })
    .join("");
}

function renderChoice(question, answer) {
  const compact = question.compact ? " compact" : "";
  return `<div class="options-grid${compact}">${question.options
    .map((item) => {
      const selected = answer === item.value;
      return `
        <label class="option-card${selected ? " is-selected" : ""}" data-kind="radio">
          <input type="radio" name="${question.id}" data-question="${question.id}" value="${escapeHtml(item.value)}"${selected ? " checked" : ""} />
          <span class="option-indicator" aria-hidden="true"></span>
          <span class="option-copy">
            <span class="option-label">${escapeHtml(item.label)}</span>
            ${item.description ? `<span class="option-description">${escapeHtml(item.description)}</span>` : ""}
          </span>
        </label>`;
    })
    .join("")}</div>`;
}

function renderMulti(question, answer) {
  const values = Array.isArray(answer) ? answer : [];
  return `<div class="options-grid">${question.options
    .map((item) => {
      const selected = values.includes(item.value);
      return `
        <label class="option-card${selected ? " is-selected" : ""}" data-kind="checkbox">
          <input type="checkbox" name="${question.id}" data-question="${question.id}" value="${escapeHtml(item.value)}"${selected ? " checked" : ""} />
          <span class="option-indicator" aria-hidden="true"></span>
          <span class="option-copy">
            <span class="option-label">${escapeHtml(item.label)}</span>
            ${item.description ? `<span class="option-description">${escapeHtml(item.description)}</span>` : ""}
          </span>
        </label>`;
    })
    .join("")}</div>`;
}

function renderMood(question, answer) {
  return `<div class="mood-grid">${question.options
    .map((item) => {
      const selected = answer === item.value;
      return `
        <label class="mood-card${selected ? " is-selected" : ""}">
          <input type="radio" name="${question.id}" data-question="${question.id}" value="${escapeHtml(item.value)}"${selected ? " checked" : ""} />
          <span class="mood-preview mood-${escapeHtml(item.value)}" aria-hidden="true"><span></span><span></span><span></span><span></span></span>
          <span class="mood-meta">
            <span class="mood-name">${escapeHtml(item.label)}</span>
            <span class="mood-caption">${escapeHtml(item.description)}</span>
          </span>
        </label>`;
    })
    .join("")}</div>`;
}

function renderScale(question, answer) {
  const value = answer ?? question.defaultValue ?? question.min;
  return `
    <div class="scale-wrap">
      <div class="scale-readout"><span class="scale-value" data-scale-value="${question.id}">${escapeHtml(value)}</span><span class="scale-unit">${escapeHtml(question.unit || "")}</span></div>
      <input class="scale-input" type="range" data-question="${question.id}" min="${question.min}" max="${question.max}" step="${question.step || 1}" value="${escapeHtml(value)}" aria-label="${escapeHtml(question.title)}" />
      <div class="scale-labels"><span>${escapeHtml(question.leftLabel)}</span><span>${escapeHtml(question.rightLabel)}</span></div>
    </div>`;
}

function renderPairs(question, answer) {
  const values = answer && typeof answer === "object" ? answer : {};
  const positions = [
    { value: "left", label: "左" },
    { value: "middle", label: "中" },
    { value: "right", label: "右" },
  ];
  return `<div class="pair-list">${question.rows
    .map(
      (row) => `
        <div class="pair-row">
          <span class="pair-label">${escapeHtml(row.left)}</span>
          ${positions
            .map(
              (position) => `
                <label class="pair-choice${values[row.id] === position.value ? " is-selected" : ""}" title="${escapeHtml(position.label)}">
                  <input type="radio" name="${question.id}-${row.id}" data-question="${question.id}" data-row="${row.id}" value="${position.value}"${values[row.id] === position.value ? " checked" : ""} />
                  <span>${position.label}</span>
                </label>`,
            )
            .join("")}
          <span class="pair-label">${escapeHtml(row.right)}</span>
        </div>`,
    )
    .join("")}</div>`;
}

function renderRank(question, answer) {
  const selected = Array.isArray(answer) ? answer : [];
  const available = question.options.filter((item) => !selected.includes(item.value));
  const limitReached = selected.length >= (question.max || question.options.length);
  return `
    <div class="rank-layout" data-rank-question="${question.id}">
      <div class="rank-bank">
        <p class="rank-column-title">可选项</p>
        ${
          available.length && !limitReached
            ? available
                .map(
                  (item) => `<button class="rank-button" type="button" data-rank-action="add" data-question="${question.id}" data-value="${escapeHtml(item.value)}"><span>＋</span><span>${escapeHtml(item.label)}</span></button>`,
                )
                .join("")
            : `<div class="rank-empty">${limitReached ? "已达到选择上限" : "所有选项都已排序"}</div>`
        }
      </div>
      <div class="rank-result">
        <p class="rank-column-title">你的优先顺序</p>
        ${
          selected.length
            ? selected
                .map((value, index) => {
                  const item = optionByValue(question, value);
                  return `<button class="rank-item" type="button" data-rank-action="remove" data-question="${question.id}" data-value="${escapeHtml(value)}"><span class="rank-index">${index + 1}</span><span>${escapeHtml(item?.label || value)}</span></button>`;
                })
                .join("")
            : '<div class="rank-empty">尚未选择</div>'
        }
      </div>
    </div>`;
}

function renderInput(question, answer) {
  switch (question.type) {
    case "choice":
      return renderChoice(question, answer);
    case "multi":
      return renderMulti(question, answer);
    case "mood":
      return renderMood(question, answer);
    case "scale":
      return renderScale(question, answer);
    case "pairs":
      return renderPairs(question, answer);
    case "rank":
      return renderRank(question, answer);
    case "long":
      return `<textarea class="text-area" data-question="${question.id}" placeholder="${escapeHtml(question.placeholder || "")}">${escapeHtml(answer || "")}</textarea>`;
    case "short":
    default:
      return `<input class="text-input" type="text" data-question="${question.id}" value="${escapeHtml(answer || "")}" placeholder="${escapeHtml(question.placeholder || "")}" />`;
  }
}

function renderQuestion(question, sectionIndex, originalQuestionIndex) {
  return `
    <article class="question" data-question-container="${question.id}">
      <div class="question-number">${questionNumber(sectionIndex, originalQuestionIndex)}</div>
      <div class="question-body">
        <div class="question-title-row">
          <h3>${escapeHtml(question.title)}</h3>
          ${question.required ? '<span class="required-mark">关键题</span>' : ""}
        </div>
        ${question.note ? `<p class="question-note">${escapeHtml(question.note)}</p>` : '<div class="question-note" aria-hidden="true"></div>'}
        ${renderInput(question, state.answers[question.id])}
        ${question.required ? '<p class="validation-message">这道关键题还没有回答。</p>' : ""}
      </div>
    </article>`;
}

function renderSubmitPanel() {
  const visible = allVisibleQuestions();
  const answered = visible.filter(isAnswered).length;
  const required = visible.filter((question) => question.required);
  const requiredAnswered = required.filter(isAnswered).length;
  return `
    <div class="submit-panel" id="submit-panel">
      <p class="eyebrow">READY FOR SYNTHESIS</p>
      <h3>把这份画像交给下一步</h3>
      <p>提交后，工作区会生成一份便于阅读的 Markdown 和一份保留结构的 JSON。</p>
      <div class="submit-stats">
        <div class="submit-stat"><strong id="stat-answered">${answered}</strong><span>已回答</span></div>
        <div class="submit-stat"><strong id="stat-visible">${visible.length}</strong><span>当前显示</span></div>
        <div class="submit-stat"><strong id="stat-required">${requiredAnswered}/${required.length}</strong><span>关键题</span></div>
      </div>
      <div class="submit-actions">
        <button id="submit-survey" class="button" type="button">提交到工作区</button>
        <button id="download-survey" class="button secondary" type="button">下载 JSON</button>
      </div>
      <div id="submission-result" class="submission-result" role="status"></div>
    </div>`;
}

function renderSections() {
  sectionRoot.innerHTML = sections
    .map((section, sectionIndex) => {
      const questions = visibleQuestions(section);
      const questionMarkup = questions
        .map((question) => renderQuestion(question, sectionIndex, section.questions.indexOf(question)))
        .join("");
      return `
        <section id="section-${section.id}" class="survey-section" data-section="${section.id}" aria-labelledby="heading-${section.id}">
          <div class="section-inner">
            <header class="section-heading">
              <div class="section-kicker">${section.index}</div>
              <div>
                <h2 id="heading-${section.id}">${escapeHtml(section.title)}</h2>
                <p>${escapeHtml(section.description)}</p>
              </div>
            </header>
            ${questionMarkup}
            ${section.id === "final" ? renderSubmitPanel() : ""}
          </div>
        </section>`;
    })
    .join("");
  setupSectionObserver();
  updateProgress();
}

function renderDepthControl() {
  document.querySelectorAll("[data-depth]").forEach((button) => {
    const active = Number(button.dataset.depth) === state.depth;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function updateProgress() {
  const visible = allVisibleQuestions();
  const required = visible.filter((question) => question.required);
  const requiredAnswered = required.filter(isAnswered).length;
  const percentage = required.length ? (requiredAnswered / required.length) * 100 : 0;
  document.querySelector("#progress-label").textContent = `关键题 ${requiredAnswered} / ${required.length}`;
  document.querySelector("#progress-fill").style.width = `${percentage}%`;

  const answered = visible.filter(isAnswered).length;
  const statAnswered = document.querySelector("#stat-answered");
  const statVisible = document.querySelector("#stat-visible");
  const statRequired = document.querySelector("#stat-required");
  if (statAnswered) statAnswered.textContent = answered;
  if (statVisible) statVisible.textContent = visible.length;
  if (statRequired) statRequired.textContent = `${requiredAnswered}/${required.length}`;
  renderNav();
}

function formatSaveTime(date) {
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function persistState() {
  state.lastSaved = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  document.querySelector("#save-dot").classList.add("is-saved");
  document.querySelector("#save-label").textContent = `${formatSaveTime(new Date())} 已保存`;
}

function schedulePersist() {
  clearTimeout(saveTimer);
  const label = document.querySelector("#save-label");
  if (label) label.textContent = "正在保存…";
  saveTimer = window.setTimeout(persistState, 180);
}

function updateAnswer(questionId, value) {
  if (value === "" || value === null || (Array.isArray(value) && value.length === 0)) {
    delete state.answers[questionId];
  } else {
    state.answers[questionId] = value;
  }
  document.querySelector(`[data-question-container="${questionId}"]`)?.classList.remove("has-error");
  schedulePersist();
  updateProgress();
}

function syncSelectionClasses(questionId) {
  document.querySelectorAll(`[data-question="${questionId}"]`).forEach((input) => {
    input.closest(".option-card, .mood-card, .pair-choice")?.classList.toggle("is-selected", input.checked);
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function setupSectionObserver() {
  observer?.disconnect();
  observer = new IntersectionObserver(
    (entries) => {
      const candidates = entries.filter((entry) => entry.isIntersecting);
      if (!candidates.length) return;
      candidates.sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
      activeSection = candidates[0].target.dataset.section;
      renderNav();
    },
    { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
  );
  document.querySelectorAll(".survey-section").forEach((section) => observer.observe(section));
}

function findQuestion(questionId) {
  for (const section of sections) {
    const question = section.questions.find((item) => item.id === questionId);
    if (question) return question;
  }
  return null;
}

form.addEventListener("input", (event) => {
  const input = event.target.closest("[data-question]");
  if (!input || input.type === "radio" || input.type === "checkbox") return;
  const questionId = input.dataset.question;
  const value = input.type === "range" ? Number(input.value) : input.value;
  if (input.type === "range") {
    const readout = document.querySelector(`[data-scale-value="${questionId}"]`);
    if (readout) readout.textContent = input.value;
  }
  updateAnswer(questionId, value);
});

form.addEventListener("change", (event) => {
  const input = event.target.closest("[data-question]");
  if (!input || (input.type !== "radio" && input.type !== "checkbox")) return;
  const questionId = input.dataset.question;
  const question = findQuestion(questionId);
  if (!question) return;

  if (question.type === "multi") {
    const current = Array.isArray(state.answers[questionId]) ? [...state.answers[questionId]] : [];
    if (input.checked) {
      if (question.max && current.length >= question.max) {
        input.checked = false;
        showToast(`这题最多选择 ${question.max} 项`);
        return;
      }
      current.push(input.value);
    } else {
      const index = current.indexOf(input.value);
      if (index >= 0) current.splice(index, 1);
    }
    updateAnswer(questionId, current);
  } else if (question.type === "pairs") {
    const current = state.answers[questionId] && typeof state.answers[questionId] === "object" ? { ...state.answers[questionId] } : {};
    current[input.dataset.row] = input.value;
    updateAnswer(questionId, current);
  } else {
    updateAnswer(questionId, input.value);
  }
  syncSelectionClasses(questionId);
});

form.addEventListener("click", (event) => {
  const rankButton = event.target.closest("[data-rank-action]");
  if (rankButton) {
    const questionId = rankButton.dataset.question;
    const question = findQuestion(questionId);
    const current = Array.isArray(state.answers[questionId]) ? [...state.answers[questionId]] : [];
    if (rankButton.dataset.rankAction === "add") {
      if (question.max && current.length >= question.max) {
        showToast(`这题最多选择 ${question.max} 项`);
        return;
      }
      if (!current.includes(rankButton.dataset.value)) current.push(rankButton.dataset.value);
    } else {
      const index = current.indexOf(rankButton.dataset.value);
      if (index >= 0) current.splice(index, 1);
    }
    const scrollY = window.scrollY;
    updateAnswer(questionId, current);
    renderSections();
    window.scrollTo(0, scrollY);
    return;
  }

  if (event.target.closest("#submit-survey")) submitSurvey();
  if (event.target.closest("#download-survey")) downloadSurvey();
});

document.querySelector(".depth-control").addEventListener("click", (event) => {
  const button = event.target.closest("[data-depth]");
  if (!button) return;
  state.depth = Number(button.dataset.depth);
  schedulePersist();
  renderDepthControl();
  renderSections();
  showToast(`已切换到${depthNames[state.depth]}问卷`);
});

chapterNav.addEventListener("click", (event) => {
  const button = event.target.closest("[data-section-target]");
  if (!button) return;
  document.querySelector(`#section-${button.dataset.sectionTarget}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
});

function answerForExport(question) {
  const raw = state.answers[question.id];
  if (!isAnswered(question)) return "";
  if (question.type === "choice" || question.type === "mood") {
    return optionByValue(question, raw)?.label || raw;
  }
  if (question.type === "multi" || question.type === "rank") {
    return raw.map((value) => optionByValue(question, value)?.label || value);
  }
  if (question.type === "scale") {
    return `${raw} / ${question.max}（${question.leftLabel}；${question.rightLabel}）`;
  }
  if (question.type === "pairs") {
    const positionNames = { left: "偏左", middle: "居中", right: "偏右" };
    return Object.fromEntries(
      question.rows
        .filter((row) => raw[row.id])
        .map((row) => [`${row.left} ←→ ${row.right}`, positionNames[raw[row.id]]]),
    );
  }
  return raw;
}

function buildPayload() {
  const included = (question) => question.depth <= state.depth || isAnswered(question);
  const visible = allVisibleQuestions();
  const required = visible.filter((question) => question.required);
  return {
    version: QUESTIONNAIRE_VERSION,
    depth: state.depth,
    depthLabel: depthNames[state.depth],
    stats: {
      answered: visible.filter(isAnswered).length,
      visible: visible.length,
      requiredAnswered: required.filter(isAnswered).length,
      required: required.length,
    },
    sections: sections.map((section) => ({
      id: section.id,
      index: section.index,
      title: section.title,
      answers: section.questions.filter(included).map((question, questionIndex) => ({
        id: question.id,
        number: questionNumber(sections.indexOf(section), section.questions.indexOf(question)),
        question: question.title,
        required: Boolean(question.required),
        answered: isAnswered(question),
        value: answerForExport(question),
      })),
    })),
    rawAnswers: { ...state.answers },
  };
}

function validateRequired() {
  document.querySelectorAll(".question.has-error").forEach((item) => item.classList.remove("has-error"));
  const missing = allVisibleQuestions().filter((question) => question.required && !isAnswered(question));
  for (const question of missing) {
    document.querySelector(`[data-question-container="${question.id}"]`)?.classList.add("has-error");
  }
  if (missing.length) {
    document.querySelector(`[data-question-container="${missing[0].id}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    showToast(`还有 ${missing.length} 道关键题未回答`);
    return false;
  }
  return true;
}

async function submitSurvey() {
  if (!validateRequired()) return;
  persistState();
  const button = document.querySelector("#submit-survey");
  const result = document.querySelector("#submission-result");
  button.disabled = true;
  button.textContent = "正在提交…";
  result.classList.remove("is-visible");

  try {
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildPayload()),
    });
    const data = await response.json();
    if (!response.ok || !data.ok) throw new Error(data.error || "提交失败");
    result.textContent = `已于 ${data.submittedAt} 提交。工作区已生成 ${data.files.join(" 和 ")}。`;
    result.classList.add("is-visible");
    button.textContent = "重新提交";
    showToast("答案已写入工作区");
  } catch (error) {
    result.textContent = `提交失败：${error.message}。你的浏览器草稿仍然保留。`;
    result.classList.add("is-visible");
    button.textContent = "再次提交";
  } finally {
    button.disabled = false;
  }
}

function downloadSurvey() {
  const payload = { ...buildPayload(), exportedAt: new Date().toISOString() };
  const blob = new Blob([`${JSON.stringify(payload, null, 2)}\n`], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "个人网站方向问卷.json";
  anchor.click();
  URL.revokeObjectURL(url);
}

const clearDialog = document.querySelector("#clear-dialog");
document.querySelector("#clear-draft").addEventListener("click", () => clearDialog.showModal());
document.querySelector("#confirm-clear").addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  state = { depth: 2, answers: {}, lastSaved: null };
  activeSection = sections[0].id;
  renderDepthControl();
  renderSections();
  document.querySelector("#save-dot").classList.remove("is-saved");
  document.querySelector("#save-label").textContent = "尚未作答";
  window.scrollTo({ top: 0, behavior: "smooth" });
  showToast("本地草稿已清空");
});

function initialize() {
  renderDepthControl();
  renderSections();
  if (state.lastSaved) {
    document.querySelector("#save-dot").classList.add("is-saved");
    document.querySelector("#save-label").textContent = `${formatSaveTime(new Date(state.lastSaved))} 已保存`;
  }
}

initialize();
