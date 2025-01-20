let intervalId = null;

function startRefreshing(intervalValue = 58000) {
	clearRefreshing();
	intervalId = setInterval(() => {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			if (tabs.length > 0) {
				chrome.tabs.sendMessage(tabs[0].id, { action: 'CLEAR_LOCAL_STORAGE' });
			}
		});
	}, intervalValue);

}

function triggerOnce() {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		if (tabs.length > 0) {
			chrome.tabs.sendMessage(tabs[0].id, { action: 'CLEAR_LOCAL_STORAGE' });
		}
	});
}

function clearRefreshing() {
	if (intervalId) {
		clearInterval(intervalId);
		intervalId = null;
	}
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'START_REFRESHING') {
		startRefreshing(request.intervalValue);
	} else if (request.action === 'STOP_REFRESHING') {
		clearRefreshing();
	}
	if (request.action === 'TRIGGER_ONCE') {
		triggerOnce();
	}
	return true;
});
