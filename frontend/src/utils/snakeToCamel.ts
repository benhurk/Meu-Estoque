/* eslint-disable @typescript-eslint/no-explicit-any */
function snakeToCamel(string: string) {
    return string.replace(/(_\w)/g, (match) => match[1].toUpperCase());
}

export default function keysToCamelCase<T>(data: T): T {
    if (Array.isArray(data)) {
        return data.map((item) => keysToCamelCase(item)) as T;
    } else if (data !== null && typeof data === 'object') {
        return Object.keys(data).reduce((acc, key) => {
            const camelCaseKey = snakeToCamel(key);
            acc[camelCaseKey] = keysToCamelCase(
                (data as Record<string, any>)[key]
            );
            return acc;
        }, {} as Record<string, any>) as T;
    }
    return data;
}
