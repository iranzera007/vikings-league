/**
 * Fonte única de conteúdo da landing page.
 * Copy verbatim do handoff de design. Campos com string vazia são pendências
 * reais de conteúdo — a seção correspondente degrada sem eles. Não preencher
 * com valor inventado.
 */

export type IconName =
  | "eye"
  | "swords"
  | "bar-chart-3"
  | "network"
  | "shirt"
  | "megaphone"
  | "radio"
  | "users"
  | "line-chart"
  | "trophy"
  | "target"
  | "shield"
  | "hand"
  | "goal"
  | "send"
  | "repeat"
  | "shield-check"
  | "star"
  | "graduation-cap"
  | "play"
  | "globe"
  | "trophy-outline"
  | "shopping-bag";

export type Pillar = {
  icon: IconName;
  title: string;
  description: string;
};

export type Benefit = {
  icon: IconName;
  title: string;
  description: string;
};

export type Phase = {
  index: string;
  date: string;
  title: string;
  description: string;
  highlight: boolean;
};

export type CalendarDay = {
  weekday: string;
  day: string;
  month: string;
  title: string;
  highlight: boolean;
};

export type Metric = {
  icon: IconName;
  title: string;
  description: string;
};

export type Award = {
  id: string;
  title: string;
  badge?: string;
  prize?: string;
  image: string;
  icon?: IconName;
};

export type TrophyVideo = {
  id: string;
  title: string;
  category: "troféus" | "lances";
  badge: string;
  src: string;
  poster?: string;
  description?: string;
};

export type PlanFeature = {
  text: string;
  highlight?: boolean;
};

export type PlanItem = {
  id: "standard" | "premium";
  title: string;
  badge?: string;
  price: string;
  subtitle: string;
  highlight: boolean;
  features: readonly PlanFeature[];
  cta: string;
};

/**
 * Item da galeria horizontal. A união discriminada permite adicionar vídeo
 * sem tocar no layout — o componente decide o que renderizar pelo `type`.
 * A ordem do array é a ordem de exibição.
 */
export type GalleryItem =
  | {
      type: "image";
      id: string;
      src: string;
      alt: string;
      label?: string;
      /** object-position, quando o enquadramento padrão corta algo importante. */
      focus?: string;
    }
  | {
      type: "video";
      id: string;
      src: string;
      /** Frame exibido antes do play. Sem ele o card abre preto. */
      poster: string;
      alt: string;
      label?: string;
      focus?: string;
    };

export type PhotoSlot = {
  id: string;
  alt: string;
  /** Pendente: imagens oficiais da Vikings. Vazio = slot texturizado. */
  src: string;
  /** Legenda sobre a foto. Vazia = imagem sem rótulo. */
  caption?: string;
};

export const config = {
  registrationUrl: "#inscricao",
  instagramUrl: "https://www.instagram.com/vikingsteamesports/",
  discordUrl: "https://discord.gg/CWGYwB8hb",
  whatsappUrl: "https://chat.whatsapp.com/C0q8uv7gvya9yZKglSUbuv?s=cl&p=a&ilr=4&iam=1",
  showPrice: true,
} as const;

export const site = {
  name: "Vikings League",
  org: "Vikings Team E-sports",
  season: "TEMPORADA 2026",
  vacancies: "120 VAGAS",
  price: "A PARTIR DE R$ 49,90",
  duration: "1 MÊS",
  logo: {
    src: "/images/escudo-vikings.webp",
    alt: "Vikings League",
  },
} as const;

export const nav = {
  ticks: [
    { label: "01", href: "#s1" },
    { label: "02", href: "#sd" },
    { label: "03", href: "#s2" },
    { label: "04", href: "#s3" },
    { label: "05", href: "#s4" },
    { label: "06", href: "#s5" },
    { label: "07", href: "#s6" },
    { label: "08", href: "#s7" },
    { label: "09", href: "#sv" },
    { label: "10", href: "#sp" },
    { label: "11", href: "#sn" },
  ],
} as const;

