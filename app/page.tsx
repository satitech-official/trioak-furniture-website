import Image from "next/image";
import Link from "next/link";
import { HeroSlider, LuxuryCursor, LuxuryLoader, MotionDirector, ProjectSpotlight, ShowroomMap } from "@/components/home-enhancements";
import { ScrollTopDock, SiteFooter, SiteHeader, WhatsAppDock } from "@/components/site-shell";
import { brand, collections, processSteps, services } from "@/data/brand";

export default function Home() {
  return (
    <>
      <LuxuryLoader />
      <LuxuryCursor />
      <MotionDirector />
      <SiteHeader />
      <main id="main">
        <HeroSlider />

        <section className="story section" id="story" data-reveal>
          <div className="sectionIndex">01</div>
          <div className="storyLead"><p className="eyebrow">The Trioak approach</p><h2>Designed in detail.<br /><em>Built to last.</em></h2><div className="storyImage"><Image src="/images/real/interior-detail.jpg" alt="Warm material details in a contemporary Trioak-inspired interior" fill sizes="(max-width: 900px) 100vw, 55vw" unoptimized/><span>Material · Proportion · Craft</span></div></div>
          <div className="storyBody"><p>Trioak Furniture Co. brings residential and commercial spaces to life through made-to-measure furniture, material intelligence and hands-on manufacturing.</p><p>From first conversation to final installation, every piece is considered in the context of your room—not chosen in isolation.</p><Link className="textLink" href="/about">Discover our approach <span>→</span></Link></div>
          <div className="materialRail" aria-label="Materials we work with">{["Oak", "Walnut", "Veneer", "Upholstery", "Metal"].map((item) => <span key={item}>{item}</span>)}</div>
        </section>

        <section className="collections section darkSection" data-reveal>
          <div className="sectionHead"><div><p className="eyebrow light">Signature collections</p><h2>Furniture with<br /><em>a point of view.</em></h2></div><p>Explore furniture shaped for living, working, gathering and retreating.</p></div>
          <div className="collectionGrid">
            {collections.slice(0, 6).map((item, index) => <Link href={`/collections/${item.slug}`} className={`collectionCard card${index + 1}`} key={item.slug}><div className="imageCrop" style={{ backgroundImage: `linear-gradient(${item.tint}, ${item.tint}), url(${item.image})`, backgroundPosition: item.position }} /><div className="cardLine"><span>0{index + 1}</span><h3>{item.title}</h3><b>↗</b></div><p>{item.description}</p></Link>)}
          </div>
          <Link className="button outlineButton" href="/collections">View all collections <span>↗</span></Link>
        </section>

        <section className="why section" data-reveal>
          <div className="stickyTitle"><p className="eyebrow">Why Trioak</p><h2>One studio.<br />Every <em>detail.</em></h2><p>From spatial thinking to final handover, the experience stays considered and connected.</p><div className="whyImage"><Image src="/images/real/modular.jpg" alt="Detailed custom furniture and material craftsmanship" fill sizes="(max-width: 900px) 100vw, 35vw" unoptimized/><span><b>Local craft</b><small>Designed &amp; made in Indore</small></span></div></div>
          <div className="featureList">{services.slice(0, 6).map((item, index) => <article key={item.title}><span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div>
        </section>

        <section className="process section"><div className="sectionHead"><div><p className="eyebrow">From concept to craft</p><h2>A measured path<br />to something <em>personal.</em></h2></div><p>Eight clear stages. One continuous conversation.</p></div><ol className="timeline">{processSteps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>)}</ol></section>

        <ProjectSpotlight />

        <section className="trust section"><p className="eyebrow">Made around your needs</p><div className="trustGrid">{["Made-to-measure furniture","Residential & commercial capability","Local consultation in Indore","End-to-end manufacturing","Professional installation"].map((item, index) => <div key={item}><span>0{index + 1}</span><p>{item}</p></div>)}</div></section>

        <section className="instagram section darkSection"><div className="sectionHead"><div><p className="eyebrow light">@trioakfurnitureco</p><h2>From our workshop<br />&amp; <em>latest spaces.</em></h2></div><a className="textLink lightText" href={brand.instagram} target="_blank" rel="noreferrer">Follow on Instagram <span>↗</span></a></div><div className="instaGrid">{[["Material detail","/images/real/interior-detail.jpg"],["Living space","/images/real/living-room.jpg"],["Bedroom study","/images/real/bedroom.jpg"],["Workspace","/images/real/office.jpg"]].map(([label,image],index)=><a href={brand.instagram} target="_blank" rel="noreferrer" key={label}><div style={{backgroundImage:`linear-gradient(rgba(16,16,15,.${index+1}),rgba(16,16,15,.${index+2})),url(${image})`}}/><span>{label} ↗</span></a>)}</div></section>

        <ShowroomMap />

        <section className="finalCta"><Image src="/images/real/interior-detail.jpg" alt="" fill sizes="100vw" unoptimized /><div className="heroShade" /><div><p className="eyebrow light">Begin a conversation</p><h2>Let&apos;s create furniture<br />around <em>your space.</em></h2><p>Share your requirements and begin a personalized consultation with Trioak.</p><div className="actions"><a className="button lightButton" href={brand.whatsappUrl}>Start WhatsApp enquiry <span>↗</span></a><Link className="textLink lightText" href="/quote">Request a quote <span>→</span></Link></div></div></section>
      </main>
      <SiteFooter />
      <ScrollTopDock />
      <WhatsAppDock />
    </>
  );
}
