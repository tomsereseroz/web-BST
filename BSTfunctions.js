class Node{
    constructor(data)//,level=null)//,parent=null)
    {
        this.data = data;
        this.left = null;
        this.right = null;
        //this.level = level;//node's level in tree
        //this.parent = parent;
    }

    isLeaf(){
        if((this.left==null)&&(this.right==null))
            return true;
        return false;
    }

    isBranch(){//yes, the root is also a branch
        if((this.right != null)||(this.left != null))
            return true;
        return false;
    }

}

export default class BST{
    constructor(data=null){
        this.size = 0;
        this.depth = 0;
        this.root = null;
        if(data==null)
            return this;
        check(data);
        this.root = new Node(data);
        this.size++;
        this.depth++;
        return this;
    }

    isBalanced(){//make sure 2^(depth-1) < size. Tree can be further balanced if not.
        return ((2**(this.depth-1))<this.size);
    }

    insert(data){//maintains balance

    }

    Finsert(value){//fast insert. does not ensure balance
        check(value)
        if(this.root==null){
            this.root = new Node(value);
            this.depth = 1;
        }else
            this.Finsertr(this.root,value,1);
    }

    Finsertr(node,value,depth){//recursive function for fast insert.
        if(node.data == value)//buckets functionality would go here
            return;
        if(node.data > value)
            this.Finsert2(node.left,value,depth)        
        if(node.data < value)
            this.Finsert2(node.right,value,depth)
    }

    Finsert2(childNode,value,depth){
        if(childNode == null){
            childNode = new Node(value);
            this.size++;
            if(depth==this.depth)
                this.depth++;
        }else
            this.Finsertr(childNode,value,depth+1);
        return;
    }

    find(data){//returns node corresponding to given data
        check(data);
        return this.findr(this.root,data);
    }

    findr(node,data){//recursive function for find
        if(node === null)
            return null;
        if(node.data < data)
            return this.findr(node.right,data);
        if(node.data > data)
            return this.findr(node.left,data);
        if(node.data == data)
            return node;
    }

    remove(data){
        check(data);
        this.root = this.remover(this.root,data);
    }

    remover(node,data){//recursive helper function for remove. returns root of tree
        if(node === null)
            return null;
        if(node.data < data)
            node.right = this.remover(node.right,data);
        else if(node.data > data)
            node.left = this.remover(node.left,data);
        else{ //node.data == data -> remove node
            this.size--;
            if(node.isLeaf())
                return null;
            if(node.left==null)
                return node.right;
            if(node.right==null)
                return node.left;
            else{
                this.size++;//increase size since remover will be called again
                //case where current node must not only be removed but replaced.
                //replace deleted node with leftmost child of right subtree. 
                //Checking if rightmost child of left subtree should be replaced instead is probably not worth the computation.
                node.data = this.minVal(node.right);
                node.right = this.remover(node.right,node.data);
        }   }
        return node;//regular case where node is not removed.
    }

    removeL(node){// Logic helper function for remove
        
    }

    maxVal(node){//returns rightmost child data
        if(node.right==null)
            return node;
        return this.maxVal(node.right);
    }

    minVal(node){//returns leftmost child data
        if(node.left==null)
            return node.data;
        return this.minVal(node.left);
    }

    depthl(node){//left-side depth
        if(node.left==null)
            return 0;
        return this.depthl(node.left)+1;
    }

    depthr(node){//right-side depth
        if(node.right==null)
            return 0;
        return this.depthr(node.right)+1;
    }

    maxDepth(node){//computes the maximum depth of subtree. O(N) time
        if (node == null)
            return 0;
        // compute the depth of each subtree
        let lDepth = maxDepth(node.left);
        let rDepth = maxDepth(node.right);
        if (lDepth > rDepth)// use the larger one
            return (lDepth + 1);
        return (rDepth + 1);
    }



    Fdelete(n){
        check(n);
    }

    BFS1(n){//recursive function for BFS, Left-Center-Right
        if(n.left!=null)
            this.BFS1(n.left);
        console.log(n.data);    
        if(n.right!=null)
            this.BFS1(n.right);
        return;
    }

    BFS2(n){//recursive function for BFS, Left-Right-Center
        if(n.left!=null)
            this.BFS2(n.left);
        if(n.right!=null)
            this.BFS2(n.right);
        console.log(n.data);
        return;
    }

    BFS3(n){//recursive function for BFS, Center-Left-Right
        console.log(n.data);
        if(n.left!=null)
            this.BFS3(n.left);
        if(n.right!=null)
            this.BFS3(n.right);    
        return;
    }

    BFS(){//Breadth First Search
        this.BFS1(this.root);
    }

    DFS(){//Depth First Search (DFS traversal)
        if(this.root==null)
            return console.log("null");
        let Q = [];
        Q.push(this.root);
        this.DFSr(Q);
    }

    DFSr(Q){
        let active = Q.shift();
        console.log(active.data);
        if(!active.isLeaf()){
            if(active.left||active.left==0)
                Q.push(active.left);
            if(active.right||active.right==0)
                Q.push(active.right);
        }
        if(Q.length == 0)
            return;
        this.DFSr(Q);
    }
}

function check(n){//input check
    if(!n && (n!=0))//this will throw when n = null, undefined, '', or NaN.
        throw "Error: value is undefined or null!";
    return;
};