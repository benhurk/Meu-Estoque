import styles from './ListButtons.module.css';

import { FormMode } from '../../types/FormTypes';
import RemoveMultipleButton from '../RemoveMultipleButton';

type Props = {
    setFormMode: (mode: FormMode) => void;
    openFormFn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ListButtons({ setFormMode, openFormFn }: Props) {
    return (
        <>
            <div className={styles.wraper}>
                <button
                    type='button'
                    className='btn btn-dark'
                    onClick={() => {
                        setFormMode('add');
                        openFormFn(true);
                    }}>
                    <i className='bi bi-plus-lg' />
                    &nbsp;Adicionar item
                </button>
                <RemoveMultipleButton />
            </div>
        </>
    );
}
