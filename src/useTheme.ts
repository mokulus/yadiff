import { createContext, use, useCallback, useEffect, useMemo, useState } from 'react';

import { DEFAULT_CODE_FONT, nextCodeFont, type CodeFontId } from './codeFonts';
import { loadPreferences, savePreferences } from './preferences';

export type ThemeMode = 'light' | 'dark' | 'auto';
export type ResolvedTheme = 'light' | 'dark';

function getSystemTheme(): ResolvedTheme {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function loadPersistedMode(): ThemeMode {
    return loadPreferences().themeMode ?? 'auto';
}

export function useTheme() {
    const [mode, setModeRaw] = useState<ThemeMode>(loadPersistedMode);
    const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme);
    const [codeFont, setCodeFont] = useState<CodeFontId>(() => loadPreferences().codeFont ?? DEFAULT_CODE_FONT);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = (e: MediaQueryListEvent) => setSystemTheme(e.matches ? 'dark' : 'light');
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    const resolved: ResolvedTheme = mode === 'auto' ? systemTheme : mode;

    useEffect(() => {
        document.documentElement.dataset.theme = resolved;
    }, [resolved]);

    useEffect(() => {
        document.documentElement.dataset.codeFont = codeFont;
    }, [codeFont]);

    const cycleCodeFont = useCallback(() => {
        setCodeFont(prev => {
            const next = nextCodeFont(prev);
            savePreferences({ codeFont: next });
            return next;
        });
    }, []);

    const cycleTheme = useCallback(() => {
        setModeRaw(prev => {
            const next: ThemeMode = prev === 'auto' ? 'light' : prev === 'light' ? 'dark' : 'auto';
            savePreferences({ themeMode: next });
            return next;
        });
    }, []);

    const setMode = useCallback((next: ThemeMode) => {
        setModeRaw(next);
        savePreferences({ themeMode: next });
    }, []);

    return useMemo(() => ({
        mode,
        resolved,
        setMode,
        cycleTheme,
        codeFont,
        cycleCodeFont,
    }), [mode, resolved, setMode, cycleTheme, codeFont, cycleCodeFont]);
}

export type ThemeState = ReturnType<typeof useTheme>;

const ThemeContext = createContext<ThemeState | null>(null);
export const ThemeProvider = ThemeContext.Provider;

export function useThemeContext(): ThemeState {
    const ctx = use(ThemeContext);
    if (ctx == null) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return ctx;
}
