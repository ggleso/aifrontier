export const landingPage = String.raw`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta
      name="description"
      content="AI Frontier is an example workspace for careful, testable AI research and prototyping."
    />
    <title>AI Frontier — Explore what comes next</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #070a12;
        --surface: rgba(18, 24, 43, 0.72);
        --surface-strong: #12182b;
        --line: rgba(180, 198, 255, 0.16);
        --text: #f4f7ff;
        --muted: #aeb9d6;
        --violet: #9f8cff;
        --cyan: #56dcf2;
        --green: #73e6a6;
        --max: 1120px;
      }

      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body {
        margin: 0;
        min-width: 320px;
        color: var(--text);
        background:
          radial-gradient(circle at 12% 4%, rgba(106, 83, 255, 0.18), transparent 28rem),
          radial-gradient(circle at 92% 30%, rgba(42, 210, 228, 0.12), transparent 26rem),
          var(--bg);
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        line-height: 1.6;
      }

      a { color: inherit; }
      a:focus-visible { outline: 3px solid var(--cyan); outline-offset: 4px; }
      .skip-link {
        position: fixed;
        top: 1rem;
        left: 1rem;
        z-index: 20;
        padding: 0.6rem 0.9rem;
        border-radius: 0.5rem;
        color: #061016;
        background: var(--cyan);
        transform: translateY(-180%);
      }
      .skip-link:focus { transform: translateY(0); }

      .shell { width: min(calc(100% - 2.5rem), var(--max)); margin-inline: auto; }
      header {
        position: sticky;
        top: 0;
        z-index: 10;
        border-bottom: 1px solid var(--line);
        background: rgba(7, 10, 18, 0.82);
        backdrop-filter: blur(18px);
      }
      nav { min-height: 4.5rem; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; }
      .brand { display: inline-flex; align-items: center; gap: 0.7rem; font-weight: 750; text-decoration: none; letter-spacing: -0.02em; }
      .brand-mark { width: 1.9rem; aspect-ratio: 1; border: 1px solid rgba(255,255,255,0.38); border-radius: 50%; background: radial-gradient(circle at 35% 35%, #fff 0 5%, var(--cyan) 6% 12%, transparent 13%), linear-gradient(135deg, var(--violet), transparent 52%); box-shadow: 0 0 25px rgba(86, 220, 242, 0.35); }
      .nav-links { display: flex; align-items: center; gap: 1.4rem; color: var(--muted); font-size: 0.92rem; }
      .nav-links a { text-decoration: none; }
      .nav-links a:hover { color: var(--text); }

      .hero { min-height: 42rem; display: grid; grid-template-columns: 1.15fr 0.85fr; align-items: center; gap: clamp(2rem, 6vw, 6rem); padding-block: 6rem; }
      .eyebrow { display: inline-flex; align-items: center; gap: 0.5rem; margin: 0 0 1.25rem; color: var(--cyan); font-size: 0.78rem; font-weight: 750; letter-spacing: 0.15em; text-transform: uppercase; }
      .eyebrow::before { content: ""; width: 1.6rem; height: 1px; background: currentColor; }
      h1, h2, h3 { margin-top: 0; line-height: 1.08; letter-spacing: -0.045em; }
      h1 { max-width: 12ch; margin-bottom: 1.5rem; font-size: clamp(3.35rem, 8vw, 6.8rem); }
      h1 span { color: transparent; background: linear-gradient(100deg, #fff 5%, var(--violet) 48%, var(--cyan)); background-clip: text; -webkit-background-clip: text; }
      .lede { max-width: 38rem; margin: 0 0 2rem; color: var(--muted); font-size: clamp(1.05rem, 2vw, 1.25rem); }
      .actions { display: flex; flex-wrap: wrap; gap: 0.85rem; }
      .button { display: inline-flex; align-items: center; justify-content: center; min-height: 3rem; padding: 0.7rem 1.1rem; border: 1px solid var(--line); border-radius: 0.65rem; font-weight: 700; text-decoration: none; }
      .button.primary { border-color: transparent; color: #080b13; background: linear-gradient(110deg, var(--violet), var(--cyan)); }
      .button.secondary { background: rgba(255,255,255,0.035); }
      .button:hover { transform: translateY(-1px); filter: brightness(1.08); }

      .signal { position: relative; aspect-ratio: 1; display: grid; place-items: center; }
      .orbit { position: absolute; inset: 8%; border: 1px solid rgba(159, 140, 255, 0.28); border-radius: 50%; }
      .orbit:nth-child(2) { inset: 22%; border-color: rgba(86, 220, 242, 0.3); }
      .orbit::before { content: ""; position: absolute; top: 11%; left: 14%; width: 0.7rem; aspect-ratio: 1; border-radius: 50%; background: var(--cyan); box-shadow: 0 0 24px var(--cyan); }
      .core { width: 36%; aspect-ratio: 1; border: 1px solid rgba(255,255,255,0.2); border-radius: 1.5rem; background: linear-gradient(145deg, rgba(159,140,255,0.24), rgba(86,220,242,0.08)); box-shadow: inset 0 0 45px rgba(159,140,255,0.18), 0 0 70px rgba(86,220,242,0.08); transform: rotate(45deg); }
      .core::after { content: "AI"; display: grid; height: 100%; place-items: center; color: rgba(255,255,255,0.88); font-weight: 800; letter-spacing: 0.14em; transform: rotate(-45deg); }

      section { padding-block: 5.5rem; }
      .section-head { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 2rem; align-items: end; margin-bottom: 2.5rem; }
      h2 { margin-bottom: 0; font-size: clamp(2.2rem, 5vw, 4rem); }
      .section-copy { max-width: 40rem; margin: 0; color: var(--muted); }
      .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
      .card { min-height: 17rem; padding: 1.5rem; border: 1px solid var(--line); border-radius: 1rem; background: var(--surface); }
      .card-number { display: block; margin-bottom: 4rem; color: var(--cyan); font: 700 0.78rem/1 ui-monospace, SFMono-Regular, Menlo, monospace; }
      h3 { margin-bottom: 0.75rem; font-size: 1.35rem; letter-spacing: -0.02em; }
      .card p { margin: 0; color: var(--muted); font-size: 0.96rem; }

      .workflow { border-block: 1px solid var(--line); }
      .steps { display: grid; grid-template-columns: repeat(4, 1fr); counter-reset: steps; }
      .step { position: relative; padding: 1.5rem 1.5rem 1.5rem 0; counter-increment: steps; }
      .step + .step { padding-left: 1.5rem; border-left: 1px solid var(--line); }
      .step::before { content: "0" counter(steps); display: block; margin-bottom: 1.4rem; color: var(--violet); font: 700 0.8rem/1 ui-monospace, SFMono-Regular, Menlo, monospace; }
      .step p { margin: 0; color: var(--muted); font-size: 0.92rem; }

      .status-panel { display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 2rem; padding: clamp(1.5rem, 5vw, 3rem); border: 1px solid rgba(115,230,166,0.28); border-radius: 1.2rem; background: linear-gradient(120deg, rgba(115,230,166,0.08), rgba(86,220,242,0.04)); }
      .status-line { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.8rem; color: var(--green); font-size: 0.8rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; }
      .dot { width: 0.55rem; aspect-ratio: 1; border-radius: 50%; background: currentColor; box-shadow: 0 0 14px currentColor; }
      .status-panel h2 { margin-bottom: 0.65rem; font-size: clamp(1.8rem, 4vw, 3rem); }
      .status-panel p { max-width: 42rem; margin: 0; color: var(--muted); }

      footer { padding-block: 2.5rem; border-top: 1px solid var(--line); color: var(--muted); font-size: 0.85rem; }
      footer .shell { display: flex; justify-content: space-between; gap: 1rem; }

      @media (max-width: 760px) {
        .shell { width: min(calc(100% - 1.5rem), var(--max)); }
        .nav-links a:not(.button) { display: none; }
        .hero { min-height: auto; grid-template-columns: 1fr; padding-block: 4.5rem; }
        .signal { width: min(22rem, 90%); margin: -1rem auto 0; }
        .section-head { grid-template-columns: 1fr; align-items: start; }
        .grid { grid-template-columns: 1fr; }
        .card { min-height: auto; }
        .card-number { margin-bottom: 2.5rem; }
        .steps { grid-template-columns: 1fr; }
        .step + .step { padding-left: 0; border-left: 0; border-top: 1px solid var(--line); }
        .status-panel { grid-template-columns: 1fr; }
        .status-panel .button { width: 100%; }
        footer .shell { flex-direction: column; }
      }

      @media (prefers-reduced-motion: reduce) {
        html { scroll-behavior: auto; }
        *, *::before, *::after { transition: none !important; }
      }
    </style>
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    <header>
      <nav class="shell" aria-label="Primary navigation">
        <a class="brand" href="/" aria-label="AI Frontier home"><span class="brand-mark" aria-hidden="true"></span>AI Frontier</a>
        <div class="nav-links">
          <a href="#capabilities">Capabilities</a>
          <a href="#workflow">Workflow</a>
          <a class="button secondary" href="#status">Project status</a>
        </div>
      </nav>
    </header>

    <main id="main">
      <div class="hero shell">
        <div>
          <p class="eyebrow">A careful space for ambitious ideas</p>
          <h1>Explore the <span>AI frontier.</span></h1>
          <p class="lede">A lightweight example workspace for turning emerging AI ideas into clear, testable experiments—without pretending the prototype is already a product.</p>
          <div class="actions">
            <a class="button primary" href="#capabilities">Explore the foundation</a>
            <a class="button secondary" href="/health">View service health</a>
          </div>
        </div>
        <div class="signal" aria-hidden="true"><span class="orbit"></span><span class="orbit"></span><span class="core"></span></div>
      </div>

      <section id="capabilities" class="shell" aria-labelledby="capabilities-title">
        <div class="section-head">
          <div><p class="eyebrow">Foundation</p><h2 id="capabilities-title">Built to learn clearly.</h2></div>
          <p class="section-copy">The current repository is intentionally small. These are design goals for future experiments, not claims about deployed integrations or production intelligence.</p>
        </div>
        <div class="grid">
          <article class="card"><span class="card-number">01 / EXPLORE</span><h3>Focused prototypes</h3><p>Turn one research question at a time into a bounded, reviewable experiment with an explicit success condition.</p></article>
          <article class="card"><span class="card-number">02 / EVALUATE</span><h3>Evidence before hype</h3><p>Pair every promising result with tests, limitations, and the evidence needed to reproduce or challenge it.</p></article>
          <article class="card"><span class="card-number">03 / EVOLVE</span><h3>Safe iteration</h3><p>Use small branches, automated checks, and human-reviewed pull requests to move ideas forward deliberately.</p></article>
        </div>
      </section>

      <section id="workflow" class="workflow" aria-labelledby="workflow-title">
        <div class="shell">
          <div class="section-head">
            <div><p class="eyebrow">Workflow</p><h2 id="workflow-title">From signal to evidence.</h2></div>
            <p class="section-copy">A simple operating loop for future AI research tasks. Each step keeps uncertainty visible and changes easy to review.</p>
          </div>
          <div class="steps">
            <article class="step"><h3>Frame</h3><p>Define the question, boundary, and observable outcome.</p></article>
            <article class="step"><h3>Build</h3><p>Create the smallest useful experiment on its own branch.</p></article>
            <article class="step"><h3>Test</h3><p>Run quality, security, and behavior checks with clear evidence.</p></article>
            <article class="step"><h3>Review</h3><p>Document limitations and let a human decide what moves forward.</p></article>
          </div>
        </div>
      </section>

      <section id="status" class="shell" aria-labelledby="status-title">
        <div class="status-panel">
          <div>
            <div class="status-line"><span class="dot" aria-hidden="true"></span>Prototype foundation online</div>
            <h2 id="status-title">The starting line is ready.</h2>
            <p>This page demonstrates the local Node.js service. No external APIs, user accounts, analytics, or deployed AI models are connected yet.</p>
          </div>
          <a class="button secondary" href="/health">Check /health</a>
        </div>
      </section>
    </main>

    <footer><div class="shell"><span>AI Frontier example interface</span><span>Local-first · No tracking · No external assets</span></div></footer>
  </body>
</html>`;