export const header = {
  cta: "GARANTIR VAGA",
  links: [
    { label: "A liga", href: "#s2" },
    { label: "Planos", href: "#s3" },
    { label: "Como funciona", href: "#s4" },
    { label: "Calendário", href: "#s5" },
    { label: "Premiação", href: "#s7" },
    { label: "Vídeos", href: "#sv" },
  ],
} as const;

export const hero = {
  eyebrow: "SELETIVA PRO CLUBS · EA SPORTS FC",
  titleLead: "O seu passaporte para o cenário",
  titleAccent: "competitivo",
  paragraph:
    "Chegou a hora de sair do amadorismo e mostrar o seu verdadeiro valor no campo virtual. Uma peneira competitiva criada para identificar, avaliar e projetar talentos para o cenário competitivo.",
  stats: {
    vacancies: { value: "120", label: "VAGAS" },
    price: { value: "R$ 49,90", label: "A PARTIR DE" },
    duration: { value: "1 MÊS", label: "DE COMPETIÇÃO" },
  },
  primaryCta: "GARANTIR MINHA VAGA",
  secondaryCta: "PREENCHER INSCRIÇÃO",
} as const;

export const org = {
  eyebrow: "A ORGANIZAÇÃO",
  titleLead: "Quem nós",
  titleAccent: "somos",
  name: "Vikings Team E-sports",
  category: "Organização de esports · Pro Clubs / EA Sports FC",
  /** Encurtado: numa landing de conversão os números provam mais que o texto. */
  paragraph:
    "Organização de esports de Pro Clubs / EA Sports FC, com elenco próprio e comunidade ativa. A Vikings League é a nossa seletiva para mapear e projetar talentos.",
  followers: { count: 18.8, value: "+18,8 mil", label: "SEGUIDORES NO INSTAGRAM" },
  cta: "GARANTIR MINHA VAGA",
  photo: {
    id: "elenco",
    alt: "Elenco da Vikings Team E-sports com a bandeira da organização na Libertadores do Chile",
    src: "/images/elenco-libertadores.webp",
  } satisfies PhotoSlot,
  achievement: {
    value: "6º",
    label: "LUGAR NA LIBERTADORES DO CHILE",
    detail: "Entre 16 equipes — top 6 da América do Sul.",
  },
  founded: {
    year: "2024",
    by: "VKG_iranzera",
    heading: "Fundador",
    role: "CEO / Fundador",
    paragraph:
      "Fundador e CEO da Vikings Team E-sports desde 2024, VKG_iranzera está à frente da organização responsável pela Vikings League.",
    photo: "/images/ceo-iranzera.webp",
    photoAlt: "VKG_iranzera, fundador e CEO da Vikings Team E-sports",
    instagram: "https://www.instagram.com/vkg_iranzera",
  },
  /** Pendente: quem narra as finais. */
  roster: "",
} as const;

export type Stat = {
  icon: IconName;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  detail?: string;
};

export const numbers = {
  eyebrow: "A VIKINGS EM NÚMEROS",
  titleLead: "Dois anos construindo",
  titleAccent: "cenário",
  items: [
    {
      icon: "graduation-cap",
      value: 1000,
      prefix: "+",
      label: "ATLETAS FORMADOS",
      detail: "Em dois anos de operação.",
    },
    {
      icon: "play",
      value: 10,
      suffix: " MI",
      label: "VISUALIZAÇÕES/MÊS",
      detail: "Média nas redes sociais da organização.",
    },
    { icon: "globe", value: 9, label: "PAÍSES", detail: "Presença em três continentes." },
    {
      icon: "trophy-outline",
      value: 4,
      label: "PRESENCIAIS DISPUTADOS",
      detail: "Campeonatos fora do ambiente online.",
    },
    {
      icon: "shopping-bag",
      value: 470,
      prefix: "+",
      label: "UNIFORMES VENDIDOS",
      detail: "Desde a fundação, em 2024.",
    },
  ] satisfies Stat[],
  countries: {
    eyebrow: "PRESENÇA INTERNACIONAL",
    title: "De onde a Vikings joga",
    lead: "Uma comunidade conectando jogadores em 9 países.",
    /** Microcopy que dá sentido ao destaque no mapa. */
    legend: "Países com jogadores, membros ou operações Vikings.",
    /** Coordenadas do centroide de cada país, para o mapa de presença. */
    list: [
      { name: "México", lat: 23.6, lon: -102.5 },
      { name: "Colômbia", lat: 4.6, lon: -74.3 },
      { name: "Brasil", lat: -14.2, lon: -51.9 },
      { name: "Uruguai", lat: -32.5, lon: -55.8 },
      { name: "Argentina", lat: -38.4, lon: -63.6 },
      { name: "Chile", lat: -35.7, lon: -71.5 },
      { name: "Portugal", lat: 39.4, lon: -8.2 },
      { name: "Itália", lat: 41.9, lon: 12.6 },
      { name: "Bósnia", lat: 43.9, lon: 17.7 },
    ],
  },
} as const;

