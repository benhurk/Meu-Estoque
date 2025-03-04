import { useMemo } from 'react';

import useUserData from '../../hooks/useUserData';

import SupportedPlatforms from '../../types/supportedPlatforms';
import SendModes from '../../types/SendModes';

import abbreviateUnitOfMeasurement from '../../utils/abbreviateUnitOfMeasurement';
import { defaultQuantityOptions } from '../../consts/quantityOptions';

type Props = {
    sendMode: SendModes;
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
    const { items: listItems } = useUserData();
    const warnedItems = useMemo(() => {
        return listItems.filter((item) => item.quantity <= item.alertQuantity);
    }, [listItems]);
    const selectedItems = useMemo(() => {
        return listItems.filter((item) => item.selected === true);
    }, [listItems]);

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

    const defaultMessage = (sendMode: SendModes) => {
        switch (sendMode) {
            case 'all':
                return `Estoque ${date}:%0a%0a`;
            case 'warned':
                return '❗ Itens em falta ❗%0a%0a';
            case 'selected':
                return '';
        }
    };

    const send = (sendMode: SendModes) => {
        let message = initialMessage
            ? `${initialMessage}%0a%0a`
            : defaultMessage(sendMode);
        const items =
            sendMode === 'all'
                ? listItems
                : sendMode === 'warned'
                ? warnedItems
                : selectedItems;

        items.forEach((item) => {
            const optionsQuantity =
                item.quantityType === 'options' &&
                defaultQuantityOptions[item.quantity].label;

            const allItemsLine = `• ${
                item.quantity <= item.alertQuantity ? '⚠' : '✅'
            } ${item.name}: ${
                item.quantityType === 'number'
                    ? item.quantity +
                      ' ' +
                      abbreviateUnitOfMeasurement(item.unitOfMeasurement)
                    : optionsQuantity
            }%0a`;

            const warnedItemsLine = `• ${item.name} (${
                item.quantityType === 'number'
                    ? item.quantity +
                      ' ' +
                      abbreviateUnitOfMeasurement(item.unitOfMeasurement)
                    : optionsQuantity
            })%0a`;

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
            &nbsp;
            {sendMode === 'all'
                ? 'Enviar lista'
                : sendMode === 'selected'
                ? 'Enviar itens selecionados'
                : 'Enviar itens com alerta'}
        </button>
    );
}
