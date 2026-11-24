import { useMemo, useState } from "react";

type League = "프리미어리그" | "라리가";
type Position = "골키퍼" | "수비수" | "미드필더" | "공격수";
type Team = { name: string; korean: string; league: League; crest: string; color: string; city: string };
type Player = { id: number; name: string; korean: string; number: number; position: Position; x: number; y: number; image: string; age: number; nation: string; apps: number; goals: number; assists: number };

const teams: Team[] = [
  { name: "아스널", korean: "아스널", league: "프리미어리그", crest: "https://crests.football-data.org/57.png", color: "#e63946", city: "북런던" },
  { name: "맨체스터 시티", korean: "맨체스터 시티", league: "프리미어리그", crest: "https://crests.football-data.org/65.png", color: "#6cabdd", city: "맨체스터" },
  { name: "리버풀", korean: "리버풀", league: "프리미어리그", crest: "https://crests.football-data.org/64.png", color: "#c8102e", city: "머지사이드" },
  { name: "첼시", korean: "첼시", league: "프리미어리그", crest: "https://crests.football-data.org/61.png", color: "#034694", city: "서런던" },
  { name: "토트넘 홋스퍼", korean: "토트넘 홋스퍼", league: "프리미어리그", crest: "https://crests.football-data.org/73.png", color: "#e7e8ea", city: "북런던" },
  { name: "맨체스터 유나이티드", korean: "맨체스터 유나이티드", league: "프리미어리그", crest: "https://crests.football-data.org/66.png", color: "#da291c", city: "맨체스터" },
  { name: "레알 마드리드", korean: "레알 마드리드", league: "라리가", crest: "https://crests.football-data.org/86.png", color: "#f7f7f7", city: "마드리드" },
  { name: "바르셀로나", korean: "바르셀로나", league: "라리가", crest: "https://crests.football-data.org/81.png", color: "#a50044", city: "바르셀로나" },
  { name: "아틀레티코 마드리드", korean: "아틀레티코 마드리드", league: "라리가", crest: "https://crests.football-data.org/78.png", color: "#d71920", city: "마드리드" },
  { name: "세비야", korean: "세비야", league: "라리가", crest: "https://crests.football-data.org/559.png", color: "#d71920", city: "세비야" },
  { name: "비야레알", korean: "비야레알", league: "라리가", crest: "https://crests.football-data.org/94.png", color: "#ffe667", city: "비야레알" },
  { name: "아틀레틱 클루브", korean: "아틀레틱 클루브", league: "라리가", crest: "https://crests.football-data.org/77.png", color: "#ee2523", city: "빌바오" },
];

const faces = [32, 52, 11, 36, 53, 54, 68, 71, 75, 8, 3, 14, 18, 22, 28, 40, 46, 58];
const photo = (i: number) => `https://randomuser.me/api/portraits/men/${faces[i % faces.length]}.jpg`;

