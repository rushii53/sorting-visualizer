import { store } from "../../app/store"
import { setArray,setCompareArray,setPivote,setSortedArray, setSwapArray } from "../../reducers/animation";
import { setRunning } from "../../reducers/interaction";

const partition=async(array,left,right,speed)=>{
    let pivote=array[right];
    store.dispatch(setPivote(right));
    let l=left;
    let r=right-1;
    while(l<=r){
        while(array[l]<pivote){
            if(l!=r){
                store.dispatch(setCompareArray([l,r]));
                await new Promise((resolve)=>setTimeout(resolve,speed));
            }
            l++;
        }
        while(array[r]>pivote){
            if(l!=r){
                store.dispatch(setCompareArray([l,r]));
                await new Promise((resolve)=>setTimeout(resolve,speed));
            }
            r--;
        }
        if(l<=r){
            if(l<r){
                store.dispatch(setCompareArray([l,r]));
                await new Promise((resolve)=>setTimeout(resolve,speed));
                store.dispatch(setSwapArray([l,r]));
                await new Promise((resolve)=>setTimeout(resolve,speed));
                let temp=array[r];
                array[r]=array[l];
                array[l]=temp;
                store.dispatch(setArray([...array]));
                await new Promise((resolve)=>setTimeout(resolve,speed));
                store.dispatch(setSwapArray([]));
            }
            l++;
            r--;
        }
        store.dispatch(setCompareArray([]));
    }
    store.dispatch(setPivote(null));
    if(l!=right){
        store.dispatch(setSwapArray([right,l]));
        await new Promise((resolve)=>setTimeout(resolve,speed));
    }
    array[right]=array[l];
    array[l]=pivote;
    store.dispatch(setArray([...array]));
    await new Promise((resolve)=>setTimeout(resolve,speed));
    store.dispatch(setSwapArray([]));
    return l;
}
const quick_Sort=async(array,left,right,speed)=>{
    let stack=[];
    let sortedArr=[];
    stack.push({left,right});
    while(stack.length>0){
        const {left,right}=stack.pop();
        if(left<right){
            let pivote=await partition(array,left,right,speed);
            sortedArr.push(pivote);
            store.dispatch(setSortedArray([...sortedArr]));
            //if only one element is present at right or left side of pivote, so that element is already sorted, we will push it to sorted array
            if(left===pivote-1){
                await new Promise((resolve)=>setTimeout(resolve,speed));
                sortedArr.push(left);
                store.dispatch(setSortedArray([...sortedArr]));
            }
            if(right===pivote+1){
                await new Promise((resolve)=>setTimeout(resolve,speed));
                sortedArr.push(right);
                store.dispatch(setSortedArray([...sortedArr]));
            }
            //otherwise we will call the function
            if(right!=pivote+1){
                stack.push({left:pivote+1,right});
            }
            if(left!=pivote-1){
                stack.push({left,right:pivote-1});
            }
        }
    }
}
export const quickSort=async()=>{
    store.dispatch(setRunning(true));
    let state=store.getState();
    let speed=state.animate.speed;
    let array=[...state.animate.array];
    await quick_Sort(array,0,array.length-1,speed);
    store.dispatch(setArray([...array]));
    await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
    store.dispatch(setSortedArray([]));
    store.dispatch(setRunning(false));
}