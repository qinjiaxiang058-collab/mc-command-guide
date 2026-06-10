const commands = [
  {
    name: "/advancement",
    category: "玩家与进度",
    level: "2",
    summary: "授予、移除或检测玩家进度。",
    aliases: [],
    syntax: [
      ["advancement grant <targets> only <advancement> [<criterion>]", "只授予指定进度或进度中的一个条件。"],
      ["advancement grant <targets> from|through|until <advancement>", "按进度树批量授予。"],
      ["advancement grant <targets> everything", "授予所有进度。"],
      ["advancement revoke <targets> only|from|through|until <advancement> [<criterion>]", "按同样范围移除进度。"]
    ],
    params: [
      ["targets", "目标玩家。"],
      ["advancement", "进度 ID，例如 minecraft:story/mine_stone。"],
      ["criterion", "进度条件名。"]
    ],
    examples: [["advancement grant @a only minecraft:story/mine_stone", "给所有玩家授予采石进度。"]],
    notes: "只适用于玩家，常用于地图流程、教程引导和数据包奖励。"
  },
  {
    name: "/attribute",
    category: "实体与战斗",
    level: "2",
    summary: "查询或修改实体属性值与属性修饰符。",
    aliases: [],
    syntax: [
      ["attribute <target> <attribute> get [<scale>]", "读取属性当前值。"],
      ["attribute <target> <attribute> base get|set <value>", "读取或设置基础值。"],
      ["attribute <target> <attribute> modifier add <id> <value> add_value|add_multiplied_base|add_multiplied_total", "添加属性修饰符。"],
      ["attribute <target> <attribute> modifier remove <id>", "移除指定修饰符。"],
      ["attribute <target> <attribute> modifier value get <id> [<scale>]", "读取修饰符数值。"]
    ],
    params: [
      ["target", "单个实体。"],
      ["attribute", "属性 ID，如 minecraft:max_health、minecraft:movement_speed。"],
      ["id", "修饰符 ID。"]
    ],
    examples: [["attribute @s minecraft:max_health base set 40", "把自己的最大生命值设为 40。"]],
    notes: "修改生命上限后通常还要用 /effect 或 /data 处理当前生命值。"
  },
  {
    name: "/ban",
    category: "服务器管理",
    level: "3",
    summary: "将玩家名加入封禁列表。",
    aliases: [],
    syntax: [["ban <targets> [<reason>]", "封禁一个或多个玩家，可附带原因。"]],
    params: [["targets", "在线或可解析的玩家名。"], ["reason", "显示给被封禁玩家的文本原因。"]],
    examples: [["ban Steve griefing", "以 griefing 为原因封禁 Steve。"]],
    notes: "仅多人服务器有意义。解封用 /pardon。"
  },
  {
    name: "/ban-ip",
    category: "服务器管理",
    level: "3",
    summary: "将 IP 地址加入封禁列表。",
    aliases: [],
    syntax: [["ban-ip <target> [<reason>]", "封禁 IP 或在线玩家当前 IP。"]],
    params: [["target", "IP 地址或玩家名。"], ["reason", "封禁原因。"]],
    examples: [["ban-ip 203.0.113.10 spam", "封禁指定 IP。"]],
    notes: "共享网络环境下慎用，可能影响无关玩家。"
  },
  {
    name: "/banlist",
    category: "服务器管理",
    level: "3",
    summary: "显示玩家封禁或 IP 封禁列表。",
    aliases: [],
    syntax: [["banlist [players|ips]", "查看封禁名单；省略时显示玩家封禁。"]],
    params: [["players|ips", "选择玩家封禁或 IP 封禁。"]],
    examples: [["banlist ips", "查看被封禁 IP。"]],
    notes: "只读命令。"
  },
  {
    name: "/bossbar",
    category: "界面与文本",
    level: "2",
    summary: "创建和修改自定义 Boss 血条。",
    aliases: [],
    syntax: [
      ["bossbar add <id> <name>", "创建 Bossbar。"],
      ["bossbar get <id> max|players|value|visible", "读取属性。"],
      ["bossbar list", "列出 Bossbar。"],
      ["bossbar remove <id>", "删除 Bossbar。"],
      ["bossbar set <id> color|max|name|players|style|value|visible <value>", "设置显示属性、目标玩家和值。"]
    ],
    params: [["id", "命名空间 ID。"], ["name", "JSON 文本组件。"], ["players", "能看到 Bossbar 的玩家。"]],
    examples: [["bossbar set custom:timer value 50", "把 custom:timer 的当前值设为 50。"]],
    notes: "常用于副本计时、Boss 战阶段、区域提示。"
  },
  {
    name: "/clear",
    category: "物品与背包",
    level: "2",
    summary: "清除或检测玩家物品栏中的物品。",
    aliases: [],
    syntax: [["clear [<targets>] [<item>] [<maxCount>]", "清除目标玩家物品；maxCount 为 0 时只检测数量。"]],
    params: [["targets", "目标玩家，默认执行者。"], ["item", "物品谓词或物品 ID。"], ["maxCount", "最大清除数量。"]],
    examples: [["clear @a minecraft:diamond 1", "从每个玩家背包移除最多 1 个钻石。"]],
    notes: "可配合命令方块返回值检测玩家是否拥有物品。"
  },
  {
    name: "/clone",
    category: "方块与世界",
    level: "2",
    summary: "复制一个区域的方块到另一个位置。",
    aliases: [],
    syntax: [
      ["clone <begin> <end> <destination> [replace|masked] [normal|force|move]", "复制区域。"],
      ["clone <begin> <end> <destination> filtered <filter> [normal|force|move]", "只复制符合过滤条件的方块。"]
    ],
    params: [["begin/end", "源区域两个角坐标。"], ["destination", "目标区域较小坐标角。"], ["filter", "方块谓词。"]],
    examples: [["clone 0 64 0 8 70 8 20 64 0 masked", "复制非空气方块到新位置。"]],
    notes: "大区域受 gamerule minecraft:max_block_modifications 限制。"
  },
  {
    name: "/damage",
    category: "实体与战斗",
    level: "2",
    summary: "对实体造成指定类型和来源的伤害。",
    aliases: [],
    syntax: [
      ["damage <target> <amount> [<damageType>]", "造成基础伤害。"],
      ["damage <target> <amount> <damageType> at <location>", "指定伤害位置。"],
      ["damage <target> <amount> <damageType> by <entity> [from <cause>]", "指定直接实体和间接来源。"]
    ],
    params: [["target", "单个目标实体。"], ["damageType", "伤害类型 ID。"], ["cause", "间接来源实体。"]],
    examples: [["damage @e[type=zombie,limit=1] 6 minecraft:magic", "对一个僵尸造成 6 点魔法伤害。"]],
    notes: "适合制作技能、陷阱和自定义战斗逻辑。"
  },
  {
    name: "/data",
    category: "数据与 NBT",
    level: "2",
    summary: "读取、合并、修改或删除实体、方块实体和命令存储的 NBT 数据。",
    aliases: [],
    syntax: [
      ["data get block|entity|storage <target> [<path>] [<scale>]", "读取 NBT。"],
      ["data merge block|entity|storage <target> <nbt>", "合并 NBT。"],
      ["data modify block|entity|storage <target> <path> set|merge|append|prepend|insert ...", "修改列表或复合标签。"],
      ["data remove block|entity|storage <target> <path>", "删除路径上的数据。"]
    ],
    params: [["target", "方块坐标、实体或 storage ID。"], ["path", "NBT 路径。"], ["nbt", "SNBT 数据。"]],
    examples: [["data get entity @s Pos", "读取自己的坐标 NBT。"]],
    notes: "玩家实体的大量核心数据不能直接修改。数据包推荐使用 storage 保存中间状态。"
  },
  {
    name: "/datapack",
    category: "数据包与函数",
    level: "2",
    summary: "启用、禁用或列出数据包。",
    aliases: [],
    syntax: [
      ["datapack create <id> <name>", "创建一个空目录数据包，pack version 自动匹配当前游戏。"],
      ["datapack enable <name> [first|last|before <existing>|after <existing>]", "启用数据包并决定加载顺序。"],
      ["datapack disable <name>", "禁用数据包。"],
      ["datapack list [available|enabled]", "列出数据包。"]
    ],
    params: [["id", "新数据包目录名。"], ["name", "pack.mcmeta 描述文本组件。"], ["existing", "已存在的数据包。"]],
    examples: [["datapack create tutorial {\"text\":\"教程数据包\"}", "在当前世界创建一个空数据包。"], ["datapack list enabled", "查看已启用数据包。"]],
    notes: "修改后通常需要 /reload。"
  },
  {
    name: "/debug",
    category: "调试与性能",
    level: "3",
    summary: "启动或停止调试分析。",
    aliases: [],
    syntax: [["debug start", "开始调试采样。"], ["debug stop", "停止并输出报告。"], ["debug function <name>", "调试执行函数。"]],
    params: [["name", "函数 ID。"]],
    examples: [["debug start", "开始一次性能调试。"]],
    notes: "用于定位卡顿和函数开销；生产服务器谨慎使用。"
  },
  {
    name: "/dialog",
    category: "界面与文本",
    level: "2",
    summary: "向玩家显示或清除数据包定义的客户端对话框。",
    aliases: [],
    syntax: [
      ["dialog show <targets> <dialog>", "向目标玩家显示命名空间对话框或内联对话框。"],
      ["dialog clear <targets>", "清除目标玩家当前可见对话框。"]
    ],
    params: [["targets", "玩家名、UUID 或玩家选择器。"], ["dialog", "minecraft:dialog 注册表 ID 或内联 dialog 对象。"]],
    examples: [["dialog show @p minecraft:server_links", "向最近玩家显示内置 server links 对话框。"]],
    notes: "1.21.6 加入；属于实验性自定义 UI 能力，适合服务器菜单和数据包交互。"
  },
  {
    name: "/defaultgamemode",
    category: "世界规则",
    level: "2",
    summary: "设置新玩家加入时的默认游戏模式。",
    aliases: [],
    syntax: [["defaultgamemode adventure|creative|spectator|survival", "设置默认模式。"]],
    params: [["mode", "目标游戏模式。"]],
    examples: [["defaultgamemode adventure", "让新玩家默认冒险模式。"]],
    notes: "不会自动修改已在线玩家的模式。"
  },
  {
    name: "/deop",
    category: "服务器管理",
    level: "3",
    summary: "移除玩家的 OP 权限。",
    aliases: [],
    syntax: [["deop <targets>", "撤销一个或多个玩家的管理员权限。"]],
    params: [["targets", "玩家名。"]],
    examples: [["deop Steve", "移除 Steve 的 OP。"]],
    notes: "需要足够权限。"
  },
  {
    name: "/difficulty",
    category: "世界规则",
    level: "2",
    summary: "查询或设置世界难度。",
    aliases: [],
    syntax: [["difficulty [peaceful|easy|normal|hard]", "省略参数时查询，提供参数时设置。"]],
    params: [["difficulty", "和平、简单、普通、困难。"]],
    examples: [["difficulty hard", "设置为困难。"]],
    notes: "部分服务器可能锁定难度。"
  },
  {
    name: "/effect",
    category: "实体与战斗",
    level: "2",
    summary: "给予、清除或查询状态效果。",
    aliases: [],
    syntax: [
      ["effect give <targets> <effect> [<seconds>] [<amplifier>] [<hideParticles>]", "给予药水/状态效果。"],
      ["effect clear [<targets>] [<effect>]", "清除效果。"]
    ],
    params: [["effect", "效果 ID。"], ["seconds", "持续秒数。"], ["amplifier", "等级从 0 开始。"]],
    examples: [["effect give @p minecraft:speed 30 1 true", "给最近玩家速度 II 30 秒且隐藏粒子。"]],
    notes: "amplifier 0 表示 I，1 表示 II。"
  },
  {
    name: "/enchant",
    category: "物品与背包",
    level: "2",
    summary: "给玩家手持物品添加可兼容附魔。",
    aliases: [],
    syntax: [["enchant <targets> <enchantment> [<level>]", "为目标玩家当前选中物品添加附魔。"]],
    params: [["enchantment", "附魔 ID。"], ["level", "附魔等级。"]],
    examples: [["enchant @s minecraft:sharpness 5", "给自己手持物品添加锋利 V。"]],
    notes: "不能突破原版兼容性和等级限制；复杂物品用 /give 组件或 /item。"
  },
  {
    name: "/execute",
    category: "逻辑与流程",
    level: "2",
    summary: "改变执行者、位置、朝向、维度和条件后执行另一条命令。",
    aliases: [],
    syntax: [
      ["execute as <targets> at <targets> run <command>", "以目标身份并在目标位置执行命令。"],
      ["execute positioned|rotated|facing|align ... run <command>", "改变执行位置、朝向或坐标对齐。"],
      ["execute in <dimension> run <command>", "切换执行维度。"],
      ["execute if|unless block|blocks|entity|score|predicate|data|dimension|loaded ... run <command>", "条件判断。"],
      ["execute if|unless stopwatch <id> <range> run <command>", "最新版 Stopwatch 条件判断。"],
      ["execute store result|success score|bossbar|storage|block|entity ... run <command>", "存储命令返回值或成功值。"],
      ["execute on attacker|controller|leasher|origin|owner|passengers|target|vehicle run <command>", "切换到当前实体关系对象。"]
    ],
    params: [["command", "要执行的后续命令，不带开头斜杠。"], ["range", "数值范围，如 10..、..5、3..8。"], ["id", "Stopwatch ID。"]],
    examples: [["execute as @e[type=zombie] at @s if block ~ ~-1 ~ minecraft:grass_block run say on grass", "让站在草方块上的僵尸发言。"]],
    notes: "现代 Java 命令体系核心；旧 /testfor、/detect 等多数逻辑都用 /execute 替代。"
  },
  {
    name: "/fetchprofile",
    category: "服务器管理",
    level: "2",
    summary: "打印玩家或带 profile 实体的档案信息。",
    aliases: [],
    syntax: [
      ["fetchprofile name <name>", "按玩家名查询 profile。"],
      ["fetchprofile id <uuid>", "按 UUID 查询 profile。"],
      ["fetchprofile entity <target>", "读取世界中单个玩家或 Mannequin 的 profile。"]
    ],
    params: [["name", "玩家名。"], ["uuid", "玩家 UUID。"], ["target", "单个实体选择器，目标必须拥有 profile。"]],
    examples: [["fetchprofile entity @p", "显示最近玩家的 profile 信息。"]],
    notes: "26.1 给 /fetchprofile 加入 entity 子命令；Ctrl+中键拾取玩家/Mannequin 也会显示类似信息。"
  },
  {
    name: "/experience",
    category: "玩家与进度",
    level: "2",
    summary: "增加、设置或查询玩家经验。",
    aliases: ["/xp"],
    syntax: [
      ["experience add <targets> <amount> [points|levels]", "增加经验点或等级。"],
      ["experience set <targets> <amount> [points|levels]", "设置经验点或等级。"],
      ["experience query <targets> points|levels", "查询经验。"]
    ],
    params: [["amount", "经验数值。"], ["points|levels", "经验点或等级。"]],
    examples: [["xp add @p 5 levels", "给最近玩家 5 级经验。"]],
    notes: "/xp 是别名。"
  },
  {
    name: "/fill",
    category: "方块与世界",
    level: "2",
    summary: "用指定方块填充区域。",
    aliases: [],
    syntax: [
      ["fill <from> <to> <block> [destroy|hollow|keep|outline|replace]", "填充区域。"],
      ["fill <from> <to> <block> replace [<filter>]", "只替换符合过滤条件的方块。"]
    ],
    params: [["from/to", "区域两个角坐标。"], ["block", "要放置的方块状态。"], ["filter", "被替换方块谓词。"]],
    examples: [["fill ~-5 ~ ~-5 ~5 ~ ~5 minecraft:glass replace minecraft:air", "把附近空气替换成玻璃。"]],
    notes: "大面积修改受最大方块修改规则限制。"
  },
  {
    name: "/fillbiome",
    category: "方块与世界",
    level: "2",
    summary: "修改区域内的生物群系数据。",
    aliases: [],
    syntax: [["fillbiome <from> <to> <biome> [replace <filter>]", "设置区域生物群系，可选择只替换某类群系。"]],
    params: [["biome", "生物群系 ID。"], ["filter", "被替换生物群系。"]],
    examples: [["fillbiome 0 60 0 32 90 32 minecraft:cherry_grove", "把区域设置为樱花树林生物群系。"]],
    notes: "客户端视觉可能需要重新进入区块后完全刷新。"
  },
  {
    name: "/forceload",
    category: "方块与世界",
    level: "2",
    summary: "强制加载或取消加载区块。",
    aliases: [],
    syntax: [
      ["forceload add <from> [<to>]", "添加强加载区块。"],
      ["forceload remove <from> [<to>]", "移除强加载区块。"],
      ["forceload query [<pos>]", "查询强加载状态。"],
      ["forceload remove all", "移除全部强加载区块。"]
    ],
    params: [["from/to", "区块内任意方块坐标。"]],
    examples: [["forceload add 0 0", "强加载原点所在区块。"]],
    notes: "过多强加载区块会增加服务器负担。"
  },
  {
    name: "/function",
    category: "数据包与函数",
    level: "2",
    summary: "运行数据包函数或函数标签。",
    aliases: [],
    syntax: [["function <name>", "运行指定函数。"], ["function <name> with block|entity|storage <source> [<path>]", "用宏数据运行函数。"]],
    params: [["name", "函数 ID 或函数标签。"], ["source", "宏参数来源。"]],
    examples: [["function mypack:start", "运行 mypack 命名空间下 start 函数。"]],
    notes: "函数文件中的命令通常不写开头斜杠。"
  },
  {
    name: "/gamemode",
    category: "玩家与进度",
    level: "2",
    summary: "设置玩家游戏模式。",
    aliases: [],
    syntax: [["gamemode adventure|creative|spectator|survival [<target>]", "设置目标玩家模式。"]],
    params: [["target", "目标玩家，默认执行者。"]],
    examples: [["gamemode spectator @s", "把自己切换为旁观者。"]],
    notes: "生存服务器常把玩家限制在 survival/adventure。"
  },
  {
    name: "/gamerule",
    category: "世界规则",
    level: "2",
    summary: "查询或设置游戏规则。",
    aliases: [],
    syntax: [["gamerule <rule> [<value>]", "省略 value 时查询，提供 value 时设置。"]],
    params: [["rule", "规则 ID；新版本内部转为命名空间注册项。"], ["value", "布尔值或整数。"]],
    examples: [["gamerule minecraft:keep_inventory true", "开启死亡保留物品。"]],
    notes: "旧驼峰规则名在新版已迁移为命名空间蛇形名，兼容性需实测。"
  },
  {
    name: "/give",
    category: "物品与背包",
    level: "2",
    summary: "给予玩家物品。",
    aliases: [],
    syntax: [["give <targets> <item> [<count>]", "把指定物品给予玩家。"]],
    params: [["item", "物品 ID，可携带组件。"], ["count", "数量。"]],
    examples: [["give @p minecraft:diamond_sword 1", "给最近玩家一把钻石剑。"]],
    notes: "新版物品自定义主要使用物品组件而不是旧式 NBT。"
  },
  {
    name: "/help",
    category: "基础与聊天",
    level: "0",
    summary: "显示命令帮助。",
    aliases: [],
    syntax: [["help [<command>]", "显示全部或指定命令帮助。"]],
    params: [["command", "命令名。"]],
    examples: [["help execute", "查看 execute 帮助。"]],
    notes: "Java 版不再使用 /? 作为当前有效别名。"
  },
  {
    name: "/item",
    category: "物品与背包",
    level: "2",
    summary: "替换或修改方块/实体物品槽位。",
    aliases: [],
    syntax: [
      ["item replace block|entity <target> <slot> with <item> [<count>]", "直接替换槽位物品。"],
      ["item replace block|entity <target> <slot> from block|entity <source> <sourceSlot> [<modifier>]", "从来源槽位复制物品。"],
      ["item modify block|entity <target> <slot> <modifier>", "用战利品表物品修饰器修改物品。"]
    ],
    params: [["slot", "槽位名。"], ["modifier", "物品修饰器 ID。"]],
    examples: [["item replace entity @p weapon.mainhand with minecraft:stick", "把最近玩家主手替换为木棍。"]],
    notes: "替代旧 /replaceitem。"
  },
  {
    name: "/jfr",
    category: "调试与性能",
    level: "4",
    summary: "启动或停止 Java Flight Recorder 性能采样。",
    aliases: [],
    syntax: [["jfr start", "开始 JFR 采样。"], ["jfr stop", "停止并保存采样。"]],
    params: [],
    examples: [["jfr start", "开始一次 JFR 性能记录。"]],
    notes: "服务器性能诊断命令，需要高级权限。"
  },
  {
    name: "/kick",
    category: "服务器管理",
    level: "3",
    summary: "将玩家踢出服务器。",
    aliases: [],
    syntax: [["kick <targets> [<reason>]", "踢出目标玩家，可附带原因。"]],
    params: [["targets", "目标玩家。"], ["reason", "踢出原因。"]],
    examples: [["kick @a[team=afk] AFK too long", "踢出 afk 队伍玩家。"]],
    notes: "不会封禁，玩家可重新加入。"
  },
  {
    name: "/kill",
    category: "实体与战斗",
    level: "2",
    summary: "杀死实体或玩家。",
    aliases: [],
    syntax: [["kill [<targets>]", "杀死目标，省略时杀死执行者。"]],
    params: [["targets", "目标实体。"]],
    examples: [["kill @e[type=item,distance=..20]", "清理 20 格内掉落物。"]],
    notes: "对重要实体使用前先限制选择器。"
  },
  {
    name: "/list",
    category: "服务器管理",
    level: "0",
    summary: "列出服务器在线玩家。",
    aliases: [],
    syntax: [["list [uuids]", "显示在线玩家，uuids 会附带 UUID。"]],
    params: [["uuids", "是否显示 UUID。"]],
    examples: [["list uuids", "查看在线玩家及 UUID。"]],
    notes: "普通玩家通常可用。"
  },
  {
    name: "/locate",
    category: "方块与世界",
    level: "2",
    summary: "定位最近结构、生物群系或兴趣点。",
    aliases: [],
    syntax: [
      ["locate structure <structure>", "寻找结构。"],
      ["locate biome <biome>", "寻找生物群系。"],
      ["locate poi <poi>", "寻找兴趣点。"]
    ],
    params: [["structure/biome/poi", "目标 ID 或标签。"]],
    examples: [["locate structure minecraft:village_plains", "定位平原村庄。"]],
    notes: "搜索可能造成短暂卡顿。"
  },
  {
    name: "/loot",
    category: "物品与背包",
    level: "2",
    summary: "按战利品表生成物品并放入容器、实体槽位或世界。",
    aliases: [],
    syntax: [
      ["loot give <players> loot|kill|mine|fish <source>", "把战利品给玩家。"],
      ["loot insert <targetPos> loot|kill|mine|fish <source>", "插入容器。"],
      ["loot spawn <targetPos> loot|kill|mine|fish <source>", "生成掉落物。"],
      ["loot replace block|entity <target> <slot> [<count>] loot|kill|mine|fish <source>", "替换槽位。"]
    ],
    params: [["source", "战利品来源：战利品表、击杀实体、挖掘方块或钓鱼。"]],
    examples: [["loot give @p loot minecraft:chests/simple_dungeon", "给最近玩家生成地牢箱战利品。"]],
    notes: "高级数据包常用命令。"
  },
  {
    name: "/me",
    category: "基础与聊天",
    level: "0",
    summary: "发送一条动作文本消息。",
    aliases: [],
    syntax: [["me <action>", "以第三人称动作形式广播文本。"]],
    params: [["action", "消息内容。"]],
    examples: [["me is ready", "广播“玩家 is ready”。"]],
    notes: "受聊天设置和服务器规则影响。"
  },
  {
    name: "/msg",
    category: "基础与聊天",
    level: "0",
    summary: "向其他玩家发送私聊消息。",
    aliases: ["/tell", "/w"],
    syntax: [["msg <targets> <message>", "发送私聊。"], ["tell <targets> <message>", "同 /msg。"], ["w <targets> <message>", "同 /msg。"]],
    params: [["targets", "目标玩家。"], ["message", "消息文本。"]],
    examples: [["msg @p ready?", "私聊最近玩家。"]],
    notes: "聊天举报、过滤和服务器插件可能改变表现。"
  },
  {
    name: "/op",
    category: "服务器管理",
    level: "3",
    summary: "授予玩家 OP 权限。",
    aliases: [],
    syntax: [["op <targets>", "授予管理员权限。"]],
    params: [["targets", "玩家名。"]],
    examples: [["op Alex", "授予 Alex OP。"]],
    notes: "权限等级由 server.properties 的 op-permission-level 控制。"
  },
  {
    name: "/pardon",
    category: "服务器管理",
    level: "3",
    summary: "从玩家封禁列表移除玩家。",
    aliases: [],
    syntax: [["pardon <targets>", "解除玩家名封禁。"]],
    params: [["targets", "玩家名。"]],
    examples: [["pardon Steve", "解封 Steve。"]],
    notes: "IP 封禁需用 /pardon-ip。"
  },
  {
    name: "/pardon-ip",
    category: "服务器管理",
    level: "3",
    summary: "从 IP 封禁列表移除地址。",
    aliases: [],
    syntax: [["pardon-ip <target>", "解除 IP 封禁。"]],
    params: [["target", "IP 地址。"]],
    examples: [["pardon-ip 203.0.113.10", "解封指定 IP。"]],
    notes: "只影响 IP 封禁。"
  },
  {
    name: "/particle",
    category: "效果与声音",
    level: "2",
    summary: "生成粒子效果。",
    aliases: [],
    syntax: [["particle <name> [<pos>] [<delta>] [<speed>] [<count>] [force|normal] [<viewers>]", "在指定位置生成粒子。"]],
    params: [["name", "粒子 ID。"], ["delta", "扩散范围。"], ["viewers", "可见玩家。"]],
    examples: [["particle minecraft:flame ~ ~1 ~ 0.4 0.6 0.4 0.02 20", "在身边生成火焰粒子。"]],
    notes: "force 可让更远玩家也看到粒子。"
  },
  {
    name: "/perf",
    category: "调试与性能",
    level: "4",
    summary: "采集一段服务器性能指标。",
    aliases: [],
    syntax: [["perf start", "开始性能采样。"], ["perf stop", "停止采样。"]],
    params: [],
    examples: [["perf start", "开始一次性能指标采集。"]],
    notes: "适合服务器卡顿分析。"
  },
  {
    name: "/place",
    category: "方块与世界",
    level: "2",
    summary: "在指定位置放置特征、拼图、模板或结构。",
    aliases: [],
    syntax: [
      ["place feature <feature> [<pos>]", "放置配置特征。"],
      ["place jigsaw <pool> <target> <maxDepth> [<pos>]", "从拼图池生成。"],
      ["place structure <structure> [<pos>]", "放置结构。"],
      ["place template <template> [<pos>] [<rotation>] [<mirror>] [<integrity>] [<seed>]", "放置结构模板。"]
    ],
    params: [["feature/pool/structure/template", "世界生成资源 ID。"]],
    examples: [["place structure minecraft:village_plains ~ ~ ~", "在当前位置放置平原村庄结构。"]],
    notes: "可能修改大量方块，建议先备份。"
  },
  {
    name: "/playsound",
    category: "效果与声音",
    level: "2",
    summary: "向玩家播放声音事件。",
    aliases: [],
    syntax: [["playsound <sound> <source> <targets> [<pos>] [<volume>] [<pitch>] [<minVolume>]", "播放指定声音。"]],
    params: [["source", "声音分类，如 master、music、hostile、ui。"], ["pitch", "音高。"]],
    examples: [["playsound minecraft:block.note_block.pling master @a ~ ~ ~ 1 1.5", "给所有玩家播放音符盒声音。"]],
    notes: "1.21.6 加入 ui 声音分类；ui 声音暂停时也可继续播放。音量大于 1 会扩大传播距离。"
  },
  {
    name: "/publish",
    category: "服务器管理",
    level: "4",
    summary: "把单人世界开放到局域网。",
    aliases: [],
    syntax: [["publish [allowCommands] [gamemode] [port]", "发布局域网世界。"]],
    params: [["allowCommands", "是否允许命令。"], ["port", "端口。"]],
    examples: [["publish true creative 25565", "以创造模式和指定端口开放 LAN。"]],
    notes: "仅单人世界可用。"
  },
  {
    name: "/random",
    category: "逻辑与流程",
    level: "0",
    summary: "生成随机数或控制随机序列。",
    aliases: [],
    syntax: [
      ["random value <range> [<sequence>]", "从范围中取随机整数。"],
      ["random roll <range> [<sequence>]", "取随机整数并向聊天输出。"],
      ["random reset <sequence> [<seed>] [<includeWorldSeed>] [<includeSequenceId>]", "重置随机序列。"]
    ],
    params: [["range", "整数范围。"], ["sequence", "随机序列 ID。"]],
    examples: [["random roll 1..20", "掷一个 1 到 20 的随机数。"]],
    notes: "重置序列通常需要更高权限。"
  },
  {
    name: "/recipe",
    category: "玩家与进度",
    level: "2",
    summary: "授予或撤销玩家配方。",
    aliases: [],
    syntax: [["recipe give <targets> <recipe>", "授予配方。"], ["recipe take <targets> <recipe>", "撤销配方。"]],
    params: [["recipe", "配方 ID 或 *。"]],
    examples: [["recipe give @a *", "授予所有玩家全部配方。"]],
    notes: "适合地图流程锁定或解锁合成。"
  },
  {
    name: "/reload",
    category: "数据包与函数",
    level: "2",
    summary: "重新加载数据包、战利品表、函数和相关资源。",
    aliases: [],
    syntax: [["reload", "重新加载服务端数据资源。"]],
    params: [],
    examples: [["reload", "更新数据包后重新加载。"]],
    notes: "出错会在日志中输出详细信息。"
  },
  {
    name: "/return",
    category: "逻辑与流程",
    level: "N/A",
    summary: "在函数中控制执行流程并返回数值。",
    aliases: [],
    syntax: [["return <value>", "立即返回指定值。"], ["return run <command>", "执行命令并返回其结果。"], ["return fail", "让函数失败返回。"]],
    params: [["value", "整数返回值。"], ["command", "被运行命令。"]],
    examples: [["return run scoreboard players get @s points", "返回执行者 points 分数。"]],
    notes: "主要在函数和数据包中使用。"
  },
  {
    name: "/rotate",
    category: "实体与战斗",
    level: "2",
    summary: "旋转实体朝向，不改变实体位置。",
    aliases: [],
    syntax: [
      ["rotate <target> <rotation>", "把目标实体旋转到指定 yaw/pitch。"],
      ["rotate <target> facing <facingLocation>", "让目标面向指定坐标。"],
      ["rotate <target> facing entity <facingTarget> [<facingAnchor>]", "让目标面向另一个实体的脚或眼睛。"]
    ],
    params: [["target", "单个目标实体。"], ["rotation", "水平/垂直旋转角，可用 ~ 相对值。"], ["facingAnchor", "feet 或 eyes，默认 feet。"]],
    examples: [["rotate @p 180 0", "让最近玩家面向 yaw 180、pitch 0。"]],
    notes: "1.21.2 加入；用于替代只想转向却不想传送时滥用 /tp 的做法。"
  },
  {
    name: "/ride",
    category: "实体与战斗",
    level: "2",
    summary: "让实体骑乘、停止骑乘、驱逐乘客或召唤骑乘关系。",
    aliases: [],
    syntax: [
      ["ride <target> mount <vehicle>", "让目标骑上载具。"],
      ["ride <target> dismount", "让目标下车。"],
      ["ride <vehicle> evict_riders", "驱逐乘客。"],
      ["ride <target> summon_ride <entity> [<rules>] [<event>]", "召唤载具并骑乘。"],
      ["ride <vehicle> summon_rider <entity> [<event>]", "给载具召唤乘客。"]
    ],
    params: [["target/vehicle", "实体。"], ["entity", "实体类型。"]],
    examples: [["ride @p mount @e[type=horse,limit=1,sort=nearest]", "让最近玩家骑上最近马。"]],
    notes: "某些实体组合受游戏规则限制。"
  },
  {
    name: "/save-all",
    category: "服务器管理",
    level: "4",
    summary: "强制保存服务器世界数据。",
    aliases: [],
    syntax: [["save-all [flush]", "保存所有世界；flush 会等待写入完成。"]],
    params: [["flush", "强制刷新到磁盘。"]],
    examples: [["save-all flush", "立即保存并刷新磁盘。"]],
    notes: "服务器维护前常用。"
  },
  {
    name: "/save-off",
    category: "服务器管理",
    level: "4",
    summary: "关闭服务器自动保存。",
    aliases: [],
    syntax: [["save-off", "禁用自动保存。"]],
    params: [],
    examples: [["save-off", "临时关闭自动保存。"]],
    notes: "维护结束要记得 /save-on，否则有丢档风险。"
  },
  {
    name: "/save-on",
    category: "服务器管理",
    level: "4",
    summary: "开启服务器自动保存。",
    aliases: [],
    syntax: [["save-on", "启用自动保存。"]],
    params: [],
    examples: [["save-on", "恢复自动保存。"]],
    notes: "通常和 /save-off 配套。"
  },
  {
    name: "/say",
    category: "基础与聊天",
    level: "2",
    summary: "向全服广播一条消息。",
    aliases: [],
    syntax: [["say <message>", "广播消息。"]],
    params: [["message", "消息文本。"]],
    examples: [["say Server restart in 5 minutes", "广播重启提醒。"]],
    notes: "命令方块执行时会显示命令方块名或服务器名。"
  },
  {
    name: "/schedule",
    category: "数据包与函数",
    level: "2",
    summary: "延迟执行函数。",
    aliases: [],
    syntax: [["schedule function <function> <time> [append|replace]", "安排函数延迟执行。"], ["schedule clear <function>", "取消已安排函数。"]],
    params: [["time", "时间，如 20t、5s、1d。"], ["function", "函数 ID。"]],
    examples: [["schedule function mypack:tick_later 5s", "5 秒后运行函数。"]],
    notes: "只能调度函数，不能直接调度任意命令。"
  },
  {
    name: "/scoreboard",
    category: "计分板与队伍",
    level: "2",
    summary: "管理计分板目标、分数和显示槽。",
    aliases: [],
    syntax: [
      ["scoreboard objectives add <objective> <criteria> [<displayName>]", "创建目标。"],
      ["scoreboard objectives remove|list|modify|setdisplay ...", "管理目标和显示。"],
      ["scoreboard players get|set|add|remove|reset|operation|enable|list|display name <target> ...", "管理实体或假名分数。"]
    ],
    params: [["objective", "目标名。"], ["criteria", "计分标准。"], ["target", "玩家、实体或假名。"]],
    examples: [["scoreboard players add @s points 1", "给自己 points 加 1。"]],
    notes: "数据包状态机、商店、计时器和排行榜核心命令。"
  },
  {
    name: "/seed",
    category: "方块与世界",
    level: "0",
    summary: "显示世界种子。",
    aliases: [],
    syntax: [["seed", "输出世界种子。"]],
    params: [],
    examples: [["seed", "查看当前世界种子。"]],
    notes: "多人服务器通常需要权限 2。"
  },
  {
    name: "/setblock",
    category: "方块与世界",
    level: "2",
    summary: "在一个坐标放置指定方块。",
    aliases: [],
    syntax: [["setblock <pos> <block> [destroy|keep|replace|strict]", "设置单个方块。"]],
    params: [["pos", "目标坐标。"], ["block", "方块状态。"]],
    examples: [["setblock ~ ~-1 ~ minecraft:gold_block", "把脚下方块改成金块。"]],
    notes: "keep 只在目标为空气时放置；destroy 会掉落原方块。"
  },
  {
    name: "/setidletimeout",
    category: "服务器管理",
    level: "3",
    summary: "设置玩家空闲多久后被踢出服务器。",
    aliases: [],
    syntax: [["setidletimeout <minutes>", "设置空闲踢出分钟数，0 通常表示关闭。"]],
    params: [["minutes", "分钟数。"]],
    examples: [["setidletimeout 20", "20 分钟无操作后踢出。"]],
    notes: "仅多人服务器有意义。"
  },
  {
    name: "/setworldspawn",
    category: "方块与世界",
    level: "2",
    summary: "设置世界出生点。",
    aliases: [],
    syntax: [["setworldspawn [<pos>] [<angle>]", "设置世界出生位置和朝向。"]],
    params: [["pos", "坐标，默认当前位置。"], ["angle", "出生朝向。"]],
    examples: [["setworldspawn 0 80 0", "把世界出生点设在 0 80 0。"]],
    notes: "受重生半径游戏规则影响。"
  },
  {
    name: "/spawnpoint",
    category: "玩家与进度",
    level: "2",
    summary: "设置玩家个人重生点。",
    aliases: [],
    syntax: [["spawnpoint [<targets>] [<pos>] [<angle>]", "设置目标玩家重生点。"]],
    params: [["targets", "目标玩家。"], ["pos", "坐标。"]],
    examples: [["spawnpoint @a 10 65 10", "设置所有玩家重生点。"]],
    notes: "维度和床/重生锚逻辑可能影响实际重生。"
  },
  {
    name: "/spectate",
    category: "玩家与进度",
    level: "2",
    summary: "让旁观者玩家旁观一个实体。",
    aliases: [],
    syntax: [["spectate [<target>] [<player>]", "让玩家旁观目标；省略 target 会停止旁观。"]],
    params: [["target", "被旁观实体。"], ["player", "旁观者玩家。"]],
    examples: [["spectate @e[type=ender_dragon,limit=1] @p", "让最近玩家旁观末影龙。"]],
    notes: "目标玩家通常需要处于旁观模式。"
  },
  {
    name: "/spreadplayers",
    category: "玩家与进度",
    level: "2",
    summary: "把实体随机分散到指定区域。",
    aliases: [],
    syntax: [["spreadplayers <center> <spreadDistance> <maxRange> [under <maxHeight>] <respectTeams> <targets>", "随机分散目标实体。"]],
    params: [["center", "中心坐标 X Z。"], ["respectTeams", "是否按队伍聚集。"]],
    examples: [["spreadplayers 0 0 20 200 false @a", "把所有玩家分散到原点附近。"]],
    notes: "常用于 UHC、小游戏出生点分配。"
  },
  {
    name: "/stop",
    category: "服务器管理",
    level: "4",
    summary: "安全停止服务器。",
    aliases: [],
    syntax: [["stop", "保存并关闭服务器进程。"]],
    params: [],
    examples: [["stop", "关闭服务器。"]],
    notes: "本地单人世界通常不可用。"
  },
  {
    name: "/stopsound",
    category: "效果与声音",
    level: "2",
    summary: "停止玩家正在播放的声音。",
    aliases: [],
    syntax: [["stopsound <targets> [<source>] [<sound>]", "停止指定来源或指定声音。"]],
    params: [["source", "声音分类。"], ["sound", "声音 ID。"]],
    examples: [["stopsound @a music", "停止所有玩家的音乐分类声音。"]],
    notes: "适合地图切换场景音乐。"
  },
  {
    name: "/stopwatch",
    category: "逻辑与流程",
    level: "2",
    summary: "创建、查询、重启或删除按真实时间计时的 Stopwatch。",
    aliases: [],
    syntax: [
      ["stopwatch create <id>", "创建指定命名空间 ID 的 Stopwatch。"],
      ["stopwatch query <id> [<scale>]", "查询经过秒数，并按 scale 缩放后返回整数。"],
      ["stopwatch restart <id>", "重启计时。"],
      ["stopwatch remove <id>", "删除计时器。"]
    ],
    params: [["id", "Stopwatch 命名空间 ID。"], ["scale", "返回值缩放倍率，默认 1。"]],
    examples: [["stopwatch create arena:round", "创建 arena:round 计时器。"], ["execute if stopwatch arena:round 30.. run say overtime", "30 秒后触发提示。"]],
    notes: "1.21.11 加入；不依赖游戏刻，但只在服务器/世界运行时前进。"
  },
  {
    name: "/swing",
    category: "实体与战斗",
    level: "2",
    summary: "让实体播放挥动手臂动画，特别适合 Mannequin。",
    aliases: [],
    syntax: [["swing [<target>] [<hand>]", "让目标实体挥动 mainhand 或 offhand；省略目标默认 @s。"]],
    params: [["target", "实体选择器。"], ["hand", "mainhand 或 offhand，默认 mainhand。"]],
    examples: [["swing @e[type=minecraft:mannequin,limit=1] offhand", "让一个 Mannequin 挥动副手。"]],
    notes: "26.1 加入；命令可能成功但部分实体客户端不会显示挥动动画。"
  },
  {
    name: "/summon",
    category: "实体与战斗",
    level: "2",
    summary: "生成实体。",
    aliases: [],
    syntax: [["summon <entity> [<pos>] [<nbt>]", "在指定位置生成实体，可附带 NBT。"]],
    params: [["entity", "实体类型 ID。"], ["nbt", "实体 SNBT 数据。"]],
    examples: [["summon minecraft:lightning_bolt ~ ~ ~", "在当前位置召唤闪电。"]],
    notes: "新版实体组件和数据格式变化较快，复杂 NBT 需按版本核对。"
  },
  {
    name: "/tag",
    category: "实体与战斗",
    level: "2",
    summary: "给实体添加、移除或列出标签。",
    aliases: [],
    syntax: [["tag <targets> add <name>", "添加标签。"], ["tag <targets> remove <name>", "移除标签。"], ["tag <targets> list", "列出标签。"]],
    params: [["name", "标签名。"]],
    examples: [["tag @e[type=zombie,limit=1] add elite", "给一个僵尸添加 elite 标签。"]],
    notes: "标签常用于选择器过滤和数据包状态标记。"
  },
  {
    name: "/team",
    category: "计分板与队伍",
    level: "2",
    summary: "创建、删除和配置队伍。",
    aliases: [],
    syntax: [
      ["team add <team> [<displayName>]", "创建队伍。"],
      ["team join <team> [<members>]", "加入队伍。"],
      ["team leave <members>", "离开队伍。"],
      ["team modify <team> <option> <value>", "修改颜色、碰撞、友伤、前后缀等选项。"],
      ["team list|remove|empty ...", "列出、删除或清空队伍。"]
    ],
    params: [["team", "队伍名。"], ["members", "玩家、实体 UUID 或假名。"]],
    examples: [["team modify red color red", "把 red 队显示颜色设为红色。"]],
    notes: "与计分板、发光轮廓和名称显示强相关。"
  },
  {
    name: "/teammsg",
    category: "基础与聊天",
    level: "0",
    summary: "向自己所在队伍发送消息。",
    aliases: ["/tm"],
    syntax: [["teammsg <message>", "发送队伍消息。"], ["tm <message>", "同 /teammsg。"]],
    params: [["message", "消息文本。"]],
    examples: [["tm push mid", "给队伍发送战术信息。"]],
    notes: "发送者必须在队伍中。"
  },
  {
    name: "/teleport",
    category: "玩家与进度",
    level: "2",
    summary: "传送实体或玩家。",
    aliases: ["/tp"],
    syntax: [
      ["teleport <location>", "把执行者传送到坐标。"],
      ["teleport <destination>", "把执行者传送到实体。"],
      ["teleport <targets> <location> [<rotation>]", "把目标传送到坐标。"],
      ["teleport <targets> <destination>", "把目标传送到另一个实体。"],
      ["teleport <targets> <location> facing <facingLocation>|entity <facingEntity>", "传送并指定面朝方向。"]
    ],
    params: [["location", "坐标。"], ["rotation", "yaw pitch。"], ["destination", "目标实体。"]],
    examples: [["tp @a 0 80 0", "把所有玩家传送到 0 80 0。"]],
    notes: "/tp 是别名。跨维度传送可结合 /execute in。"
  },
  {
    name: "/tellraw",
    category: "界面与文本",
    level: "2",
    summary: "向玩家发送 JSON 文本组件。",
    aliases: [],
    syntax: [["tellraw <targets> <message>", "发送 JSON 文本。"]],
    params: [["message", "JSON 文本组件。"]],
    examples: [["tellraw @a {\"text\":\"欢迎\",\"color\":\"gold\"}", "向所有玩家发送金色欢迎文本。"]],
    notes: "可包含点击、悬浮、翻译键和样式。"
  },
  {
    name: "/test",
    category: "调试与性能",
    level: "2",
    summary: "创建、定位、运行和验证 Game Test 测试。",
    aliases: [],
    syntax: [
      ["test clearall [<radius>] | clearthat | clearthese", "清除测试结构。"],
      ["test create <test> [<width>] [<height> <depth>]", "创建测试结构。"],
      ["test locate <selector>", "定位测试。"],
      ["test resetclosest|resetthat|resetthese", "重置测试结构。"],
      ["test pos [<variable>]", "复制测试局部坐标。"],
      ["test run <selector> [<numberOfTimes>] [<untilFailed>] [<rotationSteps>] [<testsPerRow>]", "运行测试选择器。"],
      ["test runclosest|runfailed|runmultiple|runthat|runthese ...", "运行附近、失败、多个或当前测试。"],
      ["test stop", "停止测试。"],
      ["test verify <tests>", "验证测试定义。"]
    ],
    params: [["selector", "支持 * 和 ? 的测试 ID 选择器。"], ["test", "测试命名空间 ID。"]],
    examples: [["test run *:*", "运行所有命名空间的测试。"]],
    notes: "1.21.5 加入，服务于 Game Test 框架和测试实例方块。"
  },
  {
    name: "/tick",
    category: "世界规则",
    level: "2",
    summary: "冻结、步进或调整游戏刻速。",
    aliases: [],
    syntax: [
      ["tick freeze|unfreeze", "冻结或恢复游戏刻。"],
      ["tick step [<time>]", "冻结时推进指定刻数。"],
      ["tick rate <rate>", "设置刻速。"],
      ["tick sprint <time>", "尽快运行指定游戏时间。"],
      ["tick query", "查询刻状态。"]
    ],
    params: [["time", "时间，通常为 ticks/seconds/days。"], ["rate", "每秒游戏刻数。"]],
    examples: [["tick freeze", "冻结世界逻辑。"], ["tick step 20t", "推进 20 刻。"]],
    notes: "调试红石、实体和数据包逻辑非常有用。"
  },
  {
    name: "/time",
    category: "世界规则",
    level: "2",
    summary: "查询、设置或增加世界时间。",
    aliases: [],
    syntax: [
      ["time [of <clock>] set <time>|<timemarker>", "设置指定 World Clock 的总经过刻数，或推进到下一个时间标记。"],
      ["time [of <clock>] add <time>", "给指定 World Clock 增加或减少时间。"],
      ["time [of <clock>] pause|resume", "暂停或恢复 World Clock。"],
      ["time [of <clock>] rate <rate>", "设置 World Clock 推进倍率。"],
      ["time [of <clock>] query <timeline> [repetitions]", "查询时间线周期内刻数或重复次数。"],
      ["time query gametime", "查询不受 World Clock 改动影响的总游戏刻。"]
    ],
    params: [["time", "刻数或带单位时间。"], ["timemarker", "如 day、noon、night、midnight。"], ["clock", "世界时钟 ID。"], ["rate", "大于 0 且不超过 1000 的浮点倍率。"]],
    examples: [["time set noon", "把默认时钟推进到下一个正午。"], ["time rate 0.5", "让默认时钟以半速推进。"]],
    notes: "26.1 起 /time 基于 World Clocks；/time rate 不等于 /tick rate，不会加快实体/红石模拟。"
  },
  {
    name: "/title",
    category: "界面与文本",
    level: "2",
    summary: "控制屏幕标题、副标题和动作栏。",
    aliases: [],
    syntax: [
      ["title <targets> title|subtitle|actionbar <title>", "显示文本组件。"],
      ["title <targets> times <fadeIn> <stay> <fadeOut>", "设置淡入、停留、淡出时间。"],
      ["title <targets> clear|reset", "清除或重置标题设置。"]
    ],
    params: [["title", "JSON 文本组件。"], ["fadeIn/stay/fadeOut", "tick 数。"]],
    examples: [["title @a title {\"text\":\"开始\",\"color\":\"green\"}", "显示绿色标题。"]],
    notes: "动作栏适合持续状态提示。"
  },
  {
    name: "/transfer",
    category: "服务器管理",
    level: "3",
    summary: "把玩家转移到另一台服务器。",
    aliases: [],
    syntax: [["transfer <hostname> [<port>] [<players>]", "让目标玩家连接到指定主机和端口。"]],
    params: [["hostname", "目标服务器主机名。"], ["port", "端口，省略时为 25565。"], ["players", "被转移玩家，省略时为 @s。"]],
    examples: [["transfer lobby.example.com 25565 @a[tag=to_lobby]", "把带 to_lobby 标签的玩家转移到大厅服务器。"]],
    notes: "1.20.5 加入；只存在于专用服务器。"
  },
  {
    name: "/trigger",
    category: "计分板与队伍",
    level: "0",
    summary: "让非 OP 玩家修改已启用的 trigger 计分板目标。",
    aliases: [],
    syntax: [["trigger <objective> [add|set <value>]", "触发或修改 trigger 目标。"]],
    params: [["objective", "criteria 为 trigger 的计分板目标。"]],
    examples: [["trigger home set 1", "触发 home 目标。"]],
    notes: "地图菜单和玩家自助操作常用，需要管理员先 enable。"
  },
  {
    name: "/weather",
    category: "世界规则",
    level: "2",
    summary: "设置天气。",
    aliases: [],
    syntax: [["weather clear|rain|thunder [<duration>]", "设置天气及持续时间。"]],
    params: [["duration", "持续 tick 数。"]],
    examples: [["weather clear 6000", "晴天 6000 刻。"]],
    notes: "维度是否有天气取决于维度类型。"
  },
  {
    name: "/version",
    category: "基础与聊天",
    level: "2",
    summary: "在服务端输出当前版本信息。",
    aliases: [],
    syntax: [["version", "显示服务器端 Minecraft 版本信息。"]],
    params: [],
    examples: [["version", "查看当前服务端版本。"]],
    notes: "1.21.6 加入；单人游戏可用，多人服务器通常需要管理员权限。"
  },
  {
    name: "/waypoint",
    category: "界面与文本",
    level: "2",
    summary: "查询或修改定位栏 Waypoint 的颜色和样式。",
    aliases: [],
    syntax: [
      ["waypoint list", "列出当前 Waypoint。"],
      ["waypoint modify <entity-selector> color <color>", "设置 Waypoint 图标颜色。"],
      ["waypoint modify <entity-selector> color hex <hex-color>", "用十六进制 RGB 设置颜色。"],
      ["waypoint modify <entity-selector> color reset", "重置颜色。"],
      ["waypoint modify <entity-selector> style <waypoint_style/resource>", "设置 Waypoint 样式资源。"],
      ["waypoint modify <entity-selector> style reset", "重置样式。"]
    ],
    params: [["entity-selector", "正在广播 Waypoint 的实体。"], ["color", "颜色名。"], ["hex-color", "RRGGBB 或短格式 RGB。"]],
    examples: [["waypoint modify @p color hex 6495ED", "把最近玩家的定位栏图标改成矢车菊蓝。"]],
    notes: "1.21.6 加入；与 locatorBar、waypoint_transmit_range、waypoint_receive_range 配合。"
  },
  {
    name: "/whitelist",
    category: "服务器管理",
    level: "3",
    summary: "管理服务器白名单。",
    aliases: [],
    syntax: [
      ["whitelist on|off", "开启或关闭白名单。"],
      ["whitelist add|remove <targets>", "添加或移除玩家。"],
      ["whitelist list", "列出白名单。"],
      ["whitelist reload", "重新加载白名单文件。"]
    ],
    params: [["targets", "玩家名。"]],
    examples: [["whitelist add Alex", "把 Alex 加入白名单。"]],
    notes: "常用于私服准入控制。"
  },
  {
    name: "/worldborder",
    category: "方块与世界",
    level: "2",
    summary: "管理世界边界大小、中心、伤害和警告。",
    aliases: [],
    syntax: [
      ["worldborder add <distance> [<time>]", "在指定时间内增减边界大小。"],
      ["worldborder center <pos>", "设置中心。"],
      ["worldborder damage amount|buffer <value>", "设置边界伤害。"],
      ["worldborder get", "读取当前直径。"],
      ["worldborder set <distance> [<time>]", "设置边界直径。"],
      ["worldborder warning distance|time <value>", "设置警告距离或时间。"]
    ],
    params: [["distance", "边界直径或变化量。"], ["time", "最新版默认 tick，可用 s 或 d 后缀。"]],
    examples: [["worldborder set 1000 10s", "10 秒内把边界收缩/扩张到直径 1000。"]],
    notes: "1.21.11 起时间参数默认 tick，也可用 s 或 d 后缀。"
  }
];

