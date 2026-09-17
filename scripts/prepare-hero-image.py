from __future__ import annotations

import sys
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
LOCAL_PACKAGES = PROJECT_ROOT / ".tools" / "pillow-heif"
sys.path.insert(0, str(LOCAL_PACKAGES))

from PIL import Image, ImageOps  # noqa: E402
from pillow_heif import register_heif_opener  # noqa: E402


def main() -> None:
    if len(sys.argv) != 2:
        raise SystemExit("Usage: prepare-hero-image.py <source.heic>")

    source = Path(sys.argv[1]).resolve()
    if not source.is_file():
        raise SystemExit(f"Image not found: {source}")

    register_heif_opener()
    output_dir = PROJECT_ROOT / "public" / "images"
    output_dir.mkdir(parents=True, exist_ok=True)

    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened).convert("RGB")
        for width, quality in ((960, 82), (1920, 84)):
            height = round(image.height * width / image.width)
            resized = image.resize((width, height), Image.Resampling.LANCZOS)
            destination = output_dir / f"hero-team-{width}.webp"
            resized.save(destination, "WEBP", quality=quality, method=6)
            print(f"Created {destination.name}: {width}x{height}")


if __name__ == "__main__":
    main()
