
export function getItem<T>(key: string) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) as T : null;
}

export function setItem(key: string, value: any) {
    if (!value) {
        return;
    }
    localStorage.setItem(key, typeof value !== 'string' ? JSON.stringify(value) : value);
}

export function removeItem(key: string) {
    localStorage.removeItem(key);
}
