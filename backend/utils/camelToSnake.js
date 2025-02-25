function camelToSnake(string) {
    return string.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export default function keysToSnakeCase(obj) {
    const transformed = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const snakeKey = camelToSnake(key);
            transformed[snakeKey] = obj[key];
        }
    }
    return transformed;
}
