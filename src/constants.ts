import { SYNTAX_THEMES } from './syntaxThemes';

export const DIFF_UNSAFE_CSS = `
  :host {
    /* Separators and context tints mix toward warm ink and cream, not pure black and white. */
    --diffs-mixer: light-dark(#392b1a, #f8f1e3);
  }
  [data-line] {
    word-spacing: var(--yd-code-word-spacing, 0);
  }
  [data-line-annotation],
  [data-gutter-buffer='annotation'] {
    --diffs-annotation-bg: var(--diffs-bg) !important;
    --diffs-computed-decoration-bg: var(--diffs-bg) !important;
    --diffs-computed-diff-line-bg: var(--diffs-bg) !important;
    --diffs-computed-selected-line-bg: var(--diffs-bg) !important;
    --diffs-line-bg: var(--diffs-bg) !important;
  }
`;

export const DIFF_WORKER_POOL_OPTIONS = {
    workerFactory: () => new Worker(new URL('@pierre/diffs/worker/worker.js', import.meta.url), { type: 'module' }),
};

export const DIFF_HIGHLIGHTER_OPTIONS = {
    theme: SYNTAX_THEMES,
};

// Proportional reading faces need more leading than the 20px mono default.
// Feeds both the CSS line height and CodeView's virtualized row metrics.
export const CODE_LINE_HEIGHT = 22;

export const SHORTCUTS: [string, string][] = [
    ['T', 'Tree search'],
    ['S', 'Show or hide tree view'],
    ['U', 'Unified diff'],
    ['W', 'Line wrap'],
    ['L', 'Line numbers'],
    ['B', 'Backgrounds'],
    ['D', 'Cycle theme (auto/light/dark)'],
    ['F', 'Cycle code font'],
    ['C', 'Collapse or expand all'],
    ['J / K', 'Next or previous file'],
    ['Y', 'Copy reviews'],
    ['Esc', 'Dismiss search or draft review'],
];
