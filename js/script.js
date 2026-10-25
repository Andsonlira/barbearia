/*
  PERSONALIZAÇÃO — BARBEARIA DO GAZÃO
  WhatsApp em formato internacional: código do país + DDD + número, somente dígitos.
  O formulário abre o WhatsApp com o pedido preenchido; a equipe confirma a disponibilidade.
*/
const BARBEARIA = {
  nome: "Barbearia do Gazão",
  whatsapp: "5573981375362",
  telefoneExibicao: "(73) 98137-5362",
  endereco: "Rua 13 de Maio, Nº 2, bairro Conceição, Itabuna - BA",
  horario: "Consulte os horários disponíveis pelo WhatsApp",
  instagram: "https://www.instagram.com/ag_solutions2/",
  facebook: "https://facebook.com/",
  precos: {
    corte: "R$ 35,00",
    barba: "R$ 25,00",
    combo: "R$ 55,00"
  },
  localizacaoMapa: "Rua 13 de Maio, Nº 2, bairro Conceição, Itabuna, Bahia, Brasil"
};

const $ = (selector) => document.querySelector(selector);

function configurarInformacoes() {
  document.title = `${BARBEARIA.nome} | Estilo, precisão e atitude`;
  document.querySelectorAll(".brand-name").forEach((el) => {
    el.innerHTML = `<strong>BARBEARIA</strong> DO GAZÃO`;
  });

  $("#phoneText").textContent = BARBEARIA.telefoneExibicao;
  $("#addressText").textContent = BARBEARIA.endereco;
  $("#hoursText").textContent = BARBEARIA.horario;
  $("#phoneLink").href = `https://wa.me/${BARBEARIA.whatsapp}`;
  $("#floatingWhatsApp").href = `https://wa.me/${BARBEARIA.whatsapp}`;
  $("#instagramLink").href = BARBEARIA.instagram;
  $("#instagramLink").textContent = "Instagram @ag_solutions2 ↗";
  $("#facebookLink").href = BARBEARIA.facebook;

  const query = encodeURIComponent(BARBEARIA.localizacaoMapa);
  $("#mapFrame").src = `https://maps.google.com/maps?q=${query}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  $("#directionsLink").href = `https://www.google.com/maps/search/?api=1&query=${query}`;
  $("#addressText").textContent = BARBEARIA.endereco;

  document.querySelectorAll("[data-price]").forEach((el) => {
    const key = el.dataset.price;
    if (BARBEARIA.precos[key]) el.textContent = BARBEARIA.precos[key];
  });

  // Use the current brand name in relevant text.
  document.querySelectorAll(".intro-copy strong").forEach((el) => {
    if (el.textContent.toLowerCase().includes("sua barbearia")) {
      el.textContent = BARBEARIA.nome;
    }
  });

  $("#year").textContent = new Date().getFullYear();
}

function configurarMenu() {
  const toggle = $("#menuToggle");
  const nav = $("#navLinks");

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menu");
    });
  });
}

function configurarAtalhosDeServico() {
  document.querySelectorAll("[data-service]").forEach((link) => {
    link.addEventListener("click", () => {
      $("#serviceSelect").value = link.dataset.service;
    });
  });
}

function configurarFormulario() {
  const dateInput = $("#bookingDate");
  const hoje = new Date();
  const dataLocal = new Date(hoje.getTime() - hoje.getTimezoneOffset() * 60000)
    .toISOString().split("T")[0];
  dateInput.min = dataLocal;

  $("#bookingForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = $("#clientName").value.trim();
    const telefone = $("#clientPhone").value.trim();
    const servico = $("#serviceSelect").value;
    const data = $("#bookingDate").value;
    const horario = $("#bookingTime").value;
    const profissional = $("#barberSelect").value;
    const observacoes = $("#clientMessage").value.trim();

    if (!nome || !telefone || !servico || !data || !horario) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const [ano, mes, dia] = data.split("-");
    const dataFormatada = `${dia}/${mes}/${ano}`;
    const mensagem = [
      `Olá! Gostaria de solicitar um agendamento na ${BARBEARIA.nome}.`,
      "",
      `*Nome:* ${nome}`,
      `*Telefone:* ${telefone}`,
      `*Serviço:* ${servico}`,
      `*Data desejada:* ${dataFormatada}`,
      `*Horário desejado:* ${horario}`,
      `*Profissional:* ${profissional}`,
      observacoes ? `*Observações:* ${observacoes}` : "",
      "",
      "Por favor, confirme se esse horário está disponível."
    ].filter(Boolean).join("\n");

    window.open(
      `https://wa.me/${BARBEARIA.whatsapp}?text=${encodeURIComponent(mensagem)}`,
      "_blank",
      "noopener,noreferrer"
    );
  });
}

configurarInformacoes();
configurarMenu();
configurarAtalhosDeServico();
configurarFormulario();
