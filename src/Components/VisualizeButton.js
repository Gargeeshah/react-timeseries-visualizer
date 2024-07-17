import styles from "./VisualizeButton.module.css"

function ButtonContainer ({ onClick }) {
    return <>
        <button className={styles.button} onClick={onClick}>Visualize</button>
    </>
};

export default ButtonContainer;