document.addEventListener("DOMContentLoaded", function () {
  const base1Input = document.getElementById("base1");
  const base2Input = document.getElementById("base2");
  const lastBase1 = document.getElementById("lastBase1");
  const lastBase2 = document.getElementById("lastBase2");
  const createTabButton = document.getElementById("createTab");
  const swapButton = document.getElementById('swapUrls');
  // Initialize inputs with last used values or defaults
  chrome.storage.sync.get(["lastBase1", "lastBase2"], function (result) {
    base1Input.value = result.lastBase1 || "https://console.zenefits.com";
    base2Input.value = result.lastBase2 || "https://console.zenefits.com";
    lastBase1.textContent = base1Input.value;
    lastBase2.textContent = base2Input.value;
  });
  // Handle Create Tab button click
  createTabButton.addEventListener("click", function () {
    const base1 = base1Input.value;
    const base2 = base2Input.value;
    // Update last used values
    chrome.storage.sync.set({ lastBase1: base1, lastBase2: base2 });
    // Get the current tab and check if its URL starts with base1
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentTab = tabs[0];
      if (currentTab && currentTab.url.startsWith(base1)) {
        const newUrl = currentTab.url.replace(base1, base2);
        chrome.tabs.create({ url: newUrl });
      }
    });
  });
  swapButton.addEventListener("click", function () {
    const base1Input = document.getElementById('base1');
    const base2Input = document.getElementById('base2');
    const tempUrl = base1Input.value;
    base1Input.value = base2Input.value;
    base2Input.value = tempUrl;
  });
});