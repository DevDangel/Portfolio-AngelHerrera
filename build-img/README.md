# Optimizador de Imágenes

Herramienta en Python para reducir el peso de imágenes (`PNG`, `WEBP`, `JPEG`) preservando la calidad visual, transparencia alfa y resolución nítida.

## Requisitos

- Python 3.10+
- Pillow (`pip install -r requirements.txt`)

## Uso básico

Para optimizar la imagen por defecto (`public/cv/profileoffficial.png`) a un máximo de 2 MB sin modificar la original:

```bash
python build-img/compress_image.py
```

El resultado se guardará en `public/cv/profileoffficial-optimized.png`.

## Opciones avanzadas

```bash
# Definir archivo de entrada y salida específicos:
python build-img/compress_image.py -i public/cv/profileoffficial.png -o public/cv/mi-perfil-ligero.png

# Ajustar el límite máximo en MB (ej. 1.5 MB):
python build-img/compress_image.py -m 1.5

# Exportar a formato WebP moderno (ultra ligero):
python build-img/compress_image.py -f WEBP -o public/cv/profile.webp
```

## Argumentos disponibles

| Argumento | Descripción | Valor por defecto |
|---|---|---|
| `-i`, `--input` | Ruta del archivo original | `public/cv/profileoffficial.png` |
| `-o`, `--output` | Ruta del nuevo archivo generado | `<nombre>-optimized.<ext>` |
| `-m`, `--max-mb` | Tamaño máximo permitido en MB | `2.0` |
| `-f`, `--format` | Formato (`PNG`, `WEBP`, `JPEG`) | `PNG` |
