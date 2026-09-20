'use client';

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Screen =
  | "welcome"
  | "onboarding"
  | "discover"
  | "detail"
  | "matched"
  | "matches"
  | "chat"
  | "date"
  | "safety"
  | "gold"
  | "settings"
  | "edit";

type Profile = {
  id: string;
  name: string;
  age: number;
  city: string;
  role: string;
  photo: string;
  gallery: string[];
  bio: string;
  interests: string[];
  match: number;
};

type FilterState = {
  region: "Anywhere" | "SoCal" | "California";
  age: "All ages" | "18–29" | "30–44" | "45–59" | "60–80";
  interest: "Any interest" | "Family" | "Travel" | "Coffee" | "Fitness";
};

type Message = { from: "him" | "me"; text: string };

const lifestylePhotos = {
  coffee: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=85",
  beach: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85",
  hiking: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=900&q=85",
  city: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=900&q=85",
};

const profiles: Profile[] = [
  {
    id: "daniel",
    name: "Daniel",
    age: 32,
    city: "San Diego, CA",
    role: "Product Manager",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=88",
    gallery: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=88",
      lifestylePhotos.coffee,
      lifestylePhotos.hiking,
    ],
    bio: "Curious, kind, and family-oriented. I love good food, long conversations, travel, and building a life with someone who values both roots and adventure.",
    interests: ["Travel", "Coffee", "Hiking", "Family", "Music"],
    match: 94,
  },
  {
    id: "michael",
    name: "Michael",
    age: 34,
    city: "New York, NY",
    role: "Architect",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=88",
    gallery: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=88",
      lifestylePhotos.city,
      lifestylePhotos.coffee,
    ],
    bio: "Architect, amateur cook, and chronic weekend traveler. I appreciate close families, old cities, and people who can laugh at themselves.",
    interests: ["Design", "Cooking", "Travel", "Museums"],
    match: 90,
  },
  {
    id: "alex",
    name: "Alex",
    age: 31,
    city: "Los Angeles, CA",
    role: "Creative Director",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=88",
    gallery: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=88",
      lifestylePhotos.beach,
      lifestylePhotos.city,
    ],
    bio: "Creative by day, outdoors whenever possible. Looking for something warm, grounded, and serious enough to grow into a real partnership.",
    interests: ["Art", "Fitness", "Beach", "Food"],
    match: 88,
  },
  {
    id: "ryan",
    name: "Ryan",
    age: 35,
    city: "Seattle, WA",
    role: "Engineer",
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=900&q=88",
    gallery: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=900&q=88",
      lifestylePhotos.hiking,
      lifestylePhotos.coffee,
    ],
    bio: "Engineer who likes spontaneous road trips, quiet coffee shops, and learning how other families and cultures celebrate life.",
    interests: ["Road trips", "Coffee", "Tech", "Family"],
    match: 85,
  },
  {
    id: "james",
    name: "James",
    age: 33,
    city: "Newport Beach, CA",
    role: "Physical Therapist",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=88",
    gallery: [
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=88",
      lifestylePhotos.beach,
      lifestylePhotos.hiking,
    ],
    bio: "Easygoing, active, and close with my family. I am happiest near the ocean, cooking for friends, or planning the next weekend away.",
    interests: ["Beach", "Cooking", "Fitness", "Family"],
    match: 87,
  },
  {
    id: "ethan",
    name: "Ethan",
    age: 36,
    city: "Austin, TX",
    role: "Founder",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=88",
    gallery: [
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=88",
      lifestylePhotos.city,
      lifestylePhotos.coffee,
    ],
    bio: "Optimistic builder with a soft spot for live music, big family dinners, and people who are proud of where they come from.",
    interests: ["Music", "Food", "Travel", "Startups"],
    match: 84,
  },
  {
    id: "noah",
    name: "Noah",
    age: 30,
    city: "Santa Monica, CA",
    role: "Film Editor",
    photo: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=900&q=88",
    gallery: [
      "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=900&q=88",
      lifestylePhotos.beach,
      lifestylePhotos.city,
    ],
    bio: "Film editor, dog person, and dedicated sunset walker. Looking for chemistry, kindness, and a relationship that feels playful and grounded.",
    interests: ["Film", "Dogs", "Beach", "Photography"],
    match: 82,
  },
  {
    id: "luke",
    name: "Luke",
    age: 37,
    city: "Denver, CO",
    role: "Civil Engineer",
    photo: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=88",
    gallery: [
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=88",
      lifestylePhotos.hiking,
      lifestylePhotos.coffee,
    ],
    bio: "Calm, curious, and outdoorsy. I like mountains, good coffee, family traditions, and learning the story behind the food on the table.",
    interests: ["Hiking", "Coffee", "Travel", "Family"],
    match: 80,
  },
];

