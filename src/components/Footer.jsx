import Image from 'next/image';
import Link from 'next/link';
import facebookIcon from '../../assets/facebook.png';
import instagramIcon from '../../assets/instagram.png';
import twitterIcon from '../../assets/twitter.png';

const socialLinks = [
  { label: 'Instagram', href: '', icon: instagramIcon },
  { label: 'Facebook', href: '', icon: facebookIcon },
  { label: 'X', href: '', icon: twitterIcon },
];

export default function Footer() {
  return (
    <footer className="bg-emerald-900 text-emerald-50">
      <div className="mx-auto w-full max-w-5xl px-4 py-10 md:py-12">
        <div className="text-center">
          <h2 className="text-6xl font-bold leading-none">KeenKeeper</h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm text-emerald-100/85">
            Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
          </p>

          <h3 className="mt-6 text-3xl font-semibold">Social Links</h3>
          <div className="mt-3 flex items-center justify-center gap-3">
            {socialLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className="btn btn-circle btn-sm border-0 bg-base-100 text-base-content hover:bg-base-200"
              >
                <Image src={item.icon} alt="" width={14} height={14} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-emerald-100/30 pt-5 text-sm text-emerald-100/70">
          <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
            <p>© 2026 KeenKeeper. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="" className="hover:text-emerald-50 hover:underline">
                Privacy Policy
              </Link>
              <Link href="" className="hover:text-emerald-50 hover:underline">
                Terms of Service
              </Link>
              <Link href="" className="hover:text-emerald-50 hover:underline">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}