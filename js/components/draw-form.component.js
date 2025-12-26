export class DrawFormComponent {
	name = 'draw-form';
	rootAttribute = `data-${this.name}`;

	selectors = {
		root: `[${this.rootAttribute}]`,
		errors: `[${this.rootAttribute}-errors]`,
	};

	constructor({ drawService, participantsRepository }) {
		this.drawService = drawService;
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
			this.participantsRepository.events.update,
			this.handleParticipantsUpdate.bind(this),
		);
	}

	handleSubmit(event) {
		event.preventDefault();

		const isValid = this.validate();
		if (isValid) {
			this.drawService.draw();
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
