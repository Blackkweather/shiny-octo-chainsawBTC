"use client";
import { useState, useEffect, useMemo } from "react";
import "./globals.css";

const FX = { EUR: 1, CHF: 1.04, USD: 0.92, GBP: 1.17, CAD: 0.68 };
const STAGES = [
  ["new", "New"], ["qualified", "Qualified"], ["contacted", "Contacted"],
  ["interested", "Interested"], ["meeting", "Meeting"], ["proposal", "Proposal"],
  ["won", "Won"], ["lost", "Lost"],
];
const PROB = { new: .05, qualified: .1, contacted: .15, interested: .35, meeting: .55, proposal: .7, won: 1, lost: 0 };

const SEED_DEALS = [
  { id: "nyota", name: "Nyota Agency", type: "SACEM automation", value: 490, cur: "EUR", stage: "interested", city: "FR", warm: true },
  { id: "twine", name: "Twine — indie-folk gig", type: "Music production", value: 750, cur: "USD", stage: "qualified", city: "Remote", warm: true },
  { id: "magnin", name: "Dr. Dominique Magnin", type: "Méd. esthétique", value: 1500, cur: "CHF", stage: "new", city: "Genève" },
  { id: "bayol", name: "Dr Jean-Charles Bayol", type: "Chirurgien esth.", value: 1500, cur: "CHF", stage: "new", city: "Genève" },
  { id: "leman", name: "Leman Aesthetic Clinic", type: "Chirurgie esth.", value: 1500, cur: "CHF", stage: "new", city: "Genève" },
  { id: "tobalem", name: "Clinique Tobalem", type: "Chirurgie esth.", value: 1500, cur: "CHF", stage: "contacted", city: "Genève" },
  { id: "pallas", name: "Schönheitsklinik Pallas", type: "Klinik", value: 1500, cur: "CHF", stage: "new", city: "Zürich" },
];
const CALLS = [
  { name: "Dr. Dominique Magnin", type: "Méd. esthétique", city: "Genève", ph: "+41788087111", s: 3 },
  { name: "Dr Jean-Charles Bayol", type: "Chirurgien esth.", city: "Genève", ph: "+41223358177", s: 3 },
  { name: "Dr Veber — Beauty Surgeon", type: "Chirurgien esth.", city: "Genève", ph: "+41227162727", s: 3 },
  { name: "Leman Aesthetic Clinic", type: "Chirurgie esth.", city: "Genève", ph: "+41223465956", s: 3 },
  { name: "Clinique Tobalem", type: "Chirurgie esth.", city: "Genève", ph: "+41223102815", s: 3 },
  { name: "Dr Dlimi", type: "Chirurgien esth.", city: "Genève", ph: "+41782162814", s: 3 },
  { name: "Clinique CMEGE", type: "Méd. esthétique", city: "Genève", ph: "+41223211122", s: 3 },
  { name: "Med'Esthetique", type: "Laser", city: "Genève", ph: "+41782498282", s: 2 },
  { name: "Schönheitsklinik Pallas", type: "Klinik", city: "Zürich", ph: "+41583350000", s: 3 },
  { name: "Beauty2Go Klinik", type: "Klinik", city: "Zürich", ph: "+41444403434", s: 2 },
  { name: "perfect esthetics", type: "Schönheitsklinik", city: "Zürich", ph: "+41449120303", s: 2 },
  { name: "White Lotus Beauty", type: "Aesthetics", city: "Zürich", ph: "+41763069999", s: 2 },
];
const SCRIPT = `OUVERTURE
"Bonjour, je m'appelle Marco. Je ne suis pas un patient — je travaille
avec des cliniques à Genève sur un point précis : les appels manqués.
Vous avez 30 secondes ?"

LE PROBLÈME
"Quand le secrétariat est occupé ou fermé, un appel manqué = souvent un
patient qui appelle la clinique d'à côté. Sur des soins à 1'000–3'000 CHF,
un seul appel perdu par semaine, c'est énorme sur l'année."

LA SOLUTION
"J'installe un système qui renvoie automatiquement un SMS au patient en
30 secondes, répond à ses questions et propose un créneau. Opérationnel
en 48h, rien ne change pour votre équipe."

LE CLOSE
"Je peux vous montrer une démo de 15 minutes cette semaine. Mardi ou jeudi ?"

SI « ENVOYEZ UN EMAIL »
"Avec plaisir — je l'envoie tout de suite. Quelle adresse, et je mets quel
nom en référence ?"  (→ contact direct + rendez-vous)`;