export type Partner = {
  name: string;
  /** Pendente: logo oficial. Vazio = renderiza só o nome. */
  logo: string;
  /** Perfil do parceiro. Vazio = o card não vira link. */
  url?: string;
  /** Logo em faixa larga (ratio > 2): recebe menos altura para igualar o peso. */
  wide?: boolean;
};

export const partners = {
  eyebrow: "PARCEIROS E PATROCINADORES",
  titleLead: "Quem caminha",
  titleAccent: "com a gente",
  items: [
    {
      name: "EK Uniformes",
      logo: "/images/partners/ek-uniformes-v2.webp",
      url: "https://www.instagram.com/ek.uniformes",
    },
    {
      name: "Bradley Runners",
      logo: "/images/partners/bradley-runners.webp",
      url: "https://www.instagram.com/bradleyrunners",
    },
    {
      name: "Cartzen",
      logo: "/images/partners/cartzen.webp",
      wide: true,
      url: "https://www.instagram.com/cartzenloja",
    },
    {
      name: "Scout Clubs",
      logo: "/images/partners/scout-clubs.webp",
      url: "https://www.instagram.com/scout_clubs",
    },
    { name: "Andromeda Clubs TV", logo: "/images/partners/andromeda-clubs-tv.webp" },
    {
      name: "Vikings das Coins",
      logo: "/images/partners/vikings-das-coins.webp",
      wide: true,
      url: "https://www.instagram.com/vikingsdascoins",
    },
    { name: "Forges Design", logo: "/images/partners/forges-design.webp", wide: true },
    { name: "Viaje com a Gente Sempre", logo: "" },
    {
      name: "Pedro Américo",
      logo: "/images/pedro-americo-logo.svg",
      wide: true,
      url: "https://www.pedroamerico.com",
    },
    { name: "Vikings League", logo: "/images/escudo-vikings.webp" },
  ] satisfies Partner[],
} as const;

