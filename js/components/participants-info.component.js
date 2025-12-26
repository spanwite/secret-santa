export class ParticipantsInfoComponent {
	name = 'participants-info';
	rootAttribute = `data-${this.name}`;

	selectors = {
		total: `[${this.rootAttribute}-total]`,
		deleteButton: `[${this.rootAttribute}-delete-button]`,
	};

	stateClasses = {
		isVisible: 'is-visible',
	};

	constructor({ participantsRepository }) {
		this.participantsRepository = participantsRepository;

		this.cacheElements();
		this.bindEvents();
	}

	cacheElements() {
		this.elements = {
			deleteButton: document.querySelector(this.selectors.deleteButton),
			total: document.querySelector(this.selectors.total),
		};
	}

	bindEvents() {
		this.elements.deleteButton.addEventListener('click', this.handleButtonClick.bind(this));
		document.addEventListener(
			this.participantsRepository.events.update,
			this.handleParticipantsUpdate.bind(this),
		);
	}

	handleButtonClick() {
		const isConfirmed = confirm('Вы уверены что хотите удалить всех участников из списка?');
		if (isConfirmed) {
			this.participantsRepository.clear();
		}
	}

	handleParticipantsUpdate() {
		const participantsCount = this.participantsRepository.participants.length;

		this.elements.total.textContent = participantsCount;
		this.elements.deleteButton.classList.toggle(
			this.stateClasses.isVisible,
			participantsCount > 0,
		);
	}
}
