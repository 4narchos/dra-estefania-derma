/**
 * Animación scrolly-driven del bloque Hero + Presentación en mobile.
 *
 * Inspirado en la landing de Affinity: un único track de scroll largo con un
 * viewport sticky. Las animaciones de ambas secciones están sincronizadas en
 * un solo timeline GSAP con scrub, de modo que la transición se siente como
 * una misma escena.
 */

const DESKTOP_MIN = 769;

export function initHomeIntroScrollMobile() {
  // Solo mobile.
  if (window.innerWidth >= DESKTOP_MIN) return;

  const html = document.documentElement;
  const section = document.querySelector(".home-intro-scroll-mobile");
  if (!section) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // En reduced motion mostramos directamente el estado final.
  if (prefersReducedMotion) {
    section.classList.add("is-static");
    return;
  }

  const start = () => {
    loadAndInit(section);
  };

  if (html.classList.contains("is-loaded")) {
    start();
  } else {
    const observer = new MutationObserver(() => {
      if (html.classList.contains("is-loaded")) {
        observer.disconnect();
        start();
      }
    });
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });
  }
}

async function loadAndInit(section) {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]);
  gsap.registerPlugin(ScrollTrigger);

  // Suaviza el scroll táctil de iOS y evita que el rebote del momentum
  // haga oscilar las animaciones scrolly-driven.
  ScrollTrigger.normalizeScroll(true);
  // Evita que la barra de direcciones de Safari móvil invalide los cálculos
  // de ScrollTrigger en cada cambio de altura del viewport.
  ScrollTrigger.config({ ignoreMobileResize: true });

  const track = section.querySelector(".his-track");
  const stage = section.querySelector(".his-stage");
  const bg = section.querySelector(".his-bg");
  const heroScene = section.querySelector(".his-hero-scene");
  const heroTitle = section.querySelector(".his-hero-title");
  const heroCircles = section.querySelectorAll(".his-collage-item");
  const presScene = section.querySelector(".his-pres-scene");
  const presVisual = section.querySelector(".his-pres-visual img");
  const presHeader = section.querySelector(".his-pres-header");
  const presTitle = section.querySelector(".his-pres-title");
  const presTitlePart1 = section.querySelector(".his-pres-title-part1");
  const presTitlePart2 = section.querySelector(".his-pres-title-part2");
  const presSignature = section.querySelector(".his-pres-signature");
  const presName = section.querySelector(".his-pres-name");
  const presRole = section.querySelector(".his-pres-role");
  const presLocation = section.querySelector(".his-pres-location");
  const presMenu = section.querySelector(".his-pres-menu");
  const mouseBtn = section.querySelector(".his-mouse-btn");

  // Altura del header fijo para que el pin y el timeline comiencen justo cuando
  // el track está debajo del header, no tapado por él.
  const siteHeaderHeight = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--header-height")
  ) || 56;
  const scrollStart = `top ${siteHeaderHeight}px`;

  // Medidas necesarias para posicionar el título de presentación en el centro
  // del stage y luego deslizarlo hasta el header. Se toman una sola vez antes
  // de construir el timeline.
  const stageRect = stage.getBoundingClientRect();
  const headerRect = presHeader.getBoundingClientRect();
  const titleRect = presTitle.getBoundingClientRect();

  const stageHeight = stageRect.height;
  const headerHeight = headerRect.height;
  const titleHeight = titleRect.height;

  // Offset vertical para que el centro del título coincida con el centro del stage.
  const titleCenterStageY = stageHeight / 2 - titleHeight / 2;
  // Offset vertical para que el centro del título coincida con el centro del header.
  const titleCenterHeaderY = headerHeight / 2 - titleHeight / 2;

  // Establecer estado inicial de forma explícita para evitar saltos si el
  // usuario ya scrolleó antes de que cargue GSAP.
  gsap.set(heroScene, { opacity: 1, y: 0 });
  gsap.set(heroTitle, { opacity: 1, y: 0 });
  gsap.set(heroCircles, { opacity: 1, scale: 1 });
  gsap.set(presScene, { opacity: 1 });
  gsap.set(presVisual, { opacity: 0, scale: 0.85 });
  gsap.set(presHeader, { opacity: 0 });
  gsap.set(presTitle, {
    opacity: 0,
    y: titleCenterStageY,
    scale: 0.98,
  });
  gsap.set(presTitlePart1, { color: "#F5F5F0" });
  gsap.set(presTitlePart2, { color: "#C4B896" });
  gsap.set(presSignature, { opacity: 0 });
  gsap.set([presName, presRole, presLocation], { opacity: 0, y: 12 });
  gsap.set(presMenu, { opacity: 0, y: 30 });
  gsap.set(bg, { backgroundColor: "#041322" });

  const ctx = gsap.context(() => {
    // Fijamos el stage con ScrollTrigger en lugar de depender de position:sticky.
    // En iOS esto evita el “temblor” propio del repaint de elementos sticky
    // cuando el scroll con momentum rebota.
    ScrollTrigger.create({
      trigger: track,
      start: scrollStart,
      end: "bottom bottom",
      pin: stage,
      pinSpacing: false,
      anticipatePin: 1,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: track,
        start: scrollStart,
        end: "bottom bottom",
        scrub: 0.5,
        fastScrollEnd: true,
      },
    });

    // 0-10%: Hero estable (después de la animación de entrada del preloader).

    // 10-25%: el indicador de scroll desaparece suavemente.
    if (mouseBtn) {
      tl.to(
        mouseBtn,
        {
          opacity: 0,
          duration: 0.15,
          ease: "none",
        },
        0.1
      );
    }

    // 15-35%: círculos se dispersan hacia afuera y el título sube/desvanece.
    heroCircles.forEach((circle) => {
      const dirX = Number(circle.dataset.dirX) || 0;
      const dirY = Number(circle.dataset.dirY) || 0;
      tl.to(
        circle,
        {
          xPercent: dirX * 130,
          yPercent: dirY * 130,
          scale: 0.6,
          opacity: 0,
          duration: 0.2,
          ease: "none",
        },
        0.15
      );
    });

    tl.to(
      heroTitle,
      {
        yPercent: -80,
        opacity: 0,
        duration: 0.2,
        ease: "none",
      },
      0.15
    );

    // 25-40%: texto "Yo te ayudo a entenderla" aparece en el centro del stage
    // y se mantiene ahí un momento sobre el fondo azul.
    tl.to(
      presTitle,
      {
        opacity: 1,
        scale: 1,
        duration: 0.15,
        ease: "none",
      },
      0.25
    );

    // 40-55%: el texto sube, el fondo transiciona a blanco y la foto de la Dra.
    // hace zoom in + fade in. El cuerpo del texto pasa de blanco a oscuro para
    // mantenerse legible sobre el fondo blanco; "entenderla" conserva su acento.
    tl.to(
      presTitle,
      {
        y: titleCenterHeaderY,
        duration: 0.15,
        ease: "none",
      },
      0.40
    );

    tl.to(
      bg,
      {
        backgroundColor: "#fafafa",
        duration: 0.15,
        ease: "none",
      },
      0.40
    );

    tl.to(
      presVisual,
      {
        opacity: 1,
        scale: 1,
        duration: 0.15,
        ease: "none",
      },
      0.40
    );

    tl.to(
      presTitlePart1,
      {
        color: "#3A3A3A",
        duration: 0.12,
        ease: "none",
      },
      0.43
    );

    // 55-70%: el header azul se revela y el texto entra en él. El cuerpo del
    // texto vuelve a blanco para leerse sobre el fondo oscuro del header.
    tl.to(
      presHeader,
      {
        opacity: 1,
        duration: 0.15,
        ease: "none",
      },
      0.55
    );

    tl.to(
      presTitlePart1,
      {
        color: "#F5F5F0",
        duration: 0.15,
        ease: "none",
      },
      0.55
    );

    // 70-85%: el título del header desaparece y aparece la firma en su lugar.
    tl.to(
      presTitle,
      {
        opacity: 0,
        duration: 0.15,
        ease: "none",
      },
      0.7
    );

    tl.to(
      presSignature,
      {
        opacity: 1,
        duration: 0.15,
        ease: "none",
      },
      0.75
    );

    tl.to(
      presName,
      {
        opacity: 1,
        y: 0,
        duration: 0.12,
        ease: "none",
      },
      0.78
    );

    tl.to(
      [presRole, presLocation],
      {
        opacity: 1,
        y: 0,
        duration: 0.1,
        stagger: 0.02,
        ease: "none",
      },
      0.82
    );

    // 85-100%: menú inferior aparece.
    tl.to(
      presMenu,
      {
        opacity: 1,
        y: 0,
        duration: 0.15,
        ease: "none",
      },
      0.85
    );
  }, section);

  // Refrescar cálculos si el usuario rota el dispositivo.
  window.addEventListener("orientationchange", () => {
    setTimeout(() => ScrollTrigger.refresh(), 100);
  });

  // Limpieza si el componente se desmonta (poco común en sitios estáticos,
  // pero buena práctica).
  return () => ctx.revert();
}