export const about = {
  eyebrow: "A LIGA",
  titleLead: "Mais do que uma peneira. Uma porta para o",
  titleAccent: "competitivo",
  titleTail: ".",
  paragraph:
    "A Vikings League foi criada para mapear, avaliar e desenvolver jogadores que buscam competir em um ambiente mais estruturado.",
  pillars: [
    { icon: "eye", title: "Visibilidade", description: "Você aparece para quem escala time." },
    {
      icon: "swords",
      title: "Competição",
      description: "Partidas valendo avaliação, do início ao fim.",
    },
    {
      icon: "bar-chart-3",
      title: "Estatísticas",
      description: "Seu desempenho registrado partida a partida.",
    },
    {
      icon: "network",
      title: "Networking",
      description: "Convivência com jogadores competitivos.",
    },
  ] satisfies Pillar[],
  presentationVideo: {
    title: "Apresentação Oficial da Vikings League",
    badge: "VÍDEO DE APRESENTAÇÃO",
    src: "/videos/apresentacao-vikings-league.mp4",
    poster: "/images/elenco-libertadores.webp",
    description: "Conheça em detalhes a estrutura, os objetivos e o formato da seletiva competitiva da Vikings Team E-sports.",
  },
  gallery: [
    {
      type: "video",
      id: "apresentacao-liga",
      src: "/videos/apresentacao-vikings-league.mp4",
      poster: "/images/elenco-libertadores.webp",
      alt: "Vídeo de Apresentação Oficial da Vikings League",
      label: "Apresentação da Liga",
    },
    {
      type: "image",
      id: "atleta",
      src: "/images/atleta-uniforme.webp",
      alt: "Atleta anunciado pela Vikings Team E-sports com o uniforme oficial",
      label: "Anúncio de atleta",
    },
    {
      type: "image",
      id: "bastidores",
      src: "/images/atleta-transmissao.webp",
      alt: "Atletas da Vikings em partida, de headset e controle em mãos",
      label: "Bastidores de partida",
    },
    {
      type: "image",
      id: "prelecao",
      src: "/images/equipe-huddle.webp",
      alt: "Comissão da Vikings reunida em preleção antes da partida",
      label: "Preleção da equipe",
    },
    {
      type: "image",
      id: "libertadores",
      src: "/images/elenco-libertadores.webp",
      alt: "Elenco da Vikings com a bandeira da organização na Libertadores do Chile",
      label: "Libertadores do Chile",
    },
    {
      type: "image",
      id: "trofeu-proleague",
      src: "/images/trofeu-proleague.webp",
      alt: "Troféu do ProLeague Americas Santiago 2026 com o escudo da Vikings",
      label: "ProLeague Americas",
    },
    {
      type: "image",
      id: "patrocinadores",
      src: "/images/elenco-patrocinadores.webp",
      alt: "Elenco da Vikings reunido com a bandeira dos patrocinadores",
      label: "Parceiros",
    },
    {
      type: "image",
      id: "elenco",
      src: "/images/elenco-uniforme.webp",
      alt: "Elenco da Vikings Team E-sports reunido com o uniforme oficial",
      label: "Elenco",
    },
  ] satisfies GalleryItem[],
  instagram: {
    label: "INSTAGRAM",
    count: 18.8,
    value: "+18,8 MIL",
    caption: "seguidores acompanhando a Vikings Team E-sports",
    cta: "VER PERFIL",
  },
} as const;

export const benefits = {
  eyebrow: "PLANOS E BENEFÍCIOS",
  titleLead: "Duas formas de entrar. Uma oportunidade de fazer",
  titleAccent: "história",
  subtitle: "Escolha a melhor experiência para a sua jornada na Vikings League:",
  plans: [
    {
      id: "standard",
      title: "Plano de Inscrição",
      badge: "EXPERIÊNCIA COMPLETA",
      price: "R$ 49,90",
      subtitle: "Experiência completa na competição",
      highlight: false,
      cta: "GARANTIR PLANO R$ 49,90",
      features: [
        { text: "Banner individual de apresentação no Instagram (+19k seguidores)", highlight: false },
        { text: "Banners individuais e coletivos de divulgação oficial", highlight: false },
        { text: "Todos os jogos narrados (da fase de grupos até o mata-mata)", highlight: false },
        { text: "Ranking de Players por posição", highlight: false },
        { text: "Scout completo dos jogadores via Scout Clubs", highlight: false },
        { text: "Disputa por troféus reais e físicos nas premiações individuais", highlight: false },
        { text: "Visibilidade no cenário competitivo para o elenco da Vikings", highlight: false },
      ],
    },
    {
      id: "premium",
      title: "Plano Premium",
      badge: "🔥 POPULAR · UNIFORME FC 27 INCLUSO",
      price: "R$ 89,90",
      subtitle: "Experiência completa + Uniforme exclusivo FC 27",
      highlight: true,
      cta: "GARANTIR PLANO PREMIUM (R$ 89,90)",
      features: [
        { text: "UNIFORME OFICIAL — EDIÇÃO EXCLUSIVA FC 27 INCLUSO", highlight: true },
        { text: "Banner individual de apresentação no Instagram (+19k seguidores)", highlight: false },
        { text: "Banners individuais e coletivos de divulgação oficial", highlight: false },
        { text: "Todos os jogos narrados (da fase de grupos até o mata-mata)", highlight: false },
        { text: "Ranking de Players por posição", highlight: false },
        { text: "Scout completo dos jogadores via Scout Clubs", highlight: false },
        { text: "Disputa por troféus reais e físicos nas premiações individuais", highlight: false },
        { text: "Visibilidade no cenário competitivo para o elenco da Vikings", highlight: false },
      ],
    },
  ] satisfies PlanItem[],
} as const;

