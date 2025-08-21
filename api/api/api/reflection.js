export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({error:'POST only'});
  const { reflections=[], hypotheses_before=[] } = req.body || {};
  const key_takeaways = [];
  const contradictions = [];
  reflections.forEach(r => {
    if (r.actual && r.expected && r.actual !== r.expected) {
      contradictions.push({expected:r.expected, actual:r.actual});
    }
    if (r.surprise) key_takeaways.push(r.surprise);
  });
  const decision = contradictions.length ? 'pivot' : (key_takeaways.length ? 'stick' : 'unsure');
  const revised_hypotheses_skeleton = hypotheses_before.map(h => ({
    type: h.type,
    placeholder: `Rewrite ${h.type} to reflect actual quotes/behaviors. Keep it testable.`
  }));
  return res.json({
    ok:true,
    one_page: {
      key_takeaways: key_takeaways.slice(0,5),
      contradictions,
      decision,
      next_actions: [
        'Draft one new test tied to the primary risk',
        'Schedule 3 interviews in target segment',
        'Collect one measurable signal (spend, time saved, workflow used)'
      ],
      revised_hypotheses_skeleton
    }
  });
}
