import { useMemo, useState } from "react";

type League = "Premier League" | "La Liga";
type Position = "GK" | "DF" | "MF" | "FW";
type Team = { name: string; korean: string; league: League; crest: string; color: string; city: string };
type Player = { id: number; name: string; korean: string; number: number; position: Position; x: number; y: number; image: string; age: number; nation: string; apps: number; goals: number; assists: number };

const teams: Team[] = [
  { name: "Arsenal", korean: "아스널", league: "Premier League", crest: "https://crests.football-data.org/57.png", color: "#e63946", city: "North London" },
  { name: "Manchester City", korean: "맨체스터 시티", league: "Premier League", crest: "https://crests.football-data.org/65.png", color: "#6cabdd", city: "Manchester" },
  { name: "Liverpool", korean: "리버풀", league: "Premier League", crest: "https://crests.football-data.org/64.png", color: "#c8102e", city: "Merseyside" },
  { name: "Chelsea", korean: "첼시", league: "Premier League", crest: "https://crests.football-data.org/61.png", color: "#034694", city: "West London" },
  { name: "Tottenham Hotspur", korean: "토트넘 홋스퍼", league: "Premier League", crest: "https://crests.football-data.org/73.png", color: "#e7e8ea", city: "North London" },
  { name: "Manchester United", korean: "맨체스터 유나이티드", league: "Premier League", crest: "https://crests.football-data.org/66.png", color: "#da291c", city: "Manchester" },
  { name: "Real Madrid", korean: "레알 마드리드", league: "La Liga", crest: "https://crests.football-data.org/86.png", color: "#f7f7f7", city: "Madrid" },
  { name: "FC Barcelona", korean: "바르셀로나", league: "La Liga", crest: "https://crests.football-data.org/81.png", color: "#a50044", city: "Barcelona" },
  { name: "Atlético Madrid", korean: "아틀레티코 마드리드", league: "La Liga", crest: "https://crests.football-data.org/78.png", color: "#d71920", city: "Madrid" },
  { name: "Sevilla", korean: "세비야", league: "La Liga", crest: "https://crests.football-data.org/559.png", color: "#d71920", city: "Seville" },
  { name: "Villarreal", korean: "비야레알", league: "La Liga", crest: "https://crests.football-data.org/94.png", color: "#ffe667", city: "Villarreal" },
  { name: "Athletic Club", korean: "아틀레틱 클루브", league: "La Liga", crest: "https://crests.football-data.org/77.png", color: "#ee2523", city: "Bilbao" },
];

const faces = [32, 52, 11, 36, 53, 54, 68, 71, 75, 8, 3, 14, 18, 22, 28, 40, 46, 58];
const photo = (i: number) => `https://randomuser.me/api/portraits/men/${faces[i % faces.length]}.jpg`;

const starters: Player[] = [
  { id: 1, name: "David Raya", korean: "다비드 라야", number: 22, position: "GK", x: 50, y: 88, image: photo(0), age: 29, nation: "Spain", apps: 31, goals: 0, assists: 1 },
  { id: 2, name: "J. Timber", korean: "팀버", number: 12, position: "DF", x: 16, y: 68, image: photo(1), age: 23, nation: "Netherlands", apps: 24, goals: 1, assists: 2 },
  { id: 3, name: "Gabriel", korean: "가브리엘", number: 6, position: "DF", x: 38, y: 69, image: photo(2), age: 27, nation: "Brazil", apps: 29, goals: 3, assists: 1 },
  { id: 4, name: "W. Saliba", korean: "살리바", number: 2, position: "DF", x: 62, y: 69, image: photo(3), age: 24, nation: "France", apps: 30, goals: 2, assists: 0 },
  { id: 5, name: "B. White", korean: "화이트", number: 4, position: "DF", x: 84, y: 68, image: photo(4), age: 27, nation: "England", apps: 26, goals: 2, assists: 4 },
  { id: 6, name: "D. Rice", korean: "라이스", number: 41, position: "MF", x: 27, y: 47, image: photo(5), age: 26, nation: "England", apps: 31, goals: 4, assists: 7 },
  { id: 7, name: "M. Ødegaard", korean: "외데고르", number: 8, position: "MF", x: 50, y: 43, image: photo(6), age: 26, nation: "Norway", apps: 25, goals: 5, assists: 8 },
  { id: 8, name: "K. Havertz", korean: "하베르츠", number: 29, position: "MF", x: 73, y: 47, image: photo(7), age: 25, nation: "Germany", apps: 28, goals: 9, assists: 3 },
  { id: 9, name: "Martinelli", korean: "마르티넬리", number: 11, position: "FW", x: 20, y: 20, image: photo(8), age: 23, nation: "Brazil", apps: 27, goals: 7, assists: 5 },
  { id: 10, name: "G. Jesus", korean: "제주스", number: 9, position: "FW", x: 50, y: 15, image: photo(9), age: 28, nation: "Brazil", apps: 20, goals: 6, assists: 3 },
  { id: 11, name: "B. Saka", korean: "사카", number: 7, position: "FW", x: 80, y: 20, image: photo(10), age: 23, nation: "England", apps: 29, goals: 14, assists: 11 },
];

