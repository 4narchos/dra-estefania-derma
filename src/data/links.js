import { socialLinks } from "./socialLinks.js";
import {
  numberMain,
  numberMainRaw,
  whatsappMessage as baseWhatsAppMessage,
  whatsappLinkMain,
  doctoraliaUrl,
} from "./site.js";

const instagramLink = socialLinks.find((s) => s.icon === "instagram");

// Re-export with the historical names so existing imports keep working.
export const whatsappNumber = numberMainRaw;
export const whatsappMessage = baseWhatsAppMessage;
export const whatsappBaseUrl = whatsappLinkMain;

export const linkCategories = {
  CONTACT: "contacto",
  SOCIAL: "social",
  AGENDA: "agenda",
  PROFESIONAL: "profesional",
};

export const links = [
  {
    title: "WhatsApp",
    url: `${whatsappBaseUrl}&utm_source=web&utm_medium=linktree&utm_campaign=contacto`,
    icon: "💬",
    category: linkCategories.CONTACT,
    highlighted: true,
    description: "Agenda tu cita por WhatsApp",
  },
  {
    title: "Llamar",
    url: `tel:+52-${whatsappNumber.replace(/^52/, "")}`,
    icon: "📞",
    category: linkCategories.CONTACT,
    description: numberMain,
  },
  {
    title: "Doctoralia",
    url: doctoraliaUrl,
    icon: "🏥",
    category: linkCategories.AGENDA,
    description: "Agenda cita en Doctoralia",
  },
  {
    title: "Instagram",
    url: instagramLink?.url || "https://instagram.com/dra.estefaniaderma",
    icon: "📸",
    category: linkCategories.SOCIAL,
    description: instagramLink?.handle || "@dra.estefaniaderma",
  },
  {
    title: "Perfil profesional",
    url: doctoraliaUrl,
    icon: "👩‍⚕️",
    category: linkCategories.PROFESIONAL,
    description: "Ver perfil en Doctoralia",
  },
];
