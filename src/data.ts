import { Product, Review } from './types';

// Import high-fidelity generated images
import matchaMilleCrepeImg from './assets/images/matcha_mille_crepe_1779240159050.png';
import hojichaPannaCottaImg from './assets/images/hojicha_panna_cotta_1779240175486.png';
import matchaCaneleImg from './assets/images/matcha_canele_1779240192430.png';
import sakuraMatchaMacaronImg from './assets/images/sakura_matcha_macaron_1779240212225.png';
import matchaTrufflesImg from './assets/images/matcha_truffles_1779240549374.png';
import genmaichaLatteFoamImg from './assets/images/genmaicha_latte_foam_1779240951334.png';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: '宇治精工千层蛋糕',
    englishName: 'Uji Matcha Mille Crêpe',
    description: '手作21层饼皮，夹拂浓郁宇治若竹抹茶乳霜',
    price: 68,
    category: 'matcha',
    image: matchaMilleCrepeImg,
    tags: ['招牌首选', '手工煎制', '丸久小山园'],
    rating: 4.9,
    reviewsCount: 148,
    isPopular: true,
    isMatchaExclusive: true,
    detailDescription: '严选日本宇治「若竹」级石磨抹茶粉，手工煎制21层薄如蝉翼的法式饼皮。每一层都精准抹上打发至极致细腻的抹茶鲜奶油，层层重叠，入口即化，微微回甘，是抹茶控不容错过的殿堂级杰作。',
    ingredients: ['宇治小山园抹茶粉', '法国爱乐薇淡奶油', '手工黄金薄饼皮', '海藻糖']
  },
  {
    id: 'p2',
    name: '极浓抹茶手工松露',
    englishName: 'Ceremonial Matcha Truffles',
    description: '手工揉制，顶级生巧克力与特浓抹茶粉的碰撞',
    price: 58,
    category: 'matcha',
    image: matchaTrufflesImg,
    tags: ['醇厚微苦', '纯手工', '生巧质感'],
    rating: 4.8,
    reviewsCount: 96,
    isNew: true,
    isMatchaExclusive: true,
    detailDescription: '以高浓度法芙娜白巧克力为底，融入精磨皇家级宇治五十铃抹茶。低温慢速乳化，手工揉制成丸，裹上厚厚的丸久小山园抹茶粉。口感细腻丝滑，茶香浓烈，可可香与原茶苦涩完美中和。',
    ingredients: ['五十铃宇治抹茶粉', '法芙娜白巧克力', '法国伊斯尼黄油', '喜马拉雅粉盐']
  },
  {
    id: 'p3',
    name: '朝雾静冈焙茶奶冻杯',
    englishName: 'Hojicha Panna Cotta',
    description: '静冈强倍火烘焙，高雅炭培茶香与绵密鲜奶酪的共融',
    price: 42,
    category: 'classic',
    image: hojichaPannaCottaImg,
    tags: ['茶香绵长', '低糖无负担', '温润不腻'],
    rating: 4.7,
    reviewsCount: 74,
    isPopular: true,
    detailDescription: '选用静冈县强焙火春茶研磨而成的焙茶粉，炭焙香气深邃高雅。下层为丝滑鲜奶酪，上层覆以特制炭焙茶冻，点缀以食用金箔。质地如绢丝，入口即绽放麦香与焦糖一般的茶韵。',
    ingredients: ['静冈特焙重火茶粉', '朝日有机鲜牛乳', '新西兰乳脂甜奶油', '食用纯金箔']
  },
  {
    id: 'p4',
    name: '抹茶脆皮可丽露',
    englishName: 'Sweet Matcha Canelé',
    description: '焦糖外壳酥脆硬朗，内里如布丁般湿润柔嫩，茶意盎然',
    price: 24,
    category: 'classic',
    image: matchaCaneleImg,
    tags: ['外脆内滑', '法式经典', '限时手打'],
    rating: 4.6,
    reviewsCount: 52,
    detailDescription: '传统波尔多铜模加上天然蜂蜡烤制，历经24小时低温熟成面糊。烤箱高温烘烤，形成黑亮硬脆的琥珀焦糖外壳，内里保留如布丁般湿润多孔的浅绿心。浓香草味与悠长茶气在口中缱绻。',
    ingredients: ['小山园青岚抹茶粉', '马达加斯加香草荚', '古巴朗姆酒', '生态蜂蜡', '海藻精面粉']
  },
  {
    id: 'p5',
    name: '樱落千叶二重奏马卡龙',
    englishName: 'Sakura Matcha Macaron',
    description: '一抹粉红樱羽，跌入一汪浓绿，春风拂面的双色素雅之作',
    price: 28,
    category: 'seasonal',
    image: sakuraMatchaMacaronImg,
    tags: ['季节限定', '盐渍樱花', '春日浪漫'],
    rating: 4.7,
    reviewsCount: 41,
    isNew: true,
    detailDescription: '盐渍大岛樱花瓣融入酥脆小裙边马卡龙，内馅填入小山园抹茶奶油霜和手熬草莓酱。咸甜、微酸、甘涩与浓绿春茶气交相辉映，展现如粉樱绿柳般的唯美西湖风情。',
    ingredients: ['日本盐渍大岛樱', '加利福尼亚扁桃仁粉', '青岚抹茶粉', '自家制野生草莓馅']
  },
  {
    id: 'p6',
    name: '御宇治手打石磨特浓抹茶',
    englishName: 'Hand-Whisked Ceremonial Matcha',
    description: '纯手工竹筅击拂，清汤泡沫碧润，一品知江南与宇治',
    price: 48,
    category: 'drink',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    tags: ['古法手作', '无糖素雅', '纯正茶道'],
    rating: 4.9,
    reviewsCount: 112,
    isPopular: true,
    isMatchaExclusive: true,
    detailDescription: '茶师手执黄金比例十五本立竹筅快速击拂，将高级石磨抹茶与80℃弱碱性矿泉水充分混合。表层泡沫细密如春雪，口感甘甜顺滑，富含叶绿素与温润茶香。',
    ingredients: ['丸久小山园上等石磨纯茗茶', '天目山深岩弱碱冷泉']
  },
  {
    id: 'p7',
    name: '冬雪玄米茶布列塔尼乳酪',
    englishName: 'Genmaicha Cheese Cake',
    description: '稻麦焦香玄米茶，与法国奶油干酪的芝士厚舞合奏',
    price: 46,
    category: 'classic',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    tags: ['谷物烘焙香', '芝士浓郁', '坚果颗粒'],
    rating: 4.8,
    reviewsCount: 68,
    detailDescription: '精选越光米爆制的玄米与静冈煎茶一同精细粉碎，融入法国Kiri乳酪。重烘焙的温暖谷物感结合重乳酪的酸美油脂，表面覆盖一层如初雪般的轻奶油，厚重而不失幽雅风华。',
    ingredients: ['手作玄米煎茶粉', '法国Kiri奶油芝士', '安佳淡奶油', '布列塔尼酥饼干底']
  },
  {
    id: 'p8',
    name: '云舒流沙玄米鲜奶茶',
    englishName: 'Genmaicha Latte with Cloud Foam',
    description: '烘炒米香与清冽绿茶、再覆上咸芝士奶盖，层次错落',
    price: 36,
    category: 'drink',
    image: genmaichaLatteFoamImg,
    tags: ['烘焙米香', '流脂厚盖', '冷热可选'],
    rating: 4.8,
    reviewsCount: 83,
    detailDescription: '带有天然焦米麦香的玄米茶，冲沏出剔透底汤，加入全脂牧场鲜牛奶。最后倾覆香浓的岩盐芝士云盖并撒上烘烤香脆的碎玄米，口感从咸甜顺滑到坚果酥香，波澜起伏。',
    ingredients: ['特级炒玄米煎茶', '特仑苏有机鲜牛奶', '岩盐芝士滑奶油', '焙香散谷粒']
  },
  {
    id: 'p9',
    name: '西湖桂雨抹茶提拉米苏',
    englishName: 'West Lake Osmanthus Matcha Tiramisu',
    description: '金桂芬芳跌入五十铃抹茶的苍翠，融入轻盈马斯卡彭乳酪与特调茶蜜。',
    price: 48,
    category: 'seasonal',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80',
    tags: ['时令特供', '金桂花香', '中西融合'],
    rating: 4.9,
    reviewsCount: 38,
    isNew: true,
    detailDescription: '将杭州满觉陇的秋生金桂蜜，与日本宇治大极上五十铃级抹茶完美融合。香滑的马斯卡彭乳酪里潜藏着桂花乌龙茶酒烘烤的手指饼干，每一口都展现了金桂的清甜、春茶的优雅涩甘与柔润奶香。',
    ingredients: ['五十铃宇治抹茶粉', '满陇手酿金桂蜜', '意大利马斯卡彭干酪', '手制桂花乌龙茶液', '有机手指饼干']
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    author: '林雨心',
    role: '金牌会员 · 百年茶道世家继承人',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80',
    rating: 5,
    date: '2026-05-18',
    content: '作为一名长期品茶的茶学人，我对抹茶的品质极度挑剔。这里的“宇治精工千层”真的太惊艳了！21层饼皮匀称轻薄，抹茶乳霜用的是顶尖小山园抹茶，极其柔滑，入口含蓄的苦，随之而来的是饱满悠长、像海苔一样的深沉鲜甜（Umami），糖分控制得很高级，毫无腻感。',
    productName: '宇治精工千层蛋糕',
    tags: ['入口即化', '强烈推荐', '不俗甘茶'],
    likes: 42,
    isLiked: false
  },
  {
    id: 'r2',
    author: '沈知安',
    role: '独立设计师 / 摄影师',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    rating: 5,
    date: '2026-05-15',
    content: '空间美学与甜点相融。不仅店里装潢充满侘寂之美，甜品的摆盘也极像一件精美雕塑。点了一杯焙茶奶冻，黑褐与金箔交融。焙茶独特的烟熏炭焙香在奶霜包裹下既温柔又傲气，太适合安静地发呆和取景了。',
    productName: '朝雾静冈焙茶奶冻杯',
    tags: ['极致美学', '静谧茶烟'],
    likes: 29,
    isLiked: false
  },
  {
    id: 'r3',
    author: '陈若水',
    role: '美食专栏撰稿人',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    rating: 4,
    date: '2026-05-10',
    content: '春季限定的樱花马卡龙是本季最大的惊喜！咬下去外壳发出细微的喀嚓声，盐渍櫻花的咸味妙手回春地唤醒了抹茶杏仁霜的浓郁，粉嫩的饼壳和纯黑的手打陶土盘拍起照来超级上镜。就是每天限量很难抢！',
    productName: '樱落千叶二重奏马卡龙',
    tags: ['高颜值', '季节仙物'],
    likes: 18,
    isLiked: false
  },
  {
    id: 'r4',
    author: '松下优美',
    role: '客座日籍花道讲师',
    avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=150&h=150&q=80',
    rating: 5,
    date: '2026-05-02',
    content: '这家的手打浓茶让我想起了在家乡宇治市茶馆中的体验。茶筅飞速而细腻打出的乳沫维持了极长时间，几乎没有任何干枯的茶粉颗粒，这证明其石磨极精，击拂的手法完全合格，是一场极佳的风雅修行。',
    productName: '御宇治手打石磨特浓抹茶',
    tags: ['宇治风物', '神圣手拂'],
    likes: 31,
    isLiked: false
  },
  {
    id: 'r5',
    author: '叶清玄',
    role: '独立茶评人 / 专栏作者',
    avatar: 'https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&w=150&h=150&q=80',
    rating: 5,
    date: '2026-05-08',
    content: '这次品尝了“极浓抹茶手工松露”，白巧克力的甘美在低温慢速乳化下，把五十铃抹茶的幽微茶涩催化成了难以置信的丝滑口感。外层覆上的厚厚抹茶粉，微苦回甘，在舌尖溶化那一瞬，仿佛置身于古刹静室中推敲清音，是不可多得的手作艺术。',
    productName: '极浓抹茶手工松露',
    tags: ['醇厚回甘', '治愈首选', '匠心质感'],
    likes: 24,
    isLiked: false
  },
  {
    id: 'r6',
    author: '陆凡羽',
    role: '西点烘焙工坊主理人',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80',
    rating: 5,
    date: '2026-04-28',
    content: '“抹茶脆皮可丽露”将法式经典与日系茶韵完美调和。蜂蜡涂膜烤出的脆壳极为硬朗焦香，切开后内部如温软湿润的布丁切面，蜂窝状孔洞里藏满了微苦的青岚茶香与大溪地香草的高雅，口感对比剧烈，层次妙不可言！',
    productName: '抹茶脆皮可丽露',
    tags: ['外脆内软', '法日融合', '满分细节'],
    likes: 19,
    isLiked: false
  }
];

