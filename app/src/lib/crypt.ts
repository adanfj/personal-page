const name = "AES-CBC";
const hash = "SHA-256";
export async function generateKeyPair() {
    const key = await crypto.subtle.generateKey(
        {
            name,
            length:256,
            // modulusLength: 2048*2,
            // publicExponent: new Uint8Array([1, 0, 1]),
            // hash,
        },
        true,
        ["encrypt", "decrypt"]
    );
    return key;
}
export async function importKey(key: ArrayBuffer, keyUsages: KeyUsage[], type: "spki" | "pkcs8" | "raw") {
    const importedKey = await crypto.subtle.importKey(
        type,
        key,
        {
            name,
            hash,
        },
        true,
        keyUsages
    );
    return importedKey;
}
export async function exportKey(key: CryptoKey, type: "spki" | "pkcs8" | "raw") {
    const exportedKey = await crypto.subtle.exportKey(type, key);
    return exportedKey;
    // const exportedKeyBuffer = await crypto.subtle.exportKey("raw", exportedKey);
    // const exportedKeyString = arrayBufferToString(exportedKey);
    // return exportedKeyString;
}
export function arrayBufferToString(buffer: ArrayBuffer) {
    return new TextDecoder().decode(buffer);
}

export function stringToArrayBuffer(plainText: string) {
    return new TextEncoder().encode(plainText).buffer;
}

export async function encrypt(publicKey: CryptoKey, plaintext: string) {
    const iv = crypto.getRandomValues(new Uint8Array(16));
    const encrypted = await crypto.subtle.encrypt(
        {
            name,
            iv
        },
        publicKey,
        stringToArrayBuffer(plaintext)
    );
    return {encrypted:arrayBufferToString(encrypted),iv:iv.buffer/* bufferArrayToHex() */};
}

export async function decrypt(privateKey: CryptoKey, plaintext: string,iv?: Uint8Array) {
    const decrypted = await crypto.subtle.decrypt(
        {
            name,
            iv
        },
        privateKey,
        stringToArrayBuffer(plaintext)
    );
    return arrayBufferToString(decrypted);
}

export function stringToHexArray(string: string) {
    return string
        .split("")
        .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
        .join(" ");
}

export function hexArrayToString(hexArray: string) {
    return hexArray
        .split(" ")
        .map((hex) => String.fromCharCode(parseInt(hex, 16)))
        .join("");
}

export function bufferArrayToHex(bufferArray: ArrayBuffer) {
   return Array.from(new Uint8Array(bufferArray)).map((byte) => byte.toString(16).padStart(2, "0")).join(" ");
}

export function hexToBufferArray(hex: string) {
    return new Uint8Array(hex.split(" ").map((byte) => parseInt(byte, 16))).buffer;
}