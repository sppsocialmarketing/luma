import Image from "next/image";
import { Header } from "@/components/Header";
import { CursorGlow } from "@/components/CursorGlow";

const brands = [
  { name: "The Batch", type: "Limited releases", src: "/assets/brand/the-batch.svg", href: "https://getthebatch.com", className: "batch" },
  { name: "Smokey Point", type: "Washington original", src: "/assets/brand/smokey-point.svg", href: "#contact", className: "smokey" },
  { name: "Regulator", type: "Everyday cannabis", src: "/assets/brand/regulator.svg", href: "https://goregulator.com", className: "regulator" },
  { name: "SnoCone", type: "Ice cold flavor", src: "/assets/brand/snocone.svg", href: "https://snocone-premium-site.vercel.app/", className: "snocone" },
  { name: "1UP", type: "Arcade-inspired cannabis", src: "/assets/brand/1up.svg", href: "#contact", className: "oneup" },
  { name: "June's Edibles", type: "Approachable edibles", src: "/assets/brand/junes-edibles.svg", href: "#contact", className: "junes" },
  { name: "Treat Edibles", type: "Craveable edibles", src: "/assets/brand/treat-edibles.svg", href: "#contact", className: "treat" },
];

export default function Home() {
  return (
    <main>
      <CursorGlow />
      <Header />

      <section className="hero" id="top">
        <div className="heroNoise" />
        <div className="heroEmber emberA" />
        <div className="heroEmber emberB" />
        <div className="shell heroInner">
          <p className="eyebrow"><span /> Independent. Washington grown.</p>
          <h1>We build<br />cannabis <em>brands.</em></h1>
          <div className="heroBottom">
            <p>Ember Northwest is the independent house behind seven distinct cannabis brands, built exclusively for Washington State.</p>
            <a className="roundLink" href="#brands" aria-label="Explore our brands"><span>Explore</span><b>↓</b></a>
          </div>
        </div>
        <div className="heroRail" aria-hidden="true"><span>WASHINGTON STATE</span><i /> <span>SEVEN BRANDS</span><i /> <span>ONE HOUSE</span></div>
      </section>

      <section className="manifesto shell" id="house">
        <div className="sectionLabel"><span>01</span> The house</div>
        <div className="manifestoCopy">
          <p className="largeCopy">One roof. Many points of view. <span>Every brand we create has its own world, its own voice, and a reason to exist.</span></p>
          <div className="manifestoDetails">
            <p>We are operators, designers, makers, and cannabis people. We build our own products from the ground up and support them all the way to the shelf.</p>
            <p>That ownership lets us move with intention, protect quality, and create brands that feel like something—not just look like something.</p>
          </div>
        </div>
      </section>

      <section className="brandsSection shell" id="brands">
        <div className="sectionHeading">
          <div className="sectionLabel"><span>02</span> Our brands</div>
          <h2>Seven brands.<br /><em>Zero filler.</em></h2>
          <p>Different moods, different moments, one shared standard.</p>
        </div>
        <div className="brandGrid">
          {brands.map((brand, index) => (
            <a className={`brandCard ${brand.className}`} href={brand.href} key={brand.name} target={brand.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              <div className="brandCardTop"><span>0{index + 1}</span><span>{brand.type}</span></div>
              <div className="brandLogo"><img src={brand.src} alt={`${brand.name} logo`} /></div>
              <div className="brandCardBottom"><strong>{brand.name}</strong><span>↗</span></div>
            </a>
          ))}
        </div>
      </section>

      <section className="standards" id="standards">
        <div className="shell standardsInner">
          <div className="sectionLabel light"><span>03</span> Our standard</div>
          <p className="standardsStatement">Built here.<br />Made with intent.<br /><em>Never generic.</em></p>
          <div className="standardList">
            <div><span>01</span><strong>Distinct by design</strong><p>Every brand earns its place and owns its lane.</p></div>
            <div><span>02</span><strong>Washington only</strong><p>Focused on the market and people we know best.</p></div>
            <div><span>03</span><strong>Quality, carried through</strong><p>From the product to the package to the retail floor.</p></div>
          </div>
        </div>
      </section>

      <section className="contact shell" id="contact">
        <div className="contactMark"><Image src="/logo/ember-logo.png" alt="" width={170} height={170} /></div>
        <p className="eyebrow"><span /> Washington State</p>
        <h2>Where ideas<br />catch <em>fire.</em></h2>
        <p>Retailer, distributor, or just curious about what we&apos;re building?</p>
      </section>

      <footer className="footer shell">
        <div className="footerBrand"><Image src="/logo/ember-logo.png" alt="" width={28} height={28} /><strong>EMBER<br />NORTHWEST</strong></div>
        <p>© 2026 Ember Northwest. For adults 21+ only.<br />Please consume responsibly.</p>
        <div><a href="#top">Back to top ↑</a></div>
      </footer>
    </main>
  );
}
