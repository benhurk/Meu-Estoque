import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import SupportedPlatforms from '../../types/supportedPlatforms';

type Props = {
    sendMode: 'all' | 'warn';
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

    const send = (sendMode: 'all' | 'warn') => {
        let message = initialMessage && `${initialMessage}%0a%0a`;
        const items = sendMode === 'all' ? listItems : warnedItems;

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

            message += sendMode === 'all' ? allItemsLine : warnedItemsLine;
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
