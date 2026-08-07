/* ==========================================================================
   FORNIX — script.js (Vanilla JS, sem dependências)
   ========================================================================== */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------
     1) Nav: fundo sólido ao rolar + botão "voltar ao topo"
  ------------------------------------------------------------------ */
  var nav = document.getElementById("nav");
  var backToTop = document.getElementById("backToTop");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle("is-scrolled", y > 12);
    if (backToTop) backToTop.classList.toggle("is-visible", y > 700);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  }

  /* ------------------------------------------------------------------
     2) Reveal on scroll (fade-up / fade-left / fade-right)
        Usa IntersectionObserver — leve e sem libs externas.
  ------------------------------------------------------------------ */
  var revealEls = document.querySelectorAll("[data-reveal]");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    // Stagger leve dentro de um mesmo grid, para os cards subirem em sequência
    var counters = new WeakMap();

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var parent = el.parentElement;
          var idx = counters.get(parent) || 0;
          el.style.transitionDelay = Math.min(idx * 70, 350) + "ms";
          counters.set(parent, idx + 1);
          el.classList.add("is-visible");
          observer.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* ------------------------------------------------------------------
     3) Tilt 3D suave em cards e no dashboard do hero
  ------------------------------------------------------------------ */
  if (!prefersReducedMotion) {
    var tiltEls = document.querySelectorAll(".tilt");
    tiltEls.forEach(function (el) {
      var bounds;

      el.addEventListener("mouseenter", function () {
        bounds = el.getBoundingClientRect();
      });

      el.addEventListener("mousemove", function (e) {
        if (!bounds) bounds = el.getBoundingClientRect();
        var px = (e.clientX - bounds.left) / bounds.width;   // 0..1
        var py = (e.clientY - bounds.top) / bounds.height;   // 0..1
        var rotY = (px - 0.5) * 10;  // graus
        var rotX = (0.5 - py) * 8;
        el.style.transform =
          "perspective(1000px) rotateX(" + rotX + "deg) rotateY(" + rotY + "deg) translateY(-2px)";
      });

      el.addEventListener("mouseleave", function () {
        el.style.transform = "";
      });
    });
  }

  /* ------------------------------------------------------------------
     4) Glow do botão primário seguindo o cursor (CSS var --mx/--my)
  ------------------------------------------------------------------ */
  var primaryBtns = document.querySelectorAll(".btn--primary");
  primaryBtns.forEach(function (btn) {
    btn.addEventListener("mousemove", function (e) {
      var r = btn.getBoundingClientRect();
      btn.style.setProperty("--mx", (e.clientX - r.left) + "px");
      btn.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  });

  /* ------------------------------------------------------------------
     5) Ripple ao clicar em qualquer .btn
  ------------------------------------------------------------------ */
  document.querySelectorAll(".btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      var rect = btn.getBoundingClientRect();
      var ripple = document.createElement("span");
      var size = Math.max(rect.width, rect.height);
      ripple.className = "ripple";
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
      ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
      btn.appendChild(ripple);
      window.setTimeout(function () { ripple.remove(); }, 650);
    });
  });

  /* ------------------------------------------------------------------
     6) Accordion do FAQ (acessível, apenas um item aberto por vez)
  ------------------------------------------------------------------ */
  var accItems = document.querySelectorAll(".acc-item");
  accItems.forEach(function (item) {
    var trigger = item.querySelector(".acc-trigger");
    var panel = item.querySelector(".acc-panel");
    if (!trigger || !panel) return;

    trigger.addEventListener("click", function () {
      var isOpen = trigger.getAttribute("aria-expanded") === "true";

      // fecha os outros itens
      accItems.forEach(function (other) {
        if (other === item) return;
        var otherTrigger = other.querySelector(".acc-trigger");
        var otherPanel = other.querySelector(".acc-panel");
        if (otherTrigger) otherTrigger.setAttribute("aria-expanded", "false");
        if (otherPanel) otherPanel.style.maxHeight = null;
      });

      trigger.setAttribute("aria-expanded", String(!isOpen));
      panel.style.maxHeight = isOpen ? null : panel.scrollHeight + "px";
    });
  });

  /* ------------------------------------------------------------------
     7) Rastreio simples de cliques em CTA (console — plugue seu analytics aqui)
  ------------------------------------------------------------------ */
  document.querySelectorAll("[data-cta]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var origem = btn.getAttribute("data-cta");
      // Substitua por window.gtag / fbq / seu analytics de preferência
      if (window.console && console.info) {
        console.info("[FORNIX] CTA clicado:", origem);
      }
    });
  });

  /* ------------------------------------------------------------------
     8) Destaque de linha no dashboard do hero (roda uma vez por linha)
  ------------------------------------------------------------------ */
  var dashRows = document.querySelectorAll("#dashRows .dash-row:not(.dash-row--ghost)");
  if (!prefersReducedMotion && dashRows.length) {
    var i = 0;
    window.setInterval(function () {
      dashRows.forEach(function (r) { r.style.background = ""; });
      dashRows[i].style.background = "rgba(47,95,255,.08)";
      i = (i + 1) % dashRows.length;
    }, 1800);
  }

  /* ------------------------------------------------------------------
     9) Barra de progresso de leitura (acompanha o scroll da página)
  ------------------------------------------------------------------ */
  var scrollProgressBar = document.getElementById("scrollProgress");
  if (scrollProgressBar) {
    var updateScrollProgress = function () {
      var doc = document.documentElement;
      var max = (doc.scrollHeight - window.innerHeight) || 1;
      var pct = Math.min(1, Math.max(0, (window.scrollY || window.pageYOffset) / max));
      scrollProgressBar.style.width = (pct * 100) + "%";
    };
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);
    updateScrollProgress();
  }

  /* ------------------------------------------------------------------
     10) Gráfico de fundo em expansão — canvas fixo, com transparência,
         que cresce conforme a página é rolada (respeita reduced-motion)
  ------------------------------------------------------------------ */
  var bgCanvas = document.getElementById("bgChart");
  if (bgCanvas) {
    if (prefersReducedMotion) {
      bgCanvas.remove();
    } else {
      var bgCtx = bgCanvas.getContext("2d");
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var W, H;
      var POINTS = 46;
      var seeds = [];
      for (var s = 0; s < POINTS; s++) { seeds.push(Math.random()); }

      function resizeBgCanvas() {
        W = window.innerWidth;
        H = window.innerHeight;
        bgCanvas.width = Math.round(W * dpr);
        bgCanvas.height = Math.round(H * dpr);
        bgCanvas.style.width = W + "px";
        bgCanvas.style.height = H + "px";
        bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      resizeBgCanvas();
      window.addEventListener("resize", resizeBgCanvas);

      function getScrollProgress() {
        var doc = document.documentElement;
        var max = (doc.scrollHeight - window.innerHeight) || 1;
        return Math.min(1, Math.max(0, (window.scrollY || window.pageYOffset) / max));
      }

      var chartStart = performance.now();

      function pointAt(idx, time, progress, amplitude, baseY, stepX) {
        var wave = Math.sin(idx * 0.5 + time * 0.3) * amplitude * 0.45;
        var trend = (idx / POINTS) * amplitude * (0.55 + progress * 0.9);
        var jitter = (seeds[idx] - 0.5) * 10;
        return { x: idx * stepX, y: baseY - wave - trend + jitter };
      }

      function drawBgChart(now) {
        var time = (now - chartStart) / 1000;
        var progress = getScrollProgress();
        bgCtx.clearRect(0, 0, W, H);

        var baseY = H * (0.9 - progress * 0.32);
        var amplitude = 24 + progress * 85;
        var stepX = W / (POINTS - 1);

        bgCtx.beginPath();
        for (var p = 0; p < POINTS; p++) {
          var pt = pointAt(p, time, progress, amplitude, baseY, stepX);
          if (p === 0) bgCtx.moveTo(pt.x, pt.y); else bgCtx.lineTo(pt.x, pt.y);
        }

        var lineGrad = bgCtx.createLinearGradient(0, 0, W, 0);
        lineGrad.addColorStop(0, "rgba(47,95,255,0.14)");
        lineGrad.addColorStop(1, "rgba(22,199,132,0.14)");
        bgCtx.strokeStyle = lineGrad;
        bgCtx.lineWidth = 1.4;
        bgCtx.lineJoin = "round";
        bgCtx.stroke();

        bgCtx.lineTo(W, H);
        bgCtx.lineTo(0, H);
        bgCtx.closePath();
        var areaGrad = bgCtx.createLinearGradient(0, baseY - amplitude, 0, H);
        areaGrad.addColorStop(0, "rgba(47,95,255,0.06)");
        areaGrad.addColorStop(1, "rgba(47,95,255,0)");
        bgCtx.fillStyle = areaGrad;
        bgCtx.fill();

        for (var d = 0; d < POINTS; d += 5) {
          var dp = pointAt(d, time, progress, amplitude, baseY, stepX);
          bgCtx.beginPath();
          bgCtx.arc(dp.x, dp.y, 2, 0, Math.PI * 2);
          bgCtx.fillStyle = "rgba(22,199,132,0.16)";
          bgCtx.fill();
        }

        requestAnimationFrame(drawBgChart);
      }
      requestAnimationFrame(drawBgChart);
    }
  }

  /* ------------------------------------------------------------------
     11) Contadores animados (count-up) ao entrarem na tela
  ------------------------------------------------------------------ */
  var counterEls = document.querySelectorAll(".counter[data-target]");
  if (counterEls.length) {
    var formatNumber = function (n) {
      return n.toLocaleString("pt-BR");
    };
    var animateCounter = function (el) {
      var target = parseInt(el.getAttribute("data-target"), 10) || 0;
      if (prefersReducedMotion) {
        el.textContent = formatNumber(target);
        return;
      }
      var duration = 1400;
      var start = null;
      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min(1, (ts - start) / duration);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = formatNumber(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    };

    if ("IntersectionObserver" in window) {
      var counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        });
      }, { threshold: 0.6 });
      counterEls.forEach(function (el) { counterObserver.observe(el); });
    } else {
      counterEls.forEach(function (el) {
        el.textContent = formatNumber(parseInt(el.getAttribute("data-target"), 10) || 0);
      });
    }
  }

  /* ------------------------------------------------------------------
     12) Paralaxe leve no glow do hero
  ------------------------------------------------------------------ */
  var heroGlow = document.querySelector(".hero__glow");
  if (heroGlow && !prefersReducedMotion) {
    window.addEventListener("scroll", function () {
      var y = window.scrollY || window.pageYOffset;
      heroGlow.style.transform = "translate3d(0," + (y * 0.15) + "px,0)";
    }, { passive: true });
  }

  /* ------------------------------------------------------------------
     13) Barra CTA fixa (mobile) — some perto do rodapé/CTA final
  ------------------------------------------------------------------ */
  var mobileCta = document.getElementById("mobileCta");
  if (mobileCta) {
    var finalSection = document.getElementById("final");
    var updateMobileCta = function () {
      var y = window.scrollY || window.pageYOffset;
      var showAfter = window.innerHeight * 0.9;
      var hideBefore = finalSection ? (finalSection.offsetTop - 80) : Infinity;
      mobileCta.classList.toggle("is-visible", y > showAfter && y < hideBefore);
    };
    window.addEventListener("scroll", updateMobileCta, { passive: true });
    window.addEventListener("resize", updateMobileCta);
    updateMobileCta();
  }
})();
