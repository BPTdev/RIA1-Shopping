"use strict";

const EmptyCartException = require("./EmptyCartException.js");
const UpdateCartException = require("./UpdateCartException.js");
const MultipleCurrenciesException = require("./MultipleCurrenciesException.js");

module.exports = class Cart {

    //region private attributes
    #items = [];
    #currency;
    //endregion private attributes

    //region public methods
    constructor(items, currency= "CHF") {
        this.add(items);
        this.currency = currency;
    }

    get items() {
        if (this.#items === undefined) {
            return [];
        }
        return this.#items;

    }

    get total() {
        let tot = 0;
        if (this.#items === undefined) {
            return 0;
        }
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

    set currency(currency) {
        this.#currency = currency;

        //if the items array is not empty, set the currency to the currency of the first item
        if (this.#items !== undefined) {
            //if the first item hasn't a currency, try the other items

            this.#currency = this.#items[0].currency;

            //if the items in the array have different currencies, throw an exception
            for (let item of this.#items) {
                if (item.currency !== this.#currency) {
                    throw new MultipleCurrenciesException();
                }
            }
        }
    }
    //endregion private methods
}