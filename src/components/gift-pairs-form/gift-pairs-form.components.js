export class GiftPairsFormComponent {
	selectors = {
		root: `#gift-pairs-form`,
		errors: '[data-gift-pairs-form-errors]',
	};

	constructor({ giftPairsService, participantsRepository }) {
		this.giftPairsService = giftPairsService;
		this.participantsRepository = participantsRepository;

		this.cacheElements();
		this.bindEvents();
	}

	cacheElements() {
		const root = document.querySelector(this.selectors.root);
		this.elements = { root, errors: root.querySelector(this.selectors.errors) };
	}

	bindEvents() {
		this.elements.root.addEventListener('submit', this.handleSubmit.bind(this));
		document.addEventListener(
			this.participantsRepository.eventNames.update,
			this.handleParticipantsUpdate.bind(this),
		);
	}

	handleSubmit(event) {
		event.preventDefault();

		const isValid = this.validate();
		if (isValid) {
			this.giftPairsService.generate();
		}
	}

	handleParticipantsUpdate() {
		const hasErrors = this.elements.errors.children.length > 0;

		if (hasErrors) {
			this.validate();
		}
	}

	validate() {
		const participantsCount = this.participantsRepository.participants.length;
		const errors = [];

		if (participantsCount < 3) {
			errors.push(`<span>Для жеребьёвки требуется не менее трёх участников.</span>`);
		}
		this.elements.errors.innerHTML = errors.join('');
		return errors.length === 0;
	}
}
