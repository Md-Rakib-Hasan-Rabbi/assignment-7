import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="mx-auto w-full max-w-3xl rounded-md border border-base-300 bg-base-100 p-10 text-center">
      <h1 className="text-6xl font-bold text-base-content">404</h1>
      <p className="mt-3 text-2xl font-semibold text-base-content">Page not found</p>
      <p className="mt-2 text-base-content/70">The route you requested does not exist.</p>
      <Link href="/" className="btn btn-primary mt-6">
        Go back home
      </Link>
    </section>
  );
}
