"use client";

import { useRef, useState, useEffect, Fragment } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { mediaForEvent } from "@/lib/timeline-media";

// ── Types ──────────────────────────────────────────────────────────────────────

interface Evt {
  id: string;
  title: string;
  time: Date;
  endTime?: Date;
  text: string;
  color: string;
}

// ── Event data ─────────────────────────────────────────────────────────────────

const d = (h: number, m: number, s = 0) => new Date(2024, 4, 2, h, m, s);

const EVENTS: Evt[] = [
  { id: "1",  title: "Mom calls DMH",                       time: d(9,35),      endTime: d(9,55),      color: "#4A9EFF", text: "Mom calls the Department of Mental Health to request assistance with her son, who is having a mental health crisis." },
  { id: "2",  title: "DMH clinician Yoon arrives",          time: d(10,53,40),  endTime: d(10,54,5),   color: "#4A9EFF", text: "DMH clinician Yoon arrives. Dad takes him to talk to Yong, who says he only wants to see his father. Nobody else." },
  { id: "3",  title: "Yoon enters without permission",      time: d(10,54,5),   endTime: d(10,54,20),  color: "#FF8C42", text: "Dad opens the door to talk to Yong, and Yoon enters without permission, ignoring Yong's wishes. He gets promptly dismissed." },
  { id: "4",  title: "Yoon calls 911",                      time: d(10,54,30),  endTime: d(10,58),     color: "#FF8C42", text: "Yoon immediately calls 911 reporting that Yong \"tried to attack\" him, effectively deciding that he will not help. On his YouTube channel, he can be seen urging family members not to call the police in the event of mental health crises due to the danger of their loved one being injured or killed." },
  { id: "5",  title: "Lopez & partner arrive",              time: d(11,10,52),                         color: "#4A9EFF", text: "Lopez and partner arrive at the scene." },
  { id: "8",  title: "Officers enter staircase",            time: d(11,14,10),                         color: "#4A9EFF", text: "Lopez and partner enter the staircase and walk toward the apartment door." },
  { id: "6",  title: "Officers talk to Yong (35s)",         time: d(11,14,31),  endTime: d(11,15,7),   color: "#4A9EFF", text: "Lopez and partner talk to Yong for 35 seconds and call for backup." },
  { id: "7",  title: "Ruvalcaba assigns weapon roles",      time: d(11,35,8),                          color: "#FF8C42", text: "Sgt Ruvalcaba arrives with several more officers. She suggests that Dad sign a paper stating that Yong is trespassing. He refuses. She then assigns an officer to be the \"primary\" and another to be less lethal. She is designating weapon roles for a high-risk tactical encounter. The primary is in charge of using deadly force if a suspect pulls a weapon or takes an action that poses a threat. Because their focus is 100% on lethal cover, they do not handle handcuffs, or less-lethal tools." },
  { id: "9",  title: "Ruvalcaba declares \"use of force\"", time: d(11,37,45),  endTime: d(11,38,33),  color: "#FF8C42", text: "Sgt Ruvalcaba talks to Yong for less than a minute & verbally states her decision that there will be a \"use of force,\" even though no crime has been committed.There is nobody else in the apartment." },
  { id: "10", title: "Paramedics arrive with gurney",       time: d(11,54,14),                         color: "#4A9EFF", text: "Paramedics arrive and prepare a gurney to transport Yong. The gurney is to make sure he isn't injured while being escorted to the hospital." },
  { id: "11", title: "\"USC is the destination\"",          time: d(11,57,26),                         color: "#4A9EFF", text: "Yoon tells Dad that USC Medical Center is the destination, but doesn't attempt to assist or facilitate in any way, which is his designated role. The police are not trained to handle mental health situations, and he is. As the psychiatric professional, he should be the one to make contact with Yong." },
  { id: "12", title: "Officers forcefully open the door",   time: d(11,57,47),  endTime: d(11,57,56),  color: "#FF8C42", text: "As they walk up to the door, they discuss whether to do a \"callout\" or not. A callout is The officer in the front " },
  { id: "13", title: "Gurney arrives at doorstep",          time: d(11,58,2),                          color: "#4A9EFF", text: "Gurney arrives at the doorstep to go up to the house, but the stairway is filled with police officers." },
  { id: "14", title: "Lopez shoots Yong three times",       time: d(11,58,3),   endTime: d(11,58,4),   color: "#FF4444", text: "Lopez shoots Yong within seconds of the door opening, from outside the door into the apartment. Twice in the chest and once in the stomach. One of the bullets punctures his heart. Another perforates his lung and another one obliterates his spleen. He also takes a defensive wound through his left arm." },
  { id: "15", title: "Paramedics ordered to leave",         time: d(11,58,13),                         color: "#FF8C42", text: "The paramedics can be seen reacting to the gunshots. Then they are given orders immediately after the shooting, but not to give emergency first aid to Yong. They are told to turn around and leave." },
  { id: "16", title: "\"Officer Needs Help\" call issued",  time: d(11,58,16),                         color: "#FF4444", text: "After Yong is shot, Sgt Ruvalcaba issues an \"Officer Needs Help\" call over her radio. This is the most urgent, high-priority radio transmission in law enforcement. It signals that an officer is in immediate, life-threatening danger and requires every available unit within driving distance to respond to their location at maximum speed no matter what they are doing. This call is meant to be triggered when an officer is in a physical fight for their life, heavily outnumbered, taking active gunfire, or seriously injured or incapacitated and cannot defend themselves. No medical assistance is given to Yong." },
  { id: "17", title: "Paramedics leave with gurney",        time: d(11,58,19),                         color: "#4A9EFF", text: "The paramedics take their gurney out down the driveway back to the ambulance." },
  { id: "27", title: "Officers handcuff Yong",              time: d(11,58,43),                         color: "#FF4444", text: "Police handcuff Yong after he has stopped breathing and has most likely already died." },
  { id: "18", title: "Ambulance leaves the scene",          time: d(11,59,43),                         color: "#4A9EFF", text: "The paramedics leave in the ambulance." },
  { id: "19", title: "Officer removes less-lethal gun",     time: d(12,0,50),                          color: "#FF8C42", text: "One of the officers can be seen walking out with the less lethal gun after the shooting." },
  { id: "20", title: "LAFD first team arrives",             time: d(12,6,20),                          color: "#4A9EFF", text: "The first team of LAFD (6 men) arrive and walk in without any urgency 8 minutes after the shooting. The Fire Department is two blocks away." },
  { id: "21", title: "LAFD second team arrives",            time: d(12,10,20),                         color: "#4A9EFF", text: "A second team of firemen (2 men with a gurney) walk in slowly. They don't seem to be in a hurry either." },
  { id: "22", title: "Yong declared dead",                  time: d(12,12),                            color: "#FF4444", text: "According to the report, this is when Yong is declared dead by the LAFD, but nobody says anything to his parents." },
  { id: "23", title: "Ponce says \"Sorry for your loss\"",  time: d(13,2),                             color: "#4A9EFF", text: "Over an hour after the shooting, Aaron Ponce approaches Dad and says \"Sorry for your loss.\" When asked what happened he says that he doesn't know because he wasn't there." },
  { id: "24", title: "Death reported to Medical Examiner",  time: d(13,59),                            color: "#4A9EFF", text: "LAPD Officer Carrasco 39957 reports Yong's death to the Medical Examiner." },
  { id: "25", title: "Parents taken to Olympic Station",    time: d(14,43),                            color: "#4A9EFF", text: "Mom & Dad are told to meet with officers at LAPD Olympic station where all their questions will be answered. Sgt Violet Potter 35464, a Family Liaison, accompanies them." },
  { id: "26", title: "Parents interrogated for 3 hours",    time: d(15,26),     endTime: d(18,28),     color: "#FF8C42", text: "Mom & Dad are kept waiting for over half an hour before they finally begin talking with FID (Force Investigation Division) at Olympic station. None of their questions are answered. Instead, they are interrogated for three hours. Meanwhile, back at the apartment, a press conference is held, in which Yong is portrayed as a violent man armed with an 11-inch knife who lunged at the officer. The officer had to fire his weapon to protect his own life, and Yong was \"struck,\" and died on the scene. It turns out the knife was 5 inches long and he never lunged at an officer." },
  { id: "28", title: "Medical Examiner arrives",            time: d(18,7),                             color: "#4A9EFF", text: "Field Medical Examiner Kelly Yagerlener arrives to the scene." },
  { id: "29", title: "Parents return to see Yong's body",   time: d(18,41),                            color: "#4A9EFF", text: "Mom & Dad get back to the street outside their home to meet with Sgt Andrey Wilkins, another Family Liaison, who had promised they would be allowed to see Yong's body before it is transported to the Coroner's Office." },
  { id: "30", title: "Body inexplicably missing",           time: d(18,52),                            color: "#FF8C42", text: "Andrey Wilkins tells the family that Yong's body has already been moved to the Coroner's Office by Forensic Attendant Dustin Miranda." },
  { id: "31", title: "Scene investigation completed",       time: d(19,30),                            color: "#4A9EFF", text: "Kelly Yagerlener completes the scene investigation accompanied by Lieutenant Brian Kim." },
  { id: "32", title: "Yagerlener speaks with family",       time: d(19,36),                            color: "#4A9EFF", text: "Field Medical Examiner Kelly Yagerlener speaks with Mom and Dad." },
  { id: "33", title: "Mom & Dad allowed to go back home",   time: d(20,21),                            color: "#4A9EFF", text: "Mom & Dad are finally allowed to return to their apartment. All evidence has been wiped clean." },
];

// ── Constants ──────────────────────────────────────────────────────────────────

