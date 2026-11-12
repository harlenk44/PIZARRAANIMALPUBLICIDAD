import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  Tv,
  Maximize2,
  Minimize2,
  Check,
  MessageCircle,
  ExternalLink,
  Settings,
  Copy,
  RefreshCw,
  Megaphone,
  Code2,
  Phone,
  DollarSign,
  Eye,
  Radio,
  Sparkles,
  Zap,
  Layers,
  MonitorPlay,
  VolumeX,
} from 'lucide-react';

const LOGO_URL = '/assets/aistudio/1793811586601_ae5d72dc.jpg';
const REAL_SCREEN_URL = '/assets/aistudio/image_bb923dbb.png';

interface Animalito {
  number: string;
  name: string;
  emoji: string;
}

interface LotteryBoard {
  id: string;
  name: string;
  schedule: string;
  colorName: 'green' | 'orange' | 'emerald' | 'red' | 'yellow' | 'purple';
  borderColor: string;
  textColor: string;
  currentWinner: Animalito;
  lastUpdated: string;
  history: { hour: string; winner: Animalito }[];
}

const ANIMALITOS_CATALOG: Animalito[] = [
  { number: '00', name: 'Delfín', emoji: '🐬' },
  { number: '0', name: 'Ballena', emoji: '🐋' },
  { number: '01', name: 'Carnero', emoji: '🐏' },
  { number: '02', name: 'Toro', emoji: '🐂' },
  { number: '03', name: 'Ciempiés', emoji: '🐛' },
  { number: '04', name: 'Alacrán', emoji: '🦂' },
  { number: '05', name: 'León', emoji: '🦁' },
  { number: '06', name: 'Rana', emoji: '🐸' },
  { number: '07', name: 'Perico', emoji: '🦜' },
  { number: '08', name: 'Ratón', emoji: '🐭' },
  { number: '09', name: 'Águila', emoji: '🦅' },
  { number: '10', name: 'Tigre', emoji: '🐯' },
  { number: '11', name: 'Gato', emoji: '🐱' },
  { number: '12', name: 'Caballo', emoji: '🐴' },
  { number: '13', name: 'Mono', emoji: '🐒' },
  { number: '14', name: 'Paloma', emoji: '🕊️' },
  { number: '15', name: 'Zorro', emoji: '🦊' },
  { number: '16', name: 'Oso', emoji: '🐻' },
  { number: '17', name: 'Pavo', emoji: '🦃' },
  { number: '18', name: 'Burro', emoji: '🫏' },
  { number: '19', name: 'Chivo', emoji: '🐐' },
  { number: '20', name: 'Cochino', emoji: '🐷' },
  { number: '21', name: 'Gallo', emoji: '🐓' },
  { number: '22', name: 'Camello', emoji: '🐪' },
  { number: '23', name: 'Cebra', emoji: '🦓' },
  { number: '24', name: 'Iguana', emoji: '🦎' },
  { number: '25', name: 'Gallina', emoji: '🐔' },
  { number: '26', name: 'Vaca', emoji: '🐄' },
  { number: '27', name: 'Perro', emoji: '🐕' },
  { number: '28', name: 'Zamuro', emoji: '🦅' },
  { number: '29', name: 'Elefante', emoji: '🐘' },
  { number: '30', name: 'Caimán', emoji: '🐊' },
  { number: '31', name: 'Lapa', emoji: '🐹' },
  { number: '32', name: 'Ardilla', emoji: '🐿️' },
  { number: '33', name: 'Pescado', emoji: '🐟' },
  { number: '34', name: 'Venado', emoji: '🦌' },
  { number: '35', name: 'Jirafa', emoji: '🦒' },
  { number: '36', name: 'Culebra', emoji: '🐍' },
];

