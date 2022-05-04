export default class BST{
    constructor(n,parent = null){
        check(n);
        this.value = n;
        this.parent = parent;
        this.Lchild = null;
        this.Rchild = null;
        this.depth = 0;
        if(this.parent!=null)
            this.depth = this.parent.depth + 1;
        
    }

    insert(n){
        check(n);
    }

    Finsert(n){
        check(n);
        if(this.value == n)//buckets functionality would go here
            return;

        if(this.value > n){
            if(this.Lchild == null){
                this.Lchild = new BST(n,this);
                return;
            }
            this.Lchild.Finsert(n);
            return;
        }
           
        if(this.value < n){
            if(this.Rchild == null){
                this.Rchild = new BST(n,this);
                return;
            }
            this.Rchild.Finsert(n);
            return;
        }
        //code should not get here
        throw  "some values could not be compared";
    }

    delete(n){
        check(n);
    }
    Fdelete(n){
        check(n);
    }

    isRoot(){
        if(!parent && parent!=0)
            return true;
        return false;
    }

    isLeaf(){
        if((this.Lchild=null)&&(this.Rchild=null))
            return true;
        return false;
    }

    isBranch(){//yes, the root is also a branch
        if(this.Rchild || this.Lchild ||
             this.Rchild==0 || this.Lchild==0 )
            return true;
        return false;
    }

}

function check(n){//input check
    if(!n && (n!=0)){//this will throw when n = null, undefined, '', NaN. n=0 can pass.
        throw "n is undefined or null!";
    }
    return;
}

export function cat(BST){//breadth-first concatonation
    if(BST.Lchild!=null)
        cat(BST.Lchild);
    console.log(BST.value);    
    if(BST.Rchild!=null)
        cat(BST.Rchild);
    return;
}