const MISSION = [
  { id: "m_nyota", t: "Send the Nyota proposal (draft in Gmail)", meta: "Warm €490 · 1 tap", imp: "€490", cls: "" },
  { id: "m_twine", t: "Submit the Twine $750 application", meta: "Copy from Scripts tab", imp: "$750", cls: "" },
  { id: "m_call", t: "Call 8 high-ticket clinics", meta: "Call Center · Swiss hours", imp: "€1.5k+ ea", cls: "" },
  { id: "m_phone", t: "Put heyweb10@gmail.com on your phone", meta: "Catch replies in minutes", imp: "High", cls: "med" },
  { id: "m_follow", t: "Follow up anyone who opened / replied", meta: "Check Apollo + inbox", imp: "Med", cls: "med" },
  { id: "m_testi", t: "After 1st delivery: ask for a testimonial", meta: "Proof = next 10 closes", imp: "Compounds", cls: "med" },
];
const ROADMAP = [
  ["Live Apollo / Apify sync", "Auto-pull sent/open/reply + fresh leads", "backend"],
  ["Send emails & invoices from the OS", "Real mail + Stripe/PayPal invoices", "backend"],
  ["Push notifications", "Reply / paid / booked / mailbox-health alerts", "backend"],
  ["Client portal", "Progress, files, invoice status per client", "backend"],
  ["AI one-click generator", "Proposals & multilingual copy on demand", "backend+AI"],
  ["Calendar & booking", "Meetings, deliveries, deadlines synced", "backend"],
  ["Referral engine", "Track referrers & rewards", "backend"],
  ["Automation monitor", "Uptime of every workflow", "backend"],
];
const NAV = [
  ["ceo", "◎", "CEO Dashboard"], ["mission", "◈", "Daily Mission"], ["pipeline", "▤", "Pipeline"],
  ["calls", "✆", "Call Center"], ["outreach", "✉", "Cold Outreach"], ["kpi", "▦", "KPIs"],
  ["finance", "$", "Financials"], ["insights", "✦", "AI Insights"], ["scripts", "▧", "Scripts"], ["roadmap", "◔", "Roadmap"],
];
const LS = "blackkweather_agency_os_v1";
const eurOf = (d) => Math.round(d.value * (FX[d.cur] || 1));
const fmt = (n) => "€" + Math.round(n).toLocaleString("en-US");
const freshDB = () => ({
  deals: JSON.parse(JSON.stringify(SEED_DEALS)), mission: {}, calls: {},
  out: { sent: 30, delivered: 0, opened: 0, replies: 0, meetings: 0 }, goal: 2000,
});

