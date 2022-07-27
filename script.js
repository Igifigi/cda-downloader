function GetVideoTitle() {
  var outer_html = document.body.outerHTML;
  var as_regex = new RegExp("(tiptitle=)(\"|\')[^>]*", "gi");
  var titles = outer_html.match(as_regex) || [];
  titles = titles.map(function (s) {
    return s.substring(10, s.length - 1);
  });

  // regex to find tiptiles
  // (tiptitle=)("|')[^>]*
  // HAS to be translated into js regex

  //   var index_of_title = outer_html.indexOf("tiptitle") + 10;
  //   console.log("index of title (+10) ", index_of_title);
  //   var title = "";
  //   while (
  //     outer_html[index_of_title] != '"' &&
  //     (outer_html[index_of_title + 1] != "," ||
  //       outer_html[index_of_title + 1] != ">")
  //   ) {
  //     title += outer_html[index_of_title];
  //     index_of_title++;
  //   }
  return titles[0];
}

function GetUrlToDownload() {
  var inner_html = document.body.innerHTML;
  var as_regex = new RegExp(
    "(\"|')(http|https)://[^(\"|'|,)]*?.(mp4)[^(\"|')]*?(\"|')",
    "gi"
  );
  var urls = inner_html.match(as_regex) || [];
  urls = urls.map(function (quoted_string) {
    return quoted_string.substring(1, quoted_string.length - 1);
  });
  return urls[0];
  //   // regex to find mp4 files
  //   //  ("|')(http|https):\/\/[^("|'|,)]*?\.(mp4)[^("|')]*?("|')
  //   // HAS to be translated into js regex
  //   var end_index_of_url = inner_html.indexOf(".mp4") + 3;
  //   var start_index_of_url = end_index_of_url - 94;
  //   var url = "";
  //   while (start_index_of_url <= end_index_of_url) {
  //     url += inner_html[start_index_of_url];
  //     start_index_of_url++;
  //   }
  //   return url;
}

var data = {
  title: GetVideoTitle(),
  url: GetUrlToDownload(),
};

//console.log("wysylam dane");
chrome.extension.sendRequest(data);
