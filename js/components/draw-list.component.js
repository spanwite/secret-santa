export class DrawListComponent {
	name = 'draw-list';
	rootAttribute = `data-${this.name}`;
	attributes = {
		item: `${this.rootAttribute}-item`,
		itemId: `${this.rootAttribute}-item-id`,
		itemCopyButton: `${this.rootAttribute}-item-copy-button`,
	};

	selectors = {
		root: `[${this.rootAttribute}]`,
		item: `[${this.attributes.item}]`,
		itemId: `[${this.attributes.itemId}]`,
		itemCopyButton: `[${this.attributes.itemCopyButton}]`,
	};

	constructor({ drawService }) {
		this.drawService = drawService;

		this.cacheElements();
		this.bindEvents();
	}

	cacheElements() {
		const root = document.querySelector(this.selectors.root);
		this.elements = { root };
	}

	bindEvents() {
		this.elements.root.addEventListener('click', this.handleClick.bind(this));
		document.addEventListener(this.drawService.events.update, this.render.bind(this));
	}

	handleClick({ target }) {
		if (target.matches(this.selectors.itemCopyButton)) {
			const itemId = target.closest(this.selectors.item).getAttribute(this.attributes.itemId);
			const { link } = this.drawService.findByName(itemId);
			navigator.clipboard.writeText(link);
		}
	}

	render() {
		this.elements.root.innerHTML = this.drawService.draws
			.map(this.createListItem.bind(this))
			.join('');
	}

	createListItem({ from: { name } }) {
		return `
			<li class="${this.name}-item" ${this.attributes.item} ${this.attributes.itemId}="${name}">
				<span class="${this.name}-item__name">${name}</span>
				<button
					type="button"
					class="button_square ${this.name}-item__copy-button"
					title="Скопировать ссылку"
					aria-label="Скопировать ссылку"
					${this.attributes.itemCopyButton}
				>
					<svg class="${this.name}-item__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M15.24 2H11.3458C9.58159 1.99999 8.18418 1.99997 7.09054 2.1476C5.96501 2.29953 5.05402 2.61964 4.33559 3.34096C3.61717 4.06227 3.29833 4.97692 3.14701 6.10697C2.99997 7.205 2.99999 8.60802 3 10.3793V16.2169C3 17.725 3.91995 19.0174 5.22717 19.5592C5.15989 18.6498 5.15994 17.3737 5.16 16.312L5.16 11.3976L5.16 11.3024C5.15993 10.0207 5.15986 8.91644 5.27828 8.03211C5.40519 7.08438 5.69139 6.17592 6.4253 5.43906C7.15921 4.70219 8.06404 4.41485 9.00798 4.28743C9.88877 4.16854 10.9887 4.1686 12.2652 4.16867L12.36 4.16868H15.24L15.3348 4.16867C16.6113 4.1686 17.7088 4.16854 18.5896 4.28743C18.0627 2.94779 16.7616 2 15.24 2Z" fill="#1C274C"/> <path d="M6.6001 11.3974C6.6001 8.67119 6.6001 7.3081 7.44363 6.46118C8.28716 5.61426 9.64481 5.61426 12.3601 5.61426H15.2401C17.9554 5.61426 19.313 5.61426 20.1566 6.46118C21.0001 7.3081 21.0001 8.6712 21.0001 11.3974V16.2167C21.0001 18.9429 21.0001 20.306 20.1566 21.1529C19.313 21.9998 17.9554 21.9998 15.2401 21.9998H12.3601C9.64481 21.9998 8.28716 21.9998 7.44363 21.1529C6.6001 20.306 6.6001 18.9429 6.6001 16.2167V11.3974Z" fill="#1C274C"/> </svg>
				</button>
			</li>
		`;
	}
}
