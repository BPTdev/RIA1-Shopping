"use strict";

const EmptyCartException = require("./EmptyCartException.js");
const UpdateCartException = require("./UpdateCartException.js");

module.exports = class Cart {

    //region private attributes
    #items = [];
    #currency;
    //endregion private attributes

    //region public methods
    constructor(items, currency= "CHF") {
        this.add(items);
        this.#currency = currency;
    }

    get items() {
        return this.#items;
    }

    get total() {
        let tot = 0;
        for (let item of this.#items) {
            tot += item.quantity * item.price;
        }
        return tot;
    }

    get currency() {
       return this.#currency;
    }

    //endregion public methods

    //region private methods
    count(distinct = false) {
        if (distinct) {
            return this.#items.length;
        }
        let count = 0;
        for (let item of this.#items) {
            count += item.quantity;
        }
        return count;
    }

    add(items) {
        this.#items = items;
    }

    //endregion private methods
}