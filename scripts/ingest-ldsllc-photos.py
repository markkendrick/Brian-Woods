#!/usr/bin/env python3
"""Resize LDSLLC stills into public/images/library and write a source map."""

from __future__ import annotations

import json
import os
import re
import subprocess
from pathlib import Path

SRC = Path("/Users/markkendrick/Desktop/LDSLLC Photos")
DST = Path("/Users/markkendrick/Git/Brian-Woods/public/images/library")
MAP_PATH = Path("/Users/markkendrick/Git/Brian-Woods/docs/knowledge/photo-library-map.json")
SKIP_EXT = {".mov", ".mp4", ".m4v"}


def slugify(name: str) -> str:
    base = Path(name).stem.lower()
    slug = re.sub(r"[^a-z0-9]+", "-", base).strip("-")
    return (slug[:90] or "photo") + ".jpg"


def main() -> None:
    DST.mkdir(parents=True, exist_ok=True)
    used: dict[str, int] = {}
    rows: list[dict[str, object]] = []

    files = sorted(
        p for p in SRC.iterdir() if p.is_file() and not p.name.startswith(".")
    )

    for src in files:
        ext = src.suffix.lower()
        if ext in SKIP_EXT:
            rows.append(
                {
                    "original": src.name,
                    "web": None,
                    "kind": "video",
                    "bytes": src.stat().st_size,
                    "note": "Keep on Desktop only. Do not put videos on the website.",
                }
            )
            continue
        if ext not in {".jpg", ".jpeg", ".png", ".tif", ".tiff", ".webp", ".heic"}:
            rows.append(
                {
                    "original": src.name,
                    "web": None,
                    "kind": "skipped",
                    "bytes": src.stat().st_size,
                    "note": f"Unhandled type {ext}",
                }
            )
            continue

        slug = slugify(src.name)
        if slug in used:
            used[slug] += 1
            slug = slug.replace(".jpg", f"-{used[slug]}.jpg")
        else:
            used[slug] = 1

        dest = DST / slug
        subprocess.run(
            [
                "sips",
                "-s",
                "format",
                "jpeg",
                "-s",
                "formatOptions",
                "72",
                "-Z",
                "1600",
                str(src),
                "--out",
                str(dest),
            ],
            check=True,
            capture_output=True,
        )
        rows.append(
            {
                "original": src.name,
                "web": f"/images/library/{slug}",
                "kind": "image",
                "bytes": dest.stat().st_size,
            }
        )

    MAP_PATH.write_text(json.dumps(rows, indent=2) + "\n")
    images = [r for r in rows if r["kind"] == "image"]
    videos = [r for r in rows if r["kind"] == "video"]
    total = sum(int(r["bytes"]) for r in images)
    print(f"images={len(images)} videos={len(videos)} web_bytes={total}")


if __name__ == "__main__":
    main()
