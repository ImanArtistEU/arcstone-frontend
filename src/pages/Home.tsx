import React, { useEffect } from 'react';
import htmlContent from './templates/HomeContent.html?raw';

export const Home: React.FC = () => {
  useEffect(() => {
    const tableData = {
      comps: ['Spreadsheets', 'Cap table platforms', 'Law firm + registry'],
      rows: [
        { name: 'Live ownership source of truth', vals: [0, 2, 0] },
        { name: 'Investor onboarding workflow', vals: [0, 2, 0] },
        { name: 'Legal rights and document linkage', vals: [0, 0, 2] },
        { name: 'Participation rights administration', vals: [0, 0, 0] },
        { name: 'Governance and lifecycle reporting', vals: [0, 0, 0] },
      ],
    };

    const renderIcon = (val: number, isArc: boolean) => {
      if (isArc) {
        return '<div class="cmi cmi-arc"><svg viewBox="0 0 10 10"><path d="M1.5 5l2.5 2.5 4.5-4.5"/></svg></div>';
      }
      if (val === 2) {
        return '<div class="cmi cmi-yes"><svg viewBox="0 0 10 10"><path d="M1.5 5l2.5 2.5 4.5-4.5"/></svg></div>';
      }
      if (val === 1) {
        return '<div class="cmi cmi-partial"></div>';
      }
      return '<div class="cmi-no"></div>';
    };

    const wrap = document.getElementById('cmp-grid-wrap');
    if (wrap) {
      wrap.classList.remove('vis');
      const headHtml =
        '<div class="cmp-grid-head"><div class="cmp-head-feat"></div>' +
        tableData.comps.map((c) => `<div class="cmp-head-cell">${c}</div>`).join('') +
        '<div class="cmp-head-arc">Arcstone</div></div>';

      const bodyHtml =
        '<div class="cmp-grid-body">' +
        tableData.rows
          .map(
            (row, idx) =>
              `<div class="cmp-grid-row" style="animation-delay:${idx * 0.07}s">` +
              `<div class="cmp-grid-feat">${row.name}</div>` +
              row.vals.map((v) => `<div class="cmp-grid-cell">${renderIcon(v, false)}</div>`).join('') +
              `<div class="cmp-grid-cell is-arc">${renderIcon(2, true)}</div></div>`
          )
          .join('') +
        '</div>';

      wrap.innerHTML = headHtml + bodyHtml;
    }

    const observerTarget = document.querySelector('.cmp-wrap');
    let observer: IntersectionObserver | null = null;
    if (observerTarget && typeof IntersectionObserver !== 'undefined') {
      let triggered = false;
      observer = new IntersectionObserver(
        (entries, obs) => {
          if (entries[0].isIntersecting && !triggered) {
            triggered = true;
            const targetWrap = document.getElementById('cmp-grid-wrap');
            if (targetWrap) {
              requestAnimationFrame(() => {
                requestAnimationFrame(() => targetWrap.classList.add('vis'));
              });
            }
            obs.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(observerTarget);
    }

    return () => {
      observer?.disconnect();
    };
  }, []);

  return <div id="page-home" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};
