function matchCandidates(candidates, job) {
  return candidates
    .map((candidate) => {
      const candidateSkills = candidate.skills || [];

      const requiredSkills = job.requiredSkills || [];

      const matchedSkills = candidateSkills.filter((skill) =>
        requiredSkills.includes(skill),
      );

      const skillScore =
        requiredSkills.length > 0
          ? matchedSkills.length / requiredSkills.length
          : 0;

      const expScore = candidate.experience >= job.minExperience ? 1 : 0;

      const finalScore = skillScore * 0.8 + expScore * 0.2;

      return {
        ...candidate._doc,

        matchedSkills,

        matchScore: Math.round(finalScore * 100),
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}

module.exports = matchCandidates;
