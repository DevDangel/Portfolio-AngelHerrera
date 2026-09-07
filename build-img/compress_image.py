#!/usr/bin/env python3
"""
Script de optimización y compresión de imágenes.
Permite reducir el peso de una imagen PNG/JPG a un tamaño objetivo (ej. <= 2MB)
preservando la máxima fidelidad visual sin sobrescribir el archivo original.
"""

import argparse
import os
import sys
from PIL import Image


def get_file_size_mb(path: str) -> float:
    """Devuelve el tamaño del archivo en Megabytes (MB)."""
    return os.path.getsize(path) / (1024 * 1024)


def optimize_image(
    input_path: str,
    output_path: str = None,
    max_mb: float = 2.0,
    target_format: str = "PNG"
) -> str:
    """
    Optimiza una imagen para que su peso final sea <= max_mb.
    El archivo original nunca es modificado ni eliminado.
    """
    if not os.path.isfile(input_path):
        raise FileNotFoundError(f"No se encontró el archivo de entrada: {input_path}")

    target_bytes = max_mb * 1024 * 1024
    original_size = os.path.getsize(input_path)
    original_size_mb = original_size / (1024 * 1024)

    # Si no se especifica salida, generar nombre con sufijo -optimized
    if not output_path:
        dir_name, file_name = os.path.split(input_path)
        base_name, ext = os.path.splitext(file_name)
        out_ext = f".{target_format.lower()}"
        output_path = os.path.join(dir_name, f"{base_name}-optimized{out_ext}")

    # Evitar sobrescribir por accidente el original
    if os.path.abspath(input_path) == os.path.abspath(output_path):
        raise ValueError("El archivo de salida no puede ser idéntico al archivo de entrada.")

    print("=" * 60)
    print("  OPTIMIZADOR DE IMÁGENES")
    print("=" * 60)
    print(f"Archivo original: {input_path}")
    print(f"Tamaño original:  {original_size_mb:.2f} MB ({original_size:,} bytes)")
    print(f"Archivo destino:  {output_path}")
    print(f"Límite máximo:    {max_mb:.2f} MB")
    print("-" * 60)

    with Image.open(input_path) as img:
        orig_width, orig_height = img.size
        print(f"Resolución orig:  {orig_width} x {orig_height} px")
        print(f"Modo de color:    {img.mode} ({'con transparencia' if 'A' in img.mode else 'sin transparencia'})")

        temp_output = output_path + ".tmp"

        # Paso 1: Intentar compresión zlib pura sin modificar resolución ni pixeles
        print("\n[1/2] Probando optimización sin pérdida de resolución...")
        save_kwargs = {
            "format": target_format,
            "optimize": True,
        }
        if target_format.upper() == "PNG":
            save_kwargs["compress_level"] = 9

        img.save(temp_output, **save_kwargs)
        test_size = os.path.getsize(temp_output)
        test_size_mb = test_size / (1024 * 1024)

        if test_size <= target_bytes:
            print(f"-> ¡Éxito! Tamaño alcanzado con resolución 100%: {test_size_mb:.2f} MB")
            if os.path.exists(output_path):
                os.remove(output_path)
            os.rename(temp_output, output_path)
            final_width, final_height = orig_width, orig_height
        else:
            print(f"-> Tamaño sin pérdida: {test_size_mb:.2f} MB (supera el límite de {max_mb:.2f} MB)")
            print("\n[2/2] Aplicando reescalado inteligente Lanczos de alta nitidez...")

            # Búsqueda del factor de escala ideal para alcanzar <= max_mb preservando 32-bit RGBA
            # Estimación inicial basada en el ratio de compresión
            ratio_needed = (target_bytes * 0.95) / test_size  # margen del 5% de seguridad
            scale_factor = min(0.95, (ratio_needed ** 0.5))

            iteration = 0
            best_scale = scale_factor
            while iteration < 5:
                iteration += 1
                cur_w = int(orig_width * best_scale)
                cur_h = int(orig_height * best_scale)
                resized = img.resize((cur_w, cur_h), Image.Resampling.LANCZOS)
                resized.save(temp_output, **save_kwargs)

                sz = os.path.getsize(temp_output)
                if sz <= target_bytes:
                    print(f"-> Iteración {iteration}: escala {best_scale*100:.1f}% ({cur_w}x{cur_h} px) -> {sz/(1024*1024):.2f} MB [Cumple objetivo]")
                    break
                else:
                    print(f"-> Iteración {iteration}: escala {best_scale*100:.1f}% ({cur_w}x{cur_h} px) -> {sz/(1024*1024):.2f} MB (ajustando...)")
                    best_scale *= 0.93

            if os.path.exists(output_path):
                os.remove(output_path)
            os.rename(temp_output, output_path)
            final_width, final_height = cur_w, cur_h

    final_size = os.path.getsize(output_path)
    final_size_mb = final_size / (1024 * 1024)
    reduction = (1 - (final_size / original_size)) * 100

    print("=" * 60)
    print("  RESULTADO FINAL")
    print("=" * 60)
    print(f"Archivo generado: {output_path}")
    print(f"Resolución final: {final_width} x {final_height} px")
    print(f"Peso final:       {final_size_mb:.2f} MB ({final_size:,} bytes)")
    print(f"Reducción:        {reduction:.1f}% menor que el original")
    print(f"Original intacto: {original_size_mb:.2f} MB (sin cambios)")
    print("=" * 60)

    return output_path


def main():
    parser = argparse.ArgumentParser(
        description="Reduce el peso de imágenes (PNG/JPG) a un máximo especificado preservando la calidad visual."
    )
    parser.add_argument(
        "-i", "--input",
        default="public/cv/profileoffficial.png",
        help="Ruta de la imagen original (por defecto: public/cv/profileoffficial.png)"
    )
    parser.add_argument(
        "-o", "--output",
        default=None,
        help="Ruta de salida para la imagen optimizada (por defecto: <nombre>-optimized.png)"
    )
    parser.add_argument(
        "-m", "--max-mb",
        type=float,
        default=2.0,
        help="Tamaño máximo objetivo en Megabytes (por defecto: 2.0)"
    )
    parser.add_argument(
        "-f", "--format",
        default="PNG",
        choices=["PNG", "WEBP", "JPEG"],
        help="Formato de salida (por defecto: PNG)"
    )

    args = parser.parse_args()

    # Normalizar rutas relativas respecto a la raíz del proyecto
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.abspath(os.path.join(script_dir, ".."))

    input_path = args.input
    if not os.path.isabs(input_path):
        candidate_root = os.path.join(project_root, input_path)
        if os.path.exists(candidate_root):
            input_path = candidate_root

    output_path = args.output
    if output_path and not os.path.isabs(output_path):
        output_path = os.path.join(project_root, output_path)

    try:
        optimize_image(
            input_path=input_path,
            output_path=output_path,
            max_mb=args.max_mb,
            target_format=args.format
        )
    except Exception as e:
        print(f"\n[ERROR]: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
