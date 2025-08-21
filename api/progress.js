export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({error:'POST only'});
  const { session_id, step, payload } = req.body || {};
  if (!session_id || !step) return res.status(400).json({error:'session_id and step required'});
  const steps = ['risk','hypotheses','questions','interviews','analysis'];
  const idx = Math.max(0, steps.indexOf(step));
  const next_step = steps[idx + 1] || null;
  return res.json({
    ok:true,
    session_id,
    step,
    next_step,
    checklist: steps.map(s => ({ step:s, done: steps.indexOf(s) <= idx })),
    notes: payload || null
  });
}
