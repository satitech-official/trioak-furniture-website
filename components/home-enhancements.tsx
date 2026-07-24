"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, MapPin, MessageCircle, Pause, Play } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { brand } from "@/data/brand";

const slides = [
  { image:"/images/real/living-room.jpg", label:"Living / 01", title:"Furniture designed around the way you live.", copy:"Custom residential furniture shaped through proportion, comfort and material detail." },
  { image:"/images/real/bedroom.jpg", label:"Bedroom / 02", title:"A quieter expression of modern luxury.", copy:"Bespoke bedroom furniture that brings storage, softness and structure into balance." },
  { image:"/images/real/office.jpg", label:"Workspace / 03", title:"Workspaces with presence and purpose.", copy:"Executive and commercial furniture built for focus, confidence and everyday performance." },
  { image:"/images/real/dining.jpg", label:"Dining / 04", title:"Made for the rituals of gathering.", copy:"Dining furniture designed to anchor conversations, occasions and daily life." },
];

const projects = [
  { image:"/images/real/office.jpg", eyebrow:"Commercial · Executive series", title:"Executive Workspace", type:"Commercial", scope:"Bespoke furniture", focus:"Focused work", href:"/projects/executive-workspace" },
  { image:"/images/real/living-room.jpg", eyebrow:"Residential · Living series", title:"Contemporary Residence", type:"Residential", scope:"Living collection", focus:"Everyday comfort", href:"/projects/contemporary-residence" },
  { image:"/images/real/bedroom.jpg", eyebrow:"Residential · Private retreat", title:"Bedroom Suite", type:"Residential", scope:"Custom furniture", focus:"Rest & storage", href:"/projects/bespoke-bedroom-suite" },
];

export function LuxuryLoader(){
  const [visible,setVisible]=useState(true);const [progress,setProgress]=useState(0);
  useEffect(()=>{const interval=window.setInterval(()=>setProgress(value=>Math.min(value+8,100)),70);const timer=window.setTimeout(()=>setVisible(false),1100);return()=>{clearInterval(interval);clearTimeout(timer)}},[]);
  if(!visible)return null;return <div className="luxuryLoader" role="status" aria-label="Loading Trioak Furniture Co."><div className="loaderRing"><span/></div><strong>TRIOAK</strong><small>FURNITURE CO.</small><div className="loaderProgress"><i style={{width:`${progress}%`}}/></div><em>{progress}%</em></div>
}

export function LuxuryCursor(){
  const dot=useRef<HTMLDivElement>(null);const ring=useRef<HTMLDivElement>(null);
  useEffect(()=>{if(!window.matchMedia("(pointer:fine)").matches||window.matchMedia("(prefers-reduced-motion:reduce)").matches)return;const move=(event:MouseEvent)=>{if(dot.current)dot.current.style.transform=`translate3d(${event.clientX}px,${event.clientY}px,0)`;if(ring.current)ring.current.animate({transform:`translate3d(${event.clientX}px,${event.clientY}px,0)`},{duration:340,fill:"forwards"})};window.addEventListener("mousemove",move);return()=>window.removeEventListener("mousemove",move)},[]);
  return <><div ref={ring} className="cursorRing"/><div ref={dot} className="cursorDot"/></>
}

export function HeroSlider(){
  const [index,setIndex]=useState(0);const [paused,setPaused]=useState(false);const slide=slides[index];
  useEffect(()=>{if(paused)return;const timer=window.setInterval(()=>setIndex(value=>(value+1)%slides.length),5500);return()=>clearInterval(timer)},[paused]);
  const move=(direction:number)=>setIndex(value=>(value+direction+slides.length)%slides.length);
  return <section className="cinematicHero" aria-roledescription="carousel" aria-label="Trioak furniture collections">
    <div className="heroSlides">{slides.map((item,itemIndex)=><div className={`heroSlide ${itemIndex===index?"active":""}`} aria-hidden={itemIndex!==index} key={item.image}><Image src={item.image} alt={item.title} fill priority={itemIndex===0} sizes="100vw" unoptimized/></div>)}</div>
    <div className="cinematicShade"/>
    <aside className="heroCategories" aria-label="Featured spaces">{slides.map((item,itemIndex)=><button className={itemIndex===index?"active":""} onClick={()=>setIndex(itemIndex)} key={item.label}><span>0{itemIndex+1}</span>{item.label.split(" / ")[0]}</button>)}</aside>
    <div className="heroEditorial">
      <p className="heroKicker"><span/>Residential & Commercial Furniture · Indore</p>
      <p className="heroSlideLabel">{slide.label}</p>
      <h1>{slide.title}</h1>
      <p className="heroStatement">{slide.copy}</p>
      <div className="heroButtons">
        <Link className="heroPrimary" href="/collections">Explore collections <ArrowUpRight aria-hidden="true"/></Link>
        <Link className="heroSecondary" href="/quote">Request consultation <ArrowRight aria-hidden="true"/></Link>
        <a className="heroIconAction" href={brand.whatsappUrl} aria-label="Message Trioak on WhatsApp"><FaWhatsapp aria-hidden="true"/></a>
      </div>
    </div>
    <div className="heroControlBar"><div className="heroProgress"><i style={{width:`${((index+1)/slides.length)*100}%`}}/></div><span>0{index+1}</span><span>/ 0{slides.length}</span><button onClick={()=>move(-1)} aria-label="Previous slide"><ArrowLeft/></button><button onClick={()=>setPaused(value=>!value)} aria-label={paused?"Play slideshow":"Pause slideshow"}>{paused?<Play/>:<Pause/>}</button><button onClick={()=>move(1)} aria-label="Next slide"><ArrowRight/></button></div>
    <a className="heroScroll" href="#story"><ArrowDown/>Scroll to discover</a>
  </section>
}

