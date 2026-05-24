export const whatsappNumber = "529992213021";

export const whatsappMessage = encodeURIComponent(
  "Hola, vi su página web y quisiera agendar una consulta dermatológica."
);

export const whatsappBaseUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${whatsappMessage}`;

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
    description: "999 221 3021",
  },
  {
    title: "Doctoralia",
    url: "https://www.doctoralia.com.mx/mariana-estefania-garcia-borges-2/dermatologo/yucatan",
    icon: "🏥",
    category: linkCategories.AGENDA,
    description: "Agenda cita en Doctoralia",
  },
  {
    title: "Instagram",
    url: "https://instagram.com/dra.estefaniaderma",
    icon: "📸",
    category: linkCategories.SOCIAL,
    description: "@dra.estefaniaderma",
  },
  {
    title: "Perfil profesional",
    url: "https://www.doctoralia.com.mx/mariana-estefania-garcia-borges-2/dermatologo/yucatan",
    icon: "👩‍⚕️",
    category: linkCategories.PROFESIONAL,
    description: "Ver perfil en Doctoralia",
  },
];
