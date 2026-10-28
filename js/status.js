// js/status.js
// One status vocabulary for both dashboards.

export const STATUS = Object.freeze({
  CONFIRMED:   "confirmed",
  WAITING:     "waiting",
  CALLED:      "called",
  IN_PROGRESS: "in_progress",
  COMPLETED:   "completed",
  CANCELLED:   "cancelled",
  NO_SHOW:     "no_show",
});

const LEGACY = {
  "approve":     STATUS.CONFIRMED,
  "approved":    STATUS.CONFIRMED,
  "booked":      STATUS.CONFIRMED,
  "confirm":     STATUS.CONFIRMED,
  "serving":     STATUS.CALLED,
  "now_serving": STATUS.CALLED,
  "done":        STATUS.COMPLETED,
  "finish":      STATUS.COMPLETED,
  "finished":    STATUS.COMPLETED,
  "absent":      STATUS.NO_SHOW,
  "rejected":    STATUS.CANCELLED,
  "reject":      STATUS.CANCELLED,
  "cancel":      STATUS.CANCELLED,
};

export function normalizeStatus(raw) {
  const v = String(raw ?? "").trim().toLowerCase();
  if (!v) return STATUS.CONFIRMED;
  if (LEGACY[v]) return LEGACY[v];
  if (v === STATUS.WAITING)     return STATUS.WAITING;
  if (v === STATUS.CALLED)      return STATUS.CALLED;
  if (v === STATUS.IN_PROGRESS) return STATUS.IN_PROGRESS;
  if (v === STATUS.COMPLETED)   return STATUS.COMPLETED;
  if (v === STATUS.CANCELLED)   return STATUS.CANCELLED;
  if (v === STATUS.NO_SHOW)     return STATUS.NO_SHOW;
  if (v === STATUS.CONFIRMED)   return STATUS.CONFIRMED;
  return STATUS.CONFIRMED;
}

export function isActive(status) {
  const s = normalizeStatus(status);
  return s === STATUS.CONFIRMED ||
         s === STATUS.WAITING ||
         s === STATUS.CALLED ||
         s === STATUS.IN_PROGRESS;
}

export function isTerminal(status) {
  const s = normalizeStatus(status);
  return s === STATUS.COMPLETED ||
         s === STATUS.CANCELLED ||
         s === STATUS.NO_SHOW;
}

export function nextStatus(current, action, by) {
  const s = normalizeStatus(current);

  const rules = {
    staff: {
      call:      { from: [STATUS.CONFIRMED, STATUS.WAITING],                to: STATUS.CALLED },
      start:     { from: [STATUS.CALLED],                                   to: STATUS.IN_PROGRESS },
      complete:  { from: [STATUS.IN_PROGRESS, STATUS.CALLED],               to: STATUS.COMPLETED },
      no_show:   { from: [STATUS.CONFIRMED, STATUS.WAITING, STATUS.CALLED], to: STATUS.NO_SHOW },
      cancel:    { from: [STATUS.CONFIRMED, STATUS.WAITING, STATUS.CALLED,
                          STATUS.IN_PROGRESS],                              to: STATUS.CANCELLED },
    },
    patient: {
      cancel:    { from: [STATUS.CONFIRMED, STATUS.WAITING],                to: STATUS.CANCELLED },
    },
  };

  const rule = (rules[by] || {})[action];
  if (!rule) return null;
  return rule.from.includes(s) ? rule.to : null;
}

export const STATUS_LABEL = Object.freeze({
  [STATUS.CONFIRMED]:   "Confirmed",
  [STATUS.WAITING]:     "Waiting",
  [STATUS.CALLED]:      "Called",
  [STATUS.IN_PROGRESS]: "In consultation",
  [STATUS.COMPLETED]:   "Completed",
  [STATUS.CANCELLED]:   "Cancelled",
  [STATUS.NO_SHOW]:     "No show",
});