export const phases = {
  eyebrow: "COMO FUNCIONA",
  titleLead: "Do draft à",
  titleAccent: "oportunidade",
  items: [
    {
      index: "01",
      date: "04 SET",
      title: "Draft",
      description:
        "Os capitães são definidos e os 48 atletas distribuídos nas 3 lines de 16 jogadores.",
      highlight: false,
    },
    {
      index: "02",
      date: "05—06 SET",
      title: "Fase de grupos",
      description: "Os jogadores entram em campo e começam a ser avaliados.",
      highlight: false,
    },
    {
      index: "03",
      date: "SCOUT CLUBS",
      title: "Scouting",
      description: "As partidas são contabilizadas através da plataforma Scout Clubs.",
      highlight: false,
    },
    {
      index: "04",
      date: "12 SET",
      title: "Fases finais",
      description: "As partidas decisivas contam com transmissão e narração profissional.",
      highlight: true,
    },
  ] satisfies Phase[],
} as const;

export const calendar = {
  eyebrow: "CALENDÁRIO",
  season: "TEMPORADA 2026",
  titleLead: "Setembro",
  titleAccent: "decide",
  paragraph:
    "Quatro datas: o draft abre a liga, a fase de grupos define os classificados e as finais têm transmissão e narração.",
  days: [
    { weekday: "QUINTA", day: "04", month: "SET", title: "Draft", highlight: false },
    { weekday: "SEXTA", day: "05", month: "SET", title: "Fase de grupos", highlight: false },
    { weekday: "SÁBADO", day: "06", month: "SET", title: "Fase de grupos", highlight: false },
    { weekday: "SEXTA", day: "12", month: "SET", title: "Finais", highlight: true },
  ] satisfies CalendarDay[],
} as const;

export const scouting = {
  eyebrow: "ESTATÍSTICAS E SCOUTING",
  titleLead: "Aqui,",
  titleAccent: "desempenho",
  titleTail: "fala mais alto",
  paragraph:
    "Todos os jogos serão contabilizados através da plataforma Scout Clubs, permitindo uma avaliação baseada no desempenho dos atletas.",
  chip: "MÉTRICAS ACOMPANHADAS NA AVALIAÇÃO",
  formation: {
    label: "FORMAÇÃO DA LIGA",
    lines: [
      { label: "LINE 01", active: true },
      { label: "LINE 02", active: false },
      { label: "LINE 03", active: false },
    ],
    playersPerLine: 16,
    summary: ["48 ATLETAS", "3 LINES COMPETITIVAS", "16 JOGADORES POR LINE"],
    funnel: "Das 120 vagas de inscrição, 48 atletas são distribuídos em 3 lines de 16 jogadores.",
  },
  metrics: [
    { icon: "goal", title: "Gols", description: "Finalizações convertidas em cada partida." },
    { icon: "send", title: "Assistências", description: "Passes que resultam em gol." },
    { icon: "repeat", title: "Passes", description: "Volume e acerto na distribuição." },
    { icon: "shield-check", title: "Desarmes", description: "Bolas recuperadas na defesa." },
    { icon: "star", title: "Nota média", description: "Média geral do desempenho na liga." },
  ] satisfies Metric[],
} as const;