const starters: Player[] = [
  { id: 1, name: "David Raya", korean: "다비드 라야", number: 22, position: "골키퍼", x: 50, y: 88, image: photo(0), age: 29, nation: "스페인", apps: 31, goals: 0, assists: 1 },
  { id: 2, name: "J. Timber", korean: "팀버", number: 12, position: "수비수", x: 16, y: 68, image: photo(1), age: 23, nation: "네덜란드", apps: 24, goals: 1, assists: 2 },
  { id: 3, name: "Gabriel", korean: "가브리엘", number: 6, position: "수비수", x: 38, y: 69, image: photo(2), age: 27, nation: "브라질", apps: 29, goals: 3, assists: 1 },
  { id: 4, name: "W. Saliba", korean: "살리바", number: 2, position: "수비수", x: 62, y: 69, image: photo(3), age: 24, nation: "프랑스", apps: 30, goals: 2, assists: 0 },
  { id: 5, name: "B. White", korean: "화이트", number: 4, position: "수비수", x: 84, y: 68, image: photo(4), age: 27, nation: "잉글랜드", apps: 26, goals: 2, assists: 4 },
  { id: 6, name: "D. Rice", korean: "라이스", number: 41, position: "미드필더", x: 27, y: 47, image: photo(5), age: 26, nation: "잉글랜드", apps: 31, goals: 4, assists: 7 },
  { id: 7, name: "M. Ødegaard", korean: "외데고르", number: 8, position: "미드필더", x: 50, y: 43, image: photo(6), age: 26, nation: "노르웨이", apps: 25, goals: 5, assists: 8 },
  { id: 8, name: "K. Havertz", korean: "하베르츠", number: 29, position: "미드필더", x: 73, y: 47, image: photo(7), age: 25, nation: "독일", apps: 28, goals: 9, assists: 3 },
  { id: 9, name: "Martinelli", korean: "마르티넬리", number: 11, position: "공격수", x: 20, y: 20, image: photo(8), age: 23, nation: "브라질", apps: 27, goals: 7, assists: 5 },
  { id: 10, name: "G. Jesus", korean: "제주스", number: 9, position: "공격수", x: 50, y: 15, image: photo(9), age: 28, nation: "브라질", apps: 20, goals: 6, assists: 3 },
  { id: 11, name: "B. Saka", korean: "사카", number: 7, position: "공격수", x: 80, y: 20, image: photo(10), age: 23, nation: "잉글랜드", apps: 29, goals: 14, assists: 11 },
];

