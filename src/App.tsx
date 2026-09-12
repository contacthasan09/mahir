import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ElementType,
  type FormEvent,
} from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  MotionValue,
  motion as motionNS,
} from 'framer-motion';
import {
  Smartphone,
  Layers,
  Server,
  Palette,
  ArrowDown,
  ArrowUpRight,
  Mail,
  Send,
  Briefcase,
  Award,
  Users,
  Clock,
  Cloud,
  GitBranch,
  ExternalLink,
  X,
  Check,
  User,
  MessageSquare,
  Loader2,
} from 'lucide-react';

/* ================================================================
   CONFIG
================================================================ */
const AUTO_SCROLL_SPEED = 0.4;

/* ================================================================
   TYPES
================================================================ */
interface Project {
  number: string;
  name: string;
  category: 'Client' | 'Personal' | 'Open Source';
  year: string;
  role: string;
  tools: string[];
  col1img1: string;
  col1img2: string;
  col2img: string;
}

interface Service {
  number: string;
  name: string;
  description: string;
  icon: typeof Smartphone;
  highlights: string[];
  startingAt: string;
}

/* ================================================================
   DATA
================================================================ */
const MARQUEE_IMAGES = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

const HERO_STATS = [
  { value: '4+', label: 'Years' },
  { value: '32', label: 'Apps' },
  { value: '18', label: 'Clients' },
];

const ABOUT_STATS = [
  { icon: Award, value: '4+', label: 'Years of Experience' },
  { icon: Smartphone, value: '32+', label: 'Apps Delivered' },
  { icon: Users, value: '18+', label: 'Happy Clients' },
  { icon: Clock, value: '24h', label: 'Response Time' },
];

const TOOLS = [
  'Flutter', 'Dart', 'Firebase', 'Node.js',
  'TypeScript', 'React', 'Next.js', 'PostgreSQL',
  'MongoDB', 'AWS', 'Docker', 'GraphQL',
  'REST APIs', 'Git', 'Figma', 'Riverpod',
];

const SERVICES: Service[] = [
  {
    number: '01',
    name: 'Flutter App Development',
    description:
      'Pixel-perfect, high-performance mobile apps for iOS and Android from a single codebase — built with clean architecture, Riverpod/Bloc, and native integrations.',
    icon: Smartphone,
    highlights: ['iOS & Android', 'Riverpod / Bloc', 'CI/CD with Codemagic'],
    startingAt: '$2,500',
  },
  {
    number: '02',
    name: 'Full-Stack Web Development',
    description:
      'End-to-end web apps with modern frontends (React, Next.js) and scalable backends (Node.js, PostgreSQL, MongoDB) — deployed on AWS or Vercel.',
    icon: Layers,
    highlights: ['React / Next.js', 'Node.js · NestJS', 'PostgreSQL · MongoDB'],
    startingAt: '$3,200',
  },
  {
    number: '03',
    name: 'REST & GraphQL APIs',
    description:
      'Robust, well-documented APIs with authentication, rate limiting, caching, and clean schema design — ready to power mobile and web clients at scale.',
    icon: Server,
    highlights: ['REST design', 'GraphQL schemas', 'Auth · JWT · OAuth'],
    startingAt: '$1,800',
  },
  {
    number: '04',
    name: 'UI/UX & Design Systems',
    description:
      'Design systems and reusable component libraries that keep your product consistent across Flutter, React, and web — from tokens to docs.',
    icon: Palette,
    highlights: ['Figma → Code', 'Component libraries', 'Design tokens'],
    startingAt: '$1,500',
  },
  {
    number: '05',
    name: 'Cloud, DevOps & Deployment',
    description:
      'Containerized deployments, CI/CD pipelines, and cloud infrastructure so your team ships confidently — AWS, Docker, GitHub Actions, and Codemagic.',
    icon: Cloud,
    highlights: ['AWS · Vercel', 'Docker · CI/CD', 'Monitoring & logs'],
    startingAt: '$1,400',
  },
];

const PROJECTS: Project[] = [
  {
    number: '01',
    name: 'FitTrack Pro',
    category: 'Client',
    year: '2025',
    role: 'Flutter · Firebase · Stripe',
    tools: ['Flutter', 'Firebase', 'Stripe', 'Riverpod'],
    col1img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    col2img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
  },
  {
    number: '02',
    name: 'Aura Commerce',
    category: 'Personal',
    year: '2025',
    role: 'Next.js · Node · PostgreSQL',
    tools: ['Next.js', 'Node.js', 'PostgreSQL', 'Prisma'],
    col1img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    col1img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    col2img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
  },
  {
    number: '03',
    name: 'Solaris Dashboard',
    category: 'Client',
    year: '2024',
    role: 'React · GraphQL · AWS',
    tools: ['React', 'GraphQL', 'AWS', 'Docker'],
    col1img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    col1img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    col2img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
  },
];

/* ================================================================
   PREMIUM MOTION PRIMITIVES
================================================================ */
const EASE_SPRING = { type: 'spring', stiffness: 120, damping: 20, mass: 0.9 } as const;
const EASE_SOFT = [0.22, 1, 0.36, 1] as const;

/** Top scroll progress bar */
const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, mass: 0.4 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[200] origin-left"
    >
      <div
        className="h-full w-full"
        style={{
          background: 'linear-gradient(90deg, #B600A8 0%, #7621B0 50%, #BE4C00 100%)',
        }}
      />
    </motion.div>
  );
};

