import { store } from "../../app/store"
import { setArray, setCompareArray, setSortedArray, setSwapArray } from "../../reducers/animation";
import { setRunning } from "../../reducers/interaction";

const conqure=async(array,leftIdx,mid,rightIdx,isFinalSwap)=>{
    let state=store.getState();
    let speed=state.animate.speed;
    let i=leftIdx;
    let j=mid+1;
    let k=0;
    let array_1=[...array];
    let sortedArr=[];
    let newTempArray=[];
    let newTempSortedArray=[];
    let compareArr=[];
    let swapArr=[];
    while(i<=mid && j<=rightIdx){
        compareArr=[i,j];
        store.dispatch(setCompareArray([...compareArr]));
        await new Promise((resolve)=>setTimeout(resolve,speed));
        if(array_1[i]<=array_1[j]){
            newTempArray[k]=array_1[i];
            i++;
            store.dispatch(setCompareArray([]));
        }
        else{
            store.dispatch(setCompareArray([]));
            newTempArray[k]=array_1[j];
            swapArr=[i,j];
            store.dispatch(setSwapArray([...swapArr]));
            await new Promise((resolve)=>setTimeout(resolve,speed));
            swapArr=[i,i+1];
            newTempSortedArray=[...newTempArray,...array_1.slice(i,mid+1),...array_1.slice(j+1,rightIdx+1)];
            let m=leftIdx;
                for(let i=0;i<newTempSortedArray.length;i++){
                    array[m]=newTempSortedArray[i];
                    m++;
                }
            store.dispatch(setSwapArray([...swapArr]));
            store.dispatch(setArray([...array]));
            await new Promise((resolve)=>setTimeout(resolve,speed));
            store.dispatch(setSwapArray([]));
            j++;
        }
        k++;
    }
    while(i<=mid){
        newTempArray[k]=array_1[i];
        i++;
        k++;
    }
    while(j<=rightIdx){
        newTempArray[k]=array_1[j];
        j++;
        k++;
    }
  
    j=leftIdx;
    for(let i=0;i<newTempArray.length;i++){
        if(isFinalSwap){
            sortedArr.push(i);
            store.dispatch(setSortedArray([...sortedArr]));
            if(speed<'600'){
                speed='10';
                speed<='300'?speed='30':'100'
            }
            await new Promise(resolve=>setTimeout(resolve,speed));
        }
        array[j]=newTempArray[i];
        j++;
    }
    store.dispatch(setArray([...array]));
}
const divide=async(array,leftIdx,rightIdx,size,isFinalSwap)=>{
    if(leftIdx>=rightIdx){
        return;
    }
    let mid=Math.floor(leftIdx+(rightIdx-leftIdx)/2);
    await divide(array,leftIdx,mid,size,isFinalSwap);
    await divide(array,mid+1,rightIdx,size,isFinalSwap);
    if(leftIdx+rightIdx+1==size){
        isFinalSwap=true;
    }
    await conqure(array,leftIdx,mid,rightIdx,isFinalSwap);
}
export const mergeSort=async()=>{
    store.dispatch(setRunning(true));
    let state=store.getState();
    let array=[...state.animate.array];
    let size=array.length;
    let isFinalSwap=false;
    await divide(array,0,size-1,size,isFinalSwap);
    store.dispatch(setArray([...array]));
    await new Promise(resolve=>setTimeout(resolve,1000));
    store.dispatch(setSortedArray([]))
    store.dispatch(setRunning(false));
}