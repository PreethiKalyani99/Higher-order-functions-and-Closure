// Closure is combination of functions bundled together(enclosed) with references to its surrounding.Closure
// Closure give access to an outer function scope from inner function. 
// In Javascript, Closures are created every time a function is created at function creation.
// To use a Closure, define a function inside another function and expose it.
// To expose a function return it or pass it to another function.
// The inner function will have access to the variables in the outer function scope, ever after outer function has returned.

// Closure is when a function can remember and access its lexical scope even when it is invoked outside its lexical scope.

// Scope refers to area where an item such as function or variable is visible and accessible to other code. 
// Global scope -> public space / global space
// Local scope -> private spave / local space

// Lexical refers to definition of things. 
// Anything related to creating words, expressions or variables is termed lexical. 
// Scrabble game is lexical activity (Because it relates to creation of words) 
// Linguistics(study of language) is a lexical activity. 
// Lexicon is a dictionary where words are listed and defined. 

// Lexical scope is the place in which the item got created. That is not a place an item got invoked. 

// Closure store references to outer functions variables. They do not store actual value. 

// Closure has 3 scope chains
// 1. It has access to its own scope
// 2. It has access to outer function variables
// 3. It has access to global variables

//Most of the code written in front-end JS is event based. We define some behaviour and then attached to an event that is triggered by the user
// such as button click, scroll, keypress. The code is attached as a callback(a single function that is executed in response to the event)

function fizzbuzz(n) {
    for (let i = 1; i <= n; i++) {
        const isMultipleOfThree = i % 3 === 0 
        const isMultipleOfFive = i % 5 === 0
        const isMultipleOfFifteen = i % 15 === 0

        if(isMultipleOfFifteen){
            console.log('FizzBuzz')
        }
        else if(isMultipleOfThree){
            console.log('Fizz')
        }
        else if(isMultipleOfFive){
            console.log('Buzz')
        }
        else{
            console.log(i)
        }
    }
}
fizzbuzz(15)

//Here, we can observe closure implicitly. The 3 variables(isMultipleOfThree, isMultipleOfFive, isMultipleOfFifteen) are declared within the loop. 'if' statements can access variable outside the block
// due to its lexical scope. In each iteration 'if' statements can access the variables and i. These values are retained due to closure.

function map(arr, fn){
    let result = []
    for(let i = 0; i < arr.length; i++){
       result.push(fn(arr[i],i))
    }
    return result
}
let fn = (a) => {return a*a}
console.log(map([1,2,3,4], fn))

//Here, closure occurs when 'map' function is invoked. The 'fn' access arr and i from outer lexical scope, even the 'map' function finished 
// its execution. When the 'fn' is executed later, it still has reference to arr and i. 

function foo() {
    let a = 2
    function baz() {
        console.log( a )
    }
    bar( baz )
}
function bar(fn) {
    fn() 
}
foo()

// In the above code, 'baz' has access to 'a' and then we  expose 'baz' by passing it to outer function 'bar'. When we call 'foo', 'bar' will
//execute. Then 'bar' invokes the inner function 'baz' from outside. Then 'baz' is executed outside of 'foo'. 'baz' still has the reference of the
// variable 'a' because of closure.

for (let i=1; i<=5; i++) {
    setTimeout( function timer(){
        console.log( i );
    }, i*1000 );
}

//Here, even after the loop finished its execution, the setTimeOut function still has the reference of 'i'. This means that when the function(console.log())
// inside setTimeOut execute after the delay, they still have access to value of i that was present at that time they were defined


{/* <p id="help">Helpful notes will appear here</p>
<p>Email: <input type="text" id="email" name="email" /></p>
<p>Name: <input type="text" id="name" name="name" /></p>
<p>Age: <input type="text" id="age" name="age" /></p> */}

function showHelp(help) {
    document.getElementById("help").textContent = help
}

function setupHelp() {
    var helpText = [
        { id: "email", help: "Your email address" },
        { id: "name", help: "Your full name" },
        { id: "age", help: "Your age (you must be over 16)" },
    ]

    for (var i = 0; i < helpText.length; i++) {
        var item = helpText[i]
        document.getElementById(item.id).onfocus = function () {
        showHelp(item.help)
        }
    }
} 
setupHelp()
const getSecret = (secret) => {
    return {
        get: () => secret 
    }
}
  
//In the above code, we can observe closure in 3 places inside the loop. onfocus, showHelp, helpText. This code will not work. Because the item variable
//is declared in var. Usually variables declared using var will be hoisted. So the loop will finish its execution sooner.So the last value will store
// in the item variable i.e. "Your age (you must be over 16)". To solve this issue we can use let. let has block scope means that it creates new
//scope for each iteration. (onfocus, showHelp, helpText ) These 3 share same lexical scope. We can use let or we can use more closures i.e. new function here 
// ( document.getElementById(item.id).onfocus = function () {
        // showHelp(item.help)
    // }) 
// and that function should return the showHelp(). This means that the new function creates different lexical scope for each iteration (callback)
// so 'help' refers to the corresponding string from 'helpText' array

//Another solution is using 'forEach' loop to iterate over helpText array and attach a listener to each <input>, like this

// helpText.forEach(function (text) {
//     document.getElementById(text.id).onfocus = function () {
//       showHelp(text.help);
//     };
//   });


test('Closure for object privacy.', assert => {
    const msg = '.get() should have access to the closure.';
    const expected = 1;
    const obj = getSecret(1);

    const actual = obj.get();

    try {
        assert.ok(secret, 'This throws an error.'); 
    } catch (e) {
        assert.ok(true, `The secret var is only available
        to privileged methods.`);
    }

    assert.equal(actual, expected, msg);
    assert.end();
});
  
// In the above code, we can observe closure in get(). get() is exposed.


const secret = (msg) => () => msg;

test('secret', assert => {
  const msg = 'secret() should return a function that returns the passed secret.';

  const theSecret = 'Closures are easy.';
  const mySecret = secret(theSecret);

  const actual = mySecret();
  const expected = theSecret;

  assert.equal(actual, expected, msg);
  assert.end();
});

// Here, the closure occurs in the anonymous function returned by the secret function.