/** Floating blurred orb */
const FloatingOrb = ({
  className,
  color,
  duration = 12,
  delay = 0,
}: {
  className: string;
  color: string;
  duration?: number;
  delay?: number;
}) => (
  <motion.div
    className={`pointer-events-none absolute rounded-full blur-[100px] ${className}`}
    style={{ background: color }}
    animate={{
      x: [0, 30, -20, 0],
      y: [0, -25, 20, 0],
      scale: [1, 1.08, 0.95, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

/** Floating particle field for hero */
const HeroParticles = () => {
  const particles = Array.from({ length: 14 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-[1]">
      {particles.map((_, i) => {
        const size = 2 + (i % 4);
        const left = (i * 37) % 100;
        const top = (i * 53) % 100;
        const delay = (i % 5) * 0.7;
        const duration = 8 + (i % 6);
        return (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
              background:
                i % 3 === 0
                  ? 'rgba(182,0,168,0.75)'
                  : i % 3 === 1
                  ? 'rgba(118,33,176,0.70)'
                  : 'rgba(215,226,234,0.55)',
              boxShadow: '0 0 8px rgba(182,0,168,0.55)',
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, i % 2 === 0 ? 12 : -12, 0],
              opacity: [0.2, 0.9, 0.2],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </div>
  );
};

const MotionDiv = motionNS.div;
const MotionNav = motionNS.nav;

const FadeIn = ({
  children,
  delay = 0,
  duration = 0.8,
  x = 0,
  y = 40,
  className,
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  as?: ElementType;
}) => {
  const MotionTag = as === 'nav' ? MotionNav : MotionDiv;
  return (
    <MotionTag
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '60px', amount: 0 }}
      transition={{ duration, delay, ease: EASE_SOFT }}
      className={className}
    >
      {children}
    </MotionTag>
  );
};

/** Magnetic wrapper */
const MagneticWrap = ({
  children,
  strength = 14,
  className = '',
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ================================================================
   CONTACT MODAL
================================================================ */
interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setStatus('idle');
        setForm({ name: '', email: '', message: '' });
      }, 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        onClose();
      }, 2200);
    }, 1400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md"
          />

          <div className="fixed inset-0 z-[101] flex items-end sm:items-center justify-center pointer-events-none p-0 sm:p-4">
            <motion.div
              key="modal"
              initial={{ opacity: 0, y: 80, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.96 }}
              transition={EASE_SPRING}
              onClick={(e) => e.stopPropagation()}
              className="pointer-events-auto relative w-full sm:max-w-lg
                max-h-[92vh] sm:max-h-[90vh] overflow-y-auto
                rounded-t-[28px] sm:rounded-[28px]
                border border-[#D7E2EA]/15
                bg-[#0C0C0C] text-[#D7E2EA]
                shadow-[0_-10px_60px_-10px_rgba(182,0,168,0.35)] sm:shadow-[0_25px_80px_-20px_rgba(182,0,168,0.45)]"
              style={{
                backgroundImage:
                  'radial-gradient(120% 120% at 0% 0%, rgba(182,0,168,0.12), transparent 55%), radial-gradient(120% 120% at 100% 100%, rgba(190,76,0,0.10), transparent 55%)',
              }}
            >
              <div className="sm:hidden pt-3 flex justify-center">
                <div className="w-12 h-1 rounded-full bg-[#D7E2EA]/20" />
              </div>

              <div className="flex items-start justify-between gap-4 px-5 sm:px-7 pt-5 sm:pt-7 pb-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[0.55rem] sm:text-[0.65rem] uppercase tracking-[0.3em] text-[#D7E2EA]/50 font-light">
                    Start a project
                  </span>
                  <h3
                    className="hero-heading font-black uppercase leading-none tracking-tight"
                    style={{ fontSize: 'clamp(1.5rem, 5vw, 2.25rem)' }}
                  >
                    Hire Me
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="rounded-full border border-[#D7E2EA]/15 p-2 text-[#D7E2EA]/60 hover:text-[#D7E2EA] hover:border-[#D7E2EA]/40 transition-colors duration-200"
                >
                  <X className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-[#D7E2EA]/15 to-transparent mx-5 sm:mx-7" />

              <div className="px-5 sm:px-7 py-6">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col items-center justify-center text-center gap-4 py-10"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{
                          background:
                            'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                          boxShadow:
                            '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                        }}
                      >
                        <Check className="w-7 h-7 text-white" strokeWidth={3} />
                      </motion.div>
                      <h4 className="font-black uppercase tracking-tight text-xl sm:text-2xl">
                        Message sent!
                      </h4>
                      <p className="text-[#D7E2EA]/60 font-light text-sm max-w-xs">
                        Thanks {form.name || 'there'} — I&apos;ll get back to you within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col gap-4"
                    >
                      <motion.div
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 }}
                        className="flex flex-col gap-1.5"
                      >
                        <label className="text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.25em] text-[#D7E2EA]/50 font-light">
                          Your Name
                        </label>
                        <div className="relative">
                          <User
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D7E2EA]/40"
                            strokeWidth={1.5}
                          />
                          <input
                            required
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Jane Doe"
                            className="w-full rounded-xl border border-[#D7E2EA]/15 bg-[#D7E2EA]/[0.03] pl-10 pr-4 py-3 text-sm text-[#D7E2EA] placeholder-[#D7E2EA]/30 font-light outline-none focus:border-[#B600A8]/60 focus:bg-[#D7E2EA]/[0.05] transition-colors duration-200"
                          />
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.16 }}
                        className="flex flex-col gap-1.5"
                      >
                        <label className="text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.25em] text-[#D7E2EA]/50 font-light">
                          Email
                        </label>
                        <div className="relative">
                          <Mail
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D7E2EA]/40"
                            strokeWidth={1.5}
                          />
                          <input
                            required
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="you@company.com"
                            className="w-full rounded-xl border border-[#D7E2EA]/15 bg-[#D7E2EA]/[0.03] pl-10 pr-4 py-3 text-sm text-[#D7E2EA] placeholder-[#D7E2EA]/30 font-light outline-none focus:border-[#B600A8]/60 focus:bg-[#D7E2EA]/[0.05] transition-colors duration-200"
                          />
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.24 }}
                        className="flex flex-col gap-1.5"
                      >
                        <label className="text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.25em] text-[#D7E2EA]/50 font-light">
                          Project Details
                        </label>
                        <div className="relative">
                          <MessageSquare
                            className="absolute left-3.5 top-3.5 w-4 h-4 text-[#D7E2EA]/40"
                            strokeWidth={1.5}
                          />
                          <textarea
                            required
                            rows={4}
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            placeholder="Tell me about your project, timeline, and budget..."
                            className="w-full rounded-xl border border-[#D7E2EA]/15 bg-[#D7E2EA]/[0.03] pl-10 pr-4 py-3 text-sm text-[#D7E2EA] placeholder-[#D7E2EA]/30 font-light outline-none focus:border-[#B600A8]/60 focus:bg-[#D7E2EA]/[0.05] transition-colors duration-200 resize-none"
                          />
                        </div>
                      </motion.div>

                      <motion.button
                        type="submit"
                        disabled={status === 'sending'}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.32 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-2 rounded-full text-white font-medium uppercase tracking-widest
                          px-8 py-3.5 text-xs sm:text-sm
                          transition-opacity duration-200 hover:opacity-90
                          inline-flex items-center justify-center gap-2
                          disabled:opacity-70 disabled:cursor-wait"
                        style={{
                          background:
                            'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                          boxShadow:
                            '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                          outline: '2px solid #FFFFFF',
                          outlineOffset: '-3px',
                        }}
                      >
                        {status === 'sending' ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2} />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" strokeWidth={1.8} />
                            Send Message
                          </>
                        )}
                      </motion.button>

                      <p className="text-center text-[0.6rem] sm:text-[0.65rem] text-[#D7E2EA]/40 font-light mt-1">
                        Or email directly at{' '}
                        <a
                          href="mailto:mahir.hasan.dev@gmail.com"
                          className="text-[#D7E2EA]/70 hover:text-[#D7E2EA] underline decoration-dotted underline-offset-2"
                        >
                          mahir.hasan.dev@gmail.com
                        </a>
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

