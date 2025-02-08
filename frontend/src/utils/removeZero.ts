export default function removeZeroBeforeNumber(num: string) {
    if (num[0] === '0') {
        num = String(Number(num) * 1);
    }

    return num;
}
