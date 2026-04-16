// Nav scroll + burger
const nav = document.getElementById('nav');
const brgr = document.getElementById('brgr');
const mob = document.getElementById('mob');
window.addEventListener('scroll', () => nav.classList.toggle('up', scrollY > 44), { passive: true });
brgr.addEventListener('click', () => {
    const o = brgr.classList.toggle('x');
    mob.classList.toggle('open', o);
    brgr.setAttribute('aria-expanded', o);
});
mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    brgr.classList.remove('x'); mob.classList.remove('open'); brgr.setAttribute('aria-expanded', 'false');
}));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const t = document.querySelector(a.getAttribute('href'));
        if (!t) return;
        e.preventDefault();
        window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - nav.offsetHeight - 12, behavior: 'smooth' });
    });
});

// Generic tab switcher — reused for both module tabs and operation steps
function initTabs(btnSel, panelPrefix) {
    document.querySelectorAll(btnSel).forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = btn.dataset.tab ?? btn.dataset.op;
            document.querySelectorAll(btnSel).forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
            document.querySelectorAll('[id^="' + panelPrefix + '"]').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            document.getElementById(panelPrefix + idx).classList.add('active');
        });
    });
}
initTabs('.m-tab', 'mpanel-');
initTabs('.op-step-btn', 'op-panel-');

// IntersectionObserver factory
function makeObserver(threshold, cb) {
    return new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) cb(e); }), { threshold });
}

// Reveal
makeObserver(0.1, e => { e.target.classList.add('in'); e.target.setAttribute('data-observed', ''); })
    .observe = (function (orig) {
        return function (el) { orig.call(this, el); };
    })(IntersectionObserver.prototype.observe);
// Simpler: just create observer and observe all .rv
const rv = makeObserver(0.1, e => { e.target.classList.add('in'); rv.unobserve(e.target); });
document.querySelectorAll('.rv').forEach(el => rv.observe(el));

// Number counter animation
function animNum(el, target, dur = 1600) {
    const start = performance.now();
    const step = now => {
        const p = Math.min((now - start) / dur, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        p < 1 ? requestAnimationFrame(step) : (el.textContent = target);
    };
    requestAnimationFrame(step);
}
const co = makeObserver(0.5, e => { animNum(e.target, +e.target.dataset.t); co.unobserve(e.target); });
document.querySelectorAll('.counter[data-t]').forEach(el => co.observe(el));

// Metric bars
const bo = makeObserver(0.4, e => { setTimeout(() => e.target.style.width = e.target.dataset.w + '%', 150); bo.unobserve(e.target); });
document.querySelectorAll('.met-bar-fill[data-w],.risk-bar[data-w]').forEach(el => bo.observe(el));

// Cursor glow (desktop only)
if (!matchMedia('(pointer:coarse)').matches && !matchMedia('(prefers-reduced-motion:reduce)').matches) {
    const g = Object.assign(document.createElement('div'), { 'aria-hidden': 'true' });
    g.style.cssText = 'position:fixed;pointer-events:none;z-index:0;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(26,140,255,.055),transparent 70%);transform:translate(-50%,-50%);transition:opacity .4s;mix-blend-mode:screen;';
    document.body.appendChild(g);
    let mx = 0, my = 0, cx = 0, cy = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
    (function loop() { cx += (mx - cx) * .1; cy += (my - cy) * .1; g.style.left = cx + 'px'; g.style.top = cy + 'px'; requestAnimationFrame(loop); })();
}