/* ================================================================
   HIRE ME BUTTON
================================================================ */
const ContactButton = ({
  className = '',
  label = 'Hire Me',
  onClick,
}: {
  className?: string;
  label?: string;
  onClick: () => void;
}) => (
  <MagneticWrap strength={14}>
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`relative overflow-hidden rounded-full text-white font-medium uppercase tracking-widest
        px-5 py-2.5 sm:px-7 sm:py-3 md:px-8 md:py-3
        text-[0.7rem] sm:text-xs md:text-sm
        whitespace-nowrap inline-flex items-center justify-center ${className}`}
      style={{
        background:
          'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow:
          '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
        outline: '2px solid #FFFFFF',
        outlineOffset: '-3px',
      }}
    >
      <motion.span
        className="absolute inset-0 pointer-events-none"
        initial={{ x: '-120%' }}
        whileHover={{ x: '120%' }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        style={{
          background:
            'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)',
        }}
      />
      <span className="relative z-10">{label}</span>
    </motion.button>
  </MagneticWrap>
);

const LiveProjectButton = ({ label = 'View Project' }: { label?: string }) => (
  <a
    href="#"
    className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA]
      font-medium uppercase tracking-widest whitespace-nowrap
      px-4 py-2 sm:px-6 sm:py-2.5 text-[0.65rem] sm:text-sm
      hover:bg-[#D7E2EA]/10 transition-colors duration-200
      inline-flex items-center justify-center"
  >
    {label}
  </a>
);

/* ================================================================
   MAGNET (portrait mouse-follow)
================================================================ */
const Magnet = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
}: {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const maxDist = Math.max(rect.width, rect.height) / 2 + padding;
      if (dist < maxDist) {
        el.style.transition = activeTransition;
        el.style.transform = `translate3d(${dx / strength}px, ${dy / strength}px, 0)`;
      } else {
        el.style.transition = inactiveTransition;
        el.style.transform = 'translate3d(0, 0, 0)';
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [padding, strength, activeTransition, inactiveTransition]);

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  );
};

/* ================================================================
   ANIMATED TEXT — fixed spacing
================================================================ */
const Char = ({
  char,
  progress,
  range,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative inline-block whitespace-pre">
      <span className="invisible whitespace-pre">{char}</span>
      <motion.span
        style={{ opacity }}
        className="absolute left-0 top-0 whitespace-pre"
      >
        {char}
      </motion.span>
    </span>
  );
};

const AnimatedText = ({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.3'],
  });
  const chars = text.split('');
  return (
    <p ref={ref} className={`relative whitespace-pre-wrap ${className}`}>
      {chars.map((char, i) => (
        <Char
          key={i}
          char={char}
          progress={scrollYProgress}
          range={[i / chars.length, (i + 1) / chars.length]}
        />
      ))}
    </p>
  );
};

const Corner = ({
  src,
  className,
  delay,
  x = 0,
}: {
  src: string;
  className: string;
  delay: number;
  x?: number;
}) => (
  <FadeIn
    delay={delay}
    duration={0.9}
    x={x}
    y={0}
    className={`absolute ${className} pointer-events-none z-[1] opacity-60 sm:opacity-100`}
  >
    <img src={src} alt="" loading="lazy" className="w-full h-auto block" />
  </FadeIn>
);

/* ================================================================
   SECTIONS
================================================================ */

