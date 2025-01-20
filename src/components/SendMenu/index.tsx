import { useState } from 'react';
import SupportedPlatforms from '../../types/supportedPlatforms';
import SendButton from '../SendButton';

export default function SendMenu() {
    const [sendVia, setSendVia] = useState<SupportedPlatforms>('whatsapp');
    const [initialMessage, setInitialMessage] = useState<string>('');

    return (
        <div>
            <div className='mb-3'>
                <span className='d-block fs-5 mb-2 text-center'>
                    Enviar via:{' '}
                    <span className='text-primary text-capitalize'>
                        {sendVia}
                    </span>
                </span>
                <div className='d-flex justify-content-center gap-4'>
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
                            className='bi bi-whatsapp form-check-label fs-4'
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
                            className='bi bi-telegram form-check-label fs-4'
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
                            className='bi bi-envelope-fill form-check-label fs-4'
                        />
                    </div>
                </div>
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
                    sendMode='all'
                />
                <SendButton
                    initialMessage={initialMessage}
                    sendVia={sendVia}
                    sendMode='warn'
                />
                <SendButton
                    initialMessage={initialMessage}
                    sendVia={sendVia}
                    sendMode='selected'
                />
            </div>
        </div>
    );
}
