'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

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

export default function FriendDetailPage() {
  const params = useParams();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    async function loadFriends() {
      const response = await fetch('/friends.json');
      const data = await response.json();
      setFriends(data);
    }

    loadFriends();
  }, []);

  const friend = useMemo(() => {
    const friendId = Number(params.id);
    return friends.find((item) => item.id === friendId);
  }, [friends, params.id]);

  if (!friend) {
    return (
      <section className="mx-auto w-full max-w-3xl rounded-md border border-base-300 bg-base-100 p-8 text-center">
        <h1 className="text-3xl font-bold text-base-content">Friend not found</h1>
        <p className="mt-2 text-base-content/60">This profile does not exist in your data file.</p>
        <Link href="/" className="btn btn-primary mt-6">
          Back to Home
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-3xl rounded-md border border-base-300 bg-base-100 p-6 md:p-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="avatar">
          <div className="w-28 rounded-full ring-2 ring-base-200">
            <Image src={friend.picture} alt={`${friend.name} profile`} width={112} height={112} className="object-cover" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-base-content">{friend.name}</h1>
        <p className="text-base text-base-content/60">{friend.email}</p>

        <div className="flex flex-wrap justify-center gap-2">
          {friend.tags.map((tag) => (
            <span key={tag} className="badge badge-success badge-sm badge-outline">
              {tag.toUpperCase()}
            </span>
          ))}
        </div>

        <span className={statusClassMap[friend.status]}>{formatStatus(friend.status)}</span>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <article className="card border border-base-300 bg-base-200/40">
          <div className="card-body py-4">
            <p className="text-sm text-base-content/60">Days Since Contact</p>
            <p className="text-3xl font-bold text-base-content">{friend.days_since_contact}</p>
          </div>
        </article>

        <article className="card border border-base-300 bg-base-200/40">
          <div className="card-body py-4">
            <p className="text-sm text-base-content/60">Contact Goal (days)</p>
            <p className="text-3xl font-bold text-base-content">{friend.goal}</p>
          </div>
        </article>

        <article className="card border border-base-300 bg-base-200/40 md:col-span-2">
          <div className="card-body py-4">
            <p className="text-sm text-base-content/60">Next Due Date</p>
            <p className="text-xl font-semibold text-base-content">{friend.next_due_date}</p>
          </div>
        </article>
      </div>

      <article className="card mt-4 border border-base-300 bg-base-200/40">
        <div className="card-body py-4">
          <p className="text-sm text-base-content/60">Bio</p>
          <p className="text-base text-base-content">{friend.bio}</p>
        </div>
      </article>
    </section>
  );
}
