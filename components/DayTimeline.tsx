"use client";

import { useRef, useState, useEffect, useCallback, Fragment } from "react";
import Image from "next/image";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Evt {
  id: string;
  title: string;
  time: Date;
  endTime?: Date;
  text: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  color: string;
}

// ── Event data ────────────────────────────────────────────────────────────────

const d = (h: number, m: number, s = 0) => new Date(2024, 4, 2, h, m, s);

const TEST_VIDEO_IDS = [
  "dQw4w9WgXcQ", "jNQXAC9IVRw", "9bZkp7q19f0", "kJQP7kiw5Fk",
  "M7lc1UVf-VE", "L_jWHffIx5E", "fJ9rUzIMcZQ", "RgKAFK5djSk",
  "OPf0YbXqDm0", "hTWKbEkeZ0I", "CevxRWRWxXk", "y6120QOlsfU",
];

const RAW_EVENTS: Omit<Evt, "videoUrl">[] = [
  { id: "1",  title: "Mom calls DMH",                      time: d(9,35),      endTime: d(9,55),      color: "#4A9EFF", text: "Mom calls the Department of Mental Health to request assistance with her son, who is having a mental health crisis. He is having persecutory delusions and auditory hallucinations." },
  { id: "2",  title: "DMH clinician Yoon arrives",          time: d(10,53,40),  endTime: d(10,54,5),   color: "#4A9EFF", text: "DMH clinician Yoon arrives. Dad takes him to talk to Yong, who says he only wants to see his father. Nobody else." },
  { id: "3",  title: "Yoon enters without permission",      time: d(10,54,5),   endTime: d(10,54,20),  color: "#FF8C42", text: "Dad opens the door to talk to Yong, and Yoon enters without permission, ignoring Yong's wishes. He gets promptly dismissed." },
  { id: "4",  title: "Yoon calls 911",                      time: d(10,54,30),  endTime: d(10,58),     color: "#FF8C42", text: "Yoon immediately calls 911 reporting that Yong \"tried to attack\" him, effectively deciding that he will not help. On his YouTube channel, he can be seen urging family members not to call the police in the event of mental health crises due to the danger of their loved one being injured or killed." },
  { id: "5",  title: "Lopez & partner arrive",              time: d(11,10,52),                         color: "#4A9EFF", text: "Lopez and partner arrive at the scene." },
  { id: "6",  title: "Officers talk to Yong (35s)",         time: d(11,14,31),  endTime: d(11,15,7),   color: "#4A9EFF", text: "Lopez and partner talk to Yong for 35 seconds and call for backup." },
  { id: "7",  title: "Ruvalcaba assigns weapon roles",      time: d(11,35,8),                          color: "#FF8C42", text: "Sgt Ruvalcaba and several more officers arrive. She tries to convince Dad to criminalize his own son by \"signing a paper\" stating he is trespassing. He refuses. Undeterred, she moves forward with her plan. \"Who's my primary? And less lethal?\" She is designating weapon roles for a high-risk tactical encounter. The primary is in charge of using deadly force if a suspect pulls a weapon or takes an action that poses a threat. Because their focus is 100% on lethal cover, they do not handle handcuffs, or less-lethal tools. Lopez quickly volunteers to be the primary." },
  { id: "9",  title: "Use of force declared",               time: d(11,37,45),  endTime: d(11,38,33),  color: "#FF8C42", text: "Sgt Ruvalcaba talks to Yong for less than a minute & verbally states her decision that there will be a \"use of force,\" even though no crime has been committed, and nobody is in any danger… except for Yong. There is nobody else in the apartment." },
  { id: "10", title: "Paramedics arrive with gurney",       time: d(11,54,14),                         color: "#4A9EFF", text: "Paramedics arrive and prepare a gurney to transport Yong. The gurney is to make sure he isn't injured while being escorted to the hospital." },
  { id: "11", title: "USC is the destination",              time: d(11,57,26),                         color: "#4A9EFF", text: "Yoon tells Dad that USC Medical Center is the destination, but doesn't attempt to assist or facilitate in any way, which is his designated role. The police are not trained to handle mental health situations, and he is. As the psychiatric professional, he should be the one to make contact with Yong." },
  { id: "12", title: "Door forced open",                    time: d(11,57,47),  endTime: d(11,57,56),  color: "#FF8C42", text: "Partner forcefully opens the door." },
  { id: "13", title: "Gurney arrives at doorstep",          time: d(11,58,2),                          color: "#4A9EFF", text: "Gurney arrives at the doorstep to go up to the house, but the stairway is filled with police officers. On the CCTV footage the paramedics can be seen reacting to gunshots." },
  { id: "14", title: "Lopez shoots Yong",                   time: d(11,58,3),   endTime: d(11,58,4),   color: "#FF4444", text: "Lopez shoots Yong within seconds of the door opening, from outside the door into the apartment. Twice in the chest and once in the stomach. One of the bullets punctures his heart. Another perforates his lung and another one obliterates his spleen. He also takes a defensive wound through his left arm." },
  { id: "15", title: "Paramedics ordered to leave",         time: d(11,58,13),                         color: "#FF8C42", text: "The paramedics are given orders, but not to give emergency first aid to Yong. They are told to turn around and leave." },
  { id: "16", title: "\"Officer Needs Help\" call",         time: d(11,58,16),                         color: "#FF4444", text: "As Yong lays dying on the ground, Sgt Ruvalcaba issues an \"Officer Needs Help\" call over her radio. This is the most urgent, high-priority radio transmission in law enforcement. It signals that an officer is in immediate, life-threatening danger and requires every available unit within driving distance to respond to their location at maximum speed no matter what they are doing. This call is meant to be triggered when an officer is in a physical fight for their life, heavily outnumbered, taking active gunfire, or seriously injured or incapacitated and cannot defend themselves. No medical assistance is given to Yong." },
  { id: "17", title: "Paramedics leave with gurney",        time: d(11,58,19),                         color: "#4A9EFF", text: "The paramedics push their gurney out down the driveway and prepare to load it into the ambulance." },
  { id: "18", title: "Ambulance leaves scene",              time: d(11,59,43),                         color: "#4A9EFF", text: "The ambulance leaves the scene." },
  { id: "19", title: "Less-lethal gun removed",             time: d(12,0,50),                          color: "#FF8C42", text: "One of the officers carries the less lethal projectile gun away from the scene less than three minutes after the shooting." },
  { id: "20", title: "LAFD first team arrives",             time: d(12,6,20),                          color: "#4A9EFF", text: "The first team of LAFD (6 men) arrive and walk in without any urgency 8 minutes after the shooting. The Fire Department is two blocks away." },
  { id: "21", title: "LAFD second team arrives",            time: d(12,10,20),                         color: "#4A9EFF", text: "A second team of firemen (2 men with a gurney) walk in slowly. They don't seem to be in a hurry either." },
  { id: "22", title: "Yong is declared dead",                  time: d(12,12),                            color: "#FF4444", text: "According to the report, this is when Yong is declared dead by the LAFD. Nobody says anything to his parents." },
  { id: "23", title: "Ponce: \"sorry for your loss\"",  time: d(13,2),                             color: "#4A9EFF", text: "Over an hour after the shooting, Aaron Ponce approaches Dad and says \"Sorry for your loss.\" When asked what happened he says he doesn't know because he wasn't there." },
  { id: "24", title: "Death reported to Medical Examiner",  time: d(13,59),                            color: "#4A9EFF", text: "Two hours after Yong dies, LAPD Officer Carrasco 39957 reports his death to the Medical Examiner." },
  { id: "25", title: "Parents taken to Olympic Station",    time: d(14,43),                            color: "#4A9EFF", text: "Mom & Dad are told to meet with officers at LAPD Olympic station where all their questions will be answered. Sgt Violet Potter 35464, the Family Liaison, accompanies them." },
  { id: "26", title: "Parents interrogated at FID",         time: d(15,26),     endTime: d(18,28),     color: "#FF8C42", text: "Mom & Dad are kept waiting for over half an hour before they finally begin talking with FID (Force Investigation Division) at Olympic station. Except they don't get a single answer to any of their questions. Instead, they are interrogated for three hours. Meanwhile, a press conference is held back at the apartment, in which Yong is portrayed as a violent man armed with an 11-inch knife who lunged at the officer. The officer had to fire his weapon to protect his own life, and Yong was \"struck,\" and died on the scene. It turns out the knife was 5 inches long and he never lunged at an officer." },
  { id: "28", title: "Medical Examiner arrives",            time: d(18,7),                             color: "#4A9EFF", text: "Field Medical Examiner Kelly Yagerlener arrives." },
  { id: "29", title: "Parents return to see Yong's body",  time: d(18,41),                            color: "#4A9EFF", text: "Mom & Dad get back to the street outside their home to meet with Sgt Andrey Wilkins, another Family Liaison, to see Yong's body before it is transported to the Coroner's Office, as promised by Andrey Wilkins." },
  { id: "30", title: "Body taken without family's knowledge", time: d(18,52),                          color: "#FF8C42", text: "Andrey Wilkins tells Mom and Dad that Yong's body was taken \"without his knowing\" and moved to the Coroner's Office by Forensic Attendant Dustin Miranda." },
  { id: "31", title: "Scene investigation completed",       time: d(19,30),                            color: "#4A9EFF", text: "Kelly Yagerlener completes the scene investigation accompanied by Lieutenant Brian Kim." },
  { id: "32", title: "Yagerlener speaks with family",       time: d(19,36),                            color: "#4A9EFF", text: "Field Medical Examiner Kelly Yagerlener speaks with Mom and Dad." },
  { id: "33", title: "Mom and Dad allowed to go back home", time: d(20,21),                            color: "#4A9EFF", text: "Mom and Dad are finally allowed to return to their apartment." },
];

