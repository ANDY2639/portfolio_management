import { useEffect, useState } from 'preact/hooks';

type Theme = 'light' | 'dark' | 'system';

const KEY = 'portfolio-theme';
const THEMES: Theme[] = ['light', 'dark', 'system'];

function getSystem(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function apply(theme: Theme) {
  const resolved = theme === 'system' ? getSystem() : theme;
  document.documentElement.setAttribute('data-theme', resolved);
}

function readStored(): Theme {
  const stored = localStorage.getItem(KEY);

  return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
}

function Icon({ name }: { name: Theme }) {
  if (name === 'light') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    );
  }

  if (name === 'dark') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

interface Props {
  labelLight?: string;
  labelDark?: string;
  labelSystem?: string;
}

export default function ThemeToggle({ labelLight = 'light', labelDark = 'dark', labelSystem = 'system' }: Props) {
  const [theme, setTheme] = useState<Theme>('system');

  useEffect(() => {
    const initial = readStored();
    setTheme(initial);
    apply(initial);
  }, []);

  useEffect(() => {
    if (theme !== 'system') {
      return () => {};
    }

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => apply('system');

    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [theme]);

  function select(value: Theme) {
    setTheme(value);
    localStorage.setItem(KEY, value);
    apply(value);
  }

  const labels: Record<Theme, string> = {
    light: labelLight,
    dark: labelDark,
    system: labelSystem,
  };

  return (
    <fieldset class="theme-switch">
      <legend class="theme-legend">Theme</legend>
      {THEMES.map((value) => (
        <button
          key={value}
          type="button"
          class="theme-option"
          aria-pressed={theme === value}
          aria-label={labels[value]}
          title={labels[value]}
          onClick={() => select(value)}
        >
          <Icon name={value} />
        </button>
      ))}
    </fieldset>
  );
}
