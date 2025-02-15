import { ClipLoader } from 'react-spinners';
import styles from './Loader.module.css';

export default function Loader() {
    return (
        <div className={styles.wraper}>
            <ClipLoader />
        </div>
    );
}
