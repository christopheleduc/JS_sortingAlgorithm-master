// Converts from degrees to radians.
Number.prototype.toRadians = function() {
  return this * Math.PI / 180;
};


// Calculates the distance between Grenoble and the given city
function distanceFromGrenoble(city)
{
  console.log("distanceFromGrenoble - complete !");
  var GrenobleLat = 45.166667;
  var GrenobleLong = 5.716667;

  // mon code
//console.log("Objet city: " + city);
//console.log("City Lat: " + city.latitude);
//console.log("City Long: " + city.longitude);
//console.log("Objet csvData: " + csvData);

  let lat1=GrenobleLat;
  let lat2= parseFloat (city.latitude);
  let lon1=GrenobleLong;
  let lon2= parseFloat (city.longitude);

  var R = 6371e3; // metres
  var φ1 = lat1.toRadians();
  var φ2 = lat2.toRadians();
  var Δφ = (lat2-lat1).toRadians();
  var Δλ = (lon2-lon1).toRadians();

  var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  var d = R * c / 1000;

  return d;
}

// Swap 2 values in array csvData
// i is the index of the first city
// j is the index of the second city
function swap(i, j)
{
  displayBuffer.push(['swap', i, j]); // Do not delete this line (for display)
  var bufferedIndex = csvData[i];
  csvData[i] = csvData[j];
  csvData[j] = bufferedIndex;
  //csvData.swap (i,j);
  console.log("swap - complete !");
    
}

// Returns true if city with index i in csvData is closer to Grenoble than city with index j
// i is the index of the first city
// j is the index of the second city
function isLess(i, j)
{
  displayBuffer.push(['compare', i, j]); // Do not delete this line (for display)
  console.log("isLess - complete !");

  let firstIndex = distanceFromGrenoble(csvData[i]);
  let secondIndex = distanceFromGrenoble(csvData[j]);
  if (firstIndex < secondIndex) {
    console.log("isLess: TRUE!")
    return true;
  } else {
    console.log("isLess: FALSE!")
    return false;
  }
}

function insertsort()
{
  console.log("insertsort - complete !");
  console.log("Objet csvData: " + csvData);
  for (let z=1; z < csvData.length; ++z) {
    for (let k = z; k > 0 && isLess(k, k-1); --k) {  
        swap(k, k-1);
    }
  }
}

function selectionsort()
{
  console.log("selectionsort - complete !");
  //console.log("Test: " + csvData.length);
  for (let alpha=0; alpha < csvData.length; ++alpha) {
    let epsilon=alpha;
    for (let beta = alpha+1; beta < csvData.length; ++beta) {
      if (isLess(beta, epsilon)) {
        epsilon=beta;
      }
    }
    swap(alpha,epsilon);
  }
}

function bubblesort()
{
  console.log("bubblesort - complete !");
  for (let i=0; i < csvData.length; ++i) {
    let swapped = false;
    //let epsilon=alpha;
    for (let j = i+1; j < csvData.length; ++j) {
      if (isLess(j, i)) {
        //epsilon=beta;
        swap(i,j);
        swapped = true;
      } else {
        console.log("False!");
      }
    }
    
  }

}

function shellsort()
{
  console.log("shellsort - complete !");
  let h = 1;
  while (h < csvData.length) {
    h = 3 * h + 1;
  }
  while (h > 0) {
    h = Math.floor (h / 3);
    for (k = 0; k < h ; ++k) {
      for (let i = k; i < csvData.length; i = i + h) {
        for (let z = i; z > 0 && isLess(z-1, z); --z) {
          swap(z, z-1);
        }
      }
    }
  }
}

// function splitArray(array, chunk)
// {
//   var i,j, rslt = [];
//   //chunk = chunk - 1;
//   for (i=0,j=array.length; i<j; i+=chunk) {
//   rslt.push(array.slice(i,i+chunk));
//   }
//   return rslt;
// }

