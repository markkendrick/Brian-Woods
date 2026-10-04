#!/usr/bin/env python3
"""Build a branded monthly report PDF from docs/customer-log.md.

    npm run report:month
    npm run report:month -- 2026-09

Python 3.9+ standard library only. The PDF is the client copy: internal notes
stay out, recommendations stay apart from completed work, and Search Console
submissions are labeled "Indexing requested". The new site is a preview.
"""

from __future__ import annotations

import argparse
import calendar
import datetime as dt
import re
from pathlib import Path
from zoneinfo import ZoneInfo

PACIFIC = ZoneInfo("America/Los_Angeles")
ROOT = Path(__file__).resolve().parents[1]
LOG = ROOT / "docs" / "customer-log.md"
OUT_DIR = ROOT / "docs" / "customer-log"

PAGE_W = 612.0
PAGE_H = 792.0
MARGIN = 48.0
CONTENT_W = PAGE_W - 2 * MARGIN
HEADER_H = 108.0
FOOTER_H = 46.0

NAVY = (0.0941, 0.1961, 0.2784)  # #183247
GOLD = (0.8392, 0.6353, 0.2392)  # #D6A23D
CREAM = (0.9686, 0.9608, 0.9373)  # #F7F5EF
CREAM_DEEP = (0.9333, 0.9098, 0.8588)  # #EEE8DB
WHITE = (1.0, 1.0, 1.0)
MUTED = (0.30, 0.38, 0.44)

PURPOSE = (
    "This monthly report documents on-site changes and summarizes off-site SEO "
    "work and results. The specific off-site methods remain confidential to "
    "protect proprietary techniques."
)

# Helvetica WinAnsi widths, 1000 units per em.
HELVETICA = {
    " ": 278, "!": 278, '"': 355, "#": 556, "$": 556, "%": 889, "&": 667,
    "'": 191, "(": 333, ")": 333, "*": 389, "+": 584, ",": 278, "-": 333,
    ".": 278, "/": 278, "0": 556, "1": 556, "2": 556, "3": 556, "4": 556,
    "5": 556, "6": 556, "7": 556, "8": 556, "9": 556, ":": 278, ";": 278,
    "<": 584, "=": 584, ">": 584, "?": 556, "@": 1015, "A": 667, "B": 667,
    "C": 722, "D": 722, "E": 667, "F": 611, "G": 778, "H": 722, "I": 278,
    "J": 500, "K": 667, "L": 556, "M": 833, "N": 722, "O": 778, "P": 667,
    "Q": 778, "R": 722, "S": 667, "T": 611, "U": 722, "V": 667, "W": 944,
    "X": 667, "Y": 667, "Z": 611, "[": 278, "\\": 278, "]": 278, "^": 469,
    "_": 556, "`": 333, "a": 556, "b": 556, "c": 500, "d": 556, "e": 556,
    "f": 278, "g": 556, "h": 556, "i": 222, "j": 222, "k": 500, "l": 222,
    "m": 833, "n": 556, "o": 556, "p": 556, "q": 556, "r": 333, "s": 500,
    "t": 278, "u": 556, "v": 500, "w": 722, "x": 500, "y": 500, "z": 500,
    "{": 334, "|": 260, "}": 334, "~": 584,
}
HELVETICA_BOLD = dict(HELVETICA)
HELVETICA_BOLD.update(
    {
        " ": 278, "!": 333, '"': 474, "#": 556, "$": 556, "%": 889, "&": 722,
        "'": 238, "(": 333, ")": 333, "*": 389, "+": 584, ",": 278, "-": 333,
        ".": 278, "/": 278, "A": 722, "B": 722, "C": 722, "D": 722, "E": 667,
        "F": 611, "G": 778, "H": 722, "I": 278, "J": 556, "K": 722, "L": 611,
        "M": 833, "N": 722, "O": 778, "P": 667, "Q": 778, "R": 722, "S": 667,
        "T": 611, "U": 722, "V": 667, "W": 944, "X": 667, "Y": 667, "Z": 611,
        "a": 556, "b": 611, "c": 556, "d": 611, "e": 556, "f": 333, "g": 611,
        "h": 611, "i": 278, "j": 278, "k": 556, "l": 278, "m": 889, "n": 611,
        "o": 611, "p": 611, "q": 611, "r": 389, "s": 556, "t": 333, "u": 611,
        "v": 556, "w": 778, "x": 556, "y": 556, "z": 500,
    }
)

MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]


def ascii_text(value: str) -> str:
    return (
        value.replace("\u2019", "'")
        .replace("\u2018", "'")
        .replace("\u201c", '"')
        .replace("\u201d", '"')
        .replace("\u2013", "-")
        .replace("\u2014", "-")
        .replace("\u2026", "...")
        .replace("\xa0", " ")
    )


def text_width(text: str, size: float, bold: bool = False) -> float:
    table = HELVETICA_BOLD if bold else HELVETICA
    return sum(table.get(ch, 556) for ch in text) * size / 1000.0


def wrap_line(text: str, size: float, bold: bool = False, width: float = CONTENT_W) -> list[str]:
    text = ascii_text(text).strip()
    if not text:
        return [""]
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        pieces = split_long_token(word, size, bold, width)
        for piece in pieces:
            candidate = f"{current} {piece}".strip()
            if current and text_width(candidate, size, bold) > width:
                lines.append(current)
                current = piece
            else:
                current = candidate
    if current:
        lines.append(current)
    return lines or [""]


def split_long_token(token: str, size: float, bold: bool, width: float) -> list[str]:
    if text_width(token, size, bold) <= width:
        return [token]
    breaks = "/?&=-_."
    parts: list[str] = []
    chunk = ""
    for ch in token:
        trial = chunk + ch
        if chunk and ch in breaks and text_width(trial, size, bold) > width * 0.85:
            parts.append(chunk)
            chunk = ch
        elif text_width(trial, size, bold) > width:
            if chunk:
                parts.append(chunk)
            chunk = ch
        else:
            chunk = trial
    if chunk:
        parts.append(chunk)
    return parts or [token]


def pdf_escape(text: str) -> str:
    return ascii_text(text).replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")


def pdf_color(rgb: tuple[float, float, float]) -> str:
    return f"{rgb[0]:.3f} {rgb[1]:.3f} {rgb[2]:.3f} rg"


def parse_month(value: str | None) -> tuple[int, int]:
    now = dt.datetime.now(PACIFIC)
    if not value:
        return now.year, now.month
    match = re.fullmatch(r"(\d{4})-(\d{2})", value.strip())
    if not match:
        raise SystemExit("Use YYYY-MM, for example 2026-09.")
    year, month = int(match.group(1)), int(match.group(2))
    if month < 1 or month > 12:
        raise SystemExit("Use YYYY-MM, for example 2026-09.")
    return year, month


URL_RE = re.compile(r"(https://[^\s]+)")
SECTION_RE = re.compile(
    r"\*\*(On-site|Off-site|Recommendations?)\.\*\*|"
    r"(?:(?<=^)|(?<=\s))(On-site|Off-site|Recommendations?)\.",
    re.IGNORECASE,
)
ANY_URL_RE = re.compile(r"https?://[^\s)]+", re.IGNORECASE)
INTERNAL_MARK_RE = re.compile(
    r"(?i)("
    r"sourcetree|source\s*tree|"
    r"\ball tags\b|"
    r"localhost|127\.0\.0\.1|"
    r"\bchatgpt\b|\bclaude\b|\bcopilot\b|\bgrok\b|\bopenai\b|\banthropic\b|"
    r"\bcursor\b|"
    r"\bai (?:tool|tooling|agent|assistant)s?\b|"
    r"\b(?:git )?branch\s+[A-Za-z0-9._/-]+|"
    r"\bcommit\s+[0-9a-f]{7,40}\b|"
    r"\b[0-9a-f]{40}\b"
    r")"
)
PREVIEW_LIVE_RE = re.compile(
    r"(?i)\b(the new (?:web)?site|the staging site|this rebuild) is (?:now )?live\b"
)


