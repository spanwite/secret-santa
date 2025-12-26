export class ParticipantsFormComponent {
	name = 'participants-form';
	rootAttribute = `data-${this.name}`;

	selectors = {
		root: `[${this.rootAttribute}]`,
		fieldErrors: `[${this.rootAttribute}-field-errors]`,
	};

	constructor({ participantsRepository }) {
		this.participantsRepository = participantsRepository;

		this.cacheElements();
		this.bindEvents();
	}

	cacheElements() {
		const root = document.querySelector(this.selectors.root);
		this.elements = {
			root,
		};
	}

	bindEvents() {
		this.elements.root.addEventListener('submit', this.handleSubmit.bind(this));
		this.elements.root.elements.name.addEventListener('blur', this.handleBlur.bind(this));
	}

	handleBlur() {
		const hasErrors =
			this.elements.root.elements.name.parentElement.querySelector(this.selectors.fieldErrors)
				.children.length > 0;

		if (hasErrors) {
			this.validateNameField();
		}
	}

	handleSubmit(event) {
		event.preventDefault();

		const isValid = this.validateNameField();
		if (!isValid) {
			this.elements.root.elements.name.focus();
			return;
		}

		const formData = new FormData(this.elements.root);
		const participant = Object.fromEntries(formData);

		this.participantsRepository.add(participant);

		this.elements.root.reset();
		this.elements.root.elements[0].focus();
	}

	validateNameField() {
		const nameInputElement = this.elements.root.elements.name;
		const errorMessages = [];

		if (!nameInputElement.value) {
			errorMessages.push('Это поле обязательно для заполнения.');
		}
		if (this.participantsRepository.hasName(nameInputElement.value)) {
			errorMessages.push(
				'Участник с таким именем уже добавлен. Пожалуйста, укажите уникальное имя.',
			);
		}

		this.manageErrors(nameInputElement, errorMessages);

		return errorMessages.length === 0;
	}

	manageErrors(fieldControlElement, errorMessages) {
		const fieldErrorsElement = fieldControlElement.parentElement.querySelector(
			this.selectors.fieldErrors,
		);
		fieldErrorsElement.innerHTML = errorMessages
			.map((errorMessage) => `<span class="field__error">${errorMessage}</span>`)
			.join('');
	}
}
