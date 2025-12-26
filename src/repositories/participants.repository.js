export class ParticipantsRepository {
	#participants = [];

	static eventNames = {
		update: 'ParticipantsRepository_Update',
	};
	localStorageKey = 'participants';

	constructor(options) {
		this.options = options;
		this.bindEvents();
	}

	get eventNames() {
		return ParticipantsRepository.eventNames;
	}

	get participants() {
		return this.#participants;
	}

	bindEvents() {
		document.addEventListener('DOMContentLoaded', this.#loadFromLocalStorage.bind(this));
	}

	add(participant) {
		this.#participants.push(participant);
		this.#saveToLocalStorage();
		this.#emitUpdate();
	}

	addMany(participants) {
		this.#participants.push(...participants);
		this.#emitUpdate();
	}

	removeByName(name) {
		this.#participants = this.#participants.filter((p) => p.name !== name);
		this.#saveToLocalStorage();
		this.#emitUpdate();
	}

	clear() {
		this.#participants = [];
		this.#saveToLocalStorage();
		this.#emitUpdate();
	}

	hasName(name) {
		return this.#participants.findIndex((p) => p.name === name) > -1;
	}

	#emitUpdate() {
		if (this.options.emit) {
			document.dispatchEvent(new Event(this.eventNames.update));
		}
	}

	#loadFromLocalStorage() {
		const data = localStorage.getItem(this.localStorageKey);
		if (data) {
			try {
				this.#participants = JSON.parse(data);
			} catch (e) {
				console.error('Failed to parse participants from localStorage', e);
			}
		}
		this.#emitUpdate();
	}

	#saveToLocalStorage() {
		localStorage.setItem(this.localStorageKey, JSON.stringify(this.#participants));
	}
}
