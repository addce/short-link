import * as test from "node:test";
import * as assert from "node:assert";
import {is_valid, to_num, to_a_token} from './id.js'

test.test('test convert', (t) => {
    const p = Math.pow(6, 6) + 1;
    const token = to_a_token(p);
    const q = to_num(token);
    assert.strictEqual(p, q);
});

test.test('is valid', t => {
    assert.ok(is_valid('aaa111B'))
    assert.ok(!is_valid('1'));
})
