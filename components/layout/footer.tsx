import Link from "next/link";

export default function Footer() {
  return (
    <footer className="glass border-t border-brand-primary/20 dark:border-brand-primary/20 light:border-gray-300 mt-20">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-black gradient-text">Netplix</h3>
            <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm">
            Temukan film dan acara TV tanpa batas yang didukung oleh TMDB.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white dark:text-white light:text-gray-900 mb-4">Nonton Apa?</h4>
            <ul className="space-y-2 text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm">
              <li><Link href="/" className="hover:text-brand-primary transition">Home</Link></li>
              <li><Link href="/browse/movies" className="hover:text-brand-primary transition">Movies</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white dark:text-white light:text-gray-900 mb-4">Kategori</h4>
            <ul className="space-y-2 text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm">
              <li><a href="#" className="hover:text-brand-secondary transition">Action</a></li>
              <li><a href="#" className="hover:text-brand-secondary transition">Comedy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 dark:border-white/10 light:border-gray-300 mt-8 pt-8 text-center text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm">
          <p>© 2026 Netplix. Powered by <a href="https://www.themoviedb.org" target="_blank" className="text-brand-secondary hover:underline">TMDB API</a>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