const START_MS        = new Date(2024, 4, 2, 8, 0, 0).getTime();
const TOTAL_SECS      = (new Date(2024, 4, 2, 22, 0, 0).getTime() - START_MS) / 1000;
const STRIP_H         = 160;
const LINE_Y          = 118;
const V_STRIP_W       = 76;
const V_LINE_X        = 8;
const DOT_R           = 5;
const DURATION_H      = 3;
const CARD_W          = 112;
const CARD_W_MAX      = 220;
const CARD_H          = 26;
const LANE_H          = 34;
const PORTRAIT_TAB_H  = 44;
const MAX_LANES       = 3;
const TAB_GAP         = 6;
const MIN_PX          = 80 / 615;
const MAX_PX          = 80 / 60;
const SCROLL_ANIM_MS  = 950;
const PANEL_ADJ_MS    = 600;
const FLING_KNEE      = 2100;
const FLING_MAX       = 2850;
const FLING_SOFTEN    = 520;
const FLING_DECAY_START = 450;
const FLING_DECAY_RAMP  = 420;
const DRAG_MORPH_TAU  = 0.085;
const DRAG_FRAME_DT   = 1 / 60;
const SHOOT_MS        = new Date(2024, 4, 2, 11, 58, 3).getTime();

const t2s = (h: number, m: number, s = 0) =>
  (new Date(2024, 4, 2, h, m, s).getTime() - START_MS) / 1000;

const COLOR_PRI: Record<string, number> = { "#FF4444": 2, "#FF8C42": 1, "#4A9EFF": 0 };
const clusterR = (n: number) => (n > 1 ? DOT_R + 2 : DOT_R);

// ── Zoom transitions ───────────────────────────────────────────────────────────

interface ZoneTransition {
  start: number; end: number;
  targetPx?: number; targetSecs?: number;
  exitSecs?: number; entrySecs?: number;
  ramp?: number; curve?: "ease" | "trapezoid";
  latchOpen?: boolean;
}

const ZOOM_TRANSITIONS: ZoneTransition[] = [
  { start: t2s(10,51,59), end: t2s(10,56,31), targetSecs: 14*60, exitSecs: 3600, curve: "ease", latchOpen: true },
  { start: t2s(11,54,33), end: t2s(12, 1,33), targetPx: 80/5,   exitSecs: 11*60 },
];

function easeInOut(t: number) {
  return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2;
}

function zonePeak(z: ZoneTransition, vpW: number) {
  return z.targetSecs && vpW > 0 ? vpW / z.targetSecs : (z.targetPx ?? MAX_PX);
}

function transitionPx(centerSecs: number, vpW: number): number | null {
  for (const z of ZOOM_TRANSITIONS) {
    const span = z.end - z.start;
    const pos  = centerSecs - z.start;
    if (pos < 0 || pos > span) continue;
    const peak    = zonePeak(z, vpW);
    const entryPx = z.entrySecs && vpW > 0 ? vpW / z.entrySecs : MIN_PX;
    const exitPx  = z.exitSecs  && vpW > 0 ? vpW / z.exitSecs  : MIN_PX;
    if (z.curve === "ease") {
      const t = pos / span;
      return t <= 0.5
        ? entryPx + (peak - entryPx) * easeInOut(t * 2)
        : peak    + (exitPx - peak)  * easeInOut((t - 0.5) * 2);
    }
    const ramp = span * (z.ramp ?? 0.45);
    if (pos < ramp) {
      const t = pos / ramp; return entryPx + (peak - entryPx) * Math.pow(t, 7);
    } else if (pos > span - ramp) {
      const t = (span - pos) / ramp; return exitPx + (peak - exitPx) * Math.pow(t, 7);
    }
    return peak;
  }
  return null;
}

function transitionPxEntry(centerSecs: number, vpW: number, z: ZoneTransition) {
  const span = z.end - z.start;
  const pos  = Math.max(0, Math.min(centerSecs - z.start, span * 0.5));
  const peak    = zonePeak(z, vpW);
  const entryPx = z.entrySecs && vpW > 0 ? vpW / z.entrySecs : MIN_PX;
  if (z.curve === "ease") {
    return entryPx + (peak - entryPx) * easeInOut(pos / (span * 0.5));
  }
  const ramp = span * (z.ramp ?? 0.45);
  return entryPx + (peak - entryPx) * Math.pow(pos / ramp, 7);
}

function findZoneIndex(centerSecs: number) {
  for (let i = 0; i < ZOOM_TRANSITIONS.length; i++) {
    const z = ZOOM_TRANSITIONS[i];
    if (centerSecs >= z.start && centerSecs <= z.end) return i;
  }
  return -1;
}

function isZoneZoomInPhase(centerSecs: number) {
  const i = findZoneIndex(centerSecs);
  if (i < 0) return false;
  const z = ZOOM_TRANSITIONS[i];
  const pos = centerSecs - z.start;
  const span = z.end - z.start;
  return z.curve === "ease" ? pos <= span * 0.5 : pos < span * (z.ramp ?? 0.45);
}

type PhysicsState = {
  px: number; off: number; vpW: number; centerSecs: number;
  zoomLatched: boolean[];
};

function resolveTransitionPx(s: PhysicsState): number | null {
  const activeIdx = findZoneIndex(s.centerSecs);
  if (activeIdx >= 0 && !ZOOM_TRANSITIONS[activeIdx].latchOpen) {
    return transitionPx(s.centerSecs, s.vpW);
  }
  for (let i = 0; i < ZOOM_TRANSITIONS.length; i++) {
    const z = ZOOM_TRANSITIONS[i];
    if (!z.latchOpen) continue;
    if (s.centerSecs < z.start) { s.zoomLatched[i] = false; continue; }
    if (s.zoomLatched[i]) {
      if (activeIdx >= 0 && activeIdx !== i) break;
      return zonePeak(z, s.vpW);
    }
    const span = z.end - z.start;
    const pos  = s.centerSecs - z.start;
    if (pos >= span * 0.5) { s.zoomLatched[i] = true; return zonePeak(z, s.vpW); }
    return transitionPxEntry(s.centerSecs, s.vpW, z);
  }
  return transitionPx(s.centerSecs, s.vpW);
}

function effectiveMaxPx(centerSecs: number, vpW: number) {
  for (const z of ZOOM_TRANSITIONS) {
    if (centerSecs >= z.start && centerSecs <= z.end) return zonePeak(z, vpW);
  }
  return MAX_PX;
}

function syncFromCenter(s: PhysicsState, allowOvershoot = false, morphDt = 0) {
  if (s.px <= 0 || s.vpW <= 0) return;
  const anchor = s.vpW / 2;
  s.centerSecs = Math.max(0, Math.min(TOTAL_SECS, s.centerSecs));
  const tpx = resolveTransitionPx(s);

  let latchedPeak = 0;
  for (let i = 0; i < ZOOM_TRANSITIONS.length; i++) {
    if (s.zoomLatched[i] && ZOOM_TRANSITIONS[i].latchOpen)
      latchedPeak = Math.max(latchedPeak, zonePeak(ZOOM_TRANSITIONS[i], s.vpW));
  }

  let targetPx: number;
  if (tpx !== null) {
    if (latchedPeak > 0 && s.px < latchedPeak - 1e-6 && tpx < latchedPeak - 1e-6) {
      for (let i = 0; i < ZOOM_TRANSITIONS.length; i++) {
        if (ZOOM_TRANSITIONS[i].latchOpen) s.zoomLatched[i] = false;
      }
      targetPx = Math.max(MIN_PX, Math.min(effectiveMaxPx(s.centerSecs, s.vpW), s.px));
    } else {
      targetPx = tpx;
    }
  } else {
    targetPx = Math.max(MIN_PX, Math.min(effectiveMaxPx(s.centerSecs, s.vpW), s.px));
  }

  if (morphDt > 0) {
    const blend = 1 - Math.exp(-morphDt / DRAG_MORPH_TAU);
    const morphTarget = targetPx < s.px && isZoneZoomInPhase(s.centerSecs) ? s.px : targetPx;
    s.px = s.px + (morphTarget - s.px) * blend;
  } else {
    s.px = targetPx;
  }

  const maxOff  = Math.max(0, s.px * TOTAL_SECS - s.vpW);
  const nextOff = s.centerSecs * s.px - anchor;
  if (allowOvershoot) {
    s.off = Math.max(-80, Math.min(nextOff, maxOff + 80));
  } else {
    s.off = Math.max(0, Math.min(nextOff, maxOff));
    if (s.off !== nextOff) s.centerSecs = (s.off + anchor) / s.px;
  }
}