const demoWomanPhoto =
  "https://images.unsplash.com/photo-1579105728744-9d6b14a45389?auto=format&fit=crop&w=900&q=88";
const welcomeManPhoto =
  "https://images.unsplash.com/photo-1551847812-f815b31ae67c?auto=format&fit=crop&w=900&q=88";

const seedMessages: Record<string, Message[]> = {
  daniel: [
    { from: "him", text: "Hi! I loved your profile — you seem warm, thoughtful, and really close to your family." },
    { from: "me", text: "Thank you! 😊 I liked yours too. You seem genuinely curious about different cultures." },
    { from: "him", text: "Very much. Also important question: coffee or Persian tea?" },
    { from: "me", text: "Both. Coffee first, Persian tea when the conversation gets serious. ☕️❤️" },
  ],
  michael: [
    { from: "him", text: "I have to ask — best meal to introduce someone to Persian food?" },
    { from: "me", text: "That is a dangerous question. I need at least three courses." },
    { from: "him", text: "Perfect. I am willing to train seriously for this." },
  ],
  alex: [
    { from: "him", text: "Your travel list is excellent. Where would you go tomorrow if you could?" },
    { from: "me", text: "Somewhere with good food, ocean, and no alarm clock." },
    { from: "him", text: "That sounds suspiciously like a perfect plan." },
  ],
};

const matchPreview: Record<string, { preview: string; time: string }> = {
  daniel: { preview: "Coffee first. Persian tea when it gets serious ☕️", time: "now" },
  michael: { preview: "I am willing to train seriously for this.", time: "2h" },
  alex: { preview: "That sounds suspiciously like a perfect plan.", time: "1d" },
};

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "brand brand-compact" : "brand"}>
      <div className="brand-flower" aria-hidden="true"><span /><span /><span /></div>
      <div>
        <div className="brand-name"><em>Saffron</em> <strong>Match</strong></div>
        {!compact && <><div className="brand-tag">Meaningful connections across cultures</div><div className="brand-tag-fa" lang="fa" dir="rtl">ارتباطی معنادار میان فرهنگ‌ها</div></>}
      </div>
    </div>
  );
}

function PhoneShell({
  children,
  nav,
  onNavigate,
  matchCount,
}: {
  children: React.ReactNode;
  nav?: Screen;
  onNavigate: (screen: Screen) => void;
  matchCount: number;
}) {
  return (
    <main className="stage">
      <section className="phone">
        <div className="status"><span>9:41</span><span>●●● ︿ ▰</span></div>
        <div className="screen">{children}</div>
        {nav && (
          <nav className="bottom-nav" aria-label="App navigation">
            <button className={nav === "discover" ? "active" : ""} onClick={() => onNavigate("discover")}><span>⌁</span>Discover</button>
            <button className={nav === "matches" ? "active" : ""} onClick={() => onNavigate("matches")}>
              <span className="nav-icon-wrap">♡{matchCount > 0 && <i>{matchCount}</i>}</span>Matches
            </button>
            <button className={nav === "chat" ? "active" : ""} onClick={() => onNavigate("chat")}><span>◌</span>Messages</button>
            <button className={nav === "settings" ? "active" : ""} onClick={() => onNavigate("settings")}><span>○</span>Profile</button>
          </nav>
        )}
        <div className="home-indicator" />
      </section>
      <p className="demo-hint">Saffron Match · interactive concept demo</p>
    </main>
  );
}

function Welcome({ onStart }: { onStart: () => void }) {
  return (
    <div className="welcome">
      <div className="ornament ornament-a" />
      <div className="ornament ornament-b" />
      <Brand />
      <p className="eyebrow">PEOPLE · CULTURE · A BRIGHTER US</p>
      <div className="hero-pair">
        <div className="portrait portrait-left"><Image src={demoWomanPhoto} alt="Smiling demo profile portrait" fill sizes="220px" priority /></div>
        <div className="portrait portrait-right"><Image src={welcomeManPhoto} alt="Promotional portrait" fill sizes="220px" priority /></div>
        <div className="hero-heart">♥</div>
      </div>
      <div className="welcome-copy">
        <span className="script-note">Different cultures.<br />Brighter stories.</span><span className="script-note-fa" lang="fa" dir="rtl">فرهنگ‌های متفاوت، داستان‌های روشن‌تر</span>
        <h1>Meet someone who gets <em>both</em> sides of your story.</h1>
        <p>A dating experience designed around meaningful cross-cultural connection.</p><p className="welcome-fa" lang="fa" dir="rtl">برای آشنایی‌های واقعی، محترمانه و معنادار میان فرهنگ‌ها</p>
      </div>
      <div className="feature-row">
        <div><b>♡</b><span>Real people</span><small lang="fa" dir="rtl">آدم‌های واقعی</small></div>
        <div><b>◎</b><span>Shared values</span><small lang="fa" dir="rtl">ارزش‌های مشترک</small></div>
        <div><b>✦</b><span>Safer dating</span><small lang="fa" dir="rtl">فضایی امن‌تر</small></div>
      </div>
      <button className="primary" onClick={onStart}>Get Started <small lang="fa" dir="rtl">شروع کن</small><span>→</span></button>
      <button className="secondary" onClick={onStart}>Preview the demo <small lang="fa" dir="rtl">دیدن نسخه نمایشی</small></button>
      <div className="motto">LOVE HAS A WIDER HORIZON<div lang="fa" dir="rtl">عشق افق گسترده‌تری دارد</div></div>
    </div>
  );
}

function Onboarding({
  onDone,
  name,
  setName,
  location,
  setLocation,
}: {
  onDone: () => void;
  name: string;
  setName: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
}) {
  const [goals, setGoals] = useState<string[]>(["Serious dating", "Open to marriage"]);
  const [values, setValues] = useState<string[]>(["Family-minded", "Cross-cultural"]);
  const [interests, setInterests] = useState<string[]>(["Travel", "Food", "Music"]);

  function toggle(value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) {
    setter((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  }

  return (
    <div className="content onboarding">
      <Brand compact />
      <div className="progress"><span className="done" /><span className="done" /><span /><span /><span /></div>
      <p className="eyebrow">STEP 2 OF 5</p>
      <h2>Create Your Profile</h2>
      <p className="subhead">Tell us what matters. We’ll make the matches feel more intentional.</p>
      <div className="profile-setup">
        <div className="avatar"><Image src={demoWomanPhoto} alt="Smiling demo profile avatar" fill sizes="96px" /></div>
        <div><label>First name<input value={name} onChange={(e) => setName(e.target.value)} placeholder="First name" aria-label="First name" /></label></div>
      </div>
      <div className="form-grid">
        <label>Age range<select defaultValue="30-44"><option>18-29</option><option>30-44</option><option>45-59</option><option>60-69</option><option>70-80</option></select></label>
        <label>Location<select value={location} onChange={(e) => setLocation(e.target.value)}><option>Orange County</option><option>Los Angeles</option><option>San Diego</option></select></label>
      </div>
      <ChoiceGroup title="Relationship goals" options={["Serious dating", "Open to marriage", "Meaningful connection", "Just exploring"]} selected={goals} onToggle={(v) => toggle(v, setGoals)} />
      <ChoiceGroup title="Cultural values" options={["Family-minded", "Keep my culture", "Cross-cultural", "Open-minded"]} selected={values} onToggle={(v) => toggle(v, setValues)} />
      <ChoiceGroup title="Interests" options={["Travel", "Food", "Fitness", "Art & culture", "Music", "Nature"]} selected={interests} onToggle={(v) => toggle(v, setInterests)} />
      <button className="primary sticky-action" onClick={onDone}>Continue to Matches <span>→</span></button>
    </div>
  );
}

function ChoiceGroup({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <section className="choice-section">
      <h3>{title}</h3>
      <div className="chips">
        {options.map((option) => (
          <button key={option} className={selected.includes(option) ? "chip selected" : "chip"} onClick={() => onToggle(option)}>{option}</button>
        ))}
      </div>
    </section>
  );
}

function FilterSheet({
  filters,
  setFilters,
  onClose,
}: {
  filters: FilterState;
  setFilters: (value: FilterState) => void;
  onClose: () => void;
}) {
  const groups: { key: keyof FilterState; title: string; values: string[] }[] = [
    { key: "region", title: "Location", values: ["Anywhere", "SoCal", "California"] },
    { key: "age", title: "Age", values: ["All ages", "18–29", "30–44", "45–59", "60–80"] },
    { key: "interest", title: "Interest", values: ["Any interest", "Family", "Travel", "Coffee", "Fitness"] },
  ];
  return (
    <div className="filter-sheet">
      <div className="filter-sheet-head"><h3>Match filters</h3><button onClick={onClose}>×</button></div>
      {groups.map((group) => (
        <section key={group.key}>
          <b>{group.title}</b>
          <div className="filter-pills">
            {group.values.map((value) => (
              <button
                key={value}
                className={filters[group.key] === value ? "selected" : ""}
                onClick={() => setFilters({ ...filters, [group.key]: value } as FilterState)}
              >
                {value}
              </button>
            ))}
          </div>
        </section>
      ))}
      <button className="secondary filter-reset" onClick={() => setFilters({ region: "Anywhere", age: "All ages", interest: "Any interest" })}>Reset filters</button>
      <button className="primary" onClick={onClose}>Show matches</button>
    </div>
  );
}

function Discover({
  profile,
  position,
  total,
  filters,
  setFilters,
  canUndo,
  likesSent,
  superLikesSent,
  onPass,
  onUndo,
  onOpen,
  onLike,
  onSuperLike,
}: {
  profile?: Profile;
  position: number;
  total: number;
  filters: FilterState;
  setFilters: (value: FilterState) => void;
  canUndo: boolean;
  likesSent: number;
  superLikesSent: number;
  onPass: () => void;
  onUndo: () => void;
  onOpen: () => void;
  onLike: () => void;
  onSuperLike: () => void;
}) {
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragX, setDragX] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const strength = Math.min(Math.abs(dragX) / 120, 1);
  const rotation = dragX / 22;

  function finishSwipe(event: React.PointerEvent<HTMLElement>) {
    if (dragStart === null) return;
    const delta = event.clientX - dragStart;
    setDragStart(null);
    setDragX(0);
    if (delta > 90) onLike();
    else if (delta < -90) onPass();
  }

  if (!profile) {
    return (
      <div className="content discover empty-discover">
        <Brand compact />
        <div className="empty-card">
          <span>☷</span>
          <h2>No matches in these filters</h2>
          <p>Broaden the filters and the deck will refill immediately.</p>
          <button className="primary" onClick={() => setFiltersOpen(true)}>Adjust filters</button>
        </div>
        {filtersOpen && <FilterSheet filters={filters} setFilters={setFilters} onClose={() => setFiltersOpen(false)} />}
      </div>
    );
  }

  return (
    <div className="content discover">
      <Brand compact />
      <div className="filter-row">
        <button onClick={() => setFiltersOpen(true)}>📍 {filters.region}</button>
        <button>Men</button>
        <button onClick={() => setFiltersOpen(true)}>☷ Filters</button>
      </div>
      <div className="deck-meta"><span>{position} of {total}</span><span>Swipe to browse</span></div>
      <div className="activity-summary"><span>♡ {likesSent} likes</span><span>★ {superLikesSent} super likes</span></div>

      <article
        className={"swipe-card" + (dragStart !== null ? " dragging" : "")}
        style={{ transform: "translateX(" + dragX + "px) rotate(" + rotation + "deg)" }}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          setDragStart(event.clientX);
        }}
        onPointerMove={(event) => { if (dragStart !== null) setDragX(event.clientX - dragStart); }}
        onPointerUp={finishSwipe}
        onPointerCancel={() => { setDragStart(null); setDragX(0); }}
      >
        <div className="swipe-stamp pass-stamp" style={{ opacity: dragX < 0 ? strength : 0 }}>PASS</div>
        <div className="swipe-stamp like-stamp" style={{ opacity: dragX > 0 ? strength : 0 }}>LIKE</div>
        <button className="photo-button" onClick={onOpen} aria-label={"Open " + profile.name + "'s profile"}>
          <Image src={profile.photo} alt={profile.name} fill sizes="390px" priority />
          <div className="photo-shade" />
          <div className="photo-info">
            <div className="match-score">{profile.match}% match</div>
            <h1>{profile.name}, {profile.age} <small>✓</small></h1>
            <p>📍 {profile.city}</p>
            <p>▣ {profile.role}</p>
          </div>
        </button>
        <div className="card-copy">
          <p>{profile.bio}</p>
          <div className="chips compact-chips">{profile.interests.slice(0, 4).map((item) => <span className="chip" key={item}>{item}</span>)}</div>
          <button className="text-link" onClick={onOpen}>View full profile →</button>
        </div>
      </article>

      <div className="swipe-actions swipe-actions-four">
        <button className="undo" disabled={!canUndo} onClick={onUndo} aria-label="Undo last swipe">↶</button>
        <button className="pass" onClick={onPass} aria-label="Pass">×</button>
        <button className="super-like" onClick={onSuperLike} aria-label="Super Like">★</button>
        <button className="like" onClick={onLike} aria-label="Like">♥</button>
      </div>
      <p className="swipe-tip">← pass · drag the card · like →</p>
      {filtersOpen && <FilterSheet filters={filters} setFilters={setFilters} onClose={() => setFiltersOpen(false)} />}
    </div>
  );
}

