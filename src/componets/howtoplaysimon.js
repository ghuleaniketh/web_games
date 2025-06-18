import styles from './help.module.css';
import '@/app/lib/fontawesome'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Help({onClose}){
    return(
        <div className={styles.contener}>
            <div className={styles.header}>
                <div onClick={onClose}>
                    <  FontAwesomeIcon icon={faXmark}/>
                </div>
            </div>
                <div className={styles.contain}>
                    <h1>How to Play</h1>
                    <p>1. Watch carefully! The game will light up a color — that's your first move.</p>
                    <p>2. Now your turn! Click the same color.</p>
                    <p>3. In the next round, the game adds one more color to the sequence.</p>
                    <p>4. Repeat the full pattern in the right order.</p>
                    <p>5. The more you get right, the longer the pattern gets.</p>
                    <p>6. Mess up once... and it's game over!</p>
                </div>
        </div>
    )
}