const cultosPorDiaDaSemana = {
  0: { nome: "Culto da Família", horarioAlerta: "17:54", privacidade: "Público" },
  1: { nome: "Culto das Mulheres", horarioAlerta: "19:24", privacidade: "Não listado" },
  3: { nome: "Culto da Família", horarioAlerta: "19:54", privacidade: "Público" },
  6: { nome: "Culto dos Jovens", horarioAlerta: "19:24", privacidade: "Público" },
};

function obterInfoCulto(data = moment(), diaSemana = data.day()) {
  const dia = diaSemana ?? data.day();
  const diasDesdeOCulto = (data.day() - dia + 7) % 7;
  const dataDoCulto = data.clone().subtract(diasDesdeOCulto, "days");
  const culto = cultosPorDiaDaSemana[dia];

  if (!culto) {
    return { titulo: "Sem Culto", horarioAlerta: "", privacidade: "-" };
  }

  return {
    titulo: `${culto.nome} - ${dataDoCulto.format("DD/MM/YYYY")}`,
    horarioAlerta: culto.horarioAlerta,
    privacidade: culto.privacidade,
  };
}

function obterDiaSemanaSimulado() {
  const valorArmazenado = localStorage.getItem("diaSemanaSimulado");

  if (valorArmazenado === null) return null;

  const diaSemana = Number(valorArmazenado);

  return Number.isInteger(diaSemana) && diaSemana >= 0 && diaSemana <= 6
    ? diaSemana
    : null;
}

const ambienteDeDesenvolvimento =
  ["", "localhost", "127.0.0.1"].includes(window.location.hostname) ||
  /^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[0-1])\.)/.test(
    window.location.hostname
  );

if (ambienteDeDesenvolvimento) {
  window.simularDiaDaSemana = function (diaSemana) {
    const dia = Number(diaSemana);

    if (!Number.isInteger(dia) || dia < 0 || dia > 6) {
      throw new Error("Informe um dia da semana entre 0 (domingo) e 6 (sábado).");
    }

    localStorage.setItem("diaSemanaSimulado", dia);
    window.location.reload();
  };

  window.limparSimulacaoDiaDaSemana = function () {
    localStorage.removeItem("diaSemanaSimulado");
    window.location.reload();
  };
}
