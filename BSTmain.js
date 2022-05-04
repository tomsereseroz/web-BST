import BST, { cat } from './BSTfunctions.js';

main();

function main(){
	console.log('hello');
	let a = new BST(10);
	a.Finsert(15);
	a.Finsert(20);
	a.Finsert(5);
	a.Finsert(3);
	a.Finsert(8);
	cat(a);
}

