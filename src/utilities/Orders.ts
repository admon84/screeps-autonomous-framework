/**
 * Create unique identifier
 */
export function getUniqueId(): string {
    let text = "#";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    text += upper.charAt(Math.floor(Math.random() * upper.length));

    for (let i = 1; i < 3; i++) {
        text += lower.charAt(Math.floor(Math.random() * lower.length));
    }
    return text;
}
