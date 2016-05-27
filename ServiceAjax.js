/*
Servicio para llamadas Ajax con jquery (soporte para callback)
TODO: Mejorar metodos 'get' y 'set' remover el uso del switch statement (sugerencia: utilizar object.hasOwnProperty)

//Ejemplo:
	//Variable para construccion
	var send = {
		url: "http://search.twitter.com/search.json?q=iscenigmax&count=10&callback=?",
		datatype: "jsonp"
	};

	//Declaracion del objeto y ejecucion
	var oAjax = new ServiceAjax(send);
	oAjax.execute(onSuccess,onError);

	//Lectura de datos
	function onSuccess(datos) {
		console.log(datos);
	}
    function onError() {
        console.log('Hubo un error');
    }
*/
Usar defineprotoype para las definiciones
use sctrict
hacer un enclusure y psar jquery $
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
aplicar el clojure  de coffe
(function(){

}())

var GX = GX || {}; //Nameespace
GX.ServiceAjax = function (opt) {
    this.global = false;
    this.url = "";
    //GET(SQL SELECT),POST(SQL INSERT),PUT(SQL UPDATE),DELETE(SQL DELETE)
    this.type = "POST";
    this.cache = false;
    this.async = false;
    //(www,json,text,xml,script)
    this.contenttype = "json";
    this.data = {};
    //(xml,json,jsonp,script,html)
    this.datatype = "json";
    this.timeout = 10;
    $.extend(this, opt);
};
GX.ServiceAjax.prototype.get = function (atr) {
    switch (atr) {
        case "timeout":
            return 1000 * this.timeout;
        case "global":
            return this.global;
        case "url":
            return this.url;
        case "type":
            return this.type;
        case "cache":
            return this.cache;
        case "async":
            return this.async;
        case "contenttype":
            switch (this.contenttype) {
                case "json" || "text" || "xml" || "script":
                    return "application/" + this.contenttype + "; charset=utf-8";
                case "www":
                    return "application/x-www-form-urlencoded; charset=utf-8";
                default:
                    return "application/x-www-form-urlencoded; charset=utf-8";
            } break;
        case "data":
            return JSON.stringify(this.data);
        case "datatype":
            if (this.datatype == "script" || this.datatype == "json" || this.datatype == "xml" || this.datatype == "html" || this.datatype == "jsonp") {
                return this.datatype;
            }
            else {
                return "html";
            } break;
        default:
            console.log("No existe la propiedad: " + atr);
            return "";
    }
};
GX.ServiceAjax.prototype.set = function (atr, val) {
    switch (atr) {
        case "global":
            this.global = val; break;
        case "timeout":
            this.datareturn = val; break;
        case "url":
            this.url = val; break;
        case "type":
            this.type = val; break;
        case "cache":
            this.cache = val; break;
        case "async":
            this.async = val; break;
        case "contenttype":
            this.contenttype = val; break;
        case "data":
            this.data = val; break;
        case "datatype":
            this.datatype = val; break;
        default:
            console.log("No existe la propiedad: " + atr);
    }
};
//TODO: cambiar a .done and .error
GX.ServiceAjax.prototype.execute = function (fnn,fnnE) {
    $.ajax({
        global: this.global,
        timeout: this.get("timeout"),
        url: this.url,
        type: this.type,
        cache: this.cache,
        async: this.async,
        contentType: this.get("contenttype"),
        data: this.get("data"),
        dataType: this.get("datatype"),
        success: function (data, status) {
            if (typeof fnn === "function") {
                fnn(data);
            }
            else {
                return data;
            }
        },
        error: function (request, status, error) {
            if (typeof fnnE === "function") fnnE();
            if (typeof status !== 'undefined' && status === 'timeout') {
                alert('Se ha alcanzado el tiempo de espera. Revisar conexion al servidor.');
            }
            else {
                alert(status + " : " + error);
            }
        }
    });
};


 $.ajax('api/models',
        {
            'name': 'foo'
        }
    ).done(function(data) {
        alert( "success" );
        do_dom_manipulation(data)
    })
    .fail(function() {
        alert( "error" );
    })
    .always(function() {
        alert( "complete" );
    });
