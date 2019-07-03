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
  let tri = mergeSort(csvData);
  console.log(tri);
  //distanceFromGrenoble(tri);
}

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
  // displayBuffer.push(['compare', left[leftIndex], right[rightIndex]]); // Do not delete this line (for display)
  let resultArray = [], leftIndex = 0, rightIndex = 0;

  // We will concatenate values into the resultArray in order
  while (leftIndex < left.length && rightIndex < right.length) {
    displayBuffer.push(['compare', leftIndex, rightIndex]); // Do not delete this line (for display)
    displayBuffer.push(['swap', leftIndex, rightIndex]); // Do not delete this line (for display)
    console.log("I: " + left[leftIndex] + " J: " + right[rightIndex]);
    console.log(left[leftIndex]);
    if (left[leftIndex] < right[rightIndex]) {
      resultArray.push(left[leftIndex]);
      //swap(leftIndex,rightIndex);
      leftIndex++; // move left array cursor
    } else {
      resultArray.push(right[rightIndex]);
      //swap(rightIndex,leftIndex);
			rightIndex++; // move right array cursor
    }
  }
  
  // We need to concat to the resultArray because there will be one element left over after the while loop
  return resultArray
          .concat(left.slice(leftIndex))
          .concat(right.slice(rightIndex));
}

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
