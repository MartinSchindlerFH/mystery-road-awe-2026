import { Evidence, Person, PersonId } from "../../../js/types";
import { useState } from "react";
import { loadHypothesis, saveHypothesis } from "../../../js/data/caseData";

type HypothesisCardProps = {
  people: Person[];
  evidence: Evidence[];
};

export function HypothesisCard({ people, evidence }: HypothesisCardProps) {
  const hypothesis = loadHypothesis();
  const [hypSuspect, setHypSuspect] = useState(hypothesis?.suspect ?? "");
  const [hypNature, setHypNature] = useState(hypothesis?.nature ?? "");
  const [hypEvidence, setHypEvidence] = useState<string[]>(
    hypothesis?.evidence ?? [],
  );
  const [hypConfidence, setHypConfidence] = useState(
    hypothesis?.confidence ?? 50,
  );
  const [hypExplanation, setHypExplanation] = useState(
    hypothesis?.explanation ?? "",
  );
  const [hypAlternative, setHypAlternative] = useState(
    hypothesis?.alternative ?? "",
  );

  return (
    <div className="hypothesis-card">
      <h3>Hypothesis Draft</h3>
      <form id="hypothesisForm">
        <div className="form-row">
          <label htmlFor="hypSuspect">Suspected responsible person</label>
          <select
            id="hypSuspect"
            value={hypSuspect}
            onChange={(event) => setHypSuspect(event.target.value)}
          >
            <option value="">Select a person&hellip;</option>
            {people.map((person) => (
              <option value={person.id} key={person.id}>
                {person.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label htmlFor="hypNature">Accidental or deliberate incident</label>
          <select
            id="hypNature"
            value={hypNature}
            onChange={(event) => setHypNature(event.target.value)}
          >
            <option value="">Select&hellip;</option>
            <option value="accidental">Accidental</option>
            <option value="deliberate">Deliberate</option>
            <option value="unclear">Unclear</option>
          </select>
        </div>

        <div className="form-row">
          <label htmlFor="hypEvidence">Selected supporting evidence</label>
          <select
            id="hypEvidence"
            multiple
            size={6}
            value={hypEvidence}
            onChange={(event) =>
              setHypEvidence(
                [...event.target.selectedOptions].map((o) => o.value),
              )
            }
          >
            {evidence.map((evidence) => (
              <option value={evidence.id} key={evidence.id}>
                {evidence.id} - {evidence.title}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label htmlFor="hypConfidence">Confidence (0&ndash;100)</label>
          <input
            type="range"
            id="hypConfidence"
            min="0"
            max="100"
            value={hypConfidence}
            onChange={(event) => setHypConfidence(event.target.valueAsNumber)}
          />
          <output id="hypConfidenceValue">{hypConfidence}</output>
        </div>

        <div className="form-row">
          <label htmlFor="hypExplanation">Written explanation</label>
          <textarea
            id="hypExplanation"
            rows={4}
            placeholder="Explain your reasoning&hellip;"
            value={hypExplanation}
            onChange={(event) => setHypExplanation(event.target.value)}
          ></textarea>
        </div>

        <div className="form-row">
          <label htmlFor="hypAlternative">Alternative explanation</label>
          <textarea
            id="hypAlternative"
            rows={3}
            placeholder="What else could explain the evidence?"
            value={hypAlternative}
            onChange={(event) => setHypAlternative(event.target.value)}
          ></textarea>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() =>
              saveHypothesis({
                suspect: hypSuspect,
                nature: hypNature,
                evidence: hypEvidence ?? [],
                confidence: hypConfidence,
                explanation: hypExplanation,
                alternative: hypAlternative,
              })
            }
          >
            Save hypothesis draft
          </button>
          <span id="hypothesisSavedMsg" className="saved-msg hidden">
            Saved
          </span>
        </div>
      </form>
    </div>
  );
}