def normalize_label(label: str) -> str:
    titled = label.title().replace("Off-Site", "Off-site")
    if titled.lower().startswith("recommend"):
        return "Recommendations"
    return titled


def sentence_spans(text: str) -> list[tuple[int, int]]:
    """Split on sentence endings without breaking periods inside URLs."""
    masked = list(text)
    for match in ANY_URL_RE.finditer(text):
        end = match.end()
        while end > match.start() and text[end - 1] in ".,!?;:":
            end -= 1
        for index in range(match.start(), end):
            if masked[index] in ".!?":
                masked[index] = " "
    masked_text = "".join(masked)
    spans: list[tuple[int, int]] = []
    start = 0
    for match in re.finditer(r"[.!?]\s*|\n+", masked_text):
        end = match.end()
        if end > start:
            spans.append((start, end))
        start = end
    if start < len(text):
        spans.append((start, len(text)))
    return spans or ([(0, len(text))] if text else [])


def label_indexing(text: str) -> str:
    """Search Console submissions are requested, not confirmed indexed."""
    if not re.search(r"search console", text, re.IGNORECASE):
        return text
    pieces: list[str] = []
    last = 0
    changed = False
    for start, end in sentence_spans(text):
        pieces.append(text[last:start])
        sentence = text[start:end]
        updated = sentence
        if re.search(r"search console", sentence, re.IGNORECASE):
            updated = re.sub(r"(?i)\bsubmitted for indexing\b", "Indexing requested", updated)
            updated = re.sub(r"(?i)(?<!not )\bindexed\b", "Indexing requested", updated)
            updated = re.sub(r"(?i)indexing requested", "Indexing requested", updated)
            updated = re.sub(r"(?:Indexing requested\s*){2,}", "Indexing requested ", updated)
            changed = changed or updated != sentence
        pieces.append(updated)
        last = end
    pieces.append(text[last:])
    if not changed:
        return text
    return "".join(pieces)


INTERNAL_CLAUSE_RES = (
    re.compile(r"https?://(?:localhost|127\.0\.0\.1)(?::\d+)?[^\s)]*", re.IGNORECASE),
    re.compile(r"(?i)\bSourcetree\b[^.!\n]*[.!?]?"),
    re.compile(r"(?i)\bsource\s*tree\b[^.!\n]*[.!?]?"),
    re.compile(r"(?i)\bAll tags\b[^.!\n]*[.!?]?"),
    re.compile(r"(?i)\b(?:chatgpt|claude|copilot|grok|openai|anthropic)\b[^.!\n]*[.!?]?"),
    re.compile(r"(?i)\bcursor\b[^.!\n]*[.!?]?"),
    re.compile(r"(?i)\bai (?:tool|tooling|agent|assistant)s?\b[^.!\n]*[.!?]?"),
    re.compile(r"(?i)\b(?:git )?branch\s+[A-Za-z0-9][A-Za-z0-9._/-]*"),
    re.compile(r"(?i)\bcommit\s+[0-9a-f]{7,40}\b"),
    re.compile(r"\b[0-9a-f]{40}\b"),
    re.compile(r"(?i)\blocalhost\b[^.!\n]*[.!?]?"),
    re.compile(r"(?i)\b127\.0\.0\.1\b[^.!\n]*[.!?]?"),
)
LABEL_ONLY_RE = re.compile(
    r"^(?:\*\*)?(?:On-site|Off-site|Recommendations?)\.(?:\*\*)?$",
    re.IGNORECASE,
)


def clean_sentence(sentence: str) -> str:
    stripped = sentence.strip()
    if not stripped or LABEL_ONLY_RE.match(stripped):
        return sentence
    updated = PREVIEW_LIVE_RE.sub(r"\1 is still a preview", sentence)
    updated = label_indexing(updated)
    had_internal = INTERNAL_MARK_RE.search(sentence) is not None
    if had_internal:
        for pattern in INTERNAL_CLAUSE_RES:
            updated = pattern.sub("", updated)
        words = re.findall(r"[A-Za-z']{2,}", updated)
        if "https://" not in updated and len(words) < 4:
            return ""
    return updated


