'use client';

import { useEffect, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const chartColors = {
  text: '#7C3AED',
  call: '#275D4C',
  video: '#34A86A',
};

function readTimelineEvents() {
  try {
    const raw = localStorage.getItem('keenkeeper.timeline.events');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function StatsPage() {
  const [events, setEvents] = useState(() => readTimelineEvents());

  useEffect(() => {
    function refreshEvents() {
      setEvents(readTimelineEvents());
    }

    window.addEventListener('storage', refreshEvents);
    window.addEventListener('focus', refreshEvents);

    const intervalId = window.setInterval(refreshEvents, 2000);

    return () => {
      window.removeEventListener('storage', refreshEvents);
      window.removeEventListener('focus', refreshEvents);
      window.clearInterval(intervalId);
    };
  }, []);

  const counts = {
    text: 0,
    call: 0,
    video: 0,
  };

  for (const event of events) {
    if (event.type === 'text' || event.type === 'call' || event.type === 'video') {
      counts[event.type] += 1;
    }
  }

  const chartData = [
    { name: 'Text', key: 'text', value: counts.text },
    { name: 'Call', key: 'call', value: counts.call },
    { name: 'Video', key: 'video', value: counts.video },
  ];

  const hasData = chartData.some((item) => item.value > 0);

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-8 md:py-12">
      <h1 className="text-6xl font-bold text-base-content">Friendship Analytics</h1>

      <article className="mt-6 rounded-md border border-base-300 bg-base-100 p-6 md:p-8">
        <h2 className="text-3xl font-semibold text-[#244D3F]">By Interaction Type</h2>

        <div className="mt-6 h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={hasData ? chartData : [{ name: 'No interactions yet', key: 'none', value: 1 }]}
                dataKey="value"
                nameKey="name"
                innerRadius={68}
                outerRadius={96}
                paddingAngle={8}
                cornerRadius={8}
                stroke="none"
              >
                {(hasData ? chartData : [{ key: 'none' }]).map((entry) => (
                  <Cell key={entry.key} fill={entry.key === 'none' ? '#CBD5E1' : chartColors[entry.key]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [value, name]} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 flex items-center justify-center gap-6 text-base-content/70">
          {chartData.map((item) => (
            <div key={item.key} className="flex items-center gap-2 text-sm">
              <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: chartColors[item.key] }} />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
