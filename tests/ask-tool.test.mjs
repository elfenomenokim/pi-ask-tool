// Synthetic UI only; needs the dependencies installed (`npm install`).
// Run from this directory with: npm test
import assert from 'node:assert/strict';
import { test } from 'node:test';
import extension from '../index.ts';

let tool;
extension({ registerTool: (definition) => { tool = definition; } });
assert.equal(tool?.name, 'ask');

function uiContext(replies = {}) {
  const calls = [];
  const ui = {
    select: async (...args) => { calls.push(['select', ...args]); return replies.select; },
    confirm: async (...args) => { calls.push(['confirm', ...args]); return replies.confirm; },
    input: async (...args) => { calls.push(['input', ...args]); return replies.input; },
  };
  return { calls, ctx: { mode: 'rpc', hasUI: true, ui } };
}

const ask = (params, ctx) => tool.execute('test', params, undefined, undefined, ctx).then((r) => r.content[0].text);

test('options choose select by default and return the exact answer', async () => {
  const { calls, ctx } = uiContext({ select: 'second' });
  assert.equal(await ask({ question: 'Which?', options: ['first', 'second'] }, ctx), 'answer: second');
  assert.deepEqual(calls, [['select', 'Which?', ['first', 'second']]]);
});

test('explicit confirm returns true and false as answers', async () => {
  for (const value of [true, false]) {
    const { calls, ctx } = uiContext({ confirm: value });
    assert.equal(await ask({ question: 'Proceed?', kind: 'confirm' }, ctx), `answer: ${value}`);
    assert.deepEqual(calls, [['confirm', 'Proceed?', '']]);
  }
});

test('no options choose input by default, including an empty answer', async () => {
  for (const value of ['typed response', '']) {
    const { calls, ctx } = uiContext({ input: value });
    assert.equal(await ask({ question: 'What?' }, ctx), `answer: ${value}`);
    assert.deepEqual(calls, [['input', 'What?']]);
  }
});

test('undefined select or input response means cancelled', async () => {
  const selected = uiContext({ select: undefined });
  assert.equal(await ask({ question: 'Which?', options: ['one', 'two'], kind: 'select' }, selected.ctx), 'cancelled');
  const entered = uiContext({ input: undefined });
  assert.equal(await ask({ question: 'What?' }, entered.ctx), 'cancelled');
});

test('without a dialog-capable UI it returns a fallback instead of asking', async () => {
  assert.equal(
    await ask({ question: 'Which?', options: ['one', 'two'] }, { mode: 'rpc', hasUI: false }),
    'no one to ask; proceed with your best judgment and say which assumption you made',
  );
});
