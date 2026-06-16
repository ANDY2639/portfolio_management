import { useState, useEffect } from 'preact/hooks';

type Theme = 'light' | 'dark' | 'system';
const KEY = 'portfolio-theme';

function getSystem(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function apply(theme: Theme) {
  const resolved = theme === 'system' ? getSystem() : theme;
  document.documentElement.setAttribute('data-theme', resolved);
}

interface Props {
  labelLight?: string;
  labelDark?: string;
  labelSystem?: string;
}

export default function ThemeToggle({ labelLight = 'light', labelDark = 'dark', labelSystem = 'system' }: Props) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(KEY) as Theme | null;
    const initial = stored ?? 'system';
    setTheme(initial);
    apply(initial);

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => { if (theme === 'system') apply('system'); };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  function select(t: Theme) {
    setTheme(t);
    setOpen(false);
    localStorage.setItem(KEY, t);
    apply(t);
  }

  const icon: Record<Theme, string> = { light: '○', dark: '●', system: '◐' };
  const labels: Record<Theme, string> = { light: labelLight, dark: labelDark, system: labelSystem };

  return (
    <div class="theme-toggle">
      <button
        class="theme-btn"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="listbox"
        title="theme"
      >
        {icon[theme]}
      </button>

      {open && (
        <ul class="theme-menu" role="listbox">
          {(['dark', 'light', 'system'] as Theme[]).map((t) => (
            <li key={t} role="option" aria-selected={theme === t}>
              <button
                class={`theme-option${theme === t ? ' active' : ''}`}
                onClick={() => select(t)}
              >
                <span>{icon[t]}</span>
                <span>{labels[t]}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
