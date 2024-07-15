function mostrarNotificacao() {
  if ("Notification" in window) {
    // Verifica se as notificações são suportadas pelo navegador

    if (Notification.permission === "granted") {
      // Se a permissão já foi concedida, exibe a notificação
      const notification = new Notification("Checklist Live IBA", {
        body: "A live está prestes a iniciar.",
      });
    } else if (Notification.permission !== "denied") {
      // Se a permissão não foi negada, solicita a permissão do usuário
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          // Se a permissão for concedida, exibe a notificação
          const notification = new Notification("Checklist Live IBA", {
            body: "A live está prestes a iniciar.",
          });
        }
      });
    }
  }
}
