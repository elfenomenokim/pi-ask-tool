// Demo: exercise every ask-tool path with a canned UI. Needs `npm install` first.
import extension from '../../index.ts';

let tool;
extension({ registerTool: (definition) => { tool = definition; } });
const run = (params, ctx) => tool.execute('demo', params, undefined, undefined, ctx).then((r) => r.content[0].text);
const ui = (replies) => ({
  mode: 'rpc',
  hasUI: true,
  ui: {
    select: async () => replies.select,
    confirm: async () => replies.confirm,
    input: async () => replies.input,
  },
});

console.log(await run({ question: 'Which worker runs this?', options: ['cc', 'codex'] }, ui({ select: 'codex' })));
console.log(await run({ question: 'Stop the runaway?', kind: 'confirm' }, ui({ confirm: false })));
console.log(await run({ question: 'Name this release:' }, ui({ input: 'pi-ask-tool 0.1.0' })));
console.log(await run({ question: 'Which worker runs this?', options: ['cc', 'codex'] }, { mode: 'rpc', hasUI: false }));
console.log(await run({ question: 'Pick one:', options: ['a', 'b'], kind: 'select' }, ui({ select: undefined })));
