/**
 * Single source of truth for contact info, links, and business data.
 *
 * Do not hardcode phone, address, email, WhatsApp, Doctoralia, Google Profile,
 * Maps, or price anywhere else. Import from this file instead.
 */

export const numberMain = "999 221 3021";
export const numberMainRaw = "529992213021"; // lada 52 + número sin espacios

export const mainAddress =
  "C. 20 251-Local 9, entre 10 y 15, Fraccionamiento Altabrisa, 97130 Mérida, Yuc.";
export const mainAddressShort = "C.20 #251 Frac. Altabrisa, Mérida";

export const emailMain = "estefaniaborges.derma@gmail.com";

export const googleProfile = "https://share.google/HfPkNGvUKMkqxHdiu";
export const mapsLinkMain = "https://maps.app.goo.gl/aGnKcnuMojufXUo38";

export const whatsappMessage =
  "Hola, vi su página web y quisiera agendar una consulta dermatológica.";
export const whatsappLinkMain = `https://api.whatsapp.com/send?phone=${numberMainRaw}&text=${encodeURIComponent(
  whatsappMessage
)}`;

export const doctoraliaUrl =
  "https://www.doctoralia.com.mx/mariana-estefania-garcia-borges-2/dermatologo/yucatan";

export const credentialUrl =
  "https://www.consejomexicanodermatologia.org.mx/miembros/dermatologia/item/dra-mariana-estefania-garcia-borges?category_id=23";

export const googleMapsEmbedSrc =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8098.894030569736!2d-89.59418694315481!3d21.020613550273655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f56779bac8f87d1%3A0x2bc4da0bb4d62d7c!2sDra.%20Estefania%20Borges%20Dermat%C3%B3loga!5e0!3m2!1ses-419!2smx!4v1781652609779!5m2!1ses-419!2smx";

export const consultationPrice = "$1,100 MXN";

/**
 * Build a WhatsApp URL with UTM parameters.
 * @param {Object} params
 * @param {string} params.medium — required UTM medium (e.g. "header", "footer")
 * @param {string} [params.source="web"]
 * @param {string} [params.campaign="agendar"]
 */
export function getWhatsAppUrl({ medium, source = "web", campaign = "agendar" }) {
  return `${whatsappLinkMain}&utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}`;
}

/**
 * Build a tel: URL from a formatted Mexican number.
 * @param {string} [number=numberMain]
 */
export function getTelUrl(number = numberMain) {
  return `tel:+52-${number.replace(/\s/g, "")}`;
}
