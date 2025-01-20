import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import SupportedPlatforms from '../../types/supportedPlatforms';

type Props = {
    sendMode: 'all' | 'warn' | 'selected';
    sendVia: SupportedPlatforms;
    initialMessage: string;
};

export default function SendButton({
    sendMode,
    sendVia,
    initialMessage,
}: Props) {
    const listItems = useSelector((state: RootState) => state.list.items);
    const warnedItems = listItems.filter(
        (item) => item.quantity <= item.alertQuantity
    );
    const selectedItems = listItems.filter((item) => item.selected === true);

    const date = new Date().toLocaleDateString();

    const url = (platform: SupportedPlatforms, message: string) => {
        switch (platform) {
            case 'whatsapp':
                return `whatsapp://send?phone=&text=${message}`;
            case 'telegram':
                return `tg://msg_url?url=+&text=${message}`;
            case 'email':
                return `mailto:?subject=Estoque+${date}&body=${message}`;
        }
    };

    const send = (sendMode: 'all' | 'warn' | 'selected') => {
        let message = initialMessage && `${initialMessage}%0a%0a`;
        const items =
            sendMode === 'all'
                ? listItems
                : sendMode === 'warn'
                ? warnedItems
                : selectedItems;

        items.forEach((item) => {
            const optionsQuantity = item.options[item.quantity];

            const allItemsLine = `• ${
                item.quantity <= item.alertQuantity ? '⚠' : '✅'
            } ${item.name}:   ${
                item.qtdType === 'number' ? item.quantity : optionsQuantity
            } ${item.qtdType === 'number' ? item.numberOf : ''}%0a`;

            const warnedItemsLine = `• ${item.name}:    ${
                item.qtdType === 'number'
                    ? item.quantity + item.numberOf
                    : optionsQuantity
            }%0a`;

            message += sendMode === 'warn' ? warnedItemsLine : allItemsLine;
        });

        if (sendVia != 'email') {
            window.location.href = url(sendVia, message);
        } else {
            window.open(url(sendVia, message));
        }
    };

    if (sendMode === 'all') {
        return (
            <button
                type='button'
                className='btn btn-dark'
                disabled={listItems.length > 0 ? false : true}
                onClick={() => send(sendMode)}>
                <i className='bi bi-send-fill' />
                &nbsp;Tudo
            </button>
        );
    }

    if (sendMode === 'warn') {
        return (
            <button
                type='button'
                className='btn btn-danger'
                disabled={warnedItems.length > 0 ? false : true}
                onClick={() => send(sendMode)}>
                <i className='bi bi-send-exclamation-fill' />
                &nbsp;Importantes
            </button>
        );
    }

    if (sendMode === 'selected') {
        return (
            <button
                type='button'
                className='btn btn-primary'
                disabled={selectedItems.length > 0 ? false : true}
                onClick={() => send(sendMode)}>
                <i className='bi bi-send-check-fill' />
                &nbsp;Selecionados
            </button>
        );
    }
}