function mergesort()
{
  let tabRetour = mergeSorte(csvData);
  console.log(tabRetour);
  for ( let i=0; i < tabRetour.length; ++i ) {
    for ( let j=0; j < csvData.length; ++j) {
      if (csvData[j] == tabRetour[i]) {
        swap (j,i);

      } 
    }
  }
}

function mergeSorte (unsortedArray) {
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
    mergeSorte(left), mergeSorte(right)
  );
}

// Merge the two arrays: left and right
function merge (left, right) {
  let resultArray = [], leftIndex = 0, rightIndex = 0;

  // We will concatenate values into the resultArray in order
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex].dist < right[rightIndex].dist) {
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

// function mergeSorte (unsortedArray) {
//   // No need to sort the array if the array only has one element or empty
//   if (unsortedArray.length <= 1) {
//     return unsortedArray;
//   }
//   // In order to divide the array in half, we need to figure out the middle
//   const middle = Math.floor(unsortedArray.length / 2);

//   // This is where we will be dividing the array into left and right
//   const left = unsortedArray.slice(0, middle);
//   const right = unsortedArray.slice(middle);

//   // Using recursion to combine the left and right
//   return merge(
//     mergeSorte(left), mergeSorte(right)
//   );
// }

// // Merge the two arrays: left and right
// function merge (left, right) {
//   let resultArray = [], leftIndex = 0, rightIndex = 0;

//   // We will concatenate values into the resultArray in order
//   while (leftIndex < left.length && rightIndex < right.length) {
//     if (left[leftIndex] < right[rightIndex]) {
//       resultArray.push(left[leftIndex]);
//       leftIndex++; // move left array cursor
//     } else {
//       resultArray.push(right[rightIndex]);
// 			rightIndex++; // move right array cursor
//     }
//   }

//   // We need to concat to the resultArray because there will be one element left over after the while loop
//   return resultArray
//           .concat(left.slice(leftIndex))
//           .concat(right.slice(rightIndex));
// }

// function fusionner(t1, t2) {  
//   var i = 0, j = 0, k = 0;  
//   var n = t1.length, m = t2.length;  
//   var t = new Array(n+m);  
  
//   while (i < n && j < m) {  
//     if (t1[i] < t2[j]) {  
//       t[k] = t1[i];  
//       i++;  
//     } else {  
//       t[k] = t2[j];  
//       j++;  
//     }
//     k++;  
//   }  
//   while (i < n) {  
//     t[k] = t1[i];
//     //swap(k,i); 
//     i++;  
//     k++;  
//   }  
//   while (j < m) {  
//     t[k] = t2[j];
//     //swap(k,j); 
//     j++;  
//     k++;  
//   }
//   //swap(i,j);
//   //console.log(t);
//   return t;  
// }

// function trier(sortedArray) {  
  
//   //const n = sortedArray.length;
//   const length = sortedArray.length;  
//   const left, right;
//   const middle=Math.floor(length / 2);  
  
//   if (length == 0 || length == 1) {  
//     return sortedArray;  
//   } else {  
//     left = trier(sortedArray.slice(0,middle));  
//     right = trier(sortedArray.slice(middle));
//     console.log(middle);
//     return fusionner (left, right);  
//   }  
// }


function heapsort()
{
  console.log("heapsort - implement me !");
}

function quicksort()
{
  console.log("quicksort - implement me !");
}
function quick3sort()
{
  console.log("quick3sort - implement me !");
}


function sort(algo)
{
  switch (algo)
  {
    case 'insert': insertsort();break;
    case 'select': selectionsort();break;
    case 'bubble': bubblesort();break;
    case 'shell': shellsort();break;
    case 'merge': mergesort();break;
    case 'heap': heapsort();break;
    case 'quick': quicksort();break;
    case 'quick3': quick3sort();break;
    default: throw 'Invalid algorithm ' + algo;
  }
}
