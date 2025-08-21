const riskMap = {
  product: ['solution','pain','general'],
  customer: ['market','general','behavioral','pain'],
  market: ['market','behavioral','general']
};
function score(primary, type, text='') {
  const base = riskMap[primary]?.includes(type) ? 0.7 : 0.3;
  const lenBoost = Math.min(text.trim().length / 200, 0.3);
  return Math.min(1, base + lenBoost);
}
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({error:'POST only'});
  const { primary_risk, hypotheses } = req.body || {};
  if (!primary_risk || !Array.isArray(hypotheses)) return res.status(400).json({error:'primary_risk and hypotheses[] required'});
  const results = hypotheses.map(h => {
    const s = score(primary_risk, h.type, h.text);
    return {
      type: h.type, text: h.text,
      aligned: s >= 0.6,
      alignment_score: Number(s.toFixed(2)),
      reason: s>=0.6 ? 'Matches primary risk focus' : 'Drifts from primary risk',
      fix_suggestion: s>=0.6 ? 'Tighten with measurable indicator' : `Reframe to test ${primary_risk} risk`
    };
  });
  return res.json({ ok:true, primary_risk, results });
}
const riskMap = {
  product: ['solution','pain','general'],
  customer: ['market','general','behavioral','pain'],
  market: ['market','behavioral','general']
};
function score(primary, type, text='') {
  const base = riskMap[primary]?.includes(type) ? 0.7 : 0.3;
  const lenBoost = Math.min(text.trim().length / 200, 0.3);
  return Math.min(1, base + lenBoost);
}
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({error:'POST only'});
  const { primary_risk, hypotheses } = req.body || {};
  if (!primary_risk || !Array.isArray(hypotheses)) return res.status(400).json({error:'primary_risk and hypotheses[] required'});
  const results = hypotheses.map(h => {
    const s = score(primary_risk, h.type, h.text);
    return {
      type: h.type, text: h.text,
      aligned: s >= 0.6,
      alignment_score: Number(s.toFixed(2)),
      reason: s>=0.6 ? 'Matches primary risk focus' : 'Drifts from primary risk',
      fix_suggestion: s>=0.6 ? 'Tighten with measurable indicator' : `Reframe to test ${primary_risk} risk`
    };
  });
  return res.json({ ok:true, primary_risk, results });
}
