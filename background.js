chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "detectFakeNews",
        title: "Detects fake news",
        contexts: ["selection"]
    });
    alert('Context Menu Created!');
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "detectFakeNews") {
        const query = info.selectionText;
        const url = "http://127.0.0.1:5000";
        const formData = new FormData();
        formData.append('text', query);

        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            chrome.scripting.executeScript({
                target: {tabId: tab.id},
                func: function(data) {
                    alert(JSON.stringify(data));
                },
                args: [data]
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});

function showAlert(data) {
    alert(JSON.stringify(data));
}
