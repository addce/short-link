const symbols = [];
const symbols_set = new Set();

const weight = 6;
const symbol_count = 7;
const weights = new Array(symbol_count);

const values = {};
const revered_values = {};


;((function () {
    const begin_upper = 'a'.codePointAt(0)
    const begin_letter = 'A'.codePointAt(0)
    const begin_number = '0'.codePointAt(0)

    for (let i = 0; i < 26; i++) {
        symbols.push(String.fromCodePoint(begin_upper + i));
        symbols.push(String.fromCodePoint(begin_letter + i));
        if (i < 10) {
            symbols.push(String.fromCodePoint(begin_number + i))
        }
    }
    symbols.forEach(value => symbols_set.add(value));

    for (let i = 0; i < symbol_count; i++) {
        weights[i] = Math.pow(weight, i);
    }

    for (let i = 0; i < symbols.length; i++) {
        const ch = symbols[i];
        const value = i % weight;

        if (revered_values[ch]) {
            revered_values[ch].push(value);
        } else {
            revered_values[ch] = [value];
        }

        if (values[value]) {
            values[value].push(ch);
        } else {
            values[value] = [ch];
        }
    }

})());

function get_a_symbol_from_value(value) {
    if (value >= weight) {
        throw new Error("value exceed weight")
    }
    const idx = Math.round(Math.random() * 9999) % (values[value].length);
    return values[value][idx];
}

function get_value_from_symbol(symbol) {
    if (!symbols_set.has(symbol))
        throw new Error("cant resolve symbol")
    return revered_values[symbol];
}

export function to_num(token) {
    let value = 0;
    for (let i = token.length - 1; i >= 0; i--) {
        const w = Math.pow(weight, i);
        value += get_value_from_symbol(token[i]) * w;
    }
    return value;
}

export function to_a_token(num) {
    if (num >= Math.pow(weight, symbol_count)) {
        throw new Error("exceed range");
    }

    const result = new Array(symbol_count);

    let value = num;

    for (let i = symbol_count - 1; i >= 0; i--) {
        const current_weight = weights[i];
        const r = value % current_weight;
        const v = (value - r) / current_weight;
        result[i] = get_a_symbol_from_value(v);
        value = r;
    }

    return result.join("");

}

export function is_valid(token) {
    if (!token || !token.length || token.length != symbol_count) {
        return false;
    }

    for (let i = 0; i < token.length; i++) {
        const number = token.charCodeAt(i);
        if(!(number >= 'a'.charCodeAt(0) && number <= 'z'.charCodeAt(0)
            || number >= 'A'.charCodeAt(0) && number <= 'Z'.charCodeAt(0)
            || number >= '0'.charCodeAt(0) && number <= '9'.charCodeAt(0))){
            return false;
        }
    }
    return true;
}

function test() {

    for (let i = 0; i < Math.pow(weight, symbol_count); i++) {
        const v = i;
        const token = to_a_token(v);
        const v2 = to_num(token);

        if (v != v2) {
            throw new Error("An Exception Occurred i=" + i);
        } else {
            console.log(`${v}\t\t\t${token}`)
        }
    }
}
