import { useState } from 'react';
import SupportedPlatforms from '../../types/supportedPlatforms';
import SendButton from '../SendButton';

type Props = {
    sendMode: 'all' | 'warned' | 'selected';
    setOpenSendMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SendMenu({ sendMode, setOpenSendMenu }: Props) {
    const [sendVia, setSendVia] = useState<SupportedPlatforms>('whatsapp');
    const [initialMessage, setInitialMessage] = useState<string>('');

    const platformTextColorClass = (platform: SupportedPlatforms) => {
        switch (platform) {
            case 'whatsapp':
                return 'text-success';
            case 'telegram':
                return 'text-primary';
            case 'email':
                return 'text-danger';
        }
    };

    return (
        <div>
            <div className='mb-4'>
                <span className='d-block fs-5 mb-2 text-center'>
                    Enviar via:&nbsp;
                    <span
                        className={`text-capitalize ${platformTextColorClass(
                            sendVia
                        )}`}>
                        {sendVia}
                    </span>
                </span>
                <div className='d-flex justify-content-center gap-5'>
                    <div className='d-flex align-items-center gap-2'>
                        <input
                            className='form-check-input'
                            name='send-via'
                            type='radio'
                            id='send-whatsapp'
                            checked={sendVia === 'whatsapp'}
                            onChange={() => setSendVia('whatsapp')}
                        />
                        <label
                            htmlFor='send-whatsapp'
                            className='bi bi-whatsapp form-check-label fs-4 text-success'
                        />
                    </div>
                    <div className='d-flex align-items-center gap-2'>
                        <input
                            className='form-check-input'
                            name='send-via'
                            type='radio'
                            id='send-telegram'
                            checked={sendVia === 'telegram'}
                            onChange={() => setSendVia('telegram')}
                        />
                        <label
                            htmlFor='send-telegram'
                            className='bi bi-telegram form-check-label fs-4 text-primary'
                        />
                    </div>
                    <div className='d-flex align-items-center gap-2'>
                        <input
                            className='form-check-input'
                            name='send-via'
                            type='radio'
                            id='send-email'
                            checked={sendVia === 'email'}
                            onChange={() => setSendVia('email')}
                        />
                        <label
                            htmlFor='send-email'
                            className='bi bi-envelope-fill form-check-label fs-4 text-danger'
                        />
                    </div>
                </div>
                {sendVia != 'email' && (
                    <small className='d-block text-center text-danger mt-1'>
                        <i className='bi bi-exclamation-circle-fill' />
                        &nbsp;Certifique-se que o
                        <span className='text-capitalize'>
                            &nbsp;{sendVia}
                        </span>{' '}
                        esteja instalado no seu dispositivo.
                    </small>
                )}
            </div>
            <textarea
                className='form-control mb-4'
                value={initialMessage}
                onChange={(e) => setInitialMessage(e.target.value)}
                placeholder='Escreva uma mensagem para aparecer antes da sua lista. (Opcional)'
                style={{ resize: 'none', height: '7rem' }}
            />
            <div className='d-flex justify-content-center gap-2'>
                <SendButton
                    initialMessage={initialMessage}
                    sendVia={sendVia}
                    sendMode={sendMode}
                    setOpenSendMenu={setOpenSendMenu}
                />
            </div>
        </div>
    );
}