/** ---------- HERO ---------- */
const HeroSection = ({ onHireClick }: { onHireClick: () => void }) => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const heroTitle = "Hi, i\u2019m Mahir";

  return (
    <section
      ref={heroRef}
      className="relative min-h-[auto] sm:min-h-screen sm:h-screen flex flex-col overflow-x-clip bg-[#0C0C0C] pb-4 sm:pb-0"
    >
      {/* Floating orbs backdrop */}
      <FloatingOrb
        className="w-[300px] h-[300px] -top-20 -left-20 sm:w-[500px] sm:h-[500px]"
        color="radial-gradient(circle, rgba(182,0,168,0.35) 0%, transparent 70%)"
        duration={14}
      />
      <FloatingOrb
        className="w-[260px] h-[260px] top-1/2 -right-20 sm:w-[420px] sm:h-[420px]"
        color="radial-gradient(circle, rgba(118,33,176,0.30) 0%, transparent 70%)"
        duration={18}
        delay={2}
      />

      {/* Floating particles */}
      <HeroParticles />

      <FadeIn as="nav" delay={0} y={-20}>
        <div className="relative z-10 flex justify-between items-center px-4 sm:px-6 md:px-10 pt-5 sm:pt-6 md:pt-8 text-[#D7E2EA] font-medium uppercase tracking-wider text-[0.65rem] sm:text-sm md:text-base">
          <a href="#about" className="hover:opacity-70 transition-opacity duration-200">About</a>
          <a href="#price" className="hover:opacity-70 transition-opacity duration-200">Services</a>
          <a href="#projects" className="hover:opacity-70 transition-opacity duration-200">Projects</a>
          <a href="#contact" className="hover:opacity-70 transition-opacity duration-200">Contact</a>
        </div>
      </FadeIn>

      {/* Hero heading — letter-flip animation */}
      <motion.div
        className="relative z-10 overflow-hidden mt-6 sm:mt-8 md:mt-10 px-4 sm:px-6 md:px-10"
        style={{ opacity: headingOpacity, perspective: 800 }}
      >
        <h1
          className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center"
          style={{ fontSize: 'clamp(2.25rem, 9vw, 7rem)' }}
        >
          {heroTitle.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: 80, opacity: 0, rotateX: -60 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{
                delay: 0.2 + i * 0.035,
                type: 'spring',
                stiffness: 130,
                damping: 16,
                mass: 0.8,
              }}
              className="inline-block whitespace-pre"
              style={{ transformOrigin: 'bottom' }}
            >
              {char}
            </motion.span>
          ))}
        </h1>
      </motion.div>

      {/* Shimmer line under heading */}
      <motion.div
        aria-hidden
        className="relative z-10 mx-auto mt-3 sm:mt-4 h-px w-[60%] sm:w-[40%] md:w-[35%]"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.9, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'center' }}
      >
        <motion.div
          className="h-full w-full"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, #B600A8 25%, #BBCCD7 50%, #7621B0 75%, transparent 100%)',
            backgroundSize: '200% 100%',
          }}
          animate={{ backgroundPosition: ['200% 0%', '-200% 0%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      {/* Rotating gradient ring behind portrait */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 z-[9]
          top-[42%] sm:top-auto sm:bottom-[8%]
          w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] lg:w-[440px] lg:h-[440px] xl:w-[500px] xl:h-[500px]
          rounded-full opacity-40 sm:opacity-60"
        style={{
          background:
            'conic-gradient(from 0deg, #B600A8, #7621B0, #BE4C00, #18011F, #B600A8)',
          filter: 'blur(60px)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* Portrait */}
      <motion.div
        style={{ y: portraitY, scale: portraitScale }}
        className="relative sm:absolute sm:left-1/2 sm:-translate-x-1/2 z-10
          mt-2 sm:mt-0 mx-auto
          sm:top-auto sm:-translate-y-0 sm:bottom-0
          w-[160px] sm:w-[220px] md:w-[280px] lg:w-[330px] xl:w-[380px]
          pointer-events-none sm:pointer-events-auto"
      >
        <FadeIn delay={0.6} y={30}>
          <Magnet padding={150} strength={3}>
            <motion.img
              src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
              alt="Mahir Hasan — Flutter & Full-Stack Engineer"
              className="w-full h-auto block select-none"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </Magnet>
        </FadeIn>
      </motion.div>

      {/* Bottom bar */}
      <div className="relative z-20 flex flex-col gap-4 sm:gap-0 sm:flex-row sm:justify-between sm:items-end sm:mt-auto pb-4 sm:pb-7 md:pb-8 px-4 sm:px-6 md:px-10 mt-6 sm:mt-0 mb-6 sm:mb-0">
        <FadeIn delay={0.35} y={20} className="max-w-full sm:max-w-[260px] md:max-w-[320px]">
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug mb-3 sm:mb-4"
            style={{ fontSize: 'clamp(0.65rem, 1vw, 1rem)' }}
          >
            a Flutter &amp; full-stack engineer crafting fast, elegant mobile apps and scalable web platforms
          </p>
          <div className="flex gap-4 sm:gap-6">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span
                  className="text-[#D7E2EA] font-black leading-none"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.5rem)' }}
                >
                  {stat.value}
                </span>
                <span className="text-[#D7E2EA]/50 font-light uppercase tracking-widest text-[0.5rem] sm:text-[0.6rem] mt-0.5">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.5} y={20} className="flex items-center gap-4">
          <ContactButton onClick={onHireClick} />
        </FadeIn>
      </div>

      {/* Scroll cue */}
      <FadeIn
        delay={1.1}
        y={10}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-[#D7E2EA]/40 z-20"
      >
        <span className="text-[0.55rem] uppercase tracking-[0.3em]">Scroll</span>
        <ArrowDown className="w-3 h-3 animate-bounce" />
      </FadeIn>
    </section>
  );
};

/** ---------- MARQUEE ---------- */
const MarqueeSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const autoOffsetRef = useRef(0);
  const scrollOffsetRef = useRef(0);
  const pausedRef = useRef({ row1: false, row2: false });
  const [isMobile, setIsMobile] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;
    if (!section || !row1 || !row2) return;

    // Pause auto-scroll while lightbox is open
    const shouldPause = openIndex !== null;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const baseSpeed = isMobile ? 0.7 : AUTO_SCROLL_SPEED;
    const speed = shouldPause ? 0 : reduceMotion ? baseSpeed * 0.4 : baseSpeed;

    let rafId = 0;
    const getSetWidth = (el: HTMLDivElement) => el.scrollWidth / 3 || 1;

    const tick = () => {
      if (!pausedRef.current.row1) autoOffsetRef.current += speed;
      if (!pausedRef.current.row2) autoOffsetRef.current += speed;

      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const pageOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      scrollOffsetRef.current = pageOffset;

      const setWidth1 = getSetWidth(row1);
      const setWidth2 = getSetWidth(row2);

      const staggerOffset = isMobile ? -80 : 0;

      let x1 = scrollOffsetRef.current - 200 + autoOffsetRef.current;
      x1 = ((x1 % setWidth1) + setWidth1) % setWidth1;

      let x2 = -(scrollOffsetRef.current - 200 + autoOffsetRef.current) + staggerOffset;
      x2 = ((x2 % setWidth2) + setWidth2) % setWidth2;

      row1.style.transform = `translate3d(${x1 - setWidth1}px, 0, 0) rotateX(4deg)`;
      row2.style.transform = `translate3d(${x2 - setWidth2}px, 0, 0) rotateX(-4deg)`;

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const r1Enter = () => (pausedRef.current.row1 = true);
    const r1Leave = () => (pausedRef.current.row1 = false);
    const r2Enter = () => (pausedRef.current.row2 = true);
    const r2Leave = () => (pausedRef.current.row2 = false);

    row1.addEventListener('mouseenter', r1Enter);
    row1.addEventListener('mouseleave', r1Leave);
    row2.addEventListener('mouseenter', r2Enter);
    row2.addEventListener('mouseleave', r2Leave);

    return () => {
      cancelAnimationFrame(rafId);
      row1.removeEventListener('mouseenter', r1Enter);
      row1.removeEventListener('mouseleave', r1Leave);
      row2.removeEventListener('mouseenter', r2Enter);
      row2.removeEventListener('mouseleave', r2Leave);
    };
  }, [isMobile, openIndex]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null);
      if (e.key === 'ArrowRight')
        setOpenIndex((i) => (i === null ? null : (i + 1) % MARQUEE_IMAGES.length));
      if (e.key === 'ArrowLeft')
        setOpenIndex((i) =>
          i === null ? null : (i - 1 + MARQUEE_IMAGES.length) % MARQUEE_IMAGES.length
        );
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openIndex]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    if (openIndex !== null) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [openIndex]);

  const midpoint = Math.ceil(MARQUEE_IMAGES.length / 2);
  const row1Images = MARQUEE_IMAGES.slice(0, midpoint);
  const row2Images = MARQUEE_IMAGES.slice(midpoint);

  // Global index helper so tiles across both rows point to the right MARQUEE_IMAGES entry
  const getGlobalIndex = (row: 'row1' | 'row2', i: number) => {
    const setLength = row === 'row1' ? row1Images.length : row2Images.length;
    const setIndex = i % setLength;
    return row === 'row1' ? setIndex : midpoint + setIndex;
  };

  const Tile = ({
    src,
    globalIndex,
  }: {
    src: string;
    globalIndex: number;
  }) => (
    <motion.button
      type="button"
      onClick={() => setOpenIndex(globalIndex)}
      whileHover={{ scale: 1.04, zIndex: 5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group relative flex-shrink-0
        w-[180px] h-[117px]
        sm:w-[240px] sm:h-[156px]
        md:w-[320px] md:h-[208px]
        lg:w-[400px] lg:h-[257px]
        overflow-hidden rounded-xl sm:rounded-2xl
        border border-[#D7E2EA]/10 hover:border-[#D7E2EA]/40
        cursor-pointer transition-colors duration-300"
      aria-label="View project"
    >
      <img
        src={src}
        loading="lazy"
        alt=""
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {/* Zoom icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="rounded-full border-2 border-white/80 bg-black/40 backdrop-blur-sm p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>
      </div>
    </motion.button>
  );

  return (
    <>
      <section
        ref={sectionRef}
        className="relative bg-[#0C0C0C] pt-10 sm:pt-20 md:pt-28 pb-8 overflow-x-clip"
      >
        {/* Label — hero-heading gradient */}
        <FadeIn delay={0} y={20} className="px-4 sm:px-6 md:px-10 mb-4 sm:mb-8 md:mb-10">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="hero-heading font-semibold uppercase tracking-[0.3em] text-[0.65rem] sm:text-sm whitespace-nowrap">
              Recent Work
            </span>
            <span className="flex-1 h-px bg-gradient-to-r from-[#BBCCD7]/60 via-[#BBCCD7]/20 to-transparent" />
            <span className="hero-heading font-semibold tracking-widest text-[0.65rem] sm:text-sm whitespace-nowrap">
              2023 — 2026
            </span>
          </div>
        </FadeIn>

        {/* Aurora glow */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/3 h-[400px] z-[1] opacity-30 blur-[120px]"
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background:
              'linear-gradient(90deg, rgba(182,0,168,0.4), rgba(118,33,176,0.3), rgba(190,76,0,0.35))',
            backgroundSize: '200% 200%',
          }}
        />

        {/* Top fade */}
        <div className="pointer-events-none absolute top-10 sm:top-20 left-0 right-0 h-12 sm:h-24 bg-gradient-to-b from-[#0C0C0C] via-[#0C0C0C]/80 to-transparent z-[2]" />
        {/* Bottom fade (mobile) */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0C0C0C] to-transparent z-[2] sm:hidden" />

        {/* 3D-tilt wrapper */}
        <div className="relative z-[2]" style={{ perspective: 1200 }}>
          <div
            ref={row1Ref}
            className="flex gap-3 will-change-transform"
            style={{ transform: 'translate3d(0,0,0) rotateX(4deg)' }}
          >
            {[...row1Images, ...row1Images, ...row1Images].map((src, i) => (
              <Tile
                key={`r1-${i}`}
                src={src}
                globalIndex={getGlobalIndex('row1', i)}
              />
            ))}
          </div>

          <div
            ref={row2Ref}
            className="flex gap-3 will-change-transform mt-3"
            style={{ transform: 'translate3d(0,0,0) rotateX(-4deg)' }}
          >
            {[...row2Images, ...row2Images, ...row2Images].map((src, i) => (
              <Tile
                key={`r2-${i}`}
                src={src}
                globalIndex={getGlobalIndex('row2', i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-8"
            style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }}
            onClick={() => setOpenIndex(null)}
          >
       

            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 250, damping: 22 }}
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex(null);
              }}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[160]
                rounded-full border border-white/25 bg-white/5 backdrop-blur-md
                p-2.5 sm:p-3 text-white
                hover:bg-white/15 hover:border-white/50 transition-all duration-200"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 sm:w-5 sm:h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </motion.button>

            {/* Prev */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.2 }}
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex((i) =>
                  i === null ? null : (i - 1 + MARQUEE_IMAGES.length) % MARQUEE_IMAGES.length
                );
              }}
              className="absolute left-2 sm:left-6 z-[160]
                rounded-full border border-white/25 bg-white/5 backdrop-blur-md
                p-3 sm:p-4 text-white
                hover:bg-white/15 hover:border-white/50 transition-all duration-200
                hidden sm:flex items-center justify-center"
              aria-label="Previous"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </motion.button>

            {/* Next */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.2 }}
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex((i) => (i === null ? null : (i + 1) % MARQUEE_IMAGES.length));
              }}
              className="absolute right-2 sm:right-6 z-[160]
                rounded-full border border-white/25 bg-white/5 backdrop-blur-md
                p-3 sm:p-4 text-white
                hover:bg-white/15 hover:border-white/50 transition-all duration-200
                hidden sm:flex items-center justify-center"
              aria-label="Next"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </motion.button>

            {/* Image card — zoom-in */}
            <motion.div
              key={`img-${openIndex}`}
              initial={{ opacity: 0, scale: 0.7, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: 'spring', stiffness: 220, damping: 26, mass: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-[92vw] max-h-[82vh] sm:max-h-[80vh] z-[155]"
            >
              <div
                className="rounded-2xl sm:rounded-3xl overflow-hidden
                  border-2 border-white/20
                  shadow-[0_25px_100px_-20px_rgba(182,0,168,0.55)]"
                style={{ background: '#0C0C0C' }}
              >
                <img
                  src={MARQUEE_IMAGES[openIndex]}
                  alt="Recent work preview"
                  className="block w-auto h-auto max-w-[92vw] max-h-[78vh] sm:max-h-[76vh] object-contain"
                />
              </div>

              {/* Counter */}
              <div
                className="absolute -bottom-10 left-1/2 -translate-x-1/2
                  text-white/70 text-xs sm:text-sm font-light tracking-widest uppercase"
              >
                {String(openIndex + 1).padStart(2, '0')} / {String(MARQUEE_IMAGES.length).padStart(2, '0')}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/** ---------- ABOUT ---------- */
const AboutSection = ({ onHireClick }: { onHireClick: () => void }) => {
  const text =
    "I'm Mahir Hasan, a Flutter & full-stack software engineer with 4+ years of experience building mobile apps and web platforms. I care deeply about clean architecture, great DX, and shipping products users actually love. Let's build something great together!";

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 py-16 sm:py-20 text-center overflow-x-clip"
    >
      <Corner
        src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
        className="top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[60px] sm:w-[100px] md:w-[130px]"
        delay={0.1}
        x={-80}
      />
      <Corner
        src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
        className="bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[50px] sm:w-[90px] md:w-[120px]"
        delay={0.25}
        x={-80}
      />
      <Corner
        src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
        className="top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[60px] sm:w-[100px] md:w-[130px]"
        delay={0.15}
        x={80}
      />
      <Corner
        src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
        className="bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[70px] sm:w-[110px] md:w-[140px]"
        delay={0.3}
        x={80}
      />

      <div className="relative z-[2] flex flex-col items-center gap-5 sm:gap-8 md:gap-10 max-w-4xl w-full">
        <FadeIn delay={0} y={20}>
          <span className="text-[#D7E2EA]/40 font-light uppercase tracking-[0.3em] text-[0.55rem] sm:text-xs">
            About · Mahir Hasan
          </span>
        </FadeIn>

        <FadeIn delay={0.05} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(1.75rem, 8vw, 96px)' }}
          >
            About me
          </h2>
        </FadeIn>

        <AnimatedText
          text={text}
          className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px] px-2"
        />

        <FadeIn delay={0.15} y={20}>
          <p className="text-[#D7E2EA]/60 font-light italic text-xs sm:text-base max-w-[420px]">
            &ldquo;Ship fast. Ship clean. Then ship again.&rdquo;
          </p>
        </FadeIn>

        <FadeIn delay={0.2} y={30} className="w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mt-2">
            {ABOUT_STATS.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1.5 rounded-2xl border border-[#D7E2EA]/10 bg-[#D7E2EA]/[0.03] px-2 sm:px-3 py-3 sm:py-4 hover:border-[#D7E2EA]/25 transition-colors duration-300"
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#BBCCD7]" strokeWidth={1.5} />
                <span className="text-[#D7E2EA] font-black text-base sm:text-xl leading-none">{value}</span>
                <span className="text-[#D7E2EA]/50 font-light uppercase tracking-widest text-[0.5rem] sm:text-[0.6rem] text-center leading-tight">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.25} y={30} className="w-full mt-2">
          <span className="text-[#D7E2EA]/40 font-light uppercase tracking-[0.3em] text-[0.55rem] sm:text-[0.65rem] block mb-3">
            Tech Stack
          </span>
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
            {TOOLS.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-[#D7E2EA]/15 bg-[#D7E2EA]/[0.03] px-2.5 sm:px-3 py-1 text-[0.6rem] sm:text-xs text-[#D7E2EA]/70 font-light hover:border-[#D7E2EA]/40 hover:text-[#D7E2EA] transition-colors duration-200"
              >
                {tool}
              </span>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.3} y={20} className="mt-2 sm:mt-4">
          <ContactButton onClick={onHireClick} label="Let's Work Together" />
        </FadeIn>
      </div>
    </section>
  );
};

/** ---------- SERVICES ---------- */
const ServicesSection = () => (
  <section
    id="price"
    className="bg-white rounded-t-[32px] sm:rounded-t-[50px] md:rounded-t-[60px] px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-24"
  >
    <FadeIn delay={0} y={20} className="text-center mb-3 sm:mb-4">
      <span className="text-[#0C0C0C]/40 font-light uppercase tracking-[0.3em] text-[0.55rem] sm:text-xs">
        What I Offer
      </span>
    </FadeIn>

    <h2
      className="text-[#0C0C0C] font-black uppercase text-center leading-none mb-3 sm:mb-4"
      style={{ fontSize: 'clamp(1.75rem, 8vw, 96px)' }}
    >
      Services
    </h2>

    <FadeIn delay={0.1} y={20} className="text-center mb-8 sm:mb-12 md:mb-16">
      <p className="text-[#0C0C0C]/50 font-light max-w-xl mx-auto text-xs sm:text-base px-2">
        End-to-end engineering — from mobile apps to cloud backends and polished web frontends.
      </p>
    </FadeIn>

    <div className="max-w-3xl mx-auto flex flex-col">
      {SERVICES.map((s, i) => {
        const Icon = s.icon;
        return (
          <FadeIn key={s.number} delay={i * 0.08} y={30}>
            <div className="group flex items-start gap-3 sm:gap-4 md:gap-6 border-b border-[rgba(12,12,12,0.15)] py-5 sm:py-6 md:py-8 first:border-t first:border-[rgba(12,12,12,0.15)] transition-colors duration-300 hover:bg-[#0C0C0C]/[0.015]">
              <div
                className="font-black text-[#0C0C0C] leading-none flex-shrink-0"
                style={{ fontSize: 'clamp(1.25rem, 4.5vw, 48px)' }}
              >
                {s.number}
              </div>

              <div className="flex-shrink-0 rounded-lg sm:rounded-xl border border-[#0C0C0C]/10 bg-[#0C0C0C]/[0.03] p-1.5 sm:p-2 mt-0.5 sm:mt-1 group-hover:border-[#0C0C0C]/30 transition-colors duration-300">
                <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#0C0C0C]" strokeWidth={1.5} />
              </div>

              <div className="flex flex-col gap-1.5 sm:gap-2 flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                  <div
                    className="font-medium uppercase text-[#0C0C0C] leading-tight"
                    style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.35rem)' }}
                  >
                    {s.name}
                  </div>
                  <span className="text-[0.55rem] sm:text-[0.7rem] uppercase tracking-widest text-[#0C0C0C]/40 font-light">
                    From {s.startingAt}
                  </span>
                </div>

                <p
                  className="font-light leading-relaxed max-w-xl opacity-60 text-[#0C0C0C]"
                  style={{ fontSize: 'clamp(0.75rem, 1.1vw, 1rem)' }}
                >
                  {s.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-0.5 sm:mt-1">
                  {s.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-[0.55rem] sm:text-[0.65rem] uppercase tracking-widest text-[#0C0C0C]/50 font-light border border-[#0C0C0C]/10 rounded-full px-2 sm:px-2.5 py-0.5"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <ArrowUpRight
                className="hidden sm:block w-4 h-4 text-[#0C0C0C]/30 group-hover:text-[#0C0C0C] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0 mt-1"
                strokeWidth={1.5}
              />
            </div>
          </FadeIn>
        );
      })}
    </div>
  </section>
);

/** ---------- PROJECT CARD ---------- */
const ProjectCard = ({
  project,
  index,
  totalCards,
  scrollYProgress,
}: {
  project: Project;
  index: number;
  totalCards: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const rangeStart = index / totalCards;
  const rangeEnd = (index + 1) / totalCards;
  const scale = useTransform(scrollYProgress, [rangeStart, rangeEnd], [1, targetScale]);

  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const sRotX = useSpring(rotateX, { stiffness: 180, damping: 20 });
  const sRotY = useSpring(rotateY, { stiffness: 180, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 6);
    rotateX.set(-py * 6);
  };

  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div className="h-[85vh] sm:h-[80vh] sticky top-16 sm:top-20 md:top-28 flex items-start justify-center">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          scale,
          top: `${index * 24}px`,
          rotateX: sRotX,
          rotateY: sRotY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full rounded-[24px] sm:rounded-[40px] md:rounded-[50px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-3 sm:p-5 md:p-6 origin-top"
      >
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-5 mb-3 sm:mb-4 md:mb-6">
          <span
            className="font-black leading-none text-[#D7E2EA] flex-shrink-0"
            style={{ fontSize: 'clamp(1.5rem, 5vw, 56px)' }}
          >
            {project.number}
          </span>
          <div className="flex flex-col gap-0.5 flex-1 min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="text-[0.55rem] sm:text-[0.65rem] uppercase tracking-widest text-[#D7E2EA]/60">
                {project.category}
              </span>
              <span className="text-[#D7E2EA]/20">·</span>
              <span className="text-[0.55rem] sm:text-[0.65rem] uppercase tracking-widest text-[#D7E2EA]/60">
                {project.year}
              </span>
            </div>
            <h3 className="text-sm sm:text-base md:text-xl uppercase tracking-wide text-[#D7E2EA] font-medium truncate">
              {project.name}
            </h3>
            <span className="text-[0.55rem] sm:text-[0.6rem] uppercase tracking-widest text-[#D7E2EA]/40 font-light truncate">
              {project.role}
            </span>
          </div>
          <div className="w-full sm:w-auto sm:ml-auto mt-1 sm:mt-0">
            <LiveProjectButton />
          </div>
        </div>

        <div className="flex gap-2 sm:gap-3 md:gap-4">
          <div className="w-[40%] flex flex-col gap-2 sm:gap-3 md:gap-4">
            <div
              className="group relative overflow-hidden rounded-[20px] sm:rounded-[40px] md:rounded-[50px]"
              style={{ height: 'clamp(70px, 12vw, 170px)' }}
            >
              <img
                src={project.col1img1}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div
              className="group relative overflow-hidden rounded-[20px] sm:rounded-[40px] md:rounded-[50px]"
              style={{ height: 'clamp(90px, 16vw, 240px)' }}
            >
              <img
                src={project.col1img2}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
          <div className="w-[60%] group relative overflow-hidden rounded-[20px] sm:rounded-[40px] md:rounded-[50px]">
            <img
              src={project.col2img}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
              <span className="text-white font-light text-[0.6rem] sm:text-xs uppercase tracking-widest">
                View Case Study
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-3 sm:mt-4 md:mt-5">
          {project.tools.map((tool) => (
            <span
              key={tool}
              className="text-[0.55rem] sm:text-[0.65rem] uppercase tracking-widest text-[#D7E2EA]/60 font-light border border-[#D7E2EA]/15 rounded-full px-2 sm:px-2.5 py-0.5"
            >
              {tool}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

/** ---------- PROJECTS ---------- */
const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] rounded-t-[32px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-8 sm:-mt-12 md:-mt-14 relative z-10 px-4 sm:px-6 md:px-10 py-12 sm:py-20 md:py-24"
    >
      <FadeIn delay={0} y={20} className="text-center mb-3 sm:mb-4">
        <span className="text-[#D7E2EA]/40 font-light uppercase tracking-[0.3em] text-[0.55rem] sm:text-xs">
          Portfolio · Selected Cases
        </span>
      </FadeIn>

      <h2
        className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-3 sm:mb-4"
        style={{ fontSize: 'clamp(1.75rem, 8vw, 96px)' }}
      >
        Projects
      </h2>

      <FadeIn delay={0.1} y={20} className="text-center mb-8 sm:mb-14 md:mb-16">
        <p className="text-[#D7E2EA]/50 font-light max-w-xl mx-auto text-xs sm:text-base px-2">
          A curated selection of mobile apps, web platforms, and open-source work I&apos;ve shipped.
        </p>
      </FadeIn>

      <div ref={containerRef} className="max-w-4xl mx-auto relative">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            totalCards={PROJECTS.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

      <FadeIn delay={0.15} y={20} className="text-center mt-10 sm:mt-20">
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-[#D7E2EA] font-light uppercase tracking-widest text-[0.65rem] sm:text-sm hover:text-white transition-colors duration-200 group"
        >
          View All Projects
          <ArrowUpRight
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300"
            strokeWidth={1.5}
          />
        </a>
      </FadeIn>
    </section>
  );
};

/* ================================================================
   FOOTER
================================================================ */
const Footer = ({ onHireClick }: { onHireClick: () => void }) => (
  <footer
    id="contact"
    className="bg-[#0C0C0C] border-t border-[#D7E2EA]/10 px-4 sm:px-6 md:px-10 py-10 sm:py-12 md:py-16"
  >
    <div className="max-w-5xl mx-auto flex flex-col gap-8 sm:gap-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 sm:gap-6">
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <span className="text-[#D7E2EA]/40 font-light uppercase tracking-[0.3em] text-[0.55rem] sm:text-xs">
            Let&apos;s work together
          </span>
          <h3
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(1.5rem, 5vw, 56px)' }}
          >
            Get in touch
          </h3>
        </div>
        <ContactButton onClick={onHireClick} label="Email Me" />
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap gap-5 sm:gap-10 pt-5 sm:pt-6 border-t border-[#D7E2EA]/10">
        <div className="flex flex-col gap-1">
          <span className="text-[#D7E2EA]/40 font-light uppercase tracking-widest text-[0.55rem] sm:text-[0.6rem]">
            Email
          </span>
          <a
            href="mailto:mahir.hasan.dev@gmail.com"
            className="text-[#D7E2EA] font-light text-xs sm:text-base hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5 break-all"
          >
            <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" strokeWidth={1.5} />
            mahir.hasan.dev@gmail.com
          </a>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[#D7E2EA]/40 font-light uppercase tracking-widest text-[0.55rem] sm:text-[0.6rem]">
            Based in
          </span>
          <span className="text-[#D7E2EA] font-light text-xs sm:text-base">
            Dhaka, Bangladesh · Remote
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[#D7E2EA]/40 font-light uppercase tracking-widest text-[0.55rem] sm:text-[0.6rem]">
            Availability
          </span>
          <span className="text-[#D7E2EA] font-light text-xs sm:text-base inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
            Open for projects
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-5 sm:pt-6 border-t border-[#D7E2EA]/10">
        <span className="text-[#D7E2EA]/40 font-light text-[0.65rem] sm:text-xs">
          © 2026 Mahir Hasan — Flutter &amp; Full-Stack Engineer.
        </span>
        <div className="flex items-center gap-2 sm:gap-3">
          {[
            { icon: GitBranch, label: 'GitHub', href: 'https://github.com' },
            { icon: Briefcase, label: 'LinkedIn', href: 'https://linkedin.com' },
            { icon: Send, label: 'Twitter / X', href: 'https://twitter.com' },
            { icon: ExternalLink, label: 'Portfolio', href: 'https://example.com' },
          ].map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="rounded-full border border-[#D7E2EA]/15 p-1.5 sm:p-2 text-[#D7E2EA]/60 hover:text-[#D7E2EA] hover:border-[#D7E2EA]/40 transition-colors duration-200"
            >
              <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

/* ================================================================
   APP
================================================================ */
export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const openContact = () => setIsContactOpen(true);
  const closeContact = () => setIsContactOpen(false);

  return (
    <main className="main-wrapper">
      <ScrollProgressBar />
      <HeroSection onHireClick={openContact} />
      <MarqueeSection />
      <AboutSection onHireClick={openContact} />
      <ServicesSection />
      <ProjectsSection />
      <Footer onHireClick={openContact} />

      <ContactModal isOpen={isContactOpen} onClose={closeContact} />
    </main>
  );
}