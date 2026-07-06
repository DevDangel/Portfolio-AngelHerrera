import React, { useState, useEffect, useRef } from "react";
import { Moon, Sun, Download, Mail, Globe, Copy, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

const TopNavbar = () => {
    const [isDark, setIsDark] = useState(true);
    const [hoveredSocial, setHoveredSocial] = useState(null);
    const [copiedSocial, setCopiedSocial] = useState(null);
    const socialRef = useRef(null);
    const { t, i18n } = useTranslation();

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

    useEffect(() => {
        if (isDark) {
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.body.setAttribute('data-theme', 'light');
        }
    }, [isDark]);

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language.startsWith('es') ? 'en' : 'es');
    };

    return (
        <header style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '70px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 5%',
            boxSizing: 'border-box',
            background: 'var(--nav-bg)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--border-color)',
            zIndex: 50,
            transition: 'background 0.3s ease, border-color 0.3s ease'
        }}>
            <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: '800',
                fontSize: '1.2rem',
                color: 'var(--text-primary)',
                letterSpacing: '-0.5px'
            }}>
                <span style={{ color: 'var(--accent)' }}>&lt;</span>
                Ángel.dev 
                <span style={{ color: 'var(--accent)' }}> /&gt;</span>
            </div>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                flexWrap: 'nowrap'
            }}>
                <button 
                    onClick={toggleLanguage}
                    style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--text-secondary)',
                    background: 'none',
                    border: 'none',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                }}>
                    <Globe size={16} />
                    {i18n.language.startsWith('es') ? 'EN' : 'ES'}
                </button>

                <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }}></div>

                <a 
                    href="/cv/index.html" 
                    target="_blank" 
                    rel="noreferrer"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                >
                    <Download size={16} />
                    <span>{t('nav.cv')}</span>
                </a>

                <div ref={socialRef} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', position: 'relative' }}>
                    {(() => {
                        const socialsData = [
                            { id: 'github', url: 'https://github.com/DevDangel', icon: <i className="fa-brands fa-github" style={{ fontSize: '18px' }}></i> },
                            { id: 'linkedin', url: 'https://www.linkedin.com/in/dev-angel/', icon: <i className="fa-brands fa-linkedin" style={{ fontSize: '18px' }}></i> },
                            { id: 'mail', display: 'angeldavidh18@gmail.com', value: 'angeldavidh18@gmail.com', url: '#', icon: <Mail size={18} /> },
                            { id: 'whatsapp', display: '+57 301 6755558', value: '+573016755558', url: 'https://wa.link/7p2zmo', icon: <i className="fa-brands fa-whatsapp" style={{ fontSize: '18px' }}></i> }
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
                                        style={{ color: 'var(--text-secondary)', transition: 'color 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
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
                                        {social.icon}
                                    </a>
                                ))}

                                {/* Ventana de información fija */}
                                <AnimatePresence>
                                    {hoveredSocial && hoveredSocial !== 'github' && hoveredSocial !== 'linkedin' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -5, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -2, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            style={{
                                                position: 'absolute',
                                                top: '100%',
                                                right: 0, // Alinear a la derecha para que no se desborde la pantalla
                                                marginTop: '1rem',
                                                background: 'var(--nav-bg)',
                                                border: '1px solid var(--accent)',
                                                padding: '6px 12px',
                                                borderRadius: '8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                                                zIndex: 100
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
                </div>

                <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }}></div>

                <button 
                    onClick={() => setIsDark(!isDark)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '36px',
                        height: '36px',
                        color: 'var(--accent)',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        transition: 'transform 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </div>
        </header>
    );
};

export default TopNavbar;