const substitutes: Player[] = [
  { id: 12, name: "Neto", korean: "네투", number: 32, position: "GK", x: 0, y: 0, image: photo(11), age: 35, nation: "Brazil", apps: 5, goals: 0, assists: 0 },
  { id: 13, name: "Kiwior", korean: "키비오르", number: 15, position: "DF", x: 0, y: 0, image: photo(12), age: 25, nation: "Poland", apps: 16, goals: 1, assists: 1 },
  { id: 14, name: "Zinchenko", korean: "진첸코", number: 17, position: "DF", x: 0, y: 0, image: photo(13), age: 28, nation: "Ukraine", apps: 18, goals: 1, assists: 2 },
  { id: 15, name: "Jorginho", korean: "조르지뉴", number: 20, position: "MF", x: 0, y: 0, image: photo(14), age: 33, nation: "Italy", apps: 21, goals: 0, assists: 3 },
  { id: 16, name: "F. Vieira", korean: "비에이라", number: 21, position: "MF", x: 0, y: 0, image: photo(15), age: 24, nation: "Portugal", apps: 14, goals: 2, assists: 4 },
  { id: 17, name: "R. Nelson", korean: "넬슨", number: 24, position: "FW", x: 0, y: 0, image: photo(16), age: 25, nation: "England", apps: 12, goals: 3, assists: 1 },
  { id: 18, name: "E. Nketiah", korean: "은케티아", number: 14, position: "FW", x: 0, y: 0, image: photo(17), age: 25, nation: "England", apps: 19, goals: 5, assists: 2 },
];