const categoryOrder = [
  "全部分类",
  "基础与聊天",
  "玩家与进度",
  "实体与战斗",
  "物品与背包",
  "方块与世界",
  "世界规则",
  "计分板与队伍",
  "界面与文本",
  "效果与声音",
  "数据包与函数",
  "数据与 NBT",
  "逻辑与流程",
  "服务器管理",
  "调试与性能"
];

const state = {
  query: "",
  category: "全部分类",
  level: "all",
  selected: commands.find((command) => command.name === "/execute") ?? commands[0]
};

const elements = {
  search: document.querySelector("#search-input"),
  category: document.querySelector("#category-filter"),
  level: document.querySelector("#level-filter"),
  list: document.querySelector("#command-list"),
  detail: document.querySelector("#command-detail"),
  count: document.querySelector("#command-count"),
  resultCount: document.querySelector("#result-count"),
  reset: document.querySelector("#reset-filters"),
  copyCurrent: document.querySelector("#copy-current")
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function searchableText(command) {
  return [
    command.name,
    command.summary,
    command.category,
    command.level,
    command.notes,
    ...command.aliases,
    ...command.syntax.flat(),
    ...command.params.flat(),
    ...command.examples.flat()
  ]
    .join(" ")
    .toLowerCase();
}

function filteredCommands() {
  const terms = state.query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  return commands
    .filter((command) => {
      const haystack = searchableText(command);
      const matchesQuery = !terms.length || terms.every((term) => haystack.includes(term));
      const matchesCategory = state.category === "全部分类" || command.category === state.category;
      const matchesLevel = state.level === "all" || command.level === state.level;
      return matchesQuery && matchesCategory && matchesLevel;
    })
    .sort((a, b) => {
      if (!terms.length) return commands.indexOf(a) - commands.indexOf(b);
      return searchScore(b, terms) - searchScore(a, terms) || commands.indexOf(a) - commands.indexOf(b);
    });
}

function searchScore(command, terms) {
  const bareName = command.name.replace("/", "").toLowerCase();
  const aliases = command.aliases.map((alias) => alias.replace("/", "").toLowerCase());
  return terms.reduce((score, term) => {
    if (bareName === term || command.name.toLowerCase() === term) return score + 100;
    if (bareName.startsWith(term)) return score + 70;
    if (aliases.some((alias) => alias === term || alias.startsWith(term))) return score + 60;
    if (command.summary.toLowerCase().includes(term)) return score + 20;
    if (command.category.toLowerCase().includes(term)) return score + 10;
    return score + 1;
  }, 0);
}

function renderCategoryOptions() {
  const categories = new Set(commands.map((command) => command.category));
  elements.category.innerHTML = categoryOrder
    .filter((category) => category === "全部分类" || categories.has(category))
    .map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`)
    .join("");
}

function renderList() {
  const results = filteredCommands();
  elements.resultCount.textContent = `${results.length} 个结果`;

  if (!results.includes(state.selected)) {
    state.selected = results[0] ?? commands[0];
  }

  if (!results.length) {
    elements.list.innerHTML = `<div class="empty-state">没有匹配的指令。</div>`;
    return;
  }

  elements.list.innerHTML = results
    .map((command) => {
      const active = command.name === state.selected.name ? " is-active" : "";
      const aliasText = command.aliases.length ? ` · 别名 ${command.aliases.join(" ")}` : "";
      return `
        <button class="command-item${active}" type="button" data-command="${escapeHtml(command.name)}" role="option" aria-selected="${active ? "true" : "false"}">
          <strong>${escapeHtml(command.name)}</strong>
          <span>${escapeHtml(command.category)} · OP ${escapeHtml(command.level)}${escapeHtml(aliasText)}</span>
        </button>
      `;
    })
    .join("");
}

function renderDetail() {
  const command = state.selected;
  const aliasBadges = command.aliases.map((alias) => `<span class="badge">别名 ${escapeHtml(alias)}</span>`).join("");

  elements.detail.innerHTML = `
    <header class="detail-head">
      <div class="detail-title-row">
        <h2>${escapeHtml(command.name)}</h2>
        <div class="badges">
          <span class="badge">${escapeHtml(command.category)}</span>
          <span class="badge">OP ${escapeHtml(command.level)}</span>
          ${aliasBadges}
        </div>
      </div>
      <p>${escapeHtml(command.summary)}</p>
    </header>
    <div class="detail-body">
      <section class="detail-section">
        <h3>用法语法</h3>
        <ul class="syntax-list">
          ${command.syntax
            .map(
              ([syntax, meaning]) => `
                <li class="syntax-card">
                  <code>${escapeHtml(syntax)}</code>
                  <p>${escapeHtml(meaning)}</p>
                </li>
              `
            )
            .join("")}
        </ul>
      </section>
      <section class="detail-section">
        <h3>参数释义</h3>
        <ul class="param-list">
          ${
            command.params.length
              ? command.params
                  .map(
                    ([param, meaning]) => `
                      <li class="param-card">
                        <strong>${escapeHtml(param)}</strong>
                        <p>${escapeHtml(meaning)}</p>
                      </li>
                    `
                  )
                  .join("")
              : `<li class="param-card"><p>此命令没有额外参数。</p></li>`
          }
        </ul>
      </section>
      <section class="detail-section">
        <h3>示例</h3>
        <ul class="example-list">
          ${command.examples
            .map(
              ([example, meaning]) => `
                <li class="example-card">
                  <code>${escapeHtml(example)}</code>
                  <p>${escapeHtml(meaning)}</p>
                </li>
              `
            )
            .join("")}
        </ul>
      </section>
      <section class="detail-section">
        <h3>备注</h3>
        <p>${escapeHtml(command.notes)}</p>
      </section>
    </div>
  `;
}

function render() {
  renderList();
  renderDetail();
}

function setupEvents() {
  elements.search.addEventListener("input", (event) => {
    state.query = event.target.value;
    render();
  });

  elements.category.addEventListener("change", (event) => {
    state.category = event.target.value;
    render();
  });

  elements.level.addEventListener("change", (event) => {
    state.level = event.target.value;
    render();
  });

  elements.list.addEventListener("click", (event) => {
    const button = event.target.closest("[data-command]");
    if (!button) return;
    state.selected = commands.find((command) => command.name === button.dataset.command) ?? state.selected;
    render();
  });

  elements.reset.addEventListener("click", () => {
    state.query = "";
    state.category = "全部分类";
    state.level = "all";
    elements.search.value = "";
    elements.category.value = state.category;
    elements.level.value = state.level;
    render();
  });

  elements.copyCurrent.addEventListener("click", async () => {
    const syntax = state.selected.syntax.map(([line]) => line).join("\n");
    try {
      await navigator.clipboard.writeText(syntax);
      elements.copyCurrent.textContent = "已复制";
      setTimeout(() => {
        elements.copyCurrent.textContent = "复制当前语法";
      }, 1300);
    } catch {
      elements.copyCurrent.textContent = "复制失败";
      setTimeout(() => {
        elements.copyCurrent.textContent = "复制当前语法";
      }, 1300);
    }
  });
}

function init() {
  elements.count.textContent = String(commands.length);
  renderCategoryOptions();
  setupEvents();
  render();
}

init();
