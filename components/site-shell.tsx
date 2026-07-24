"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { ArrowUp, Home, Mail, MapPin, Menu, Phone, Search, X } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { brand, collections } from "@/data/brand";

export function Wordmark({light=false}:{light?:boolean}) {
  return <span className={`wordmark ${light?"wordmarkLight":""}`}><strong>TRIOAK</strong><small>FURNITURE CO.</small></span>;
}

export function SiteHeader() {
  const [open,setOpen]=useState(false);
  const links=[["Home","/"],["About","/about"],["Collections","/collections"],["Projects","/projects"],["Services","/services"],["Gallery","/gallery"]];
  useEffect(()=>{document.body.style.overflow=open?"hidden":"";return()=>{document.body.style.overflow=""}},[open]);
  useEffect(()=>{const key=(event:KeyboardEvent)=>{if(event.key==="Escape")setOpen(false);if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==="k"){event.preventDefault();window.location.assign("/search")}};document.addEventListener("keydown",key);return()=>document.removeEventListener("keydown",key)},[]);
  return <header className="header">
    <Link href="/" aria-label="Trioak Furniture Co. home"><Wordmark light/></Link>
    <nav aria-label="Primary navigation">{links.map(([name,href])=><Link className={href==="/"?"navHome":""} href={href} key={href}>{href==="/"&&<Home aria-hidden="true"/>}{name}</Link>)}</nav>
    <div className="headerActions"><Link href="/search" aria-label="Search website"><Search aria-hidden="true"/></Link><Link className="headerContactBtn" href="/contact">Contact <span>↗</span></Link></div>
    <button className="menuButton" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu"><Menu aria-hidden="true"/>Menu</button>
    <div id="mobile-menu" className={`mobileMenu ${open?"open":""}`} aria-hidden={!open}>
      <button onClick={()=>setOpen(false)} aria-label="Close menu"><X aria-hidden="true"/> Close</button><Wordmark light/>
      <nav>{[...links,["Search","/search"],["Contact","/contact"],["Request quote","/quote"],["Compare","/compare"]].map(([name,href])=><Link onClick={()=>setOpen(false)} href={href} key={href}>{name}<span>↗</span></Link>)}</nav>
      <div><a aria-label="Message Trioak on WhatsApp" href={brand.whatsappUrl}><FaWhatsapp aria-hidden="true"/> WhatsApp</a><a aria-label="Visit Trioak on Instagram" href={brand.instagram}><FaInstagram aria-hidden="true"/> Instagram</a></div>
    </div>
  </header>;
}

export function SiteFooter() {
  return <footer className="footer"><div className="footerTop"><div><Wordmark light/><p>Premium furniture, crafted around your space.</p></div><div><p className="eyebrow light">Let&apos;s talk</p><a className="footerBigLink" href={brand.whatsappUrl}>Begin your project <span>↗</span></a></div></div><div className="footerGrid"><div><h4>Explore</h4>{["About","Projects","Services","Gallery","Inspiration","Contact","Quote","Compare"].map(item=><Link key={item} href={`/${item.toLowerCase()}`}>{item}</Link>)}</div><div><h4>Collections</h4>{collections.slice(0,6).map(item=><Link key={item.slug} href={`/collections/${item.slug}`}>{item.title}</Link>)}</div><div><h4>Visit &amp; contact</h4><address><MapPin aria-hidden="true"/>{brand.address}</address><a href={brand.phoneHref}><Phone aria-hidden="true"/>{brand.phone}</a><a href={brand.alternatePhoneHref}><Phone aria-hidden="true"/>{brand.alternatePhone}</a><a href={`mailto:${brand.email}`}><Mail aria-hidden="true"/>{brand.email}</a><a href={brand.directions}>Get directions ↗</a></div><div><h4>Follow</h4><a aria-label="Visit Trioak Furniture Co. on Instagram" href={brand.instagram}><FaInstagram aria-hidden="true"/>Instagram</a><a aria-label="Message Trioak Furniture Co. on WhatsApp" href={brand.whatsappUrl}><FaWhatsapp aria-hidden="true"/>WhatsApp</a></div></div><div className="footerBottom"><span>© {new Date().getFullYear()} Trioak Furniture Co.</span><div><Link href="/privacy-policy">Privacy</Link><Link href="/terms">Terms</Link><a href="#main">Back to top ↑</a></div></div></footer>;
}

export function WhatsAppDock(){return <a className="whatsappDock" href={brand.whatsappUrl} aria-label="Enquire on WhatsApp"><span>Message us</span><b><FaWhatsapp aria-hidden="true"/></b></a>}
export function ScrollTopDock(){return <a className="scrollTopDock" href="#main" aria-label="Back to top"><ArrowUp aria-hidden="true"/></a>}

export function EnquiryForm({subject="Furniture requirement"}:{subject?:string}) {
  const [status,setStatus]=useState("");
  function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();const data=new FormData(event.currentTarget),name=data.get("name"),phone=data.get("phone"),message=data.get("message");if(!name||!phone){setStatus("Please add your name and phone number.");return}const text=`Hello Trioak Furniture Co., I'm ${name}. My phone is ${phone}. I'm enquiring about ${subject}. ${message||""}`;window.open(`https://wa.me/919601967029?text=${encodeURIComponent(text)}`,"_blank");setStatus("Your enquiry is ready in WhatsApp.")}
  return <form className="enquiryForm" onSubmit={submit}><label>Name<input name="name" required placeholder="Your name"/></label><label>Phone<input name="phone" required inputMode="tel" placeholder="+91"/></label><label>Email<input name="email" type="email" placeholder="you@example.com"/></label><label>Tell us about your space<textarea name="message" rows={4} placeholder="Project type, room and what you have in mind"/></label><label className="consent"><input type="checkbox" required/> I consent to being contacted about this enquiry.</label><button className="button darkButton" type="submit">Continue on WhatsApp <span>↗</span></button><p role="status">{status}</p></form>;
}
