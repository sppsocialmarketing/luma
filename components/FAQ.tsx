const questions = [
  {
    q: "Is Ember Northwest a design agency?",
    a: "No. Ember Northwest is the parent company behind our own portfolio of cannabis brands. The design language exists to support our products, retail partners, and customers.",
  },
  {
    q: "Where is the company rooted?",
    a: "The company is rooted in Washington and built around Northwest taste: calm, polished, practical, and sharp enough to stand apart on the shelf.",
  },
  {
    q: "Which brands are part of Ember Northwest?",
    a: "The Batch, Smokey Point, Regulator, SnoCone, 1UP, Junes Edibles, and Treat Edibles are presented as the Ember Northwest brand family.",
  },
];

export function FAQ() {
  return (
    <div className="faqStack">
      {questions.map((item) => (
        <details className="faqItem" key={item.q}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
