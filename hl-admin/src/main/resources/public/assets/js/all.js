function timestampToTime(timestamp,iftrur) {
  if(iftrur == true){
    var date = new Date(timestamp * 1000);//鏃堕棿鎴充负10浣嶉渶*1000锛屾椂闂存埑涓�13浣嶇殑璇濅笉闇€涔�1000
    Y = date.getFullYear() + '-';
    M = litTen(date.getMonth()+1) + '-';
    D = litTen(date.getDate())  + ' ';
    h = litTen(date.getHours()) + ':';
    m = litTen(date.getMinutes()) + ':';
    s = litTen(date.getSeconds());
    return Y+M+D+h+m+s;
  }else{
    var date = new Date(timestamp * 1000);//鏃堕棿鎴充负10浣嶉渶*1000锛屾椂闂存埑涓�13浣嶇殑璇濅笉闇€涔�1000
    Y = date.getFullYear() + '-';
    M = litTen(date.getMonth()+1) + '-';
    D = litTen(date.getDate())  + ' ';
    return Y+M+D;
  }
}
function setLoad(on){
  if(on){
    load=layer.open({type: 2,shadeClose: false,});
    $(".layui-m-layershade").css("background-color","rgba(0,0,0,0)");
  }else{
    layer.close(load);
    load=0;
    $(".layui-m-layershade").css("background-color","rgba(0,0,0,.7)");
  }
}
function litTen(num){
  if(num<10){
    return "0"+num;
  }else{
    return num;
  }
}
$(function() {
  $('.am-dropdown').dropdown({justify: '#doc-dropdown-justify1'});
  var $dropdown = $('.am-dropdown'),
      data = $dropdown.data('amui.dropdown');
  $('#doc-dropdown-open').on('click', function(e) {
    if(data.active){
      $('.masks').hide();
    }else{
      $dropdown.dropdown('open');
      $('.masks').show();
    }
  });
  function stopPropagation(e) {
    if(e.stopPropagation)
      e.stopPropagation();
    else
      e.cancelBubble = true;
  }
  $(document).bind("click", function() {
    $('.masks').hide();

  });
  $(".am-header-right").bind("click", function(e) {
    stopPropagation(e);
  });
});