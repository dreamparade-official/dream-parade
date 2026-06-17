// ============================================================
// DreamParade サイト定数
// ここを編集してサイトのテキスト・URL・タレント情報を管理します
// ============================================================

// --- サイト基本情報 ---
export const SITE = {
  name: "DreamParade",
  tagline: "夢を、舞台へ。",
  subTagline: "笑いと感動で、あなたのステージを彩る。",
  description:
    "DreamParadeは、HC Co., Ltd.が運営する芸能プロダクションです。お笑い・俳優・アイドルの各分野で活躍するタレントを擁し、テレビ・舞台・イベントなど幅広い場面でご活用いただけます。",
  company: "HC Co., Ltd.",
  address: "",
  email: "",
} as const;

// --- ナビゲーション ---
export const NAV_LINKS = [
  { label: "タレント", href: "/talents" },
  { label: "オーディション", href: "/audition" },
] as const;

// --- タレントカテゴリ ---
export type TalentCategory = "comedy" | "actor" | "idol";

export const CATEGORY_LABELS: Record<TalentCategory, string> = {
  comedy: "お笑い",
  actor: "俳優",
  idol: "アイドル",
};

export const CATEGORY_COLORS: Record<TalentCategory, string> = {
  comedy: "bg-orange-100 text-orange-700",
  actor: "bg-blue-100 text-blue-700",
  idol: "bg-pink-100 text-pink-700",
};

// --- タレント型定義 ---
export interface MemberSns {
  name: string;
  twitterUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
}

export interface Talent {
  id: string;
  name: string;
  nameReading?: string;
  category: TalentCategory;
  categoryLabel: string;
  bio: string;
  members?: string[];
  imageUrl?: string;
  sns: {
    twitterUrl?: string;
    instagramUrl?: string;
    tiktokUrl?: string;
    youtubeEmbedUrl?: string;
  };
  memberSns?: MemberSns[];
}

// --- タレント情報 ---
export const TALENTS: Talent[] = [
  {
    id: "nagarekawa-dogs",
    name: "流川ドッグス",
    nameReading: "ながれかわどっぐす",
    imageUrl: "/images/talents/nagarekawa-dogs.jpg",
    category: "comedy",
    categoryLabel: "お笑い・漫才",
    bio: "しゃべくり漫才を軸に活動する若手コンビ。笑いと勢いで場を盛り上げる。圧倒的なテンポと独自の世界観で、観客を笑いの渦に巻き込む。",
    members: ["はまもとそら", "みよし"],
    sns: {
      tiktokUrl: "https://www.tiktok.com/@nagarekawadogs",
      instagramUrl: "https://www.instagram.com/nagarekawadogs1103",
      youtubeEmbedUrl: "https://www.youtube.com/embed/othpcT5-5Wo",
    },
    memberSns: [
      {
        name: "みよし",
        twitterUrl: "https://x.com/nagarekawadogs",
      },
      {
        name: "はまもとそら",
        twitterUrl: "https://x.com/hamasora0228",
      },
    ],
  },
];

// --- オーディション情報 ---
export const AUDITION = {
  title: "新人タレントオーディション",
  subtitle: "夢への第一歩を、DreamParadeと共に。",
  description:
    "DreamParadeでは随時、新人タレントを募集しています。お笑い・俳優・アイドルの各ジャンルで、あなたの個性と才能を輝かせてみませんか。経験・未経験は問いません。情熱とやる気のある方のご応募をお待ちしています。",
  genres: [
    {
      category: "comedy" as TalentCategory,
      label: "お笑い",
      description:
        "漫才・コント・ピン芸など、笑いで人を幸せにしたい方を募集しています。",
      flow: [
        { step: "01", label: "ネタ見せ", desc: "持ちネタを審査員の前で披露していただきます。" },
        { step: "02", label: "面接", desc: "マネージャーによる個別面談を実施します。" },
        { step: "03", label: "仮所属", desc: "合格者は仮所属としてデビューに向けた活動を開始します。" },
      ],
    },
    {
      category: "actor" as TalentCategory,
      label: "俳優",
      description:
        "ドラマ・映画・舞台など、演技で表現したい方を募集しています。",
      flow: [
        { step: "01", label: "書類選考", desc: "応募フォーム送信後、2週間以内に結果をご連絡します。" },
        { step: "02", label: "一次審査", desc: "オンラインまたは対面でのオーディションを実施します。" },
        { step: "03", label: "最終審査", desc: "書類・動画・面談を総合的に審査します。" },
        { step: "04", label: "合格・契約", desc: "合格者にはマネジメント契約についてご説明します。" },
      ],
    },
    {
      category: "idol" as TalentCategory,
      label: "アイドル",
      description:
        "歌・ダンス・パフォーマンスで輝きたい方を募集しています。",
      flow: [
        { step: "01", label: "書類選考", desc: "応募フォーム送信後、2週間以内に結果をご連絡します。" },
        { step: "02", label: "一次審査", desc: "歌・ダンスのパフォーマンス審査を実施します。" },
        { step: "03", label: "最終審査", desc: "書類・動画・面談を総合的に審査します。" },
        { step: "04", label: "合格・契約", desc: "合格者にはマネジメント契約についてご説明します。" },
      ],
    },
  ],
  requirements: [
    "年齢：15歳〜35歳（保護者同意書必要：未成年の場合）",
    "性別：不問",
    "経験：不問（未経験者歓迎）",
    "居住地：不問（遠方の方はオンライン面談対応可）",
  ],
} as const;

// --- お知らせダミーデータ（後からCMSに置き換え可能） ---
export const NEWS = [
  {
    id: "1",
    date: "2026.06.01",
    category: "お知らせ",
    title: "DreamParade公式サイトをリニューアルオープンしました。",
    href: "#",
  },
  {
    id: "2",
    date: "2026.06.01",
    category: "オーディション",
    title: "新規設立に伴い、お笑い芸人の大幅受付を開始しました。",
    href: "/audition",
  },
] as const;