export const MOCK_USER = {
  name: '林雨心',
  level: '翠心特邀・黄金会员',
  levelNumber: 3,
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80',
  points: 1250,
  exp: 820,
  nextLevelExp: 1000,
  cardId: 'CX-82901178',
  coupons: [
    { id: 'c1', title: '春暖花开·全场甜点85折券', desc: '限时品尝樱花、抹茶主推款', expire: '2026-06-30', used: false, code: 'SPRING85' },
    { id: 'c2', title: '手作坊专属·免单试吃申领券', desc: '可免费兑换抹茶可丽露2个', expire: '2026-05-31', used: false, code: 'CANELFREE' },
    { id: 'c3', title: '会员专享 · 尊享免费下午茶升级券', desc: '任意中杯饮品可免费升级大杯', expire: '2026-12-31', used: true, code: 'UPGRADEUP' }
  ],
  bookings: [
    {
      id: 'b-9912',
      name: '林雨心',
      phone: '138****8812',
      courseType: '「茶道与菓子」：初夏抹茶点茶体验班',
      date: '2026-05-28',
      timeSlot: '14:00 - 16:30',
      guestsCount: 2,
      notes: '对浓茶款点茶很期待，希望能使用手磨竹筅的特别讲解。',
      status: 'confirmed',
      bookingTime: '2026-05-19 12:44'
    },
    {
      id: 'b-8802',
      name: '林雨心',
      phone: '138****8812',
      courseType: '外壳烘焙手作：经典法式可丽露进阶特训',
      date: '2026-04-12',
      timeSlot: '09:30 - 12:00',
      guestsCount: 1,
      notes: '希望多了解一点天然蜂蜡对焦糖壳的影响。',
      status: 'confirmed',
      bookingTime: '2026-04-01 10:15'
    }
  ],
  activities: [
    { date: '2026-05-18 15:30', desc: '到店核销/消费：宇治精工千层蛋糕1个，御宇治特浓抹茶1杯', points: '+116', amount: '116' },
    { date: '2026-05-10 14:15', desc: '到店核销/消费：樱落千叶二重奏马卡龙2枚，玄米茶鲜奶茶1杯', points: '+92', amount: '92' },
    { date: '2026-05-01 19:22', desc: '在线预约：初夏抹茶点茶体验班 (2人)', points: '锁定预约金', amount: '150' },
    { date: '2026-04-12 11:45', desc: '完成「经典法式可丽露进阶特训」课程签到', points: '+300', amount: '0' }
  ]
};

