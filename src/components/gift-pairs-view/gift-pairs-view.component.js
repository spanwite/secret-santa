export class GiftPairsViewComponent {
	rootAttribute = 'data-gift-pairs-view';
	selectors = {
		root: `[${this.rootAttribute}]`,
		fromName: `[${this.rootAttribute}-from-name]`,
		toName: `[${this.rootAttribute}-to-name]`,
		wishlist: `[${this.rootAttribute}-wishlist]`,
		antiWishlist: `[${this.rootAttribute}-anti-wishlist]`,
	};

	constructor({ urlSafeEncoder }) {
		this.urlSafeEncoder = urlSafeEncoder;
		this.cacheElements();
		this.parseSearchParams();
		this.render();
	}

	cacheElements() {
		const root = document.querySelector(this.selectors.root);
		this.elements = {
			root,
			fromName: root.querySelector(this.selectors.fromName),
			toName: root.querySelector(this.selectors.toName),
			wishlist: root.querySelector(this.selectors.wishlist),
			antiWishlist: root.querySelector(this.selectors.antiWishlist),
		};
	}

	parseSearchParams() {
		const searchParams = new URLSearchParams(location.search);
		const decodeParam = (paramName) => this.urlSafeEncoder.decode(searchParams.get(paramName));

		this.searchParams = {
			from: searchParams.get('from'),
			to: decodeParam('to'),
			wishlist: decodeParam('wishlist'),
			antiWishlist: decodeParam('antiWishlist'),
		};
	}

	render() {
		const { from, to, wishlist, antiWishlist } = this.searchParams;

		this.elements.fromName.textContent = from;
		this.elements.toName.textContent = to;
		if (wishlist) {
			this.elements.wishlist.textContent = wishlist;
		} else {
			this.elements.wishlist.parentElement.textContent = '—';
		}
		if (antiWishlist) {
			this.elements.antiWishlist.textContent = antiWishlist;
		} else {
			this.elements.antiWishlist.parentElement.textContent = '—';
		}
	}
}
