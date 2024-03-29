export function formatDate(date: Date, format: string): string {
    if (!date.valueOf()) return " ";

    const weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    const h = date.getHours() % 12 === 0 ? 12 : date.getHours() % 12;

    return format.replace(/(yyyy|yy|MM|M|dd|d|E|e|HH|hh|mm|ss|a\/p)/gi, function (match: string): string {
        switch (match) {
            case "yyyy": return date.getFullYear().toString();
            case "yy": return padZero((date.getFullYear() % 1000), 2);
            case "MM": return padZero((date.getMonth() + 1), 2);
            case "M": return (date.getMonth() + 1).toString();
            case "dd": return padZero(date.getDate(), 2);
            case "d": return date.getDate().toString();
            case "E": return weekName[date.getDay()];
            case "e": return weekName[date.getDay()][0];
            case "HH": return padZero(date.getHours(), 2);
            case "hh": return padZero(h, 2);
            case "mm": return padZero(date.getMinutes(), 2);
            case "ss": return padZero(date.getSeconds(), 2);
            case "a/p": return date.getHours() < 12 ? "오전" : "오후";
            default: return match;
        }
    });
}


function padZero(num: number, len: number): string {
    return num.toString().padStart(len, '0');
}