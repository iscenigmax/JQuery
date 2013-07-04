//FECHAS Y HORAS
function MNDateJSON(str) {
    if (str !== null && str !== 'undefined' && str !== '') {
        var dtTmp = new Date(parseInt(str.substr(6)));
        var strDate = dtTmp.getDate() + '/' + (dtTmp.getMonth() + 1) + '/' + dtTmp.getFullYear() + ' ' + dtTmp.getHours() + ':' + dtTmp.getMinutes();
        return strDate;
    }
};
function MNDate(str) {
	if (str == null || str == '') {
		return '';
	}
	else {
		var strDate = new Date();
		var arrayDate = new Array();
		var arrayTime = new Array();
		arrayDate = str.substr(0, 10).split('-');
		arrayTime = str.substr(11).split(':');
		return new Date(arrayDate[0], (arrayDate[1] - 1), arrayDate[2], arrayTime[0], arrayTime[1], arrayTime[2]);
	}
};
function MNHour(str) {
	str = $.trim(str);
	if (str == null || str == '') {
		return '';
	}
	else {
		var strDate = new Date();
		var arrayTime = new Array();
		pos = str.indexOf("T");
		if (pos != -1) str = str.substr(pos + 1);
		arrayTime = str.split(':');
		return new Date(strDate.getFullYear(), strDate.getMonth(), strDate.getDay(), arrayTime[0], arrayTime[1]);
	}
};
//TEXTO
function MNS(str) {
	if (str == null) {
		return '';
	}
	else {
		//this.replace(/^\s+/, '').replace(/\s+$/, '');
		str = (str == null ? '' : str);
		return $.trim(str).toUpperCase().replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g, '');
	}
};
function IsBlank(s) {
	for (var i = 0; i < s.length; i++) {
		var c = s.charAt(i);
		if ((c != ' ') && (c != '\t')) return false;
	}
	return true;
};
//NUMEROS
function MNI(str) {
  if (typeof str === 'undefined')
  {
    return 0;
  }
  else
  {
    if (typeof str === 'null')
    {
      return 0;
    }
    else
    {
      if (!jQuery.isNumeric(str))
      {
        return 0;
      }
      else
      {
        return parseInt(str,10);
      }
    }
  }
};
function MND(str, decimal) {
    if (!jQuery.isNumeric(str)) {
        return 0;
    }
    else {
        str = (str === null ? 0 : str);
        if (decimal !== undefined && decimal !== null) {
            if (!jQuery.isNumeric(decimal)) {
                decimal = 0;
            }
            else {
                if (decimal > 20) {
                    decimal = 20;
                }
                else {
                    if (decimal < 0) {
                        decimal = 0;
                    }
                }
            }
            str = str.toFixed(decimal);
        }
        return str;
    }
}
//LOGICOS
function MNBool(str) {
    if (typeof str == 'boolean') {
        str.toString().toLowerCase();
		return new Boolean(str);
	}
	else {
		str = (str == null ? 0 : str);
		switch (str.toString().toLowerCase()) {
			case 'true': case 'yes': case '1': return true;
			case 'false': case 'no': case '0': case null: case '': return false;
			default: return new Boolean(str);
		}
	}
};
