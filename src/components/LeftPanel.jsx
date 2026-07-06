import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check } from "lucide-react";
import profileImg from "../assets/img/profileoffficial.png";

// Lista de 12 tecnologías usando SVGs de alta calidad
const techs = [
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg", alt: "PHP" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg", alt: "Laravel" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg", alt: "Java" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", alt: "JavaScript" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", alt: "React" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg", alt: "MySQL" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", alt: "Postgres" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", alt: "Python" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", alt: "HTML" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", alt: "CSS" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", alt: "Git" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", alt: "GitHub", style: { filter: 'invert(var(--is-dark-mode, 0))' } }
];

const LeftPanel = () => {
    const { t } = useTranslation();
    const [isRevealed, setIsRevealed] = useState(false);
    const [showWave, setShowWave] = useState(false);
    const [hidePhoto, setHidePhoto] = useState(false);
    
    // Estados para enlaces sociales interactivos
    const [hoveredSocial, setHoveredSocial] = useState(null);
    const [copiedSocial, setCopiedSocial] = useState(null);
    const socialRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (socialRef.current && !socialRef.current.contains(event.target)) {
                setHoveredSocial(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    
    // Terminal typing effect
    const fullText = t('left.terminalGreeting');
    const [typedText, setTypedText] = useState("");

    useEffect(() => {
        if (isRevealed && !hidePhoto) {
            let currentText = "";
            let i = 0;
            const interval = setInterval(() => {
                currentText += fullText[i];
                setTypedText(currentText);
                i++;
                if (i >= fullText.length) clearInterval(interval);
            }, 120); // Velocidad de tipeo intermedia (ni muy rápida ni muy lenta)
            return () => clearInterval(interval);
        } else {
            setTypedText("");
        }
    }, [isRevealed, hidePhoto, fullText]);

    useEffect(() => {
        let waveTimer;
        let hideTimer;
        
        if (isRevealed) {
            waveTimer = setTimeout(() => {
                setShowWave(true);
            }, 20000);

            hideTimer = setTimeout(() => {
                setShowWave(false);
                setHidePhoto(true);
                
                setTimeout(() => {
                    setIsRevealed(false);
                    setHidePhoto(false);
                }, 1500);
            }, 24000);
        }

        return () => {
            clearTimeout(waveTimer);
            clearTimeout(hideTimer);
        };
    }, [isRevealed]);

    const scrollToSection = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="left-panel">
            <motion.div layout style={{ display: 'flex', flexDirection: 'column' }}>
                <motion.h1 layout style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '-0.025em' }}>
                    Ángel Herrera
                </motion.h1>
                <motion.h2 layout style={{ fontSize: '1.25rem', fontWeight: '500', color: 'var(--text-primary)', marginTop: '0.5rem' }}>
                    {t('left.role')}
                </motion.h2>
                <motion.div layout style={{ 
                    marginTop: 'clamp(0.5rem, 2vh, 1.5rem)', 
                    maxWidth: '320px',
                    padding: 'clamp(0.5rem, 2vh, 1rem)',
                    background: 'rgba(94, 234, 212, 0.05)',
                    borderLeft: '3px solid var(--accent)',
                    borderRadius: '4px 12px 12px 4px',
                }}>
                    <p style={{ margin: 0, fontSize: 'clamp(0.85rem, 1.5vh, 0.95rem)', lineHeight: '1.5', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                        {t('left.description')}
                    </p>
                    <p style={{ margin: 0, marginTop: '0.5rem', fontSize: '0.85rem', fontWeight: '600', textAlign: 'right', color: 'var(--text-primary)' }}>
                        — Ángel, 2026
                    </p>
                </motion.div>
                
                {/* Contenedor del Botón / Foto (Animado con alturas explícitas para evitar saltos) */}
                <motion.div layout style={{ flex: 1, minHeight: 0, marginTop: 'clamp(1rem, 3vh, 2.5rem)', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                    
                    {/* CONTENEDOR DEL BOTÓN */}
                    <motion.div
                        animate={{ 
                            height: isRevealed ? 0 : 'auto', 
                            opacity: isRevealed ? 0 : 1,
                            marginBottom: isRevealed ? 0 : '1rem'
                        }}
                        style={{ overflow: 'hidden', width: '100%', transform: 'translateZ(0px)' }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        <button
                            onClick={() => setIsRevealed(true)}
                            style={{
                                background: 'transparent',
                                border: '1px solid var(--accent)',
                                color: 'var(--accent)',
                                padding: '10px 24px',
                                borderRadius: '999px',
                                fontSize: '0.95rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'background 0.3s, color 0.3s',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'var(--accent)';
                                e.currentTarget.style.color = '#0f172a';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = 'var(--accent)';
                            }}
                        >
                            {t('left.getToKnowMe')}
                        </button>
                    </motion.div>

                    {/* CONTENEDOR DE LA FOTO, ÓRBITA Y TERMINAL */}
                    <motion.div
                        animate={{ 
                            // Cuando hidePhoto es true, encogemos la altura suavemente a la par que la foto desaparece
                            height: (isRevealed && !hidePhoto) ? 'auto' : 0, 
                            opacity: (isRevealed && !hidePhoto) ? 1 : 0,
                            marginBottom: (isRevealed && !hidePhoto) ? '2rem' : 0
                        }}
                        style={{ 
                            overflow: (isRevealed && !hidePhoto) ? 'visible' : 'hidden', 
                            display: 'flex', 
                            flexDirection: 'column' 
                        }}
                        transition={{ duration: 0.8, ease: "easeInOut" }} // Misma duración que la animación de salida de la foto
                    >
                        <AnimatePresence>
                            {!hidePhoto && isRevealed && (
                                <motion.div
                                    key="photo-container"
                                    initial={{ scale: 0, rotateY: 180 }}
                                    animate={{ scale: 1, rotateY: 0 }}
                                    exit={{ scale: 0, rotateY: 360, opacity: 0 }}
                                    transition={{ 
                                        type: "spring", 
                                        stiffness: 60, 
                                        damping: 15,
                                        duration: 0.8
                                    }}
                                    style={{ 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        alignItems: 'center', 
                                        gap: '1rem',
                                        position: 'relative'
                                    }}
                                >
                                    {/* CONTENEDOR ESPECÍFICO DE LA FOTO Y 3D */}
                                    <div style={{
                                        position: 'relative', 
                                        width: 'clamp(180px, 35vh, 320px)', 
                                        height: 'clamp(180px, 35vh, 320px)',
                                        perspective: '1200px', // Habilita profundidad 3D
                                        transformStyle: 'preserve-3d'
                                    }}>
                                        <img 
                                            src={profileImg} 
                                            alt="Angel Profile"  
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                flexShrink: 0,
                                                objectFit: 'cover',
                                                borderRadius: '50%',
                                                border: '2px solid var(--accent)',
                                                boxShadow: '0 0 20px rgba(94, 234, 212, 0.2)',
                                                transform: 'translateZ(0px)',
                                                position: 'relative',
                                            }}
                                        />
                                        
                                        {/* ÓRBITA 3D DIAGONAL (Pasan por delante y por detrás) */}
                                        <div style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            marginTop: 'clamp(60px, 12vh, 110px)', 
                                            transformStyle: 'preserve-3d',
                                            transform: 'rotateX(5deg)',
                                            pointerEvents: 'none'
                                        }}>
                                            <motion.div
                                                // Giramos de 360 a 0 para que vengan de la derecha, pasen por el frente y vayan a la izquierda
                                                animate={{ rotateY: [360, 0] }}
                                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                                style={{ transformStyle: 'preserve-3d' }}
                                            >
                                                {techs.map((tech, i) => {
                                                    const angle = (i / techs.length) * 360;
                                                    return (
                                                        <div
                                                            key={tech.alt}
                                                            style={{
                                                                position: 'absolute',
                                                                transform: `rotateY(${angle}deg) translateZ(clamp(130px, 25vh, 230px))`,
                                                                transformStyle: 'preserve-3d'
                                                            }}
                                                        >
                                                            {/* Contra-rotación exacta para que los iconos siempre miren a la cámara */}
                                                            <motion.div
                                                                animate={{ rotateY: [-360, 0] }}
                                                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                                                style={{ 
                                                                    width: '45px', 
                                                                    height: '45px',
                                                                    marginLeft: '-22.5px',
                                                                    marginTop: '-22.5px',
                                                                    transformStyle: 'preserve-3d',
                                                                    transform: `rotateY(${-angle}deg) rotateX(-5deg)` 
                                                                }}
                                                            >
                                                                <img 
                                                                    src={tech.src} 
                                                                    alt={tech.alt}
                                                                    style={{
                                                                        width: '100%',
                                                                        height: '100%',
                                                                        objectFit: 'contain',
                                                                        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.6))',
                                                                        ...(tech.style || {})
                                                                    }}
                                                                />
                                                            </motion.div>
                                                        </div>
                                                    );
                                                })}
                                            </motion.div>
                                        </div>

                                        <AnimatePresence>
                                            {showWave && (
                                                <motion.div
                                                    initial={{ scale: 0, opacity: 0, rotate: -30 }}
                                                    animate={{ 
                                                        scale: 1, 
                                                        opacity: 1, 
                                                        rotate: [0, 20, -20, 20, 0]
                                                    }}
                                                    exit={{ scale: 0, opacity: 0 }}
                                                    transition={{ 
                                                        duration: 0.5,
                                                        rotate: {
                                                            repeat: Infinity,
                                                            duration: 1,
                                                            ease: "easeInOut"
                                                        }
                                                    }}
                                                    style={{
                                                        position: 'absolute',
                                                        top: '-15px',
                                                        right: '-15px',
                                                        fontSize: '3.5rem',
                                                        zIndex: 10,
                                                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                                                        transform: 'translateZ(10px)'
                                                    }}
                                                >
                                                    👋
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* CONSOLA DE COMANDO (Escribiendo en tiempo real) */}
                                    <div style={{
                                        background: 'rgba(15, 23, 42, 0.9)',
                                        border: '1px solid var(--accent)',
                                        padding: '0 16px',
                                        borderRadius: '8px',
                                        color: '#a6e22e',
                                        fontFamily: 'monospace',
                                        fontSize: '0.85rem',
                                        width: '320px',
                                        height: '45px',
                                        boxSizing: 'border-box',
                                        display: 'flex',
                                        alignItems: 'center',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                                        marginTop: '1rem' // Separación adicional para el 3D
                                    }}>
                                        <span style={{ color: '#f92672' }}>~</span>&nbsp;<span style={{ color: '#66d9ef' }}>echo</span>&nbsp;&nbsp;<span>"{typedText}"</span>
                                        <motion.span 
                                            animate={{ opacity: [1, 0, 1] }} 
                                            transition={{ repeat: Infinity, duration: 0.8 }}
                                        >_</motion.span>
                                    </div>
                                    
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>

                <motion.nav layout style={{ 
                    display: 'flex', 
                    flexDirection: isRevealed ? 'row' : 'column', 
                    flexWrap: 'wrap',
                    gap: isRevealed ? '1rem' : '1.5rem', 
                    marginTop: '1rem' 
                }}>
                    <motion.a layout href="#about" onClick={(e) => scrollToSection(e, 'about')} className="nav-link" style={{ whiteSpace: 'nowrap' }}>
                        <motion.span layout className="line"></motion.span>
                        <motion.span layout>{t('left.menu.about')}</motion.span>
                    </motion.a>
                    <motion.a layout href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className="nav-link" style={{ whiteSpace: 'nowrap' }}>
                        <motion.span layout className="line"></motion.span>
                        <motion.span layout>{t('left.menu.experience')}</motion.span>
                    </motion.a>
                    <motion.a layout href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="nav-link" style={{ whiteSpace: 'nowrap' }}>
                        <motion.span layout className="line"></motion.span>
                        <motion.span layout>{t('left.menu.projects')}</motion.span>
                    </motion.a>
                    <motion.a layout href="#education" onClick={(e) => scrollToSection(e, 'education')} className="nav-link" style={{ whiteSpace: 'nowrap' }}>
                        <motion.span layout className="line"></motion.span>
                        <motion.span layout>{t('left.menu.education')}</motion.span>
                    </motion.a>
                    <motion.a layout href="#location" onClick={(e) => scrollToSection(e, 'location')} className="nav-link" style={{ whiteSpace: 'nowrap' }}>
                        <motion.span layout className="line"></motion.span>
                        <motion.span layout>{t('left.menu.location')}</motion.span>
                    </motion.a>
                </motion.nav>
            </motion.div>

            {/* ENLACES SOCIALES INTERACTIVOS */}
            <motion.div ref={socialRef} layout style={{ 
                display: 'flex', 
                gap: '1.5rem', 
                marginTop: isRevealed ? '1.5rem' : '2.5rem', 
                position: 'relative' 
            }}>
                {(() => {
                    const socialsData = [
                        { id: 'github', url: 'https://github.com/DevDangel', iconClass: 'fa-brands fa-github' },
                        { id: 'linkedin', url: 'https://www.linkedin.com/in/dev-angel/', iconClass: 'fa-brands fa-linkedin' },
                        { id: 'mail', display: 'angeldavidh18@gmail.com', value: 'angeldavidh18@gmail.com', url: '#', iconClass: 'fa-solid fa-envelope' },
                        { id: 'whatsapp', display: '+57 301 6755558', value: '+573016755558', url: 'https://wa.link/7p2zmo', iconClass: 'fa-brands fa-whatsapp' }
                    ];

                    return (
                        <>
                            {socialsData.map((social) => (
                                <a 
                                    key={social.id}
                                    href={social.url}
                                    target={social.id !== 'mail' ? "_blank" : undefined}
                                    rel={social.id !== 'mail' ? "noreferrer" : undefined}
                                    onClick={(e) => {
                                        if (social.id === 'mail') {
                                            e.preventDefault();
                                            navigator.clipboard.writeText(social.value);
                                            setCopiedSocial(social.id);
                                            setTimeout(() => setCopiedSocial(null), 2000);
                                        }
                                    }}
                                    style={{ color: 'var(--text-secondary)', transition: 'color 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = 'var(--text-primary)';
                                        if (social.id === 'github' || social.id === 'linkedin') {
                                            setHoveredSocial(null);
                                        } else {
                                            setHoveredSocial(social.id);
                                        }
                                    }} 
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = 'var(--text-secondary)';
                                    }}
                                >
                                    <i className={social.iconClass} style={{ fontSize: '24px' }}></i>
                                </a>
                            ))}

                            {/* Ventana de información fija */}
                            <AnimatePresence>
                                {hoveredSocial && hoveredSocial !== 'github' && hoveredSocial !== 'linkedin' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -5, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        style={{
                                            position: 'absolute',
                                            top: '100%',
                                            left: 0,
                                            marginTop: '0.75rem',
                                            background: 'var(--nav-bg)',
                                            border: '1px solid var(--accent)',
                                            padding: '6px 12px',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                                            zIndex: 20
                                        }}
                                    >
                                        <span style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: '500', whiteSpace: 'nowrap' }}>
                                            {socialsData.find(s => s.id === hoveredSocial)?.display}
                                        </span>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                const value = socialsData.find(s => s.id === hoveredSocial)?.value;
                                                navigator.clipboard.writeText(value);
                                                setCopiedSocial(hoveredSocial);
                                                setTimeout(() => setCopiedSocial(null), 2000);
                                            }}
                                            style={{
                                                background: 'var(--bg-color)',
                                                border: '1px solid var(--border-color)',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: copiedSocial === hoveredSocial ? '#a6e22e' : 'var(--text-secondary)',
                                                padding: '4px',
                                                borderRadius: '6px',
                                                transition: 'background 0.2s, color 0.2s'
                                            }}
                                            onMouseEnter={(e) => {
                                                if (copiedSocial !== hoveredSocial) {
                                                    e.currentTarget.style.color = 'var(--accent)';
                                                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (copiedSocial !== hoveredSocial) {
                                                    e.currentTarget.style.color = 'var(--text-secondary)';
                                                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                                                }
                                            }}
                                        >
                                            {copiedSocial === hoveredSocial ? <Check size={14} /> : <Copy size={14} />}
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </>
                    );
                })()}
            </motion.div>
        </header>
    );
};

export default LeftPanel;