function Detail({ profile, onBack, onLike, onSuperLike }: { profile: Profile; onBack: () => void; onLike: () => void; onSuperLike: () => void }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  useEffect(() => setPhotoIndex(0), [profile.id]);
  const photo = profile.gallery[photoIndex];

  return (
    <div className="content detail">
      <div className="detail-hero">
        <Image src={photo} alt={profile.name + " profile photo " + (photoIndex + 1)} fill sizes="430px" priority />
        <div className="photo-shade" />
        <button className="circle-back" onClick={onBack}>‹</button>
        <Brand compact />
        <button className="gallery-arrow gallery-prev" onClick={() => setPhotoIndex((photoIndex - 1 + profile.gallery.length) % profile.gallery.length)}>‹</button>
        <button className="gallery-arrow gallery-next" onClick={() => setPhotoIndex((photoIndex + 1) % profile.gallery.length)}>›</button>
        <div className="gallery-dots">{profile.gallery.map((_, i) => <button key={i} className={i === photoIndex ? "active" : ""} onClick={() => setPhotoIndex(i)} aria-label={"Photo " + (i + 1)} />)}</div>
        <div className="detail-title">
          <div className="match-score">{profile.match}% match</div>
          <h1>{profile.name}, {profile.age} <small>✓</small></h1>
          <p>📍 {profile.city} · {profile.role}</p>
        </div>
      </div>
      <section className="detail-section"><h3>About</h3><p>{profile.bio}</p></section>
      <section className="detail-section"><h3>Interests</h3><div className="chips">{profile.interests.map((item) => <span className="chip" key={item}>{item}</span>)}</div></section>
      <section className="detail-section"><h3>Looking for</h3><div className="chips"><span className="chip">Long-term partner</span><span className="chip">Family-oriented</span><span className="chip">Open to cultures</span></div></section>
      <section className="why-match"><p className="eyebrow">WHY WE MATCH</p><h3>Family + curiosity + real intention</h3><p>You both value close family, travel, meaningful conversation, and building something long-term without losing your own culture.</p></section>
      <div className="detail-actions">
        <button className="secondary" onClick={onSuperLike}>★ Super Like</button>
        <button className="primary" onClick={onLike}>♥ Send Like</button>
      </div>
    </div>
  );
}

