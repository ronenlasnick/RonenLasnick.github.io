(function () {
  'use strict';

  var gtmId = 'GTM-PM6L84QZ';
  var startTime = Date.now();
  var maxScrollDepth = 0;
  var interactionCount = 0;
  var sentScrollDepths = {};
  var sentSections = {};
  var sentEmbeds = {};
  var sentEngagedSeconds = {};
  var scrollMarks = [25, 50, 75, 90, 100];

  window.dataLayer = window.dataLayer || [];

  function cleanText(value) {
    return (value || '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 120);
  }

  function currentPageData() {
    return {
      page_title: document.title,
      page_path: window.location.pathname,
      page_location: window.location.href.split('#')[0],
      page_hash: window.location.hash || undefined,
      gtm_container_id: gtmId
    };
  }

  function safeUrl(url) {
    if (!url) return '';
    try {
      var parsed = new URL(url, window.location.href);
      if (parsed.protocol === 'mailto:' || parsed.protocol === 'tel:') {
        return parsed.protocol.replace(':', '');
      }
      return parsed.origin + parsed.pathname;
    } catch (error) {
      return '';
    }
  }

  function linkType(anchor) {
    var href = anchor.getAttribute('href') || '';
    if (href.indexOf('mailto:') === 0) return 'email';
    if (href.indexOf('tel:') === 0) return 'phone';
    if (href.indexOf('#') === 0) return 'anchor';
    try {
      var parsed = new URL(anchor.href, window.location.href);
      if (parsed.hostname.indexOf('app.powerbi.com') !== -1) return 'powerbi';
      if (parsed.hostname.indexOf('github.com') !== -1) return 'github';
      if (parsed.hostname.indexOf('linkedin.com') !== -1) return 'linkedin';
      if (parsed.hostname !== window.location.hostname) return 'outbound';
      return 'internal';
    } catch (error) {
      return 'unknown';
    }
  }

  function pushEvent(eventName, data) {
    var payload = Object.assign({
      event: eventName,
      event_source: 'portfolio_site'
    }, currentPageData(), data || {});

    window.dataLayer.push(payload);

    if (/^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname)) {
      window.console.info('[portfolio-analytics]', eventName, payload);
    }
  }

  function scrollDepth() {
    var doc = document.documentElement;
    var body = document.body;
    var scrollTop = window.pageYOffset || doc.scrollTop || body.scrollTop || 0;
    var scrollable = Math.max(
      body.scrollHeight,
      doc.scrollHeight,
      body.offsetHeight,
      doc.offsetHeight
    ) - window.innerHeight;

    if (scrollable <= 0) return 100;
    return Math.min(100, Math.max(0, Math.round((scrollTop / scrollable) * 100)));
  }

  function checkScrollDepth() {
    maxScrollDepth = Math.max(maxScrollDepth, scrollDepth());
    scrollMarks.forEach(function (mark) {
      if (maxScrollDepth >= mark && !sentScrollDepths[mark]) {
        sentScrollDepths[mark] = true;
        pushEvent('portfolio_scroll_depth', {
          scroll_depth_percent: mark
        });
      }
    });
  }

  function engagedSeconds() {
    return Math.max(0, Math.round((Date.now() - startTime) / 1000));
  }

  function sendEngagedTime(force) {
    var seconds = engagedSeconds();
    var bucket = Math.floor(seconds / 30) * 30;

    if (!force && bucket < 30) return;
    if (!force && sentEngagedSeconds[bucket]) return;
    if (!force) sentEngagedSeconds[bucket] = true;

    pushEvent('portfolio_engaged_time', {
      engaged_seconds: seconds,
      max_scroll_depth_percent: maxScrollDepth,
      interaction_count: interactionCount,
      engagement_final: Boolean(force)
    });
  }

  function setupSectionTracking() {
    if (!('IntersectionObserver' in window)) return;

    var sections = document.querySelectorAll('section[id], .spotlights > section, .project-summary article');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.45) return;

        var section = entry.target;
        var heading = section.querySelector('h1, h2, h3, .eyebrow');
        var sectionName = section.id || cleanText(heading && heading.textContent) || 'unnamed_section';
        var key = window.location.pathname + ':' + sectionName;

        if (sentSections[key]) return;
        sentSections[key] = true;

        pushEvent('portfolio_section_view', {
          section_id: section.id || undefined,
          section_name: sectionName
        });
      });
    }, {
      threshold: [0.45, 0.65]
    });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  function setupPowerBiEmbedTracking() {
    if (!('IntersectionObserver' in window)) return;

    var embeds = document.querySelectorAll('iframe[src*="app.powerbi.com"]');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.35) return;

        var iframe = entry.target;
        var key = iframe.getAttribute('title') || iframe.src;
        if (sentEmbeds[key]) return;
        sentEmbeds[key] = true;

        pushEvent('portfolio_powerbi_embed_view', {
          embed_title: cleanText(iframe.getAttribute('title')),
          embed_url: safeUrl(iframe.src)
        });
      });
    }, {
      threshold: [0.35]
    });

    embeds.forEach(function (iframe) {
      observer.observe(iframe);
    });
  }

  function setupClickTracking() {
    document.addEventListener('click', function (event) {
      var anchor = event.target.closest && event.target.closest('a[href]');
      interactionCount += 1;

      if (!anchor) {
        pushEvent('portfolio_interaction', {
          interaction_type: 'click'
        });
        return;
      }

      pushEvent('portfolio_link_click', {
        link_text: cleanText(anchor.textContent || anchor.getAttribute('aria-label')),
        link_type: linkType(anchor),
        link_url: safeUrl(anchor.href)
      });
    }, true);
  }

  function setupInteractionTracking() {
    ['keydown', 'touchstart'].forEach(function (type) {
      document.addEventListener(type, function () {
        interactionCount += 1;
      }, {
        passive: true
      });
    });

    window.addEventListener('scroll', function () {
      interactionCount += 1;
      window.requestAnimationFrame(checkScrollDepth);
    }, {
      passive: true
    });

    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') {
        sendEngagedTime(true);
      }
    });

    window.addEventListener('beforeunload', function () {
      sendEngagedTime(true);
    });

    window.setInterval(sendEngagedTime, 30000);
  }

  function init() {
    pushEvent('portfolio_page_view');
    checkScrollDepth();
    setupClickTracking();
    setupInteractionTracking();
    setupSectionTracking();
    setupPowerBiEmbedTracking();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
