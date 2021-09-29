(function() {
  var sendBtn = document.querySelector('.send-btn');
  var input = document.querySelector('.input');
  var contentContainer = document.querySelector('.main');
  var init = function() {
    initEvent();
  }
  var initEvent = function() {
    sendBtn.addEventListener('click', onSendBtnClick);
  }
  // 点击按钮的事件函数
  var onSendBtnClick = function() {
    // 获取内容,如果没有内容,不需要进行下一步操作
    var value = input.value.trim();  //防止恶意的输入空格
    if (!value) return
    renderChatInfo(value);
  }
  // 定义渲染函数
  var renderChatInfo = function(val) {
    // 结构内容的填充
    renderHtml(val, 'right');
    // 发送内容后把发送的内容清空
    input.value = '';
    // 发送数据到服务器,获取机器人的聊天信息
    sendChatInfoToBackEnd(val);
  }
  // 定义发送请求函数
  var sendChatInfoToBackEnd = function(txt) {
    // 发送请求
    ajax({
      url: 'https://api.hyfarsight.com/test/testRequest/robotChat',
      // url: 'http://api.qingyunke.com/api.php',
      method: 'POST',
      data: {
        txt: txt
        // key: 'free',
        // appid: 0,
        // msg: txt
      },
      onSuccess: function(res) {
        renderHtml(res.responseTxt, 'left')
        // renderHtml(res.content, 'left')
      }
    })
  }
  // 填充内容结构到页面上
  var renderHtml = function(txt, direction) {
    var parentDiv = document.createElement('div');
    parentDiv.className = direction === 'right' ? 'chat-container avatar-container' : 'chat-container';
    var img = document.createElement('img');
    img.src = direction === 'right' ? './img/avatar.jpg' : './img/robot.jpg';
    var childDiv = document.createElement('div');
    childDiv.className = 'chat-txt';
    childDiv.innerHTML = txt;
    parentDiv.appendChild(img);
    parentDiv.appendChild(childDiv);
    contentContainer.appendChild(parentDiv);
    // 滚动处理
    var distanceTop = parentDiv.offsetTop;
    contentContainer.scrollTo(0, distanceTop)
  }
  init();
})()