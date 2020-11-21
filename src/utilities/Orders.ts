import { Role } from "../enums/role";

export function makeRoleName(role: Role): string {
    return Role[role];
}

export function makeRandomCreepId(): string {
    let text = "";
    const possibleHighcase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const possibleLowcase = "abcdefghijklmnopqrstuvwxyz";
    text += possibleHighcase.charAt(Math.floor(Math.random() * possibleHighcase.length));

    for (let i = 1; i < 3; i++) {
        text += possibleLowcase.charAt(Math.floor(Math.random() * possibleLowcase.length));
    }
    return text;
}
