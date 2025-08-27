// set transaction type of text 
function setTransactionText(transaction, authStore) {

    if(authStore.authUser?.id === transaction.from_user_id && transaction.type === 'transfer') {
        return 'Send Money';
    } else if(authStore.authUser?.id === transaction.to_user_id && transaction.type === 'transfer') {
        return `Received Money`;
    }else if(authStore.authUser?.id === transaction.to_user_id && transaction.type === 'cash_out') {
        return `Received Cash Out`;
    }else if(authStore.authUser?.id === transaction.from_user_id && transaction.type === 'cash_out') {
        return `Cash Out`;
    }else if(authStore.authUser?.id === transaction.to_user_id && transaction.type === 'payment') {
        return `Received Payment`;
    }else if(authStore.authUser?.id === transaction.to_user_id && transaction.type === 'cash_in') {
        return `Received Cash In`;
    }else if(authStore.authUser?.id === transaction.from_user_id && transaction.type === 'cash_in') {
        return `Charge Cash In`;
    }else if(authStore.authUser?.id === transaction.from_user_id && transaction.type === 'payment') {
        return `Paid`;
    } else {
        return transaction?.type?.toUpperCase() || 'Unknown';
    }
}

export {setTransactionText};