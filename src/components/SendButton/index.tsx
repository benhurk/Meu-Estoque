import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import SupportedPlatforms from '../../types/supportedPlatforms';

type Props = {
    sendMode: 'all' | 'warn';
    sendVia: SupportedPlatforms;
    sendTo: string;
};

export default function SendButton({ sendMode, sendVia, sendTo }: Props) {
    const listItems = useSelector((state: RootState) => state.list.items);
    const warnedItems = listItems.filter(
        (item) => item.quantity <= item.alertQuantity
    );

    /*
        LINKS:
        TELEGRAM:
            CHOSE IN APP: `tg://msg_url?url=+&text=${message}`
            SPECIFIED CONTACT: `tg://resolve?domain=${sendTo}&text=${message}`
    */

    const url = (platform: SupportedPlatforms, message: string) => {
        switch (platform) {
            case 'whatsapp':
                return `whatsapp://send?phone=&text=${message}`;
            case 'telegram':
                return `tg://msg_url?url=+&text=${message}`;
            case 'email':
            case 'messenger':
                return `m.me/PAGE-NAME?text=${message}`;
        }
    };

    const send = (sendMode: 'all' | 'warn') => {
        let message = '';
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

        window.open(url(sendVia, message));
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