const EVENTS: Evt[] = RAW_EVENTS.map((evt, i) => ({
  ...evt,
  videoUrl: `https://www.youtube.com/embed/${TEST_VIDEO_IDS[i % TEST_VIDEO_IDS.length]}`,
}));

// ── Constants ─────────────────────────────────────────────────────────────────

const START_MS   = new Date(2024, 4, 2, 8, 0, 0).getTime();
const TOTAL_SECS = (new Date(2024, 4, 2, 22, 0, 0).getTime() - START_MS) / 1000;

const STRIP_H   = 160;
const LINE_Y    = 118;
const V_STRIP_W = 44;
const V_LINE_X  = 8;
const DOT_R     = 5;
const DURATION_H = 3;
const CARD_W    = 112;
const CARD_W_MAX = 220;
const CARD_H    = 26;
const LANE_H    = 34;
const MAX_LANES = 3;

const SCROLL_ANIM_MS = 950;
const PANEL_ADJACENT_MS = 600;
const MIN_PX    = 80 / 615;
const MAX_PX    = 80 / 60;   // max zoom: ~1 min visible

const COLOR_PRI: Record<string, number> = { "#FF4444": 2, "#FF8C42": 1, "#4A9EFF": 0 };
const clusterR  = (n: number) => n > 1 ? DOT_R + 2 : DOT_R;

const YOON_DMH_IDS = ["2", "3", "4"] as const;
const YOON_DMH_LEAD_ID = "2";
const YOON_DMH_MERGE_SECS = 20 * 60;

interface Cluster { evts: Evt[]; lead: Evt; pos: number; r: number; }

function pickClusterLead(g: { evt: Evt; pos: number }[]): Evt {
  const lead = g.find(i => i.evt.id === YOON_DMH_LEAD_ID);
  if (lead && g.some(i => (YOON_DMH_IDS as readonly string[]).includes(i.evt.id))) {
    return lead.evt;
  }
  return g.reduce(
    (b, a) => ((COLOR_PRI[a.evt.color] ?? 0) > (COLOR_PRI[b.evt.color] ?? 0) ? a : b),
  ).evt;
}

function buildClusters(
  items: { evt: Evt; pos: number }[],
  zoomedOut: boolean,
): Cluster[] {
  if (!items.length) return [];

  const yoonSet = new Set<string>(YOON_DMH_IDS);
  let pool = items;
  let yoonCluster: Cluster | null = null;

  if (zoomedOut) {
    const visibleYoon = items.filter(i => yoonSet.has(i.evt.id));
    if (visibleYoon.length > 0) {
      const leadItem = visibleYoon.find(i => i.evt.id === YOON_DMH_LEAD_ID) ?? visibleYoon[0];
      const allYoon = YOON_DMH_IDS
        .map(id => EVENTS.find(e => e.id === id))
        .filter((e): e is Evt => !!e);
      yoonCluster = {
        evts: allYoon,
        lead: allYoon.find(e => e.id === YOON_DMH_LEAD_ID) ?? allYoon[0],
        pos: leadItem.pos,
        r: clusterR(allYoon.length),
      };
      pool = items.filter(i => !yoonSet.has(i.evt.id));
    }
  }

  if (!pool.length) return yoonCluster ? [yoonCluster] : [];

  const sorted = [...pool].sort((a, b) => a.pos - b.pos);
  const groups: { evt: Evt; pos: number }[][] = [];
  let cur = [sorted[0]];
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].pos - sorted[i - 1].pos < DOT_R * 2) cur.push(sorted[i]);
    else { groups.push(cur); cur = [sorted[i]]; }
  }
  groups.push(cur);

  const clusters = groups.map(g => ({
    evts: g.map(i => i.evt),
    lead: pickClusterLead(g),
    pos: g.reduce((b, a) => (COLOR_PRI[a.evt.color] ?? 0) > (COLOR_PRI[b.evt.color] ?? 0) ? a : b).pos,
    r: clusterR(g.length),
  }));

  if (yoonCluster) clusters.push(yoonCluster);
  clusters.sort((a, b) => a.pos - b.pos);
  return clusters;
}

const t2s = (h: number, m: number, s = 0) =>
  (new Date(2024, 4, 2, h, m, s).getTime() - START_MS) / 1000;

// ── Zoom transition (shooting area) ───────────────────────────────────────────

interface ZoneTransition { start: number; end: number; targetPx?: number; targetSecs?: number; exitSecs?: number; entrySecs?: number; ramp?: number; curve?: "ease" | "trapezoid"; }

const ZOOM_TRANSITIONS: ZoneTransition[] = [
  { start: t2s(10, 51, 59), end: t2s(10, 56, 31), targetSecs: 14 * 60, exitSecs: 3600, curve: "ease" },
  { start: t2s(11, 54, 33), end: t2s(12, 1,  33), targetPx: 80 / 5, exitSecs: 11 * 60 },
];

function zonePeak(z: ZoneTransition, vpW: number): number {
  return z.targetSecs && vpW > 0 ? vpW / z.targetSecs : (z.targetPx ?? MAX_PX);
}

function easeInOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function buildPanelPages(from: Evt, to: Evt, prevIdx: number, targetIdx: number): Evt[] {
  const dir = targetIdx > prevIdx ? 1 : -1;
  if (Math.abs(targetIdx - prevIdx) <= 1) {
    return dir > 0 ? [from, to] : [to, from];
  }
  const bridge = EVENTS[prevIdx + dir];
  return dir > 0 ? [from, bridge, to] : [to, bridge, from];
}