function Icon({ name }: { name: "search" | "back" | "chevron" | "star" | "users" | "close" }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    back: <path d="m15 18-6-6 6-6"/>,
    chevron: <path d="m6 9 6 6 6-6"/>,
    star: <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/>,
    users: <><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2"/><path d="M3 19c0-3 2.7-5 6-5s6 2 6 5M15 14c3 0 5 1.8 5 4"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

function Home({ onSelect, onDub }: { onSelect: (team: Team) => void; onDub: () => void }) {
  const [league, setLeague] = useState<League>("Premier League");
  const [query, setQuery] = useState("");
  const visible = teams.filter(t => t.league === league && `${t.name} ${t.korean}`.toLowerCase().includes(query.toLowerCase()));
  return <main className="home page-enter">
    <header className="topbar">
      <a className="brand" href="#" onClick={e => e.preventDefault()}><span className="brand-ball">F</span><span>FINAL<br/><b>WHISTLE</b></span></a>
      <nav><button className="active">Clubs</button><button onClick={onDub}>한국어 더빙</button></nav>
      <button className="season-pill">2024/25 Season</button>
    </header>
    <section className="hero-copy">
      <span className="eyebrow">EUROPE'S ELITE • FOOTBALL STUDIO</span>
      <h1>Find your club.<br/><em>Feel every match.</em></h1>
      <p>Explore lineups, player form and matchday intelligence<br/>from England and Spain's biggest clubs.</p>
    </section>
    <section className="club-browser glass">
      <div className="browser-heading">
        <div><span className="overline">CLUB DIRECTORY</span><h2>Choose your team</h2></div>
        <label className="search"><Icon name="search"/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="팀명 또는 club name 검색"/><kbd>⌘ K</kbd></label>
      </div>
      <div className="league-tabs">
        {(["Premier League", "La Liga"] as League[]).map(item => <button key={item} className={league === item ? "active" : ""} onClick={() => setLeague(item)}><span className={`league-mark ${item === "La Liga" ? "liga" : ""}`}>{item === "La Liga" ? "L" : "PL"}</span>{item}<small>{teams.filter(t => t.league === item).length} clubs</small></button>)}
      </div>
      <div className="team-grid">
        {visible.map((team, i) => <button className="team-card" style={{"--club": team.color, "--delay": `${i * 45}ms`} as React.CSSProperties} key={team.name} onClick={() => onSelect(team)}>
          <span className="crest-halo"/><img src={team.crest} alt=""/><span className="team-copy"><strong>{team.name}</strong><small>{team.korean} · {team.city}</small></span><span className="card-arrow">↗</span>
        </button>)}
        {!visible.length && <div className="empty">No clubs found. Try another name.</div>}
      </div>
    </section>
    <footer><span>12 FEATURED CLUBS</span><span>DEMO SEASON DATA</span><span>선수·기록은 예시 데이터입니다</span></footer>
  </main>;
}

function PlayerProfile({ player, onClose }: { player: Player; onClose: () => void }) {
  return <div className="modal-wrap" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
    <article className="player-modal">
      <button className="modal-close" onClick={onClose} aria-label="Close"><Icon name="close"/></button>
      <div className="profile-hero"><span className="profile-number">{player.number}</span><img src={player.image} alt={player.name}/><div><small>ARSENAL • {player.position}</small><h2>{player.name}</h2><p>{player.korean}</p></div></div>
      <div className="profile-facts"><span><small>AGE</small><b>{player.age}</b></span><span><small>NATIONALITY</small><b>{player.nation}</b></span><span><small>POSITION</small><b>{player.position}</b></span></div>
      <h3>Season performance <span>2024/25</span></h3>
      <div className="profile-stats"><span><b>{player.apps}</b><small>APPEARANCES</small></span><span><b>{player.goals}</b><small>GOALS</small></span><span><b>{player.assists}</b><small>ASSISTS</small></span><span><b>{(6.7 + player.goals / 20).toFixed(1)}</b><small>RATING</small></span></div>
      <div className="form-chart"><div/><div/><div/><div/><div/><div/><div/></div>
      <p className="api-note">Player details are ready to connect to your football data provider.</p>
    </article>
  </div>;
}

function Pitch({ onPlayer }: { onPlayer: (p: Player) => void }) {
  return <div className="pitch-card glass-panel">
    <div className="panel-title"><div><span>STARTING XI</span><h3>Starting lineup <small>4–3–3</small></h3></div><span className="live"><i/> DEMO</span></div>
    <div className="pitch">
      <div className="pitch-lines"><i className="center-line"/><i className="center-circle"/><i className="box top"/><i className="box bottom"/></div>
      {starters.map(player => <button key={player.id} className="pitch-player" style={{left: `${player.x}%`, top: `${player.y}%`}} onClick={() => onPlayer(player)}>
        <span className="player-photo"><img src={player.image} alt=""/><b>{player.number}</b></span><span className="player-tag">{player.name}</span>
      </button>)}
    </div>
  </div>;
}

function TeamInfo() {
  const results = [{team:"Tottenham", score:"2 – 1", state:"W"},{team:"Chelsea",score:"1 – 1",state:"D"},{team:"Man City",score:"0 – 1",state:"L"}];
  return <aside className="info-card glass-panel">
    <div className="panel-title"><div><span>CLUB OVERVIEW</span><h3>Team information</h3></div><span className="rank">#2</span></div>
    <div className="manager"><img src={photo(6)} alt=""/><span><small>MANAGER</small><b>Mikel Arteta</b></span><span><small>HOME GROUND</small><b>Emirates Stadium</b></span></div>
    <div className="season-stats"><span><small>POSITION</small><b>2nd</b><em>+1</em></span><span><small>RECORD</small><b>22–5–6</b></span><span><small>GOAL DIFF</small><b>+43</b></span></div>
    <div className="section-label"><b>Recent form</b><span>LAST 5 <i>W</i><i>W</i><i>D</i><i>L</i><i>W</i></span></div>
    <div className="results">{results.map(r => <div key={r.team}><span className="opponent-mark">{r.team[0]}</span><b>vs {r.team}</b><strong>{r.score}</strong><em className={r.state}>{r.state}</em></div>)}</div>
    <div className="next-match"><div><small>NEXT MATCH • SAT 15:00</small><b>Arsenal <span>vs</span> Everton</b></div><span className="countdown"><small>KICK OFF IN</small><b>2D : 14H</b></span></div>
  </aside>;
}

function TeamDetail({ team, onBack }: { team: Team; onBack: () => void }) {
  const [subsOpen, setSubsOpen] = useState(false);
  const [filter, setFilter] = useState<"All" | Position>("All");
  const [selected, setSelected] = useState<Player | null>(null);
  const visibleSubs = useMemo(() => substitutes.filter(p => filter === "All" || p.position === filter), [filter]);
  return <main className="detail page-enter">
    <header className="detail-header">
      <button className="round-back" onClick={onBack}><Icon name="back"/></button>
      <div className="detail-club"><img src={team.crest} alt=""/><div><small>{team.league}</small><h1>{team.name}</h1><p>{team.korean}</p></div></div>
      <nav>{["Overview","Squad","Season","Results","Fixtures"].map(x => <button className={x === "Squad" ? "active" : ""} key={x}>{x}</button>)}</nav>
      <button className="support"><Icon name="star"/> FOLLOW CLUB</button>
    </header>
    <p className="demo-note">라인업과 선수 정보는 Arsenal 기준 디자인 예시입니다. 실제 선수 사진·최신 기록이 아닙니다.</p><section className="detail-grid"><Pitch onPlayer={setSelected}/><TeamInfo/></section>
    <section className={`subs-section ${subsOpen ? "open" : ""}`}>
      <button className="subs-toggle" onClick={() => setSubsOpen(v => !v)} aria-expanded={subsOpen}><span><Icon name="users"/><b>Substitutes</b><small>{substitutes.length} PLAYERS</small></span><Icon name="chevron"/></button>
      <div className="subs-content"><div className="subs-toolbar"><div><span>BENCH</span><h3>Available substitutes</h3></div><div className="filters">{(["All","GK","DF","MF","FW"] as const).map(x => <button key={x} className={filter === x ? "active" : ""} onClick={() => setFilter(x)}>{x}</button>)}</div></div>
        <div className="subs-grid">{visibleSubs.map(p => <button key={p.id} className="sub-player" onClick={() => setSelected(p)}><span className="sub-number">{p.number}</span><img src={p.image} alt=""/><span><b>{p.name}</b><small>{p.korean}</small></span><em>{p.position}</em></button>)}</div>
      </div>
    </section>
    {selected && <PlayerProfile player={selected} onClose={() => setSelected(null)}/>} 
  </main>;
}

export default function App() {
  const [team, setTeam] = useState<Team | null>(null);
  const [dubOpen,setDubOpen]=useState(false);
  const [dubLoaded,setDubLoaded]=useState(false);
  const openDub=()=>{setDubLoaded(true);setDubOpen(true)};
  const closeDub=()=>{const frame=document.querySelector<HTMLIFrameElement>('#dubbing-frame');frame?.contentDocument?.querySelectorAll('video').forEach(v=>v.pause());setDubOpen(false)};
  return <div className="app-shell"><div className="stadium-bg"/><div className="atmosphere"/>{team ? <TeamDetail team={team} onBack={() => setTeam(null)}/> : <Home onSelect={setTeam} onDub={openDub}/>}<button className="dub-launcher" onClick={openDub}>▶ 한국어 더빙 스튜디오</button>{dubLoaded&&<section className="dub-overlay" hidden={!dubOpen} aria-label="한국어 더빙 스튜디오"><header><span>FINAL WHISTLE / DUBBING LAB</span><button onClick={closeDub}>닫기 ×</button></header><iframe id="dubbing-frame" title="영상 업로드 및 한국어 더빙" src="/dubbing"/></section>}</div>;
}
