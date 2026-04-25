'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import callIcon from '../../../../assets/call.png';
import textIcon from '../../../../assets/text.png';
import videoIcon from '../../../../assets/video.png';

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

function formatDate(dateString) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateString));
}

export default function FriendDetailPage() {
  const params = useParams();
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savedType, setSavedType] = useState('');

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

  const friendId = Number(params.id);
  const friend = friends.find((item) => item.id === friendId);

  function saveCheckIn(type) {
    if (!friend || (type !== 'call' && type !== 'video' && type !== 'text')) {
      return;
    }

    try {
      const raw = localStorage.getItem('keenkeeper.timeline.events');
      const currentEvents = raw ? JSON.parse(raw) : [];
      const createdAt = new Date().toISOString();

      const newEvent = {
        id: createdAt,
        type,
        friendName: friend.name,
        friendId: friend.id,
        date: createdAt,
      };

      localStorage.setItem('keenkeeper.timeline.events', JSON.stringify([newEvent, ...currentEvents]));
    } catch {
      return;
    }

    setSavedType(type);
    setTimeout(() => {
      setSavedType('');
    }, 2500);
  }

  if (isLoading) {
    return (
      <section className="mx-auto w-full max-w-7xl rounded-md border border-base-300 bg-base-100 p-8 text-center">
        <span className="loading loading-spinner loading-lg text-[#244D3F]" />
      </section>
    );
  }

  if (!friend) {
    return (
      <section className="mx-auto w-full max-w-3xl rounded-md border border-base-300 bg-base-100 p-8 text-center">
        <h1 className="text-3xl font-bold text-base-content">Friend not found</h1>
        <p className="mt-2 text-base-content/60">This profile does not exist in your data file.</p>
        <Link href="/" className="btn mt-6 border-0 bg-[#244D3F] text-white hover:bg-[#1d3e33]">
          Back to Home
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-7xl rounded-md bg-base-200/60 p-4 md:p-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[300px_1fr]">
        <div className="space-y-3">
          <article className="card border border-base-300 bg-base-100 shadow-sm">
            <div className="card-body items-center gap-2 py-6 text-center">
              <div className="avatar">
                <div className="w-24 rounded-full ring-2 ring-base-200">
                  <Image src={friend.picture} alt={`${friend.name} profile`} width={96} height={96} className="object-cover" />
                </div>
              </div>

              <h1 className="mt-2 text-3xl font-bold text-base-content">{friend.name}</h1>

              <span className={statusClassMap[friend.status]}>{formatStatus(friend.status)}</span>

              <div className="flex flex-wrap justify-center gap-2">
                {friend.tags.map((tag) => (
                  <span key={tag} className="badge badge-success badge-sm badge-outline">
                    {tag.toUpperCase()}
                  </span>
                ))}
              </div>

              <p className="mt-1 text-base italic text-base-content/70">&quot;{friend.bio}&quot;</p>
              <p className="text-sm text-base-content/50">Preferred: email</p>
            </div>
          </article>

          <button type="button" className="btn w-full justify-center border-base-300 bg-base-100 font-medium text-base-content hover:bg-base-200">
            Snooze 2 Weeks
          </button>
          <button type="button" className="btn w-full justify-center border-base-300 bg-base-100 font-medium text-base-content hover:bg-base-200">
            Archive
          </button>
          <button type="button" className="btn btn-outline btn-error w-full justify-center font-medium">
            Delete
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <article className="card border border-base-300 bg-base-100 shadow-sm">
              <div className="card-body items-center py-6 text-center">
                <p className="text-5xl font-bold text-[#244D3F]">{friend.days_since_contact}</p>
                <p className="text-sm text-base-content/70">Days Since Contact</p>
              </div>
            </article>

            <article className="card border border-base-300 bg-base-100 shadow-sm">
              <div className="card-body items-center py-6 text-center">
                <p className="text-5xl font-bold text-[#244D3F]">{friend.goal}</p>
                <p className="text-sm text-base-content/70">Goal (Days)</p>
              </div>
            </article>

            <article className="card border border-base-300 bg-base-100 shadow-sm">
              <div className="card-body items-center py-6 text-center">
                <p className="text-4xl font-bold text-[#244D3F]">{formatDate(friend.next_due_date)}</p>
                <p className="text-sm text-base-content/70">Next Due</p>
              </div>
            </article>
          </div>

          <article className="card border border-base-300 bg-base-100 shadow-sm">
            <div className="card-body py-5">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-[#244D3F]">Relationship Goal</h2>
                <button type="button" className="btn btn-xs border-base-300 bg-base-200 text-base-content">
                  Edit
                </button>
              </div>
              <p className="text-lg text-base-content/80">
                Connect every <span className="font-bold">{friend.goal} days</span>
              </p>
            </div>
          </article>

          <article className="card border border-base-300 bg-base-100 shadow-sm">
            <div className="card-body py-5">
              <h2 className="text-2xl font-semibold text-[#244D3F]">Quick Check-In</h2>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <button type="button" onClick={() => saveCheckIn('call')} className="btn h-20 flex-col border-base-300 bg-base-200 text-base-content hover:bg-base-300">
                  <Image src={callIcon} alt="" width={22} height={22} aria-hidden="true" />
                  <span>Call</span>
                </button>

                <button type="button" onClick={() => saveCheckIn('text')} className="btn h-20 flex-col border-base-300 bg-base-200 text-base-content hover:bg-base-300">
                  <Image src={textIcon} alt="" width={22} height={22} aria-hidden="true" />
                  <span>Text</span>
                </button>

                <button type="button" onClick={() => saveCheckIn('video')} className="btn h-20 flex-col border-base-300 bg-base-200 text-base-content hover:bg-base-300">
                  <Image src={videoIcon} alt="" width={22} height={22} aria-hidden="true" />
                  <span>Video</span>
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>

      {savedType && (
        <div className="toast toast-end toast-top z-50">
          <div className="alert alert-success">
            <span>{savedType[0].toUpperCase() + savedType.slice(1)} interaction saved to Timeline.</span>
          </div>
        </div>
      )}
    </section>
  );
}
