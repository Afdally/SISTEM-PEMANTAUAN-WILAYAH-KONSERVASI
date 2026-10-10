import { species } from "../../data/monitoring";

export default function TopSpecies() {
  return (
    <section className="page-shell mt-15" aria-labelledby="top-species-title">
      <header className="section-heading"><div><p>Biodiversitas</p><h2 id="top-species-title">Spesies terbanyak dilaporkan</h2></div></header>
      <div className="grid gap-4 sm:grid-cols-3">
        {species.map((item) => (
          <article className="species-card" key={item.name}>
            <img src={item.image} alt="Habitat pesisir tempat spesies dilaporkan" loading="lazy" style={{ objectPosition: item.imagePosition }} />
            <h3>{item.name}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

