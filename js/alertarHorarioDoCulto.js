const horarioDeAlertaDosCultos = () => {
    const day = moment().day();

    // Domingo - Culto às 18h
    if (day == 0)
        return '17:50'

    // Quarta - Culto às 20h
    if (day == 3)
        return '19:50'

    // Segundas e Sábados - Culto às 19h30
    if (day == 1 || day == 6)
        return '19:20'

    return null
}