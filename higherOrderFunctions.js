// It is a function that has multilevels means that it can take another function as an input or it can give back a function as output.

// Example: sort, map, reduce, filter, fill, function call after a button has clicked


//Map

const array = [5,3,8,1,4]

const mapFunction = array.map(n => n*n)
console.log(mapFunction)


//sort

const sortFunction = mapFunction.sort((a,b) => a-b)
console.log(sortFunction)


//reduce

const reduceFunction = sortFunction.reduce((acc, cur) => {
        return acc + cur
}, 0)
console.log(reduceFunction)


//Return a function

function addNumbers(a){
    return function(b){
        return a+b
    }
}
console.log(addNumbers(2)(4))


//Accept a function as an input

function getName(fname, lname, displayName){
    displayName(fname,lname)
}

function displayFullName(fname,lname){
    console.log(fname + ' ' + lname)
}

getName('Preethi', 'Kalyani', displayFullName)