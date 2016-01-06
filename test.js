var Check = require('./check');
var path = '';

var check = new Check(
	[
	    {
	        key: 5,
	        name: {
	            isString: true
	        }
	    },
		{
			key: {name:'test object'},
			opt: 'name',
			name: {
				inObject: true
			}
			
		},
		{
			key: ["xml", "html", "css", "js"],
			opt: 'jade',
			name: {
				inArray: true
			}
		},
		{
			key: false,
			name: {
				isBoolean: true
			}
		},		
		{
			key: 'home.css',
			opt: 'css',
			name: {
				isFileType: true
			}
		},
		{
			key: '/Users/haixialiu/Documents/tx工作/nodejs/test',
			name: {
				isDir: true
			}
		},
		{
			key: path,
			opt: 'srcc',
			name: {
				hasDir: true
			}
		},
		{
			key: path,
			opt: 'uzconfig.js',
			opt2: {
				deep: true, //默认false：当前目录查找，true：深度遍历向下查找
				direct: true  //默认false，true：深度遍历向上查找
			},
			name: {
				hasFile: true
			}
		},		
        {
			key: '12344',
			custom : {
				is:'isCustom',
				cb: function(obj){
						return obj == '12344';
					}
			},
			name: {
				isCustom: true
			}
		},	
	], 
	{
		isCustom: 'isCustom'
	}, 
	{
		isCustom: '不等于默认值'
	}
);

// var check = new Check(
// 	[
// 	    {
// 	        key: 'test string',
// 	        name: {
// 	            isString: true
// 	        }
// 	    },
// 		{
// 			key: {name:'test object'},
// 			opt: 'name',
// 			name: {
// 				inObject: true
// 			}
			
// 		},
// 		{
// 			key: ["xml", "html", "css", "js"],
// 			opt: 'css',
// 			name: {
// 				inArray: true
// 			}
// 		},
// 		{
// 			key: 'home.css',
// 			opt: 'css',
// 			name: {
// 				isFileType: true
// 			}
// 		},
// 		{
// 			key: '/Users/haixialiu/Documents/tx工作/nodejs/test',
// 			name: {
// 				isDir: true
// 			}
// 		}	
// 	]
// );


//检查结果
console.log(check.result)