class Uint8ArrayEncoder {
	encode(string) {
		const uint8Array = new TextEncoder().encode(string);
		return uint8Array.toBase64({ alphabet: 'base64url', padding: false });
	}

	decode(string) {
		const uint8Array = Uint8Array.fromBase64(string, { alphabet: 'base64url' });
		return new TextDecoder().decode(uint8Array);
	}
}

class BtoaEncoder {
	encode(string) {
		return btoa(unescape(encodeURIComponent(string)));
	}

	decode(string) {
		return decodeURIComponent(escape(atob(string)));
	}
}

export const UrlSafeEncodingService =
	typeof Uint8Array === undefined ? BtoaEncoder : Uint8ArrayEncoder;
