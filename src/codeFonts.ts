import '@fontsource-variable/source-serif-4/opsz.css';
import '@fontsource-variable/source-serif-4/opsz-italic.css';

// Faces marked local come from the system; the rest ship with yadiff.
// The stylesheet maps each id to a family stack via :root[data-code-font].
export const CODE_FONTS = [
    { id: 'input-serif', label: 'Input Serif' },
    { id: 'source-serif', label: 'Source Serif' },
    { id: 'charter', label: 'Charter' },
    { id: 'input-sans', label: 'Input Sans' },
    { id: 'go', label: 'Go' },
    { id: 'aporetic', label: 'Aporetic' },
    { id: 'mono', label: 'Mono' },
] as const;

export type CodeFontId = (typeof CODE_FONTS)[number]['id'];

export const DEFAULT_CODE_FONT: CodeFontId = 'input-serif';

export function isCodeFontId(value: unknown): value is CodeFontId {
    return CODE_FONTS.some((font) => font.id === value);
}

export function nextCodeFont(current: CodeFontId): CodeFontId {
    const index = CODE_FONTS.findIndex((font) => font.id === current);
    return CODE_FONTS[(index + 1) % CODE_FONTS.length].id;
}
