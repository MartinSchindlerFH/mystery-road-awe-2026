import { Evidence, Person } from "../../../js/types";

type HypothesisCardProps = {
  people: Person[];
  evidence: Evidence[];
};

export function HypothesisCard({ people, evidence }: HypothesisCardProps) {
  return (
    <div className="hypothesis-card">
      <h3>Hypothesis Draft</h3>
      <form id="hypothesisForm">
        <div className="form-row">
          <label htmlFor="hypSuspect">Suspected responsible person</label>
          <select id="hypSuspect">
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
          <select id="hypNature">
            <option value="">Select&hellip;</option>
            <option value="accidental">Accidental</option>
            <option value="deliberate">Deliberate</option>
            <option value="unclear">Unclear</option>
          </select>
        </div>

        <div className="form-row">
          <label htmlFor="hypEvidence">Selected supporting evidence</label>
          <select id="hypEvidence" multiple size={6}>
            {evidence.map((evidence) => (
              <option value={evidence.id} key={evidence.id}>
                {evidence.id} - {evidence.title}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label htmlFor="hypConfidence">Confidence (0&ndash;100)</label>
          <input type="range" id="hypConfidence" min="0" max="100" value="50" />
          <output id="hypConfidenceValue">50</output>
        </div>

        <div className="form-row">
          <label htmlFor="hypExplanation">Written explanation</label>
          <textarea
            id="hypExplanation"
            rows={4}
            placeholder="Explain your reasoning&hellip;"
          ></textarea>
        </div>

        <div className="form-row">
          <label htmlFor="hypAlternative">Alternative explanation</label>
          <textarea
            id="hypAlternative"
            rows={3}
            placeholder="What else could explain the evidence?"
          ></textarea>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-primary" /*onClick="saveHypothesis()"*/
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
