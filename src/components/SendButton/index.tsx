import useListStore from '../../stores/listStore';
import SupportedPlatforms from '../../types/supportedPlatforms';

type Props = {
    sendMode: 'all' | 'warned' | 'selected';
    sendVia: SupportedPlatforms;
    initialMessage: string;
    setOpenSendMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SendButton({
    sendMode,
    sendVia,
    initialMessage,
    setOpenSendMenu,
}: Props) {
    const listItems = useListStore((state) => state.items);
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

    const send = (sendMode: 'all' | 'warned' | 'selected') => {
        let message = initialMessage && `${initialMessage}%0a%0a`;
        const items =
            sendMode === 'all'
                ? listItems
                : sendMode === 'warned'
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

            message += sendMode === 'warned' ? warnedItemsLine : allItemsLine;
        });

        if (sendVia != 'email') {
            window.location.href = url(sendVia, message);
        } else {
            window.open(url(sendVia, message));
        }

        setOpenSendMenu(false);
    };

    return (
        <button
            type='button'
            className='btn btn-dark'
            disabled={listItems.length > 0 ? false : true}
            onClick={() => send(sendMode)}
            style={{ display: 'block', width: '100%', textAlign: 'center' }}>
            <i className='bi bi-send-fill' />
            &nbsp;Enviar lista
        </button>
    );
}
