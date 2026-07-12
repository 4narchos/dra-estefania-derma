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

  // Evita que la barra de direcciones de Safari móvil invalide los cálculos
  // de ScrollTrigger en cada cambio de altura del viewport.
  ScrollTrigger.config({ ignoreMobileResize: true });

  const track = section.querySelector(".his-track");
  const stage = section.querySelector(".his-stage");
  const bg = section.querySelector(".his-bg");
  const heroScene = section.querySelector(".his-hero-scene");
  const heroTitle = section.querySelector(".his-hero-title");
  const heroWords = section.querySelectorAll(".his-hero-word");
  const heroCircles = section.querySelectorAll(".his-collage-item");
  const heroImages = section.querySelectorAll(".his-collage-image");
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
  gsap.set(heroWords, { opacity: 0, filter: "blur(10px)", scale: 1.02 });
  gsap.set(heroImages, { opacity: 0, scale: 0.88 });
  gsap.set(mouseBtn, { opacity: 0 });
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

    // Animación de entrada del hero controlada por GSAP (no por CSS keyframes).
    // Se ejecuta DESPUÉS de que el pin ya montó el stage, así que cualquier
    // re-emparentado de ScrollTrigger no reinicia la animación y evitamos la
    // doble carga del texto "Tu piel te habla".
    const heroIntroTl = gsap.timeline({ delay: 0.2 });

    heroIntroTl.to(
      heroWords,
      {
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      }
    );

    heroIntroTl.to(
      heroImages,
      {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.35"
    );

    heroIntroTl.to(
      mouseBtn,
      {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.2"
    );

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
    // y se mantiene ahí hasta el 45% para que el mensaje se lea completo.
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

    // 45-60%: el texto sube hacia el header, y a la vez aparecen el header
    // azul y la foto de la Dra. con zoom in + fade in. Todo sobre el fondo azul.
    tl.to(
      presTitle,
      {
        y: titleCenterHeaderY,
        duration: 0.15,
        ease: "none",
      },
      0.45
    );

    tl.to(
      presHeader,
      {
        opacity: 1,
        duration: 0.15,
        ease: "none",
      },
      0.45
    );

    tl.to(
      presVisual,
      {
        opacity: 1,
        scale: 1,
        duration: 0.15,
        ease: "none",
      },
      0.45
    );

    // 60-70%: el texto se desvanece y el fondo transiciona a blanco, dejando
    // la foto y el header como elementos principales.
    tl.to(
      presTitle,
      {
        opacity: 0,
        duration: 0.10,
        ease: "none",
      },
      0.60
    );

    tl.to(
      bg,
      {
        backgroundColor: "#fafafa",
        duration: 0.10,
        ease: "none",
      },
      0.60
    );

    // 72-82%: firma, nombre, especialidad, ubicación y menú aparecen juntos
    // para dejar el estado final quieto un buen tramo al final del track.
    tl.to(
      presSignature,
      {
        opacity: 1,
        duration: 0.10,
        ease: "none",
      },
      0.72
    );

    tl.to(
      presName,
      {
        opacity: 1,
        y: 0,
        duration: 0.10,
        ease: "none",
      },
      0.75
    );

    tl.to(
      [presRole, presLocation],
      {
        opacity: 1,
        y: 0,
        duration: 0.08,
        stagger: 0.02,
        ease: "none",
      },
      0.79
    );

    tl.to(
      presMenu,
      {
        opacity: 1,
        y: 0,
        duration: 0.10,
        ease: "none",
      },
      0.75
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
