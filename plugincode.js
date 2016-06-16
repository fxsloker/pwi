//-------!!!!!!!!!!!!!!!-----------THIS PART IS MAIN PART:         
function findAllUrl1()
{
    //lets get current URL known
    var curloc=''+window.location;
    console.log('PWI: current location is '+curloc);
    //lets create variable for new location
    var newloc='';
    //get current hour in variable
    var da = new Date();
    //check, maybe localstorage already showing, that we has redirected user once
    if(localStorage['pwi_check']!=da.getHours())
    {
        //check, maybe our partner tag already here?
        if( curloc.indexOf('projworlimpa-20') < 1)
        {
            //showing alert to make some pause
            //alert('press ok and you will be redirected to new url '+newloc);
                        
            //window.location=newloc;
            //alert('redirecting. local storage is: '+localStorage['pwi_check']);
            //special variable, enabled when current url have httpS 
            var httpp='?type=http';
            if(curloc.indexOf('https:')>0)
            { httpp='?type=https'; }
            //making amazon url in variable
            var gobackto='&gobackto='+base64_encode(curloc);
            //going to redirect
            window.location='http://manatki.net/tools/pwi.php'+httpp+gobackto;
        }
        else
        {
            //show message, about our tag already here
            console.log("PWI: our affiliate tag already in URL!");
            localStorage['pwi_check']=da.getHours();
            //alert('localstorage set to:'+localStorage['pwi_check']);
        }
    }
    else
    {
        console.log("PWI: our affiliate id already installed in that hour");
        console.log("PWI:"+localStorage['pwi_check']);
    }
}
//auto execute our function
//findAllUrl1();

//The Affiliate ID to use is: ?tag=projworlimpa-20
//The UserID to also add is 111222333 (as mentioned, this will be used to track which user made the purchase)
function base64_encode( data ) {    // Encodes data with MIME base64
    // 
    // +   original by: Tyler Akins (http://rumkin.com)
    // +   improved by: Bayron Guevara

    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i=0, enc='';

    do { // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);

        bits = o1<<16 | o2<<8 | o3;

        h1 = bits>>18 & 0x3f;
        h2 = bits>>12 & 0x3f;
        h3 = bits>>6 & 0x3f;
        h4 = bits & 0x3f;

        // use hexets to index into b64, and append result to encoded string
        enc += b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);

    switch( data.length % 3 ){
        case 1:
            enc = enc.slice(0, -2) + '==';
        break;
        case 2:
            enc = enc.slice(0, -1) + '=';
        break;
    }

    return enc;
}



//in this part we intercept "proceed to checkout" button click and collect and send data to our server

$('[name="proceedToCheckout"]').click(function(){ 

   if(window.confirm("Are you OK with sending your purchase data to PWI server?"))
   {
   //collect total items and price
    var dataforpwi=$('#gutterCartViewForm > div.a-box-group > div.a-box.a-color-alternate-background > div > div.sc-subtotal.a-spacing-mini > p > span').text();
    var goods = [];
    $('.sc-list-item-content').each(function(i) {
        goods.push([$('.sc-product-title', this).text(),$('.sc-product-price', this).text()]);
    });
    goods = JSON.stringify(goods);
   //collect which items user ordered
    var cartcontent=$('#activeCartViewForm > div.sc-list-body > div > div.sc-list-item-content > div.a-row.a-spacing-base.a-spacing-top-base > div.a-column.a-span8 > div > div > div.a-fixed-left-grid-col.a-col-right > ul > li:nth-child(1) > span > a > span').text();
    //alert(cartcontent);
    
   /* var pwiserverurl = 'http://manatki.net/tools/pwi.php?orderid='+base64_encode(dataforpwi)+'&cartcontent='+base64_encode(goods);*/
    /*var leaddata = $.ajax({type: "GET", url: pwiserverurl, async: false}).responseText;*/

    chrome.runtime.sendMessage({
        method: 'POST',
        action: 'xhttp',
        url: 'http://manatki.net/tools/pwi.php?orderid='+base64_encode(dataforpwi)+'&'+'cartcontent='+base64_encode(goods),
    }, function(responseText) {
        alert(responseText);
        /*Callback function to deal with the response*/
    });    
    //$.get( pwiserverurl );
    //alert('sending to pwi server:'+dataforpwi);   
   }
});