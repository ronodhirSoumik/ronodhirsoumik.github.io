/**
 * Academic & Professional Portfolio Scripts — Soumik Sarker
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Theme Management (Light / Dark Mode)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('soumik_portfolio_theme');

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('soumik_portfolio_theme', theme);
    if (themeToggleBtn) {
      const icon = themeToggleBtn.querySelector('i');
      if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      }
      themeToggleBtn.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      themeToggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    }
  };

  // Initialize theme
  if (savedTheme) {
    setTheme(savedTheme);
  } else if (prefersDark) {
    setTheme('dark');
  } else {
    setTheme('light');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  }

  /* ==========================================================================
     2. Mobile Navigation Toggle
     ========================================================================== */
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const navMenuLinks = document.getElementById('nav-menu-links');

  if (mobileNavToggle && navMenuLinks) {
    mobileNavToggle.addEventListener('click', () => {
      navMenuLinks.classList.toggle('show');
      const isExpanded = navMenuLinks.classList.contains('show');
      mobileNavToggle.setAttribute('aria-expanded', isExpanded);
      const icon = mobileNavToggle.querySelector('i');
      if (icon) {
        icon.className = isExpanded ? 'fas fa-times' : 'fas fa-bars';
      }
    });

    // Close mobile nav when clicking a nav item
    navMenuLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (navMenuLinks.classList.contains('show')) {
          navMenuLinks.classList.remove('show');
          if (mobileNavToggle.querySelector('i')) {
            mobileNavToggle.querySelector('i').className = 'fas fa-bars';
          }
        }
      });
    });
  }

  /* ==========================================================================
     3. Active ScrollSpy Navigation
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu-links a');

  const onScrollSpy = () => {
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', onScrollSpy, { passive: true });

  /* ==========================================================================
     4. Publications: Filter, Abstract & BibTeX Drawer
     ========================================================================== */
  // Filter tabs
  const pubFilterBtns = document.querySelectorAll('.pub-filter-btn');
  const pubCards = document.querySelectorAll('.pub-card');

  pubFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      pubFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      pubCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Drawer toggles (BibTeX & Abstract)
  document.querySelectorAll('.btn-toggle-bibtex').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-target');
      const drawer = document.getElementById(targetId);
      if (drawer) {
        const isOpen = drawer.classList.contains('open');
        // Close other open drawers within same pub card
        const parentCard = btn.closest('.pub-card');
        if (parentCard) {
          parentCard.querySelectorAll('.pub-drawer').forEach(d => d.classList.remove('open'));
          parentCard.querySelectorAll('.pub-btn').forEach(b => b.classList.remove('active'));
        }
        if (!isOpen) {
          drawer.classList.add('open');
          btn.classList.add('active');
        }
      }
    });
  });

  document.querySelectorAll('.btn-toggle-abstract').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-target');
      const drawer = document.getElementById(targetId);
      if (drawer) {
        const isOpen = drawer.classList.contains('open');
        const parentCard = btn.closest('.pub-card');
        if (parentCard) {
          parentCard.querySelectorAll('.pub-drawer').forEach(d => d.classList.remove('open'));
          parentCard.querySelectorAll('.pub-btn').forEach(b => b.classList.remove('active'));
        }
        if (!isOpen) {
          drawer.classList.add('open');
          btn.classList.add('active');
        }
      }
    });
  });

  // Copy BibTeX Toast
  const toastEl = document.getElementById('academic-toast');
  const showToast = (message) => {
    if (toastEl) {
      toastEl.querySelector('.toast-msg').textContent = message;
      toastEl.classList.add('show');
      setTimeout(() => toastEl.classList.remove('show'), 3000);
    }
  };

  document.querySelectorAll('.btn-copy-bibtex').forEach(btn => {
    btn.addEventListener('click', () => {
      const codeBlock = btn.parentElement.querySelector('.pub-bibtex-code');
      if (codeBlock) {
        const text = codeBlock.textContent.trim();
        navigator.clipboard.writeText(text).then(() => {
          showToast('BibTeX citation copied to clipboard!');
          const origHtml = btn.innerHTML;
          btn.innerHTML = '<i class="fas fa-check"></i> Copied';
          setTimeout(() => { btn.innerHTML = origHtml; }, 2000);
        }).catch(err => {
          console.error('Clipboard copy failed:', err);
          showToast('Failed to copy to clipboard.');
        });
      }
    });
  });

  /* ==========================================================================
     5. Back to Top Button
     ========================================================================== */
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     6. Recents Media Slider & Modal Logic
     ========================================================================== */
  if (document.querySelector('.recents-swiper') && typeof Swiper !== 'undefined') {
    new Swiper('.recents-swiper', {
      slidesPerView: 1,
      spaceBetween: 18,
      navigation: {
        nextEl: '.recents-next',
        prevEl: '.recents-prev',
      },
      breakpoints: {
        700: { slidesPerView: 2, spaceBetween: 20 },
      }
    });
  }

  const recentsModalEl = document.getElementById('recentsModal');
  if (recentsModalEl && typeof bootstrap !== 'undefined') {
    const modalBody = document.getElementById('recentsModalBody');
    document.querySelectorAll('.recents-card').forEach(card => {
      card.addEventListener('click', () => {
        const type = card.getAttribute('data-type');
        const title = card.getAttribute('data-title');
        let contentHtml = '';

        if (type === 'video') {
          const src = card.getAttribute('data-src');
          modalBody.style.background = '#000';
          contentHtml = `<video controls autoplay class="w-100 h-100" style="max-height: 70vh;">
                          <source src="${src}" type="video/mp4">
                          Your browser does not support the video tag.
                        </video>`;
        } else if (type === 'text') {
          const content = card.getAttribute('data-content');
          modalBody.style.background = 'var(--bg-surface)';
          contentHtml = `<div class="p-4 p-md-5 w-100 h-100" style="color: var(--text-primary);">
                          <h3 class="mb-3" style="font-family: var(--font-serif);">${title}</h3>
                          <div style="font-size: 0.95rem; line-height: 1.6;">${content}</div>
                         </div>`;
        }

        modalBody.innerHTML = contentHtml;
        const bsModal = new bootstrap.Modal(recentsModalEl);
        bsModal.show();
      });
    });

    recentsModalEl.addEventListener('hidden.bs.modal', () => {
      modalBody.innerHTML = '';
    });
  }

  /* ==========================================================================
     7. Open Source Dynamic GitHub Counts
     ========================================================================== */
  const updatePrCount = (repo, elementId) => {
    const el = document.getElementById(elementId);
    if (!el) return;
    fetch(`https://api.github.com/search/issues?q=repo:${repo}+is:pr+author:ronodhirSoumik+is:merged`)
      .then(res => res.json())
      .then(data => {
        if (data && data.total_count !== undefined) {
          el.innerText = `Merged: ${data.total_count}`;
        }
      })
      .catch(() => { });
  };

  const updateRepoInfo = (repo, starsId) => {
    const starsEl = document.getElementById(starsId);
    if (!starsEl) return;
    fetch(`https://api.github.com/repos/${repo}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.stargazers_count !== undefined) {
          starsEl.innerText = data.stargazers_count > 1000 ? (data.stargazers_count / 1000).toFixed(1) + 'k' : data.stargazers_count;
        }
      })
      .catch(() => { });
  };

  const updateStatsRow = () => {
    const username = 'ronodhirSoumik';
    fetch(`https://api.github.com/search/issues?q=author:${username}+is:pr+is:merged`)
      .then(res => res.json())
      .then(data => {
        const el = document.getElementById('stat-prs');
        if (el && data.total_count !== undefined) el.innerText = `${data.total_count}+`;
      })
      .catch(() => {
        const el = document.getElementById('stat-prs');
        if (el) el.innerText = '15+';
      });

    Promise.all([
      fetch('https://api.github.com/repos/spring-projects/spring-security').then(r => r.json()),
      fetch('https://api.github.com/repos/flwrlabs/flower').then(r => r.json()),
      fetch('https://api.github.com/repos/kamranahmedse/developer-roadmap').then(r => r.json())
    ]).then(results => {
      let totalStars = 0;
      results.forEach(repo => {
        if (repo && repo.stargazers_count) totalStars += repo.stargazers_count;
      });
      const starsEl = document.getElementById('stat-stars');
      if (starsEl && totalStars > 0) starsEl.innerText = `${(totalStars / 1000).toFixed(0)}k+`;
    }).catch(() => {
      const starsEl = document.getElementById('stat-stars');
      if (starsEl) starsEl.innerText = '280k+';
    });
  };

  updatePrCount('spring-projects/spring-security', 'pr-count-spring');
  updatePrCount('flwrlabs/flower', 'pr-count-flower');
  updatePrCount('kamranahmedse/developer-roadmap', 'pr-count-roadmap');

  updateRepoInfo('spring-projects/spring-security', 'stars-spring');
  updateRepoInfo('flwrlabs/flower', 'stars-flower');
  updateRepoInfo('kamranahmedse/developer-roadmap', 'stars-roadmap');

  updateStatsRow();

  /* ==========================================================================
     8. Projects Filter & Dynamic Card Rendering
     ========================================================================== */
  const projectsData = [
    {
      title: "Security-as-a-Service: A Three-way Blockchain-Based Security Service Model for Cloud",
      description: "Designed a dynamic, client-configurable blockchain security service model for cloud environments. Clients can formulate and enforce customizable privacy and access control policies backed by smart contracts, validated for decentralized file storage.",
      type: "Thesis",
      category: "Thesis",
      badgeClass: "badge-thesis",
      icon: "fas fa-shield-halved",
      tech: ["Blockchain", "Solidity", "Smart Contracts", "Cloud Security", "IPFS"],
      links: [
        { text: "Thesis Document", url: "https://drive.google.com/file/d/1ZmUyzxvYNpV68Tjs1kSITlJ-cCv3kJjE/view", icon: "fas fa-file-pdf" },
        { text: "GitHub", url: "https://github.com/ronodhirSoumik", icon: "fab fa-github" }
      ],
      stats: "⭐ Undergraduate Research Thesis &nbsp;·&nbsp; SUST Department of CSE"
    },
    {
      title: "Agentic Research Paper Crawler",
      description: "Autonomous agentic tool capable of interpreting natural language research queries, orchestrating multi-step searches across Google Scholar and arXiv, and synthesizing structured literature summaries.",
      type: "Machine learning",
      category: "Machine Learning",
      badgeClass: "badge-ml",
      icon: "fas fa-robot",
      tech: ["Python", "LangChain", "LLMs", "Google Scholar API", "arXiv"],
      links: [
        { text: "Article Post", url: "https://dly.to/uiobxj25AoG", icon: "fas fa-arrow-up-right-from-square" },
        { text: "GitHub", url: "https://github.com/ronodhirSoumik/agentic-rpaper-crawler", icon: "fab fa-github" }
      ]
    },
    {
      title: "Flower FedAgent — Federated Learning Integration",
      description: "Explored and developed agentic capabilities integrated with the Flower Federated Learning framework, allowing autonomous agents to negotiate and orchestrate decentralized training rounds.",
      type: "Machine learning",
      category: "Machine Learning",
      badgeClass: "badge-ml",
      icon: "fas fa-network-wired",
      tech: ["Python", "Flower FL", "PyTorch", "Distributed Systems"],
      links: [
        { text: "AI Summit Presentation", url: "resources/files/FedAgent_Presentation[FlowerAISummit2026].mp4", icon: "fas fa-video" },
        { text: "Upstream Flower", url: "https://github.com/flwrlabs/flower", icon: "fab fa-github" }
      ]
    },
    {
      title: "Bengali Sentiment Analysis REST API",
      description: "High-throughput REST API classifying social media text and consumer reviews in Bengali into nuanced polarity categories utilizing fine-tuned Transformer models.",
      type: "Machine learning",
      category: "Machine Learning",
      badgeClass: "badge-ml",
      icon: "fas fa-language",
      tech: ["Python", "FastAPI", "HuggingFace Transformers", "Docker"],
      links: [
        { text: "GitHub", url: "https://github.com/ronodhirSoumik", icon: "fab fa-github" }
      ]
    },
    {
      title: "Student Academic Result & Progression Portal",
      description: "Full-stack university portal designed for students and administrators to track semester results, calculate real-time GPA progression, and manage academic transcripts with role-based security.",
      type: "Web",
      category: "Web",
      badgeClass: "badge-web",
      icon: "fas fa-graduation-cap",
      tech: ["React", "Node.js", "PostgreSQL", "REST APIs"],
      links: [
        { text: "GitHub", url: "https://github.com/ronodhirSoumik", icon: "fab fa-github" }
      ]
    },
    {
      title: "Interactive Data Explorer & Visualizer",
      description: "Client-side exploratory data analysis tool providing instant correlation heatmaps, multi-dimensional distribution plots, and descriptive metrics without backend upload requirements.",
      type: "Tooling",
      category: "Tooling",
      badgeClass: "badge-tool",
      icon: "fas fa-chart-pie",
      tech: ["TypeScript", "D3.js", "HTML5 Canvas", "Vite"],
      links: [
        { text: "GitHub", url: "https://github.com/ronodhirSoumik", icon: "fab fa-github" }
      ]
    },
    {
      title: "2D RPG Game Engine Architecture",
      description: "Custom Java-based 2D gaming engine featuring custom sprite rendering loops, AABB collision detection systems, audio mixing pipelines, and entity-component architecture.",
      type: "Tooling",
      category: "Tooling",
      badgeClass: "badge-tool",
      icon: "fas fa-gamepad",
      tech: ["Java", "Swing/AWT", "Object-Oriented Design", "Multithreading"],
      links: [
        { text: "GitHub", url: "https://github.com/ronodhirSoumik", icon: "fab fa-github" }
      ]
    }
  ];

  const featuredContainer = document.getElementById('featured-project-container');
  const gridContainer = document.getElementById('grid-projects-container');
  const projectFilterBtns = document.querySelectorAll('#project-filters .project-filter-btn');

  let currentProjectFilter = 'All';

  const renderProjects = () => {
    if (!featuredContainer || !gridContainer) return;

    let filtered = projectsData;
    if (currentProjectFilter !== 'All') {
      filtered = projectsData.filter(p => p.type.toLowerCase() === currentProjectFilter.toLowerCase() || p.category.toLowerCase() === currentProjectFilter.toLowerCase());
    }

    featuredContainer.innerHTML = '';
    gridContainer.innerHTML = '';

    if (filtered.length === 0) {
      gridContainer.innerHTML = '<div class="text-center text-muted py-4 w-100">No projects found in this category.</div>';
      return;
    }

    // First item as Featured
    const feat = filtered[0];
    const featBadges = feat.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');
    const featLinks = feat.links.map(l => `<a href="${l.url}" target="_blank" rel="noopener noreferrer" class="proj-link-btn"><i class="${l.icon}"></i> ${l.text}</a>`).join('');

    featuredContainer.innerHTML = `
      <div class="featured-proj-card">
        <span class="featured-ribbon"><i class="fas fa-star me-1"></i> Featured Highlight</span>
        <div class="proj-top-bar">
          <span class="proj-category-badge ${feat.badgeClass}">${feat.category}</span>
        </div>
        <h3 class="proj-title" style="max-width: 85%;">${feat.title}</h3>
        <p class="proj-desc">${feat.description}</p>
        <div class="d-flex flex-wrap gap-2 mb-3">${featBadges}</div>
        <div class="proj-links">${featLinks}</div>
        ${feat.stats ? `<div class="mt-3 text-muted" style="font-size: 0.8rem; font-family: var(--font-mono);">${feat.stats}</div>` : ''}
      </div>
    `;

    // Remaining items in 2-column grid
    const remaining = filtered.slice(1);
    remaining.forEach(p => {
      const badges = p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');
      const links = p.links.map(l => `<a href="${l.url}" target="_blank" rel="noopener noreferrer" class="proj-link-btn"><i class="${l.icon}"></i> ${l.text}</a>`).join('');

      const col = document.createElement('div');
      col.className = 'col-md-6 mb-4';
      col.innerHTML = `
        <div class="academic-project-card">
          <div class="proj-top-bar">
            <span class="proj-category-badge ${p.badgeClass}">${p.category}</span>
            <i class="${p.icon} text-muted"></i>
          </div>
          <h4 class="proj-title">${p.title}</h4>
          <p class="proj-desc">${p.description}</p>
          <div class="d-flex flex-wrap gap-2 mb-3">${badges}</div>
          <div class="proj-links">${links}</div>
        </div>
      `;
      gridContainer.appendChild(col);
    });
  };

  if (projectFilterBtns.length > 0) {
    projectFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        projectFilterBtns.forEach(b => b.classList.remove('active-filter'));
        btn.classList.add('active-filter');
        currentProjectFilter = btn.getAttribute('data-filter');
        renderProjects();
      });
    });
  }

  renderProjects();

});

