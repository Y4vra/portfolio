import { useEffect, useState } from 'react';

export default function NavBar() {
  const [activeHash, setActiveHash] = useState("#start");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    setActiveHash(window.location.hash || '#start');
    const onHashChange = () => {
      setActiveHash(window.location.hash || '#start');
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
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

  return (
    <nav class={sidebarOpen?"open navBar":"closed navBar"}>
      <h1><a class="nav-link" href="#start">Y4vra</a></h1>
      <button id="sidebarToggle" onClick={toggleSidebar}></button>
      <a class={`nav-link ${activeHash === "#portfolio" ? "active button" : "button"}`} href="#portfolio">Projects</a>
      <a class={`nav-link ${activeHash === "#about" ? "active button" : "button"}`} href="#about">About</a>
      <a class={`nav-link ${activeHash === "#contact" ? "active button" : "button"}`} href="#contact">Contact</a>
    </nav>
  );
}