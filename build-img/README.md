# Herramientas de Optimización y Conversión de Imágenes

Suite de scripts en Python para optimización, compresión y conversión de imágenes de perfil y activos web (`PNG`, `JPG`, `WEBP`) asegurando el cumplimiento de límites de carga (<= 2 MB) y alta fidelidad visual.

## Requisitos

- Python 3.10+
- Pillow (`pip install -r requirements.txt`)

---

## 1. Optimizador de Imágenes (`compress_image.py`)

Reduce el peso de imágenes PNG/JPG a un tamaño máximo objetivo (por defecto <= 2.0 MB) mediante compresión zlib y reescalado inteligente Lanczos, manteniendo transparencia RGBA intacta.

```bash
# Optimización de la imagen por defecto:
python build-img/compress_image.py

# Con parámetros personalizados:
python build-img/compress_image.py -i public/cv/profileoffficial.png -o public/cv/mi-perfil-optimizado.png -m 2.0
```

---

## 2. Conversor de PNG a JPG (`png_to_jpg.py`)

Convierte imágenes PNG a formato JPEG de alta calidad fotográfica (`quality=95` progresivo), componiendo correctamente zonas con transparencia sobre fondo blanco limpio.

```bash
# Conversión de la imagen comprimida a JPG (salida: public/cv/profileoffficial-optimized.jpg):
python build-img/png_to_jpg.py

# Conversión de cualquier imagen PNG con calidad personalizada:
python build-img/png_to_jpg.py -i public/cv/profileoffficial.png -o public/cv/profile.jpg -q 92
```

### Argumentos de `png_to_jpg.py`

| Argumento | Descripción | Valor por defecto |
|---|---|---|
| `-i`, `--input` | Ruta de la imagen PNG de entrada | `public/cv/profileoffficial-optimized.png` |
| `-o`, `--output` | Ruta del archivo JPG generado | `<mismo_nombre>.jpg` |
| `-q`, `--quality` | Calidad de compresión JPEG (1-100) | `95` |
| `-m`, `--max-mb` | Límite máximo en MB | `2.0` |
