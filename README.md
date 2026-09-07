# Portfolio & Interactive CV

[![Live Demo](https://img.shields.io/badge/Live_Demo-portfolio--devangel.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://portfolio-devangel.vercel.app/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-dev--angel-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dev-angel/)
[![GitHub](https://img.shields.io/badge/GitHub-DevDangel-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/DevDangel)

---

[![React](https://img.shields.io/badge/React-19.1.0-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.185.1-049EF4?style=flat-square&logo=three.js&logoColor=white)](https://threejs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.42.2-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![i18next](https://img.shields.io/badge/i18next-26.3.4-26A69A?style=flat-square&logo=i18next&logoColor=white)](https://www.i18next.com/)
[![Python](https://img.shields.io/badge/Python_Utilities-3.10+-3776AB?style=flat-square&logo=python&logoColor=white)](https://www.python.org/)

Plataforma web interactiva desarrollada para la presentación profesional, trayectoria laboral, proyectos de ingeniería y currículum vitae de **Ángel David Herrera Acevedo**, Desarrollador Fullstack.

El proyecto está diseñado bajo estándares modernos de experiencia de usuario (UX), combinando renderizado tridimensional acelerado por GPU, animaciones declarativas, soporte multiidioma y herramientas internas de procesamiento de activos.

---

## Aspectos Destacados de Arquitectura

- **Visualización Espacial 3D (WebGL / Three.js):** Integración de un globo terráqueo tridimensional (`react-globe.gl` y `three`) con soporte para geolocalización interactiva, marcadores orbitales y texturas optimizadas para rendimiento fluido a 60 FPS.
- **Diseño Split-Panel Responsivo:** Arquitectura de doble panel (estático/navegacional a la izquierda y exploratorio dinámico a la derecha) con transiciones suaves basadas en `framer-motion`.
- **Internacionalización Nativa (i18n):** Sistema de traducción dinámico en tiempo real (`react-i18next`) con soporte para Español e Inglés, estructurado en esquemas desacoplados (`src/locales/`).
- **Visor y Descarga de Curriculum Vitae:** Módulo integrado para visualización de CV interactivo y descarga directa de documento certificado en PDF.
- **Pipeline Interno de Optimización de Activos:** Módulo utilitario en Python (`build-img/`) para reducción algorítmica de imágenes a límites estandarizados (<= 2 MB) preservando fidelidad visual completa y canales alfa RGBA.

---

## Matriz de Tecnologías

| Dominio | Tecnología / Herramienta | Versión | Propósito |
|---|---|---|---|
| **Core Frontend** | React | 19.1.0 | Arquitectura de componentes e interfaces reactivas |
| **Tooling & Bundler** | Vite | 6.3.5 | Entorno de desarrollo de alta velocidad y compilación optimizada |
| **Renderizado 3D** | Three.js / React-Globe.gl | 0.185.1 | Renderizado de visualización esférica interactiva con WebGL |
| **Animaciones & UX** | Framer Motion | 12.42.2 | Transiciones de estado, efectos hover y layout animations |
| **Internacionalización** | i18next / React-i18next | 26.3.4 | Gestión de localización y conmutación de idiomas en caliente |
| **Iconografía & Tipografía** | FontAwesome / Lucide / Lato | 6.7.2 | Sistema de diseño, fuentes web locales e iconografía vectorial |
| **Procesamiento de Imágenes** | Python / Pillow | 3.10+ / 12.3+ | Scripting automatizado para compresión Lanczos y zlib |
| **Despliegue & Hosting** | Vercel | Production | Despliegue continuo (CI/CD) con Edge Network |

---

## Estructura del Proyecto

```text
Portfolio-AngelHerrera/
├── build-img/                  # Pipeline de optimización de imágenes en Python
│   ├── compress_image.py       # Script CLI de compresión inteligente
│   ├── requirements.txt        # Dependencias de Python (Pillow)
│   └── README.md               # Documentación técnica del submódulo
├── public/                     # Activos estáticos públicos
│   └── cv/                     # Documentos, PDFs y fotografías de perfil
│       ├── curriculum/         # Visor web de currículum
│       └── profileoffficial.png
├── src/                        # Código fuente de la aplicación
│   ├── assets/                 # Recursos multimedia, estilos base y fuentes
│   ├── components/             # Componentes modulares de React
│   │   ├── LeftPanel.jsx       # Panel de perfil, navegación y biografía
│   │   ├── RightPanel.jsx      # Panel de experiencia, proyectos y timeline
│   │   ├── TopNavbar.jsx       # Barra superior de navegación y redes
│   │   └── WorldGlobe.jsx      # Componente de renderizado 3D Three.js
│   ├── locales/                # Diccionarios de internacionalización (es.json / en.json)
│   ├── i18n.js                 # Configuración de inicialización i18next
│   ├── App.jsx                 # Componente raíz del layout principal
│   └── main.jsx                # Punto de entrada de la aplicación
├── index.html                  # Plantilla HTML y metadatos SEO / OpenGraph
├── vite.config.js              # Configuración de compilación de Vite
└── package.json                # Dependencias y scripts de Node.js
```

---

## Instalación y Ejecución Local

### Prerrequisitos

- Node.js (versión 18.0.0 o superior)
- npm (versión 9.0.0 o superior)
- Python 3.10+ (opcional, requerido únicamente para el módulo `build-img/`)

### 1. Clonar el repositorio

```bash
git clone https://github.com/DevDangel/Portfolio-AngelHerrera.git
cd Portfolio-AngelHerrera
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar el servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible localmente en `http://localhost:5173`.

### 4. Compilación para producción

```bash
npm run build
```

Genera la versión optimizada para distribución dentro del directorio `dist/`.

---

## Herramienta Interna de Optimización (`build-img`)

El repositorio incluye un script en Python para procesar y adaptar imágenes de perfil para portales de empleo y optimización web:

```bash
# Instalación del entorno del optimizador
pip install -r build-img/requirements.txt

# Ejecución estándar (procesa la imagen de perfil a un límite estricto de <= 2.0 MB)
python build-img/compress_image.py
```

Para documentación detallada sobre parámetros avanzados (`--max-mb`, `--format`, `--output`), consultar [build-img/README.md](build-img/README.md).

---

## Contacto Profesional

- **Desarrollador:** Ángel David Herrera Acevedo
- **Perfil Profesional:** Desarrollador Fullstack Junior
- **LinkedIn:** [linkedin.com/in/dev-angel](https://www.linkedin.com/in/dev-angel/)
- **GitHub:** [github.com/DevDangel](https://github.com/DevDangel)
- **Correo Electrónico:** [angeldavidh18@gmail.com](mailto:angeldavidh18@gmail.com)
- **WhatsApp:** [+57 301 6755558](https://wa.link/7p2zmo)