function MatchMoment({ onMessage, onBrowse }: { onMessage: () => void; onBrowse: () => void }) {
  return (
    <div className="match-moment">
      <div className="confetti c1">✦</div><div className="confetti c2">✧</div><div className="confetti c3">✦</div>
      <Brand compact />
      <p className="eyebrow">A NEW CONNECTION</p>
      <h1>It’s a Match!</h1>
      <p>You & Daniel liked each other.</p>
      <div className="match-faces">
        <div className="match-face"><Image src={demoWomanPhoto} alt="Your demo profile" fill sizes="140px" /></div>
        <div className="match-heart">♥</div>
        <div className="match-face"><Image src={profiles[0].photo} alt="Daniel" fill sizes="140px" /></div>
      </div>
      <blockquote>“Good conversations can start across any distance.”</blockquote>
      <button className="primary" onClick={onMessage}>Send Daniel a Message <span>→</span></button>
      <button className="secondary" onClick={onBrowse}>Keep Browsing</button>
    </div>
  );
}

function Matches({ matchedIds, onChat }: { matchedIds: string[]; onChat: (id: string) => void }) {
  const matchRows = matchedIds.map((id) => {
    const profile = profiles.find((p) => p.id === id)!;
    return { ...profile, ...(matchPreview[id] || { preview: "You matched — say hello.", time: "now" }) };
  });
  return (
    <div className="content matches">
      <Brand compact />
      <p className="eyebrow">REAL PEOPLE · MEANINGFUL CONNECTIONS</p>
      <h2>Your Matches</h2>
      <div className="segmented"><button className="active">Matches {matchRows.length}</button><button>Messages {matchRows.length}</button></div>
      <div className="match-list">
        {matchRows.map((row) => (
          <button key={row.id} className="match-row" onClick={() => onChat(row.id)}>
            <div className="mini-avatar"><Image src={row.photo} alt={row.name} fill sizes="72px" /></div>
            <div className="match-row-copy"><strong>{row.name}, {row.age}</strong><small>{row.city} · {row.time}</small><p>{row.preview}</p></div>
            <span>›</span>
          </button>
        ))}
      </div>
      <div className="soft-card"><span>✦</span><div><b>Every match opens a real demo chat.</b><p>Tap Michael, Alex, or Daniel and the conversation changes.</p></div></div>
    </div>
  );
}

function Chat({
  profile,
  messages,
  onSend,
  onDate,
}: {
  profile: Profile;
  messages: Message[];
  onSend: (text: string) => void;
  onDate: () => void;
}) {
  const [draft, setDraft] = useState("");
  function send() {
    if (!draft.trim()) return;
    onSend(draft.trim());
    setDraft("");
  }
  return (
    <div className="chat-screen">
      <div className="chat-header">
        <div className="mini-avatar"><Image src={profile.photo} alt={profile.name} fill sizes="54px" /></div>
        <div><strong>{profile.name}</strong><small><i /> Online now · {profile.city.split(",")[0]}</small></div>
        <button>•••</button>
      </div>
      <div className="chat-brand"><Brand compact /><button onClick={onDate}>Plan date ✦</button></div>
      <div className="messages">
        {messages.map((message, i) => <div key={i} className={"bubble " + (message.from === "me" ? "mine" : "his")}>{message.text}</div>)}
        <div className="date-nudge"><span>☕️</span><div><b>Ready to meet?</b><p>Turn a good conversation into a first date.</p></div><button onClick={onDate}>Plan</button></div>
      </div>
      <div className="composer">
        <input value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => event.key === "Enter" && send()} placeholder={"Message " + profile.name + "..."} aria-label="Message" />
        <button onClick={send}>➤</button>
      </div>
    </div>
  );
}

