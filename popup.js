const INTERVAL_KEY = 'interval-value';
const DEFAULT_INTERVAL = 58000;

function triggerRefreshing() {
	const intervalValue = parseInt(localStorage.getItem(INTERVAL_KEY)) || DEFAULT_INTERVAL;
	chrome.runtime.sendMessage({
		action: 'START_REFRESHING',
		intervalValue,
	});
}

function clearExistingInterval() {
	chrome.runtime.sendMessage({
		action: 'STOP_REFRESHING',
	});
}
function triggerOnce() {
	chrome.runtime.sendMessage({
		action: 'TRIGGER_ONCE',
	});
}

function updateInterval() {
	const inputEl = document.getElementById('interval-input');
	if (!inputEl.value) {
		inputEl.value = DEFAULT_INTERVAL;
	}
	localStorage.setItem(INTERVAL_KEY, inputEl.value || DEFAULT_INTERVAL);
}

document
	.getElementById('refresh')
	.addEventListener('click', triggerRefreshing);

document
	.getElementById('clear')
	.addEventListener('click', clearExistingInterval);

document
	.getElementById('update')
	.addEventListener('click', updateInterval);

document
	.getElementById('trigger_once')
	.addEventListener('click', triggerOnce);

document.addEventListener('DOMContentLoaded', () => {
	const storedValue = localStorage.getItem(INTERVAL_KEY);
	document.getElementById('interval-input').value = storedValue || DEFAULT_INTERVAL;
});
