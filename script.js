// Datos de las tarjetas
const cardsData = [
  {
    title: "Requisitos Funcionales",
    description:
      "Un requisito funcional es una descripción específica de lo que un sistema, software, producto o servicio debe hacer para cumplir con los objetivos establecidos y satisfacer las necesidades de los usuarios o del negocio.",
    image: "📋",
  },
  {
    title: "Requisitos No Funcionales",
    description:
      "Los requisitos no funcionales, son características y criterios que describen cómo debe ser el rendimiento, la seguridad, la usabilidad y otros aspectos de un sistema o software más allá de su funcionalidad básica.",
    image: "📋",
  },
  {
    title: "Técnicas de Recolección de Información",
    description:
      "Herramientas clave para conocer las necesidades del cliente: Entrevistas (conversaciones directas), Encuestas (cuestionarios), Observación (análisis del entorno de trabajo), Workshops (sesiones colaborativas), Prototipado (modelos tempranos del sistema) y Análisis documental. Se elige según el contexto y tipo de información requerida.",
    image: "🔍",
  },
  {
    title: "Roles en un Proyecto de Software",
    description:
      "Cada rol cumple una función clave: Product Owner (prioriza requerimientos), Scrum Master (facilita el proceso ágil), Desarrolladores (programan la solución), Arquitecto (diseña la estructura), Tester/QA (verifica la calidad), UI/UX Designer (mejora la experiencia de usuario), DevOps (gestiona infraestructura) y Analista de Negocio (traduce necesidades del negocio).",
    image: "👥",
  },
  {
    title: "Metodología Tradicional - Cascada",
    description:
      "Modelo lineal donde cada fase sigue a la anterior: Análisis → Diseño → Implementación → Pruebas → Despliegue → Mantenimiento. Ventajas: estructura clara y buena documentación. Desventajas: poca flexibilidad y entregas tardías. Ideal para proyectos con requisitos fijos y bien definidos.",
    image: "🏗️",
  },
  {
    title: "Metodología Ágil - Scrum",
    description:
      "Enfoque iterativo y flexible que trabaja por sprints (de 1 a 4 semanas). Roles: Product Owner, Scrum Master, Equipo de Desarrollo. Eventos: Sprint Planning, Daily Scrum, Sprint Review, Retrospective. Artefactos: Product Backlog, Sprint Backlog, Incremento. Ventajas: adaptabilidad, entregas continuas, mejora constante.",
    image: "🔄",
  },
  {
    title: "Diagramas de Caso de Uso",
    description:
      "Representación visual de las interacciones entre actores (usuarios o sistemas externos) y el sistema. Muestran qué funciones realiza cada actor. Elementos: Actor, Caso de Uso, Relaciones (include, extend, generalización). Ejemplo: Actor 'Cliente' puede ‘Hacer Pedido’, ‘Ver Historial’ y ‘Pagar Orden’.",
    image: "📊",
  },
  {
    title: "Base de Datos",
    description:
      "Sistema para almacenar, organizar y acceder a la información. Tipos: Relacionales (SQL - con tablas y relaciones), NoSQL (más flexibles, como documentos o grafos). Elementos: Tablas, Campos, Registros, Claves, Índices. Operaciones CRUD: Create (crear), Read (leer), Update (actualizar), Delete (eliminar). Ejemplo: tabla 'Usuarios' con id, nombre y correo.",
    image: "🗄️",
  },
];

let currentCardIndex = 0;

// Elementos del DOM
const aiBox = document.getElementById("aiBox");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeBtn");
const cardIcon = document.getElementById("cardIcon");
const cardTitle = document.getElementById("cardTitle");
const cardDescription = document.getElementById("cardDescription");
const prevArrow = document.getElementById("prevArrow");
const nextArrow = document.getElementById("nextArrow");
const indicators = document.getElementById("indicators");

// Crear partículas de fondo
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 6 + "s";
    particle.style.animationDuration = Math.random() * 3 + 3 + "s";
    particlesContainer.appendChild(particle);
  }
}

// Crear indicadores
function createIndicators() {
  indicators.innerHTML = "";
  cardsData.forEach((_, index) => {
    const indicator = document.createElement("div");
    indicator.className = "indicator";
    if (index === currentCardIndex) {
      indicator.classList.add("active");
    }
    indicators.appendChild(indicator);
  });
}

// Actualizar tarjeta
function updateCard() {
  const card = cardsData[currentCardIndex];
  cardIcon.style.opacity = "0";
  cardTitle.style.opacity = "0";
  cardDescription.style.opacity = "0";

  setTimeout(() => {
    cardIcon.textContent = card.image;
    cardTitle.textContent = card.title;
    cardDescription.textContent = card.description;
    cardIcon.style.opacity = "1";
    cardTitle.style.opacity = "1";
    cardDescription.style.opacity = "1";

    // Actualizar indicadores
    const allIndicators = indicators.querySelectorAll(".indicator");
    allIndicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentCardIndex);
    });
  }, 150);
}

// Abrir modal
function openModal() {
  modal.classList.add("active");
  updateCard();
  createIndicators();
  document.body.style.overflow = "hidden";
}

// Cerrar modal
function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Navegación
function nextCard() {
  currentCardIndex = (currentCardIndex + 1) % cardsData.length;
  updateCard();
}

function prevCard() {
  currentCardIndex =
    (currentCardIndex - 1 + cardsData.length) % cardsData.length;
  updateCard();
}

// Event listeners
aiBox.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
nextArrow.addEventListener("click", nextCard);
prevArrow.addEventListener("click", prevCard);

// Cerrar modal al hacer clic fuera
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Navegación con teclado
document.addEventListener("keydown", (e) => {
  if (modal.classList.contains("active")) {
    if (e.key === "ArrowRight") nextCard();
    if (e.key === "ArrowLeft") prevCard();
    if (e.key === "Escape") closeModal();
  }
});

// Inicializar
createParticles();
