"use strict"

export function validateUrl(url) {
	let reg=/(((http|https|ftp|ftps):\/\/)|www\.)[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:\/~\+#!]*[\w\-\@?^=%&amp;\/~\+#])?/;
	if(reg.test(url) === false)
		return false
	else
		return true
}

export function extractCode(url) {
	let str = url.hash.substring(2,url.hash.indexOf('?'))
	return str
	console.log(str)
}