// Based directly on the 8 lotteries displayed on the user's real screen:
const REAL_BOARDS: LotteryBoard[] = [
  {
    id: 'lotto-activo',
    name: 'LOTTO ACTIVO',
    schedule: '1:00 PM',
    colorName: 'green',
    borderColor: 'border-[#22c55e] shadow-[0_0_15px_rgba(34,197,94,0.3)]',
    textColor: 'text-[#22c55e]',
    currentWinner: { number: '20', name: 'Cochino', emoji: '🐷' },
    lastUpdated: '1:00 PM',
    history: [
      { hour: '8:00 AM', winner: { number: '35', name: 'Jirafa', emoji: '🦒' } },
      { hour: '9:00 AM', winner: { number: '00', name: 'Delfín', emoji: '🐬' } },
      { hour: '10:00 AM', winner: { number: '36', name: 'Culebra', emoji: '🐍' } },
      { hour: '11:00 AM', winner: { number: '16', name: 'Oso', emoji: '🐻' } },
      { hour: '12:00 PM', winner: { number: '27', name: 'Perro', emoji: '🐕' } },
      { hour: '1:00 PM', winner: { number: '20', name: 'Cochino', emoji: '🐷' } },
    ],
  },
  {
    id: 'guacharo-activo',
    name: 'GUACHARO ACTIVO',
    schedule: '1:00 PM',
    colorName: 'green',
    borderColor: 'border-[#22c55e] shadow-[0_0_15px_rgba(34,197,94,0.3)]',
    textColor: 'text-[#22c55e]',
    currentWinner: { number: '73', name: 'Hipopótamo', emoji: '🦛' },
    lastUpdated: '1:00 PM',
    history: [
      { hour: '8:00 AM', winner: { number: '28', name: 'Zamuro', emoji: '🦅' } },
      { hour: '9:00 AM', winner: { number: '53', name: 'Tucán', emoji: '🦜' } },
      { hour: '10:00 AM', winner: { number: '49', name: 'Puma', emoji: '🐆' } },
      { hour: '11:00 AM', winner: { number: '40', name: 'Nutria', emoji: '🦦' } },
      { hour: '12:00 PM', winner: { number: '23', name: 'Cebra', emoji: '🦓' } },
      { hour: '1:00 PM', winner: { number: '73', name: 'Hipopótamo', emoji: '🦛' } },
    ],
  },
  {
    id: 'guacharito',
    name: 'EL GUACHARITO MILLONARIO',
    schedule: '1:30 PM',
    colorName: 'orange',
    borderColor: 'border-[#f97316] shadow-[0_0_15px_rgba(249,115,22,0.3)]',
    textColor: 'text-[#f97316]',
    currentWinner: { number: '19', name: 'Chivo', emoji: '🐐' },
    lastUpdated: '1:30 PM',
    history: [
      { hour: '8:30 AM', winner: { number: '95', name: 'Garza', emoji: '🦩' } },
      { hour: '9:30 AM', winner: { number: '92', name: 'Pato', emoji: '🦆' } },
      { hour: '10:30 AM', winner: { number: '97', name: 'Faisán', emoji: '🦚' } },
      { hour: '11:30 AM', winner: { number: '10', name: 'Tigre', emoji: '🐯' } },
      { hour: '12:30 PM', winner: { number: '43', name: 'Bisonte', emoji: '🦬' } },
      { hour: '1:30 PM', winner: { number: '19', name: 'Chivo', emoji: '🐐' } },
    ],
  },
  {
    id: 'selva-plus',
    name: 'SELVA PLUS',
    schedule: '1:15 PM',
    colorName: 'emerald',
    borderColor: 'border-[#10b981] shadow-[0_0_15px_rgba(16,185,129,0.3)]',
    textColor: 'text-[#10b981]',
    currentWinner: { number: '85', name: 'Hámster', emoji: '🐹' },
    lastUpdated: '1:15 PM',
    history: [
      { hour: '8:15 AM', winner: { number: '59', name: 'Lobo Marino', emoji: '🦭' } },
      { hour: '9:15 AM', winner: { number: '81', name: 'Antílope', emoji: '🦌' } },
      { hour: '10:15 AM', winner: { number: '11', name: 'Gato', emoji: '🐱' } },
      { hour: '11:15 AM', winner: { number: '02', name: 'Toro', emoji: '🐂' } },
      { hour: '12:15 PM', winner: { number: '28', name: 'Zamuro', emoji: '🦅' } },
      { hour: '1:15 PM', winner: { number: '85', name: 'Hámster', emoji: '🐹' } },
    ],
  },
  {
    id: 'loto-chaima',
    name: 'LOTO CHAIMA',
    schedule: '1:00 PM',
    colorName: 'red',
    borderColor: 'border-[#ef4444] shadow-[0_0_15px_rgba(239,68,68,0.3)]',
    textColor: 'text-[#ef4444]',
    currentWinner: { number: '16', name: 'Oso', emoji: '🐻' },
    lastUpdated: '1:00 PM',
    history: [
      { hour: '8:00 AM', winner: { number: '43', name: 'Búho', emoji: '🦉' } },
      { hour: '9:00 AM', winner: { number: '00', name: 'Delfín', emoji: '🐬' } },
      { hour: '10:00 AM', winner: { number: '54', name: 'Gaviota', emoji: '🕊️' } },
      { hour: '11:00 AM', winner: { number: '28', name: 'Zamuro', emoji: '🦅' } },
      { hour: '12:00 PM', winner: { number: '40', name: 'Nutria', emoji: '🦦' } },
      { hour: '1:00 PM', winner: { number: '16', name: 'Oso', emoji: '🐻' } },
    ],
  },
  {
    id: 'la-granjita',
    name: 'LA GRANJITA',
    schedule: '1:00 PM',
    colorName: 'yellow',
    borderColor: 'border-[#eab308] shadow-[0_0_15px_rgba(234,179,8,0.3)]',
    textColor: 'text-[#eab308]',
    currentWinner: { number: '33', name: 'Pescado', emoji: '🐟' },
    lastUpdated: '1:00 PM',
    history: [
      { hour: '8:00 AM', winner: { number: '05', name: 'León', emoji: '🦁' } },
      { hour: '9:00 AM', winner: { number: '28', name: 'Zamuro', emoji: '🦅' } },
      { hour: '10:00 AM', winner: { number: '34', name: 'Venado', emoji: '🦌' } },
      { hour: '11:00 AM', winner: { number: '14', name: 'Paloma', emoji: '🕊️' } },
      { hour: '12:00 PM', winner: { number: '0', name: 'Ballena', emoji: '🐋' } },
      { hour: '1:00 PM', winner: { number: '33', name: 'Pescado', emoji: '🐟' } },
    ],
  },
  {
    id: 'monje-millonario',
    name: 'MONJE MILLONARIO',
    schedule: '1:05 PM',
    colorName: 'purple',
    borderColor: 'border-[#a855f7] shadow-[0_0_15px_rgba(168,85,247,0.3)]',
    textColor: 'text-[#a855f7]',
    currentWinner: { number: '66', name: 'Lobo', emoji: '🐺' },
    lastUpdated: '1:05 PM',
    history: [
      { hour: '8:05 AM', winner: { number: '39', name: 'Lechuza', emoji: '🦉' } },
      { hour: '9:05 AM', winner: { number: '54', name: 'Cisne', emoji: '🦢' } },
      { hour: '10:05 AM', winner: { number: '70', name: 'Loro', emoji: '🦜' } },
      { hour: '11:05 AM', winner: { number: '40', name: 'Halcón', emoji: '🦅' } },
      { hour: '12:05 PM', winner: { number: '25', name: 'Gallina', emoji: '🐔' } },
      { hour: '1:05 PM', winner: { number: '66', name: 'Lobo', emoji: '🐺' } },
    ],
  },
  {
    id: 'lotto-activo-rd',
    name: 'LOTTO ACTIVO RD INTERNACIONAL',
    schedule: '12:30 PM',
    colorName: 'red',
    borderColor: 'border-[#ef4444] shadow-[0_0_15px_rgba(239,68,68,0.3)]',
    textColor: 'text-[#ef4444]',
    currentWinner: { number: '01', name: 'Carnero', emoji: '🐏' },
    lastUpdated: '12:30 PM',
    history: [
      { hour: '8:30 AM', winner: { number: '05', name: 'León', emoji: '🦁' } },
      { hour: '9:30 AM', winner: { number: '15', name: 'Zorro', emoji: '🦊' } },
      { hour: '10:30 AM', winner: { number: '17', name: 'Pavo', emoji: '🦃' } },
      { hour: '11:30 AM', winner: { number: '12', name: 'Caballo', emoji: '🐴' } },
      { hour: '12:30 PM', winner: { number: '01', name: 'Carnero', emoji: '🐏' } },
    ],
  },
];

