import { generateGiftPairs } from '../utils/array.utils.js';

export class GiftPairsService {
	#giftPairs = [];

	static eventNames = { update: 'GiftPairsService_Update' };

	constructor({ urlSafeEncoderService, participantsRepository }) {
		this.urlSafeEncoderService = urlSafeEncoderService;
		this.participantsRepository = participantsRepository;

		this.#bindEvents();
	}

	get giftPairs() {
		return this.#giftPairs;
	}

	get eventNames() {
		return GiftPairsService.eventNames;
	}

	clear() {
		this.#giftPairs = [];
		this.#emitUpdate();
	}

	generate() {
		const participants = this.participantsRepository.participants;

		const giftPairs = generateGiftPairs(participants);
		this.#giftPairs = giftPairs.map(([from, to]) => ({
			from,
			to,
			link: this.#generateLink(from, to),
		}));

		this.#emitUpdate();
	}

	findByName(nameFrom) {
		return this.#giftPairs.find(({ from }) => from.name === nameFrom);
	}

	#bindEvents() {
		document.addEventListener(
			this.participantsRepository.eventNames.update,
			this.clear.bind(this),
		);
	}

	#emitUpdate() {
		const event = new Event(this.eventNames.update);
		document.dispatchEvent(event);
	}

	#generateLink(from, to) {
		let toEncoded = { ...to };
		for (const key in toEncoded) {
			toEncoded[key] = this.urlSafeEncoderService.encode(toEncoded[key]);
		}

		const pageFile = 'view.html';
		const searchParams = new URLSearchParams({
			from: from.name,
			to: toEncoded.name,
			wishlist: toEncoded.wishlist,
			antiWishlist: toEncoded.antiWishlist,
		});
		return `${location.origin}/${pageFile}?${searchParams}`;
	}
}
