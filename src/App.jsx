import { useEffect, useRef, useState } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Clock3,
  Eye,
  Heart,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  X,
} from 'lucide-react';
import { getAuraReply } from './aura.js';

const clinicPhone = '+48856610107';
const clinicAddress = 'ul. Wincentego Witosa 36 lok. 108, 15-660 Białystok';

const faqItems = [
  {
    question: 'Jak umówić lub przełożyć wizytę?',
    answer:
      'Rejestracja i zmiana terminu odbywają się telefonicznie. Zadzwoń pod numer 85 661 01 07. Strona nie ma dostępu do kalendarza placówki i nie potwierdza rezerwacji online.',
  },
  {
    question: 'Czy poradnia przyjmuje w ramach NFZ i jakie są zasady płatności?',
    answer:
      'Szczegóły dotyczące finansowania, skierowań i ewentualnych opłat nie są potwierdzone w dostępnych danych. Aktualne zasady uzyskasz w rejestracji pod numerem 85 661 01 07.',
  },
  {
    question: 'Czy placówka ma parking i jak do niej dojechać?',
    answer:
      'Poradnia znajduje się przy ul. Wincentego Witosa 36 lok. 108 w Białymstoku. Nie mamy potwierdzonych informacji o parkingu. Zadzwoń do rejestracji, aby zapytać o dojazd i dostępność miejsc.',
  },
  {
    question: 'Jak przygotować się do badania?',
    answer:
      'Przygotowanie zależy od rodzaju badania. Nie udzielamy indywidualnych zaleceń przez stronę — zapytaj rejestrację, czy przed Twoją wizytą potrzebne są szczególne przygotowania.',
  },
  {
    question: 'Czy można uzyskać receptę lub teleporadę?',
    answer:
      'Nie mamy potwierdzonych informacji o teleporadach ani zasadach wystawiania lub przekazywania recept. Skontaktuj się bezpośrednio z personelem poradni.',
  },
];

function IconMark({ className = '' }) {
  return (
    <span className={`icon-mark ${className}`} aria-hidden="true">
      <Eye size={21} strokeWidth={1.7} />
      <span />
    </span>
  );
}

function Header({ onBook }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-30 border-b border-[#e7e5df] bg-[#f9f8f6]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <a className="brand group" href="#start" aria-label="Oko-Med — strona główna">
          <IconMark />
          <span>
            oko<span className="brand-accent">-med</span>
          </span>
        </a>
        <button
          className="mobile-menu-button rounded-full border border-[#dcded6] p-2 text-[#2c302e]"
          type="button"
          aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={`${menuOpen ? 'mobile-nav-open' : 'mobile-nav-closed'} nav-links`} aria-label="Nawigacja główna">
          <a onClick={closeMenu} href="#podejscie">Nasze podejście</a>
          <a onClick={closeMenu} href="#poradnie">Poradnie</a>
          <a onClick={closeMenu} href="#zespol">Zespół</a>
          <a onClick={closeMenu} href="#informacje">Informacje</a>
          <a onClick={closeMenu} href="#faq">FAQ</a>
          <button className="nav-mobile-cta" type="button" onClick={() => { closeMenu(); onBook(); }}>
            Zapytaj o wizytę <ArrowRight size={15} />
          </button>
        </nav>
        <button className="button button-dark desktop-nav-cta" type="button" onClick={onBook}>
          Zapytaj o wizytę <ArrowRight size={15} />
        </button>
      </div>
    </header>
  );
}

