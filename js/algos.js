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

// Fonction qui appelle le tri par fusion et affiche le résultat
function mergesort()
{
  // Recupère le tableau trié
  let tabRetour = mergeSorte(csvData);
  // Affiche le résultat dans la console
  console.log(tabRetour);
  // réalise une comparaison et un tri pour affichage
  for ( let i=0; i < tabRetour.length; ++i ) {
    for ( let j=0; j < csvData.length; ++j) {
      if (csvData[j] == tabRetour[i]) {
        swap (j,i);
      } 
    }
  }
}

function mergeSorte (unsortedArray) {
  // On test si le tableau est vide ou n'a qu'un parametre
  if (unsortedArray.length <= 1) {
    return unsortedArray;
  }
  // constante pour diviser le tableau en deux (arrondi pour les impaires)
  const middle = Math.floor(unsortedArray.length / 2);

  // On divise le tableau en deux
  const left = unsortedArray.slice(0, middle);
  const right = unsortedArray.slice(middle);

  // On utilise la recursion pour fusionner les tableaux gauche et droite
  return merge(
    mergeSorte(left), mergeSorte(right)
  );
}

// Fusionne en triant les tableaux
function merge (left, right) {
  let resultArray = [], leftIndex = 0, rightIndex = 0;

  // On concactene les valeurs ordonnées dans resultArray
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex].dist < right[rightIndex].dist) {
      resultArray.push(left[leftIndex]);
      leftIndex++; // incrémente l'indexe pour le tableau left
    } else {
      resultArray.push(right[rightIndex]);
			rightIndex++; // incrémente l'indexe pour le tableau right
    }
  }

  // On concactene les valeurs dans resultArray lorsqu'il n'y a plus qu'un élément dans le tableau left
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
  console.log("quicksort - coplete !");
  const firstLastIndex = csvData.length - 1;
  let resultTab = quickSorte(csvData, 0, firstLastIndex);
  console.log(resultTab);
}

function quickSorte(arr, left, right){
  var len = arr.length, 
  pivot,
  partitionIndex;


 if(left < right){
   pivot = right;
   partitionIndex = partition(arr, pivot, left, right);
   
  //sort left and right
  quickSorte(arr, left, partitionIndex - 1);
  quickSorte(arr, partitionIndex + 1, right);
 }
 return arr;
}

function partition(arr, pivot, left, right){
  var pivotValue = arr[pivot],
      partitionIndex = left;

  for(var i = left; i < right; i++){
   if(arr[i].dist < pivotValue.dist){
    //  swap(arr, i, partitionIndex);
    swap( i, partitionIndex);
     partitionIndex++;
   }
 }
//  swap(arr, right, partitionIndex);
swap(right, partitionIndex);
 return partitionIndex;
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
