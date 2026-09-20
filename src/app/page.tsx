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
  | "settings";

type Profile = {
  id: string;
  name: string;
  age: number;
  city: string;
  role: string;
  photo: string;
  bio: string;
  interests: string[];
  match: number;
};

const profiles: Profile[] = [
  {
    id: "daniel",
    name: "Daniel",
    age: 32,
    city: "San Diego, CA",
    role: "Product Manager",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=88",
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
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=88",
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
    photo:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=88",
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
    photo:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=900&q=88",
    bio: "Engineer who likes spontaneous road trips, quiet coffee shops, and learning how other families and cultures celebrate life.",
    interests: ["Road trips", "Coffee", "Tech", "Family"],
    match: 85,
  },
];

const atiPhoto =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=88";

const initialMessages = [
  { from: "him", text: "Hi Ati! I loved your profile — you seem warm, thoughtful, and really close to your family." },
  { from: "me", text: "Thank you! 😊 I liked yours too. You seem genuinely curious about different cultures." },
  { from: "him", text: "Very much. Also important question: coffee or Persian tea?" },
  { from: "me", text: "Both. Coffee first, Persian tea when the conversation gets serious. ☕️❤️" },
];

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "brand brand-compact" : "brand"}>
      <div className="brand-flower" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div>
        <div className="brand-name">
          <em>Saffron</em> <strong>Match</strong>
        </div>
        {!compact && <div className="brand-tag">Meaningful connections across cultures</div>}
      </div>
    </div>
  );
}

function PhoneShell({
  children,
  nav,
  onNavigate,
}: {
  children: React.ReactNode;
  nav?: Screen;
  onNavigate: (screen: Screen) => void;
}) {
  return (
    <main className="stage">
      <section className="phone">
        <div className="status">
          <span>9:41</span>
          <span>●●● ︿ ▰</span>
        </div>
        <div className="screen">{children}</div>
        {nav && (
          <nav className="bottom-nav" aria-label="App navigation">
            <button className={nav === "discover" ? "active" : ""} onClick={() => onNavigate("discover")}>
              <span>⌁</span>Discover
            </button>
            <button className={nav === "matches" ? "active" : ""} onClick={() => onNavigate("matches")}>
              <span>♡</span>Matches
            </button>
            <button className={nav === "chat" ? "active" : ""} onClick={() => onNavigate("chat")}>
              <span>◌</span>Messages
            </button>
            <button className={nav === "settings" ? "active" : ""} onClick={() => onNavigate("settings")}>
              <span>○</span>Profile
            </button>
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
        <div className="portrait portrait-left">
          <Image src={atiPhoto} alt="Demo profile portrait" fill sizes="220px" priority />
        </div>
        <div className="portrait portrait-right">
          <Image src={profiles[0].photo} alt="Demo match portrait" fill sizes="220px" priority />
        </div>
        <div className="hero-heart">♥</div>
      </div>

      <div className="welcome-copy">
        <span className="script-note">Different cultures.<br />Brighter stories.</span>
        <h1>Meet someone who gets <em>both</em> sides of your story.</h1>
        <p>A dating experience designed around meaningful cross-cultural connection.</p>
      </div>

      <div className="feature-row">
        <div><b>♡</b><span>Real people</span></div>
        <div><b>◎</b><span>Shared values</span></div>
        <div><b>✦</b><span>Safer dating</span></div>
      </div>

      <button className="primary" onClick={onStart}>Get Started <span>→</span></button>
      <button className="secondary" onClick={onStart}>Preview the demo</button>
      <div className="motto">LOVE HAS A WIDER HORIZON</div>
    </div>
  );
}

function Onboarding({ onDone }: { onDone: () => void }) {
  const [goals, setGoals] = useState<string[]>(["Serious dating", "Open to marriage"]);
  const [values, setValues] = useState<string[]>(["Family-minded", "Cross-cultural"]);

  function toggle(value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) {
    setter((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    );
  }

  return (
    <div className="content onboarding">
      <Brand compact />
      <div className="progress"><span className="done" /><span className="done" /><span /><span /><span /></div>
      <p className="eyebrow">STEP 2 OF 5</p>
      <h2>Create Your Profile</h2>
      <p className="subhead">Tell us what matters. We’ll make the matches feel more intentional.</p>

      <div className="profile-setup">
        <div className="avatar">
          <Image src={atiPhoto} alt="Ati demo avatar" fill sizes="96px" />
        </div>
        <div>
          <label>First name</label>
          <input defaultValue="Ati" aria-label="First name" />
        </div>
      </div>

      <div className="form-grid">
        <label>Age range<select defaultValue="30-39"><option>25-34</option><option>30-39</option><option>35-45</option></select></label>
        <label>Location<select defaultValue="Orange County"><option>Orange County</option><option>Los Angeles</option><option>San Diego</option></select></label>
      </div>

      <ChoiceGroup title="Relationship goals" options={["Serious dating", "Open to marriage", "Meaningful connection", "Just exploring"]} selected={goals} onToggle={(v) => toggle(v, setGoals)} />
      <ChoiceGroup title="Cultural values" options={["Family-minded", "Keep my culture", "Cross-cultural", "Open-minded"]} selected={values} onToggle={(v) => toggle(v, setValues)} />
      <ChoiceGroup title="Interests" options={["Travel", "Food", "Fitness", "Art & culture", "Music", "Nature"]} selected={["Travel", "Food", "Music"]} onToggle={() => {}} />

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
          <button key={option} className={selected.includes(option) ? "chip selected" : "chip"} onClick={() => onToggle(option)}>
            {option}
          </button>
        ))}
      </div>
    </section>
  );
}

