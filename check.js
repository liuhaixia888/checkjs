var fs = require('fs');
var path = require('path');
var lab = require('linco.lab');
var lib = lab.lib;

lib.extend({
	// 判断对象有某个属性或方法
	isEmptyArray: function(obj){
		return lib.isArray( obj ) && obj.length === 0;
	},

	// 判断值是否是boolean类型
	isBoolean: function(value){
		return typeof value === "boolean";
	},

	// 检查文件类型是否是指定类型
	inObject: function(obj, opt){
		return opt in obj;
	},

	// 判断数组中有某个元素
	inArray: function(arr, opt){
		for (var i = 0; i< arr.length; i++ ) {
			if(arr[i] == opt){
				return true;
			} 
		}
		return false;	
	},

	//检查文件类型
	isFileType: function(file, opt){
		return file.substring(file.lastIndexOf('.')+1) == opt ? true : false;
	},

	//检查是否空路径
	isEmptyDirectory: function(file, opt){
		return lib.dir(file, {deep:false}) && lib.dir(file, {deep:false}).folders.length == 0;
	},

	//检查文件是否存在
	hasFile: function(files, opt, opt2){
		var deep = opt2.deep || false;
		var direct = opt2.direct || false;
		var f;

		// 默认只查找当前目录
		if(!deep && !direct){
			f = lib.dir(files, {deep:false, onlyFile: [opt]}).files;
		}

		// 深度遍历向下查找
		if(deep && !direct){
			f = lib.dir(files, {deep:true, onlyFile: [opt]}).files;
		}

		// 深度遍历向上查找
		if(direct){
			f = lib.findFileUp(files, opt);
		}			

		if( f.length){
			return true;
		}

		return false;
	},

	findFileUp: function(files, opt, fn){
	    var folder = files;
	    var filepath = path.join(folder, opt);
	    var fn = fn || function(filepath){ return lib.isFile(filepath) };

	    if(lib.isFile(filepath) && fn(filepath)){
	        return filepath
	    }

	    // 当 folder !== '/'
	    // 递归向父级查询
	    while(folder !== '/'){
	        folder = path.dirname(folder);
	        filepath = path.join(folder, opt);

	        // 检查filepath是否存在
	        // 检查fn条件是否达成
	        if(lib.isFile(filepath) && fn(filepath)) break;
	    }

	    return lib.isFile(filepath) && fn(filepath) ? filepath : [];
	},

	//检查文件夹是否存在
	hasDir: function(file, opt){
		var str = lib.dir(file, {deep:false}).folders.join('|').replace(file, '');

		if(str.indexOf('/' + opt) > -1){
			return true;
		}

		return false;
	},

	//检查目标路径是否存在
	hasDirectory: function(file, opt){
		return lib.hasDir(file, opt);
	}	

});

var mapBase = {
		isString: 'isString',
		isFunction: 'isFunction',
		isNumber: 'isNumber',
		isBoolean: 'isBoolean',
		isPlainObject: 'isPlainObject',
		isEmptyObject: 'isEmptyObject',
		isArray: 'isArray',
		isEmptyArray: 'isEmptyArray',
		inArray: 'inArray',
		inObject: 'inObject',
		isFileType: 'isFileType',
		isDir: 'isDir',
		isFile: 'isFile',
		isEmptyDirectory: 'isEmptyDirectory',
		hasFile: 'hasFile',
		hasDir: 'hasDir',
		hasDirectory: 'hasDirectory'		
	},
	errMsgBase = {
		isString: '非字符串',
		isFunction: '非函数',
		isNumber: '非数字',
		isBoolean: '非布尔类型',
		isPlainObject: '非对象',
		isEmptyObject: '非空对象'	,
		isArray: '非数组',
		isEmptyArray: '空数组',
		inArray: '数组没有此元素',
		inObject: '对象没有此属性或方法',
		isFileType: '不是此类型的文件',
		isDir: '目标路径不是文件夹',
		isFile: '目标路径不是文件',
		isEmptyDirectory: '目标路径为非空目录',
		hasFile: '目标路径下文件不存在',
		hasDir: '目标路径下文件夹不存在',
		hasDirectory: '目标路径不存在'
	};


var Check = function(arr, map, errMsg){
	this.arr = arr;

	this.arr.forEach(function(reg){
		if(reg.custom){
			var is = reg.custom.is, cb = reg.custom.cb;
			var objFn = {};
			objFn[is] = cb;
			lib.extend(objFn);	
		}
	});

	this.map = lib.extend(mapBase, map || {});
	this.errMsg = lib.extend(errMsgBase, errMsg || {});

	this.result = this.init.call(this, this.arr, this.map, this.errMsg);

};

Check.prototype = {

	init: function(arr, map, errMsg){
		return this._check(arr, map, errMsg);
	},

	_check: function(arr, map, errMsg){
		var errArray = [], err;

		arr.forEach(function(reg, index){
			var key = reg.key, opt = reg.opt, opt2 = reg.opt2;

			for(var n in reg.name){

				if(map[n] && errMsg[n] && !lib[map[n]](key, opt, opt2) === reg.name[n] ){
					var objMsg = {};
					objMsg.index = index;
					objMsg.check = n;
					objMsg.key = key;
					objMsg[n] = errMsg[n];

					errArray.push(objMsg);
				}
			}

		});
		
		if( errArray.length ){

			return {code: '1', msg: errArray}
		}else{

			return {code: '0'}
		}	

	}

}

module.exports = Check;