const substitutes: Player[] = [
  { id: 12, name: "Neto", korean: "네투", number: 32, position: "골키퍼", x: 0, y: 0, image: photo(11), age: 35, nation: "브라질", apps: 5, goals: 0, assists: 0 },
  { id: 13, name: "Kiwior", korean: "키비오르", number: 15, position: "수비수", x: 0, y: 0, image: photo(12), age: 25, nation: "폴란드", apps: 16, goals: 1, assists: 1 },
  { id: 14, name: "Zinchenko", korean: "진첸코", number: 17, position: "수비수", x: 0, y: 0, image: photo(13), age: 28, nation: "우크라이나", apps: 18, goals: 1, assists: 2 },
  { id: 15, name: "Jorginho", korean: "조르지뉴", number: 20, position: "미드필더", x: 0, y: 0, image: photo(14), age: 33, nation: "이탈리아", apps: 21, goals: 0, assists: 3 },
  { id: 16, name: "F. Vieira", korean: "비에이라", number: 21, position: "미드필더", x: 0, y: 0, image: photo(15), age: 24, nation: "포르투갈", apps: 14, goals: 2, assists: 4 },
  { id: 17, name: "R. Nelson", korean: "넬슨", number: 24, position: "공격수", x: 0, y: 0, image: photo(16), age: 25, nation: "잉글랜드", apps: 12, goals: 3, assists: 1 },
  { id: 18, name: "E. Nketiah", korean: "은케티아", number: 14, position: "공격수", x: 0, y: 0, image: photo(17), age: 25, nation: "잉글랜드", apps: 19, goals: 5, assists: 2 },
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

function PlayerProfile({ player, onClose }: { player: Player; onClose: () => void }) {
  return <div className="modal-wrap" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
    <article className="player-modal">
      <button className="modal-close" onClick={onClose} aria-label="닫기"><Icon name="close"/></button>
      <div className="profile-hero"><span className="profile-number">{String(player.number).padStart(2,"0")}</span><img src={player.image} alt={player.korean}/><div><small>아스널 • {player.position}</small><h2>{player.korean}</h2><p>{player.korean}</p></div></div>
      <div className="profile-facts"><span><small>나이</small><b>{player.age}</b></span><span><small>국적</small><b>{player.nation}</b></span><span><small>포지션</small><b>{player.position}</b></span></div>
      <h3>2024/25 시즌 퍼포먼스 <span>프리미어리그</span></h3>
      <div className="profile-stats"><span><b>{player.apps}</b><small>출전 경기</small></span><span><b>{player.goals}</b><small>득점</small></span><span><b>{player.assists}</b><small>도움</small></span><span><b>{(6.7 + player.goals / 20).toFixed(1)}</b><small>평점</small></span></div>
      <div className="form-chart"><div/><div/><div/><div/><div/><div/><div/></div>
      <p className="api-note">축구 데이터 서비스 연결을 위한 프로토타입 데이터입니다.</p>
    </article>
  </div>;
}

function GlobalHeader({ page, setPage, resetTeam }: { page: Page; setPage: (p: Page) => void; resetTeam: () => void }) {
  const menus: { id: Page; label: string; sub: string }[] = [
    { id: "my", label: "내 팀 응원하기", sub: "나의 팀" },
    { id: "league", label: "리그 & 팀", sub: "팀 탐색" },
    { id: "live", label: "실시간 중계", sub: "경기 중계" },
    { id: "ai", label: "인공지능 검색", sub: "축구 분석" },
    { id: "predict", label: "승부 예측", sub: "경기 예측" },
  ];
  const go = (id: Page) => { resetTeam(); setPage(id); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return <header className="global-header">
    <button className="brand" onClick={() => go("my")}><span className="brand-ball">F</span><span>파이널<br/><b>휘슬</b></span></button>
    <nav>{menus.map(m => <button key={m.id} className={page === m.id ? "active" : ""} onClick={() => go(m.id)}><small>{m.sub}</small>{m.label}</button>)}<a href="/highlights">공식 하이라이트</a></nav>
    <button className="user-pill"><span>팬</span><b>지훈 님</b><small>내 정보</small></button>
  </header>;
}

function PageHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="page-heading"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div><span className="season-copy">2024/25 시즌 · 예시 데이터</span></div>;
}

const standings = [
  ["리버풀", 29, 70, "+42"], ["아스널", 28, 61, "+35"], ["노팅엄 포리스트", 29, 57, "+19"], ["첼시", 28, 52, "+20"], ["맨체스터 시티", 29, 51, "+18"], ["뉴캐슬 유나이티드", 28, 50, "+12"], ["브라이턴", 29, 47, "+6"], ["애스턴 빌라", 29, 45, "+3"],
] as const;

function MyTeamPage({ onLeague }: { onLeague: () => void }) {
  return <div className="content-page page-enter">
    <PageHeading eyebrow="내 팀 경기날" title="내 팀 응원하기" description="지훈 님, 오늘도 아스널과 함께 뜨겁게."/>
    <div className="dashboard-grid">
      <section>
        <div className="club-hero glass-panel"><div className="club-hero-copy"><span>나의 팀 · 프리미어리그</span><h2>함께 외쳐요,<br/><em>아스널 파이팅!</em></h2><p>아스널 · 아스널 구단</p></div><img src={teams[0].crest} alt="아스널"/><div className="club-origin"><strong>1886</strong><small>북런던</small></div></div>
        <div className="metric-row"><Metric label="리그 순위" value="2위" note="지난 라운드와 동일"/><Metric label="승점" value="61" note="28경기 · 17승 10무 1패"/><Metric label="최근 5경기" value="승 승 무 승 승" note="흔들림 없는 상승세" accent/></div>
        <div className="section-head"><h3>다가오는 경기</h3><button onClick={onLeague}>전체 일정 →</button></div>
        <div className="fixture glass-panel"><span><small>04.02 수 · 03:45 한국시간</small><b>아스널 <em>대</em> 풀럼</b></span><strong>홈경기</strong><button>경기 정보 →</button></div>
      </section>
      <aside className="dashboard-side">
        <div className="live-score glass-panel"><div><span className="live-badge"><i/> 예시 중계 73’</span><small>프리미어리그 · 29라운드</small></div><div className="score-line"><span><img src={teams[0].crest}/><b>아스널</b></span><strong>2 : 1</strong><span><img src={teams[3].crest}/><b>첼시</b></span></div><p>사카 23’ · 하베르츠 67’</p><button>실시간 텍스트 중계 보기 →</button></div>
        <StandingsCard compact onOpen={onLeague}/>
      </aside>
    </div>
  </div>;
}

function Metric({ label, value, note, accent = false }: { label: string; value: string; note: string; accent?: boolean }) {
  return <div className="metric glass-panel"><small>{label}</small><strong className={accent ? "accent" : ""}>{value}</strong><span>{note}</span></div>;
}

function StandingsCard({ compact = false, onOpen }: { compact?: boolean; onOpen?: () => void }) {
  return <div className={`standings-card glass-panel ${compact ? "compact" : ""}`}><div className="section-head"><h3>리그 순위</h3>{onOpen && <button onClick={onOpen}>전체 보기 →</button>}</div>{standings.slice(0, compact ? 5 : 8).map((r,i) => <div className={`standing-row ${r[0] === "아스널" ? "mine" : ""}`} key={r[0]}><b>{String(i+1).padStart(2,"0")}</b><span>{r[0]}{r[0] === "아스널" && <em>내 정보</em>}</span><small>{r[1]}경기</small><strong>{r[2]}</strong></div>)}</div>;
}

function LeaguePage({ onSelect }: { onSelect: (team: Team) => void }) {
  const [league, setLeague] = useState<League>("프리미어리그");
  const [query, setQuery] = useState("");
  const visible = teams.filter(t => t.league === league && `${t.name} ${t.korean}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="content-page page-enter"><PageHeading eyebrow="리그 살펴보기" title="리그의 흐름을 한눈에" description="순위부터 팀과 선수 정보까지, 원하는 깊이로 탐색하세요."/>
    <div className="league-controls"><div className="segmented">{(["프리미어리그","라리가"] as League[]).map(x => <button className={league === x ? "active" : ""} onClick={() => setLeague(x)}>{x}</button>)}</div><label className="search"><Icon name="search"/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="팀명 또는 club name 검색"/></label></div>
    <div className="league-layout"><section className="club-directory glass-panel"><div className="team-grid">{visible.map((team,i) => <button className="team-card" style={{"--club":team.color,"--delay":`${i*40}ms`} as React.CSSProperties} key={team.korean} onClick={() => onSelect(team)}><span className="crest-halo"/><img src={team.crest} alt=""/><span className="team-copy"><strong>{team.korean}</strong><small>{team.korean} · {team.city}</small></span><span className="card-arrow">↗</span></button>)}</div></section><aside><StandingsCard/><div className="insight-card glass-panel"><span>MATCHWEEK 29</span><h3>순위 경쟁은<br/>아직 끝나지 않았다.</h3><strong>9 PTS</strong><p>선두와의 승점 차. 남은 일정을 확인하세요.</p></div></aside></div>
  </div>;
}

function MiniPitch() {
  return <div className="mini-pitch"><div className="pitch-lines"><i className="center-line"/><i className="center-circle"/><i className="box top"/><i className="box bottom"/></div>{starters.map(p => <span className="mini-player" style={{left:`${p.x}%`,top:`${p.y}%`}} key={p.id}><b>{p.number}</b><small>{p.korean}</small></span>)}</div>;
}

function LivePage() {
  const events = [["73’","공격","사카의 크로스, 골문 앞에서 수비가 걷어냅니다."],["70’","교체","첼시 선수 교체: 네투 교체 아웃 · 산초 교체 투입"],["67’","득점","골! 하베르츠, 아스널이 다시 앞서갑니다!"],["61’","경고","카이세도에게 옐로카드가 주어집니다."],["51’","득점","팔머의 동점골, 승부는 다시 원점으로."]];
  return <div className="content-page page-enter"><PageHeading eyebrow="예시 중계 경기 중계" title="경기의 순간을 놓치지 마세요" description="실시간 스코어, 주요 장면과 포메이션을 한 화면에서."/>
    <div className="date-strip">{["03.14 금","03.15 토","03.16 일 · 오늘","03.17 월","날짜 선택 ↓"].map((d,i)=><button className={i===2?"active":""}>{d}</button>)}</div>
    <div className="match-hero glass-panel"><small>프리미어리그 · 29라운드 · 에미레이츠 스타디움</small><span className="live-badge"><i/> 예시 중계 73’</span><div><span><img src={teams[0].crest}/><b>아스널</b><small>사카 23’ · 하베르츠 67’</small></span><strong>2 : 1</strong><span><img src={teams[3].crest}/><b>첼시</b><small>팔머 51’</small></span></div></div>
    <div className="live-layout"><section className="commentary glass-panel"><div className="section-head"><h3>실시간 중계</h3><span className="updating"><i/> 예시 중계 데이터</span></div>{events.map((e,i)=><div className={`event ${i===2?"highlight":""}`}><strong>{e[0]}</strong><small>{e[1]}</small><p>{e[2]}<span>{i===2?"외데고르의 패스를 받아 침착하게 마무리합니다. 2–1":""}</span></p></div>)}</section><aside className="lineup-card glass-panel"><div className="section-head"><h3>선발 라인업</h3><span>아스널 · 4–3–3</span></div><MiniPitch/></aside></div>
  </div>;
}

function AiPage() {
  const [question,setQuestion]=useState("아스널의 최근 경기력과 다음 경기의 관전 포인트를 알려줘");
  const [answer,setAnswer]=useState(true);
  return <div className="content-page page-enter"><PageHeading eyebrow="인공지능 축구 분석" title="궁금한 축구, 더 깊게 알아보세요" description="리그 소식부터 내 팀의 전술까지, 근거와 함께 답해드려요."/>
    <div className="ai-filters"><button>프리미어리그 ↓</button><button>아스널 ↓</button></div>
    <div className="ai-prompt glass-panel"><input value={question} onChange={e=>setQuestion(e.target.value)}/><button onClick={()=>setAnswer(true)}>예시 분석 보기 ↑</button></div>
    <div className="suggestions"><span>추천 질문</span>{["이번 주 빅매치는?","사카의 시즌 기록은?","우승 경쟁 상황은?"].map(q=><button onClick={()=>{setQuestion(q);setAnswer(false)}}>{q}</button>)}</div>
    <div className="ai-layout"><article className="ai-answer glass-panel"><span>파이널 휘슬 분석</span>{answer?<><h2>아스널, 수비의 안정감이 다음 승부의 열쇠</h2><p>최근 5경기 4승 1무를 기록한 아스널은 안정적인 수비를 바탕으로 상위권 경쟁을 이어가고 있습니다. 다음 풀럼전에서는 세 가지를 주목하세요.</p>{["오른쪽 측면의 사카–외데고르 조합","세트피스에서 만드는 차이","빠른 역습에 대한 대비"].map((x,i)=><div className="answer-point"><b>0{i+1}</b><span><strong>{x}</strong><small>{i===0?"하프스페이스 침투와 컷백이 주요 공격 루트입니다.":i===1?"센터백의 제공권은 밀집 수비를 공략하는 무기입니다.":"공격 전개 후 볼을 잃었을 때의 수비 전환이 중요합니다."}</small></span></div>)}</>:<div className="ai-loading"><i/><p>질문을 분석하고 있습니다.<br/><small>예시 분석 보기 버튼을 눌러 결과를 확인하세요.</small></p></div>}</article><aside className="news-panel glass-panel"><div className="section-head"><h3>지금, 내 팀의 소식</h3><button>전체 보기 →</button></div>{[["구단 소식","아스널, 다음 홈경기 준비에 집중"],["전술","측면에서 찾는 공격의 해답"],["리그","치열해지는 챔피언스리그 진출 경쟁"]].map(n=><div><small>{n[0]}</small><b>{n[1]}</b><p>데이터와 현지 소식을 바탕으로 정리한 업데이트입니다.</p></div>)}</aside></div>
  </div>;
}

function PredictPage() {
  const [picks,setPicks]=useState<Record<number,string>>({0:"홈 승"});
  const fixtures=[{date:"04.02 수 · 03:45 한국시간",home:"아스널",away:"풀럼",odds:[64,22,14]},{date:"04.03 목 · 04:00 한국시간",home:"리버풀",away:"에버턴",odds:[71,18,11]},{date:"04.06 일 · 01:30 한국시간",home:"에버턴",away:"아스널",odds:[19,25,56]}];
  return <div className="content-page page-enter"><PageHeading eyebrow="경기 결과 예측" title="당신의 축구 감각을 증명하세요" description="다가오는 경기를 예측하고, 적중 포인트로 순위를 높여보세요."/>
    <div className="predict-layout"><section><div className="metric-row predict-metrics"><Metric label="나의 적중률" value="70%" note="14 / 20경기 적중" accent/><Metric label="누적 포인트" value="1,240 P" note="이번 주 +180 P"/><Metric label="나의 순위" value="28위" note="전체 1,204명 중"/></div><div className="predict-tabs"><button className="active">예측 가능한 경기</button><button>나의 예측 기록</button></div>{fixtures.map((f,i)=><div className="predict-card glass-panel"><small>{f.date}</small><div><h3>{f.home} <em>대</em> {f.away}</h3><span>{["홈 승","무승부","원정 승"].map((x,j)=><button className={picks[i]===x?"active":""} onClick={()=>setPicks({...picks,[i]:x})}>{x}</button>)}</span></div><div className="odds"><i style={{width:`${f.odds[0]}%`}}/><i style={{width:`${f.odds[1]}%`}}/><i style={{width:`${f.odds[2]}%`}}/></div><p>모델 예측 · 홈 {f.odds[0]}% · 무 {f.odds[1]}% · 원정 {f.odds[2]}%</p></div>)}<button className="save-picks">선택한 예측 저장하기 →</button></section><aside><div className="ranking glass-panel"><div className="section-head"><h3>주간 적중률 랭킹</h3><span>적중률 ↓</span></div>{[["풋볼마스터","90%","18/20"],["북런던의밤","85%","17/20"],["전술노트","85%","17/20"],["골든부츠","80%","16/20"],["라리가매니아","80%","16/20"],["지훈 님 · 나","70%","14/20"]].map((r,i)=><div className={i===5?"mine":""}><b>{i===5?28:String(i+1).padStart(2,"0")}</b><span>{r[0]}</span><strong>{r[1]}</strong><small>{r[2]}</small></div>)}</div><div className="prediction-note glass-panel"><h3>데이터는 힌트,<br/>선택은 당신의 몫.</h3><p>최근 전적과 홈 어드밴티지를 참고하되, 마지막 결정은 축구 감각을 믿어보세요.</p></div></aside></div>
  </div>;
}

function Pitch({ onPlayer }: { onPlayer: (p: Player) => void }) {
  return <div className="pitch-card glass-panel"><div className="panel-title"><div><span>선발 선수</span><h3>선발 라인업 <small>4–3–3</small></h3></div><span className="live"><i/> 예시 라인업</span></div><div className="pitch"><div className="pitch-lines"><i className="center-line"/><i className="center-circle"/><i className="box top"/><i className="box bottom"/></div>{starters.map(player => <button key={player.id} className="pitch-player" style={{left:`${player.x}%`,top:`${player.y}%`}} onClick={()=>onPlayer(player)}><span className="player-photo"><img src={player.image}/><b>{player.number}</b></span><span className="player-tag">{player.korean}</span></button>)}</div></div>;
}

function TeamInfo() {
  return <aside className="info-card glass-panel"><div className="panel-title"><div><span>구단 소개</span><h3>팀 정보</h3></div><span className="rank">#2</span></div><div className="manager"><img src={photo(6)}/><span><small>감독</small><b>미켈 아르테타</b></span><span><small>홈구장</small><b>에미레이츠 스타디움</b></span></div><div className="season-stats"><span><small>포지션</small><b>2위</b><em>+1</em></span><span><small>전적</small><b>22–5–6</b></span><span><small>득실차</small><b>+43</b></span></div><div className="section-label"><b>최근 경기 성적</b><span>최근 5경기 <i>W</i><i>W</i><i>D</i><i>L</i><i>W</i></span></div><div className="results">{[["Tottenham","2 – 1","W"],["첼시","1 – 1","D"],["Man City","0 – 1","L"]].map(r=><div><span className="opponent-mark">{r[0][0]}</span><b>대 {r[0]}</b><strong>{r[1]}</strong><em className={r[2]}>{r[2]}</em></div>)}</div><div className="next-match"><div><small>다음 경기 · 토요일 15:00</small><b>아스널 <span>대</span> 에버턴</b></div><span className="countdown"><small>경기 시작까지</small><b>2일 14시간</b></span></div></aside>;
}

function TeamDetail({ team, onBack }: { team: Team; onBack: () => void }) {
  const [subsOpen,setSubsOpen]=useState(false); const [filter,setFilter]=useState<"전체"|Position>("전체"); const [selected,setSelected]=useState<Player|null>(null);
  const visibleSubs=useMemo(()=>substitutes.filter(p=>filter==="전체"||p.position===filter),[filter]);
  return <div className="detail page-enter"><header className="detail-header"><button className="round-back" onClick={onBack}><Icon name="back"/></button><div className="detail-club"><img src={team.crest}/><div><small>{team.league}</small><h1>{team.korean}</h1><p>{team.korean}</p></div></div><nav>{["개요","선수단","시즌 기록","경기 결과","경기 일정"].map(x=><button className={x==="선수단"?"active":""}>{x}</button>)}</nav><button className="support"><Icon name="star"/> 구단 응원하기</button></header><section className="detail-grid"><Pitch onPlayer={setSelected}/><TeamInfo/></section><section className={`subs-section ${subsOpen?"open":""}`}><button className="subs-toggle" onClick={()=>setSubsOpen(v=>!v)}><span><Icon name="users"/><b>교체 선수</b><small>{substitutes.length} 명</small></span><Icon name="chevron"/></button><div className="subs-content"><div className="subs-toolbar"><div><span>교체 명단</span><h3>출전 가능한 교체 선수</h3></div><div className="filters">{(["전체","골키퍼","수비수","미드필더","공격수"] as const).map(x=><button className={filter===x?"active":""} onClick={()=>setFilter(x)}>{x}</button>)}</div></div><div className="subs-grid">{visibleSubs.map(p=><button className="sub-player" onClick={()=>setSelected(p)}><span className="sub-number">{p.number}</span><img src={p.image}/><span><b>{p.korean}</b><small>{p.korean}</small></span><em>{p.position}</em></button>)}</div></div></section>{selected&&<PlayerProfile player={selected} onClose={()=>setSelected(null)}/>}</div>;
}

type Page = "my" | "league" | "live" | "ai" | "predict";
export default function App() {
  const [page,setPage]=useState<Page>("my"); const [team,setTeam]=useState<Team|null>(null);
  const change=(p:Page)=>{setPage(p);setTeam(null)};
  return <div className="app-shell"><div className="stadium-bg"/><div className="atmosphere"/><GlobalHeader page={page} setPage={setPage} resetTeam={()=>setTeam(null)}/>{team?<TeamDetail team={team} onBack={()=>setTeam(null)}/>:<>{page==="my"&&<MyTeamPage onLeague={()=>change("league")}/>} {page==="league"&&<LeaguePage onSelect={setTeam}/>} {page==="live"&&<LivePage/>} {page==="ai"&&<AiPage/>} {page==="predict"&&<PredictPage/>}</>}</div>;
}