def client_body(body: str) -> str:
    """Client copy of one log entry. Unchanged when the entry is already client-facing."""
    needs_edit = (
        INTERNAL_MARK_RE.search(body) is not None
        or PREVIEW_LIVE_RE.search(body) is not None
        or re.search(r"search console", body, re.IGNORECASE) is not None
    )
    if not needs_edit:
        return body.strip()
    pieces: list[str] = []
    for start, end in sentence_spans(body):
        cleaned = clean_sentence(body[start:end])
        if cleaned.strip():
            pieces.append(cleaned)
    text = re.sub(r"[ \t]{2,}", " ", "".join(pieces))

    def stray_punctuation(match: re.Match[str]) -> str:
        before = match.string[max(0, match.start() - 120) : match.start()]
        if re.search(r"https?://\S+$", before):
            return ""
        return match.group(1)

    return re.sub(r"\s+([.!?])", stray_punctuation, text).strip()


def body_chunks(body: str) -> list[tuple[str, bool]]:
    parts = URL_RE.split(ascii_text(body))
    chunks: list[tuple[str, bool]] = []
    for part in parts:
        if not part:
            continue
        is_url = part.startswith("https://")
        text = part.strip(" \t")
        if not is_url:
            text = text.strip(" :-")
        if text:
            chunks.append((text, is_url))
    return chunks


def split_sections(body: str) -> list[tuple[str, str]]:
    """Return (On-site|Off-site, text) blocks. Unlabeled text is On-site."""
    text = body.strip()
    matches = list(SECTION_RE.finditer(text))
    if not matches:
        return [("On-site", text)]
    sections: list[tuple[str, str]] = []
    if matches[0].start() > 0:
        lead = text[: matches[0].start()].strip()
        if lead:
            sections.append(("On-site", lead))
    for i, match in enumerate(matches):
        label = next(g for g in match.groups() if g)
        start = match.end()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        chunk = text[start:end].strip()
        if chunk:
            sections.append((normalize_label(label), chunk))
    return sections


def month_entries(year: int, month: int) -> list[tuple[str, str]]:
    if not LOG.exists():
        raise SystemExit(f"Missing {LOG}")
    name = MONTH_NAMES[month - 1]
    heading = re.compile(rf"^## {name} \d{{1,2}}, {year},")
    text = LOG.read_text(encoding="utf-8")
    blocks = re.split(r"(?=^## )", text, flags=re.MULTILINE)
    entries: list[tuple[str, str]] = []
    for block in blocks:
        first, _, rest = block.strip().partition("\n")
        if heading.match(first):
            entries.append((first[3:].strip(), rest.strip()))
    return entries


def add_text(
    lines: list[dict],
    text: str,
    size: float,
    bold: bool,
    color: tuple[float, float, float],
    lead: float,
) -> None:
    for piece in wrap_line(text, size, bold):
        lines.append(
            {"kind": "text", "text": piece, "size": size, "bold": bold, "color": color, "height": lead}
        )


