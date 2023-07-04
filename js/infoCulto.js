const infoCulto = () => {
    const day = moment().day();
    const today = moment().format('DD/MM/YYYY')

    const cultoDoDia = [
        {
            title: `Culto da Família - ${today}`,
            alert_time: '17:50',
            privacity: 'Público'
        },
        {
            title: `Culto das Mulheres - ${today}`,
            alert_time: '19:20',
            privacity: 'Não Listado'
        },
        {
            title: `Sem Culto`,
            alert_time: null,
            privacity: '-'
        },
        {
            title: `Culto da Família - ${today}`,
            alert_time: '19:50',
            privacity: 'Não Listado'
        },
        {
            title: `Sem Culto`,
            alert_time: null,
            privacity: '-'
        },
        {
            title: `Sem Culto`,
            alert_time: null,
            privacity: '-'
        },
        {
            title: `Culto da Família - ${today}`,
            alert_time: '19:20',
            privacity: 'Não Listado'
        },
    ]

    return cultoDoDia[day]
}