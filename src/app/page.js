'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const statusClassMap = {
  overdue: 'badge badge-error badge-sm text-white',
  'on-track': 'badge badge-success badge-sm text-white',
  'almost due': 'badge badge-warning badge-sm text-white',
};

function formatStatus(status) {
  if (status === 'on-track') return 'On-Track';
  return status
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

export default function Home() {
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFriends() {
      try {
        const response = await fetch('/friends.json');
        if (!response.ok) {
          throw new Error('Failed to load friends');
        }
        const data = await response.json();
        setFriends(Array.isArray(data) ? data : []);
      } catch {
        setFriends([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadFriends();
  }, []);

  const summaryCards = useMemo(() => {
    const onTrack = friends.filter((friend) => friend.status === 'on-track').length;
    const needAttention = friends.filter((friend) => friend.status !== 'on-track').length;

    return [
      { value: friends.length, label: 'Total Friends' },
      { value: onTrack, label: 'On Track' },
      { value: needAttention, label: 'Need Attention' },
      { value: friends.length, label: 'Interactions This Month' },
    ];
  }, [friends]);

  if (isLoading) {
    return (
      <section className="mx-auto w-full max-w-7xl rounded-md border border-base-300 bg-base-100 p-10 text-center">
        <span className="loading loading-spinner loading-lg text-primary" />
        <p className="mt-3 text-base-content/70">Loading friends...</p>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-7xl rounded-md border border-base-300 bg-base-200/40">
      <div className="grid grid-cols-1 gap-4 border-b border-base-300 p-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((item) => (
          <article key={item.label} className="card border border-base-300 bg-base-100 shadow-sm">
            <div className="card-body items-center py-6">
              <p className="text-5xl font-bold text-primary">{item.value}</p>
              <p className="text-sm font-semibold text-base-content/60">{item.label}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="p-4 md:p-6">
        <h2 className="mb-4 text-4xl font-bold text-base-content">Your Friends</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {friends.map((friend) => (
            <Link key={friend.id} href={`/friends/${friend.id}`} className="card border border-base-300 bg-base-100 shadow-sm transition hover:shadow-md">
              <article className="card-body items-center gap-3 py-6 text-center">
                <div className="avatar">
                  <div className="w-20 rounded-full ring-2 ring-base-200">
                    <Image src={friend.picture} alt={`${friend.name} profile`} width={80} height={80} className="object-cover" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-base-content">{friend.name}</h3>
                <p className="text-xs text-base-content/40">{friend.days_since_contact}d ago</p>

                <div className="flex flex-wrap justify-center gap-2">
                  {friend.tags.map((item) => (
                    <span key={item} className="badge badge-success badge-sm badge-outline">
                      {item.toUpperCase()}
                    </span>
                  ))}
                </div>

                <span className={statusClassMap[friend.status]}>{formatStatus(friend.status)}</span>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
