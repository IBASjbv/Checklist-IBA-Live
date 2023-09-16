function mostrarNotificacao() {
    console.log('Notify')
    if ('Notification' in window) {
        // Verifica se as notificações são suportadas pelo navegador

        if (Notification.permission === 'granted') {
            // Se a permissão já foi concedida, exibe a notificação
            const notification = new Notification('Título da Notificação', {
                body: 'Este é o corpo da notificação.'
            });
        } else if (Notification.permission !== 'denied') {
            // Se a permissão não foi negada, solicita a permissão do usuário
            Notification.requestPermission().then(function (permission) {
                if (permission === 'granted') {
                    // Se a permissão for concedida, exibe a notificação
                    const notification = new Notification('Título da Notificação', {
                        body: 'Este é o corpo da notificação.'
                    });
                }
            });
        }
    }
}