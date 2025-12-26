import { generateGiftPairs } from '../utils/array.utils.js';

export class DrawService {
	#draws = [];

	static events = { update: 'DrawService_Update' };

	constructor({ urlSafeEncodingService, participantsRepository }) {
		this.urlSafeEncodingService = urlSafeEncodingService;
		this.participantsRepository = participantsRepository;

		this.#bindEvents();
	}

	get draws() {
		return this.#draws;
	}

	get events() {
		return DrawService.events;
	}

	clear() {
		this.#draws = [];
		this.#emitUpdate();
	}

	draw() {
		const participants = this.participantsRepository.participants;

		const draws = generateGiftPairs(participants);
		this.#draws = draws.map(([from, to]) => ({
			from,
			to,
			link: this.#generateGiftLink(from, to),
		}));

		this.#emitUpdate();
	}

	findByName(nameFrom) {
		return this.#draws.find(({ from }) => from.name === nameFrom);
	}

	#bindEvents() {
		document.addEventListener(this.participantsRepository.events.update, this.clear.bind(this));
	}

	#emitUpdate() {
		const event = new Event(this.events.update);
		document.dispatchEvent(event);
	}

	#generateGiftLink(from, to) {
		let toEncoded = { ...to };
		for (const key in toEncoded) {
			toEncoded[key] = this.urlSafeEncodingService.encode(toEncoded[key]);
		}

		const pageFile = 'gift-pair.html';
		const searchParams = new URLSearchParams({
			from: from.name,
			to: toEncoded.name,
			wishlist: toEncoded.wishlist,
			antiWishlist: toEncoded.antiWishlist,
		});
		return `${location.origin}/${pageFile}?${searchParams}`;
	}
}