// ── Canvas ─────────────────────────────────────────────────────────────────────

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
  const visStart = off / px, visEnd = (off + vpW) / px;
  for (let li = 0; li < RULER_TICKS.length; li++) {
    const lvl = RULER_TICKS[li];
    if (lvl.s * px < 4) continue;
    const nextS = li + 1 < RULER_TICKS.length ? RULER_TICKS[li + 1].s : 0;
    for (let s = Math.floor(visStart / lvl.s) * lvl.s; s <= visEnd + lvl.s; s += lvl.s) {
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
  const visStart = off / px, visEnd = (off + vpH) / px;
  for (let li = 0; li < RULER_TICKS.length; li++) {
    const lvl = RULER_TICKS[li];
    if (lvl.s * px < 4) continue;
    const nextS = li + 1 < RULER_TICKS.length ? RULER_TICKS[li + 1].s : 0;
    for (let s = Math.floor(visStart / lvl.s) * lvl.s; s <= visEnd + lvl.s; s += lvl.s) {
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

function tickLabel(secs: number) {
  const t  = new Date(START_MS + secs * 1000);
  const h  = t.getHours() % 12 || 12;
  const m  = t.getMinutes();
  const s  = t.getSeconds();
  const ap = t.getHours() < 12 ? "AM" : "PM";
  if (s !== 0) return `${h}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
  if (m !== 0) return `${h}:${String(m).padStart(2,"0")}`;
  return `${h} ${ap}`;
}

const LABEL_STEPS    = [3600, 1800, 900, 300, 60, 30, 15, 1];
const LABEL_MIN_PX   = 36;
const LABEL_MAX_CNT  = 12;
const LABEL_EDGE     = 8;

function countRulerLabels(px: number, vpW: number, off: number, step: number) {
  if (px <= 0 || vpW <= 0 || step <= 0) return 0;
  const visEnd = (off + vpW) / px;
  let count = 0;
  for (let s = Math.floor((off/px)/step)*step; s <= visEnd + step; s += step) {
    if (s < 0 || s > TOTAL_SECS) continue;
    const pos = s * px - off;
    if (pos >= -LABEL_EDGE && pos <= vpW + LABEL_EDGE) count++;
  }
  return count;
}

function rulerLabelStep(px: number, vpW: number, off: number) {
  if (px <= 0 || vpW <= 0) return 3600;
  let fallback = LABEL_STEPS[0], best: number | null = null;
  for (const step of LABEL_STEPS) {
    if (step * px < LABEL_MIN_PX) continue;
    const count = countRulerLabels(px, vpW, off, step);
    if (count < 2) continue;
    fallback = step;
    if (count <= LABEL_MAX_CNT) best = step;
  }
  return best ?? fallback;
}

function buildRulerLabels(px: number, vpW: number, off: number, step: number) {
  if (px <= 0 || vpW <= 0) return [];
  const labels: { s: number; pos: number; label: string }[] = [];
  const visEnd = (off + vpW) / px;
  for (let s = Math.floor((off/px)/step)*step; s <= visEnd + step; s += step) {
    if (s < 0 || s > TOTAL_SECS) continue;
    const pos = s * px - off;
    if (pos >= -LABEL_EDGE && pos <= vpW + LABEL_EDGE) labels.push({ s, pos, label: tickLabel(s) });
  }
  if (labels.length >= 2) return labels;
  const centerS = Math.max(0, Math.min(TOTAL_SECS, (off + vpW/2) / px));
  const s0 = Math.floor(centerS / step) * step;
  for (const s of [s0, s0 + step]) {
    if (s >= 0 && s <= TOTAL_SECS && !labels.some(l => l.s === s))
      labels.push({ s, pos: s * px - off, label: tickLabel(s) });
  }
  return labels.sort((a, b) => a.s - b.s);
}

// ── Formatters ─────────────────────────────────────────────────────────────────

function fmt12(t: Date) {
  const h  = t.getHours() % 12 || 12;
  const m  = String(t.getMinutes()).padStart(2, "0");
  const s  = t.getSeconds();
  const ap = t.getHours() < 12 ? "AM" : "PM";
  return s ? `${h}:${m}:${String(s).padStart(2,"0")} ${ap}` : `${h}:${m} ${ap}`;
}

function fmtRelToShoot(time: Date) {
  const diffMs  = time.getTime() - SHOOT_MS;
  const totalS  = Math.round(Math.abs(diffMs) / 1000);
  if (totalS === 0) return "The shooting";
  const dir = diffMs < 0 ? "before" : "after";
  if (totalS < 60) return `${totalS}s ${dir} the shooting`;
  const mins = Math.floor(totalS / 60), secs = totalS % 60;
  if (mins < 60) return secs === 0 ? `${mins}m ${dir} the shooting` : `${mins}m ${secs}s ${dir} the shooting`;
  const hrs = Math.floor(mins / 60), remM = mins % 60;
  return remM === 0 ? `${hrs}h ${dir} the shooting` : `${hrs}h ${remM}m ${dir} the shooting`;
}

// ── Physics helpers ────────────────────────────────────────────────────────────

function limitFlingVelocity(v: number) {
  const sign = Math.sign(v) || 1, a = Math.abs(v);
  if (a <= FLING_KNEE) return v;
  const span = FLING_MAX - FLING_KNEE;
  return sign * (FLING_KNEE + span * (1 - Math.exp(-(a - FLING_KNEE) / FLING_SOFTEN)));
}

// ── Cluster layout ─────────────────────────────────────────────────────────────

interface Cluster { evts: Evt[]; lead: Evt; pos: number; r: number; }

function estimateTabWidth(title: string) {
  return Math.min(CARD_W_MAX, Math.max(CARD_W, title.length * 5.5 + 20));
}

function buildClusters(items: { evt: Evt; pos: number }[]): Cluster[] {
  if (!items.length) return [];
  const sorted = [...items].sort((a, b) => a.pos - b.pos);
  const groups: { evt: Evt; pos: number }[][] = [];
  let cur = [sorted[0]];
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].pos - sorted[i-1].pos < DOT_R*2) cur.push(sorted[i]);
    else { groups.push(cur); cur = [sorted[i]]; }
  }
  groups.push(cur);
  return groups.map(g => {
    const lead = g.reduce((b, a) => (COLOR_PRI[a.evt.color]??0) > (COLOR_PRI[b.evt.color]??0) ? a : b);
    return { evts: g.map(i => i.evt), lead: lead.evt, pos: lead.pos, r: clusterR(g.length) };
  });
}

function layoutClusterLanes(clusters: Cluster[]): Record<string, number> {
  const lanes: Record<string, number> = {};
  const laneRight: number[] = [];
  [...clusters].sort((a, b) => a.pos - b.pos).forEach(c => {
    let lane = 0;
    while (lane < laneRight.length && c.pos < laneRight[lane] + TAB_GAP) lane++;
    // Fixed: if all lanes full, assign to lane with smallest right edge (least overlap)
    const assigned = lane >= MAX_LANES
      ? laneRight.indexOf(Math.min(...laneRight))
      : lane;
    const right = c.pos + estimateTabWidth(c.lead.title);
    if (assigned >= laneRight.length) laneRight.push(right); else laneRight[assigned] = right;
    lanes[c.lead.id] = assigned;
  });
  return lanes;
}

function layoutTabOffsetsY(clusters: Cluster[]): Record<string, number> {
  const sorted = [...clusters].sort((a, b) => a.pos - b.pos);
  if (!sorted.length) return {};
  const items = sorted.map(c => ({ id: c.lead.id, anchorY: c.pos, offset: 0 }));
  for (let i = 1; i < items.length; i++) {
    const prev = items[i-1], cur = items[i];
    const minCenter = prev.anchorY + prev.offset + PORTRAIT_TAB_H + 4;
    if (cur.anchorY + cur.offset < minCenter) cur.offset = minCenter - cur.anchorY;
  }
  for (let i = items.length - 2; i >= 0; i--) {
    const cur = items[i], next = items[i+1];
    const maxOffset = next.anchorY + next.offset - PORTRAIT_TAB_H - 4 - cur.anchorY;
    if (cur.offset > maxOffset) cur.offset = Math.max(0, maxOffset);
  }
  return Object.fromEntries(items.map(i => [i.id, i.offset]));
}

// ── Panel pages (landscape) ────────────────────────────────────────────────────

function buildPanelPages(from: Evt, to: Evt, prevIdx: number, targetIdx: number): Evt[] {
  const dir = targetIdx > prevIdx ? 1 : -1;
  if (Math.abs(targetIdx - prevIdx) <= 1) return dir > 0 ? [from, to] : [to, from];
  const bridge = EVENTS[prevIdx + dir];
  return dir > 0 ? [from, bridge, to] : [to, bridge, from];
}

// ── Media renderer ─────────────────────────────────────────────────────────────

function renderMedia(evt: Evt, isActive: boolean, fullWidth: boolean): React.ReactNode {
  const media = mediaForEvent(evt.id);
  if (!media) return null;
  const { imageUrl, videoEmbedUrl, videoSrc, posterUrl } = media;

  if (videoSrc || videoEmbedUrl) {
    const inner = (
      <div className="relative w-full aspect-video bg-black/40 overflow-hidden shadow-lg" style={{ borderRadius: fullWidth ? 0 : 4 }}>
        {isActive && videoSrc ? (
          <video src={videoSrc} poster={posterUrl} controls playsInline className="absolute inset-0 h-full w-full object-contain bg-black" />
        ) : isActive && videoEmbedUrl ? (
          <iframe src={videoEmbedUrl} title={evt.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className="absolute inset-0 h-full w-full" />
        ) : posterUrl ? (
          <Image src={posterUrl} alt="" fill className="object-contain" unoptimized />
        ) : (
          <div className="absolute inset-0 bg-black/25" />
        )}
      </div>
    );
    if (fullWidth) return inner;
    return <div className="min-w-0 flex flex-[1.15] items-center justify-center p-5 sm:p-8 md:p-10">{inner}</div>;
  }

  if (imageUrl) {
    if (fullWidth) {
      return (
        <div className="flex items-center justify-center w-full bg-black/20 overflow-hidden p-2">
          <Image src={imageUrl} alt="" width={960} height={720} className="max-h-[min(48vh,400px)] w-auto h-auto object-contain" unoptimized />
        </div>
      );
    }
    return (
      <div className="min-w-0 flex flex-[1.15] items-center justify-center p-5 sm:p-8 md:p-10">
        <div className="relative flex items-center justify-center w-full max-h-[min(50vh,420px)] bg-black/20 rounded-sm overflow-hidden shadow-lg p-2">
          <Image src={imageUrl} alt="" width={960} height={720} className="max-h-[min(48vh,400px)] w-auto h-auto object-contain" unoptimized />
        </div>
      </div>
    );
  }

  return null;
}

// ── SVG icons ──────────────────────────────────────────────────────────────────

const EnterFsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4"/>
  </svg>
);
const ExitFsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4v-4"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M2 2l12 12M14 2L2 14"/>
  </svg>
);

// ── Root component ─────────────────────────────────────────────────────────────

export default function DayTimeline() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected]           = useState<Evt | null>(null);
  const [portrait, setPortrait]           = useState(false);
  const [cssFullscreen, setCssFullscreen] = useState(false);
  const [nativeFullscreen, setNativeFullscreen] = useState(false);
  const [portalReady, setPortalReady]     = useState(false);
  const fullscreen = cssFullscreen || nativeFullscreen;

  useEffect(() => { setPortalReady(true); }, []);

  useEffect(() => {
    const mq = window.matchMedia("(orientation: portrait)");
    const update = (v: boolean) => setPortrait(v);
    update(mq.matches);
    const h = (e: MediaQueryListEvent) => update(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  useEffect(() => {
    const onChange = () => setNativeFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    if (!cssFullscreen) return;
    document.documentElement.classList.add("tl-fullscreen");
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setCssFullscreen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("tl-fullscreen");
      window.removeEventListener("keydown", onKey);
    };
  }, [cssFullscreen]);

  const toggleFullscreen = () => {
    if (cssFullscreen) { setCssFullscreen(false); return; }
    if (nativeFullscreen || document.fullscreenElement) {
      void (document.exitFullscreen?.() ??
        (document as Document & { webkitExitFullscreen?(): Promise<void> }).webkitExitFullscreen?.());
      return;
    }
    if (portrait || window.matchMedia("(max-width: 768px)").matches) { setCssFullscreen(true); return; }
    const el = outerRef.current;
    if (!el) return;
    const req = el.requestFullscreen?.bind(el) ??
      (el as HTMLElement & { webkitRequestFullscreen?(): Promise<void> }).webkitRequestFullscreen?.bind(el);
    if (req) req().catch(() => setCssFullscreen(true)); else setCssFullscreen(true);
  };

  const selectEvent   = (evt: Evt) => setSelected(evt);
  const deselectEvent = ()         => setSelected(null);

  const sizeClass = cssFullscreen
    ? "h-full w-full rounded-none border-0"
    : fullscreen
      ? "h-dvh w-full rounded-none border-0"
      : portrait
        ? "h-dvh rounded-xl border border-white/10"
        : "aspect-video rounded-xl border border-white/10";

  const sharedProps = { selected, onSelect: selectEvent, onDeselect: deselectEvent, cssFullscreen };

  const content = (
    <div
      ref={outerRef}
      className={`relative flex overflow-hidden select-none touch-none ${portrait ? "flex-row" : "flex-col"} ${sizeClass}`}
      style={{ background: "#111827", ...(cssFullscreen ? { position: "fixed" as const, inset: 0, zIndex: 9999 } : {}) }}
    >
      <button
        type="button"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={toggleFullscreen}
        className="absolute z-20 text-white/30 hover:text-white/70 transition-colors p-1.5 rounded cursor-pointer"
        style={{
          top:   cssFullscreen ? "calc(env(safe-area-inset-top,0px) + 8px)"   : 8,
          right: cssFullscreen ? "calc(env(safe-area-inset-right,0px) + 8px)" : 8,
        }}
        aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      >
        {fullscreen ? <ExitFsIcon /> : <EnterFsIcon />}
      </button>

      {portrait
        ? <PortraitTimeline  {...sharedProps} />
        : <LandscapeTimeline {...sharedProps} fullscreen={fullscreen} />
      }
    </div>
  );

  if (cssFullscreen && portalReady) {
    return (
      <>
        <div aria-hidden className={`pointer-events-none invisible overflow-hidden rounded-xl ${portrait ? "h-dvh w-full" : "aspect-video w-full"}`} />
        {createPortal(content, document.body)}
      </>
    );
  }
  return content;
}

// ── Portrait mode ──────────────────────────────────────────────────────────────

interface PortraitProps {
  selected: Evt | null;
  onSelect: (evt: Evt) => void;
  onDeselect: () => void;
  cssFullscreen: boolean;
}

function PortraitTimeline({ selected, onSelect, onDeselect, cssFullscreen }: PortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef     = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const selectedRef  = useRef(selected);
  useEffect(() => { selectedRef.current = selected; }, [selected]);

  const p = useRef({
    px: 0, off: 0, vpW: 0, centerSecs: 0,
    velX: 0, lastX: 0, lastT: 0,
    dragging: false, touchFling: false,
    animRaf: 0, dragRaf: 0, dragPendingDelta: 0,
    wheelVel: 0, wheelRaf: 0,
    zoomLatched: ZOOM_TRANSITIONS.map(() => false),
  });

  const [view, setView] = useState({ px: 0, off: 0, vpW: 0 });

  // ── Physics ──────────────────────────────────────────────────────────────────

  function syncView() { setView({ px: p.current.px, off: p.current.off, vpW: p.current.vpW }); }

  function applyDragDelta(delta: number) {
    if (delta === 0) return;
    const s = p.current;
    const steps = Math.max(1, Math.ceil(Math.abs(delta) / 10));
    const subDelta = delta / steps, subDt = DRAG_FRAME_DT / steps;
    for (let i = 0; i < steps; i++) {
      s.centerSecs -= subDelta / s.px;
      syncFromCenter(s, true, subDt);
    }
  }

  function stopDragLoop() {
    if (p.current.dragRaf) { cancelAnimationFrame(p.current.dragRaf); p.current.dragRaf = 0; }
    p.current.dragPendingDelta = 0;
  }

  function ensureDragLoop() {
    const s = p.current;
    if (s.dragRaf || !s.dragging) return;
    function tick() {
      const ss = p.current;
      if (!ss.dragging) { ss.dragRaf = 0; return; }
      const delta = ss.dragPendingDelta; ss.dragPendingDelta = 0;
      if (delta !== 0) applyDragDelta(delta);
      else syncFromCenter(ss, true, DRAG_FRAME_DT);
      syncView();
      ss.dragRaf = requestAnimationFrame(tick);
    }
    s.dragRaf = requestAnimationFrame(tick);
  }

  function startFling(vel: number) {
    cancelAnimationFrame(p.current.animRaf);
    vel = limitFlingVelocity(vel);
    const startVel = vel, isFast = Math.abs(startVel) >= FLING_KNEE;
    let travelPx = 0, lastT = -1;
    function tick(now: number) {
      if (lastT < 0) { lastT = now; p.current.animRaf = requestAnimationFrame(tick); return; }
      const dt = Math.min((now - lastT) / 1000, 0.05); lastT = now;
      const s = p.current, maxOff = Math.max(0, s.px * TOTAL_SECS - s.vpW);
      const sub = s.touchFling ? 10 : 1, subDt = dt / sub;
      for (let i = 0; i < sub; i++) {
        const curMax = Math.max(0, s.px * TOTAL_SECS - s.vpW);
        if (s.off < 0) { vel += (-s.off) * 280 * subDt; vel *= Math.pow(0.0005, subDt); }
        else if (s.off > curMax) { vel -= (s.off - curMax) * 280 * subDt; vel *= Math.pow(0.0005, subDt); }
        else {
          travelPx += Math.abs(vel * subDt);
          const base = s.touchFling ? 0.05 : 0.0001;
          let decay = base;
          if (isFast && travelPx > FLING_DECAY_START) {
            const ramp = 1 - Math.exp(-(travelPx - FLING_DECAY_START) / FLING_DECAY_RAMP);
            decay = base * (1 - ramp) + (s.touchFling ? 0.032 : 0.00006) * ramp;
          }
          vel *= Math.pow(decay, subDt);
        }
        s.centerSecs += vel * subDt / s.px;
        syncFromCenter(s, true, subDt);
      }
      syncView();
      if (Math.abs(vel) < 1 && s.off >= -0.5 && s.off <= maxOff + 0.5) {
        syncFromCenter(s); syncView(); return;
      }
      p.current.animRaf = requestAnimationFrame(tick);
    }
    p.current.animRaf = requestAnimationFrame(tick);
  }

  function scrollToSecs(secs: number) {
    cancelAnimationFrame(p.current.animRaf);
    const s = p.current, startSecs = s.centerSecs, startT = performance.now();
    function tick(now: number) {
      const t = Math.min((now - startT) / 800, 1);
      s.centerSecs = startSecs + (secs - startSecs) * (1 - Math.pow(1 - t, 3));
      syncFromCenter(s); syncView();
      if (t < 1) p.current.animRaf = requestAnimationFrame(tick);
    }
    p.current.animRaf = requestAnimationFrame(tick);
  }

  // ── Init + resize ─────────────────────────────────────────────────────────────

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const init = (h: number) => {
      p.current.vpW = h;
      if (p.current.px === 0) {
        const minPx = Math.max(MIN_PX, h / TOTAL_SECS);
        p.current.px = minPx;
        p.current.centerSecs = t2s(9, 30);
        p.current.off = p.current.centerSecs * minPx - h / 2;
      }
      syncFromCenter(p.current);
      syncView();
    };
    init(el.clientHeight);
    const ro = new ResizeObserver(([e]) => init(e.contentRect.height));
    ro.observe(el);
    const state = p.current;
    return () => { ro.disconnect(); state.vpW = 0; };
  }, [cssFullscreen]);

  // ── Canvas draw ───────────────────────────────────────────────────────────────

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || view.vpW === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = V_STRIP_W * dpr; canvas.style.width  = `${V_STRIP_W}px`;
    canvas.height = view.vpW * dpr;  canvas.style.height = `${view.vpW}px`;
    ctx.scale(dpr, dpr);
    drawRulerVertical(ctx, view.vpW, view.px, view.off);
  }, [view]);

  // ── Scroll to selected event ──────────────────────────────────────────────────

  useEffect(() => {
    if (!selected) return;
    scrollToSecs((selected.time.getTime() - START_MS) / 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  // ── Touch listeners ───────────────────────────────────────────────────────────

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      if (selectedRef.current) return;
      cancelAnimationFrame(p.current.animRaf);
      cancelAnimationFrame(p.current.wheelRaf);
      p.current.wheelRaf = 0; p.current.wheelVel = 0;
      stopDragLoop();
      const s = p.current;
      s.dragging = false; s.touchFling = false;
      s.velX = 0; s.lastX = e.touches[0].clientY; s.lastT = performance.now();
      s.dragPendingDelta = 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length !== 1) return;
      const s = p.current, coord = e.touches[0].clientY;
      if (!s.dragging) {
        if (Math.abs(coord - s.lastX) > 5) s.dragging = true; else return;
      }
      const now = performance.now(), dt = now - s.lastT;
      if (dt > 0 && dt < 80) s.velX = (s.lastX - coord) / dt * 1000;
      s.dragPendingDelta += coord - s.lastX;
      s.lastX = coord; s.lastT = now;
      ensureDragLoop();
    };

    const onTouchEnd = (e: TouchEvent) => {
      const s = p.current;
      if (!s.dragging) return;
      s.dragging = false;
      if (s.dragPendingDelta !== 0) applyDragDelta(s.dragPendingDelta);
      stopDragLoop(); syncView();
      if (e.touches.length === 0) { s.touchFling = true; startFling(s.velX); }
    };

    el.addEventListener("touchstart",  onTouchStart,  { passive: false });
    el.addEventListener("touchmove",   onTouchMove,   { passive: false });
    el.addEventListener("touchend",    onTouchEnd);
    el.addEventListener("touchcancel", onTouchEnd);
    return () => {
      el.removeEventListener("touchstart",  onTouchStart);
      el.removeEventListener("touchmove",   onTouchMove);
      el.removeEventListener("touchend",    onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cssFullscreen]);

  // ── Wheel listener ────────────────────────────────────────────────────────────

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (selectedRef.current) return;
      e.preventDefault();
      cancelAnimationFrame(p.current.animRaf);
      const s = p.current;
      s.wheelVel += e.deltaY * 3;
      s.wheelVel = Math.sign(s.wheelVel) * Math.min(Math.abs(s.wheelVel), 3000);
      if (s.wheelRaf) return;
      let lastT = -1;
      function tick(now: number) {
        if (lastT < 0) { lastT = now; s.wheelRaf = requestAnimationFrame(tick); return; }
        const dt = Math.min((now - lastT) / 1000, 0.05); lastT = now;
        s.centerSecs += s.wheelVel * dt / s.px;
        s.wheelVel *= Math.pow(0.04, dt);
        syncFromCenter(s); syncView();
        if (Math.abs(s.wheelVel) < 1) { s.wheelRaf = 0; return; }
        s.wheelRaf = requestAnimationFrame(tick);
      }
      s.wheelRaf = requestAnimationFrame(tick);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [cssFullscreen]);

  // ── Mouse/stylus drag ─────────────────────────────────────────────────────────

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let pendingDrag = false, dragStartY = 0;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      if (selectedRef.current) return;
      cancelAnimationFrame(p.current.animRaf);
      cancelAnimationFrame(p.current.wheelRaf);
      p.current.wheelRaf = 0; p.current.wheelVel = 0;
      stopDragLoop();
      el.setPointerCapture(e.pointerId);
      pendingDrag = true; dragStartY = e.clientY;
      const s = p.current;
      s.dragging = false; s.touchFling = false;
      s.velX = 0; s.lastX = e.clientY; s.lastT = performance.now();
      s.dragPendingDelta = 0;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const s = p.current;
      if (pendingDrag && !s.dragging) {
        if (Math.abs(e.clientY - dragStartY) > 5) { s.dragging = true; pendingDrag = false; } else return;
      }
      if (!s.dragging) return;
      const now = performance.now(), dt = now - s.lastT;
      if (dt > 0 && dt < 80) s.velX = (s.lastX - e.clientY) / dt * 1000;
      s.dragPendingDelta += e.clientY - s.lastX;
      s.lastX = e.clientY; s.lastT = now;
      ensureDragLoop();
    };
    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      pendingDrag = false;
      const s = p.current;
      if (!s.dragging) return;
      s.dragging = false;
      if (s.dragPendingDelta !== 0) applyDragDelta(s.dragPendingDelta);
      stopDragLoop(); syncView(); startFling(s.velX);
    };

    el.addEventListener("pointerdown",  onPointerDown);
    el.addEventListener("pointermove",  onPointerMove);
    el.addEventListener("pointerup",    onPointerUp);
    el.addEventListener("pointerleave", onPointerUp);
    return () => {
      el.removeEventListener("pointerdown",  onPointerDown);
      el.removeEventListener("pointermove",  onPointerMove);
      el.removeEventListener("pointerup",    onPointerUp);
      el.removeEventListener("pointerleave", onPointerUp);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cssFullscreen]);

  // ── Cleanup ───────────────────────────────────────────────────────────────────

  useEffect(() => () => {
    cancelAnimationFrame(p.current.animRaf);
    cancelAnimationFrame(p.current.wheelRaf);
    cancelAnimationFrame(p.current.dragRaf);
  }, []);

  // ── Layout ────────────────────────────────────────────────────────────────────

  const { px, off, vpW } = view;

  const visibleV = EVENTS.map(evt => ({
    evt, y: (evt.time.getTime() - START_MS) / 1000 * px - off,
  })).filter(({ y }) => y >= -20 && y <= vpW + 20);
  const clustersV  = buildClusters(visibleV.map(({ evt, y }) => ({ evt, pos: y })));
  const tabOffsetY = layoutTabOffsetsY(clustersV);

  const visibleDurations = EVENTS
    .filter((evt): evt is Evt & { endTime: Date } => !!evt.endTime)
    .map(evt => ({
      evt,
      start: (evt.time.getTime()    - START_MS) / 1000 * px - off,
      end:   (evt.endTime.getTime() - START_MS) / 1000 * px - off,
    }))
    .filter(({ start, end }) => end >= -20 && start <= vpW + 20);

  const shootZone       = ZOOM_TRANSITIONS[1];
  const zoneY0          = (shootZone.start - 25) * px - off;
  const zoneY1          = (shootZone.end   - 25) * px - off;
  const dmhStart        = (EVENTS[1].time.getTime() - START_MS) / 1000;
  const dmhEnd          = (EVENTS[3].time.getTime() - START_MS) / 1000;
  const zone2Y0         = dmhStart * px - off;
  const zone2Y1         = dmhEnd   * px - off + DOT_R * 2 + 2;
  const labelStep       = rulerLabelStep(px, vpW, off);
  const rulerLabelsV    = buildRulerLabels(px, vpW, off, labelStep).map(({ s, pos, label }) => ({ s, y: pos, label }));
  const zoomLabel       = px > 0 && vpW > 0 ? (() => {
    const secs = vpW / px;
    if (secs < 120) return `${Math.round(secs)}s`;
    if (secs < 3600) return `${Math.round(secs/60)}m`;
    const h = Math.floor(secs/3600), m = Math.round((secs%3600)/60);
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  })() : "";

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div ref={containerRef} className="flex flex-row flex-1 min-h-0 overflow-hidden">
      {/* Vertical timeline strip */}
      <div
        ref={stripRef}
        className="relative shrink-0 border-r border-white/10 overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ width: V_STRIP_W, background: "#0e1420" }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

        {/* Zone highlights */}
        <div className="absolute inset-x-0 pointer-events-none" style={{ top: zone2Y0, height: Math.max(0, zone2Y1 - zone2Y0), background: "rgba(255,68,68,0.08)", borderTop: "1px solid rgba(255,68,68,0.25)", borderBottom: "1px solid rgba(255,68,68,0.25)" }} />
        <div className="absolute inset-x-0 pointer-events-none" style={{ top: zoneY0,  height: Math.max(0, zoneY1  - zoneY0),  background: "rgba(255,68,68,0.08)", borderTop: "1px solid rgba(255,68,68,0.25)", borderBottom: "1px solid rgba(255,68,68,0.25)" }} />

        {/* Duration bars */}
        {px > 0 && visibleDurations.map(({ evt, start, end }) => (
          <div key={`dur-${evt.id}`} className="absolute pointer-events-none" style={{
            left: V_LINE_X - DURATION_H/2, top: start,
            width: DURATION_H, height: Math.max(0, end - start),
            backgroundColor: selected?.id === evt.id ? evt.color : `${evt.color}99`,
          }} />
        ))}

        {/* Event dots */}
        {px > 0 && clustersV.map(({ lead, pos: y, r, evts }) => {
          const isSel = evts.some(e => selected?.id === e.id);
          return (
            <button key={lead.id} className="absolute focus:outline-none rounded-full cursor-pointer"
              onPointerDown={(e) => e.stopPropagation()}
              style={{
                left: V_LINE_X - r, top: y - r, width: r*2, height: r*2,
                background:  isSel ? lead.color : `${lead.color}99`,
                boxShadow:   isSel ? `0 0 10px 3px ${lead.color}44` : "none",
                zIndex:      isSel ? 2 : 1,
                transition:  "background 150ms, box-shadow 150ms",
                animation:   "tl-dot-in 0.2s ease-out forwards",
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (!isSel) { onSelect(lead); return; }
                const ci = evts.findIndex(ev => ev.id === selected?.id);
                const next = evts[(ci + 1) % evts.length];
                if (next.id === selected?.id) onDeselect(); else onSelect(next);
              }}
            />
          );
        })}

        {/* Ruler labels */}
        {rulerLabelsV.map(({ s, y, label }) => (
          <span key={s} className="absolute font-mono pointer-events-none"
            style={{ top: y, right: 4, left: V_LINE_X + 6, transform: "translateY(-50%)", fontSize: 11, letterSpacing: "-0.4px", color: "rgba(255,255,255,0.45)", whiteSpace: "nowrap", animation: "tl-fade-in 0.25s ease-out forwards" }}>
            {label}
          </span>
        ))}
        <span className="absolute bottom-2 left-0 right-0 text-center font-mono pointer-events-none select-none" style={{ fontSize: 9, color: "rgba(255,255,255,0.25)" }}>
          {zoomLabel}
        </span>
      </div>

      {/* Event tab list */}
      <div className="relative flex-1 overflow-hidden bg-[#151b28] pointer-events-none">
        {px > 0 && clustersV.map(({ lead, pos: y, evts }) => (
          <button key={lead.id} type="button"
            className="absolute right-2 left-2 flex items-center gap-2 rounded-md px-2 text-left cursor-pointer pointer-events-auto focus:outline-none"
            style={{
              top: y + (tabOffsetY[lead.id] ?? 0) - PORTRAIT_TAB_H/2, height: PORTRAIT_TAB_H,
              background: "rgba(20,28,45,0.92)", border: `1px solid ${lead.color}28`,
            }}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); onSelect(lead); }}
            aria-label={lead.title}
          >
            <span className="shrink-0 rounded-full" style={{ width: 5, height: 5, background: lead.color }} />
            <div className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-medium text-white/80 leading-snug">{lead.title}</span>
              <span className="block truncate text-[11px] text-white/40 leading-snug">{fmtRelToShoot(lead.time)}</span>
            </div>
            {evts.length > 1 && <span className="shrink-0 text-[10px] font-mono text-white/30">{evts.length}</span>}
          </button>
        ))}
      </div>

      {/* Full-page overlay when an event is selected */}
      {selected && (
        <div className="absolute inset-0 z-30 flex flex-col overflow-hidden" style={{ background: "#111827" }}>
          <div className="relative shrink-0 border-b border-white/10" style={{
            background: "#1A2235",
            paddingTop:    cssFullscreen ? "calc(env(safe-area-inset-top,0px) + 14px)" : 14,
            paddingBottom: 14, paddingLeft: 20, paddingRight: 48,
          }}>
            <p className="font-mono text-sm leading-tight" style={{ color: selected.color }}>
              {fmt12(selected.time)}{selected.endTime ? ` – ${fmt12(selected.endTime)}` : ""}
            </p>
            <p className="text-white font-semibold text-base leading-snug mt-1">{selected.title}</p>
            <button onClick={onDeselect} onPointerDown={(e) => e.stopPropagation()}
              className="absolute top-1/2 -translate-y-1/2 right-3 text-white/40 hover:text-white/80 transition-colors p-2 cursor-pointer"
              aria-label="Close">
              <CloseIcon />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto overscroll-contain">
            {renderMedia(selected, true, true)}
            <div className="px-5 pt-5 pb-8">
              <p className="text-white/70 text-[15px] leading-relaxed">{selected.text}</p>
              <p className="mt-5 text-sm font-medium" style={{ color: selected.color }}>{fmtRelToShoot(selected.time)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Landscape mode ─────────────────────────────────────────────────────────────

interface LandscapeProps {
  selected: Evt | null;
  onSelect: (evt: Evt) => void;
  onDeselect: () => void;
  cssFullscreen: boolean;
  fullscreen: boolean;
}

function LandscapeTimeline({ selected, onSelect, onDeselect, cssFullscreen }: LandscapeProps) {
  const stripRef    = useRef<HTMLDivElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const panelVpRef  = useRef<HTMLDivElement>(null);
  const sliderRef   = useRef<HTMLDivElement>(null);
  const panelRafRef = useRef(0);
  const panelProg   = useRef(0);

  const p = useRef({
    px: 0, off: 0, vpW: 0, centerSecs: 0,
    velX: 0, lastX: 0, lastT: 0,
    dragging: false, pendingPointerId: -1, touchFling: false,
    animRaf: 0, dragRaf: 0, dragPendingDelta: 0,
    wheelVel: 0, wheelRaf: 0,
    zoomRaf: 0, zoomStartPx: 0, zoomTargetPx: 0, zoomStartT: 0,
    pinching: false, pinchStartDist: 0, scaleStartPx: 0, scaleStartOff: 0,
    zoomLatched: ZOOM_TRANSITIONS.map(() => false),
  });

  const prevSelectedRef = useRef<Evt | null>(null);

  const [view, setView]               = useState({ px: 0, off: 0, vpW: 0 });
  const [displayEvt, setDisplayEvt]   = useState<Evt | null>(null);
  const [panelPages, setPanelPages]   = useState<Evt[]>([]);
  const [panelProgress, setPanelProgress] = useState(0);
  const [panelAnimating, setPanelAnimating] = useState(false);
  const [panelVpW, setPanelVpW]       = useState(0);

  // ── Physics ──────────────────────────────────────────────────────────────────

  function syncView() { setView({ px: p.current.px, off: p.current.off, vpW: p.current.vpW }); }

  function applyDragDelta(delta: number) {
    if (delta === 0) return;
    const s = p.current;
    const steps = Math.max(1, Math.ceil(Math.abs(delta) / 10));
    const subDelta = delta / steps, subDt = DRAG_FRAME_DT / steps;
    for (let i = 0; i < steps; i++) {
      s.centerSecs -= subDelta / s.px;
      syncFromCenter(s, true, subDt);
    }
  }

  function stopDragLoop() {
    if (p.current.dragRaf) { cancelAnimationFrame(p.current.dragRaf); p.current.dragRaf = 0; }
    p.current.dragPendingDelta = 0;
  }

  function ensureDragLoop() {
    const s = p.current;
    if (s.dragRaf || !s.dragging) return;
    function tick() {
      const ss = p.current;
      if (!ss.dragging) { ss.dragRaf = 0; return; }
      const delta = ss.dragPendingDelta; ss.dragPendingDelta = 0;
      if (delta !== 0) applyDragDelta(delta);
      else syncFromCenter(ss, true, DRAG_FRAME_DT);
      syncView();
      ss.dragRaf = requestAnimationFrame(tick);
    }
    s.dragRaf = requestAnimationFrame(tick);
  }

  function startFling(vel: number) {
    cancelAnimationFrame(p.current.animRaf);
    vel = limitFlingVelocity(vel);
    const startVel = vel, isFast = Math.abs(startVel) >= FLING_KNEE;
    let travelPx = 0, lastT = -1;
    function tick(now: number) {
      if (lastT < 0) { lastT = now; p.current.animRaf = requestAnimationFrame(tick); return; }
      const dt = Math.min((now - lastT) / 1000, 0.05); lastT = now;
      const s = p.current, maxOff = Math.max(0, s.px * TOTAL_SECS - s.vpW);
      const sub = s.touchFling ? 10 : 1, subDt = dt / sub;
      for (let i = 0; i < sub; i++) {
        const curMax = Math.max(0, s.px * TOTAL_SECS - s.vpW);
        if (s.off < 0) { vel += (-s.off) * 280 * subDt; vel *= Math.pow(0.0005, subDt); }
        else if (s.off > curMax) { vel -= (s.off - curMax) * 280 * subDt; vel *= Math.pow(0.0005, subDt); }
        else {
          travelPx += Math.abs(vel * subDt);
          const base = s.touchFling ? 0.05 : 0.0001;
          let decay = base;
          if (isFast && travelPx > FLING_DECAY_START) {
            const ramp = 1 - Math.exp(-(travelPx - FLING_DECAY_START) / FLING_DECAY_RAMP);
            decay = base * (1 - ramp) + (s.touchFling ? 0.032 : 0.00006) * ramp;
          }
          vel *= Math.pow(decay, subDt);
        }
        s.centerSecs += vel * subDt / s.px;
        syncFromCenter(s, true, subDt);
      }
      syncView();
      if (Math.abs(vel) < 1 && s.off >= -0.5 && s.off <= maxOff + 0.5) {
        syncFromCenter(s); syncView(); return;
      }
      p.current.animRaf = requestAnimationFrame(tick);
    }
    p.current.animRaf = requestAnimationFrame(tick);
  }

  function scrollToSecs(secs: number) {
    cancelAnimationFrame(p.current.animRaf);
    cancelAnimationFrame(p.current.zoomRaf);
    p.current.zoomRaf = 0;
    const s = p.current, startSecs = s.centerSecs, startT = performance.now();
    function tick(now: number) {
      const t = Math.min((now - startT) / 800, 1);
      s.centerSecs = startSecs + (secs - startSecs) * (1 - Math.pow(1 - t, 3));
      syncFromCenter(s); syncView();
      if (t < 1) p.current.animRaf = requestAnimationFrame(tick);
    }
    p.current.animRaf = requestAnimationFrame(tick);
  }

  function triggerZoom(targetPx: number) {
    const s = p.current;
    s.zoomStartPx = s.px; s.zoomTargetPx = targetPx; s.zoomStartT = performance.now();
    if (s.zoomRaf) return;
    function tick(now: number) {
      const progress = Math.min((now - s.zoomStartT) / 330, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const prevPx = s.px;
      s.px = s.zoomStartPx + (s.zoomTargetPx - s.zoomStartPx) * ease;
      if (prevPx > 0) s.centerSecs = (s.off + s.vpW/2) / prevPx;
      syncFromCenter(s); syncView();
      if (progress < 1) s.zoomRaf = requestAnimationFrame(tick); else s.zoomRaf = 0;
    }
    s.zoomRaf = requestAnimationFrame(tick);
  }

  // ── Panel animation ───────────────────────────────────────────────────────────

  function applyPanelTransform(progress: number) {
    const w = panelVpRef.current?.offsetWidth ?? 0;
    if (sliderRef.current && w > 0)
      sliderRef.current.style.transform = `translate3d(${-progress * w}px,0,0)`;
  }

  function animatePanelPages(pages: Evt[], prevIdx: number, targetIdx: number, duration: number) {
    cancelAnimationFrame(panelRafRef.current);
    const dir = targetIdx > prevIdx ? 1 : -1;
    const start = dir > 0 ? 0 : pages.length - 1;
    const end   = dir > 0 ? pages.length - 1 : 0;
    setPanelPages(pages);
    panelProg.current = start;
    applyPanelTransform(start);
    setPanelProgress(start);
    setPanelAnimating(true);
    const startT = performance.now();
    function tick(now: number) {
      const t = Math.min((now - startT) / duration, 1);
      const progress = start + (end - start) * easeInOut(t);
      panelProg.current = progress;
      applyPanelTransform(progress);
      if (t < 1) { panelRafRef.current = requestAnimationFrame(tick); return; }
      panelProg.current = end;
      applyPanelTransform(end);
      setPanelPages([pages[end]]);
      setPanelProgress(0);
      setPanelAnimating(false);
      setDisplayEvt(pages[end]);
    }
    panelRafRef.current = requestAnimationFrame(tick);
  }

  // ── React to selected prop change ─────────────────────────────────────────────

  useEffect(() => {
    if (!selected) {
      cancelAnimationFrame(panelRafRef.current);
      prevSelectedRef.current = null;
      setDisplayEvt(null); setPanelPages([]); setPanelProgress(0); setPanelAnimating(false);
      panelProg.current = 0;
      return;
    }
    scrollToSecs((selected.time.getTime() - START_MS) / 1000);
    const prev = prevSelectedRef.current;
    prevSelectedRef.current = selected;
    if (!prev || prev.id === selected.id) {
      cancelAnimationFrame(panelRafRef.current);
      setDisplayEvt(selected); setPanelPages([selected]); setPanelProgress(0); setPanelAnimating(false);
      panelProg.current = 0; applyPanelTransform(0);
      return;
    }
    const prevIdx   = EVENTS.findIndex(e => e.id === prev.id);
    const targetIdx = EVENTS.findIndex(e => e.id === selected.id);
    setDisplayEvt(selected);
    animatePanelPages(
      buildPanelPages(prev, selected, prevIdx, targetIdx),
      prevIdx, targetIdx,
      Math.abs(targetIdx - prevIdx) > 1 ? SCROLL_ANIM_MS : PANEL_ADJ_MS,
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  // ── Panel viewport measurement ────────────────────────────────────────────────

  useEffect(() => {
    const el = panelVpRef.current;
    if (!el || !selected) return;
    const measure = () => {
      const w = el.offsetWidth;
      if (w > 0) { setPanelVpW(w); applyPanelTransform(panelProg.current); }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, cssFullscreen]);

  // ── Init + resize ─────────────────────────────────────────────────────────────

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const init = (w: number) => {
      p.current.vpW = w;
      if (p.current.px === 0) {
        const minPx = Math.max(MIN_PX, w / TOTAL_SECS);
        p.current.px = minPx;
        p.current.centerSecs = t2s(9, 30);
        p.current.off = p.current.centerSecs * minPx - w / 2;
      }
      syncFromCenter(p.current); syncView();
    };
    init(el.clientWidth);
    const ro = new ResizeObserver(([e]) => init(e.contentRect.width));
    ro.observe(el);
    const state = p.current;
    return () => { ro.disconnect(); state.vpW = 0; };
  }, [cssFullscreen]);

  // ── Canvas draw ───────────────────────────────────────────────────────────────

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || view.vpW === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = view.vpW * dpr; canvas.style.width  = `${view.vpW}px`;
    canvas.height = STRIP_H * dpr;  canvas.style.height = `${STRIP_H}px`;
    ctx.scale(dpr, dpr);
    drawRuler(ctx, view.vpW, view.px, view.off);
  }, [view]);

  // ── Touch listeners ───────────────────────────────────────────────────────────

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      cancelAnimationFrame(p.current.animRaf);
      cancelAnimationFrame(p.current.zoomRaf);
      cancelAnimationFrame(p.current.wheelRaf);
      p.current.zoomRaf = 0; p.current.wheelRaf = 0; p.current.wheelVel = 0;
      stopDragLoop();
      const s = p.current;
      if (e.touches.length === 1) {
        s.pinching = false; s.dragging = false; s.touchFling = false;
        s.velX = 0; s.lastX = e.touches[0].clientX; s.lastT = performance.now();
        s.dragPendingDelta = 0;
      } else if (e.touches.length === 2) {
        e.preventDefault();
        s.dragging = false; s.pinching = true;
        const t0 = e.touches[0], t1 = e.touches[1];
        s.pinchStartDist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
        s.scaleStartPx = s.px; s.scaleStartOff = s.off;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const s = p.current;
      if (s.pinching && e.touches.length === 2) {
        const t0 = e.touches[0], t1 = e.touches[1];
        const dist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
        if (s.pinchStartDist > 0) {
          const scale = dist / s.pinchStartDist;
          const cx = s.vpW / 2;
          const focalSecs = (s.scaleStartOff + cx) / s.scaleStartPx;
          s.px = Math.max(MIN_PX, Math.min(effectiveMaxPx(focalSecs, s.vpW), s.scaleStartPx * scale));
          s.centerSecs = focalSecs;
          syncFromCenter(s); syncView();
        }
        return;
      }
      if (e.touches.length === 1) {
        const coord = e.touches[0].clientX;
        if (!s.dragging) {
          if (Math.abs(coord - s.lastX) > 5) s.dragging = true; else return;
        }
        const now = performance.now(), dt = now - s.lastT;
        if (dt > 0 && dt < 80) s.velX = (s.lastX - coord) / dt * 1000;
        s.dragPendingDelta += coord - s.lastX;
        s.lastX = coord; s.lastT = now;
        ensureDragLoop();
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      const s = p.current;
      if (s.pinching) {
        s.pinching = false;
        if (e.touches.length === 1) {
          s.dragPendingDelta = 0;
          s.velX = 0; s.lastX = e.touches[0].clientX; s.lastT = performance.now();
        }
        return;
      }
      if (!s.dragging) return;
      s.dragging = false;
      if (s.dragPendingDelta !== 0) applyDragDelta(s.dragPendingDelta);
      stopDragLoop(); syncView();
      if (e.touches.length === 0) { s.touchFling = true; startFling(s.velX); }
    };

    el.addEventListener("touchstart",  onTouchStart,  { passive: false });
    el.addEventListener("touchmove",   onTouchMove,   { passive: false });
    el.addEventListener("touchend",    onTouchEnd);
    el.addEventListener("touchcancel", onTouchEnd);
    return () => {
      el.removeEventListener("touchstart",  onTouchStart);
      el.removeEventListener("touchmove",   onTouchMove);
      el.removeEventListener("touchend",    onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cssFullscreen]);

  // ── Wheel listener ────────────────────────────────────────────────────────────

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      cancelAnimationFrame(p.current.animRaf);
      const s = p.current;
      if (e.ctrlKey || e.metaKey) {
        const factor = e.deltaY > 0 ? 0.88 : 1.14;
        const cs = (s.off + s.vpW/2) / s.px;
        triggerZoom(Math.max(MIN_PX, Math.min(effectiveMaxPx(cs, s.vpW), s.px * factor)));
        return;
      }
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      s.wheelVel += delta * 3;
      s.wheelVel = Math.sign(s.wheelVel) * Math.min(Math.abs(s.wheelVel), 3000);
      if (s.wheelRaf) return;
      let lastT = -1;
      function tick(now: number) {
        if (lastT < 0) { lastT = now; s.wheelRaf = requestAnimationFrame(tick); return; }
        const dt = Math.min((now - lastT) / 1000, 0.05); lastT = now;
        s.centerSecs += s.wheelVel * dt / s.px;
        s.wheelVel *= Math.pow(0.04, dt);
        syncFromCenter(s); syncView();
        if (Math.abs(s.wheelVel) < 1) { s.wheelRaf = 0; return; }
        s.wheelRaf = requestAnimationFrame(tick);
      }
      s.wheelRaf = requestAnimationFrame(tick);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cssFullscreen]);

  // ── Mouse/stylus drag ─────────────────────────────────────────────────────────

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      cancelAnimationFrame(p.current.animRaf);
      cancelAnimationFrame(p.current.zoomRaf);
      cancelAnimationFrame(p.current.wheelRaf);
      p.current.zoomRaf = 0; p.current.wheelRaf = 0; p.current.wheelVel = 0;
      stopDragLoop();
      el.setPointerCapture(e.pointerId);
      const s = p.current;
      s.pendingPointerId = e.pointerId; s.dragging = false; s.touchFling = false;
      s.velX = 0; s.lastX = e.clientX; s.lastT = performance.now();
      s.dragPendingDelta = 0;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const s = p.current;
      if (s.pendingPointerId === e.pointerId && !s.dragging) {
        if (Math.abs(e.clientX - s.lastX) > 5) { s.dragging = true; s.pendingPointerId = -1; } else return;
      }
      if (!s.dragging) return;
      const now = performance.now(), dt = now - s.lastT;
      if (dt > 0 && dt < 80) s.velX = (s.lastX - e.clientX) / dt * 1000;
      s.dragPendingDelta += e.clientX - s.lastX;
      s.lastX = e.clientX; s.lastT = now;
      ensureDragLoop();
    };
    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const s = p.current;
      s.pendingPointerId = -1;
      if (!s.dragging) return;
      s.dragging = false;
      if (s.dragPendingDelta !== 0) applyDragDelta(s.dragPendingDelta);
      stopDragLoop(); syncView(); startFling(s.velX);
    };

    el.addEventListener("pointerdown",  onPointerDown);
    el.addEventListener("pointermove",  onPointerMove);
    el.addEventListener("pointerup",    onPointerUp);
    el.addEventListener("pointerleave", onPointerUp);
    return () => {
      el.removeEventListener("pointerdown",  onPointerDown);
      el.removeEventListener("pointermove",  onPointerMove);
      el.removeEventListener("pointerup",    onPointerUp);
      el.removeEventListener("pointerleave", onPointerUp);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cssFullscreen]);

  // ── Cleanup ───────────────────────────────────────────────────────────────────

  useEffect(() => () => {
    cancelAnimationFrame(p.current.animRaf);
    cancelAnimationFrame(p.current.wheelRaf);
    cancelAnimationFrame(p.current.dragRaf);
    cancelAnimationFrame(p.current.zoomRaf);
    cancelAnimationFrame(panelRafRef.current);
  }, []);

  // ── Layout ────────────────────────────────────────────────────────────────────

  const { px, off, vpW } = view;

  const visible = EVENTS.map(evt => ({
    evt, x: (evt.time.getTime() - START_MS) / 1000 * px - off,
  })).filter(({ x }) => x >= -(CARD_W_MAX + 20) && x <= vpW + CARD_W_MAX + 20);
  const clusters     = buildClusters(visible.map(({ evt, x }) => ({ evt, pos: x })));
  const clusterLanes = layoutClusterLanes(clusters);

  const visibleDurations = EVENTS
    .filter((evt): evt is Evt & { endTime: Date } => !!evt.endTime)
    .map(evt => ({
      evt,
      start: (evt.time.getTime()    - START_MS) / 1000 * px - off,
      end:   (evt.endTime.getTime() - START_MS) / 1000 * px - off,
    }))
    .filter(({ start, end }) => end >= -20 && start <= vpW + 20);

  const shootZone  = ZOOM_TRANSITIONS[1];
  const zoneX0     = (shootZone.start - 25) * px - off;
  const zoneX1     = (shootZone.end   - 25) * px - off;
  const dmhStart   = (EVENTS[1].time.getTime() - START_MS) / 1000;
  const dmhEnd     = (EVENTS[3].time.getTime() - START_MS) / 1000;
  const zone2X0    = dmhStart * px - off;
  const zone2X1    = dmhEnd   * px - off + DOT_R * 2 + 2;
  const labelStep  = rulerLabelStep(px, vpW, off);
  const rulerLabels = buildRulerLabels(px, vpW, off, labelStep).map(({ s, pos, label }) => ({ s, x: pos, label }));
  const zoomLabel  = px > 0 && vpW > 0 ? (() => {
    const secs = vpW / px;
    if (secs < 120) return `${Math.round(secs)}s`;
    if (secs < 3600) return `${Math.round(secs/60)}m`;
    const h = Math.floor(secs/3600), m = Math.round((secs%3600)/60);
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  })() : "";

  const shownEvt        = displayEvt ?? selected;
  const activeEvtId     = shownEvt?.id;
  const carouselPages   = panelPages.length > 0 ? panelPages : (shownEvt ? [shownEvt] : []);
  const panelTransform  = `translate3d(${-panelProgress * panelVpW}px,0,0)`;
  const selectedIdx     = selected ? EVENTS.findIndex(e => e.id === selected.id) : -1;
  const hasPrev         = selectedIdx > 0;
  const hasNext         = selectedIdx >= 0 && selectedIdx < EVENTS.length - 1;

  const navBtnClass = "absolute top-1/2 -translate-y-1/2 z-20 w-[50px] h-[50px] flex items-center justify-center text-white/25 hover:text-white/70 disabled:opacity-20 disabled:pointer-events-none transition-colors cursor-pointer";

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
      {/* Panel area */}
      <div className="flex-1 relative overflow-hidden min-h-0 bg-[#151b28]">
        {selected ? (
          <>
            <button type="button" onPointerDown={(e) => e.stopPropagation()}
              onClick={() => hasPrev && onSelect(EVENTS[selectedIdx - 1])} disabled={!hasPrev}
              className={`${navBtnClass} left-0`} aria-label="Previous event">
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 3L5 8l5 5"/></svg>
            </button>
            <button type="button" onPointerDown={(e) => e.stopPropagation()}
              onClick={() => hasNext && onSelect(EVENTS[selectedIdx + 1])} disabled={!hasNext}
              className={`${navBtnClass} right-0`} aria-label="Next event">
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 3l5 5-5 5"/></svg>
            </button>
            <div ref={panelVpRef} className="absolute inset-x-[50px] inset-y-0 overflow-hidden">
              {shownEvt && panelVpW > 0 && (
                <div ref={sliderRef} className="absolute top-0 left-0 h-full will-change-transform"
                  style={panelAnimating ? undefined : { transform: panelTransform }}>
                  {carouselPages.map((evt, i) => (
                    <div key={`${evt.id}-${i}`} className="absolute top-0 h-full" style={{ width: panelVpW, left: i * panelVpW }}>
                      <div className="h-full w-full min-h-0 flex flex-row">
                        {renderMedia(evt, evt.id === activeEvtId && !panelAnimating, false)}
                        <div className={`min-w-0 flex flex-col justify-center overflow-y-auto py-6 sm:py-8 px-6 sm:px-10 md:px-12 ${mediaForEvent(evt.id) ? "flex-[0.85] pr-4 sm:pr-8" : "flex-1"}`}>
                          <p className="font-mono text-sm text-white/50 mb-2">
                            {fmt12(evt.time)}{evt.endTime ? ` – ${fmt12(evt.endTime)}` : ""}
                          </p>
                          <h2 className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug mb-4">{evt.title}</h2>
                          <p className="text-white/70 text-[15px] leading-relaxed mb-5">{evt.text}</p>
                          <p className="text-sm font-medium" style={{ color: evt.color }}>{fmtRelToShoot(evt.time)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          /* Idle hint grid */
          <div className="h-full flex items-center justify-center p-5 select-none">
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 w-full max-w-65">
              <div className="flex justify-center"><Image src="/icons/touchpanLR.svg" alt="" width={200} height={200} className="w-1/2 aspect-square invert opacity-35" unoptimized /></div>
              <div className="flex justify-center"><Image src="/icons/touchzoomLR.svg" alt="" width={200} height={200} className="w-1/2 aspect-square invert opacity-35" unoptimized /></div>
              <p className="text-center text-white/30 text-xs uppercase tracking-widest">Pan</p>
              <p className="text-center text-white/30 text-xs uppercase tracking-widest">Zoom</p>
              <div className="flex justify-center"><Image src="/icons/scroll.svg" alt="" width={200} height={200} className="w-1/2 aspect-square invert opacity-35" unoptimized /></div>
              <div className="flex items-center gap-1">
                <div className="flex-1"><Image src="/icons/ctrl.svg" alt="" width={200} height={200} className="w-full aspect-square invert opacity-35" unoptimized /></div>
                <span className="text-white/20 text-xs shrink-0">+</span>
                <div className="flex-1"><Image src="/icons/scroll.svg" alt="" width={200} height={200} className="w-full aspect-square invert opacity-35" unoptimized /></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Horizontal timeline strip */}
      <div ref={stripRef} className="relative shrink-0 border-t border-white/10 overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ height: STRIP_H, background: "#0e1420" }}>
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

        {/* Zone highlights */}
        <div className="absolute inset-y-0 pointer-events-none" style={{ left: zone2X0, width: Math.max(0, zone2X1 - zone2X0), background: "rgba(255,68,68,0.08)", borderLeft: "1px solid rgba(255,68,68,0.25)", borderRight: "1px solid rgba(255,68,68,0.25)" }} />
        <div className="absolute inset-y-0 pointer-events-none" style={{ left: zoneX0,  width: Math.max(0, zoneX1  - zoneX0),  background: "rgba(255,68,68,0.08)", borderLeft: "1px solid rgba(255,68,68,0.25)", borderRight: "1px solid rgba(255,68,68,0.25)" }} />

        {/* Duration bars */}
        {px > 0 && visibleDurations.map(({ evt, start, end }) => (
          <div key={`dur-${evt.id}`} className="absolute pointer-events-none" style={{
            left: start, top: LINE_Y - DURATION_H/2,
            width: Math.max(0, end - start), height: DURATION_H,
            backgroundColor: selected?.id === evt.id ? evt.color : `${evt.color}99`,
          }} />
        ))}

        {/* Tab cards + dots */}
        {px > 0 && clusters.map((cluster) => {
          const { lead, pos: x, r, evts } = cluster;
          const lane  = clusterLanes[lead.id] ?? 0;
          const isSel = evts.some(e => selected?.id === e.id);
          const cardBot = LINE_Y - DOT_R - 6 - lane * LANE_H;
          const cardTop = cardBot - CARD_H;
          const stemH   = Math.max(0, LINE_Y - DOT_R - 4 - cardBot);
          return (
            <Fragment key={lead.id}>
              <button className="absolute focus:outline-none cursor-pointer"
                onPointerDown={(e) => e.stopPropagation()}
                style={{
                  left: x, top: Math.max(0, cardTop - 2),
                  height: CARD_H + 6, zIndex: isSel ? 10 : 1 + (COLOR_PRI[lead.color] ?? 0),
                  overflow: "visible", animation: "tl-card-in 0.2s ease-out forwards",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isSel) { onSelect(lead); return; }
                  const ci = evts.findIndex(ev => ev.id === selected?.id);
                  const next = evts[(ci + 1) % evts.length];
                  if (next.id === selected?.id) onDeselect(); else onSelect(next);
                }}
              >
                <div className="flex items-center overflow-hidden transition-all duration-150" style={{
                  position: "absolute", top: 2, left: 0, height: CARD_H,
                  minWidth: CARD_W, maxWidth: CARD_W_MAX, width: "max-content",
                  borderRadius: 5, paddingLeft: 8, paddingRight: 6,
                  background:   isSel ? `${lead.color}1a` : "rgba(20,28,45,0.95)",
                  border:       `1px solid ${lead.color}${isSel ? "55" : "2a"}`,
                  borderLeft:   `3px solid ${lead.color}${isSel ? "cc" : "88"}`,
                  boxShadow:    isSel ? `0 0 12px ${lead.color}22` : "none",
                }}>
                  <span className="text-[10px] leading-none whitespace-nowrap transition-colors duration-150"
                    style={{ color: isSel ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.6)" }}>
                    {lead.title}
                  </span>
                </div>
                {stemH > 0 && (
                  <div className="absolute pointer-events-none" style={{
                    left: DOT_R - 0.5, top: CARD_H + 4, width: 1, height: stemH,
                    background: `linear-gradient(to bottom, ${lead.color}55, ${lead.color}1a)`,
                  }} />
                )}
              </button>
              <div className="absolute pointer-events-none rounded-full" style={{
                left: x + DOT_R - r, top: LINE_Y - r, width: r*2, height: r*2,
                background:  isSel ? lead.color : `${lead.color}99`,
                boxShadow:   isSel ? `0 0 10px 3px ${lead.color}44` : "none",
                transition:  "width 150ms, height 150ms, background 150ms, box-shadow 150ms",
                zIndex:      isSel ? 3 : 2,
              }} />
            </Fragment>
          );
        })}

        {/* Ruler labels */}
        {rulerLabels.map(({ s, x, label }) => (
          <span key={s} className="absolute font-mono pointer-events-none"
            style={{ left: x + 5, top: LINE_Y + 18, fontSize: 11, color: "rgba(255,255,255,0.45)", whiteSpace: "nowrap", animation: "tl-fade-in 0.25s ease-out forwards" }}>
            {label}
          </span>
        ))}
        <span className="absolute bottom-1.5 right-2 font-mono pointer-events-none select-none" style={{ fontSize: 10, color: "rgba(255,255,255,0.25)" }}>
          {zoomLabel}
        </span>
      </div>
    </div>
  );
}