function Discover({
  profile,
  onPass,
  onOpen,
  onLike,
}: {
  profile: Profile;
  onPass: () => void;
  onOpen: () => void;
  onLike: () => void;
}) {
  return (
    <div className="content discover">
      <Brand compact />
      <div className="filter-row">
        <button>📍 SoCal</button><button>Men</button><button>☷ Filters</button>
      </div>

      <article className="swipe-card">
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
          <div className="chips compact-chips">
            {profile.interests.slice(0, 4).map((item) => <span className="chip" key={item}>{item}</span>)}
          </div>
          <button className="text-link" onClick={onOpen}>View full profile →</button>
        </div>
      </article>

      <div className="swipe-actions">
        <button className="pass" onClick={onPass} aria-label="Pass">×</button>
        <button className="like" onClick={onLike} aria-label="Like">♥</button>
        <button className="message" onClick={onOpen} aria-label="View profile">✦</button>
      </div>
    </div>
  );
}

function Detail({ profile, onBack, onLike }: { profile: Profile; onBack: () => void; onLike: () => void }) {
  return (
    <div className="content detail">
      <div className="detail-hero">
        <Image src={profile.photo} alt={profile.name} fill sizes="430px" priority />
        <div className="photo-shade" />
        <button className="circle-back" onClick={onBack}>‹</button>
        <Brand compact />
        <div className="detail-title">
          <div className="match-score">{profile.match}% match</div>
          <h1>{profile.name}, {profile.age} <small>✓</small></h1>
          <p>📍 {profile.city} · {profile.role}</p>
        </div>
      </div>

      <section className="detail-section">
        <h3>About</h3>
        <p>{profile.bio}</p>
      </section>
      <section className="detail-section">
        <h3>Interests</h3>
        <div className="chips">{profile.interests.map((item) => <span className="chip" key={item}>{item}</span>)}</div>
      </section>
      <section className="detail-section">
        <h3>Looking for</h3>
        <div className="chips">
          <span className="chip">Long-term partner</span>
          <span className="chip">Family-oriented</span>
          <span className="chip">Open to cultures</span>
        </div>
      </section>
      <section className="why-match">
        <p className="eyebrow">WHY WE MATCH</p>
        <h3>Family + curiosity + real intention</h3>
        <p>You both value close family, travel, meaningful conversation, and building something long-term without losing your own culture.</p>
      </section>

      <button className="primary sticky-action" onClick={onLike}>♥ Send Like</button>
    </div>
  );
}

function MatchMoment({
  onMessage,
  onBrowse,
}: {
  onMessage: () => void;
  onBrowse: () => void;
}) {
  return (
    <div className="match-moment">
      <div className="confetti c1">✦</div><div className="confetti c2">✧</div><div className="confetti c3">✦</div>
      <Brand compact />
      <p className="eyebrow">A NEW CONNECTION</p>
      <h1>It’s a Match!</h1>
      <p>Ati & Daniel liked each other.</p>
      <div className="match-faces">
        <div className="match-face"><Image src={atiPhoto} alt="Ati" fill sizes="140px" /></div>
        <div className="match-heart">♥</div>
        <div className="match-face"><Image src={profiles[0].photo} alt="Daniel" fill sizes="140px" /></div>
      </div>
      <blockquote>“Good conversations can start across any distance.”</blockquote>
      <button className="primary" onClick={onMessage}>Send Daniel a Message <span>→</span></button>
      <button className="secondary" onClick={onBrowse}>Keep Browsing</button>
    </div>
  );
}