function Hero({ onBook }) {
  return (
    <section className="hero-section" id="start">
      <div className="hero-layout mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_.95fr] lg:gap-20 lg:px-12 lg:py-24">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> OKULISTYKA · BIAŁYSTOK</div>
          <h1>Więcej uważności.<br /><em>Lepsze widzenie.</em></h1>
          <p className="hero-lead">
            Spokojna rozmowa i opieka okulistyczna dla dorosłych oraz dzieci. Znajdź nas na
            białostockim Słonecznym Stoku.
          </p>
          <div className="hero-actions">
            <button className="button button-sage" type="button" onClick={onBook}>
              <CalendarDays size={16} /> Zapytaj o termin
            </button>
            <a className="text-link" href={`tel:${clinicPhone}`}>
              <Phone size={15} /> 85 661 01 07
            </a>
          </div>
          <div className="hero-footnote">
            <ShieldCheck size={17} strokeWidth={1.6} />
            <span>Poradnia okulistyczna dla dorosłych i dzieci</span>
          </div>
        </div>
        <div className="hero-art" aria-label="Ilustracja inspirowana spokojem i troską o wzrok">
          <div className="hero-art-note">
            <span className="note-icon"><Sparkles size={16} /></span>
            <span>Uważna opieka<br /><strong>zaczyna się od rozmowy</strong></span>
          </div>
          <div className="hero-art-circle">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-eye"><Eye size={102} strokeWidth={0.85} /></div>
            <span className="art-dot dot-one" />
            <span className="art-dot dot-two" />
            <span className="art-dot dot-three" />
            <span className="art-label">OKO-MED · BIAŁYSTOK</span>
          </div>
          <div className="hero-art-address">
            <MapPin size={16} />
            <span>ul. Witosa 36 / 108<br /><strong>Białystok</strong></span>
            <ArrowDownRight className="ml-auto" size={18} />
          </div>
          <span className="hero-art-caption">Opieka okulistyczna, która widzi człowieka.</span>
        </div>
      </div>
      <div className="hero-bottom-line" />
    </section>
  );
}

function TrustBar() {
  const trustItems = [
    { icon: Eye, label: 'Okulistyka' },
    { icon: Heart, label: 'Dorośli i dzieci' },
    { icon: MapPin, label: 'Białystok · Słoneczny Stok' },
    { icon: Clock3, label: 'Pn–Pt · 07:30–18:00*' },
  ];

  return (
    <div className="trust-bar">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-5 py-7 sm:px-8 md:grid-cols-4 lg:px-12">
        {trustItems.map(({ icon: Icon, label }) => (
          <div className="trust-item" key={label}>
            <Icon size={17} strokeWidth={1.6} />
            <span>{label}</span>
          </div>
        ))}
      </div>
      <p className="mx-auto max-w-7xl px-5 pb-4 text-[11px] text-[#777a72] sm:px-8 lg:px-12">
        *Godziny podawane w publicznym katalogu. Zadzwoń, aby potwierdzić aktualną dostępność.
      </p>
    </div>
  );
}