export const COURSES = [
  {
    id: 'c-tea',
    title: '「茶道与菓子」宇治点茶文化体验班',
    subtitle: '传授宇治「丸久小山园」经典抹茶击拂法，亲调专属于你的抹茶并搭配和菓子。',
    duration: '150分钟',
    difficulty: '入门级 / 探秘和风雅韵',
    price: 320,
    spotsLeft: 4,
    schedule: '每周四、周六下午 14:00 - 16:30',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    details: '包含：日本原装点茶道具租赁、3款极品等级抹茶原料、精选主厨和菓子配茶、茶道文化讲义、专属伴手礼包。'
  },
  {
    id: 'c-baking',
    title: '「繁复饼皮」极致21层抹茶千层烘烤工法',
    subtitle: '主厨带教，掌握吹弹可破的超薄奶油千层饼皮秘方与双重抹茶慕斯奶油抹匀艺术。',
    duration: '180分钟',
    difficulty: '中级 / 需耐心与精确度',
    price: 450,
    spotsLeft: 2,
    schedule: '每周日上午 09:30 - 12:30',
    image: matchaMilleCrepeImg,
    details: '包含：全进口烘焙原料、自制6寸抹茶千层蛋糕拎走、主厨特制配方电子版、抹茶手作高级围裙。'
  },
  {
    id: 'c-canele',
    title: '「气孔与蜂蜡」法式黄金斑斓可丽露特训',
    subtitle: '破解硬脆外壳与如布丁质感气孔的多重谜题。从24小时低温慢熟面糊，到蜂蜡涂膜，一次通关。',
    duration: '140分钟',
    difficulty: '进阶级 / 面糊熟化解密',
    price: 380,
    spotsLeft: 3,
    schedule: '每周日上午 14:30 - 16:50',
    image: matchaCaneleImg,
    details: '包含：波尔多全铜可丽露模具使用课程、每人实操一炉并带走6只装礼盒、下午茶休歇间歇。'
  }
];
