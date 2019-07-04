// function splitArray(array, chunk)
// {
//   var i,j, rslt = [];
//   //chunk = chunk - 1;
//   for (i=0,j=array.length; i<j; i+=chunk) {
//   rslt.push(array.slice(i,i+chunk));
//   }
//   return rslt;
// }
  
  
  // Split in half
  let scinder = Math.floor(csvData.length / 2);
  console.log(scinder);
  let retourTab = splitArray(csvData, scinder);
  console.log(retourTab);

  //Recursive sort
  let tab1 = $.extend(true, [], retourTab[0]);
  console.log("tableau 1: ");
  console.log(tab1);
  let tab2 = $.extend(true, [], retourTab[1]);
  console.log("tableau 2: ");
  console.log(tab2);

  // Variables
  let n = csvData.length;
  let m = scinder;
  let i = 1;
  let j = m + 1;
  let k = 1;
  console.log("Var:" + " n: " + n + " m: " + m + " i: " + i + " j: " + j + " k: " + k);

  // Traitement
  //while (i <= m && j <= n) {}
  const mergeSort = nums => {
    const sortedArray = [...nums];
    if (sortedArray.length < 2) {
      return nums;
    }
    const length = sortedArray.length;
    const middle = Math.floor(length / 2);
    const left = sortedArray.slice(0, middle);
    const right = sortedArray.slice(middle);
    
    return merge(mergeSort(left), mergeSort(right));
  };
  
  const merge = (left, right) => {
    const results = [];
    while (left.length && right.length) {
      if (left[0] <= right[0]) {
        results.push(left.shift());
      }
      else {
        results.push(right.shift());
      }
    }
    return results.concat(left, right);
  };

  /////////////
// 
// Merge Sort Implentation (Recursion)
//

function mergeSort (unsortedArray) {
  // No need to sort the array if the array only has one element or empty
  if (unsortedArray.length <= 1) {
    return unsortedArray;
  }
  // In order to divide the array in half, we need to figure out the middle
  const middle = Math.floor(unsortedArray.length / 2);

  // This is where we will be dividing the array into left and right
  const left = unsortedArray.slice(0, middle);
  const right = unsortedArray.slice(middle);

  // Using recursion to combine the left and right
  return merge(
    mergeSort(left), mergeSort(right)
  );
}

// Merge the two arrays: left and right
function merge (left, right) {
  let resultArray = [], leftIndex = 0, rightIndex = 0;

  // We will concatenate values into the resultArray in order
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      resultArray.push(left[leftIndex]);
      leftIndex++; // move left array cursor
    } else {
      resultArray.push(right[rightIndex]);
			rightIndex++; // move right array cursor
    }
  }

  // We need to concat to the resultArray because there will be one element left over after the while loop
  return resultArray
          .concat(left.slice(leftIndex))
          .concat(right.slice(rightIndex));
}

///////////////////////////////////////////////

function fusionner(t1, t2) {  
  var i = 0, j = 0, k = 0;  
  var n = t1.length, m = t2.length;  
  var t = new Array(n+m);  
  
  while (i < n && j < m) {  
    if (t1[i] < t2[j]) {  
      t[k] = t1[i];  
      i++;  
    } else {  
      t[k] = t2[j];  
      j++;  
    }  
    k++;  
  }  
  while (i < n) {  
    t[k] = t1[i];  
    i++;  
    k++;  
  }  
  while (j < m) {  
    t[k] = t2[j];  
    j++;  
    k++;  
  }  
  return t;  
}  
  
function trier(t) {  
  
  var n = t.length;  
  var t1, t2;  
  
  if (n == 0 || n == 1) {  
    return t;  
  } else {  
    t1 = trier(t.slice(0,n/2));  
    t2 = trier(t.slice(n/2));  
    return fusionner (t1,t2);  
  }  
}

////////////////////////////////////////////////////
// quick sort /////////////////////
//////////////////////////////////

function quickSort(arr, left, right){
  var len = arr.length, 
  pivot,
  partitionIndex;


 if(left < right){
   pivot = right;
   partitionIndex = partition(arr, pivot, left, right);
   
  //sort left and right
  quickSort(arr, left, partitionIndex - 1);
  quickSort(arr, partitionIndex + 1, right);
 }
 return arr;
}

function partition(arr, pivot, left, right){
  var pivotValue = arr[pivot],
      partitionIndex = left;

  for(var i = left; i < right; i++){
   if(arr[i] < pivotValue){
     swap(arr, i, partitionIndex);
     partitionIndex++;
   }
 }
 swap(arr, right, partitionIndex);
 return partitionIndex;
}

function swap(arr, i, j){
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
// https://khan4019.github.io/front-end-Interview-Questions/sort.html#quickSort

/////////////////////////////////////////////////////////////
/////////////// Heap Sort ///////////////////////////////////
/////////////////////////////////////////////////////////////

function heapSort(arr){
  var len = arr.length,
      end = len-1;

  heapify(arr, len);
  
  while(end > 0){
   swap(arr, end--, 0);
   siftDown(arr, 0, end);
  }
  return arr;
}

function heapify(arr, len){
  // break the array into root + two sides, to create tree (heap)
  var mid = Math.floor((len-2)/2);
  while(mid >= 0){
   siftDown(arr, mid--, len-1);    
 }
}

function siftDown(arr, start, end){
  var root = start,
      child = root*2 + 1,
      toSwap = root;
  while(child <= end){
     if(arr[toSwap] < arr[child]){
       swap(arr, toSwap, child);
     }
     if(child+1 <= end && arr[toSwap] < arr[child+1]){
       swap(arr, toSwap, child+1)
     }
     if(toSwap != root){
        swap(arr, root, toSwap);
        root = toSwap;
     }
     else{
        return; 
     }
     toSwap = root;
     child = root*2+1
 }
}

function swap(arr, i, j){
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

////////////////////////////////////////////////////////////
