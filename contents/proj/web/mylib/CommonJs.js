// Generated by CoffeeScript 1.9.3
(function() {
  this.CommonJs = (function() {
    function CommonJs() {}

    CommonJs.prototype.http_port = 8080;

    CommonJs.prototype.ws_port = 8080;

    CommonJs.prototype.get_params = function(url) {
      var i, len, param, params, query, ref, val;
      params = {};
      query = url.replace(/.*\?(.*)$/, "$1");
      if (url === query) {
        return params;
      } else {
        ref = query.split("&");
        for (i = 0, len = ref.length; i < len; i++) {
          val = ref[i];
          param = val.split("=");
          val = param[1];
          if (val) {
            if (val.match(",")) {
              val = val.split(",");
            }
          } else {
            val = 1;
          }
          params[param[0]] = val;
        }
        return params;
      }
    };

    return CommonJs;

  })();

  if (typeof module !== "undefined" && module !== null) {
    module.exports = this.CommonJs;
  }

}).call(this);