function transitionPx(centerSecs: number, vpW: number): number | null {
  for (const z of ZOOM_TRANSITIONS) {
    const span = z.end - z.start;
    const pos = centerSecs - z.start;
    if (pos < 0 || pos > span) continue;
    const peak = zonePeak(z, vpW);
    const entryPx = z.entrySecs && vpW > 0 ? vpW / z.entrySecs : MIN_PX;
    const exitPx = z.exitSecs && vpW > 0 ? vpW / z.exitSecs : MIN_PX;

    if (z.curve === "ease") {
      const t = pos / span;
      if (t <= 0.5) {
        return entryPx + (peak - entryPx) * easeInOut(t * 2);
      }
      return peak + (exitPx - peak) * easeInOut((t - 0.5) * 2);
    }

    const ramp = span * (z.ramp ?? 0.45);
    if (pos < ramp) {
      const lt = pos / ramp;
      const t = lt * lt * lt * lt * lt * lt * lt;
      return entryPx + (peak - entryPx) * t;
    } else if (pos > span - ramp) {
      const lt = (span - pos) / ramp;
      const t = lt * lt * lt * lt * lt * lt * lt;
      return exitPx + (peak - exitPx) * t;
    } else {
      return peak;
    }
  }
  return null;
}

function effectiveMaxPx(centerSecs: number, vpW: number): number {
  for (const z of ZOOM_TRANSITIONS) {
    const pos = centerSecs - z.start;
    if (pos >= 0 && pos <= z.end - z.start) return zonePeak(z, vpW);
  }
  return MAX_PX;
}

// ── Canvas ruler ──────────────────────────────────────────────────────────────

function getIntervals(px: number): [number, number] {
  const STEPS: [number, number][] = [
    [3600, 3600], [3600, 1800], [3600, 600], [1800, 300],
    [600, 300], [300, 60], [120, 60], [60, 30], [60, 15],
    [60, 5], [60, 1],
  ];
  for (const [maj, min] of STEPS) {
    if (min * px >= 8) return [maj, min];
  }
  return [60, 1];
}

