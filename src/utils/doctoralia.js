/**
 * Lazy-load the Doctoralia / Docplanner widget script once per page.
 */
export function loadDoctoraliaWidget() {
  if (typeof document === "undefined") return;
  if (document.getElementById("zl-widget-s")) return;

  const script = document.createElement("script");
  script.id = "zl-widget-s";
  script.src = "https://platform.docplanner.com/js/widget.js";
  script.async = true;
  document.body.appendChild(script);
}
