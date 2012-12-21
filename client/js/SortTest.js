module( "IDソート", {
    setup: function() {
        // prepare something for all following tests
    },
    teardown: function() {
        // clean up after each test
    }
});

module( "日付ソート", {
    setup: function() {
        // prepare something for all following tests
    },
    teardown: function() {
        // clean up after each test
    }
});

module( "地区ソート", {
    setup: function() {
        // prepare something for all following tests
    },
    teardown: function() {
        // clean up after each test
    }
});


module( "IDソート" );
test('{id:小},{id:大}を渡すと1が返ってくる', function(){
	equal(Sort.sortByID({id:1},{id:2}),1);
});
test('{id:大},{id:小}を渡すと-1が返ってくる', function(){
	equal(Sort.sortByID({id:2},{id:1}),-1);
});
test('同じIDを渡すと0が返ってくる', function(){
	equal(Sort.sortByID({id:2},{id:2}),0);
});

module( "日付ソート" );
test('{date:小さいDate型},{date:大きいDate型}を渡すと1が返ってくる', function(){
	equal(Sort.sortByDate({date:new Date("2012/12/21")},{date:new Date("2012/12/22")}),1);
});
test('{date:大きいDate型},{date:小さいDate型}を渡すと-1が返ってくる', function(){
	equal(Sort.sortByDate({date:new Date("2012/12/22")},{date:new Date("2012/12/21")}),-1);
});
test('同じdateを渡すと0が返ってくる', function(){
	equal(Sort.sortByDate({date:new Date("2012/12/21")},{date:new Date("2012/12/21")}),0);
});

// module( "地区ソート" );
// test('{date:小さいDate型},{date:大きいDate型}を渡すと1が返ってくる', function(){
// 	equal(Sort.sortByDate({date:new Date("2012/12/21")},{date:new Date("2012/12/22")}),1);
// });
// test('{date:大きいDate型},{date:小さいDate型}を渡すと-1が返ってくる', function(){
// 	equal(Sort.sortByDate({date:new Date("2012/12/20")},{date:new Date("2012/12/19")}),-1);
// });
// test('同じdateを渡すと0が返ってくる', function(){
// 	equal(Sort.sortByDate({date:new Date("2012/12/21")},{date:new Date("2012/12/21")}),0);
// });



/*test('IDソート', function(){
	equal(math(2), 4);//引数2を渡し、結果が4と想定
});

test('土日優先ソート', function(){
	equal(math(2), 4);//引数2を渡し、結果が4と想定
});

test('地域センターソート', function(){
	equal(math(2), 4);//引数2を渡し、結果が4と想定
	same(math(2), 6);//引数2を渡し、結果が6と想定
});

test('座標ソート', function(){
	equal(math(2), 4);//引数2を渡し、結果が4と想定
	same(math(2), 6);//引数2を渡し、結果が6と想定
});
*/