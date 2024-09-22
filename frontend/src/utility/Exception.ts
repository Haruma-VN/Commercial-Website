export function parseException(e: Error): string {
    let message: string = "";
    message += e.message;
    message += "\n";
    message += e.stack!;
    return message;
}
