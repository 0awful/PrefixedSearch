// I'm looking for something to quickly do outside of my projects to keep me programming
// That means I'm putting out a series: CS for self taught javascript developers.
// Be gatekeepered no more. Now you can answer those arbirary questions that CS grads can answer 
// but you'll never have to use in production and if you ever did you'd quickly learn you aren't as smart
// as the PhD students who optimized the code 40 years ago.

// Today that means we're looking at prefixed based autocompletion using a linked list of characters
// What does that actually mean? Well first you've gotta get your head around a linked list.
// More info on that is #here

// In our case we are defining words as character based linked lists. Every new character allows us to search one node deeper
// into the list. Its going to look like this

//            B - A - C - U - S
//          /
// HEAD - A - P - P - L - E
//              \
//                R - I - C - O - T

// So when someone submits "A" we should see all of these words, when they submit "AP" we should see apple and apricot
// When they submit "APP" then we are only going to see apple

// Which implies a couple of functions we will need
//      First a function that adds items
//      Next a function that looks up items
//      A function that removes items

// We should probably put these into a manager class to give the other people an access point
// which means we want two classes. The node and the manager. 
//      Technically we only need one but the interfacting is better with two.

// Lets start by defining our node class:
class ListNode {
    // First things first. This node has a value. In this case we are defining this to be a single character. This is
    // We are also expecting that character to be A-Z.
    value

    // it has a property that is it's children.
    // because of the number of them we are defining this a dictionary/hash/Javascript Object (these are all the same things)
    children = {}

    // So we have a constructor that sets this nodes value and then calls the addition of new nodes if needed
    constructor(string){
        if (string.length > 1) {
            this.value = string.charAt(0).toUppercase()
        }
        this.value = char
    }

    // next we define a getter that gets the child node for a character
    getChild(char){
        if (this.children[char]){
            return this.children[char]
        } else {
            return null
        }
    }

    // lets define a setter
    setChild(char){
        if (this.children[char]) {

        } else {
            this.children[char] = new ListNode(char)
        }
    }
}