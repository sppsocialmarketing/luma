import CountUp from "@/components/CountUp";
import { CursorGlow } from "@/components/CursorGlow";

const brands = [
  { n: "01", initials: "TB", name: "The Batch", role: "Limited releases", copy: "Small-batch drops with polished shelf presence and clear retail recognition.", href: "https://getthebatch.com" },
  { n: "02", initials: "SP", name: "Smokey Point", role: "Core cannabis", copy: "A familiar Washington name built around everyday confidence and consistency.", href: "https://google.com" },
  { n: "03", initials: "RG", name: "Regulator", role: "Precision products", copy: "Clean, direct, and built around reliability across product formats.", href: "https://goregulator.com" },
  { n: "04", initials: "SC", name: "SnoCone", role: "Infused joints", copy: "Bright, memorable, flavor-forward, and easy to recognize on shelf.", href: "https://google.com" },
  { n: "05", initials: "1U", name: "1UP", role: "Arcade cannabis", copy: "Collectible energy with a playful edge and bold visual presence.", href: "https://google.com" },
  { n: "06", initials: "JE", name: "Junes Edibles", role: "Edibles", copy: "Friendly, polished, approachable, and made for easy recognition.", href: "https://google.com" },
  { n: "07", initials: "TE", name: "Treat Edibles", role: "Edibles", copy: "Simple, craveable, dependable, and easy for customers to understand.", href: "https://google.com" },
];

const resources = [
  { title: "Brand Assets", text: "Approved logos, lockups, and identity files." },
  { title: "Photography", text: "Product images and shelf-ready visuals." },
  { title: "Retail Resources", text: "Menu assets, references, and sales support." },
  { title: "Brand Guidelines", text: "Usage notes for consistent presentation." },
];

const retailPartners = [
  "Herban Market",
  "Kemps Cannabis",
  "Bud Barn",
  "High Point",
  "Greenlight",
  "Hangar 420",
  "Primo Cannabis",
  "i90 Greenhouse",
  "420 Holiday",
  "Clear Choice",
  "Salish Coast",
  "PRC Arlington",
];

const retailLoop = [...retailPartners, ...retailPartners];

const brandLogos = [
  { name: "The Batch", src: "/assets/brand/the-batch.svg" },
  { name: "Smokey Point", src: "/assets/brand/smokey-point.svg" },
  { name: "Regulator", src: "/assets/brand/regulator.svg" },
  { name: "SnoCone", src: "/assets/brand/snocone.svg" },
  { name: "1UP", src: "/assets/brand/1up.svg" },
  { name: "Junes Edibles", src: "/assets/brand/junes-edibles.svg" },
  { name: "Treat Edibles", src: "/assets/brand/treat-edibles.svg" },
];

const brandLogoLoop = [...brandLogos, ...brandLogos];

