"use strict";

const InvalidArticleIdException = require("./InvalidArticleIdException.js");
const InvalidQuantityException = require("./InvalidQuantityException.js");
const InvalidPriceException = require("./InvalidPriceException.js");

module.exports = class CartItem {

    //region private attributes
    #articleId;
    #name;
    #quantity;
    #price;
    #currency;
    //endregion private attributes

    //region public methods
    constructor(articleId, name, quantity, price,currency = "CHF") {
        if (articleId < 1) {
            throw new InvalidArticleIdException();
        }
        //if the cart curency is not the same as the currency of the item, throw an exception
        /*if(cart.currency !== currency){
            throw new InvalidCurrencyException();
        }*/

        this.#articleId = articleId;
        this.#name = name;
        this.quantity=quantity;
        this.price=price;
        this.#currency = currency;
    }

    get articleId() {
        return this.#articleId;
    }

    get name() {
        return this.#name;
    }

    get quantity() {
        return this.#quantity;
    }
    get currency() {
        return this.#currency;
    }

    set quantity(value) {
        if (value < 1) {
            throw new InvalidQuantityException();
        }
        return this.#quantity = value;
    }



    get price() {
        return this.#price;
    }

    set price(value) {
        if (value < 10) {
            throw new InvalidPriceException();
        }
        return this.#price = value;
    }

    get total() {
        return this.#quantity * this.#price;
    }
    //endregion public methods

    //region private methods
    //endregion private methods
}