export function randomGUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (e) => {
        const t = 16 * Math.random() | 0;
        return (e === "x" ? t : 3 & t | 8).toString(16);
    });
}