export function MotionDirector(){
  useEffect(()=>{if(window.matchMedia("(prefers-reduced-motion:reduce)").matches)return;const nodes=document.querySelectorAll<HTMLElement>("[data-reveal]");const observer=new IntersectionObserver(entries=>entries.forEach(entry=>entry.isIntersecting&&entry.target.classList.add("isRevealed")),{threshold:.14});nodes.forEach(node=>observer.observe(node));return()=>observer.disconnect()},[]);
  return null;
}

export function ProjectSpotlight(){
  const [index,setIndex]=useState(0);const project=projects[index];
  return <section className="projectSpotlight" data-reveal>
    <div className="projectVisual">{projects.map((item,itemIndex)=><div key={item.image} className={`projectVisualSlide ${itemIndex===index?"active":""}`} style={{backgroundImage:`url(${item.image})`}}/>)}
      <div className="projectCounter"><span>0{index+1}</span><i/><span>0{projects.length}</span></div>
    </div>
    <div className="projectSpotlightPanel">
      <p className="eyebrow light">{project.eyebrow}</p>
      <h2>{project.title.split(" ")[0]}<br/><em>{project.title.split(" ").slice(1).join(" ")}</em></h2>
      <p className="projectSummary">A considered environment where furniture, function and atmosphere are designed as one.</p>
      <dl><div><dt>Type</dt><dd>{project.type}</dd></div><div><dt>Scope</dt><dd>{project.scope}</dd></div><div><dt>Focus</dt><dd>{project.focus}</dd></div></dl>
      <div className="projectActions"><Link className="button lightButton" href={project.href}>Explore project <ArrowUpRight/></Link><div><button onClick={()=>setIndex(value=>(value-1+projects.length)%projects.length)} aria-label="Previous project"><ArrowLeft/></button><button onClick={()=>setIndex(value=>(value+1)%projects.length)} aria-label="Next project"><ArrowRight/></button></div></div>
    </div>
  </section>
}

export function ZigzagMarquee(){
  const words=["Bespoke furniture","Material intelligence","Made in Indore","Residential","Commercial","Crafted to last"];
  return <div className="zigzagMarquee" aria-label="Trioak furniture capabilities"><div>{[...words,...words].map((word,index)=><span key={`${word}-${index}`}>{word}<i>✦</i></span>)}</div></div>
}

export function ShowroomMap(){
  return <section className="showroomMap section"><div className="mapCopy"><p className="eyebrow">Visit · Discuss · Discover</p><h2>See materials.<br/>Feel the <em>difference.</em></h2><p>Visit Trioak Furniture Co. at Dewas Naka, Lasudiya Mori, Indore for a direct conversation about your space, materials and furniture requirements.</p><div className="mapActions"><a className="button darkButton" href={brand.directions}><MapPin/>Get directions <ArrowUpRight/></a><a href={brand.whatsappUrl}><MessageCircle/>Book a visit</a></div><div className="socialProof"><a aria-label="Instagram" href={brand.instagram}><FaInstagram/><span>@trioakfurnitureco</span></a><a aria-label="WhatsApp" href={brand.whatsappUrl}><FaWhatsapp/><span>WhatsApp consultation</span></a></div></div><div className="mapFrame"><iframe title="Trioak Furniture Co. location in Indore" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Dewas%20Naka%2C%20Lasudiya%20Mori%2C%20Indore%2C%20Madhya%20Pradesh&output=embed"/><div className="mapBadge"><MapPin/><span>Trioak Furniture Co.<small>Indore, Madhya Pradesh</small></span></div></div></section>
}
