import { useSelector } from "react-redux";
import { RootState } from "../../store";
import abstractSwitch from "../../utils/abstractSwitch";

type Props = {
    sendMode: 'all' | 'warn';
}

export default function SendButton({ sendMode }: Props) {
    const listItems = useSelector((state: RootState) => state.list.items);
    const warnedItems = listItems.filter(item => item.quantity <= item.alertQuantity);

    const url = (message: string) => `whatsapp://send?phone=&text=${message}`;

    const sendAll = () => {
        let message = '';
    
        listItems.forEach(item => {
            const abstractQuantity = abstractSwitch(item);
    
            const itemMessage = `*• ${item.quantity <= item.alertQuantity ? '⚠' : '✅'} ${item.name}:* ${item.qtdType === 'unity' ? item.quantity : abstractQuantity} ${item.qtdType === 'unity' ? 'un.' : ''}%0a`;
    
            message += itemMessage;
        })

        window.open(url(message));
    }

    const sendImportant = () => {
        let message = '⚠   *Precisa de:*   ⚠%0a%0a';
    
        warnedItems.forEach(item => {
            const abstractQuantity = abstractSwitch(item);
    
            const itemMessage = `*• ${item.name}* (${item.qtdType === 'unity' ? item.quantity + ' un.' : abstractQuantity})%0a`;
    
            message += itemMessage;
        })
    
        window.open(url(message));
    }

    if (sendMode === 'all') {
        return (
            <button type="button" className="btn btn-dark" disabled={listItems.length > 0 ? false : true} data-dismiss="modal" onClick={() => sendAll()}>
                <i className="bi bi-send-fill" />
                &nbsp;Enviar tudo
            </button>
        )
    }

    if (sendMode === 'warn') {
        return (
            <button type="button" className="btn btn-danger" disabled={warnedItems.length > 0 ? false : true} data-dismiss="modal" onClick={() => sendImportant()}>
                <i className="bi bi-send-exclamation-fill" />
                &nbsp;Enviar importantes
            </button>
        )
    }
}