def build_pages(year: int, month: int, entries: list[tuple[str, str]]) -> list[list[dict]]:
    lines: list[dict] = []
    add_text(lines, PURPOSE, 10.5, False, NAVY, 15.0)
    add_text(lines, "OFF-SITE", 8.5, True, GOLD, 16.0)
    add_text(
        lines,
        "Results are summarized here when there is a change to report. Specific methods remain confidential.",
        10.5,
        False,
        NAVY,
        15.0,
    )
    lines.append({"kind": "rule", "color": GOLD, "height": 14.0})

    recommendations: list[tuple[str, str]] = []
    if not entries:
        add_text(lines, "No dated entries for this month yet.", 11.0, False, NAVY, 16.0)
    else:
        wrote_completed = False
        for heading, body in entries:
            prepared = client_body(body)
            sections = split_sections(prepared) if prepared else []
            done = [(label, chunk) for label, chunk in sections if label != "Recommendations"]
            recommendations.extend((heading, chunk) for label, chunk in sections if label == "Recommendations")
            if not done:
                continue
            wrote_completed = True
            lines.append({"kind": "spacer", "height": 10.0})
            add_text(lines, heading, 12.0, True, NAVY, 16.0)
            for label, chunk in done:
                add_text(lines, label.upper(), 8.5, True, GOLD, 14.0)
                for part, is_url in body_chunks(chunk):
                    size = 9.5 if is_url else 10.5
                    lead = 13.5 if is_url else 14.5
                    color = MUTED if is_url else NAVY
                    add_text(lines, part, size, False, color, lead)
            lines.append({"kind": "spacer", "height": 4.0})
        if not wrote_completed and not recommendations:
            add_text(lines, "No dated entries for this month yet.", 11.0, False, NAVY, 16.0)
        if recommendations:
            lines.append({"kind": "spacer", "height": 10.0})
            add_text(lines, "RECOMMENDATIONS", 8.5, True, GOLD, 16.0)
            add_text(
                lines,
                "Suggestions below are not completed work.",
                10.5,
                False,
                NAVY,
                15.0,
            )
            for heading, chunk in recommendations:
                lines.append({"kind": "spacer", "height": 8.0})
                add_text(lines, heading, 12.0, True, NAVY, 16.0)
                for part, is_url in body_chunks(chunk):
                    size = 9.5 if is_url else 10.5
                    lead = 13.5 if is_url else 14.5
                    color = MUTED if is_url else NAVY
                    add_text(lines, part, size, False, color, lead)

    usable_h = PAGE_H - HEADER_H - FOOTER_H - 20
    pages: list[list[dict]] = []
    current: list[dict] = []
    used = 0.0
    for item in lines:
        height = item["height"]
        if current and used + height > usable_h:
            pages.append(current)
            current = []
            used = 0.0
        current.append(item)
        used += height
    if current:
        pages.append(current)
    return pages or [[{"kind": "spacer", "height": 1.0}]]


def chrome_stream(year: int, month: int, page_no: int, page_count: int) -> list[str]:
    month_label = f"{MONTH_NAMES[month - 1]} {year}"
    commands = [
        "q",
        f"{pdf_color(CREAM)} 0 0 {PAGE_W:.1f} {PAGE_H:.1f} re f",
        f"{pdf_color(NAVY)} 0 {PAGE_H - HEADER_H:.1f} {PAGE_W:.1f} {HEADER_H:.1f} re f",
        f"{pdf_color(GOLD)} 0 {PAGE_H - HEADER_H - 4:.1f} {PAGE_W:.1f} 4 re f",
        f"{pdf_color(GOLD)} {MARGIN:.1f} {FOOTER_H:.1f} {CONTENT_W:.1f} 1 re f",
        "Q",
        "BT",
        "/F1 8 Tf",
        pdf_color(GOLD),
        f"1 0 0 1 {MARGIN:.2f} {PAGE_H - 28:.2f} Tm",
        f"({pdf_escape('PREPARED FOR')}) Tj",
        "/F2 16 Tf",
        pdf_color(WHITE),
        f"1 0 0 1 {MARGIN:.2f} {PAGE_H - 50:.2f} Tm",
        f"({pdf_escape('Land Development Specialists LLC')}) Tj",
        "/F2 12 Tf",
        pdf_color(GOLD),
        f"1 0 0 1 {MARGIN:.2f} {PAGE_H - 70:.2f} Tm",
        f"({pdf_escape(f'Monthly Report  |  {month_label}')}) Tj",
        "/F1 9 Tf",
        pdf_color(CREAM),
        f"1 0 0 1 {MARGIN:.2f} {PAGE_H - 88:.2f} Tm",
        f"({pdf_escape('Brian Woods  |  Prepared by Mark Kendrick')}) Tj",
        "/F1 8 Tf",
        pdf_color(MUTED),
        f"1 0 0 1 {MARGIN:.2f} {FOOTER_H - 16:.2f} Tm",
        f"({pdf_escape(f'Page {page_no} of {page_count}     Off-site SEO methods remain confidential.')}) Tj",
        "ET",
    ]
    return commands


