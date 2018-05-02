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
  value;

  // It has a property that is it's children.
  // because of the number of them we are defining this a dictionary/hash/Javascript Object (these are all the same things)
  children = {};

  // And usually if you are using a class, you probably want a constructor.
  // Conveniently we can use this recursively.
  constructor(string) {
    // We have a couple cases here.

    // 1. The easiest case: We are only adding one letter, like adding the E in apple
    if (string.length == 1) {
      // we know our value is the first letter
      this.value = string.toUppercase();
      // we uppercase for consistency, you could also lowercase, but if you don't do that
      // Alex and alex are different words, which sometimes might be the right solution,
      // in our case that is not true.

      // we also know that we don't have any children, we can stop here.
    }

    // 2. The next case: We are adding more than one letter
    if (string.length > 1) {
      // we still want the first letter for this value
      this.value = string.charAt(0).toUppercase();

      // But we should cut it off before we start adding children
      let substring = string.slice(1);

      // We want a child with the key of the first value of the substring
      // We want a value to be equal to a ListNode with the remaining substring
      this.children[substring.charAt(0)] = new ListNode(substring);
      // because this is recursive, we have just added the entire word.
      // really not that hard
    }

    // 3. The edge case: Honestly this should never happen, and if it does it was your fault not the computer's.
    // But if we somehow have a situation where we are adding a string without a string.
    if (string.length == 0) {
      console.error('Woah you should probably do this right and handle this');
      // This is not the right way to handle this, but it also shouldn't ever happen.
    }
  }

  // lets define a setter
  setChild(string) {
    // first for convenience we want to operate on full words.
    // so we pull off the first character here.
    let value = string.charAt(0);

    // if the item exists we will get a truthy value, otherwise we get a falsey value
    if (this.children[value]) {
      // if we have remaining letters (aren't at the end of the word)
      if (string.length > 1) {
        let substring = string.slice(1);
        this.children[value].setChild[substring];
      } else {
        // Otherwise, we already have this letter in our dictionary and we're at the end of our word.
        // we would be at the L in apple trying to add the E again,
        // alternatively, we might have APPLESAUCE in our dictionary, and be adding APPLE which would mean we're done.
        // this brings up a challenge we will correct later.
      }
    } else {
      // right now you might be confused. Why are we only using part of the string above and
      // the whole string here.
      // in this case we have to create a new list node, which means we should set it's value
      // but this is actually a real issue here. We never need the node to have any value. Ever.
      // We don't need to reference it at any point. This is going to be corrected shortly
      // but right now we have enough information to start making the autocomplete dictionary
      // perform lookups
      this.children[value] = new ListNode(string);
    }
  }

  // next we define a getter that is used for lookup.
  getChild(char) {
    // you don't need to use this syntax, because you'll already get an undefined value if the item does not exist
    // the only reason I write this is because I want to draw your attention to the potential for an undefined value.
    // we're actually banking that "undefined" is falsey in JS to make conditional logic work. I'm just making this
    // explicit

    if (this.children[char]) {
      return this.children[char];
    } else {
      return null;
    }

    // If for some reason you were trying to take something like this into production (you absolutely shouldn't, you should use a tool)
    // You could, and I would, use
    // return this.children[char]
    // which returns either a ListNode or undefined
  }

  // but we should also define a way to get all of the children
  getAllChildren() {
    return Object.keys(this.children);
    // this returns an array of strings
    // these will each be just one uppercase letter.
    // (we've uppercased them in the constructor)
  }
}

class autocomplete {
  head;

  constructor(string) {
    this.head = new ListNode(string);
  }

  addWord(string) {
    this.head.setChild(string);
  }

  lookupWordsStartingWith(string) {}
}