export const awards = {
  eyebrow: "PREMIAÇÃO OFICIAL",
  titleLead: "Troféus e premiações da",
  titleAccent: "Vikings League",
  photo: {
    id: "trofeu",
    alt: "Troféu de artilheiro do campeonato da Vikings League",
    src: "/images/trofeu-artilheiro.webp",
  } satisfies PhotoSlot,
  items: [
    {
      id: "campeao",
      title: "Campeão Vikings League",
      badge: "1º LUGAR",
      prize: "Troféu Oficial + Premiação para o Elenco Campeão",
      image: "/images/awards/campeao.png",
      icon: "trophy",
    },
    {
      id: "vice-campeao",
      title: "Vice-Campeão",
      badge: "2º LUGAR",
      prize: "Troféu de Vice-Campeão + Destaque Oficial da Liga",
      image: "/images/awards/vice-campeao.png",
      icon: "trophy-outline",
    },
    {
      id: "artilheiro",
      title: "Artilheiro da Liga",
      badge: "CHUTEIRA DE OURO",
      prize: "Troféu Exclusivo para o Maior Marcador de Gols",
      image: "/images/awards/artilheiro.png",
      icon: "goal",
    },
    {
      id: "maestro",
      title: "Maestro da Liga",
      badge: "LÍDER DE ASSISTÊNCIAS",
      prize: "Troféu Exclusivo para o Maior Garçom do Campeonato",
      image: "/images/awards/maestro.png",
      icon: "send",
    },
    {
      id: "melhor-goleiro",
      title: "Melhor Goleiro",
      badge: "LUVA DE OURO",
      prize: "Troféu para o Goleiro Mais Destacado da Edição",
      image: "/images/awards/melhor-goleiro.png",
      icon: "hand",
    },
    {
      id: "melhor-meia",
      title: "Melhor Meia",
      badge: "SELEÇÃO DA LIGA",
      prize: "Troféu para o Melhor Meio-Campista Criador",
      image: "/images/awards/melhor-meia.png",
      icon: "star",
    },
    {
      id: "melhor-volante",
      title: "Melhor Volante",
      badge: "MURALHA DO MEIO",
      prize: "Troféu para o Melhor Meia Defensivo / Volante",
      image: "/images/awards/melhor-volante.png",
      icon: "shield",
    },
    {
      id: "melhor-ala",
      title: "Melhor Ala",
      badge: "DOMÍNIO LATERAL",
      prize: "Troféu para o Melhor Ala / Lateral do Campeonato",
      image: "/images/awards/melhor-ala.png",
      icon: "swords",
    },
    {
      id: "q1",
      title: "Qualificatória 01",
      badge: "SELETIVA DRAFT",
      prize: "Troféu Destaque da Etapa Qualificatória 1",
      image: "/images/awards/q1.png",
      icon: "target",
    },
    {
      id: "q2",
      title: "Qualificatória 02",
      badge: "SELETIVA DRAFT",
      prize: "Troféu Destaque da Etapa Qualificatória 2",
      image: "/images/awards/q2.png",
      icon: "target",
    },
    {
      id: "q3",
      title: "Qualificatória 03",
      badge: "SELETIVA DRAFT",
      prize: "Troféu Destaque da Etapa Qualificatória 3",
      image: "/images/awards/q3.png",
      icon: "target",
    },
    {
      id: "q4",
      title: "Qualificatória 04",
      badge: "SELETIVA DRAFT",
      prize: "Troféu Destaque da Etapa Qualificatória 4",
      image: "/images/awards/q4.png",
      icon: "target",
    },
  ] satisfies Award[],
  videos: [
    {
      id: "video-trofeu-1",
      title: "Apresentação dos Troféus Oficiais",
      category: "troféus",
      badge: "EXPOSIÇÃO DOS TROFÉUS",
      src: "/videos/trofeu-video-1.mp4",
      description: "Vídeo oficial de apresentação dos troféus físicos da Vikings League em detalhes.",
    },
    {
      id: "video-trofeu-2",
      title: "Troféu Destaque em Detalhes",
      category: "troféus",
      badge: "TROFÉU FÍSICO",
      src: "/videos/trofeu-video-2.mp4",
      description: "Exibição em detalhes do troféu oficial entregue aos premiados.",
    },
    {
      id: "video-trofeu-3",
      title: "Taça dos Campeões em Detalhes",
      category: "troféus",
      badge: "TAÇA DOS CAMPEÕES",
      src: "/videos/trofeu-video-3.mp4",
      description: "Apresentação da taça disputada pelas equipes na seletiva.",
    },
    {
      id: "lance-1",
      title: "Golaço & Destaque da Liga",
      category: "lances",
      badge: "LANCE DESTAQUE",
      src: "/videos/lance-1.mp4",
      description: "Jogada ensaiada com finalização precisa no ângulo.",
    },
    {
      id: "lance-2",
      title: "Jogada Trabalhada em Equipe",
      category: "lances",
      badge: "VISÃO DE JOGO",
      src: "/videos/lance-2.mp4",
      description: "Troca rápida de passes no meio-campo até o gol.",
    },
    {
      id: "lance-3",
      title: "Defesa Milagrosa do Goleiro",
      category: "lances",
      badge: "DEFESA ESPETACULAR",
      src: "/videos/lance-3.mp4",
      description: "Ponte salvadora no fim da partida decisiva.",
    },
    {
      id: "lance-4",
      title: "Contra-Ataque Rápido",
      category: "lances",
      badge: "VELOCIDADE TÁTICA",
      src: "/videos/lance-4.mp4",
      description: "Saída em velocidade surpreendendo a zaga adversária.",
    },
    {
      id: "lance-5",
      title: "Drible Desconcertante e Gol",
      category: "lances",
      badge: "HABILIDADE INDIVIDUAL",
      src: "/videos/lance-5.mp4",
      description: "Jogada individual deixando a zaga para trás.",
    },
    {
      id: "lance-6",
      title: "Pressão Alta e Recuperação",
      category: "lances",
      badge: "PRESSÃO DEFENSIVA",
      src: "/videos/lance-6.mp4",
      description: "Desarme no setor ofensivo e gol imediato.",
    },
    {
      id: "lance-7",
      title: "Chute no Ângulo",
      category: "lances",
      badge: "CHUTE PRECISO",
      src: "/videos/lance-7.mp4",
      description: "Finalização potente sem qualquer hipótese de defesa.",
    },
  ] satisfies TrophyVideo[],
} as const;

