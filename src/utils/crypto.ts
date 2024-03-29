export async function encryptData(data: string): Promise<string> {
    try {
        const secretKey = "brvUfm4kSDZ8KSnOHClCGCxhHb7j23PC";
        const cryptoKey = await importKey(secretKey);

        if (cryptoKey) {
            const iv = new Uint8Array(16);
            const encrypted = await window.crypto.subtle.encrypt(
                {
                    name: "AES-CBC",
                    iv: iv,
                },
                cryptoKey,
                new TextEncoder().encode(data)
            );

            return bufferToBase64(encrypted);
            
        } else {
            return '';
        }

    } catch (err) {
        return '';
    }
}


function importKey(rawKey : string): Promise<CryptoKey> | null {
    try {
        // importKey 메서드는 https환경에서만 사용할 수 있음
        const cryptoKey = window.crypto.subtle.importKey(
            "raw",
            str2ab(rawKey),
            {
                name: "AES-CBC",
                length: 256
            },
            true,
            ["encrypt", "decrypt"]
        );
    
        return cryptoKey;

    } catch (err) {
        return null;
    }
}

function str2ab(str: string): ArrayBuffer {
    return new TextEncoder().encode(str);
}


function bufferToBase64(buf: ArrayBuffer): string {
    const bytes = new Uint8Array(buf);
    const numbers = Array.from(bytes);
    return window.btoa(String.fromCharCode.apply(null, numbers));
}