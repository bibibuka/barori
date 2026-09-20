import assert from 'node:assert/strict';
import test from 'node:test';
import { requireLeadSuccess } from './leadResponse.ts';

test('only explicit server acceptance confirms a lead', async () => {
  await requireLeadSuccess(new Response('{"success":true}'));
  for (const body of ['{"error":true}', '<html>Not the handler</html>', '{}', '{"success":"true"}', 'null']) {
    await assert.rejects(requireLeadSuccess(new Response(body)));
  }
  await assert.rejects(requireLeadSuccess(new Response('{"success":true}', { status: 500 })));
});
