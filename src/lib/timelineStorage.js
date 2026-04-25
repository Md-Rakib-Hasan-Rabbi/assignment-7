const TIMELINE_STORAGE_KEY = 'keenkeeper.timeline.events';

export function getTimelineEvents() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(TIMELINE_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addTimelineEvent(eventData) {
  if (typeof window === 'undefined') {
    return null;
  }

  const events = getTimelineEvents();
  const event = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    createdAt: new Date().toISOString(),
    ...eventData,
  };

  const nextEvents = [event, ...events];
  window.localStorage.setItem(TIMELINE_STORAGE_KEY, JSON.stringify(nextEvents));
  return event;
}
