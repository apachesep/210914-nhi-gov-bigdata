/* Coding by Shen Yang - 2021-5-24 */
// https://codesandbox.io/s/infinite-scroll-6nf0h

const infiniteScroll = (target, sentinelID, fileUrlPath, pagesNumber, fileExtension) => {
  var wrapper = document.querySelector(target)
  var load = document.createElement("div")
  load.setAttribute("class", "load")
  load.setAttribute("hidden", "true")
  // console.log(load);
  document.querySelector("body").appendChild(load)
  var sentinel = document.createElement("div")
  sentinel.setAttribute("id", sentinelID)
  sentinel.innerHTML = '<div uk-spinner></div>'
  wrapper.appendChild(sentinel)
  var counter = 0
  var pages = pagesNumber

  // https://www.w3schools.com/js/js_api_fetch.asp
  // https://www.w3schools.com/js/tryit.asp?filename=tryjs_api_fetch
  // Fetch API : URL scheme must be "http" or "https" for request.
  function loadPages(filePath) {
    fetch(filePath)
      .then((filedata) => filedata.text())
      .then((finalData) => (load.innerHTML = finalData))
    counter = counter + 1
  }

  // function loadItems(n) {
  //   for (var i = 0;i < n;i++) {
  //     var newItem = document.createElement("div")
  //     newItem.classList.add("item")
  //     newItem.textContent = "Item "
  //     wrapper.appendChild(newItem)
  //   }
  // }
  // loadItems(5)

  var intersectionObserver = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.intersectionRatio > 0)) {
      // 'intersectionRatio' tells you how much of the target element is currently visible within the root's intersection ratio, as a value between 0.0 and 1.0.
      var name = fileUrlPath + (counter + 1) + "." + fileExtension
      // console.log(counter)
      if (counter < pages) {
        loadPages(name)
        wrapper.append(...load.childNodes)
        wrapper.appendChild(sentinel)
      } else {
        sentinel.remove();
      }
    }
    wrapper.append(...load.childNodes);
  })
  intersectionObserver.observe(sentinel)
}
infiniteScroll(".infinite-container", "sentinel", "https://shen-yang-tw.github.io/201221-npac-ntch.org/load", "2", "html")
