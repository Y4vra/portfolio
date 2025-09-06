import { useEffect, useState } from 'react';

export default function NavBar() {
  const [activeHash, setActiveHash] = useState("#start");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const onHashChange = () => {
      setActiveHash(window.location.hash || '#start');
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <nav class="navBar">
      <h1><a class="nav-link" href="#start">Y4vra</a></h1>
      <a class={`nav-link ${activeHash === "#portfolio" ? "active button" : "button"}`} href="#portfolio">Projects</a>
      <a class={`nav-link ${activeHash === "#about" ? "active button" : "button"}`} href="#about">About</a>
      <a class={`nav-link ${activeHash === "#contact" ? "active button" : "button"}`} href="#contact">Contact</a>
    </nav>
  );
}