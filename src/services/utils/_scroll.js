export function stopScroll() {
    try {
        document.body.style.overflow = 'hidden';
    } catch (error) {
    }
}

export function startScroll() {
    try {
        document.body.style.overflow = '';
    } catch (error) {
    }
}