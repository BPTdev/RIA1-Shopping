"use strict";

const EmptyCartException = require("./EmptyCartException.js");
const UpdateCartException = require("./UpdateCartException.js");

module.exports = class Cart {

    //region private attributes
    #items = [];
    //endregion private attributes

    //region public methods
    constructor(items) {
        this.#items = items;
    }

    get items() {
        if (this.#items === null) {
            throw new EmptyCartException("Cart must have at least one item");
        }

        return this.#items;
    }

    get total() {
        if (this.#items === null) {
            throw new EmptyCartException("Cart must have at least one item");
        }

        let tot = 0;
        for (let item of this.#items) {
            tot += item.quantity * item.price;
        }
        return tot;
    }

    //endregion public methods

    //region private methods
    count(bool = false) {
        if (this.#items === null) {
            throw new EmptyCartException("Cart must have at least one item");
        }
        if (bool) {
            return this.#items.length;
        }
        let count = 0;
        for (let item of this.#items) {
            count += item.quantity;
        }
        return count;
    }

    add(items) {
        if (items === null) {
            throw new UpdateCartException("Cart must have at least one item");
        }
        this.#items = items;
    }

    //endregion private methods
}