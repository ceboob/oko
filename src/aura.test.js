import test from 'node:test';
import assert from 'node:assert/strict';
import { emergencyReply, getAuraReply } from './aura.js';

test('acute warning signs return only the required emergency message', () => {
  const urgentQuestions = [
    'Mam ból w klatce piersiowej',
    'I have severe bleeding',
    'I have shortness of breath',
    'Sudden numbness in my arm',
    'Mam nagłą utratę widzenia',
  ];

  for (const question of urgentQuestions) {
    assert.deepEqual(getAuraReply(question), {
      text: emergencyReply,
      emergency: true,
    });
  }
});

test('appointment requests go to reception without claiming a booking', () => {
  const reply = getAuraReply('Chcę umówić wizytę');

  assert.equal(reply.link, true);
  assert.match(reply.text, /85 661 01 07/);
  assert.match(reply.text, /nie potwierdzam rezerwacji online/);
});

test('clinical questions are referred to clinic staff without echoing input', () => {
  const privateQuestion = 'Mam bardzo szczegółowy objaw prywatny';
  const reply = getAuraReply(privateQuestion);

  assert.match(reply.text, /nie udzielam porad medycznych/);
  assert.equal(reply.text.includes(privateQuestion), false);
});
