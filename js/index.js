(function () {

    $(window).scroll(function () {

    });

    let winWidth = $(window).width()
    let winHeight = $(window).height()
    if(winHeight / winWidth < 1.5){
        $('.gift-wrapper').addClass('onPc')
    }

    $(window).load(function () {
        getList()        
        let timer = setInterval(() => {
            getList()
        }, 5000);

    })


    function getList() {
        $.ajax({
            url: "http://api.gifts.lzlj.online/admin/prize_lists/1",
            type: "get",
            data: { },
            dataType: 'JSON',
            cache: false,
            success: function (res) {
                let productHtml = ''
                let itemList = res.data.prizes
                // console.log(itemList)
                itemList.map(item => {
                    if(res.data.remain_prize_id.indexOf(item.prize_id) > -1){
                        productHtml += `<div class="gift-item" style="background-image:url('${item.cover}')">
                                        <div class="gift-qrcode">
                                            <img src="${item.qrcode}" alt="">
                                        </div>
                                    </div>`
                    }else{
                        productHtml += `<div class="gift-item" style="background-color:#f2f2f2)">
                                        <div class="gift-soldOut"></div>
                                    </div>`
                    }
                    
                })
                $('#giftProduct').html(productHtml);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("加载失败，请检查网络后重试。");
                // console.log(response.code);
            }
        });
    }

})();