function DatePlanner({ profile, onSent }: { profile: Profile; onSent: () => void }) {
  const [day, setDay] = useState("Sat");
  const [time, setTime] = useState("11:00 AM");
  const [mode, setMode] = useState("In Person");
  return (
    <div className="content date-planner">
      <Brand compact />
      <p className="eyebrow">GOOD CONVERSATIONS · BRIGHTER BEGINNINGS</p>
      <h2>Plan a Date with {profile.name}</h2>
      <p className="subhead">Keep it easy. Coffee, conversation, no pressure.</p>
      <div className="venue-card">
        <div className="venue-photo"><Image src={lifestylePhotos.coffee} alt="Coffee shop" fill sizes="360px" /></div>
        <div><small>SUGGESTED VENUE</small><h3>A cozy coffee date</h3><p>Great coffee, relaxed atmosphere, easy first conversation.</p><b>📍 Laguna Beach, CA</b></div>
      </div>
      <Picker title="Select day" values={["Fri", "Sat", "Sun", "Mon"]} selected={day} setSelected={setDay} />
      <Picker title="Select time" values={["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"]} selected={time} setSelected={setTime} />
      <Picker title="How would you like to meet?" values={["In Person", "Video Call"]} selected={mode} setSelected={setMode} />
      <button className="primary sticky-action" onClick={onSent}>Send Invite to {profile.name} <span>→</span></button>
    </div>
  );
}

function Picker({ title, values, selected, setSelected }: { title: string; values: string[]; selected: string; setSelected: (value: string) => void }) {
  return <section className="picker"><h3>{title}</h3><div>{values.map((value) => <button key={value} onClick={() => setSelected(value)} className={selected === value ? "selected" : ""}>{value}</button>)}</div></section>;
}

function Safety() {
  const [verified, setVerified] = useState(false);
  return (
    <div className="content safety">
      <Brand compact />
      <p className="eyebrow">TRUST CREATES BRIGHTER TOMORROWS</p>
      <h2>Safe & Verified</h2>
      <p className="subhead">Real people. Genuine intentions. Better controls for meeting someone new.</p>
      <div className="verify-card">
        <div className="avatar"><Image src={profiles[0].photo} alt="Daniel" fill sizes="96px" /></div>
        <div><h3>Daniel S. ✓</h3><p>Verified member</p><div className="chips"><span className="chip selected">Photo verified</span><span className="chip">Active member</span></div></div>
      </div>
      {[
        ["◉", "Photo Verification", "Real photos, real people."],
        ["▣", "Identity Review", "Extra confidence before you meet."],
        ["▤", "Privacy Controls", "Choose exactly what you share."],
        ["⚑", "Report & Block", "Simple controls, always available."],
      ].map(([icon, title, copy]) => <div className="settings-row" key={title}><span>{icon}</span><div><b>{title}</b><p>{copy}</p></div><i>›</i></div>)}
      <button className="primary" onClick={() => setVerified(true)}>{verified ? "✓ Demo profile verified" : "Verify Now"} <span>{verified ? "" : "→"}</span></button>
    </div>
  );
}

function Gold() {
  const [plan, setPlan] = useState("6");
  const [active, setActive] = useState(false);
  return (
    <div className="content gold">
      <Brand compact />
      <p className="eyebrow">MORE POSSIBILITIES · A BRIGHTER TOMORROW</p>
      <h2>Upgrade to <em>Saffron Gold</em></h2>
      <div className="gold-benefits">{["Unlimited likes", "Advanced filters", "Travel mode", "See who liked you", "Priority matching"].map((item, i) => <div key={item}><span>{["∞","☷","✈","◉","★"][i]}</span><b>{item}</b></div>)}</div>
      <div className="plans">
        <button className={plan === "1" ? "selected-plan" : ""} onClick={() => setPlan("1")}><small>1 MONTH</small><b>$19.99</b><span>/ month</span></button>
        <button className={(plan === "6" ? "selected-plan " : "") + "popular"} onClick={() => setPlan("6")}><em>MOST POPULAR</em><small>6 MONTHS</small><b>$12.99</b><span>/ month</span></button>
        <button className={plan === "12" ? "selected-plan" : ""} onClick={() => setPlan("12")}><small>12 MONTHS</small><b>$8.99</b><span>/ month</span></button>
      </div>
      <button className="primary" onClick={() => setActive(true)}>{active ? "✓ Gold demo activated" : "Start Premium"} <span>{active ? "" : "→"}</span></button>
      <p className="fineprint">Demo only · no payment is processed</p>
    </div>
  );
}