export default function Page() {
  const [view, setView] = useState("ceo");
  const [db, setDb] = useState(null);

  useEffect(() => {
    let init = freshDB();
    try { const r = JSON.parse(localStorage.getItem(LS)); if (r && r.deals) init = { ...freshDB(), ...r }; } catch (e) {}
    setDb(init);
  }, []);
  useEffect(() => { if (db) localStorage.setItem(LS, JSON.stringify(db)); }, [db]);

  if (!db) return <div style={{ padding: 40, color: "#8A93A3" }}>Loading Agency OS…</div>;

  const openDeals = db.deals.filter((d) => d.stage !== "won" && d.stage !== "lost");
  const wonRev = db.deals.filter((d) => d.stage === "won").reduce((a, d) => a + eurOf(d), 0);
  const pipeVal = openDeals.reduce((a, d) => a + eurOf(d), 0);
  const forecast = openDeals.reduce((a, d) => a + eurOf(d) * PROB[d.stage], 0);
  const deposits = db.deals.filter((d) => d.stage === "won").reduce((a, d) => a + eurOf(d) * 0.5, 0);
  const missionLeft = MISSION.filter((m) => !db.mission[m.id]).length;

  const setDeal = (id, stage) => setDb((p) => ({ ...p, deals: p.deals.map((d) => d.id === id ? { ...d, stage } : d) }));
  const toggleMission = (id) => setDb((p) => ({ ...p, mission: { ...p.mission, [id]: !p.mission[id] } }));
  const setCall = (i, patch) => setDb((p) => ({ ...p, calls: { ...p.calls, [i]: { ...p.calls[i], ...patch } } }));
  const setOut = (k, v) => setDb((p) => ({ ...p, out: { ...p.out, [k]: v } }));
  const reset = () => { if (confirm("Reset all OS data to defaults?")) { localStorage.removeItem(LS); setDb(freshDB()); } };

  const Metric = ({ lab, val, money, sub }) => (
    <div className={"m" + (money ? " money" : "")}><div className="lab">{lab}</div><div className="val mono">{val}</div>{sub && <div className="sub">{sub}</div>}</div>
  );

  const wl = db.deals.filter((d) => d.stage === "won" || d.stage === "lost");
  const winRate = wl.length ? Math.round(db.deals.filter((d) => d.stage === "won").length / wl.length * 100) : 0;
  const avg = db.deals.length ? Math.round(db.deals.reduce((a, d) => a + eurOf(d), 0) / db.deals.length) : 0;
  const hot = openDeals.filter((d) => PROB[d.stage] >= .35).sort((a, b) => eurOf(b) - eurOf(a));

  return (
    <div className="app">
      <nav>
        <div className="brand"><div className="logo">B</div><div><b>Agency OS</b><span>Blackkweather</span></div></div>
        {NAV.map(([id, ic, label]) => (
          <button key={id} className={"navbtn" + (view === id ? " on" : "")} onClick={() => setView(id)}>
            <span className="ic">{ic}</span>{label}
            {id === "mission" && missionLeft > 0 && <span className="dot">{missionLeft}</span>}
            {id === "calls" && <span className="dot">{CALLS.length}</span>}
          </button>
        ))}
      </nav>
      <div>
        <div className="mnav">
          {NAV.map(([id, , label]) => (
            <button key={id} className={view === id ? "on" : ""} onClick={() => setView(id)}>{label}</button>
          ))}
        </div>
        <main>
          {view === "ceo" && (<>
            <div className="topbar"><div><h1 className="h">CEO Dashboard</h1><p className="hsub">Every number answers one question — what gets me paid this week?</p></div>
              <button className="reset" onClick={reset}>↺ Reset data</button></div>
            <div className="metrics">
              <Metric lab="Cash collected" val={fmt(wonRev)} money sub="won deals" />
              <Metric lab="Pipeline value" val={fmt(pipeVal)} sub="open deals" />
              <Metric lab="Forecast" val={fmt(forecast)} money sub="prob-weighted" />
              <Metric lab="Deposits (50%)" val={fmt(deposits)} sub="on won" />
              <Metric lab="Avg deal size" val={fmt(avg)} />
              <Metric lab="Win rate" val={winRate + "%"} sub={wl.length + " closed"} />
            </div>
            <div className="grid2">
              <div className="card"><h3>Revenue goal — this week</h3>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span className="mono" style={{ fontSize: 24, fontWeight: 700 }}>{fmt(wonRev + deposits)}</span>
                  <span style={{ color: "var(--soft)" }}>of <span className="editable mono" contentEditable suppressContentEditableWarning
                    onBlur={(e) => setDb((p) => ({ ...p, goal: parseInt(e.target.textContent.replace(/\D/g, "")) || 2000 }))}>{fmt(db.goal)}</span></span>
                </div>
                <div className="bar"><i style={{ width: Math.min(100, (wonRev + deposits) / db.goal * 100) + "%" }} /></div>
                <p className="note-inline">Tap the target to edit. Everything else computes from your Pipeline.</p>
              </div>
              <div className="card"><h3>Closing this week</h3>
                {hot.length ? hot.map((d) => (
                  <div key={d.id} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid var(--line)" }}>
                    <span>{d.name} <span className="tagx">{d.stage}</span></span><b className="mono" style={{ color: "var(--money)" }}>{fmt(eurOf(d))}</b></div>
                )) : <p style={{ color: "var(--faint)" }}>Move deals to Interested+ to see them here.</p>}
              </div>
            </div>
          </>)}

          {view === "mission" && (<>
            <h1 className="h">Today&apos;s Mission</h1><p className="hsub">Auto-ranked by revenue impact. Do them top-down. Progress saves automatically.</p>
            <div className="card"><ul className="mission">
              {MISSION.map((m) => (
                <li key={m.id} className={db.mission[m.id] ? "done" : ""} onClick={() => toggleMission(m.id)}>
                  <span className="chk">✓</span>
                  <span><span className="mtxt">{m.t}</span><div className="mmeta">{m.meta}</div></span>
                  <span className={"impact " + m.cls}>{m.imp}</span>
                </li>
              ))}
            </ul></div>
          </>)}

          {view === "pipeline" && (<>
            <h1 className="h">Pipeline</h1><p className="hsub">Drag deals across stages — CEO metrics, KPIs & financials update live. Saves to your browser.</p>
            <div className="kan">
              {STAGES.map(([sid, label]) => {
                const items = db.deals.filter((d) => d.stage === sid);
                return (
                  <div key={sid} className="col"
                    onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add("dragover"); }}
                    onDragLeave={(e) => e.currentTarget.classList.remove("dragover")}
                    onDrop={(e) => { e.preventDefault(); e.currentTarget.classList.remove("dragover"); const id = e.dataTransfer.getData("id"); if (id) setDeal(id, sid); }}>
                    <h4>{label}<span className="c">{items.length}</span></h4>
                    {items.map((d) => (
                      <div key={d.id} className="deal" draggable onDragStart={(e) => e.dataTransfer.setData("id", d.id)}>
                        <b>{d.name}</b><span className="v mono">{fmt(eurOf(d))}</span>
                        <div className="meta"><span className="tagx">{d.type}</span><span className="tagx">{d.city}</span>{d.warm && <span className="tagx" style={{ color: "var(--hot)" }}>warm</span>}</div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </>)}

          {view === "calls" && (<>
            <h1 className="h">Call Center — high-ticket clinics</h1><p className="hsub">Your fastest path to a big yes. Tap CALL on your phone. Set status + notes as you go.</p>
            <div className="twrap"><table><thead><tr><th>Clinic</th><th>Type</th><th>City</th><th>Score</th><th>Call</th><th>Status</th><th>Note</th></tr></thead>
              <tbody>{CALLS.map((c, i) => { const st = db.calls[i] || {}; return (
                <tr key={i}>
                  <td><b>{c.name}</b></td><td style={{ color: "var(--soft)" }}>{c.type}</td><td>{c.city}</td>
                  <td className={"score s" + c.s}>{c.s}</td>
                  <td><a className="call" href={"tel:" + c.ph}>✆ Call</a></td>
                  <td><select className="st" value={st.status || "—"} onChange={(e) => setCall(i, { status: e.target.value })}>
                    {["—", "Answered", "Voicemail", "Interested", "Booked", "Callback", "No"].map((o) => <option key={o}>{o}</option>)}</select></td>
                  <td><input className="note" value={st.note || ""} placeholder="note…" onChange={(e) => setCall(i, { note: e.target.value })} /></td>
                </tr>); })}</tbody></table></div>
            <div className="card" style={{ marginTop: 14 }}><h3>Phone script (FR · 40s)</h3><pre>{SCRIPT}</pre></div>
          </>)}

          {view === "outreach" && (<>
            <h1 className="h">Cold Outreach</h1><p className="hsub">The machine running in the background. Numbers are manual until we wire live Apollo sync — tap to edit.</p>
            <div className="metrics">
              {[["Sent", "sent"], ["Delivered", "delivered"], ["Opened", "opened"], ["Replies", "replies"], ["Meetings", "meetings"]].map(([lab, k]) => (
                <div key={k} className="m"><div className="lab">{lab}</div>
                  <div className="val mono editable" contentEditable suppressContentEditableWarning
                    onBlur={(e) => setOut(k, parseInt(e.target.textContent.replace(/\D/g, "")) || 0)}>{db.out[k]}</div></div>
              ))}
              <Metric lab="Open rate" val={(db.out.delivered ? Math.round(db.out.opened / db.out.delivered * 100) : 0) + "%"} />
              <Metric lab="Reply rate" val={(db.out.delivered ? Math.round(db.out.replies / db.out.delivered * 100) : 0) + "%"} />
            </div>
            <p className="note-inline">Live Apollo sync arrives in the backend phase (Roadmap tab).</p>
          </>)}

          {view === "kpi" && (<>
            <h1 className="h">KPIs</h1><p className="hsub">Efficiency of the whole funnel. Computed from pipeline + outreach.</p>
            <div className="metrics">
              <Metric lab="Leads" val={db.deals.length + CALLS.length} />
              <Metric lab="Emails sent" val={db.out.sent} />
              <Metric lab="Replies" val={db.out.replies} />
              <Metric lab="Meetings" val={db.out.meetings} />
              <Metric lab="Clients won" val={db.deals.filter((d) => d.stage === "won").length} />
              <Metric lab="Revenue" val={fmt(wonRev)} money />
              <Metric lab="Rev / lead" val={fmt((db.deals.length + CALLS.length) ? wonRev / (db.deals.length + CALLS.length) : 0)} />
              <Metric lab="Rev / email" val={fmt(db.out.sent ? wonRev / db.out.sent : 0)} />
              <Metric lab="Conversion" val={(db.deals.length ? Math.round(db.deals.filter((d) => d.stage === "won").length / (db.deals.length + CALLS.length) * 100) : 0) + "%"} />
            </div>
          </>)}

          {view === "finance" && (<>
            <h1 className="h">Financials</h1><p className="hsub">Cash reality. Won = revenue; open × probability = forecast.</p>
            <div className="metrics">
              <Metric lab="Revenue (won)" val={fmt(wonRev)} money />
              <Metric lab="Deposits (50%)" val={fmt(deposits)} />
              <Metric lab="Balance outstanding" val={fmt(wonRev - deposits)} />
              <Metric lab="Weighted forecast" val={fmt(forecast)} money />
              <Metric lab="Pipeline value" val={fmt(pipeVal)} />
              <Metric lab="Open deals" val={openDeals.length} />
            </div>
            <div className="card"><h3>By currency (all deals)</h3>
              {Object.entries(db.deals.reduce((a, d) => { a[d.cur] = (a[d.cur] || 0) + d.value; return a; }, {})).map(([c, v]) => (
                <div key={c} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid var(--line)" }}>
                  <span>{c}</span><b className="mono">{v.toLocaleString()} {c} <span style={{ color: "var(--faint)" }}>≈ {fmt(v * (FX[c] || 1))}</span></b></div>
              ))}
            </div>
          </>)}

          {view === "insights" && (<>
            <h1 className="h">AI Insights — today</h1><p className="hsub">The co-founder read on where money is and what to do next.</p>
            <div className="card">
              {[
                ["💸", "Where is the money right now?", `${fmt(wonRev)} collected, ${fmt(pipeVal)} open pipeline. Your two warm deals (Nyota €490, Twine $750) are the nearest cash — send both and that's ${fmt(490 + 750 * 0.92)} one action away.`],
                ["📞", "Who should I call first?", `${CALLS[0].name} (${CALLS[0].city}) — highest-ticket + reachable by phone now. Aesthetic surgeons lose €1,500+ per missed booking; the pitch lands hardest here.`],
                ["🎯", "What's most likely to buy?", hot[0] ? `${hot[0].name} — furthest along at "${hot[0].stage}". Push it to Meeting today.` : "Nothing past Interested yet. Send Nyota, book one clinic demo."],
                ["🛑", "What should I stop doing?", "Stop waiting on cold email — it pays in days. Stop adding leads before working the 210 you have. Worked pipeline = revenue."],
                ["🔮", "This week's forecast", `Weighted: ${fmt(forecast)}. With both warm sends + 1 clinic close: ${fmt(forecast + 1500 * 1.04)}.`],
                ["⚙️", "Biggest leverage move", "Get off free Gmail — a €10 domain + Workspace ~doubles reply rate and lifts the 30/day cap. Compounds every future email."],
              ].map((x, i) => (
                <div key={i} className="insight"><span className="q">{x[0]}</span><div><b>{x[1]}</b><p>{x[2]}</p></div></div>
              ))}
            </div>
          </>)}

          {view === "scripts" && (<>
            <h1 className="h">Scripts &amp; Knowledge</h1><p className="hsub">Grab-and-go. Copy, paste, close.</p>
            <div className="card"><h3>Twine application — $750 gig</h3><pre>{`Hi! Indie-folk is home turf for me — I'm Blackkweather, a SACEM-registered
producer & artist (releases distributed via Nyota Agency). "Light production
that enhances an already-good mix" is exactly my lane. To take all risk off
you: send the track, I return a FREE 30-sec treated preview in 24h. Like it?
Full production in 48h inside your $750, revisions till you're happy. Ready today.`}</pre></div>
            <div className="card"><h3>Clinic offer (quote on the call)</h3><pre>{`Système "rappel automatique des appels manqués" :
• SMS automatique au patient en 30s dès qu'un appel n'est pas décroché
• Répond aux questions + propose un créneau
• Opérationnel en 48h, rien à changer pour l'équipe
PRIX : 1'500 CHF (forfait) — ou 1'500 + 200 CHF/mois de suivi
50% à la commande. Démo de 15 min offerte.`}</pre></div>
            <div className="card"><h3>Cold email (FR) — live sequence opener</h3><pre>{`Objet : Les appels manqués de {clinique}
Bonjour, chaque appel manqué chez {clinique} part en général chez un
concurrent. J'installe un standard IA qui rappelle par SMS en 30 secondes,
répond aux questions et prend le rendez-vous — opérationnel en 48h.
15 minutes cette semaine pour une démo en direct ? — Marco`}</pre></div>
          </>)}

          {view === "roadmap" && (<>
            <h1 className="h">Roadmap — backend phase</h1><p className="hsub">This app is real & persistent. These modules need a server + your API keys — I wire them next.</p>
            <div className="card">
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {ROADMAP.map((r, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span className="pill off">needs {r[2]}</span>
                    <div><b>{r[0]}</b><div style={{ fontSize: 12.5, color: "var(--soft)" }}>{r[1]}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </>)}
        </main>
      </div>
    </div>
  );
}
