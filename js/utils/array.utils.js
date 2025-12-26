export function getRandomIndex(array) {
	return Math.floor(Math.random() * array.length);
}

export function generateGiftPairs(array) {
	const fromTo = {};

	if (array.length < 2) {
		throw new Error('to generate gift pairs, array length must be greater than 1');
	}

	array.forEach((_, indexFrom) => {
		let indexTo;

		do {
			if (
				indexFrom === array.length - 2 &&
				!Object.values(fromTo).includes(array.length - 1)
			) {
				indexTo = array.length - 1;
				break;
			}
			indexTo = getRandomIndex(array);
		} while (indexTo === indexFrom || Object.values(fromTo).includes(indexTo));

		fromTo[indexFrom] = indexTo;
	});

	return Object.entries(fromTo).map(([from, to]) => [array[from], array[to]]);
}
