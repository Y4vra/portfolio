import { useEffect, useState } from 'react';

export default function NavBar() {
  const [activeHash, setActiveHash] = useState("#start");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    setSidebarOpen(window.innerWidth>=768);

    const isDarkMode = document.documentElement.classList.contains('dark');
    const toggle = document.getElementById("themeToggle");
    if (toggle.checked!=isDarkMode) {
      document.documentElement.classList.add("dark");
      if (toggle) toggle.checked = true;  // set switch position
    }

    setActiveHash(window.location.hash || '#start');
    const onHashChange = () => {
      setActiveHash(window.location.hash || '#start');
    };

    window.addEventListener('hashchange', onHashChange);
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

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <>
    <nav className="
        sticky
        top-0
        z-40
        flex items-center justify-between
        px-4 py-4
        h-16 w-full
        bg-light-surface text-light-main-900
        dark:bg-dark-main-900 dark:text-dark-main-400
        shadow-xl backdrop-blur-md
        ">
      <h1 className="h-full font-semibold text-light-accent-500 dark:text-dark-accent-500"><a href="#start">Y4vra</a></h1>
      
      {/*Desktop*/}
      <div className="collapse md:visible flex items-center gap-6 h-full">
        <a onClick={linkClickSidebarCheck} className={`px-2 py-1 rounded-md transition-colors ${activeHash === "#portfolio" 
          ? "bg-light-main-300 dark:bg-dark-main-800 text-light-accent-600 dark:text-dark-accent-400 font-medium" 
          : "hover:text-light-accent-500 dark:hover:text-dark-accent-500 hover:bg-light-main-100 dark:hover:bg-dark-main-800"
          }`}  href="#portfolio">Projects</a>
        <a onClick={linkClickSidebarCheck} className={`px-2 py-1 rounded-md transition-colors ${activeHash === "#about" 
          ? "bg-light-main-300 dark:bg-dark-main-800 text-light-accent-600 dark:text-dark-accent-400 font-medium" 
          : "hover:text-light-accent-500 dark:hover:text-dark-accent-500 hover:bg-light-main-100 dark:hover:bg-dark-main-800"
          }`} href="#about">About</a>
        <a onClick={linkClickSidebarCheck} className={`px-2 py-1 rounded-md transition-colors ${activeHash === "#contact" 
          ? "bg-light-main-300 dark:bg-dark-main-800 text-light-accent-600 dark:text-dark-accent-400 font-medium" 
          : "hover:text-light-accent-500 dark:hover:text-dark-accent-500 hover:bg-light-main-100 dark:hover:bg-dark-main-800"
          }`} href="#contact">Contact</a>
        <div className="flex items-center gap-1 h-full w-1/2">
          <svg className="h-full w-1/4 dark:text-dark-accent-500" fill="currentcolor" viewBox="0 0 30 30"><path d="M 14.984375 0.98632812 A 1.0001 1.0001 0 0 0 14 2 L 14 5 A 1.0001 1.0001 0 1 0 16 5 L 16 2 A 1.0001 1.0001 0 0 0 14.984375 0.98632812 z M 5.796875 4.7988281 A 1.0001 1.0001 0 0 0 5.1015625 6.515625 L 7.2226562 8.6367188 A 1.0001 1.0001 0 1 0 8.6367188 7.2226562 L 6.515625 5.1015625 A 1.0001 1.0001 0 0 0 5.796875 4.7988281 z M 24.171875 4.7988281 A 1.0001 1.0001 0 0 0 23.484375 5.1015625 L 21.363281 7.2226562 A 1.0001 1.0001 0 1 0 22.777344 8.6367188 L 24.898438 6.515625 A 1.0001 1.0001 0 0 0 24.171875 4.7988281 z M 15 8 A 7 7 0 0 0 8 15 A 7 7 0 0 0 15 22 A 7 7 0 0 0 22 15 A 7 7 0 0 0 15 8 z M 2 14 A 1.0001 1.0001 0 1 0 2 16 L 5 16 A 1.0001 1.0001 0 1 0 5 14 L 2 14 z M 25 14 A 1.0001 1.0001 0 1 0 25 16 L 28 16 A 1.0001 1.0001 0 1 0 28 14 L 25 14 z M 7.9101562 21.060547 A 1.0001 1.0001 0 0 0 7.2226562 21.363281 L 5.1015625 23.484375 A 1.0001 1.0001 0 1 0 6.515625 24.898438 L 8.6367188 22.777344 A 1.0001 1.0001 0 0 0 7.9101562 21.060547 z M 22.060547 21.060547 A 1.0001 1.0001 0 0 0 21.363281 22.777344 L 23.484375 24.898438 A 1.0001 1.0001 0 1 0 24.898438 23.484375 L 22.777344 21.363281 A 1.0001 1.0001 0 0 0 22.060547 21.060547 z M 14.984375 23.986328 A 1.0001 1.0001 0 0 0 14 25 L 14 28 A 1.0001 1.0001 0 1 0 16 28 L 16 25 A 1.0001 1.0001 0 0 0 14.984375 23.986328 z"/></svg>
          <input id="themeToggle" type="checkbox" onChange={toggleTheme} className="sr-only peer"/>
          <label className="
              relative h-2/3 w-2/3 cursor-pointer
              rounded-full bg-dark-accent-500 dark:bg-dark-main-500 px-[6%] transition-colors
              
              before:content-[''] before:absolute before:left-[5%] before:top-[10%]
              before:h-[82%] before:w-1/2 before:rounded-full before:bg-white
              before:transition-transform 
              
              peer-checked:before:translate-x-full peer-checked:before:left-[-5%]
              " htmlFor="themeToggle"><span className="sr-only">Enabled</span></label>
          <svg className="h-full w-1/4 text-light-accent-500" fill="currentcolor" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79Z"/></svg>
        </div>
      </div>
      {/*Mobile*/}
      <button
        id="sidebarToggle"
        onClick={toggleSidebar}
        className="block md:hidden text-main-900 dark:text-main-50"
        >
        <svg className="w-6 h-6" stroke="currentColor" fill="none">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
            />
        </svg>
      </button>
    </nav>
    <div
    className={`
        flex flex-col gap-4 px-4 py-3
        md:hidden
        fixed top-16 left-0 w-full
        z-30
        items-center justify-between
        px-4 py-4
        bg-light-surface text-light-main-900
        dark:bg-dark-main-900 dark:text-dark-main-400
        shadow-sm backdrop-blur-md
        ${sidebarOpen ? "block" : "hidden"}
      `}
    >
      <a href="#portfolio" className={`px-2 py-1 rounded-md transition-colors ${activeHash === "#portfolio" 
          ? "bg-light-main-300 dark:bg-dark-main-800 text-light-accent-600 dark:text-dark-accent-400 font-medium" 
          : "hover:text-light-accent-500 dark:hover:text-dark-accent-500 hover:bg-light-main-100 dark:hover:bg-dark-main-800"
          }`} onClick={linkClickSidebarCheck}>Projects</a>
      <a href="#about" className={`px-2 py-1 rounded-md transition-colors ${activeHash === "#about" 
          ? "bg-light-main-300 dark:bg-dark-main-800 text-light-accent-600 dark:text-dark-accent-400 font-medium" 
          : "hover:text-light-accent-500 dark:hover:text-dark-accent-500 hover:bg-light-main-100 dark:hover:bg-dark-main-800"
          }`} onClick={linkClickSidebarCheck}>About</a>
      <a href="#contact" className={`px-2 py-1 rounded-md transition-colors ${activeHash === "#contact" 
          ? "bg-light-main-300 dark:bg-dark-main-800 text-light-accent-600 dark:text-dark-accent-400 font-medium" 
          : "hover:text-light-accent-500 dark:hover:text-dark-accent-500 hover:bg-light-main-100 dark:hover:bg-dark-main-800"
          }`} onClick={linkClickSidebarCheck}>Contact</a>
    </div>
  </>
  );
}