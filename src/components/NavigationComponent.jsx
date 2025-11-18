import { useEffect, useState } from 'react';

export default function NavBar() {
  const [activeHash, setActiveHash] = useState("#start");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    setSidebarOpen(window.innerWidth>=768);
    setActiveHash(window.location.hash || '#start');
    const onHashChange = () => {
      setActiveHash(window.location.hash || '#start');
    };

    window.addEventListener('hashchange', onHashChange);
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute("data-theme", "dark");
    }
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            setActiveHash(`#${id}`);
            history.replaceState(null, '', `#${id}`); // keep hash in URL
          }
        });
      },
      { threshold: 0.5 } // 50% visible = active
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('hashchange', onHashChange);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);
  
  const toggleSidebar =()=>{
    setSidebarOpen(!sidebarOpen)

    const main = document.querySelector('main');
    if (!main) return;
    if (sidebarOpen) {
      main.classList.add('unshifted');
    } else {
      main.classList.remove('unshifted');
    }
  }
  const linkClickSidebarCheck = ()=>{
    if(window.innerWidth<768){
      toggleSidebar();
    }
  }

  const toggleTheme = ()=>{
    document.documentElement.toggleAttribute("data-theme", "dark");
    btn = document.getElementById("sidebarToggle");
    isDark = document.documentElement.getAttribute("data-theme") === "dark";
    btn.dataset.on = isDark;
    btn.setAttribute("aria-pressed", String(isDark));
  }

  return (
    <nav className="
        flex items-center justify-between
        px-4 py-3
        bg-bgLight
        dark:bg-bgDark
        text-main-900
        border-b border-main-200/20
      ">
      <h1 className="text-xl font-semibold text-accent-500"><a href="#start">Y4vra</a></h1>
      
      {/*Desktop*/}
      <div className="flex items-center gap-6">
        <a onClick={linkClickSidebarCheck} className={`px-2 py-1 rounded-md text-accent-400 transition-colors ${activeHash === "#portfolio" ? "text-accent-500 font-medium" : "text-main-700 hover:text-accent-500"}`} href="#portfolio">Projects</a>
        <a onClick={linkClickSidebarCheck} className={`px-2 py-1 transition-colors ${activeHash === "#about" ? "text-accent-500 font-medium" : "text-main-700 hover:text-accent-500"}`} href="#about">About</a>
        <a onClick={linkClickSidebarCheck} className={`px-2 py-1 transition-colors ${activeHash === "#contact" ? "text-accent-500 font-medium" : "text-main-700 hover:text-accent-500"}`} href="#contact">Contact</a>
        <label className="inline-flex items-center cursor-pointer">
          <svg className="w-5 h-5 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.5 8.43A4.985 4.985 0 0 1 19 12a4.984 4.984 0 0 1-1.43 3.5M14 6.135v11.73a1 1 0 0 1-1.64.768L8 15H6a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h2l4.36-3.633a1 1 0 0 1 1.64.768Z"/></svg>
          <input type="checkbox" value="" className="sr-only peer"/>
          <div className="relative mx-3 w-9 h-5 bg-neutral-quaternary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"></div>
          <svg className="w-5 h-5 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.5 8.43A4.985 4.985 0 0 1 17 12a4.984 4.984 0 0 1-1.43 3.5m2.794 2.864A8.972 8.972 0 0 0 21 12a8.972 8.972 0 0 0-2.636-6.364M12 6.135v11.73a1 1 0 0 1-1.64.768L6 15H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h2l4.36-3.633a1 1 0 0 1 1.64.768Z"/></svg>
        </label>
      </div>
      {/*Mobile*/}
      <button
        id="sidebarToggle"
        onClick={toggleSidebar}
        className="hidden text-main-900 dark:text-main-50"
      >
        <svg className="w-6 h-6" stroke="currentColor" fill="none">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </nav>
  );
}