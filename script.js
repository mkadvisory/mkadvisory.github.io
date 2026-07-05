/* ============================================================
   MK ADVISORY — script.js
   Vanilla ES6. No dependencies except AOS (loaded via CDN).
   ============================================================ */
(function () {
  "use strict";

  var WA_NUMBER = "919821299970"; // +91 98212 99970
  var DEFAULT_MSG = "Hi Meghana, I'd like to book a free consultation with MK Advisory.";
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- WhatsApp links ---------- */
  function waLink(message) {
    return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(message || DEFAULT_MSG);
  }
  $$("[data-wa]").forEach(function (el) {
    el.setAttribute("href", waLink());
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  /* ---------- Theme (dark mode) ---------- */
  var root = document.documentElement;
  var themeToggle = $("#themeToggle");
  var stored = null;
  try { stored = localStorage.getItem("mk-theme"); } catch (e) {}
  var systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(stored || (systemDark ? "dark" : "light"));

  function setTheme(mode) {
    root.setAttribute("data-theme", mode);
    if (themeToggle) themeToggle.setAttribute("aria-pressed", String(mode === "dark"));
    try { localStorage.setItem("mk-theme", mode); } catch (e) {}
  }
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }

  /* ---------- Header scroll state + progress + back-to-top ---------- */
  var header = $("#siteHeader");
  var progress = $("#scrollProgress");
  var toTop = $("#toTop");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("scrolled", y > 12);
    if (toTop) toTop.classList.toggle("show", y > 600);
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
  }
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) { window.requestAnimationFrame(function () { onScroll(); ticking = false; }); ticking = true; }
  }, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
    });
  }

  /* ---------- Mobile menu ---------- */
  var menuToggle = $("#menuToggle");
  var navLinks = $("#navLinks");
  function closeMenu() {
    if (!navLinks) return;
    navLinks.classList.remove("open");
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
  }
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    $$("a", navLinks).forEach(function (a) { a.addEventListener("click", closeMenu); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  }

  /* ---------- FAQ accordion ---------- */
  $$(".faq-item").forEach(function (item) {
    var btn = $(".faq-q", item);
    var panel = $(".faq-a", item);
    if (!btn || !panel) return;
    btn.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      // close siblings for a clean single-open accordion
      $$(".faq-item.open").forEach(function (other) {
        if (other !== item) {
          other.classList.remove("open");
          $(".faq-q", other).setAttribute("aria-expanded", "false");
          $(".faq-a", other).style.maxHeight = null;
        }
      });
      item.classList.toggle("open", !isOpen);
      btn.setAttribute("aria-expanded", String(!isOpen));
      panel.style.maxHeight = !isOpen ? panel.scrollHeight + "px" : null;
    });
  });

  /* ---------- Animated counters ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count")) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    if (prefersReduced) { el.textContent = target + suffix; return; }
    var dur = 1800, start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = Math.round(target * eased).toLocaleString("en-IN") + suffix;
      if (p < 1) window.requestAnimationFrame(step);
      else el.textContent = target.toLocaleString("en-IN") + suffix;
    }
    window.requestAnimationFrame(step);
  }

  var counters = $$("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animateCount(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { io.observe(c); });
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- Contact form → WhatsApp ---------- */
  var form = $("#enquiryForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = $("#f-name"), phone = $("#f-phone"), service = $("#f-service"), msg = $("#f-msg");
      var ok = true;
      [name, phone, service].forEach(function (f) {
        var valid = f.value.trim() !== "";
        if (f === phone) valid = f.value.replace(/\D/g, "").length >= 8;
        f.classList.toggle("invalid", !valid);
        if (!valid && ok) { f.focus(); ok = false; }
      });
      if (!ok) return;

      var text =
        "Hi Meghana, I'd like to enquire about *" + service.value + "*." +
        "\n\nName: " + name.value.trim() +
        "\nPhone: " + phone.value.trim() +
        (msg.value.trim() ? "\nMessage: " + msg.value.trim() : "");
      window.open(waLink(text), "_blank", "noopener");
    });
    // clear invalid state on input
    $$("#f-name, #f-phone, #f-service", form).forEach(function (f) {
      f.addEventListener("input", function () { f.classList.remove("invalid"); });
      f.addEventListener("change", function () { f.classList.remove("invalid"); });
    });
  }

  /* ---------- Button ripple ---------- */
  if (!prefersReduced) {
    $$(".btn").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        var rect = btn.getBoundingClientRect();
        var size = Math.max(rect.width, rect.height);
        var span = document.createElement("span");
        span.className = "ripple";
        span.style.width = span.style.height = size + "px";
        span.style.left = (e.clientX - rect.left - size / 2) + "px";
        span.style.top = (e.clientY - rect.top - size / 2) + "px";
        btn.appendChild(span);
        setTimeout(function () { span.remove(); }, 600);
      });
    });
  }

  /* ---------- Current year ---------- */
  var yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- AOS init ---------- */
  window.addEventListener("load", function () {
    if (window.AOS) {
      window.AOS.init({
        duration: 720,
        easing: "ease-out-cubic",
        once: true,
        offset: 60,
        disable: prefersReduced
      });
    }
  });
})();
