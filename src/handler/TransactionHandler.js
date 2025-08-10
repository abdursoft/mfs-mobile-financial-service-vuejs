// set transaction type of text 
function setTransactionText(transaction, authStore) {
    if(authStore.authUser?.id === transaction.from_user_id && transaction.type === 'transfer') {
        return 'Sent';
    } else if(authStore.authUser?.id === transaction.to_user_id && transaction.type === 'transfer') {
        return `Received`;
    } else {
        return transaction.type.chartAt(0).toUpperCase() + transaction.type.slice(1);
    }
}

export {setTransactionText};