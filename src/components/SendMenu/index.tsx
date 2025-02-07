import { useState } from 'react';
import styles from './SendMenu.module.css';

import SupportedPlatforms from '../../types/supportedPlatforms';
import SendButton from '../SendButton';
import SendModes from '../../types/SendModes';

type Props = {
    sendMode: SendModes;
    setOpenSendMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SendMenu({ sendMode, setOpenSendMenu }: Props) {
    const [sendVia, setSendVia] = useState<SupportedPlatforms>('whatsapp');
    const [initialMessage, setInitialMessage] = useState<string>('');

    const platformTextColorClass = (platform: SupportedPlatforms) => {
        switch (platform) {
            case 'whatsapp':
                return 'text-green';
            case 'telegram':
                return 'text-blue';
            case 'email':
                return 'text-red';
        }
    };

    return (
        <div className={styles.wraper}>
            <div>
                <span className={styles.platformSelectionLabel}>
                    Enviar via:&nbsp;
                    <span
                        className={`${
                            styles.platformName
                        } ${platformTextColorClass(sendVia)}`}>
                        {sendVia}
                    </span>
                </span>
                <div className={styles.platformSelectionWraper}>
                    <div className={styles.platformRadio}>
                        <input
                            name='send-via'
                            type='radio'
                            id='send-whatsapp'
                            checked={sendVia === 'whatsapp'}
                            onChange={() => setSendVia('whatsapp')}
                        />
                        <label
                            htmlFor='send-whatsapp'
                            className='bi bi-whatsapp text-green'
                        />
                    </div>
                    <div className={styles.platformRadio}>
                        <input
                            name='send-via'
                            type='radio'
                            id='send-telegram'
                            checked={sendVia === 'telegram'}
                            onChange={() => setSendVia('telegram')}
                        />
                        <label
                            htmlFor='send-telegram'
                            className='bi bi-telegram text-blue'
                        />
                    </div>
                    <div className={styles.platformRadio}>
                        <input
                            name='send-via'
                            type='radio'
                            id='send-email'
                            checked={sendVia === 'email'}
                            onChange={() => setSendVia('email')}
                        />
                        <label
                            htmlFor='send-email'
                            className='bi bi-envelope-fill text-red'
                        />
                    </div>
                </div>
                {sendVia != 'email' && (
                    <small className={`text-red ${styles.platformWarning}`}>
                        <i className='bi bi-exclamation-circle-fill text-red' />
                        &nbsp;Certifique-se que o
                        <span className={`text-red ${styles.platformName}`}>
                            &nbsp;{sendVia}
                        </span>{' '}
                        esteja instalado no seu dispositivo.
                    </small>
                )}
            </div>
            <textarea
                className='input'
                value={initialMessage}
                onChange={(e) => setInitialMessage(e.target.value)}
                placeholder='Escreva uma mensagem para aparecer antes da sua lista. (Opcional)'
            />
            <SendButton
                initialMessage={initialMessage}
                sendVia={sendVia}
                sendMode={sendMode}
                setOpenSendMenu={setOpenSendMenu}
            />
        </div>
    );
}