function tickLabel(secs: number): string {
  const t = new Date(START_MS + secs * 1000);
  const h = t.getHours() % 12 || 12;
  const m = t.getMinutes();
  const s = t.getSeconds();
  const ap = t.getHours() < 12 ? "AM" : "PM";
  if (s !== 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  if (m !== 0) return `${h}:${String(m).padStart(2, "0")}`;
  return `${h} ${ap}`;
}

const RULER_TICKS = [
  { s: 1,    h: 3,  op: 0.15, w: 0.5 },
  { s: 5,    h: 4,  op: 0.20, w: 0.5 },
  { s: 60,   h: 6,  op: 0.25, w: 1   },
  { s: 300,  h: 9,  op: 0.45, w: 1   },
  { s: 3600, h: 14, op: 0.70, w: 1.5 },
];

function drawRuler(ctx: CanvasRenderingContext2D, vpW: number, px: number, off: number) {
  ctx.clearRect(0, 0, vpW, STRIP_H);
  ctx.strokeStyle = "rgba(255,255,255,0.15)";
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(0, LINE_Y); ctx.lineTo(vpW, LINE_Y); ctx.stroke();

  const visStart = off / px;
  const visEnd   = (off + vpW) / px;
  for (let li = 0; li < RULER_TICKS.length; li++) {
    const lvl  = RULER_TICKS[li];
    if (lvl.s * px < 4) continue;
    const nextS = li + 1 < RULER_TICKS.length ? RULER_TICKS[li + 1].s : 0;
    const first = Math.floor(visStart / lvl.s) * lvl.s;
    for (let s = first; s <= visEnd + lvl.s; s += lvl.s) {
      if (s < 0 || s > TOTAL_SECS) continue;
      if (nextS > 0 && s % nextS === 0) continue;
      const x = s * px - off;
      if (x < -1 || x > vpW + 1) continue;
      ctx.strokeStyle = `rgba(255,255,255,${lvl.op})`;
      ctx.lineWidth   = lvl.w;
      ctx.beginPath(); ctx.moveTo(x, LINE_Y); ctx.lineTo(x, LINE_Y + lvl.h); ctx.stroke();
    }
  }
}

function drawRulerVertical(ctx: CanvasRenderingContext2D, vpH: number, px: number, off: number) {
  ctx.clearRect(0, 0, V_STRIP_W, vpH);
  ctx.strokeStyle = "rgba(255,255,255,0.15)";
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(V_LINE_X, 0); ctx.lineTo(V_LINE_X, vpH); ctx.stroke();

  const visStart = off / px;
  const visEnd   = (off + vpH) / px;
  for (let li = 0; li < RULER_TICKS.length; li++) {
    const lvl  = RULER_TICKS[li];
    if (lvl.s * px < 4) continue;
    const nextS = li + 1 < RULER_TICKS.length ? RULER_TICKS[li + 1].s : 0;
    const first = Math.floor(visStart / lvl.s) * lvl.s;
    for (let s = first; s <= visEnd + lvl.s; s += lvl.s) {
      if (s < 0 || s > TOTAL_SECS) continue;
      if (nextS > 0 && s % nextS === 0) continue;
      const y = s * px - off;
      if (y < -1 || y > vpH + 1) continue;
      ctx.strokeStyle = `rgba(255,255,255,${lvl.op})`;
      ctx.lineWidth   = lvl.w;
      ctx.beginPath(); ctx.moveTo(V_LINE_X, y); ctx.lineTo(V_LINE_X + lvl.h, y); ctx.stroke();
    }
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const SHOOT_MS = new Date(2024, 4, 2, 11, 58, 3).getTime();

function fmt12(t: Date) {
  const h  = t.getHours() % 12 || 12;
  const m  = String(t.getMinutes()).padStart(2, "0");
  const s  = t.getSeconds();
  const ap = t.getHours() < 12 ? "AM" : "PM";
  return s ? `${h}:${m}:${String(s).padStart(2, "0")} ${ap}` : `${h}:${m} ${ap}`;
}

function fmtRelToShoot(time: Date): string {
  const diffMs   = time.getTime() - SHOOT_MS;
  const totalSec = Math.round(Math.abs(diffMs) / 1000);
  if (totalSec === 0) return "at the shooting";
  const suffix = diffMs < 0 ? "until the shooting" : "after the shooting";
  if (totalSec < 60) return `${totalSec} sec ${suffix}`;
  const mins = Math.floor(totalSec / 60);
  const secs = totalSec % 60;
  if (mins < 60) {
    if (secs === 0) return `${mins} min ${suffix}`;
    return `${mins} min ${secs} sec ${suffix}`;
  }
  const hrs  = Math.floor(mins / 60);
  const remM = mins % 60;
  const hrLabel = hrs === 1 ? "1hr" : `${hrs}hrs`;
  if (remM === 0) return `${hrLabel} ${suffix}`;
  return `${hrLabel} ${remM}min ${suffix}`;
}

function fmtRange(start: Date, end?: Date) {
  const rel = fmtRelToShoot(start);
  return end
    ? `${fmt12(start)} – ${fmt12(end)}  ·  ${rel}`
    : `${fmt12(start)}  ·  ${rel}`;
}

// ── Component ─────────────────────────────────────────────────────────────────

type DayTimelineProps = {
  variant?: "embedded" | "page";
};

export default function DayTimeline({ variant = "embedded" }: DayTimelineProps) {
  const outerRef  = useRef<HTMLDivElement>(null);
  const scrubRef  = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const p = useRef({
    px: 0, off: 0, vpW: 0, touchFling: false,
    dragging: false, pendingPointerId: -1, dragX0: 0, dragOff0: 0,
    velX: 0, lastX: 0, lastT: 0,
    animRaf: 0,
    pxRaf: 0,
    zoomRaf: 0, zoomStartPx: 0, zoomTargetPx: 0, zoomStartT: 0,
    pinching: false,
    pinchStartDist: 0,
    scaleStartPx: 0,
    scaleStartOff: 0,
    portrait: false,
    wheelVel: 0,
    wheelRaf: 0,
    panelTouch: false,
    swipeX0: 0,
    swipeY0: 0,
    swipeLocked: false,
  });

  const navRef = useRef({
    selectEvent: (_evt: Evt) => {},
    selected: null as Evt | null,
    panelAnimating: false,
  });

  const [view, setView]         = useState({ px: 0, off: 0, vpW: 0 });
  const [selected, setSelected] = useState<Evt | null>(null);
  const [displayEvt, setDisplayEvt] = useState<Evt | null>(null);
  const [panelPages, setPanelPages] = useState<Evt[]>([]);
  const [panelProgress, setPanelProgress] = useState(0);
  const [panelAnimating, setPanelAnimating] = useState(false);
  const [panelVpW, setPanelVpW] = useState(0);
  const panelProgressRef = useRef(0);
  const panelRafRef = useRef(0);
  const panelVpRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [portrait, setPortrait] = useState(false);
  const [cssFullscreen, setCssFullscreen] = useState(false);
  const [nativeFullscreen, setNativeFullscreen] = useState(false);
  const fullscreen = cssFullscreen || nativeFullscreen;

  useEffect(() => {
    const onChange = () => setNativeFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (cssFullscreen) { setCssFullscreen(false); return; }
    if (nativeFullscreen) { document.exitFullscreen(); return; }
    if (outerRef.current?.requestFullscreen) {
      outerRef.current.requestFullscreen().catch(() => setCssFullscreen(true));
    } else {
      setCssFullscreen(true);
    }
  }, [cssFullscreen, nativeFullscreen]);

  useEffect(() => {
    const mq = window.matchMedia("(orientation: portrait)");
    const update = (val: boolean) => {
      p.current.portrait = val;
      p.current.px = 0; // reset so init recalculates for new axis
      setPortrait(val);
    };
    update(mq.matches);
    const handler = (e: MediaQueryListEvent) => update(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const syncView = useCallback(() => {
    const { px, off, vpW } = p.current;
    setView({ px, off, vpW });
  }, []);


  const clampState = useCallback((allowOvershoot = false) => {
    const s = p.current;
    const centerSecs = s.px > 0 ? (s.off + s.vpW / 2) / s.px : 0;
    const prevPx = s.px;
    s.px = Math.max(MIN_PX, Math.min(effectiveMaxPx(centerSecs, s.vpW), s.px));
    if (s.px !== prevPx) s.off = centerSecs * s.px - s.vpW / 2;
    const maxOff = Math.max(0, s.px * TOTAL_SECS - s.vpW);
    if (!allowOvershoot) s.off = Math.max(0, Math.min(s.off, maxOff));
  }, []);

  const triggerZoom = useCallback((targetPx: number) => {
    const s = p.current;
    s.zoomStartPx = s.px;
    s.zoomTargetPx = targetPx;
    s.zoomStartT = performance.now();
    if (s.zoomRaf) return;
    const tick = (now: number) => {
      const progress = Math.min((now - s.zoomStartT) / 330, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const cx = s.vpW / 2;
      const prevPx = s.px;
      s.px = s.zoomStartPx + (s.zoomTargetPx - s.zoomStartPx) * ease;
      const centerSecs = prevPx > 0 ? (s.off + cx) / prevPx : 0;
      s.off = centerSecs * s.px - cx;
      const maxOff = Math.max(0, s.px * TOTAL_SECS - s.vpW);
      s.off = Math.max(0, Math.min(s.off, maxOff));
      syncView();
      if (progress < 1) {
        s.zoomRaf = requestAnimationFrame(tick);
      } else {
        s.zoomRaf = 0;
      }
    };
    s.zoomRaf = requestAnimationFrame(tick);
  }, [syncView]);

  // ── Fling + bounce ───────────────────────────────────────────────────────────

  const startFling = useCallback((vel: number) => {
    cancelAnimationFrame(p.current.animRaf);
    cancelAnimationFrame(p.current.pxRaf);
    let lastT = -1;

    const tick = (now: number) => {
      if (lastT < 0) { lastT = now; p.current.animRaf = requestAnimationFrame(tick); return; }
      const dt = Math.min((now - lastT) / 1000, 0.05);
      lastT = now;

      const s      = p.current;
      const maxOff = Math.max(0, s.px * TOTAL_SECS - s.vpW);

      const substeps = s.touchFling ? 10 : 1;
      const subDt = dt / substeps;
      for (let i = 0; i < substeps; i++) {
        const curMaxOff = Math.max(0, s.px * TOTAL_SECS - s.vpW);
        if (s.off < 0) {
          vel += (-s.off) * 280 * subDt;
          vel *= Math.pow(0.0005, subDt);
        } else if (s.off > curMaxOff) {
          vel -= (s.off - curMaxOff) * 280 * subDt;
          vel *= Math.pow(0.0005, subDt);
        } else {
          vel *= s.touchFling ? Math.pow(0.05, subDt) : Math.pow(0.0001, subDt);
        }
        s.off += vel * subDt;
        const tcx = s.vpW / 2;
        const tcs = (s.off + tcx) / s.px;
        const tpx = transitionPx(tcs, s.vpW);
        if (tpx !== null) { s.px = tpx; s.off = tcs * s.px - tcx; }
      }
      syncView();

      if (Math.abs(vel) < 1 && s.off >= -0.5 && s.off <= maxOff + 0.5) {
        s.off = Math.max(0, Math.min(s.off, maxOff));
        syncView();
        return;
      }
      p.current.animRaf = requestAnimationFrame(tick);
    };
    p.current.animRaf = requestAnimationFrame(tick);
  }, [syncView]);

  const scrollToSecs = useCallback((secs: number) => {
    cancelAnimationFrame(p.current.animRaf);
    cancelAnimationFrame(p.current.pxRaf);
    cancelAnimationFrame(p.current.zoomRaf);
    p.current.zoomRaf = 0;
    const s = p.current;
    const startCenterSecs = (s.off + s.vpW / 2) / s.px;
    const startT = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - startT) / SCROLL_ANIM_MS, 1);
      const ease = easeInOut(t);
      const centerSecs = startCenterSecs + (secs - startCenterSecs) * ease;
      const tpx = transitionPx(centerSecs, s.vpW);
      if (tpx !== null) s.px = tpx;
      const maxOff = Math.max(0, s.px * TOTAL_SECS - s.vpW);
      s.off = Math.max(0, Math.min(centerSecs * s.px - s.vpW / 2, maxOff));
      syncView();
      if (t < 1) {
        p.current.animRaf = requestAnimationFrame(tick);
      }
    };
    p.current.animRaf = requestAnimationFrame(tick);
  }, [syncView]);

  const animateRulerToEvent = useCallback((evt: Evt) => {
    cancelAnimationFrame(p.current.animRaf);
    cancelAnimationFrame(p.current.pxRaf);
    cancelAnimationFrame(p.current.zoomRaf);
    p.current.zoomRaf = 0;
    const s = p.current;
    const targetSecs = (evt.time.getTime() - START_MS) / 1000;
    const startCenterSecs = (s.off + s.vpW / 2) / s.px;
    const startT = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - startT) / SCROLL_ANIM_MS, 1);
      const ease = easeInOut(t);
      const centerSecs = startCenterSecs + (targetSecs - startCenterSecs) * ease;
      const tpx = transitionPx(centerSecs, s.vpW);
      if (tpx !== null) s.px = tpx;
      const maxOff = Math.max(0, s.px * TOTAL_SECS - s.vpW);
      s.off = Math.max(0, Math.min(centerSecs * s.px - s.vpW / 2, maxOff));
      syncView();
      if (t < 1) {
        p.current.animRaf = requestAnimationFrame(tick);
      }
    };
    p.current.animRaf = requestAnimationFrame(tick);
  }, [syncView]);

  const applyPanelTransform = useCallback((progress: number) => {
    const w = panelVpRef.current?.offsetWidth ?? 0;
    if (sliderRef.current && w > 0) {
      sliderRef.current.style.transform = `translate3d(${-progress * w}px,0,0)`;
    }
  }, []);

  const animatePanelPages = useCallback((
    pages: Evt[],
    prevIdx: number,
    targetIdx: number,
    duration: number,
  ) => {
    cancelAnimationFrame(panelRafRef.current);
    const dir = targetIdx > prevIdx ? 1 : -1;
    const start = dir > 0 ? 0 : pages.length - 1;
    const end = dir > 0 ? pages.length - 1 : 0;

    setPanelPages(pages);
    panelProgressRef.current = start;
    applyPanelTransform(start);
    setPanelProgress(start);
    setPanelAnimating(true);

    const startT = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - startT) / duration, 1);
      const progress = start + (end - start) * easeInOut(t);
      panelProgressRef.current = progress;
      applyPanelTransform(progress);

      if (t < 1) {
        panelRafRef.current = requestAnimationFrame(tick);
      } else {
        panelProgressRef.current = end;
        applyPanelTransform(end);
        setPanelPages([pages[end]]);
        setPanelProgress(0);
        setPanelAnimating(false);
        setDisplayEvt(pages[end]);
      }
    };
    panelRafRef.current = requestAnimationFrame(tick);
  }, [applyPanelTransform]);

  const deselectEvent = useCallback(() => {
    cancelAnimationFrame(panelRafRef.current);
    setSelected(null);
    setDisplayEvt(null);
    setPanelPages([]);
    setPanelProgress(0);
    setPanelAnimating(false);
    panelProgressRef.current = 0;
  }, []);

  const selectEvent = useCallback((evt: Evt) => {
    const prev = displayEvt ?? selected;
    const prevIdx = prev ? EVENTS.findIndex(e => e.id === prev.id) : -1;
    const targetIdx = EVENTS.findIndex(e => e.id === evt.id);

    setSelected(evt);
    animateRulerToEvent(evt);

    if (p.current.portrait) {
      cancelAnimationFrame(panelRafRef.current);
      setDisplayEvt(evt);
      setPanelPages([evt]);
      setPanelAnimating(false);
    } else if (prevIdx < 0 || prevIdx === targetIdx) {
      cancelAnimationFrame(panelRafRef.current);
      setDisplayEvt(evt);
      setPanelPages([evt]);
      setPanelProgress(0);
      setPanelAnimating(false);
      panelProgressRef.current = 0;
      applyPanelTransform(0);
    } else if (prev) {
      const pages = buildPanelPages(prev, evt, prevIdx, targetIdx);
      const skip = Math.abs(targetIdx - prevIdx) > 1;
      setDisplayEvt(evt);
      animatePanelPages(pages, prevIdx, targetIdx, skip ? SCROLL_ANIM_MS : PANEL_ADJACENT_MS);
    }
  }, [displayEvt, selected, animateRulerToEvent, animatePanelPages, applyPanelTransform]);

  navRef.current = { selectEvent, selected, panelAnimating };

  useEffect(() => {
    const el = panelVpRef.current;
    if (!el || !selected) return;
    const measure = () => {
      const w = el.offsetWidth;
      if (w > 0) {
        setPanelVpW(w);
        applyPanelTransform(panelProgressRef.current);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [selected, applyPanelTransform, portrait]);

  // ── Init + resize ────────────────────────────────────────────────────────────

  useEffect(() => {
    const el = scrubRef.current;
    if (!el) return;
    const init = (w: number) => {
      p.current.vpW = w;
      if (p.current.px === 0) {
        const minPx = Math.max(MIN_PX, w / TOTAL_SECS);
        p.current.px = minPx;
        p.current.off = t2s(9, 30) * minPx - w / 2;
      }
      clampState();
      syncView();
    };
    const dim = el.clientWidth;
    init(dim);
    const ro = new ResizeObserver(([e]) => {
      init(e.contentRect.width);
    });
    ro.observe(el);
    const state = p.current;
    return () => { ro.disconnect(); state.vpW = 0; };
  }, [clampState, syncView, portrait]);

  // ── Canvas draw ──────────────────────────────────────────────────────────────

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || view.vpW === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = view.vpW * dpr;
    canvas.height = STRIP_H * dpr;
    canvas.style.width  = `${view.vpW}px`;
    canvas.style.height = `${STRIP_H}px`;
    ctx.scale(dpr, dpr);
    drawRuler(ctx, view.vpW, view.px, view.off);
  }, [view]);

  // ── Non-passive wheel ────────────────────────────────────────────────────────

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      cancelAnimationFrame(p.current.animRaf);
      const s = p.current;
      if (e.ctrlKey || e.metaKey) {
        const factor = e.deltaY > 0 ? 0.88 : 1.14;
        const centerSecs = (s.off + s.vpW / 2) / s.px;
        triggerZoom(Math.max(MIN_PX, Math.min(effectiveMaxPx(centerSecs, s.vpW), s.px * factor)));
        return;
      }
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      s.wheelVel += delta * 3;
      s.wheelVel = Math.sign(s.wheelVel) * Math.min(Math.abs(s.wheelVel), 3000);
      if (s.wheelRaf) return;
      let lastT = -1;
      const tick = (now: number) => {
        if (lastT < 0) { lastT = now; s.wheelRaf = requestAnimationFrame(tick); return; }
        const dt = Math.min((now - lastT) / 1000, 0.05);
        lastT = now;
        s.off += s.wheelVel * dt;
        s.wheelVel *= Math.pow(0.04, dt);
        const maxOff = Math.max(0, s.px * TOTAL_SECS - s.vpW);
        s.off = Math.max(0, Math.min(s.off, maxOff));
        const tcx = s.vpW / 2;
        const tcs = (s.off + tcx) / s.px;
        const tpx = transitionPx(tcs, s.vpW);
        if (tpx !== null) { s.px = tpx; s.off = tcs * s.px - tcx; }
        syncView();
        if (Math.abs(s.wheelVel) < 1) { s.wheelRaf = 0; return; }
        s.wheelRaf = requestAnimationFrame(tick);
      };
      s.wheelRaf = requestAnimationFrame(tick);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [clampState, syncView, triggerZoom]);

  // ── Mouse / stylus drag ────────────────────────────────────────────────────────

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    cancelAnimationFrame(p.current.animRaf);
    cancelAnimationFrame(p.current.pxRaf);
    cancelAnimationFrame(p.current.zoomRaf);
    cancelAnimationFrame(p.current.wheelRaf);
    p.current.zoomRaf = 0;
    p.current.wheelRaf = 0;
    p.current.wheelVel = 0;
    const s = p.current;
    outerRef.current?.setPointerCapture(e.pointerId);
    const coord = e.clientX;
    s.pendingPointerId = e.pointerId;
    s.dragX0 = coord; s.dragOff0 = s.off;
    s.velX = 0; s.lastX = coord; s.lastT = performance.now();
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    const s = p.current;
    const coord = e.clientX;
    if (s.pendingPointerId === e.pointerId && !s.dragging) {
      if (Math.abs(coord - s.dragX0) > 5) {
        s.dragging = true;
        s.pendingPointerId = -1;
      }
    }
    if (!s.dragging) return;
    const now = performance.now();
    const dt  = now - s.lastT;
    if (dt > 0 && dt < 80) s.velX = (s.lastX - coord) / dt * 1000;
    s.lastX = coord; s.lastT = now;
    const maxOff = s.px * TOTAL_SECS - s.vpW;
    s.off = Math.max(-80, Math.min(s.dragOff0 - (coord - s.dragX0), maxOff + 80));
    const tcx = s.vpW / 2;
    const tcs = (s.off + tcx) / s.px;
    const tpx = transitionPx(tcs, s.vpW);
    if (tpx !== null) { s.px = tpx; s.off = tcs * s.px - tcx; s.dragOff0 = s.off + (coord - s.dragX0); }
    syncView();
  }, [syncView]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    const s = p.current;
    s.pendingPointerId = -1;
    if (!s.dragging) return;
    s.dragging = false;
    s.touchFling = false;
    startFling(s.velX);
  }, [startFling]);

  // ── Touch drag + pinch zoom ────────────────────────────────────────────────────

  const PANEL_SWIPE_THRESHOLD = 50;

  const isLandscapePanelTouch = (clientY: number) => {
    const strip = scrubRef.current;
    if (!strip || p.current.portrait) return false;
    return clientY < strip.getBoundingClientRect().top;
  };

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      cancelAnimationFrame(p.current.animRaf);
      cancelAnimationFrame(p.current.pxRaf);
      cancelAnimationFrame(p.current.zoomRaf);
      cancelAnimationFrame(p.current.wheelRaf);
      p.current.zoomRaf = 0;
      p.current.wheelRaf = 0;
      p.current.wheelVel = 0;
      const s = p.current;
      if (e.touches.length === 1) {
        s.pinching = false;
        s.dragging = false;
        s.panelTouch = false;
        s.swipeLocked = false;
        const t = e.touches[0];
        if (isLandscapePanelTouch(t.clientY)) {
          s.panelTouch = true;
          s.swipeX0 = t.clientX;
          s.swipeY0 = t.clientY;
          return;
        }
        const c0 = t.clientX;
        s.dragX0 = c0; s.dragOff0 = s.off;
        s.velX = 0; s.lastX = c0; s.lastT = performance.now();
      } else if (e.touches.length === 2) {
        e.preventDefault();
        s.dragging = false;
        s.panelTouch = false;
        s.swipeLocked = false;
        s.pinching = true;
        const t0 = e.touches[0], t1 = e.touches[1];
        s.pinchStartDist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
        s.scaleStartPx = s.px;
        s.scaleStartOff = s.off;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const s = p.current;
      if (s.pinching && e.touches.length === 2) {
        const t0 = e.touches[0], t1 = e.touches[1];
        const newDist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
        if (s.pinchStartDist > 0) {
          const scale = newDist / s.pinchStartDist;
          const cx = s.vpW / 2;
          const focalSecs = (s.scaleStartOff + cx) / s.scaleStartPx;
          const centerSecs = (s.scaleStartOff + cx) / s.scaleStartPx;
          s.px = Math.max(MIN_PX, Math.min(effectiveMaxPx(centerSecs, s.vpW), s.scaleStartPx * scale));
          s.off = focalSecs * s.px - cx;
          clampState();
          syncView();
        }
        return;
      }
      if (s.panelTouch && e.touches.length === 1) {
        const t = e.touches[0];
        const dx = t.clientX - s.swipeX0;
        const dy = t.clientY - s.swipeY0;
        if (!s.swipeLocked) {
          if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy) * 1.2) s.swipeLocked = true;
          else return;
        }
        e.preventDefault();
        return;
      }
      if (e.touches.length === 1) {
        const t = e.touches[0];
        const coord = t.clientX;
        if (!s.dragging) {
          if (Math.abs(coord - s.dragX0) > 5) s.dragging = true;
          else return;
        }
        const now = performance.now();
        const dt = now - s.lastT;
        const prevX = s.lastX;
        if (dt > 0 && dt < 80) s.velX = (prevX - coord) / dt * 1000;
        s.lastX = coord; s.lastT = now;
        const maxOff = s.px * TOTAL_SECS - s.vpW;
        s.dragX0 += (coord - prevX) * 0.5;
        s.off = Math.max(-80, Math.min(s.dragOff0 - (coord - s.dragX0), maxOff + 80));
        const tcx = s.vpW / 2;
        const tcs = (s.off + tcx) / s.px;
        const tpx = transitionPx(tcs, s.vpW);
        if (tpx !== null) { s.px = tpx; s.off = tcs * s.px - tcx; s.dragOff0 = s.off + (coord - s.dragX0); }
        syncView();
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      const s = p.current;
      if (s.panelTouch) {
        const { selectEvent: go, selected: cur, panelAnimating: animating } = navRef.current;
        if (s.swipeLocked && cur && !animating && e.changedTouches.length > 0) {
          const dx = e.changedTouches[0].clientX - s.swipeX0;
          const idx = EVENTS.findIndex(ev => ev.id === cur.id);
          if (dx <= -PANEL_SWIPE_THRESHOLD && idx >= 0 && idx < EVENTS.length - 1) {
            go(EVENTS[idx + 1]);
          } else if (dx >= PANEL_SWIPE_THRESHOLD && idx > 0) {
            go(EVENTS[idx - 1]);
          }
        }
        s.panelTouch = false;
        s.swipeLocked = false;
        return;
      }
      if (s.pinching) {
        s.pinching = false;
        if (e.touches.length === 1) {
          const t = e.touches[0];
          const ct = t.clientX;
          s.dragX0 = ct; s.dragOff0 = s.off;
          s.velX = 0; s.lastX = ct; s.lastT = performance.now();
        }
        return;
      }
      if (!s.dragging) return;
      s.dragging = false;
      if (e.touches.length === 0) { s.touchFling = true; startFling(s.velX); }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: false });
    el.addEventListener("touchmove",  onTouchMove,  { passive: false });
    el.addEventListener("touchend",   onTouchEnd);
    el.addEventListener("touchcancel",onTouchEnd);
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove",  onTouchMove);
      el.removeEventListener("touchend",   onTouchEnd);
      el.removeEventListener("touchcancel",onTouchEnd);
    };
  }, [clampState, syncView, startFling, portrait]);

  useEffect(() => () => {
    cancelAnimationFrame(p.current.animRaf);
    cancelAnimationFrame(p.current.pxRaf);
    cancelAnimationFrame(p.current.zoomRaf);
    cancelAnimationFrame(p.current.wheelRaf);
    cancelAnimationFrame(panelRafRef.current);
  }, []);

  // ── Marker layout ─────────────────────────────────────────────────────────────

  const { px, off, vpW } = view;

  const visible = EVENTS.map(evt => ({
    evt,
    x: (evt.time.getTime() - START_MS) / 1000 * px - off,
  })).filter(({ x }) => x >= -(CARD_W + 20) && x <= vpW + CARD_W + 20);

  const visibleSecs = px > 0 ? vpW / px : 0;
  const zoomedOut = visibleSecs >= YOON_DMH_MERGE_SECS;

  const clusters = buildClusters(visible.map(({ evt, x }) => ({ evt, pos: x })), zoomedOut);
  const clusterLanes: Record<string, number> = {};
  const laneLastX: number[] = [-CARD_W * 2];
  [...clusters].sort((a, b) => a.pos - b.pos).forEach(c => {
    let lane = 0;
    while (lane < laneLastX.length && c.pos - laneLastX[lane] < CARD_W + 6) lane++;
    const assigned = Math.min(lane, MAX_LANES - 1);
    if (lane >= laneLastX.length) laneLastX.push(c.pos);
    else laneLastX[assigned] = c.pos;
    clusterLanes[c.lead.id] = assigned;
  });

  const visibleDurations = EVENTS.filter((evt): evt is Evt & { endTime: Date } => !!evt.endTime)
    .map(evt => {
      const start = (evt.time.getTime() - START_MS) / 1000 * px - off;
      const end = (evt.endTime.getTime() - START_MS) / 1000 * px - off;
      return { evt, start, end };
    })
    .filter(({ start, end }) => end >= -20 && start <= vpW + 20);

  const shootZone = ZOOM_TRANSITIONS[1];
  const zoneX0 = (shootZone.start - 25) * px - off;
  const zoneX1 = (shootZone.end   - 25) * px - off;
  const dmhHighlightStart = (EVENTS[1].time.getTime() - START_MS) / 1000;
  const dmhHighlightEnd   = (EVENTS[3].time.getTime() - START_MS) / 1000;
  const zone2X0 = dmhHighlightStart * px - off;
  const zone2X1 = dmhHighlightEnd   * px - off + DOT_R * 2 + 2;

  // ── Ruler label arrays (DOM, so they can animate) ─────────────────────────

  const zoomLabel = (() => {
    if (px <= 0 || vpW <= 0) return "";
    const secs = vpW / px;
    if (secs < 120) return `${Math.round(secs)}s`;
    if (secs < 3600) return `${Math.round(secs / 60)}m`;
    const h = Math.floor(secs / 3600), m = Math.round((secs % 3600) / 60);
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  })();

  const LABEL_STEPS = [30, 60, 300, 3600];
  const labelStep = LABEL_STEPS.find(s => s * px >= 50) ?? 3600;

  const rulerLabels: { s: number; x: number; label: string }[] = [];
  if (px > 0 && vpW > 0) {
    const first = Math.floor((off / px) / labelStep) * labelStep;
    for (let s = first; s <= (off + vpW) / px + labelStep; s += labelStep) {
      if (s < 0 || s > TOTAL_SECS) continue;
      const x = s * px - off;
      if (x < -40 || x > vpW + 40) continue;
      rulerLabels.push({
        s,
        x,
        label: portrait ? fmtRelToShoot(new Date(START_MS + s * 1000)) : tickLabel(s),
      });
    }
  }

  // ── Shared event panel ────────────────────────────────────────────────────────

  const selectedIdx = selected ? EVENTS.findIndex(e => e.id === selected.id) : -1;
  const hasPrev = selectedIdx > 0;
  const hasNext = selectedIdx >= 0 && selectedIdx < EVENTS.length - 1;

  const navBtnClass =
    "absolute top-0 bottom-0 z-20 w-11 sm:w-12 flex items-center justify-center text-white/25 hover:text-white/70 disabled:opacity-20 disabled:pointer-events-none transition-colors cursor-pointer";

  const idlePanel = (
    <div className="h-full flex flex-col items-center justify-center p-5 sm:px-8 select-none text-center">
      <h2 className="text-white font-semibold text-xl sm:text-2xl mb-3">
        May 2nd, 2024 Timeline
      </h2>
      <p className="text-white/55 text-sm sm:text-[15px] leading-relaxed mb-8 max-w-lg">
        Drag or scroll to pan · Ctrl+scroll to zoom · Click any event to read details
      </p>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 w-full max-w-65 mb-8">
        <div className="flex justify-center">
          <Image src="/icons/scroll.svg" alt="" width={200} height={200} className="w-1/2 aspect-square invert opacity-35" unoptimized />
        </div>
        <div className="flex items-center gap-1">
          <div className="flex-1">
            <Image src="/icons/ctrl.svg" alt="" width={200} height={200} className="w-full aspect-square invert opacity-35" unoptimized />
          </div>
          <span className="text-white/20 text-xs shrink-0">+</span>
          <div className="flex-1">
            <Image src="/icons/scroll.svg" alt="" width={200} height={200} className="w-full aspect-square invert opacity-35" unoptimized />
          </div>
        </div>
        <p className="text-center text-white/30 text-xs uppercase tracking-widest">Pan</p>
        <p className="text-center text-white/30 text-xs uppercase tracking-widest">Zoom</p>
        <div className="flex justify-center">
          <Image
            src={portrait ? "/icons/touchpan.svg" : "/icons/touchpanLR.svg"}
            alt=""
            width={200}
            height={200}
            className="w-1/2 aspect-square invert opacity-35"
            unoptimized
          />
        </div>
        <div className="flex justify-center">
          <Image
            src={portrait ? "/icons/touchzoom.svg" : "/icons/touchzoomLR.svg"}
            alt=""
            width={200}
            height={200}
            className="w-1/2 aspect-square invert opacity-35"
            unoptimized
          />
        </div>
      </div>
      <p className="text-white/40 text-sm">
        Select an event for detailed information
      </p>
    </div>
  );

  const renderEventMedia = (evt: Evt, isActive: boolean, compact = false) => (
    <div className={`grid grid-cols-1 w-full ${compact ? "h-full" : "gap-4 max-w-md lg:max-w-lg"}`}>
      {evt.videoUrl && (
        <div className={`relative w-full bg-black/40 rounded-sm overflow-hidden shadow-lg ${
          compact ? "h-full" : "aspect-video"
        }`}>
          {isActive ? (
            <iframe
              src={evt.videoUrl}
              title={evt.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <div className="absolute inset-0 bg-black/25" />
          )}
        </div>
      )}
      {evt.thumbnailUrl && !evt.videoUrl && (
        <div className={`relative flex items-center justify-center w-full bg-black/20 rounded-sm overflow-hidden shadow-lg ${
          compact ? "h-full p-1" : "max-h-[min(50vh,420px)] p-2"
        }`}>
          <Image
            src={evt.thumbnailUrl}
            alt=""
            width={960}
            height={720}
            className={compact ? "max-h-full w-auto h-auto object-contain" : "max-h-[min(48vh,400px)] w-auto h-auto object-contain"}
            unoptimized
          />
        </div>
      )}
    </div>
  );

  const renderEventContent = (evt: Evt, isActive: boolean) => (
    <div className="h-full w-full min-h-0 flex flex-row">
      <div className="min-w-0 flex flex-[1.15] items-center justify-center p-5 sm:p-8 md:p-10">
        {renderEventMedia(evt, isActive)}
      </div>

      <div className="min-w-0 flex flex-[0.85] flex-col justify-center overflow-y-auto py-6 sm:py-8 pl-6 sm:pl-10 md:pl-12 pr-4 sm:pr-8">
        <p className="font-mono text-sm text-white/50 mb-2">
          {fmt12(evt.time)}
          {evt.endTime ? ` – ${fmt12(evt.endTime)}` : ""}
        </p>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug mb-4">
          {evt.title}
        </h2>
        <p className="text-white/70 text-[15px] leading-relaxed mb-5">
          {evt.text}
        </p>
        <p className="text-sm font-medium" style={{ color: evt.color }}>
          {fmtRelToShoot(evt.time)}
        </p>
      </div>
    </div>
  );

  const portraitHint = (
    <div className="flex flex-1 min-h-0 flex-col items-center justify-center px-5 bg-[#151b28] select-none text-center">
      <p className="text-white/55 text-sm leading-relaxed mb-6">
        Drag to pan · Pinch to zoom · Tap an event
      </p>
      <div className="flex gap-8">
        <Image src="/icons/touchpanLR.svg" alt="" width={80} height={80} className="w-16 invert opacity-35" unoptimized />
        <Image src="/icons/touchzoomLR.svg" alt="" width={80} height={80} className="w-16 invert opacity-35" unoptimized />
      </div>
    </div>
  );

  const mobileOverlay = selected && (
    <div
      className="fixed inset-0 z-[200] flex flex-col bg-[#151b28] touch-auto"
      onPointerDown={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={deselectEvent}
        className="absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
        aria-label="Close"
      >
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 4l8 8M12 4l-8 8" />
        </svg>
      </button>
      <div className="flex-1 min-h-0 overflow-y-auto flex flex-col justify-center px-5 py-12">
        <div className="w-full text-left">
          <div className="mb-5 w-full max-w-lg">
            {renderEventMedia(selected, true)}
          </div>
          <h2 className="font-serif text-xl font-bold text-white leading-snug mb-3 max-w-lg">
            {selected.title}
          </h2>
          <p className="font-mono text-sm text-white/50 mb-2 max-w-lg">
            {fmt12(selected.time)}
            {selected.endTime ? ` – ${fmt12(selected.endTime)}` : ""}
          </p>
          <p className="text-sm font-medium mb-5 max-w-lg" style={{ color: selected.color }}>
            {fmtRelToShoot(selected.time)}
          </p>
          <p className="text-white/70 text-[15px] leading-relaxed max-w-lg">
            {selected.text}
          </p>
        </div>
      </div>
    </div>
  );

  const shownEvt = displayEvt ?? selected;
  const carouselPages = panelPages.length > 0 ? panelPages : (shownEvt ? [shownEvt] : []);
  const panelTransform = `translate3d(${-panelProgress * panelVpW}px,0,0)`;

  const eventPanel = (
    <div className="flex-1 relative overflow-hidden min-h-0 bg-[#151b28]">
      {selected ? (
          <>
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => hasPrev && selectEvent(EVENTS[selectedIdx - 1])}
              disabled={!hasPrev}
              className={`${navBtnClass} left-0`}
              aria-label="Previous event"
            >
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M10 3L5 8l5 5" />
              </svg>
            </button>
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => hasNext && selectEvent(EVENTS[selectedIdx + 1])}
              disabled={!hasNext}
              className={`${navBtnClass} right-0`}
              aria-label="Next event"
            >
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 3l5 5-5 5" />
              </svg>
            </button>

            <div ref={panelVpRef} className="absolute inset-x-11 sm:inset-x-12 inset-y-0 overflow-hidden">
              {shownEvt && panelVpW > 0 && (
                <div
                  ref={sliderRef}
                  className="absolute top-0 left-0 h-full will-change-transform"
                  style={panelAnimating ? undefined : { transform: panelTransform }}
                >
                  {carouselPages.map((evt, i) => (
                    <div
                      key={`${evt.id}-${i}`}
                      className="absolute top-0 h-full"
                      style={{ width: panelVpW, left: i * panelVpW }}
                    >
                      {renderEventContent(evt, !panelAnimating && evt.id === selected?.id)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : idlePanel}
    </div>
  );

  const timelineStrip = (
    <div
      ref={scrubRef}
      className="relative shrink-0 border-t border-white/10 overflow-hidden"
      style={{ height: STRIP_H, background: "#0e1420" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      <div className="absolute inset-y-0 pointer-events-none" style={{ left: zone2X0, width: Math.max(0, zone2X1 - zone2X0), background: "rgba(255,68,68,0.08)", borderLeft: "1px solid rgba(255,68,68,0.25)", borderRight: "1px solid rgba(255,68,68,0.25)" }} />
      <div className="absolute inset-y-0 pointer-events-none" style={{ left: zoneX0, width: Math.max(0, zoneX1 - zoneX0), background: "rgba(255,68,68,0.08)", borderLeft: "1px solid rgba(255,68,68,0.25)", borderRight: "1px solid rgba(255,68,68,0.25)" }} />
      {px > 0 && visibleDurations.map(({ evt, start, end }) => {
        const isSel = selected?.id === evt.id;
        return (
        <div
          key={`dur-${evt.id}`}
          className="absolute pointer-events-none"
          style={{
            left: start,
            top: LINE_Y - DURATION_H / 2,
            width: Math.max(0, end - start),
            height: DURATION_H,
            backgroundColor: isSel ? evt.color : `${evt.color}99`,
            zIndex: isSel ? 1 : 0,
          }}
        />
      );})}
      {px > 0 && clusters.map((cluster) => {
        const { lead, pos: x, r, evts } = cluster;
        const lane = clusterLanes[lead.id] ?? 0;
        const isSel = evts.some(e => selected?.id === e.id);
        const cardBot = LINE_Y - DOT_R - 6 - lane * LANE_H;
        const cardTop = cardBot - CARD_H;
        const stemH   = Math.max(0, LINE_Y - DOT_R - 4 - cardBot);
        return (
          <Fragment key={lead.id}>
            <button
              className="absolute focus:outline-none cursor-pointer"
              onPointerDown={(e) => e.stopPropagation()}
              style={{
                left: x,
                top: Math.max(0, cardTop - 2),
                height: CARD_H + 6,
                zIndex: isSel ? 2 : 1,
                overflow: "visible",
                transition: "top 0.33s ease-out",
                animation: "tl-card-in 0.2s ease-out forwards",
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (!isSel) {
                  selectEvent(lead);
                } else {
                  const curIdx = evts.findIndex(ev => ev.id === selected?.id);
                  const next = evts[(curIdx + 1) % evts.length];
                  if (next.id === selected?.id) deselectEvent();
                  else selectEvent(next);
                }
              }}
            >
              <div
                className="flex items-center overflow-hidden transition-all duration-150"
                style={{
                  position: "absolute",
                  top: 2, left: 0, height: CARD_H,
                  minWidth: CARD_W, maxWidth: CARD_W_MAX,
                  width: "max-content",
                  borderRadius: 5,
                  paddingLeft: 8, paddingRight: 6,
                  background: isSel ? `${lead.color}1a` : "rgba(20,28,45,0.95)",
                  border: `1px solid ${lead.color}${isSel ? "55" : "2a"}`,
                  borderLeft: `3px solid ${lead.color}${isSel ? "cc" : "88"}`,
                  boxShadow: isSel ? `0 0 12px ${lead.color}22` : "none",
                }}
              >
                <span
                  className="text-[10px] leading-none whitespace-nowrap transition-colors duration-150"
                  style={{ color: isSel ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.6)" }}
                >
                  {lead.title}
                </span>
              </div>
              {stemH > 0 && (
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: DOT_R - 0.5, top: CARD_H + 4,
                    width: 1, height: stemH,
                    background: `linear-gradient(to bottom, ${lead.color}55, ${lead.color}1a)`,
                  }}
                />
              )}
            </button>
            <div
              className="absolute pointer-events-none rounded-full"
              style={{
                left: x + DOT_R - r,
                top: LINE_Y - r,
                width: r * 2,
                height: r * 2,
                background: isSel ? lead.color : `${lead.color}99`,
                boxShadow: isSel ? `0 0 10px 3px ${lead.color}44` : "none",
                transition: "width 150ms, height 150ms, background 150ms, box-shadow 150ms",
                zIndex: isSel ? 3 : 2,
              }}
            />
          </Fragment>
        );
      })}
      {rulerLabels.map(({ s, x, label }) => (
        <span
          key={s}
          className="absolute font-mono pointer-events-none"
          style={{
            left: x,
            top: LINE_Y + 18,
            transform: "translateX(-50%)",
            fontSize: portrait ? 9 : 11,
            color: "rgba(255,255,255,0.45)",
            animation: "tl-fade-in 0.25s ease-out forwards",
            whiteSpace: "nowrap",
            maxWidth: portrait ? 100 : undefined,
            overflow: portrait ? "hidden" : undefined,
            textOverflow: portrait ? "ellipsis" : undefined,
          }}
        >
          {label}
        </span>
      ))}
      <span className="absolute bottom-1.5 right-2 font-mono pointer-events-none select-none"
        style={{ fontSize: 10, color: "rgba(255,255,255,0.25)" }}>
        {zoomLabel}
      </span>
    </div>
  );

  // ── Render ────────────────────────────────────────────────────────────────────

  const sizeClass = cssFullscreen
    ? ""
    : variant === "page"
      ? portrait
        ? "h-[calc(100dvh-4rem)] shrink-0 min-h-0 w-full"
        : "w-full aspect-video"
      : portrait
        ? "h-dvh"
        : "aspect-video";

  return (
    <div
      ref={outerRef}
      className={`relative flex flex-col ${fullscreen ? "rounded-none" : "rounded-xl"} overflow-hidden border border-white/10 cursor-grab active:cursor-grabbing select-none touch-none ${sizeClass}`}
      style={{ background: "#111827", ...(cssFullscreen ? { position: "fixed" as const, top: 0, right: 0, bottom: 0, left: 0, zIndex: 9999 } : {}) }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <button
        onPointerDown={(e) => e.stopPropagation()}
        onClick={toggleFullscreen}
        className="absolute top-2 right-2 z-20 text-white/30 hover:text-white/70 transition-colors p-1.5 rounded cursor-pointer"
        aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      >
        {fullscreen ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4v-4"/>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4"/>
          </svg>
        )}
      </button>
      {portrait ? (
        <>
          {portraitHint}
          {timelineStrip}
          {mobileOverlay}
        </>
      ) : (
        <>
          {eventPanel}
          {timelineStrip}
        </>
      )}
    </div>
  );
}
