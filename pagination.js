(function($){
    $.extend({
        pagination: function(obj){
            $.createPages(obj.count, obj.pagination);
            var prev = $(obj.pagination).children('span').eq(0);
            var next = $(obj.pagination).children('span').eq(1);
            var curr = $('.pagination-curr');
            var pageContent = $(obj.pagination).find('li');
            var currPage = 1;
            var _index = 1;
            prev.click(function(){
                $.each(pageContent, function(val, key){
                    if($(key).attr('class') == 'pagination-curr'){
                        _index = $(key).text();
                        currPage = $(key).index();
                    }
                });
                var page = $.changePage(pageContent, obj.count);
                if(_index == 1){
                    window.tips('已经到第一页了');
                }else if(_index == obj.allcount){
                    window.tips('已经到最后一页了');
                }else{
                    obj.fn(parseInt(_index)-1);
                    if(currPage > 0){
                        pageContent.eq(currPage-1).addClass('pagination-curr').siblings().removeClass('pagination-curr');
                    }else{
                        pageContent.eq(currPage+2).addClass('pagination-curr').siblings().removeClass('pagination-curr');
                        $.each(pageContent, function(val, key){
                            $(key).text(parseInt($(key).text())-3)
                        });
                    }
                }
            })
            next.click(function(){
                $.each(pageContent, function(val, key){
                    if($(key).attr('class') == 'pagination-curr'){
                        _index = $(key).text();
                        currPage = $(key).index();
                    }
                });
                var page = $.changePage(pageContent, obj.count);
                if(_index == obj.allcount){
                    window.tips('已经到最后一页了');
                }else{
                    obj.fn(parseInt(_index)+1);
                    if(currPage < 5){
                        pageContent.eq(currPage+1).addClass('pagination-curr').siblings().removeClass('pagination-curr');
                    }else{
                        pageContent.eq(currPage-2).addClass('pagination-curr').siblings().removeClass('pagination-curr');
                        $.each(pageContent, function(val, key){
                            $(key).text(parseInt($(key).text())+3)
                        });
                    }
                }
            })
            pageContent.click(function(){
                var text = $(this).attr('class');
                _index = $(this).text();
                currPage = $(this).index();
                if(text !== 'pagination-curr'){
                    $(this).attr('class', 'pagination-curr').siblings().removeAttr('class');
                    var page = $.changePage(pageContent, obj.count);
                    if(page.end == _index){
                        pageContent.eq(currPage-3).addClass('pagination-curr').siblings().removeClass('pagination-curr');
                        $.each(pageContent, function(val, key){
                            $(key).text(parseInt($(key).text())+3);
                        });
                    }else if(page.start == _index && _index != 1){
                        pageContent.eq(currPage+3).addClass('pagination-curr').siblings().removeClass('pagination-curr');
                        $.each(pageContent, function(val, key){
                            $(key).text(parseInt($(key).text())-3);
                        });
                    };
                    obj.fn(_index);
                }
            })
        },
        changePage: function(obj, count){
            var pageArr = {
                start: obj.eq(0).text(),
                end: obj.eq(count-1).text()
            };
            return pageArr;
        },
        createPages: function(count, ele){
            var prevEle = "<span>上一页</span>";
            var nextEle = "<span>下一页</span>"
            var temp = '';
            var eleStart = '<ul>',
                eleEnd = '</ul>';
            for(var i = 1; i <= count; i++){
                if(i == 1){
                    temp += "<li class='pagination-curr'>" + i + "</li>";
                }else{
                   temp += "<li>" + i + "</li>";
                }
            };
            $(ele).append(prevEle+eleStart+temp+eleEnd+nextEle);
        }
    })
})(jQuery);
