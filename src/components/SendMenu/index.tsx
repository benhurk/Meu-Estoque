import SendButton from '../SendButton';

export default function SendMenu() {
    return (
        <div className='d-flex justify-content-center gap-2'>
            <SendButton sendMode='all' />
            <SendButton sendMode='warn' />
        </div>
    );
}
