export default sale =>{
    switch (sale.status) {
        case 0:
            return 'Aberta'
        case 1:
            return 'Ag. Pagamento'
        case 2:
            return 'Pagmt. Efetuado'
        case 3:
            return 'Pagmt. Confirmado'
        case 4:
            return 'Finalizado'
        default:
            break;
    }
}