function Settings({
  onSafety,
  onGold,
  onEdit,
  name,
  location,
}: {
  onSafety: () => void;
  onGold: () => void;
  onEdit: () => void;
  name: string;
  location: string;
}) {
  const [notifications, setNotifications] = useState(true);
  return (
    <div className="content settings">
      <Brand compact />
      <div className="settings-profile">
        <div className="avatar"><Image src={demoWomanPhoto} alt="Your demo profile" fill sizes="96px" /></div>
        <div><h2 className="blank-name">{name || "\u00A0"}</h2><p>{location}, CA</p><button onClick={onEdit}>Edit profile</button></div>
      </div>
      <div className="settings-row"><span>♡</span><div><b>My Preferences</b><p>Dating goals, lifestyle, culture</p></div><i>›</i></div>
      <div className="settings-row"><span>☷</span><div><b>Match Preferences</b><p>Use the working filters in Discover</p></div><i>›</i></div>
      <button className="promo-row" onClick={() => setNotifications(!notifications)}><span>♧</span><div><b>Notifications</b><p>{notifications ? "On · tap to mute" : "Muted · tap to turn on"}</p></div><i>{notifications ? "●" : "○"}</i></button>
      <button className="promo-row" onClick={onSafety}><span>✓</span><div><b>Privacy & Safety</b><p>Verification, visibility, reporting</p></div><i>›</i></button>
      <button className="promo-row gold-row" onClick={onGold}><span>★</span><div><b>Saffron Gold</b><p>See premium demo features</p></div><i>›</i></button>
      <div className="settings-row"><span>◎</span><div><b>Language</b><p>English · فارسی</p></div><i>✓</i></div>
      <div className="motto">LOVE HAS A WIDER HORIZON</div>
    </div>
  );
}

