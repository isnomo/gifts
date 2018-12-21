(function () {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
        var r = window.location.search.substr(1).match(reg);    
        if (r != null) return decodeURI(r[2]); return null;      
    };
    var urltype = $.getUrlParam('id')
    if(urltype){
        getSell(urltype)
        function getSell(id) {
            $.ajax({
                url: "http://api.gifts.lzlj.online/admin/prize_lists/1",
                type: "post",
                data: { prize_id : id , _method : 'put' },
                dataType: 'JSON',
                cache: false,
                success: function (res) {
                    console.log(res)
                    let itemImg = res.data
                    let sellHtml = ''
                    if(itemImg == 'system busyness.'){
                        // alert("该商品已被领取，请扫描其他商品二维码！");
                        sellHtml = `<h3>该商品已被领取，请扫描其他商品二维码！</h3>`
                    }else{
                        sellHtml = `<img src="${itemImg.image}">`
                    }
                    $('#giftSell').html(sellHtml);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("加载失败，请检查网络后重试。");
                    console.log(response.code);
                }
            });
        }
    }else{
        // location.href = 'index.html'
        alert("未获取到数据，请稍候重试！");
    }
    
    

})();