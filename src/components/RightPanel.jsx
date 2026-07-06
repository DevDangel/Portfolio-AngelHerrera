import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Globe as GlobeIcon, X, ExternalLink, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Globe from "./Globe";

// Import images
import pdashImg from "../assets/img/project/pdash.png";
import gestionEmpleadosImg from "../assets/img/project/gestion_empleados.png";
import gestionDocumentalImg from "../assets/img/project/gestion_documental.png";
import contratosImg from "../assets/img/project/contratos.png";
import certificadosLaboralesImg from "../assets/img/project/certificados_laborales.png";
import permisosEmpleadosImg from "../assets/img/project/permisos_empleados.png";
import renunciaImg from "../assets/img/project/renuncia.png";
import firmaDigitalImg from "../assets/img/project/firma_digital.png";
import javaImg from "../assets/img/java.jpg";
import jsImg from "../assets/img/js.jpg";
const RightPanel = () => {
    const { t } = useTranslation();
    const [isProjectHovered, setIsProjectHovered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeModalTab, setActiveModalTab] = useState('gestion_empleados');
    const [certImage, setCertImage] = useState(null);

    const modalTabs = [
        { id: 'gestion_empleados', img: gestionEmpleadosImg },
        { id: 'gestion_documental', img: gestionDocumentalImg },
        { id: 'contratos', img: contratosImg },
        { id: 'certificados_laborales', img: certificadosLaboralesImg },
        { id: 'permisos_empleados', img: permisosEmpleadosImg },
        { id: 'renuncia', img: renunciaImg },
        { id: 'firma_digital', img: firmaDigitalImg }
    ];

    return (
        <main className="right-panel">
            
            <section id="about" style={{ marginBottom: '6rem', scrollMarginTop: '100px' }}>
                <p dangerouslySetInnerHTML={{ __html: t('right.about.p1') }}></p>
                <p style={{ marginTop: '1rem' }}>{t('right.about.p2')}</p>
                <p style={{ marginTop: '1rem' }}>{t('right.about.p3')}</p>
            </section>

            <section id="experience" style={{ marginBottom: '6rem', scrollMarginTop: '100px' }}>
                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', marginBottom: '2rem', fontWeight: 'bold' }}>{t('right.sectionExperience')}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '1rem' }}>
                        <header style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase' }}>
                            {t('right.experience.job1.date')}
                        </header>
                        <div>
                            <h3 style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>
                                {t('right.experience.job1.title')} 
                                <span style={{ color: 'var(--accent)' }}>
                                    {' · '}
                                    <a 
                                        href={t('right.experience.job1.url')} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        style={{ color: 'inherit', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }} 
                                        onMouseEnter={(e) => e.target.style.textDecoration='underline'} 
                                        onMouseLeave={(e) => e.target.style.textDecoration='none'}
                                    >
                                        {t('right.experience.job1.company')}
                                        <GlobeIcon size={18} style={{ marginTop: '-2px', strokeWidth: 2.5 }} />
                                    </a>
                                </span>
                            </h3>
                            <p style={{ marginTop: '0.75rem', lineHeight: '1.6' }}>
                                {t('right.experience.job1.description')}
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                                {['React', 'Laravel', 'PHP', 'MySQL', 'JavaScript','Git'].map((tech) => (
                                    <span key={tech} style={{ color: 'var(--accent)', background: 'rgba(94, 234, 212, 0.1)', padding: '4px 12px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '500' }}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section id="projects" style={{ marginBottom: '6rem', scrollMarginTop: '100px' }}>
                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', marginBottom: '2rem', fontWeight: 'bold' }}>{t('right.sectionProjects')}</h2>
                
                <motion.div 
                    onMouseEnter={() => setIsProjectHovered(true)}
                    onMouseLeave={() => setIsProjectHovered(false)}
                    style={{
                        position: 'relative',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        background: 'var(--nav-bg)',
                        border: '1px solid var(--border-color)'
                    }}
                    animate={{ height: isProjectHovered ? 'auto' : '220px' }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                    {/* Contenedor de la imagen */}
                    <div style={{ position: 'relative', height: '220px', width: '100%' }}>
                        <img 
                            src={pdashImg} 
                            alt="RH Solution" 
                            style={{ 
                                width: '100%', 
                                height: '100%', 
                                objectFit: 'cover',
                                filter: isProjectHovered ? 'none' : 'blur(5px) brightness(0.6)',
                                transition: 'filter 0.4s ease'
                            }} 
                        />
                        {!isProjectHovered && (
                            <motion.div 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }}
                                style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}
                            >
                                <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold', textShadow: '0 2px 10px rgba(0,0,0,0.8)', textAlign: 'center', padding: '0 1.5rem' }}>
                                    {t('right.projects.rhsolutions.title')}
                                </h3>
                            </motion.div>
                        )}
                    </div>

                    {/* Contenido expandible */}
                    <AnimatePresence>
                        {isProjectHovered && (
                            <motion.div 
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color)' }}
                            >
                                <h3 style={{ color: 'var(--text-primary)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                                    {t('right.projects.rhsolutions.title')}
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1rem' }}>
                                    {t('right.projects.rhsolutions.description')}
                                </p>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                    {['Laravel', 'JavaScript', 'HTML', 'CSS', 'Bootstrap', 'SQL', 'Git'].map((tech) => (
                                        <span key={tech} style={{ color: 'var(--accent)', background: 'rgba(94, 234, 212, 0.1)', padding: '4px 12px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '500' }}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <a 
                                        href="https://rhsolutions.proyectoscampus.top/login" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            padding: '0.5rem 1rem',
                                            background: 'var(--accent)',
                                            color: '#0f172a',
                                            borderRadius: '6px',
                                            fontWeight: '600',
                                            textDecoration: 'none',
                                            transition: 'transform 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                    >
                                        <GlobeIcon size={18} />
                                        {t('right.projects.rhsolutions.visit')}
                                    </a>
                                    
                                    <button 
                                        onClick={() => setIsModalOpen(true)}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            padding: '0.5rem 1rem',
                                            background: 'transparent',
                                            color: 'var(--text-primary)',
                                            border: '1px solid var(--text-secondary)',
                                            borderRadius: '6px',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                            e.currentTarget.style.borderColor = 'var(--text-primary)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.borderColor = 'var(--text-secondary)';
                                        }}
                                    >
                                        {t('right.projects.rhsolutions.moreInfo')}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </section>

            <section id="education" style={{ marginBottom: '6rem', scrollMarginTop: '100px' }}>
                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', marginBottom: '2rem', fontWeight: 'bold' }}>{t('right.sectionEducation')}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '1rem' }}>
                        <header style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', paddingTop: '0.2rem' }}>
                            {t('right.education.edu1.date')}
                        </header>
                        <div>
                            <h3 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: '600' }}>
                                {t('right.education.edu1.degree')} 
                                <span style={{ color: 'var(--accent)' }}>
                                    {' · '}
                                    {t('right.education.edu1.institution')}
                                </span>
                            </h3>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '1rem' }}>
                        <header style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', paddingTop: '0.2rem' }}>
                            {t('right.education.edu2.date')}
                        </header>
                        <div>
                            <h3 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: '600' }}>
                                {t('right.education.edu2.degree')} 
                                <span style={{ color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginLeft: '0.5rem' }}>
                                    {' · '}
                                    {t('right.education.edu2.institution')}
                                    <button 
                                        onClick={() => setCertImage(javaImg)}
                                        style={{ background: 'transparent', border: 'none', color: 'var(--accent)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}
                                        title="Ver certificado"
                                    >
                                        <ExternalLink size={14} />
                                    </button>
                                </span>
                            </h3>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '1rem' }}>
                        <header style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', paddingTop: '0.2rem' }}>
                            {t('right.education.edu3.date')}
                        </header>
                        <div>
                            <h3 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: '600' }}>
                                {t('right.education.edu3.degree')} 
                                <span style={{ color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginLeft: '0.5rem' }}>
                                    {' · '}
                                    {t('right.education.edu3.institution')}
                                    <button 
                                        onClick={() => setCertImage(jsImg)}
                                        style={{ background: 'transparent', border: 'none', color: 'var(--accent)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}
                                        title="Ver certificado"
                                    >
                                        <ExternalLink size={14} />
                                    </button>
                                </span>
                            </h3>
                        </div>
                    </div>

                </div>
            </section>

            <section id="location" style={{ marginBottom: '6rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', scrollMarginTop: '100px' }}>
                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', marginBottom: '0', fontWeight: 'bold', width: '100%', textAlign: 'left', zIndex: 10, position: 'relative' }}>
                    {t('right.sectionLocation')}
                </h2>
                
                <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', marginTop: '-1.5rem' }}>
                    <Globe />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '-1.5rem', alignSelf: 'flex-start', color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: '600', zIndex: 10, position: 'relative' }}>
                    <MapPin size={24} color="#fb3f38" />
                    {t('right.location.country')} - {t('right.location.city')}
                </div>
            </section>


            {/* Modal de Detalles del Proyecto */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 9999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(0,0,0,0.8)',
                            backdropFilter: 'blur(5px)'
                        }}
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                width: '90%',
                                maxWidth: '1200px',
                                height: '80vh',
                                background: 'var(--bg-primary)',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                border: '1px solid rgba(255,255,255,0.1)',
                                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
                            }}
                        >
                            {/* Cabecera Modal */}
                            <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>
                                    {t('right.projects.rhsolutions.title')}
                                </h3>
                                <button 
                                    onClick={() => setIsModalOpen(false)}
                                    style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Cuerpo Modal */}
                            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                                {/* Sidebar */}
                                <div style={{ width: '250px', borderRight: '1px solid rgba(255,255,255,0.1)', overflowY: 'auto', padding: '1rem', background: 'rgba(0,0,0,0.2)' }}>
                                    {modalTabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveModalTab(tab.id)}
                                            style={{
                                                display: 'block',
                                                width: '100%',
                                                textAlign: 'left',
                                                padding: '0.75rem 1rem',
                                                marginBottom: '0.5rem',
                                                borderRadius: '8px',
                                                background: activeModalTab === tab.id ? 'rgba(94, 234, 212, 0.1)' : 'transparent',
                                                color: activeModalTab === tab.id ? 'var(--accent)' : 'var(--text-secondary)',
                                                border: 'none',
                                                cursor: 'pointer',
                                                fontWeight: activeModalTab === tab.id ? '600' : '400',
                                                transition: 'all 0.2s'
                                            }}
                                            onMouseEnter={(e) => {
                                                if (activeModalTab !== tab.id) e.currentTarget.style.color = 'var(--text-primary)';
                                            }}
                                            onMouseLeave={(e) => {
                                                if (activeModalTab !== tab.id) e.currentTarget.style.color = 'var(--text-secondary)';
                                            }}
                                        >
                                            {t(`right.projects.rhsolutions.modalTabs.${tab.id}`)}
                                        </button>
                                    ))}
                                </div>
                                
                                {/* Contenido Imagen */}
                                <div style={{ flex: 1, padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-secondary)', position: 'relative' }}>
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={activeModalTab}
                                            src={modalTabs.find(t => t.id === activeModalTab)?.img}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}
                                            alt={t(`right.projects.rhsolutions.modalTabs.${activeModalTab}`)}
                                        />
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal de Certificados Sencillo */}
            <AnimatePresence>
                {certImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 99999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(0,0,0,0.85)',
                            backdropFilter: 'blur(5px)',
                            padding: '2rem'
                        }}
                        onClick={() => setCertImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            style={{ position: 'relative', maxWidth: '900px', width: '100%' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setCertImage(null)}
                                style={{
                                    position: 'absolute',
                                    top: '-40px',
                                    right: '0',
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--text-primary)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '5px',
                                    borderRadius: '50%',
                                    transition: 'background 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                                <X size={24} />
                            </button>
                            <img src={certImage} alt="Certificado" style={{ width: '100%', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </main>
    );
};

export default RightPanel;