function EditProfile({
  name,
  setName,
  location,
  setLocation,
  bio,
  setBio,
  onSave,
}: {
  name: string;
  setName: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  bio: string;
  setBio: (value: string) => void;
  onSave: () => void;
}) {
  return (
    <div className="content edit-profile">
      <Brand compact />
      <p className="eyebrow">YOUR PROFILE</p>
      <h2>Edit Profile</h2>
      <div className="edit-avatar"><div className="avatar"><Image src={demoWomanPhoto} alt="Your demo profile" fill sizes="110px" /></div><span>Demo portrait</span></div>
      <label>First name<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Leave blank if you prefer" /></label>
      <label>Location<select value={location} onChange={(e) => setLocation(e.target.value)}><option>Orange County</option><option>Los Angeles</option><option>San Diego</option></select></label>
      <label>About me<textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={5} /></label>
      <button className="primary" onClick={onSave}>Save Profile <span>→</span></button>
    </div>
  );
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [index, setIndex] = useState(0);
  const [swipeHistory, setSwipeHistory] = useState<number[]>([]);
  const [matchedIds, setMatchedIds] = useState<string[]>(["michael", "alex"]);
  const [activeChatId, setActiveChatId] = useState("michael");
  const [inviteSentTo, setInviteSentTo] = useState<string | null>(null);
  const [likesSent, setLikesSent] = useState(0);
  const [superLikesSent, setSuperLikesSent] = useState(0);
  const [toast, setToast] = useState("");
  const [filters, setFilters] = useState<FilterState>({ region: "Anywhere", age: "All ages", interest: "Any interest" });
  const [chatMessages, setChatMessages] = useState<Record<string, Message[]>>(seedMessages);
  const [profileName, setProfileName] = useState("");
  const [profileLocation, setProfileLocation] = useState("Orange County");
  const [profileBio, setProfileBio] = useState("Family-minded, curious, and looking for a meaningful cross-cultural connection.");

  useEffect(() => {
    const likedDaniel = window.localStorage.getItem("saffron-liked-daniel") === "true";
    if (likedDaniel) setMatchedIds((current) => current.includes("daniel") ? current : ["daniel", ...current]);
  }, []);

  useEffect(() => {
    setIndex(0);
    setSwipeHistory([]);
  }, [filters.region, filters.age, filters.interest]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const filteredProfiles = useMemo(() => profiles.filter((p) => {
    const regionOk =
      filters.region === "Anywhere" ||
      (filters.region === "California" && p.city.endsWith(", CA")) ||
      (filters.region === "SoCal" && ["San Diego, CA", "Los Angeles, CA", "Newport Beach, CA", "Santa Monica, CA"].includes(p.city));
    const ageOk =
      filters.age === "All ages" ||
      (filters.age === "18–29" && p.age >= 18 && p.age <= 29) ||
      (filters.age === "30–44" && p.age >= 30 && p.age <= 44) ||
      (filters.age === "45–59" && p.age >= 45 && p.age <= 59) ||
      (filters.age === "60–80" && p.age >= 60 && p.age <= 80);
    const interestOk = filters.interest === "Any interest" || p.interests.includes(filters.interest);
    return regionOk && ageOk && interestOk;
  }), [filters]);

  const profile = filteredProfiles.length ? filteredProfiles[index % filteredProfiles.length] : undefined;
  const activeChatProfile = profiles.find((p) => p.id === activeChatId) || profiles[0];

  const nav = useMemo<Screen | undefined>(() => {
    if (["discover", "matches", "chat", "settings"].includes(screen)) return screen;
    if (["detail", "matched", "date"].includes(screen)) return "discover";
    if (["safety", "gold", "edit"].includes(screen)) return "settings";
    return undefined;
  }, [screen]);

  function advance() {
    setSwipeHistory((current) => [...current, index]);
    setIndex((current) => current + 1);
  }

  function undo() {
    setSwipeHistory((current) => {
      if (!current.length) return current;
      const next = [...current];
      const previous = next.pop()!;
      setIndex(previous);
      setToast("↶ Last swipe restored");
      return next;
    });
  }

  function likeCurrent() {
    if (!profile) return;
    setLikesSent((current) => current + 1);
    if (profile.id === "daniel") {
      setMatchedIds((current) => current.includes("daniel") ? current : ["daniel", ...current]);
      window.localStorage.setItem("saffron-liked-daniel", "true");
      setScreen("matched");
      return;
    }
    setToast("♥ Like sent to " + profile.name);
    advance();
  }

  function superLikeCurrent() {
    if (!profile) return;
    setSuperLikesSent((current) => current + 1);
    if (profile.id === "daniel") {
      setMatchedIds((current) => current.includes("daniel") ? current : ["daniel", ...current]);
      window.localStorage.setItem("saffron-liked-daniel", "true");
      setScreen("matched");
      return;
    }
    setToast("★ Super Like sent to " + profile.name);
    advance();
  }

  function openChat(id: string) {
    setActiveChatId(id);
    if (!chatMessages[id]) setChatMessages((current) => ({ ...current, [id]: [{ from: "him", text: "Hey! Nice to meet you here." }] }));
    setScreen("chat");
  }

  function sendChat(text: string) {
    setChatMessages((current) => ({
      ...current,
      [activeChatId]: [...(current[activeChatId] || []), { from: "me", text }],
    }));
  }

  function sendInvite() {
    setInviteSentTo(activeChatProfile.name);
    setScreen("chat");
  }

  return (
    <PhoneShell nav={nav} onNavigate={setScreen} matchCount={matchedIds.length}>
      {toast && <div className="toast">{toast}</div>}
      {screen === "welcome" && <Welcome onStart={() => setScreen("onboarding")} />}
      {screen === "onboarding" && <Onboarding onDone={() => setScreen("discover")} name={profileName} setName={setProfileName} location={profileLocation} setLocation={setProfileLocation} />}
      {screen === "discover" && (
        <Discover
          profile={profile}
          position={profile ? (index % filteredProfiles.length) + 1 : 0}
          total={filteredProfiles.length}
          filters={filters}
          setFilters={setFilters}
          canUndo={swipeHistory.length > 0}
          likesSent={likesSent}
          superLikesSent={superLikesSent}
          onPass={advance}
          onUndo={undo}
          onOpen={() => profile && setScreen("detail")}
          onLike={likeCurrent}
          onSuperLike={superLikeCurrent}
        />
      )}
      {screen === "detail" && profile && <Detail profile={profile} onBack={() => setScreen("discover")} onLike={likeCurrent} onSuperLike={superLikeCurrent} />}
      {screen === "matched" && <MatchMoment onMessage={() => openChat("daniel")} onBrowse={() => setScreen("discover")} />}
      {screen === "matches" && <Matches matchedIds={matchedIds} onChat={openChat} />}
      {screen === "chat" && (
        <>
          {inviteSentTo && <div className="toast">✓ Date invite sent to {inviteSentTo}</div>}
          <Chat profile={activeChatProfile} messages={chatMessages[activeChatId] || []} onSend={sendChat} onDate={() => setScreen("date")} />
        </>
      )}
      {screen === "date" && <DatePlanner profile={activeChatProfile} onSent={sendInvite} />}
      {screen === "safety" && <Safety />}
      {screen === "gold" && <Gold />}
      {screen === "settings" && <Settings onSafety={() => setScreen("safety")} onGold={() => setScreen("gold")} onEdit={() => setScreen("edit")} name={profileName} location={profileLocation} />}
      {screen === "edit" && <EditProfile name={profileName} setName={setProfileName} location={profileLocation} setLocation={setProfileLocation} bio={profileBio} setBio={setProfileBio} onSave={() => { setToast("✓ Profile saved"); setScreen("settings"); }} />}
      {matchedIds.includes("daniel") && screen === "discover" && <button className="floating-match" onClick={() => setScreen("matches")}>♥ Daniel matched</button>}
    </PhoneShell>
  );
}
