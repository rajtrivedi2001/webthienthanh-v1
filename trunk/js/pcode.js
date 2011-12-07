/**
 * Guillermo Horno (c) Creative Commons 2009
 * http://creativecommons.org/licenses/by-sa/2.5/ar/deed.en_US
 *
 */

var ValidationRequest = function(){
    var url_base = "http://s3e2.com/log/";
    var gif_name = "gif.php";
    function getParamString(param_arr){
        /**
        * This function creates the string to append to the gif. The last parameter is a timestamp,
        * this ensures that the request is made, preventing the browser from getting the gif from the cache
        */
        var param_str = "?";
        for(key in param_arr){
            param_str += key + "=" + param_arr[key] + "&";
        }
        param_str += "timestamp=" + getTimeStamp();
        return param_str;
    }
    function getTimeStamp(){
        /**
        * Creates a timestamp string
        */
        var date = new Date();
        return ""+date.getFullYear() + date.getMonth() + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds();
    }
    return {
        request: function(params,callback){
            /**
             * Makes the gif request. Takes 2 parameters:
             * params: an associative array with the keys as parameter name, and the value as the parameter value
             * callback: function that's called when the image is loaded
             */
            var req_img = new Image();
            req_img.src=url_base + gif_name + getParamString(params);
            if(callback){
                req_img.onload = callback; 
            }
        }
    }
}();
