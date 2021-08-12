$(function(event) {
    $('#searchBtn').on('click',function (event){
        let targetDt= ($('#targetDt').val()).replace(/-/g,'');

        $.ajax({
            async: true,
            url: 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json',

            type: 'GET',
            timeout: 3000,
            data: {
                key: '개인키',
                targetDt: targetDt
            },
            dataType: 'json',

            success: function (result) {


                $('#myTbody').empty();

                for (let i=0; i<10; i++){
                    let tr = $('<tr></tr>')
                    let rank = $('<td></td>').text(result.boxOfficeResult.dailyBoxOfficeList[i].rank)

                    let img = $('<img / >')
                    let title = $('<td></td>').text(result.boxOfficeResult.dailyBoxOfficeList[i].movieNm)
                    let openDt = $('<td></td>').text(result.boxOfficeResult.dailyBoxOfficeList[i].openDt)
                    let detailBtnTd = $('<td></td>')
                    let detailBtn = $('<button></button>').text('상세보기')
                    detailBtn.addClass('btn btn-primary ')
                    detailBtn.attr('data-movieCd',result.boxOfficeResult.dailyBoxOfficeList[i].movieCd)
                    detailBtn.on('click',function (event){
                        const movieCd = $(event.target).data('moviecd')
                        alert(movieCd)
                        $.ajax({
                            url: "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=개인키&movieCd="+movieCd,
                              data:{
                                key:'개인키', movieCd:movieCd},
                            type: 'GET',
                            timeout: 3000,
                            dataType: 'json',
                            success: function (result) {

                                console.log(result);
                            }
                        })
                    })
                    detailBtnTd.append(detailBtn)
                    let delBtnTd = $('<td></td>')
                    let delBtn = $('<button></button>').text('삭제')
                    delBtn.addClass('btn btn-danger')
                    delBtn.on('click',function (event){
                        $(this).parent().parent().remove()
                    })
                    delBtnTd.append(delBtn)

                    $.ajax({
                        async : true,
                        url :'https://dapi.kakao.com/v2/search/image',
                        type : 'GET',
                        data : {
                            query : result.boxOfficeResult.dailyBoxOfficeList[i].movieNm //
                        },
                        headers : {
                            'Authorization' : 'KakaoAK 개인키'
                        },
                        dataType : 'json',
                        timeout : 3000,
                        success : function (result){
                            $(img).attr('src',result.documents[0].thumbnail_url)
                        },
                        error : function (){
                            alert('실패')
                        }

                    })


                    tr.append(rank)
                    tr.append(img)
                    tr.append(title)
                    tr.append(openDt)
                    tr.append(detailBtnTd)
                    tr.append(delBtnTd)
                    $('#myTbody').append(tr);
                    $('#detailBtn').append(tr);
                    $('#poster').append(tr);
                }
            },
            error: function () {
                alert('실패했어요')
            }
        });

    })
})