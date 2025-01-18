import { useSelector } from 'react-redux';
import { RootState } from '../../store';

type Props = {
    sendMode: 'all' | 'warn';
};

export default function SendButton({ sendMode }: Props) {
    const listItems = useSelector((state: RootState) => state.list.items);
    const warnedItems = listItems.filter(
        (item) => item.quantity <= item.alertQuantity
    );

    const url = (message: string) => `whatsapp://send?phone=&text=${message}`;

    const send = (sendMode: 'all' | 'warn') => {
        let message = '';
        const items = sendMode === 'all' ? listItems : warnedItems;

        items.forEach((item) => {
            const optionsQuantity = item.options[item.quantity];

            const allItemsLine = `*• ${
                item.quantity <= item.alertQuantity ? '⚠' : '✅'
            } ${item.name}:* ${
                item.qtdType === 'number' ? item.quantity : optionsQuantity
            } ${item.qtdType === 'number' ? item.numberOf : ''}%0a`;

            const warnedItemsLine = `*• ${item.name}* (${
                item.qtdType === 'number'
                    ? item.quantity + ' un.'
                    : optionsQuantity
            })%0a`;

            message += sendMode === 'all' ? allItemsLine : warnedItemsLine;
        });

        window.open(url(message));
    };

    if (sendMode === 'all') {
        return (
            <button
                type='button'
                className='btn btn-dark'
                disabled={listItems.length > 0 ? false : true}
                data-dismiss='modal'
                onClick={() => send(sendMode)}>
                <i className='bi bi-send-fill' />
                &nbsp;Enviar tudo
            </button>
        );
    }

    if (sendMode === 'warn') {
        return (
            <button
                type='button'
                className='btn btn-danger'
                disabled={warnedItems.length > 0 ? false : true}
                data-dismiss='modal'
                onClick={() => send(sendMode)}>
                <i className='bi bi-send-exclamation-fill' />
                &nbsp;Enviar importantes
            </button>
        );
    }
}