export default function Home() {
  return (
    <main>
      <CursorGlow />
      <header className="siteHeader">
        <a className="logo" href="#top" aria-label="Ember Northwest home">
          <span className="logoMark" />
          <span>Ember Northwest</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#brands">Brands</a>
          <a href="#retail">Retail</a>
          <a href="#media">Media Kits</a>
        </nav>
        <a className="headerLink" href="#brands">Explore ↗</a>
      </header>

      <section id="top" className="hero sectionShell">
        <div className="ambient ambientOne" />
        <div className="heroCopy reveal">
          <p className="kicker">Washington-rooted cannabis brand family</p>
          <h1>Clean brands. Clear shelves. Better retail support.</h1>
          <p className="lead">
            Ember Northwest is home to The Batch, Smokey Point, Regulator, SnoCone, 1UP, Junes Edibles, and Treat Edibles — a focused portfolio built around clarity, consistency, cleanliness, and customer confidence.
          </p>
          <div className="heroActions">
            <a className="primaryButton" href="#brands">Explore brands</a>
            <a className="textButton" href="#media">Media kits ↓</a>
          </div>

          <div className="heroStats reveal" aria-label="Company stats">
            <div className="bigStat"><strong><CountUp end={300} suffix="+" /></strong><span>Retail partners</span></div>
            <div className="bigStat"><strong><CountUp end={7} /></strong><span>Owned brands</span></div>
            <div className="bigStat"><strong><CountUp end={1} /></strong><span>Shared standard</span></div>
          </div>
        </div>
      </section>

      <section className="brandLogoMarquee sectionShell reveal" aria-label="Ember Northwest brand logos">
        <p className="kicker">Brand family</p>
        <div className="brandLogoRail">
          <div className="brandLogoFade left" />
          <div className="brandLogoFade right" />
          <div className="brandLogoTrack">
            {brandLogoLoop.map((brand, index) => (
              <span className="brandLogoItem" key={`${brand.name}-${index}`}>
                <img src={brand.src} alt={`${brand.name} logo`} />
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="story sectionShell twoColumn reveal">
        <p className="kicker">Company overview</p>
        <div>
          <h2>One company. Seven brands. Hundreds of retail relationships.</h2>
          <p>
            Everything we build follows the same principle: make cannabis products easier to understand, easier to shop, and easier to trust. Clean shelves are not an accident — they come from consistent brand systems, reliable support, and products customers can recognize quickly.
          </p>
        </div>
      </section>

      <section className="retailMoment sectionShell reveal" id="retail" aria-label="Retail support">
        <div className="retailImage" />
        <div className="retailText">
          <p className="kicker">Retail support</p>
          <h2><CountUp end={300} suffix="+" /> retail partners across Washington.</h2>
          <p>Dependable brands, approved assets, clear product communication, and customer-first support for stores, buyers, and partners.</p>
          <div className="partnerMarquee" aria-label="Selected retail partners">
            <div className="partnerFade left" />
            <div className="partnerFade right" />
            <div className="partnerTrack">
              {retailLoop.map((partner, index) => (
                <span className="partnerLogo" key={`${partner}-${index}`}>{partner}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="brands" className="brandDirectory sectionShell reveal">
        <div className="sectionIntro">
          <p className="kicker">Owned brands</p>
          <h2>Distinct brand experiences. One operating standard.</h2>
        </div>
        <div className="brandRows">
          {brands.map((brand) => (
            <a
  className="brandRow"
  href={brand.href}
  target="_blank"
  rel="noopener noreferrer"
  key={brand.name}
>
              <span className="brandNumber">{brand.n}</span>
              <span className="brandBadge">{brand.initials}</span>
              <span className="brandName">{brand.name}</span>
              <span className="brandRole">{brand.role}</span>
              <span className="brandCopy">{brand.copy}</span>
              <span className="brandArrow">↗</span>
            </a>
          ))}
        </div>
      </section>

      <section id="media" className="mediaCenter sectionShell reveal">
        <div>
          <p className="kicker">Media center</p>
          <h2>Approved assets for retail partners and internal teams.</h2>
          <p>Link out to approved logos, photography, menu assets, product references, and brand guidelines. Replace placeholders with your live media kit URLs.</p>
        </div>
        <div className="resourceGrid">
          {resources.map((resource) => (
            <a href="#" key={resource.title}>
              <strong>{resource.title}</strong>
              <span>{resource.text}</span>
              <em>↗</em>
            </a>
          ))}
        </div>
      </section>

      <footer className="footer sectionShell">
        <div className="footerBrand">
          <strong>Ember Northwest</strong>
          <span>Washington-rooted cannabis brand family.</span>
        </div>
        <div>
          <strong>Brand Family</strong>
          {brands.map((brand) => <a href={brand.href} key={brand.name}>{brand.name}</a>)}
        </div>
        <div>
          <strong>Resources</strong>
          <a href="#media">Media Center</a>
          <a href="#retail">Retail Resources</a>
          <a href="#brands">Portfolio</a>
        </div>
      </footer>
    </main>
  );
}
