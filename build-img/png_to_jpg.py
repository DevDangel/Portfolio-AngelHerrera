#!/usr/bin/env python3
"""
Script para convertir imágenes PNG a JPG de alta fidelidad.
Preserva la calidad visual y el tamaño adecuado para portales web y de empleo.
"""

import argparse
import os
import sys
from PIL import Image


def convert_png_to_jpg(
    input_path: str,
    output_path: str = None,
    quality: int = 95,
    max_mb: float = 2.0
) -> str:
    """
    Convierte una imagen PNG a JPG asegurando fondo blanco si hay transparencia,
    con calidad ajustable y verificación de límite de peso.
    """
    if not os.path.isfile(input_path):
        raise FileNotFoundError(f"No se encontró el archivo de entrada: {input_path}")

    original_size = os.path.getsize(input_path)
    original_size_mb = original_size / (1024 * 1024)

    # Si no se especifica salida, generar nombre con extensión .jpg
    if not output_path:
        dir_name, file_name = os.path.split(input_path)
        base_name, _ = os.path.splitext(file_name)
        output_path = os.path.join(dir_name, f"{base_name}.jpg")

    # Evitar sobrescribir la misma ruta
    if os.path.abspath(input_path) == os.path.abspath(output_path):
        raise ValueError("El archivo de salida no puede ser idéntico al archivo de entrada.")

    print("=" * 60)
    print("  CONVERSOR PNG A JPG")
    print("=" * 60)
    print(f"Archivo de entrada:  {input_path}")
    print(f"Tamaño original:     {original_size_mb:.2f} MB ({original_size:,} bytes)")
    print(f"Archivo de salida:   {output_path}")
    print(f"Calidad JPEG:        {quality}%")
    print(f"Límite máximo:       {max_mb:.2f} MB")
    print("-" * 60)

    with Image.open(input_path) as img:
        width, height = img.size
        print(f"Resolución:          {width} x {height} px")
        print(f"Modo original:       {img.mode}")

        # Si la imagen tiene canal alfa o paleta con transparencia, componer sobre fondo blanco
        if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
            print("Procesando canal alfa sobre fondo blanco...")
            background = Image.new("RGB", (width, height), (255, 255, 255))
            if img.mode != "RGBA":
                img = img.convert("RGBA")
            background.paste(img, mask=img.split()[3])
            final_img = background
        else:
            final_img = img.convert("RGB")

        # Guardar en JPEG con calidad alta y optimización de tablas Huffman
        final_img.save(
            output_path,
            format="JPEG",
            quality=quality,
            optimize=True,
            progressive=True
        )

    final_size = os.path.getsize(output_path)
    final_size_mb = final_size / (1024 * 1024)
    reduction = (1 - (final_size / original_size)) * 100

    print("=" * 60)
    print("  RESULTADO DE CONVERSIÓN")
    print("=" * 60)
    print(f"Archivo generado:    {output_path}")
    print(f"Resolución:          {width} x {height} px")
    print(f"Peso final:          {final_size_mb:.2f} MB ({final_size:,} bytes)")
    print(f"Reducción de peso:   {reduction:.1f}%")
    if final_size_mb <= max_mb:
        print(f"Cumplimiento:        VÁLIDO (<= {max_mb:.2f} MB)")
    else:
        print(f"ADVERTENCIA:         Supera el límite de {max_mb:.2f} MB")
    print(f"Original intacto:    {original_size_mb:.2f} MB (sin cambios)")
    print("=" * 60)

    return output_path


def main():
    parser = argparse.ArgumentParser(
        description="Convierte imágenes PNG a JPG de alta calidad preservando nitidez y optimizando tamaño."
    )
    parser.add_argument(
        "-i", "--input",
        default="public/cv/profileoffficial-optimized.png",
        help="Ruta de la imagen de entrada (por defecto: public/cv/profileoffficial-optimized.png)"
    )
    parser.add_argument(
        "-o", "--output",
        default=None,
        help="Ruta del archivo JPG de salida (por defecto: <mismo_nombre>.jpg)"
    )
    parser.add_argument(
        "-q", "--quality",
        type=int,
        default=95,
        help="Calidad de compresión JPEG de 1 a 100 (por defecto: 95)"
    )
    parser.add_argument(
        "-m", "--max-mb",
        type=float,
        default=2.0,
        help="Tamaño máximo permitido en MB (por defecto: 2.0)"
    )

    args = parser.parse_args()

    # Normalizar rutas relativas respecto a la raíz del proyecto
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.abspath(os.path.join(script_dir, ".."))

    input_path = args.input
    if not os.path.isabs(input_path):
        candidate = os.path.join(project_root, input_path)
        if os.path.exists(candidate):
            input_path = candidate

    output_path = args.output
    if output_path and not os.path.isabs(output_path):
        output_path = os.path.join(project_root, output_path)

    try:
        convert_png_to_jpg(
            input_path=input_path,
            output_path=output_path,
            quality=args.quality,
            max_mb=args.max_mb
        )
    except Exception as e:
        print(f"\n[ERROR]: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
