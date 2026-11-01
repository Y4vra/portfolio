import { useEffect, useState } from 'react';

const LINKS = [
  { hash: '#portfolio', label: 'Projects' },
  { hash: '#about', label: 'About' },
  { hash: '#contact', label: 'Contact' },
];

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // The inline script in Layout.astro already applied the theme before paint.
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    document.documentElement.classList.toggle('dark', next);
    try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch (e) { /* storage unavailable */ }
    setIsDark(next);
  };

  return (
    <div className="flex items-center gap-1 h-8">
      <svg aria-hidden="true" className="h-full w-6 dark:text-dark-accent-500" fill="currentColor" viewBox="0 0 30 30">
        <path d="M 14.984375 0.98632812 A 1.0001 1.0001 0 0 0 14 2 L 14 5 A 1.0001 1.0001 0 1 0 16 5 L 16 2 A 1.0001 1.0001 0 0 0 14.984375 0.98632812 z M 5.796875 4.7988281 A 1.0001 1.0001 0 0 0 5.1015625 6.515625 L 7.2226562 8.6367188 A 1.0001 1.0001 0 1 0 8.6367188 7.2226562 L 6.515625 5.1015625 A 1.0001 1.0001 0 0 0 5.796875 4.7988281 z M 24.171875 4.7988281 A 1.0001 1.0001 0 0 0 23.484375 5.1015625 L 21.363281 7.2226562 A 1.0001 1.0001 0 1 0 22.777344 8.6367188 L 24.898438 6.515625 A 1.0001 1.0001 0 0 0 24.171875 4.7988281 z M 15 8 A 7 7 0 0 0 8 15 A 7 7 0 0 0 15 22 A 7 7 0 0 0 22 15 A 7 7 0 0 0 15 8 z M 2 14 A 1.0001 1.0001 0 1 0 2 16 L 5 16 A 1.0001 1.0001 0 1 0 5 14 L 2 14 z M 25 14 A 1.0001 1.0001 0 1 0 25 16 L 28 16 A 1.0001 1.0001 0 1 0 28 14 L 25 14 z M 7.9101562 21.060547 A 1.0001 1.0001 0 0 0 7.2226562 21.363281 L 5.1015625 23.484375 A 1.0001 1.0001 0 1 0 6.515625 24.898438 L 8.6367188 22.777344 A 1.0001 1.0001 0 0 0 7.9101562 21.060547 z M 22.060547 21.060547 A 1.0001 1.0001 0 0 0 21.363281 22.777344 L 23.484375 24.898438 A 1.0001 1.0001 0 1 0 24.898438 23.484375 L 22.777344 21.363281 A 1.0001 1.0001 0 0 0 22.060547 21.060547 z M 14.984375 23.986328 A 1.0001 1.0001 0 0 0 14 25 L 14 28 A 1.0001 1.0001 0 1 0 16 28 L 16 25 A 1.0001 1.0001 0 0 0 14.984375 23.986328 z"/>
      </svg>

      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label="Dark mode"
        onClick={toggleTheme}
        className="relative h-5 w-10 cursor-pointer rounded-full bg-dark-accent-500 dark:bg-dark-main-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-accent-500 dark:focus-visible:ring-dark-accent-500"
      >
        <span
          aria-hidden="true"
          className={`absolute left-1 top-1 h-3 w-3 rounded-full bg-white transition-transform ${isDark ? 'translate-x-5' : ''}`}
        />
      </button>

      <svg aria-hidden="true" className="h-full w-6 text-light-accent-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79Z"/>
      </svg>
    </div>
  );
}

export default function NavBar() {
  const [activeHash, setActiveHash] = useState('#start');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const onHashChange = () => setActiveHash(window.location.hash || '#start');
    window.addEventListener('hashchange', onHashChange);

    // A section becomes active when it crosses the vertical centre of the viewport.
    // Unlike a 50% threshold, this also works for sections taller than two screens.
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            setActiveHash(`#${id}`);
            history.replaceState(null, '', `#${id}`);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));

    const onKeyDown = (e) => { if (e.key === 'Escape') setSidebarOpen(false); };
    window.addEventListener('keydown', onKeyDown);

    const desktopQuery = window.matchMedia('(min-width: 768px)');
    const onDesktop = (e) => { if (e.matches) setSidebarOpen(false); };
    desktopQuery.addEventListener('change', onDesktop);

    return () => {
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('keydown', onKeyDown);
      desktopQuery.removeEventListener('change', onDesktop);
      observer.disconnect();
    };
  }, []);

  const toggleSidebar = () => setSidebarOpen((open) => !open);

  const getLinkClass = (hash) => `
    px-2 py-1 rounded-md transition-colors
    ${activeHash === hash
      ? "bg-light-main-300 dark:bg-dark-main-800 text-light-accent-600 dark:text-dark-accent-400 font-medium"
      : "hover:text-light-accent-500 dark:hover:text-dark-accent-500 hover:bg-light-main-100 dark:hover:bg-dark-main-800"
    }`;

  return (
    <>
      <nav aria-label="Main" className="sticky top-0 z-50 flex items-center justify-between px-4 py-4 h-16 w-full bg-light-surface dark:bg-dark-main-900 shadow-xl backdrop-blur-md">
        <a href="#start" className="h-full flex items-center font-mono text-xl font-semibold text-light-accent-500 dark:text-dark-accent-500">
          Y4vra
        </a>

        <div className="flex items-center gap-6 h-full">
          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 h-full">
            {LINKS.map(({ hash, label }) => (
              <a key={hash} href={hash} className={getLinkClass(hash)} aria-current={activeHash === hash ? 'true' : undefined}>
                {label}
              </a>
            ))}
          </div>

          {/* Theme toggle: visible on every screen size */}
          <ThemeToggle />

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={sidebarOpen}
            aria-controls="mobile-menu"
            className="block md:hidden text-light-main-900 dark:text-dark-main-50 p-2"
          >
            <svg aria-hidden="true" className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu: inert while closed so it can't be reached with the keyboard */}
      <div
        id="mobile-menu"
        inert={!sidebarOpen}
        aria-hidden={!sidebarOpen}
        className={`fixed top-16 left-0 w-full z-40 flex flex-col items-center gap-4 py-8 bg-light-surface dark:bg-dark-main-900 shadow-2xl md:hidden transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        {LINKS.map(({ hash, label }) => (
          <a
            key={hash}
            href={hash}
            className={getLinkClass(hash)}
            aria-current={activeHash === hash ? 'true' : undefined}
            onClick={() => setSidebarOpen(false)}
          >
            {label}
          </a>
        ))}
      </div>
    </>
  );
}
