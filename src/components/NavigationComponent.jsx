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

  return (
    <nav class={sidebarOpen?"open navBar":"closed navBar"}>
      <h1><a class="nav-link" href="#start">Y4vra</a></h1>
      <button id="sidebarToggle" onClick={toggleSidebar}></button>
      <a onClick={linkClickSidebarCheck} class={`nav-link ${activeHash === "#portfolio" ? "active button" : "button"}`} href="#portfolio">Projects</a>
      <a onClick={linkClickSidebarCheck} class={`nav-link ${activeHash === "#about" ? "active button" : "button"}`} href="#about">About</a>
      <a onClick={linkClickSidebarCheck} class={`nav-link ${activeHash === "#contact" ? "active button" : "button"}`} href="#contact">Contact</a>
    </nav>
  );
}