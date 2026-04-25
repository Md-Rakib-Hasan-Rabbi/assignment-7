'use client';

import { useState } from 'react';

const eventConfig = {
    text: { icon: '💬', label: 'Text', tone: 'text-primary' },
    video: { icon: '📹', label: 'Video', tone: 'text-primary' },
    call: { icon: '📞', label: 'Call', tone: 'text-primary' },
};

function formatDate(dateValue) {
    return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(dateValue));
}

export default function AboutPage() {
    const [filter, setFilter] = useState('all');
    const [savedEvents] = useState(() => {
        try {
            const raw = localStorage.getItem('keenkeeper.timeline.events');
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    });

    const sortedEvents = [...savedEvents].sort((a, b) => new Date(b.date) - new Date(a.date));
    const timelineItems = filter === 'all' ? sortedEvents : sortedEvents.filter((item) => item.type === filter);

    return (
        <section className="mx-auto w-full max-w-5xl px-4 py-8 md:py-12">
            <h1 className="text-6xl font-bold text-base-content">Timeline</h1>

            <div className="mt-6 w-full max-w-sm">
                <select value={filter} onChange={(event) => setFilter(event.target.value)} className="select select-bordered w-full bg-base-100 text-base-content/70">
                    <option value="all">Filter timeline</option>
                    <option value="call">Calls</option>
                    <option value="video">Videos</option>
                    <option value="text">Texts</option>
                </select>
            </div>

            <div className="mt-6 space-y-4">
                {timelineItems.map((item) => {
                    const config = eventConfig[item.type] || eventConfig.text;

                    return (
                        <article key={item.id} className="card border border-base-300 bg-base-100 shadow-sm">
                            <div className="card-body flex-row items-start gap-4 py-5">
                                <span className="text-4xl" aria-hidden="true">
                                    {config.icon}
                                </span>
                                <div>
                                    <p className="text-3xl text-base-content/70">
                                        <span className={`font-semibold ${config.tone}`}>{config.label}</span> with {item.friendName}
                                    </p>
                                    <p className="mt-1 text-2xl text-base-content/70">{formatDate(item.date)}</p>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}