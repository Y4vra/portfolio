import React, { useState, useRef, useEffect } from 'react';

const ProjectCarousel = ({ projects }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const carouselRef = useRef(null);
    const [cardsPerView, setCardsPerView] = useState(3);

    useEffect(() => {
        const updateCardsPerView = () => {
            setCardsPerView(window.innerWidth < 768 ? 1 : 3)
        };
        updateCardsPerView();
        window.addEventListener('resize', updateCardsPerView);
        return () => window.removeEventListener('resize', updateCardsPerView);
    }, []);

    const maxIndex = Math.max(0, projects.length - cardsPerView);

    const goToNext = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    };

    const goToPrev = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
        const walk = (startX - x) / 100;
        
        if (Math.abs(walk) > 0.5) {
            if (walk > 0) goToNext();
            else goToPrev();
            setIsDragging(false);
        }
    };

    const handleMouseUp = () => setIsDragging(false);

    const handleTouchStart = (e) => setStartX(e.touches[0].clientX);

    const handleTouchMove = (e) => {
        if (!startX) return;
        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) goToNext();
            else goToPrev();
            setStartX(0);
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto relative px-4">
            {/* Botones de navegación */}
            <button
                onClick={goToPrev}
                disabled={currentIndex === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-3 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition-all"
                aria-label="Previous"
            >
                <svg className="w-6 h-6 text-gray-800 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={goToNext}
                disabled={currentIndex >= maxIndex}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-3 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition-all"
                aria-label="Next"
            >
                <svg className="w-6 h-6 text-gray-800 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Contenedor del Carrusel */}
            <div
                ref={carouselRef}
                /* py-4 es clave para que la sombra no se corte arriba/abajo */
                className="overflow-hidden cursor-grab active:cursor-grabbing mx-12 py-6"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={() => setStartX(0)}
            >
                <div
                    className="flex transition-transform duration-300 ease-out"
                    style={{
                        transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
                    }}
                >
                    {projects.map((project) => (
                        <article
                            key={project.id}
                            className="flex-shrink-0 px-3 md:px-5"
                            style={{ width: `${100 / cardsPerView}%` }}
                        >
                            {/* He mejorado el shadow a shadow-xl para que sea más notable */}
                            <div className="bg-light-main-200 dark:bg-dark-main-900 rounded-xl shadow-xl dark:shadow-black/50 overflow-hidden h-full flex flex-col transform transition-transform hover:-translate-y-1">
                                <div className="aspect-video w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h2 className="text-xl font-bold mb-2">{project.title}</h2>
                                    <p className="mb-4 flex-grow text-sm opacity-90">
                                        {project.description}
                                    </p>
                                    <a
                                        href={project.link}
                                        className="inline-block py-2 px-6 rounded-lg text-center bg-light-main-100 dark:bg-dark-main-700 text-light-main-800 dark:text-dark-main-50 hover:bg-light-accent-500 dark:hover:bg-dark-accent-400 hover:text-white transition-all shadow-sm"
                                    >
                                        More...
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            {/* Indicadores */}
            <div className="flex justify-center gap-2 mt-2">
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                            index === currentIndex
                                ? 'bg-light-accent-500 w-4'
                                : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProjectCarousel;