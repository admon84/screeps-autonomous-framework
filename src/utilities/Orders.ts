/**
 * Create unique identifier
 */
export function getUniqueId(): string {
    let text = "#";
    const charset = "0123456789abcdef";
    for (let i = 0; i < 8; i++) {
        text += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return text;
}
