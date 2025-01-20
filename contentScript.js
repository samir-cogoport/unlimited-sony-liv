chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === 'CLEAR_LOCAL_STORAGE') {
		localStorage.clear();
		setTimeout(() => {
			window.location.reload();
		}, 100);
	}
	return true;
});
