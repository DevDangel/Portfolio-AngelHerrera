import React, { useEffect, useRef, useState } from 'react';
import GlobeGl from 'react-globe.gl';
import * as THREE from 'three';

const Globe = () => {
    const globeRef = useRef();
    const [countries, setCountries] = useState({ features: [] });
    const [isDarkMode, setIsDarkMode] = useState(
        document.body.getAttribute('data-theme') !== 'light'
    );

    useEffect(() => {
        // Cargar los datos matemáticos del mapa para construir los puntos de neón
        fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
            .then(res => res.json())
            .then(data => setCountries(data));

        // Observador para detectar cuando el usuario cambia el tema (modo claro/oscuro)
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    const theme = document.body.getAttribute('data-theme');
                    setIsDarkMode(theme !== 'light');
                }
            });
        });

        observer.observe(document.body, { attributes: true });

        // Configuramos la rotación automática al cargar
        if (globeRef.current) {
            globeRef.current.controls().autoRotate = true;
            globeRef.current.controls().autoRotateSpeed = 3.0; 
            globeRef.current.controls().enableZoom = false; 
        }

        return () => observer.disconnect();
    }, []);

    // Material plano sin sombras para que el núcleo del planeta se fusione con el fondo CSS
    const globeMaterial = new THREE.MeshBasicMaterial({
        color: isDarkMode ? '#0f172a' : '#f8fafc',
    });

    // SVG idéntico al MapPin de lucide-react para inyectarlo en el globo 3D
    const markerSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="rgba(251,63,56,0.4)" stroke="#fb3f38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>`;

    // Función que crea el elemento HTML que se pegará a la esfera 3D
    const htmlElement = () => {
        const el = document.createElement('div');
        el.className = 'pulse-marker-container';
        el.innerHTML = `
            <div class="pulse-dot"></div>
            ${markerSvg}
        `;
        return el;
    };

    return (
        <div style={{ position: 'relative', width: '400px', height: '400px', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'grab' }}>
            <GlobeGl
                ref={globeRef}
                width={400}
                height={400}
                showGlobe={true}
                globeMaterial={globeMaterial}
                backgroundColor="rgba(0,0,0,0)" 
                showAtmosphere={true}
                atmosphereColor={isDarkMode ? '#5eead4' : '#0d9488'}
                atmosphereAltitude={0.15}
                hexPolygonsData={countries.features}
                hexPolygonResolution={3}
                hexPolygonMargin={0.3}
                hexPolygonColor={() => isDarkMode ? '#5eead4' : '#0d9488'}
                htmlElementsData={[{ lat: 4.4388, lng: -75.2322 }]} 
                htmlElement={htmlElement}
            />

            {/* Estilos para el pin y la animación de radar */}
            <style>
                {`
                .pulse-marker-container {
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: flex-end;
                    width: 24px;
                    height: 24px;
                    transform: translate(-50%, -100%);
                    pointer-events: none;
                }
                .pulse-dot {
                    position: absolute;
                    bottom: -3px; /* Centro de la base del pin */
                    width: 12px;
                    height: 12px;
                    background-color: #fb3f38;
                    border-radius: 50%;
                    animation: pulseAnimation 2s infinite ease-in-out;
                    z-index: -1;
                }
                @keyframes pulseAnimation {
                    0% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(2.5); opacity: 0; }
                    100% { transform: scale(1); opacity: 0.8; }
                }
                `}
            </style>
        </div>
    );
};

export default Globe;
