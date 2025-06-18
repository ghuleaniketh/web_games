import styles from './simon.module.css';

export default function Simon(){
    return(
    <>
    <div className={styles.page}>
        <div className={styles.bar}>
            <div className={styles.mainNav}>

            </div>
        </div>
        <div className={styles.gamepage}>
            <div className={styles.gamecont}>
                <div className={styles.up}>
                    <div className={styles.red}></div>
                    <div className={styles.green}></div>
                </div>
                <div className={styles.down}>
                    <div className={styles.blue}></div>
                    <div className={styles.yellow}></div>
                </div>
                
            </div>
        </div>
    </div>
        </>
    )
}