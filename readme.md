# checkjs

### 用法

用于检查各种条件是否符合预期

##### 默认可以检查的项，也可以自己扩展
```
isString: '非字符串',
isFunction: '非函数',
isNumber: '非数字',
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
```

##### 所有参数都是可选参数
```
var Check = require('./check');

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

//检查结果
console.log(check.result)
{ code: '1',
  msg: 
   [ { index: 0, check: 'isString', key: 5, isString: '非字符串' },
     { index: 2, check: 'inArray', key: [Object], inArray: '数组没有此元素' },
     { index: 6,
       check: 'hasDir',
       key: '/Users/haixialiu/Documents/tx工作/nodejs/test',
       hasDir: '目标路径下文件夹不存在' } 
   ] 
}

===============================================================================================

var check = new Check(
	[
	    {
	        key: 'test string',
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
			opt: 'css',
			name: {
				inArray: true
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
		}	
	]
);

//检查结果
console.log(check.result)
{ code: '0' } //全部通过检查
     
```	 

##### 需要检查的所有项作为参数放到数组中
```
[
	    {
	        key: str, //检查的内容可以是常规数据类型/路径/文件/文件夹/自定义内容
	        name: {
	            isString: true
	        }
	    }
]	    
```    
##### 如果自定义检查项需要配置参数 @custom，还需要增加map属性，errMsg错误提示，直接作为函数的第二、第三个参数；
##### 如果增加了custom属性，但是未配置map errMsg也不会做任何检查。
```
[
		{
			key: '12344',
			custom : {
				is:'isCustom',
				cb: function(obj){
						return obj == '123';
					}
			},
			name: {
				isCustom: true
			}
		},
		{
			isCustom: 'isCustom'
		}, 
		{
			isCustom: '不等于默认值'
		}		
]	    
```   
