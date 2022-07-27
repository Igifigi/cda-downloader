var video_data = [];

// var video_data = {
//   title: "",
//   url: "",
// };

// (1) Uruchamia się po kliknięciu w ikonę rozszerzenia
chrome.browserAction.onClicked.addListener(function (tab) {
  //DEBUG
  //console.log("uruchomil sie krok 1");
  chrome.windows.getCurrent(function (current_window) {
    //console.log(current_window);
    chrome.tabs.query(
      { active: true, windowId: current_window.id },
      function (active_tabs) {
        //console.log(active_tabs);
        chrome.tabs.executeScript(active_tabs[0].id, {
          file: "script.js",
          allFrames: true,
        });
      }
    );
  });
  DownloadVideo(video_data[1], video_data.title[0]);
});

// (2) Uruchamia się po otrzymaniu danych o filmie
chrome.extension.onRequest.addListener(function (data) {
  //console.log("otrzymalem dane");
  DownloadVideo(data.url, data.title);
});

// (3) Uruchamia się po wywołaniu [punktu 1.]
function DownloadVideo(video_url, video_filename) {
  //console.log(video_url, video_filename);
  chrome.downloads.download({
    url: video_url,
    filename: video_filename + ".mp4",
  });
}
