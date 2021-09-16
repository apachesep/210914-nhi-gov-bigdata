/* Coding by Shen Yang - 2021-1-19 */

function showCheckedTxt(desktopBtnParent, mobileBtnParent, labelParent, label, labelTxt, datInput, labelDateBegin, labelDateEnd, labelTopic, labelPlace, labelProduce, labelUnit, showTxt, newTagToShowTxt) {
  var btnReset = document.querySelector(desktopBtnParent + '>*:first-child')
  var btnSubmit = document.querySelector(desktopBtnParent + '>*:last-child')
  var mobileReset = document.querySelector(mobileBtnParent + '>*:last-child')
  var mobileSubmit = document.querySelector(mobileBtnParent + '>*:first-child')
  var labelParents = document.querySelectorAll(labelParent)
  var dateBegin = '', dateEnd = '', topicText = '', placeText = '', produceText = '', unitText = '', allTexts = ''
  var showText = document.querySelector(showTxt)
  var newTag = document.createElement(newTagToShowTxt)
  showText.appendChild(newTag).classList.add('mt-2')

  function resetAll() {
    for (var i = 0;i < labelParents.length;i++) {
      if (labelParents[i].querySelector(labelTxt) != null) {
        labelParents[i].querySelector(labelTxt).innerHTML = ''
      }
      if (labelParents[i].querySelector(label).innerHTML == labelDateBegin | labelParents[i].querySelector(label).innerHTML == labelDateEnd) {
        labelParents[i].querySelector(datInput).value = ''
      }
    }
    dateBegin = '', dateEnd = '', topicText = '', placeText = '', produceText = '', unitText = ''
  }

  function submit() {
    for (var i = 0;i < labelParents.length;i++) {
      if (labelParents[i].querySelector(label).innerHTML == labelDateBegin && labelParents[i].querySelector(datInput).value != '') {
        dateBegin = labelDateBegin + '：' + labelParents[i].querySelector(datInput).value + '　　'
      }
      if (labelParents[i].querySelector(label).innerHTML == labelDateEnd && labelParents[i].querySelector(datInput).value != '') {
        dateEnd = labelDateEnd + '：' + labelParents[i].querySelector(datInput).value + '　　'
      }
      if (labelParents[i].querySelector(label).innerHTML == labelTopic && labelParents[i].querySelector(labelTxt).innerHTML != 'picker-items-holder' && labelParents[i].querySelector(labelTxt).innerHTML != '') {
        topicText = labelTopic + '：' + labelParents[i].querySelector(labelTxt).innerHTML + '　　'
      }
      if (labelParents[i].querySelector(label).innerHTML == labelPlace && labelParents[i].querySelector(labelTxt).innerHTML != 'picker-items-holder' && labelParents[i].querySelector(labelTxt).innerHTML != '') {
        placeText = labelPlace + '：' + labelParents[i].querySelector(labelTxt).innerHTML + '　　'
      }
      if (labelParents[i].querySelector(label).innerHTML == labelProduce && labelParents[i].querySelector(labelTxt).innerHTML != 'picker-items-holder' && labelParents[i].querySelector(labelTxt).innerHTML != '') {
        produceText = labelProduce + '：' + labelParents[i].querySelector(labelTxt).innerHTML + '　　'
      }
      if (labelParents[i].querySelector(label).innerHTML == labelUnit && labelParents[i].querySelector(labelTxt).innerHTML != 'picker-items-holder' && labelParents[i].querySelector(labelTxt).innerHTML != '') {
        unitText = labelUnit + '：' + labelParents[i].querySelector(labelTxt).innerHTML
      }
    }
    allTexts = dateBegin + dateEnd + topicText + placeText + produceText + unitText
    showText.lastChild.innerHTML = allTexts
  }
  
  btnReset.onclick = function () {
    resetAll()
  }
  btnSubmit.onclick = function () {
    submit()
  }
  mobileReset.onclick = function () {
    resetAll()
  }
  mobileSubmit.onclick = function () {
    submit()
  }
}

showCheckedTxt('#narrow-down-modal .modal .modal-btns-wrapper', '#back-controller-wrapper', '.filter-set-wrapper', '#narrow-down-modal .modal p.label', '.picker-picked-items-wrapper>p', '.date-picker', '演出日期範圍(起)', '演出日期範圍(迄)', '主題類別', '演出場館', '節目製作', '典藏單位', '#filter-fields .narrow-down-btn-wrapper', 'div')