function SectionHeading({ eyebrow, title, description, centered = false }) {
  return (
    <div className={`section-heading ${centered ? 'text-center' : ''}`}>
      {eyebrow && <div className="eyebrow"><span className="eyebrow-line" /> {eyebrow}</div>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function Approach() {
  return (
    <section className="section-pad" id="podejscie">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-24 lg:px-12">
        <SectionHeading eyebrow="Nasze podejście" title={<>Dobre pytania.<br /><em>Spokojna rozmowa.</em></>} />
        <div className="approach-content">
          <p className="approach-large">
            Zdrowie wzroku zasługuje na czas, uwagę i jasne informacje.
          </p>
          <p>
            Oko-Med to centrum okulistyczne w Białymstoku. W publicznych katalogach placówka
            wymieniana jest jako poradnia okulistyczna dla osób dorosłych i dzieci. Szczegóły
            badań, terminów i organizacji wizyty najlepiej potwierdzić bezpośrednio w rejestracji.
          </p>
          <a className="text-link mt-6" href="#informacje">Poznaj najważniejsze informacje <ArrowRight size={15} /></a>
        </div>
      </div>
    </section>
  );
}

function Specialties({ onBook }) {
  const pathways = [
    {
      icon: Eye,
      index: '01',
      title: 'Poradnia okulistyczna',
      subtitle: 'Dorośli',
      text: 'Informacje o konsultacjach okulistycznych i dostępnych terminach uzyskasz w rejestracji.',
      tone: 'sage',
    },
    {
      icon: Heart,
      index: '02',
      title: 'Poradnia okulistyczna',
      subtitle: 'Dzieci',
      text: 'Katalog placówki wymienia również poradnię okulistyczną dla dzieci. Zapytaj o szczegóły wizyty.',
      tone: 'cream',
    },
    {
      icon: MessageCircle,
      index: '03',
      title: 'Przed wizytą',
      subtitle: 'Informacje i przygotowanie',
      text: 'Zakres badań, przygotowanie i wymagane dokumenty potwierdź telefonicznie przed wizytą.',
      tone: 'lilac',
    },
  ];

  return (
    <section className="section-pad section-tint" id="poradnie">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Zakres opieki"
          title={<>Opieka okulistyczna,<br /><em>po ludzku.</em></>}
          description="Wybierz temat, który chcesz omówić z rejestracją. Lista odzwierciedla informacje dostępne w publicznych katalogach."
        />
        <div className="pathway-grid">
          {pathways.map(({ icon: Icon, index, title, subtitle, text, tone }) => (
            <article className={`pathway-card pathway-${tone}`} key={index}>
              <div className="pathway-top">
                <span className="pathway-icon"><Icon size={20} strokeWidth={1.6} /></span>
                <span className="pathway-index">{index}</span>
              </div>
              <div className="pathway-label">{subtitle}</div>
              <h3>{title}</h3>
              <p>{text}</p>
              <button className="pathway-link" type="button" onClick={onBook}>
                Zapytaj o wizytę <ArrowRight size={15} />
              </button>
            </article>
          ))}
          <aside className="pathway-aside">
            <span className="pathway-aside-icon"><Clock3 size={19} /></span>
            <div>
              <span className="pathway-label">Rejestracja telefoniczna</span>
              <a href={`tel:${clinicPhone}`}>85 661 01 07</a>
              <p>Terminy i dostępność potwierdza rejestracja.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Team({ onTeam }) {
  return (
    <section className="section-pad" id="zespol">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-24 lg:px-12">
        <div className="team-art">
          <div className="team-art-inner">
            <div className="team-art-eye"><Eye size={74} strokeWidth={0.9} /></div>
            <span>OKO-MED</span>
            <p>Wzrok. Uważność. Rozmowa.</p>
          </div>
          <div className="team-art-stamp"><Stethoscope size={20} /><span>Centrum<br />okulistyczne</span></div>
        </div>
        <div>
          <SectionHeading
            eyebrow="Poznaj placówkę"
            title={<>Za troską o wzrok<br /><em>stoi człowiek.</em></>}
            description="Szczegółowe profile lekarzy, kwalifikacje, numery PWZ i grafiki nie są opublikowane w dostępnych źródłach. Rejestracja udzieli aktualnych informacji o personelu i dostępnych konsultacjach."
          />
          <button className="button button-dark mt-8" type="button" onClick={onTeam}>
            Zapytaj o lekarzy i terminy <ArrowRight size={15} />
          </button>
          <p className="data-note"><ShieldCheck size={16} /> Nie publikujemy niepotwierdzonych danych lekarzy ani terminów.</p>
        </div>
      </div>
    </section>
  );
}

function Information({ onBook }) {
  return (
    <section className="section-pad section-dark" id="informacje">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-24 lg:px-12">
        <div>
          <div className="eyebrow eyebrow-light"><span className="eyebrow-line" /> INFORMACJE PRAKTYCZNE</div>
          <h2 className="dark-heading">Wszystko zaczyna się<br /><em>od dobrego kontaktu.</em></h2>
          <p className="dark-description">
            Zadzwoń do rejestracji, aby potwierdzić szczegóły wizyty, dostępność terminów i
            aktualne zasady przyjęć.
          </p>
          <button className="button button-light mt-7" type="button" onClick={onBook}>
            <Phone size={16} /> Skontaktuj się z rejestracją
          </button>
        </div>
        <div className="info-panel">
          <div className="info-row">
            <span className="info-icon"><MapPin size={18} /></span>
            <div><span className="info-label">Adres</span><p>{clinicAddress}</p></div>
            <a className="info-arrow" href="https://www.google.com/maps/search/?api=1&query=ul.+Wincentego+Witosa+36%2F108%2C+15-660+Bia%C5%82ystok" target="_blank" rel="noreferrer" aria-label="Otwórz mapę"><ArrowRight size={17} /></a>
          </div>
          <div className="info-row">
            <span className="info-icon"><Phone size={18} /></span>
            <div><span className="info-label">Telefon do rejestracji</span><p><a href={`tel:${clinicPhone}`}>85 661 01 07</a></p></div>
            <a className="info-arrow" href={`tel:${clinicPhone}`} aria-label="Zadzwoń"><ArrowRight size={17} /></a>
          </div>
          <div className="info-row">
            <span className="info-icon"><Clock3 size={18} /></span>
            <div><span className="info-label">Godziny podawane w katalogu</span><p>Poniedziałek–piątek · 07:30–18:00</p></div>
          </div>
          <p className="info-disclaimer">Godziny mogą ulec zmianie. Przed przyjazdem potwierdź je telefonicznie.</p>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="section-pad" id="faq">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-24 lg:px-12">
        <SectionHeading
          eyebrow="Masz pytanie?"
          title={<>Proste odpowiedzi.<br /><em>Bez domysłów.</em></>}
          description="Jeśli nie znajdziesz tu informacji, zadzwoń do rejestracji. Niektóre kwestie wymagają potwierdzenia przez personel."
        />
        <div className="faq-list">
          {faqItems.map(({ question, answer }) => (
            <details className="faq-item" key={question}>
              <summary>{question}<ChevronDown size={18} /></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Sources() {
  return (
    <div className="sources">
      <span>Informacje z publicznych katalogów:</span>
      <a href="https://www.kliniki.pl/nzoz-centrum-okulistyczne-oko-med/" target="_blank" rel="noreferrer">Kliniki.pl</a>
      <a href="https://swiatprzychodni.pl/osrodki/nzoz-centrum-okulistyczne-oko-med-lekarzy-bialystok/" target="_blank" rel="noreferrer">Świat Przychodni</a>
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
        <div className="footer-main">
          <a className="brand footer-brand" href="#start"><IconMark /><span>oko<span className="brand-accent">-med</span></span></a>
          <p>Centrum Okulistyczne Oko-Med<br />Białystok · Słoneczny Stok</p>
          <a href={`tel:${clinicPhone}`}>Rejestracja: 85 661 01 07</a>
          <a href="https://www.google.com/maps/search/?api=1&query=ul.+Wincentego+Witosa+36%2F108%2C+15-660+Bia%C5%82ystok" target="_blank" rel="noreferrer">Wskazówki dojazdu <ArrowRight size={14} /></a>
        </div>
        <Sources />
        <div className="footer-bottom">
          <span>Przykładowa strona informacyjna. Nie zastępuje konsultacji z personelem poradni.</span>
          <span>W nagłym zagrożeniu zdrowia lub życia dzwoń pod 112 lub 999.</span>
        </div>
      </div>
    </footer>
  );
}

function BookingModal({ onClose }) {
  const [careType, setCareType] = useState('clinic');
  const [date, setDate] = useState('');
  const [period, setPeriod] = useState('morning');
  const dialogRef = useRef(null);
  const today = new Date();
  const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    dialogRef.current?.focus();
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title" tabIndex="-1" ref={dialogRef}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="Zamknij"><X size={20} /></button>
        <span className="modal-kicker"><CalendarDays size={15} /> REJESTRACJA</span>
        <h2 id="booking-title">Porozmawiajmy<br /><em>o dogodnym terminie.</em></h2>
        <p className="modal-intro">Wybierz preferencje, a następnie zadzwoń do rejestracji. To nie jest rezerwacja — aktualne terminy potwierdza personel.</p>
        <div className="care-toggle" role="group" aria-label="Rodzaj konsultacji">
          <button className={careType === 'clinic' ? 'selected' : ''} type="button" onClick={() => setCareType('clinic')}>Wizyta w poradni</button>
          <button className={careType === 'remote' ? 'selected' : ''} type="button" onClick={() => setCareType('remote')}>Teleporada*</button>
        </div>
        {careType === 'remote' && <p className="modal-caveat">Dostępność teleporad nie jest potwierdzona. Zapytaj o nią w rejestracji.</p>}
        <label className="field-label" htmlFor="visit-type">Poradnia</label>
        <select id="visit-type" className="modal-field" defaultValue="adult">
          <option value="adult">Okulistyczna dla dorosłych</option>
          <option value="child">Okulistyczna dla dzieci</option>
        </select>
        <div className="modal-fields-row">
          <div>
            <label className="field-label" htmlFor="preferred-date">Preferowany dzień</label>
            <input id="preferred-date" className="modal-field" type="date" min={minDate} value={date} onChange={(event) => setDate(event.target.value)} />
          </div>
          <div>
            <label className="field-label" htmlFor="preferred-period">Pora dnia</label>
            <select id="preferred-period" className="modal-field" value={period} onChange={(event) => setPeriod(event.target.value)}>
              <option value="morning">Rano</option>
              <option value="afternoon">Po południu</option>
            </select>
          </div>
        </div>
        <p className="preference-summary" aria-live="polite">
          Preferencja: {date ? `${date.slice(8, 10)}.${date.slice(5, 7)}.${date.slice(0, 4)}` : 'wybierz dzień'} · {period === 'morning' ? 'rano' : 'po południu'}. To nie jest rezerwacja.
        </p>
        <div className="modal-notice"><ShieldCheck size={16} /><span>Nie zapisujemy tych preferencji i nie wysyłamy ich. Nie podawaj tu danych osobowych ani medycznych.</span></div>
        <a className="button button-sage modal-call" href={`tel:${clinicPhone}`}>
          <Phone size={16} /> Zadzwoń: 85 661 01 07 <ArrowRight size={15} />
        </a>
        <p className="modal-footnote">*Teleporadę i dostępność terminu potwierdź telefonicznie.</p>
      </section>
    </div>
  );
}

function AuraChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: 'Dzień dobry! Jestem Aurą, automatyczną asystentką Oko-Med. Pomogę w ogólnych sprawach organizacyjnych. Nie wpisuj tu danych osobowych ani informacji o zdrowiu.',
      type: 'assistant',
    },
  ]);
  const [stopped, setStopped] = useState(false);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  function submitQuestion(event) {
    event.preventDefault();
    if (stopped) return;
    const form = event.currentTarget;
    const input = inputRef.current;
    const question = input?.value.trim();
    if (!question) return;
    input.value = '';
    const answer = getAuraReply(question);
    setMessages((items) => [...items, answer]);
    if (answer.emergency) {
      setStopped(true);
    }
    form.reset();
  }

  return (
    <div className="aura-widget">
      {open && (
        <section className="aura-panel" aria-label="Czat z Aurą">
          <div className="aura-header">
            <div className="aura-avatar"><Eye size={17} /></div>
            <div><strong>Aura</strong><span>Asystentka Oko-Med · automatyczna</span></div>
            <button type="button" className="aura-close" onClick={() => setOpen(false)} aria-label="Zamknij czat"><X size={18} /></button>
          </div>
          <div className="aura-human-link"><a href={`tel:${clinicPhone}`}><Phone size={14} /> Połącz z rejestracją</a></div>
          <div className="aura-messages" role="log" aria-live="polite" ref={listRef}>
            {messages.map((message, index) => (
              <div className={`aura-message ${message.emergency ? 'aura-emergency' : ''}`} key={`${index}-${message.text}`}>
                <p>{message.text}</p>
                {message.link && !message.emergency && <a href={`tel:${clinicPhone}`}>Zadzwoń: 85 661 01 07 <ArrowRight size={13} /></a>}
              </div>
            ))}
          </div>
          <p className="aura-privacy">Wiadomości są analizowane w tej przeglądarce. Nie są wysyłane ani zapisywane. Nie wpisuj danych osobowych ani informacji o zdrowiu.</p>
          <form className="aura-form" onSubmit={submitQuestion}>
            <input ref={inputRef} type="text" maxLength="300" autoComplete="off" placeholder={stopped ? 'Czat został zakończony' : 'Pytanie organizacyjne…'} aria-label="Pytanie organizacyjne" disabled={stopped} />
            <button type="submit" disabled={stopped} aria-label="Wyślij pytanie"><ArrowRight size={17} /></button>
          </form>
        </section>
      )}
      <button className="aura-launcher" type="button" aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? <X size={17} /> : <MessageCircle size={17} />}
        <span>{open ? 'Zamknij' : 'Zapytaj Aurę'}</span>
      </button>
    </div>
  );
}

function App() {
  const [modal, setModal] = useState(null);
  const closeModal = () => setModal(null);

  return (
    <>
      <Header onBook={() => setModal('booking')} />
      <main>
        <Hero onBook={() => setModal('booking')} />
        <TrustBar />
        <Approach />
        <Specialties onBook={() => setModal('booking')} />
        <Team onTeam={() => setModal('team')} />
        <Information onBook={() => setModal('booking')} />
        <FAQ />
      </main>
      <Footer />
      <AuraChat />
      {modal === 'booking' && <BookingModal onClose={closeModal} />}
      {modal === 'team' && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closeModal(); }}>
          <section className="booking-modal team-modal" role="dialog" aria-modal="true" aria-labelledby="team-modal-title">
            <button className="modal-close" type="button" onClick={closeModal} aria-label="Zamknij"><X size={20} /></button>
            <span className="modal-kicker"><Stethoscope size={15} /> ZESPÓŁ OKULISTYCZNY</span>
            <h2 id="team-modal-title">Zapytaj o lekarza<br /><em>i dostępny termin.</em></h2>
            <p className="modal-intro">Nie publikujemy niepotwierdzonych nazwisk, numerów PWZ ani grafiku wizyt. Aktualne informacje uzyskasz bezpośrednio w rejestracji.</p>
            <a className="button button-sage modal-call" href={`tel:${clinicPhone}`}><Phone size={16} /> Zadzwoń: 85 661 01 07 <ArrowRight size={15} /></a>
          </section>
        </div>
      )}
    </>
  );
}

export default App;