export default function App() {
  // Configurable settings
  const [telefonoWhatsapp, setTelefonoWhatsapp] = useState<string>('584120000000');
  const [precioMensual, setPrecioMensual] = useState<string>('$6');
  const [precioTrimestral, setPrecioTrimestral] = useState<string>('$15');
  const [agencyBannerText, setAgencyBannerText] = useState<string>(
    'PAGOS AL INSTANTE POR PAGO MÓVIL · MULTIPLICA X30 TU JUGADA · CIERRE 5 MINUTOS ANTES DE CADA SORTEO'
  );
  const [agencyName, setAgencyName] = useState<string>('Agencia El Ganador');

  // Display mode in Showcase: Real Screen Image vs Live Voice Simulator
  const [showcaseMode, setShowcaseMode] = useState<'real' | 'simulator'>('real');
  const [isRealImageZoomed, setIsRealImageZoomed] = useState<boolean>(false);

  // Live TV Simulator state
  const [boards, setBoards] = useState<LotteryBoard[]>(REAL_BOARDS);
  const [selectedLotteryFilter, setSelectedLotteryFilter] = useState<string>('all');
  const [activeAlert, setActiveAlert] = useState<{
    lotteryName: string;
    winner: Animalito;
    schedule: string;
  } | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isTvFullscreen, setIsTvFullscreen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('01:00:25 PM');
  const [copiedHtml, setCopiedHtml] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const [selectedPlanModal, setSelectedPlanModal] = useState<{
    title: string;
    price: string;
    message: string;
  } | null>(null);

  const tvRef = useRef<HTMLDivElement>(null);

  // Live clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('es-VE', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // Broadcast chime
  const playNotificationChime = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.11);
        gain.gain.setValueAtTime(0.14, ctx.currentTime + idx * 0.11);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.11 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.11);
        osc.stop(ctx.currentTime + idx * 0.11 + 0.35);
      });
    } catch {
      // AudioContext restricted before first gesture
    }
  };

  // Voice announcement
  const announceWinnerByVoice = (lotteryName: string, winner: Animalito, schedule: string) => {
    playNotificationChime();
    setActiveAlert({ lotteryName, winner, schedule });

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = `Atención en la agencia. Nuevo resultado de ${lotteryName}. Ha salido el número ${winner.number}, ${winner.name}. Repito: en ${lotteryName}, número ${winner.number}, ${winner.name}. ¡Felicidades a los ganadores!`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.98;
      utterance.pitch = 1.02;

      const voices = window.speechSynthesis.getVoices();
      const spanishVoice = voices.find(
        (v) =>
          v.lang.startsWith('es-VE') ||
          v.lang.startsWith('es-MX') ||
          v.lang.startsWith('es-419') ||
          v.lang.startsWith('es')
      );
      if (spanishVoice) {
        utterance.voice = spanishVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 450);
    } else {
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 3500);
    }

    setTimeout(() => {
      setActiveAlert(null);
    }, 6500);
  };

  const simulateLiveDraw = (targetBoardId?: string) => {
    const randomAnimal =
      ANIMALITOS_CATALOG[Math.floor(Math.random() * ANIMALITOS_CATALOG.length)];
    const targetIndex = targetBoardId
      ? boards.findIndex((b) => b.id === targetBoardId)
      : Math.floor(Math.random() * boards.length);
    const chosenIndex = targetIndex >= 0 ? targetIndex : 0;
    const chosenBoard = boards[chosenIndex];

    const updatedBoards = boards.map((board, idx) => {
      if (idx !== chosenIndex) return board;
      return {
        ...board,
        currentWinner: randomAnimal,
        lastUpdated: 'Ahora mismo',
        history: [
          ...board.history.slice(1),
          { hour: '02:00 PM', winner: randomAnimal },
        ],
      };
    });

    setBoards(updatedBoards);
    announceWinnerByVoice(chosenBoard.name, randomAnimal, 'Sorteo en Vivo');
  };

  const toggleTvFullscreen = () => {
    if (!isTvFullscreen) {
      setIsTvFullscreen(true);
      if (tvRef.current && tvRef.current.requestFullscreen) {
        tvRef.current.requestFullscreen().catch(() => {});
      }
    } else {
      setIsTvFullscreen(false);
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  const cleanPhone = telefonoWhatsapp.replace(/[^0-9]/g, '') || '584120000000';
  const crearLinkWA = (mensaje: string) =>
    `https://wa.me/${cleanPhone}?text=${encodeURIComponent(mensaje)}`;

  const msjGeneral =
    'Hola, vi tu publicidad de Pizarra Animal Online. Tengo una agencia de lotería y quiero activar el sistema en mi local.';
  const msjPlanMensual = `Hola, me interesa activar la *Licencia Mensual (${precioMensual})* de Pizarra Animal Online para mi agencia. ¿Me pasas los datos de Pago Móvil?`;
  const msjPlanTrimestral = `Hola, me interesa activar el *Plan Trimestral (${precioTrimestral})* de Pizarra Animal Online para mi agencia. ¿Me pasas los datos de Pago Móvil?`;

  const handleCopyLink = (label: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(label);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const generateCustomHtmlSnippet = () => {
    return `<!-- Pizarra Animal Online (Estilo Neón Original de Pantalla) -->
<script>
  const TELEFONO_WHATSAPP = "${cleanPhone}";
  const PRECIO_MENSUAL    = "${precioMensual}";
  const PRECIO_TRIMESTRAL = "${precioTrimestral}";
</script>`;
  };

  const handleCopyHtmlConfig = () => {
    navigator.clipboard.writeText(generateCustomHtmlSnippet());
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2500);
  };

  const visibleBoards =
    selectedLotteryFilter === 'all'
      ? boards
      : boards.filter((b) => b.id === selectedLotteryFilter);

  return (
    <div className="min-h-screen bg-[#06090f] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-40 bg-[#070b14]/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-3.5 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark with circular badge icon */}
          <a
            href="#inicio"
            className="flex items-center gap-3 text-lg sm:text-xl font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 font-display group"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden border border-emerald-500/70 shadow-[0_0_12px_rgba(34,197,94,0.35)] shrink-0 bg-black">
              <img
                src={LOGO_URL}
                alt="Logo Pizarra Animal"
                className="w-full h-full object-cover scale-110"
              />
            </div>
            <span>
              Pizarra <span className="text-emerald-400">Animal</span>
            </span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-300">
            <a
              href="#pantalla-real"
              className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
            >
              Pantalla Real
            </a>
            <a
              href="#loterias"
              className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
            >
              8 Loterías
            </a>
            <a
              href="#beneficios"
              className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
            >
              Beneficios
            </a>
            <a
              href="#planes"
              className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
            >
              Planes
            </a>
            <a
              href="#configurador"
              className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
            >
              Configurar
            </a>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center shrink-0 gap-3">
            <a
              href={crearLinkWA(msjGeneral)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold text-emerald-400 hover:text-white border border-emerald-500/50 hover:border-emerald-400 rounded-lg transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Directo</span>
            </a>
            <button
              onClick={() => {
                setShowcaseMode('simulator');
                simulateLiveDraw();
              }}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-all shadow-[0_0_15px_rgba(52,211,153,0.4)] whitespace-nowrap shrink-0 cursor-pointer"
            >
              🔊 Cantar Sorteo
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main id="inicio" className="flex-1 max-w-[1240px] w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
        {/* Hero Section styled with the vibrant dark neon aesthetic */}
        <section className="relative rounded-3xl bg-gradient-to-b from-[#0d1424] via-[#090d18] to-[#06090f] border border-slate-800 p-6 sm:p-12 overflow-hidden shadow-2xl">
          {/* Ambient Glow Orbs */}
          <div className="absolute top-0 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 text-xs font-bold tracking-wide uppercase mb-6 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Sistema 100% Online para Agencias de Lotería</span>
            </div>

            {/* Main Headline */}
            <h1
              className="font-display font-extrabold text-white tracking-tight mb-5 leading-[1.12]"
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
                textWrap: 'balance',
              }}
            >
              Moderniza tu Agencia con{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-yellow-300 to-amber-400">
                Pizarra Animal
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              Muestra los resultados de animalitos en tiempo real en tus televisores o proyectores
              con el diseño exacto que tus clientes buscan: bordes neón de alta visibilidad,
              anuncios por voz automática e historial completo de jugadas.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
              <a
                href={crearLinkWA(msjGeneral)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-extrabold text-base px-7 py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(37,211,102,0.35)] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-slate-950" />
                <span>Activar Pizarra por WhatsApp</span>
              </a>

              <a
                href="https://pizarraanimal.ai.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-slate-800/90 hover:bg-slate-700 text-white border border-slate-700 hover:border-emerald-500 font-bold text-base px-7 py-3.5 rounded-xl transition-all whitespace-nowrap shrink-0"
              >
                <ExternalLink className="w-4 h-4 text-emerald-400" />
                <span>Entrar a pizarraanimal.ai.studio</span>
              </a>
            </div>

            <div className="flex items-center justify-center gap-4 text-xs text-slate-400 pt-2 font-medium">
              <span>✓ Activación inmediata</span>
              <span aria-hidden="true">·</span>
              <span>✓ Pago Móvil en Bs. a tasa BCV</span>
              <span aria-hidden="true">·</span>
              <span>✓ Compatible con cualquier Smart TV o TV Box</span>
            </div>
          </div>
        </section>

        {/* MARQUEE FEATURE: THE REAL SCREEN SHOWCASE */}
        <section id="pantalla-real" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                <Tv className="w-4 h-4 text-emerald-400" />
                <span>PANTALLA REAL EN VIVO</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                Así se ve Pizarra Animal en tu Televisor
              </h2>
            </div>

            {/* Mode Switcher: Real Image vs Live Audio Simulator */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
              <button
                onClick={() => setShowcaseMode('real')}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  showcaseMode === 'real'
                    ? 'bg-emerald-500 text-slate-950 shadow-[0_0_12px_rgba(34,197,94,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Foto Real de la Pantalla</span>
              </button>
              <button
                onClick={() => setShowcaseMode('simulator')}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  showcaseMode === 'simulator'
                    ? 'bg-emerald-500 text-slate-950 shadow-[0_0_12px_rgba(34,197,94,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Simulador de Voz Interactivo</span>
              </button>
            </div>
          </div>

          {/* Realistic Smart TV Display Bezel */}
          <div
            ref={tvRef}
            className={`${
              isTvFullscreen
                ? 'fixed inset-0 z-50 bg-black p-4 sm:p-6 flex flex-col justify-between overflow-y-auto'
                : 'relative bg-black rounded-3xl border-[8px] sm:border-[10px] border-[#1e293b] shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden'
            }`}
          >
            {/* Top Bezel Status Header */}
            <div className="bg-[#0b101c] px-4 sm:px-6 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="font-extrabold text-red-400 tracking-wide">EN VIVO</span>
                </div>
                <span className="text-slate-500">|</span>
                <span className="font-bold text-slate-200">
                  {agencyName.toUpperCase()} · 8 LOTERÍAS SIMULTÁNEAS
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-mono-tabular font-bold text-amber-400 bg-slate-900/90 px-2.5 py-1 rounded border border-slate-800">
                  {currentTime}
                </span>

                {showcaseMode === 'real' ? (
                  <button
                    onClick={() => setIsRealImageZoomed(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-md text-xs font-semibold cursor-pointer border border-slate-700"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Ampliar Imagen</span>
                  </button>
                ) : (
                  <button
                    onClick={toggleTvFullscreen}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-md text-xs font-semibold cursor-pointer border border-slate-700"
                  >
                    {isTvFullscreen ? (
                      <>
                        <Minimize2 className="w-3.5 h-3.5" />
                        <span>Salir de Pantalla Completa</span>
                      </>
                    ) : (
                      <>
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Pantalla Completa</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* TAB 1: Real Screen Image View */}
            {showcaseMode === 'real' && (
              <div className="relative group bg-black">
                <img
                  src={REAL_SCREEN_URL}
                  alt="Captura real de la pantalla Pizarra Animal con 8 loterías y bordes neón"
                  className="w-full h-auto block object-cover max-h-[700px] mx-auto select-none"
                />

                {/* Interactive Overlays on Real Image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      Captura directa del sistema funcionando en agencia: <strong>8 loterías con bordes neón diferenciados</strong> y cuadrícula horaria.
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setIsRealImageZoomed(true)}
                      className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg cursor-pointer"
                    >
                      Ver en Alta Resolución
                    </button>
                    <button
                      onClick={() => {
                        setShowcaseMode('simulator');
                        announceWinnerByVoice('Lotto Activo', { number: '20', name: 'Cochino', emoji: '🐷' }, '1:00 PM');
                      }}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold rounded-lg cursor-pointer border border-slate-700"
                    >
                      Probar Anuncio de Voz
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Live Simulator with Voice */}
            {showcaseMode === 'simulator' && (
              <div className="p-4 sm:p-6 bg-[#06090f] space-y-5">
                {/* Simulator Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0d1424] p-3 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-1.5 overflow-x-auto p-1">
                    <button
                      onClick={() => setSelectedLotteryFilter('all')}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                        selectedLotteryFilter === 'all'
                          ? 'bg-emerald-500 text-slate-950'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Todas (8)
                    </button>
                    {boards.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => setSelectedLotteryFilter(b.id)}
                        className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                          selectedLotteryFilter === b.id
                            ? 'bg-emerald-500 text-slate-950'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {b.name}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => simulateLiveDraw()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-lg text-xs font-bold cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Simular Sorteo en Vivo</span>
                    </button>
                    <button
                      onClick={() =>
                        announceWinnerByVoice(
                          boards[0].name,
                          boards[0].currentWinner,
                          boards[0].schedule
                        )
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-bold cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{isSpeaking ? 'Cantando...' : 'Escuchar Voz'}</span>
                    </button>
                  </div>
                </div>

                {/* Voice Announcement Banner when active */}
                {activeAlert && (
                  <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 border-2 border-emerald-400 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 animate-pulse">
                    <div className="flex items-center gap-3.5">
                      <div className="text-4xl">{activeAlert.winner.emoji}</div>
                      <div>
                        <div className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">
                          ¡NUEVO GANADOR CANTADO POR VOZ! · {activeAlert.lotteryName}
                        </div>
                        <div className="text-xl sm:text-2xl font-extrabold text-white font-display">
                          {activeAlert.winner.number} - {activeAlert.winner.name.toUpperCase()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-300 bg-amber-500/20 border border-amber-500/40 px-3 py-1.5 rounded-lg">
                      <Volume2 className="w-4 h-4 text-amber-400 animate-bounce" />
                      <span>Reproduciendo anuncio en parlantes</span>
                    </div>
                  </div>
                )}

                {/* 8-Lottery Neon Grid matching the real screen */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {visibleBoards.map((b) => (
                    <div
                      key={b.id}
                      onClick={() => announceWinnerByVoice(b.name, b.currentWinner, b.schedule)}
                      className={`bg-[#0a0f1d] rounded-2xl p-4 border-2 ${b.borderColor} transition-all hover:scale-[1.01] cursor-pointer group relative`}
                      title="Haz clic para cantar este resultado por voz"
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                        <div>
                          <div className={`text-xs font-black tracking-wider ${b.textColor}`}>
                            {b.name}
                          </div>
                          <div className="text-[10px] text-slate-400">En progreso</div>
                        </div>
                        <span className="text-[10px] text-emerald-400 opacity-60 group-hover:opacity-100 inline-flex items-center gap-1 font-semibold">
                          <Volume2 className="w-3 h-3" /> Cantar
                        </span>
                      </div>

                      {/* Main Winner Card */}
                      <div className="bg-[#060a14] rounded-xl p-3 border border-slate-800 mb-3 flex items-center justify-between">
                        <div className="text-3xl select-none">{b.currentWinner.emoji}</div>
                        <div className="text-right">
                          <div className="text-base sm:text-lg font-black text-white font-mono-tabular">
                            {b.currentWinner.number} - {b.currentWinner.name.toUpperCase()}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono-tabular">
                            {b.schedule}
                          </div>
                        </div>
                      </div>

                      {/* 4x2 Schedule History Grid */}
                      <div className="grid grid-cols-4 gap-1 text-center text-[10px] font-mono-tabular">
                        {b.history.map((h, i) => (
                          <div
                            key={i}
                            className="bg-[#080d1a] border border-slate-800/80 rounded py-1 px-0.5"
                          >
                            <div className="text-slate-500 text-[9px]">{h.hour}</div>
                            <div className="font-bold text-slate-200 font-mono-tabular">
                              {h.winner.number}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Rotating Agency Ticker */}
                <div className="bg-[#0b101d] border border-slate-800 rounded-xl px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 text-amber-400 font-bold shrink-0">
                    <Megaphone className="w-4 h-4 text-amber-400" />
                    <span>AVISO EN PANTALLA:</span>
                  </div>
                  <div className="text-slate-300 font-medium truncate max-w-full">
                    {agencyBannerText}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 8 LOTTERIES SUPPORTED SECTION */}
        <section id="loterias" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display mb-2">
              Todas las Loterías en una Sola Pantalla
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Identificación por colores neón para que los clientes reconozcan de inmediato cada sorteo
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-[#0a0f1d] border-2 border-[#22c55e] rounded-xl p-3.5 text-center shadow-[0_0_12px_rgba(34,197,94,0.25)]">
              <div className="text-xs font-black text-[#22c55e] mb-1">LOTTO ACTIVO</div>
              <div className="text-[11px] text-slate-400">Verde Neón · Cada hora</div>
            </div>
            <div className="bg-[#0a0f1d] border-2 border-[#22c55e] rounded-xl p-3.5 text-center shadow-[0_0_12px_rgba(34,197,94,0.25)]">
              <div className="text-xs font-black text-[#22c55e] mb-1">GUÁCHARO ACTIVO</div>
              <div className="text-[11px] text-slate-400">Verde Neón · Sorteos diarios</div>
            </div>
            <div className="bg-[#0a0f1d] border-2 border-[#f97316] rounded-xl p-3.5 text-center shadow-[0_0_12px_rgba(249,115,22,0.25)]">
              <div className="text-xs font-black text-[#f97316] mb-1">EL GUACHARITO</div>
              <div className="text-[11px] text-slate-400">Naranja Neón · Millonario</div>
            </div>
            <div className="bg-[#0a0f1d] border-2 border-[#10b981] rounded-xl p-3.5 text-center shadow-[0_0_12px_rgba(16,185,129,0.25)]">
              <div className="text-xs font-black text-[#10b981] mb-1">SELVA PLUS</div>
              <div className="text-[11px] text-slate-400">Esmeralda Neón · En vivo</div>
            </div>
            <div className="bg-[#0a0f1d] border-2 border-[#ef4444] rounded-xl p-3.5 text-center shadow-[0_0_12px_rgba(239,68,68,0.25)]">
              <div className="text-xs font-black text-[#ef4444] mb-1">LOTO CHAIMA</div>
              <div className="text-[11px] text-slate-400">Rojo Neón · Tradicional</div>
            </div>
            <div className="bg-[#0a0f1d] border-2 border-[#eab308] rounded-xl p-3.5 text-center shadow-[0_0_12px_rgba(234,179,8,0.25)]">
              <div className="text-xs font-black text-[#eab308] mb-1">LA GRANJITA</div>
              <div className="text-[11px] text-slate-400">Amarillo Neón · Clásico</div>
            </div>
            <div className="bg-[#0a0f1d] border-2 border-[#a855f7] rounded-xl p-3.5 text-center shadow-[0_0_12px_rgba(168,85,247,0.25)]">
              <div className="text-xs font-black text-[#a855f7] mb-1">MONJE MILLONARIO</div>
              <div className="text-[11px] text-slate-400">Púrpura Neón · Resultados</div>
            </div>
            <div className="bg-[#0a0f1d] border-2 border-[#ef4444] rounded-xl p-3.5 text-center shadow-[0_0_12px_rgba(239,68,68,0.25)]">
              <div className="text-xs font-black text-[#ef4444] mb-1">LOTTO RD INTERNACIONAL</div>
              <div className="text-[11px] text-slate-400">Rojo Carmesí · Extra</div>
            </div>
          </div>
        </section>

        {/* KEY BENEFITS */}
        <section id="beneficios" className="space-y-8 pt-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display mb-2">
              ¿Por qué cambiar la pizarra tradicional por Pizarra Animal?
            </h2>
            <p className="text-slate-400 text-base">
              Menos trabajo para tus taquilleros, más confianza y más jugadas en tu agencia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-[#0a0f1e] border border-slate-800 hover:border-emerald-500/60 p-6 rounded-2xl transition-all shadow-lg">
              <div className="text-xs font-mono-tabular text-emerald-400 font-bold mb-2">
                01. AUTOMATIZACIÓN TOTAL
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-display">
                ⚡ Resultados Automáticos sin Retrasos
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Olvídate de buscar en teléfonos o escribir números con marcadores borrosos.
                El sistema actualiza de inmediato cada sorteo y lo deja registrado en el historial.
              </p>
            </div>

            <div className="bg-[#0a0f1e] border border-slate-800 hover:border-amber-500/60 p-6 rounded-2xl transition-all shadow-lg">
              <div className="text-xs font-mono-tabular text-amber-400 font-bold mb-2">
                02. SISTEMA DE AUDIO
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-display">
                🔊 Anuncio por Voz que Atrae Clientes
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Cada vez que sale un ganador, la pizarra canta el número y animalito en voz alta.
                Todos en el local se enteran al instante y aumentan sus apuestas para el siguiente sorteo.
              </p>
            </div>

            <div className="bg-[#0a0f1e] border border-slate-800 hover:border-purple-500/60 p-6 rounded-2xl transition-all shadow-lg">
              <div className="text-xs font-mono-tabular text-purple-400 font-bold mb-2">
                03. CERO COMPLICACIONES
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-display">
                📺 Solo Necesitas Internet y un Navegador
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                No necesitas comprar equipos costosos. Funciona en cualquier Smart TV (Samsung, LG, Xiaomi, etc.),
                TV Box Android, Fire TV Stick o computadora.
              </p>
            </div>

            <div className="bg-[#0a0f1e] border border-slate-800 hover:border-orange-500/60 p-6 rounded-2xl transition-all shadow-lg">
              <div className="text-xs font-mono-tabular text-orange-400 font-bold mb-2">
                04. TU PROPIA MARCA
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-display">
                📢 Publicidad Rotativa de tu Banca
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Muestra el nombre de tu agencia, tus números de Pago Móvil, promociones especiales,
                reglas de cobro y horarios para que todos los jugadores los tengan a la vista.
              </p>
            </div>
          </div>
        </section>

        {/* PRICING & SUBSCRIPTION PLANS */}
        <section id="planes" className="space-y-8 pt-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display mb-2">
              Planes de Suscripción Accesibles
            </h2>
            <p className="text-slate-400 text-base">
              Recupera la inversión desde el primer día con más jugadas en tu local
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
            {/* Plan Mensual */}
            <div className="bg-[#0a0f1e] border border-slate-800 hover:border-emerald-500/60 rounded-2xl p-7 flex flex-col justify-between transition-all">
              <div>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2 font-display">
                    Licencia Mensual
                  </h3>
                  <div className="text-4xl font-extrabold text-emerald-400 font-mono-tabular mb-1">
                    {precioMensual}
                  </div>
                  <span className="text-xs text-slate-400">Por mes · 1 Pantalla activa</span>
                </div>

                <ul className="space-y-3 border-t border-slate-800 pt-5 mb-7 text-sm text-slate-300">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>8 Loterías en tiempo real</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Anuncios por voz automática</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Historial de sorteos del día</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Modo Pantalla Completa TV</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Soporte técnico directo</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <a
                  href={crearLinkWA(msjPlanMensual)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 px-4 rounded-xl text-center font-bold text-sm bg-slate-800 hover:bg-[#25D366] text-white hover:text-slate-950 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Activar Plan Mensual
                </a>
                <button
                  onClick={() =>
                    setSelectedPlanModal({
                      title: 'Licencia Mensual',
                      price: precioMensual,
                      message: msjPlanMensual,
                    })
                  }
                  className="block w-full py-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer text-center"
                >
                  Ver datos de Pago Móvil y mensaje
                </button>
              </div>
            </div>

            {/* Plan Trimestral (POPULAR) */}
            <div className="bg-gradient-to-b from-[#111f38] via-[#0a0f1e] to-[#0a0f1e] border-2 border-emerald-400 rounded-2xl p-7 flex flex-col justify-between relative shadow-[0_0_30px_rgba(34,197,94,0.2)]">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-yellow-400 text-slate-950 text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">
                ⭐ Más Elegido por Agencias
              </div>

              <div>
                <div className="text-center mb-6 pt-2">
                  <h3 className="text-xl font-bold text-white mb-2 font-display">
                    Plan Trimestral
                  </h3>
                  <div className="text-4xl font-extrabold text-yellow-300 font-mono-tabular mb-1">
                    {precioTrimestral}
                  </div>
                  <span className="text-xs text-slate-300">Por 3 meses (Ahorro en tu licencia)</span>
                </div>

                <ul className="space-y-3 border-t border-slate-800 pt-5 mb-7 text-sm text-slate-200">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <strong className="text-white">Todo lo del Plan Mensual</strong>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Cintillo publicitario de tu agencia</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Sin interrupciones por 90 días</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Prioridad en actualizaciones</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Soporte personalizado VIP</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <a
                  href={crearLinkWA(msjPlanTrimestral)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 px-4 rounded-xl text-center font-extrabold text-sm bg-emerald-400 hover:bg-[#25D366] text-slate-950 transition-colors whitespace-nowrap shadow-[0_0_15px_rgba(52,211,153,0.4)] cursor-pointer"
                >
                  Activar Plan Trimestral
                </a>
                <button
                  onClick={() =>
                    setSelectedPlanModal({
                      title: 'Plan Trimestral',
                      price: precioTrimestral,
                      message: msjPlanTrimestral,
                    })
                  }
                  className="block w-full py-1.5 text-xs text-slate-300 hover:text-emerald-300 transition-colors cursor-pointer text-center"
                >
                  Ver datos de Pago Móvil y mensaje
                </button>
              </div>
            </div>
          </div>

          {/* Payment Info Banner */}
          <div className="bg-[#0a0f1e] border-2 border-dashed border-emerald-500/50 rounded-2xl p-5 text-center text-sm text-slate-300 max-w-3xl mx-auto shadow-md">
            📲 <strong className="text-emerald-400">Activación Inmediata:</strong> Aceptamos{' '}
            <strong className="text-white">Pago Móvil (Bs. a tasa oficial BCV)</strong> y Transferencias Bancarias.
          </div>
        </section>

        {/* COMMERCIAL CONFIGURATOR & GOOGLE SITES CODE */}
        <section
          id="configurador"
          className="bg-[#0a0f1e] border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                <Settings className="w-3.5 h-3.5" />
                <span>Panel Comercial Personalizable</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                Configura tu WhatsApp y Precios
              </h3>
            </div>

            <button
              onClick={handleCopyHtmlConfig}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl transition-all cursor-pointer shadow-[0_0_15px_rgba(34,197,94,0.3)] whitespace-nowrap"
            >
              <Code2 className="w-4 h-4" />
              <span>
                {copiedHtml
                  ? '¡Configuración Copiada!'
                  : 'Copiar Script Configurado'}
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Teléfono WhatsApp (con 58)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={telefonoWhatsapp}
                  onChange={(e) => setTelefonoWhatsapp(e.target.value)}
                  placeholder="584120000000"
                  className="w-full pl-9 pr-3 py-2 bg-[#06090f] border border-slate-700 rounded-xl text-sm text-white font-mono-tabular focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Precio Plan Mensual
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={precioMensual}
                  onChange={(e) => setPrecioMensual(e.target.value)}
                  placeholder="$6"
                  className="w-full pl-9 pr-3 py-2 bg-[#06090f] border border-slate-700 rounded-xl text-sm text-white font-mono-tabular focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Precio Plan Trimestral
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={precioTrimestral}
                  onChange={(e) => setPrecioTrimestral(e.target.value)}
                  placeholder="$15"
                  className="w-full pl-9 pr-3 py-2 bg-[#06090f] border border-slate-700 rounded-xl text-sm text-white font-mono-tabular focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Nombre de la Agencia (Cabecera TV)
              </label>
              <input
                type="text"
                value={agencyName}
                onChange={(e) => setAgencyName(e.target.value)}
                className="w-full px-3 py-2 bg-[#06090f] border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Cintillo Publicitario Rotativo de la Agencia
              </label>
              <input
                type="text"
                value={agencyBannerText}
                onChange={(e) => setAgencyBannerText(e.target.value)}
                className="w-full px-3 py-2 bg-[#06090f] border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="bg-gradient-to-r from-emerald-950/80 via-[#0a0f1d] to-emerald-950/80 border border-emerald-500/40 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display mb-3">
              ¿Listo para modernizar tu agencia de lotería?
            </h2>
            <p className="text-slate-300 text-base mb-6">
              Empieza a mostrar los resultados en vivo hoy mismo con voz y colores neón.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={crearLinkWA(msjGeneral)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-extrabold text-base px-8 py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(37,211,102,0.4)] whitespace-nowrap cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-slate-950" />
                <span>Hablar con Ventas por WhatsApp</span>
              </a>

              <a
                href="https://pizarraanimal.ai.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-base px-7 py-3.5 rounded-xl transition-all border border-slate-700 whitespace-nowrap"
              >
                <span>Entrar a pizarraanimal.ai.studio ➔</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-[#070b14] py-8 text-xs text-slate-500">
        <div className="max-w-[1240px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full overflow-hidden border border-emerald-500/50">
              <img src={LOGO_URL} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span>Pizarra Animal Online · Sistema Digital para Agencias de Lotería</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://pizarraanimal.ai.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors"
            >
              pizarraanimal.ai.studio
            </a>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => handleCopyLink('footer', crearLinkWA(msjGeneral))}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              {copiedLink === 'footer' ? 'Enlace Copiado' : 'Copiar enlace WhatsApp'}
            </button>
          </div>
        </div>
      </footer>

      {/* FULLSCREEN ZOOM MODAL FOR THE REAL BOARD IMAGE */}
      {isRealImageZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6"
          onClick={() => setIsRealImageZoomed(false)}
        >
          <div className="w-full max-w-6xl flex items-center justify-between text-white pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Tv className="w-5 h-5 text-emerald-400" />
              <span className="font-extrabold text-sm sm:text-base">
                Foto Real de la Pantalla en Agencia (8 Loterías)
              </span>
            </div>
            <button
              onClick={() => setIsRealImageZoomed(false)}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold cursor-pointer"
            >
              ✕ Cerrar
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center p-2 max-w-6xl w-full">
            <img
              src={REAL_SCREEN_URL}
              alt="Foto real de la pantalla Pizarra Animal en alta resolución"
              className="max-h-[85vh] w-auto object-contain rounded-xl border border-slate-800 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="text-xs text-slate-400 text-center pb-2">
            Presiona Esc o haz clic fuera de la imagen para cerrar
          </div>
        </div>
      )}

      {/* PLAN ACTIVATION MODAL */}
      {selectedPlanModal && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedPlanModal(null)}
        >
          <div
            className="bg-[#0b101e] border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Solicitud de Activación
                </span>
                <h3 className="text-lg font-bold text-white font-display">
                  {selectedPlanModal.title} ({selectedPlanModal.price})
                </h3>
              </div>
              <button
                onClick={() => setSelectedPlanModal(null)}
                className="text-slate-400 hover:text-white text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-[#060912] border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300 space-y-1.5">
              <div className="text-slate-400">Mensaje predeterminado para WhatsApp:</div>
              <p className="text-white font-medium italic">“{selectedPlanModal.message}”</p>
            </div>

            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-3 text-xs text-emerald-300 space-y-1">
              <div className="font-bold text-emerald-200">Activación Rápida:</div>
              <div>• Aceptamos Pago Móvil (Bs. según tasa oficial BCV)</div>
              <div>• Transferencias Bancarias directas</div>
              <div>• Te enviamos el acceso de inmediato tras confirmar el pago</div>
            </div>

            <div className="flex gap-2 pt-2">
              <a
                href={crearLinkWA(selectedPlanModal.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold py-2.5 px-4 rounded-xl text-sm transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Abrir WhatsApp</span>
              </a>
              <button
                onClick={() => handleCopyLink('modal-msg', selectedPlanModal.message)}
                className="inline-flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-2.5 px-4 rounded-xl text-sm border border-slate-700 transition-colors cursor-pointer"
              >
                <Copy className="w-4 h-4" />
                <span>{copiedLink === 'modal-msg' ? '¡Copiado!' : 'Copiar'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