function Matches({ onChat }: { onChat: () => void }) {
  const matchRows = [
    { ...profiles[0], preview: "Coffee first. Persian tea when it gets serious ☕️", time: "now" },
    { ...profiles[1], preview: "That restaurant looks amazing.", time: "2h" },
    { ...profiles[2], preview: "I’d love to hear more about Tehran.", time: "1d" },
  ];
  return (
    <div className="content matches">
      <Brand compact />
      <p className="eyebrow">REAL PEOPLE · MEANINGFUL CONNECTIONS</p>
      <h2>Your Matches</h2>
      <div className="segmented"><button className="active">New 3</button><button>Messages 1</button></div>
      <div className="match-list">
        {matchRows.map((row, index) => (
          <button key={row.id} className="match-row" onClick={index === 0 ? onChat : undefined}>
            <div className="mini-avatar"><Image src={row.photo} alt={row.name} fill sizes="72px" /></div>
            <div className="match-row-copy">
              <strong>{row.name}, {row.age}</strong>
              <small>{row.city} · {row.time}</small>
              <p>{row.preview}</p>
            </div>
            <span>›</span>
          </button>
        ))}
      </div>
      <div className="soft-card">
        <span>✦</span>
        <div><b>3 people already like your vibe.</b><p>Keep your profile visible to get more intentional matches.</p></div>
      </div>
    </div>
  );
}

function Chat({ onDate }: { onDate: () => void }) {
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");

  function send() {
    if (!draft.trim()) return;
    setMessages((current) => [...current, { from: "me", text: draft.trim() }]);
    setDraft("");
  }

  return (
    <div className="chat-screen">
      <div className="chat-header">
        <div className="mini-avatar"><Image src={profiles[0].photo} alt="Daniel" fill sizes="54px" /></div>
        <div><strong>Daniel</strong><small><i /> Online now · San Diego</small></div>
        <button>•••</button>
      </div>
      <div className="chat-brand"><Brand compact /><button onClick={onDate}>Plan date ✦</button></div>
      <div className="messages">
        {messages.map((message, i) => (
          <div key={i} className={"bubble " + (message.from === "me" ? "mine" : "his")}>{message.text}</div>
        ))}
        <div className="date-nudge">
          <span>☕️</span>
          <div><b>Ready to meet?</b><p>Turn a good conversation into a first date.</p></div>
          <button onClick={onDate}>Plan</button>
        </div>
      </div>
      <div className="composer">
        <input value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => event.key === "Enter" && send()} placeholder="Type a message..." aria-label="Message" />
        <button onClick={send}>➤</button>
      </div>
    </div>
  );
}

function DatePlanner({ onSent }: { onSent: () => void }) {
  const [day, setDay] = useState("Sat");
  const [time, setTime] = useState("11:00 AM");
  const [mode, setMode] = useState("In Person");
  return (
    <div className="content date-planner">
      <Brand compact />
      <p className="eyebrow">GOOD CONVERSATIONS · BRIGHTER BEGINNINGS</p>
      <h2>Plan Your First Date</h2>
      <p className="subhead">Keep it easy. Coffee, conversation, no pressure.</p>
      <div className="venue-card">
        <div className="venue-photo">
          <Image src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=85" alt="Coffee shop" fill sizes="360px" />
        </div>
        <div><small>SUGGESTED VENUE</small><h3>A cozy coffee date</h3><p>Great coffee, relaxed atmosphere, easy first conversation.</p><b>📍 Laguna Beach, CA</b></div>
      </div>
      <Picker title="Select day" values={["Fri", "Sat", "Sun", "Mon"]} selected={day} setSelected={setDay} />
      <Picker title="Select time" values={["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"]} selected={time} setSelected={setTime} />
      <Picker title="How would you like to meet?" values={["In Person", "Video Call"]} selected={mode} setSelected={setMode} />
      <button className="primary sticky-action" onClick={onSent}>Send Invite <span>→</span></button>
    </div>
  );
}

function Picker({ title, values, selected, setSelected }: { title: string; values: string[]; selected: string; setSelected: (value: string) => void }) {
  return (
    <section className="picker">
      <h3>{title}</h3>
      <div>{values.map((value) => <button key={value} onClick={() => setSelected(value)} className={selected === value ? "selected" : ""}>{value}</button>)}</div>
    </section>
  );
}

function Safety() {
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
      <button className="primary">Verify Now <span>→</span></button>
    </div>
  );
}

