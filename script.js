/* ArtiMindArt — Visual Portfolio Script */
document.addEventListener('DOMContentLoaded', () => {
    const $ = s => document.querySelector(s);
    const $$ = s => document.querySelectorAll(s);

    /* ── CMS: load editable content ── */
    $$('[data-editable]').forEach(el => {
        const v = localStorage.getItem('cms_' + el.dataset.editable);
        if (v) el.innerHTML = v;
    });

    /* ── SEO: load meta from CMS ── */
    const seoFields = {
        'seo-title':     { el: '#seo-title',    attr: 'textContent' },
        'seo-desc':      { el: '#seo-desc',     attr: 'content' },
        'seo-keywords':  { el: '#seo-keywords',  attr: 'content' },
        'seo-canonical': { el: '#seo-canonical',  attr: 'href' },
        'og-title':      { el: '#og-title',     attr: 'content' },
        'og-desc':       { el: '#og-desc',      attr: 'content' },
        'og-image':      { el: '#og-image',     attr: 'content' },
        'tw-title':      { el: '#tw-title',     attr: 'content' },
        'tw-desc':       { el: '#tw-desc',      attr: 'content' },
    };
    Object.entries(seoFields).forEach(([key, cfg]) => {
        const v = localStorage.getItem('cms_' + key);
        const el = $(cfg.el);
        if (v && el) {
            if (cfg.attr === 'textContent') el.textContent = v;
            else el.setAttribute(cfg.attr, v);
        }
    });

    const schema = localStorage.getItem('cms_schema-json');
    if (schema) { const el = $('#schema-json'); if (el) el.textContent = schema; }

    /* ── Navbar scroll state ── */
    const navbar = $('#navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', scrollY > 60);
    }, { passive: true });

    /* ── Mobile nav toggle ── */
    const toggle = $('#navToggle');
    const links = $('#navLinks');
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        links.classList.toggle('active');
    });
    $$('#navLinks a').forEach(a => a.addEventListener('click', () => {
        toggle.classList.remove('active');
        links.classList.remove('active');
    }));

    /* ── Scroll reveal ── */
    const revealSelectors = [
        '.svc', '.g-item', '.blog-card', '.tool',
        '.about', '.about-body', '.about-photo',
        '.sec-head', '.filters', '.svc-bottom',
        '.partner-hero', '.tools-row',
        '.collab', '.collab-content', '.collab-visual',
        '.contact', '.contact-left', '.contact-form',
        '.feed-row', '.feed-cta',
        '.stat'
    ].join(',');

    const reveals = $$(revealSelectors);
    reveals.forEach(el => el.classList.add('reveal'));

    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('vis'), i * 60);
                io.unobserve(entry.target);
            }
        });
    }, { threshold: .08, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => io.observe(el));

    /* ── Gallery filter ── */
    $$('.wf').forEach(btn => btn.addEventListener('click', () => {
        $$('.wf').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        $$('.g-item').forEach(item => {
            const show = f === 'all' || item.dataset.cat === f;
            item.classList.toggle('hidden', !show);
            if (show) {
                item.style.animation = 'none';
                item.offsetHeight;
                item.style.animation = 'revealIn .5s var(--ease) forwards';
            }
        });
    }));

    const style = document.createElement('style');
    style.textContent = '@keyframes revealIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}';
    document.head.appendChild(style);

    /* ── Forms ── */
    const flash = (form, msg) => {
        const btn = form.querySelector('button[type="submit"], .btn-primary');
        const orig = btn.textContent;
        btn.textContent = msg;
        form.reset();
        setTimeout(() => btn.textContent = orig, 3000);
    };

    const cf = $('#contactForm');
    if (cf) cf.addEventListener('submit', e => { e.preventDefault(); flash(cf, 'Sent!'); });

    const nf = $('#nlForm');
    if (nf) nf.addEventListener('submit', e => { e.preventDefault(); flash(nf, 'Subscribed!'); });

    /* ── Smooth scroll ── */
    $$('a[href^="#"]').forEach(a => a.addEventListener('click', function (e) {
        const id = this.getAttribute('href');
        if (id === '#') return;
        e.preventDefault();
        const target = $(id);
        if (target) {
            scrollTo({
                top: target.getBoundingClientRect().top + scrollY - 80,
                behavior: 'smooth'
            });
        }
    }));

    /* ── Blog posts loader ── */
    function loadBlogPosts() {
        const grid = document.getElementById('blogGrid');
        if (!grid) return;

        const posts = JSON.parse(localStorage.getItem('artimind_blog_posts') || '[]');
        const published = posts
            .filter(p => p.status === 'published')
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3);

        if (published.length === 0) return;

        grid.innerHTML = published.map(post => `
            <article class="blog-card">
                <div class="bc-img" style="background:${post.image ? `url(${post.image}) center/cover` : 'linear-gradient(135deg,#1a1a2e,#16213e)'}">
                    <span class="bc-cat">${post.category}</span>
                </div>
                <div class="bc-body">
                    <time>${new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <a href="post.html#${post.slug}" class="bc-link">Read more &rarr;</a>
                </div>
            </article>
        `).join('');

        const blogCards = $$('.blog-card');
        blogCards.forEach(el => {
            el.classList.add('reveal');
            io.observe(el);
        });
    }
    loadBlogPosts();

    /* ── Parallax hero on mouse move ── */
    const hero = $('.hero-content');
    const heroGallery = $('.hero-gallery');
    if (hero && heroGallery) {
        document.addEventListener('mousemove', (e) => {
            if (scrollY > window.innerHeight) return;
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            heroGallery.style.transform = `translate(${x * -8}px, ${y * -8}px)`;
            hero.style.transform = `translate(${x * 4}px, ${y * 4}px)`;
        });
    }

    /* ── Gallery card tilt on hover ── */
    $$('.g-item').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `scale(1.02) perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    /* ── Lazy-load Twitter widget ── */
    if ('IntersectionObserver' in window) {
        const feedEl = $('.feed-embed');
        if (feedEl) {
            const feedObs = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    const s = document.createElement('script');
                    s.src = 'https://platform.twitter.com/widgets.js';
                    s.async = true;
                    document.head.appendChild(s);
                    feedObs.disconnect();
                }
            }, { rootMargin: '200px' });
            feedObs.observe(feedEl);
        }
    }
});
