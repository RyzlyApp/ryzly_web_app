interface IOptions {
    isJSON: boolean;
}

class StorageClass {
    public getValue<T>(key: string, { isJSON = false }: IOptions): T|null {
        if (window) {
            const value = localStorage.getItem(key);
            if (!value) return null;
            if (isJSON) {
                return JSON.parse(value);
            }
            return value as T;
        } else {
            return null;
        }
    }

    public setValue(key: string, value: string) {
        if (window) {
            localStorage.setItem(key, value);
        }
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new StorageClass();