def content_stream(items: list[dict]) -> list[str]:
    y = PAGE_H - HEADER_H - 18
    commands = ["BT"]
    for item in items:
        y -= item["height"]
        kind = item["kind"]
        if kind == "spacer":
            continue
        if kind == "rule":
            commands.append("ET")
            commands.append("q")
            commands.append(pdf_color(item["color"]))
            commands.append(f"{MARGIN:.1f} {y + 6:.1f} {CONTENT_W:.1f} 1.5 re f")
            commands.append("Q")
            commands.append("BT")
            continue
        commands.append(pdf_color(item["color"]))
        commands.append(f"/{'F2' if item['bold'] else 'F1'} {item['size']:.1f} Tf")
        commands.append(f"1 0 0 1 {MARGIN:.2f} {y:.2f} Tm")
        commands.append(f"({pdf_escape(item['text'])}) Tj")
    commands.append("ET")
    return commands


def page_stream(items: list[dict], year: int, month: int, page_no: int, page_count: int) -> bytes:
    commands = chrome_stream(year, month, page_no, page_count) + content_stream(items)
    return "\n".join(commands).encode("latin-1", "replace")


def write_pdf(path: Path, pages: list[list[dict]], year: int, month: int) -> None:
    objects: list[bytes] = []

    def add(data: bytes) -> int:
        objects.append(data)
        return len(objects)

    add(b"<< /Type /Catalog /Pages 2 0 R >>")
    page_count = len(pages)
    kids_placeholder = add(b"")
    add(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
    add(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>")

    page_ids: list[int] = []
    for index, items in enumerate(pages, start=1):
        content = page_stream(items, year, month, index, page_count)
        content_id = add(f"<< /Length {len(content)} >>\nstream\n".encode("ascii") + content + b"\nendstream")
        page_id = add(
            (
                f"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 {PAGE_W:.0f} {PAGE_H:.0f}] "
                f"/Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents {content_id} 0 R >>"
            ).encode("ascii")
        )
        page_ids.append(page_id)

    objects[kids_placeholder - 1] = (
        f"<< /Type /Pages /Count {page_count} /Kids [{' '.join(f'{n} 0 R' for n in page_ids)}] >>"
    ).encode("ascii")

    output = bytearray(b"%PDF-1.4\n")
    offsets = [0]
    for i, obj in enumerate(objects, start=1):
        offsets.append(len(output))
        output.extend(f"{i} 0 obj\n".encode("ascii"))
        output.extend(obj)
        output.extend(b"\nendobj\n")
    xref = len(output)
    output.extend(f"xref\n0 {len(objects) + 1}\n".encode("ascii"))
    output.extend(b"0000000000 65535 f \n")
    for off in offsets[1:]:
        output.extend(f"{off:010d} 00000 n \n".encode("ascii"))
    output.extend(
        (
            f"trailer << /Size {len(objects) + 1} /Root 1 0 R >>\n"
            f"startxref\n{xref}\n%%EOF\n"
        ).encode("ascii")
    )
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(output)


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Write the monthly client report PDF for Land Development Specialists LLC."
    )
    parser.add_argument(
        "month",
        nargs="?",
        help="YYYY-MM (defaults to the current Pacific month). Example: 2026-09",
    )
    parser.add_argument(
        "--month",
        dest="month_flag",
        help="YYYY-MM. Same as the positional month.",
    )
    args = parser.parse_args()
    if args.month and args.month_flag and args.month != args.month_flag:
        raise SystemExit("Pass the month once, as YYYY-MM.")
    year, month = parse_month(args.month or args.month_flag)
    entries = month_entries(year, month)
    pages = build_pages(year, month, entries)
    stamp = f"{year}-{month:02d}"
    out = OUT_DIR / f"{stamp}.pdf"
    write_pdf(out, pages, year, month)
    last_day = calendar.monthrange(year, month)[1]
    print(f"Wrote {out.relative_to(ROOT)} ({len(entries)} entries, {len(pages)} page(s))")
    print(f"Month window: {MONTH_NAMES[month - 1]} 1-{last_day}, {year}")


if __name__ == "__main__":
    main()
