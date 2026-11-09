import { useMemo, useState } from 'preact/hooks';
import type { SkillGroupContent } from '@portfolio/data';

interface Props {
  groups: SkillGroupContent[];
  allLabel: string;
  certCountBySkill?: Record<string, number>;
}

export default function SkillsFilter({ groups, allLabel, certCountBySkill = {} }: Props) {
  const [active, setActive] = useState('all');

  const visibleGroups = useMemo(
    () => (active === 'all' ? groups : groups.filter((group) => group.key === active)),
    [active, groups],
  );

  return (
    <div>
      <div class="sf-filters" role="toolbar" aria-label="Filter skills">
        <button
          type="button"
          class={`sf-filter-btn${active === 'all' ? ' is-active' : ''}`}
          onClick={() => setActive('all')}
          aria-pressed={active === 'all'}
        >
          {allLabel}
        </button>
        {groups.map((group) => (
          <button
            key={group.key}
            type="button"
            class={`sf-filter-btn${active === group.key ? ' is-active' : ''}`}
            onClick={() => setActive(group.key)}
            aria-pressed={active === group.key}
          >
            {group.label}
          </button>
        ))}
      </div>

      {visibleGroups.map((group) => (
        <div key={group.key} class="sf-group">
          <h3 class="sf-group-title">{group.label}</h3>
          <ul class="sf-grid" aria-label={group.label}>
            {group.skills.map((skill) => (
              <li key={skill.id} class="sf-card">
                <div class="sf-card-header">
                  <span class="sf-card-name">{skill.name}</span>
                  {(certCountBySkill[skill.name] ?? 0) > 0 && (
                    <span class="sf-cert-count">
                      {certCountBySkill[skill.name]}{' '}
                      {certCountBySkill[skill.name] === 1 ? 'cert' : 'certs'}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