function Gold() {
  return (
    <div className="content gold">
      <Brand compact />
      <p className="eyebrow">MORE POSSIBILITIES · A BRIGHTER TOMORROW</p>
      <h2>Upgrade to <em>Saffron Gold</em></h2>
      <div className="gold-benefits">
        {["Unlimited likes", "Advanced filters", "Travel mode", "See who liked you", "Priority matching"].map((item, i) => <div key={item}><span>{["∞","☷","✈","◉","★"][i]}</span><b>{item}</b></div>)}
      </div>
      <div className="plans">
        <button><small>1 MONTH</small><b>$19.99</b><span>/ month</span></button>
        <button className="popular"><em>MOST POPULAR</em><small>6 MONTHS</small><b>$12.99</b><span>/ month</span></button>
        <button><small>12 MONTHS</small><b>$8.99</b><span>/ month</span></button>
      </div>
      <button className="primary">Start Premium <span>→</span></button>
      <p className="fineprint">Demo only · no payment is processed</p>
    </div>
  );
}

function Settings({ onSafety, onGold }: { onSafety: () => void; onGold: () => void }) {
  return (
    <div className="content settings">
      <Brand compact />
      <div className="settings-profile">
        <div className="avatar"><Image src={atiPhoto} alt="Ati" fill sizes="96px" /></div>
        <div><h2>Ati</h2><p>Orange County, CA</p><button>Edit profile</button></div>
      </div>
      {[
        ["♡", "My Preferences", "Dating goals, lifestyle, culture"],
        ["☷", "Match Preferences", "Age, location, values"],
        ["♧", "Notifications", "Messages, matches, updates"],
      ].map(([icon, title, copy]) => <div className="settings-row" key={title}><span>{icon}</span><div><b>{title}</b><p>{copy}</p></div><i>›</i></div>)}
      <button className="promo-row" onClick={onSafety}><span>✓</span><div><b>Privacy & Safety</b><p>Verification, visibility, reporting</p></div><i>›</i></button>
      <button className="promo-row gold-row" onClick={onGold}><span>★</span><div><b>Saffron Gold</b><p>See premium demo features</p></div><i>›</i></button>
      <div className="settings-row"><span>◎</span><div><b>Language</b><p>English · فارسی coming soon</p></div><i>›</i></div>
      <div className="motto">LOVE HAS A WIDER HORIZON</div>
    </div>
  );
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [index, setIndex] = useState(0);
  const [likedDaniel, setLikedDaniel] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);

  useEffect(() => {
    setLikedDaniel(window.localStorage.getItem("saffron-liked-daniel") === "true");
  }, []);

  const profile = profiles[index % profiles.length];

  const nav = useMemo<Screen | undefined>(() => {
    if (["discover", "matches", "chat", "settings"].includes(screen)) return screen;
    if (["detail", "matched", "date"].includes(screen)) return "discover";
    if (["safety", "gold"].includes(screen)) return "settings";
    return undefined;
  }, [screen]);

  function like(profileId: string) {
    if (profileId === "daniel") {
      setLikedDaniel(true);
      window.localStorage.setItem("saffron-liked-daniel", "true");
      setScreen("matched");
      return;
    }
    setIndex((current) => current + 1);
  }

  function sendInvite() {
    setInviteSent(true);
    setScreen("chat");
  }

  return (
    <PhoneShell nav={nav} onNavigate={setScreen}>
      {screen === "welcome" && <Welcome onStart={() => setScreen("onboarding")} />}
      {screen === "onboarding" && <Onboarding onDone={() => setScreen("discover")} />}
      {screen === "discover" && <Discover profile={profile} onPass={() => setIndex((current) => current + 1)} onOpen={() => setScreen("detail")} onLike={() => like(profile.id)} />}
      {screen === "detail" && <Detail profile={profile} onBack={() => setScreen("discover")} onLike={() => like(profile.id)} />}
      {screen === "matched" && <MatchMoment onMessage={() => setScreen("chat")} onBrowse={() => setScreen("discover")} />}
      {screen === "matches" && <Matches onChat={() => setScreen("chat")} />}
      {screen === "chat" && (
        <>
          {inviteSent && <div className="toast">✓ Date invite sent to Daniel</div>}
          <Chat onDate={() => setScreen("date")} />
        </>
      )}
      {screen === "date" && <DatePlanner onSent={sendInvite} />}
      {screen === "safety" && <Safety />}
      {screen === "gold" && <Gold />}
      {screen === "settings" && <Settings onSafety={() => setScreen("safety")} onGold={() => setScreen("gold")} />}
      {likedDaniel && screen === "discover" && <button className="floating-match" onClick={() => setScreen("matches")}>♥ Daniel matched</button>}
    </PhoneShell>
  );
}
