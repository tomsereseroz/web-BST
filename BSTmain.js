import BST from './BSTfunctions.js';

main();

function main(){
	console.log('hello');
	let a = new BST(10);
	let b = [15,20,5,3,8,14];
	b.forEach(element => a.Finsert(element));
	console.log('here');
	a.Finsert(2);
	a.BFS();
	a.DFS();
	console.log(a);
	a.remove(10);
	console.log(a);
	a.DFS();
}

