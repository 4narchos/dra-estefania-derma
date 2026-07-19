import { socialLinks } from "./socialLinks.js";
import {
  numberMain,
  numberMainRaw,
  getWhatsAppUrl,
  whatsappPresets,
  getTelUrl,
  doctoraliaUrl,
} from "./site.js";

const instagramLink = socialLinks.find((s) => s.icon === "instagram");

export const linkCategories = {
  CONTACT: "contacto",
  SOCIAL: "social",
  AGENDA: "agenda",
  PROFESIONAL: "profesional",
};

export const links = [
  {
    title: "WhatsApp",
    url: getWhatsAppUrl(whatsappPresets.webLinktree),
    icon: "💬",
    category: linkCategories.CONTACT,
    highlighted: true,
    description: "Agenda tu cita por WhatsApp",
  },
  {
    title: "Llamar",
    url: getTelUrl(numberMain),
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
