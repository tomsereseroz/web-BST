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
        this.root = null;
        if(data==null)
            return this;
        check(data);
        return this.init(data);
    }
    
    init(data){//take out this. make user handle array inputs.
        if(Array.isArray(data)){
            this.size = data.length;
            this.root = new Node(data[0]);
            this.size = 1;
            data.shift();
            if(data.length > 0)
                this.Finsertr(root,data);
            return this;
        }
        this.root = new Node(data);
        this.size = 1;
        return this;
    }

    isOptimal(){//make sure max depth - min depth <= 1. 

    }

    insert(data){//maintains optimality

    }

    Finsert(value){//fast insert. separates arrays into individual elements before inserting. does not ensure optimality
        check(value)
        if(this.root==null)
            this.init(value)
        try{this.Finsertr(this.root,value)}
        catch{console.log("error in Finsert");}
    }

    Finsertr(node,value){//recursive function for fast insert
        if(node.data == value)//buckets functionality would go here
            return;

        if(node.data > value){
            if(node.left == null){
                this.size++;
                node.left = new Node(value);
                return;
            }
            this.Finsertr(node.left,value);
            return;
        }
           
        if(node.data < value){
            if(node.right == null){
                this.size++;
                node.right = new Node(value);
                return;
            }
            this.Finsertr(node.right,value);
            return;
        }
        //code should not get here
        throw  "Finsertr could not compare data";
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
        //code should not get here
        throw "findr could not compare data";
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
        if(node.data > data)
            node.left = this.remover(node.left,data);
        //else node.data == data -> remove node
        this.size--;
        if(node.isLeaf())
            return null;
        if(node.left==null)
            return node.right;
        if(node.right==null)
            return node.left;
        else{
            this.size++;
            //case where both left and right are filled nodes. 
            //replace node with leftmost child of right subtree or rightmost child of left subtree 
            let ldepth = this.depthr(node.left);
            let rdepth = this.depthl(node.right);
            if(ldepth > rdepth){//replace node with rightmost child on left subtree
                node.data = this.maxVal(node.left);
                node.left = this.remover(node.left,node.data);
            }else{
                node.data = this.minVal(node.right);
                node.right = this.remover(node.right,node.data);
            }
        }
        return node; 
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

    computedepth(node){//returns the depth of tree below [node]

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