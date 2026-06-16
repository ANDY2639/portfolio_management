import { useMemo, useState } from 'preact/hooks';
import type { Skill } from '../../lib/types';

interface Props {
  skills: Skill[];
  categoryLabels: Record<string, string>;
  levelLabels: Record<number, string>;
  certCountBySkill?: Record<string, number>;
}

export default function SkillsFilter({ skills, categoryLabels, levelLabels, certCountBySkill = {} }: Props) {
  const categories = useMemo(
    () => ['all', ...Array.from(new Set(skills.map((s) => s.category)))],
    [skills],
  );

  const [active, setActive] = useState('all');

  const visible = useMemo(
    () => skills.filter((s) => active === 'all' || s.category === active),
    [active, skills],
  );

  return (
    <div>
      <div class="sf-filters" role="toolbar" aria-label="Filter skills">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            class={`sf-filter-btn${active === cat ? ' is-active' : ''}`}
            onClick={() => setActive(cat)}
            aria-pressed={active === cat}
          >
            {categoryLabels[cat] ?? cat}
          </button>
        ))}
      </div>

      <ul class="sf-grid" aria-label="Skills list">
        {visible.map((skill) => (
          <li
            key={skill.id}
            class={`sf-card${skill.highlight ? ' is-highlight' : ''}`}
          >
            <div class="sf-card-header">
              <span class="sf-card-name">{skill.name}</span>
              <div style="display:flex;align-items:center;gap:4px;flex-shrink:0">
                {(certCountBySkill[skill.name] ?? 0) > 0 && (
                  <span class="sf-cert-count">
                    {certCountBySkill[skill.name]}{' '}
                    {certCountBySkill[skill.name] === 1 ? 'cert' : 'certs'}
                  </span>
                )}
                {skill.highlight && <span class="sf-card-badge">★</span>}
              </div>
            </div>
            <div class="sf-card-level">
              <div class="sf-level-bar" aria-label={`Level ${skill.level} of 5`}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <span key={n} class={`sf-level-dot${n <= skill.level ? ' filled' : ''}`} />
                ))}
              </div>
              <span class="sf-level-label">{levelLabels[skill.level] ?? `${skill.level}/5`}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