export const finalCta = {
  titleLead: "Pronto para mostrar do que você é",
  titleAccent: "capaz",
  titleTail: "?",
  paragraph:
    "Você não está entrando apenas para disputar partidas. Está entrando para mostrar que merece estar entre os melhores.",
  headline: "DUAS FORMAS DE ENTRAR. UMA OPORTUNIDADE DE FAZER HISTÓRIA.",
  standardOffer: {
    price: "R$ 49,90",
    label: "Plano de Inscrição",
    desc: "Experiência completa na competição",
  },
  premiumOffer: {
    price: "R$ 89,90",
    label: "Plano Premium",
    desc: "Experiência completa + Uniforme exclusivo FC 27",
  },
  vacancies: "120 vagas disponíveis",
  duration: "1 mês de competição",
  cta: "GARANTIR MINHA VAGA",
  note: "O link do grupo é liberado depois que a inscrição for registrada.",
} as const;

export const footer = {
  org: "Vikings Team E-sports",
  league: "Vikings League",
  description:
    "Organização de esports responsável pela Vikings League, seletiva competitiva de Pro Clubs / EA Sports FC.",
  columns: {
    competition: {
      label: "COMPETIÇÃO",
      links: [
        { label: "A liga", href: "#s2" },
        { label: "Como funciona", href: "#s4" },
        { label: "Calendário", href: "#s5" },
        { label: "Premiação", href: "#s7" },
        { label: "Parceiros", href: "#sp" },
      ],
    },
    contact: {
      label: "CONTATO",
      instagram: "@vikingsteamesports",
      whatsapp: "Inscrição",
    },
  },
  copyright: "© VIKINGS TEAM E-SPORTS",
  season: "VIKINGS LEAGUE · TEMPORADA 2026",
  credit: {
    text: "Desenvolvido por Pedro Américo",
    links: [
      { label: "GitHub", href: "https://github.com/pedruamerico/" },
      { label: "LinkedIn", href: "https://linkedin.com/in/pedruamerico" },
    ],
  },
} as const;
