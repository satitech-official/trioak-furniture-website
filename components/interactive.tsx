"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, Search, SlidersHorizontal, X } from "lucide-react";
import { brand, collections, services } from "@/data/brand";

const quoteSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  phone: z.string().min(8, "Please enter a valid phone number."),
  email: z.string().email("Please enter a valid email address.").or(z.literal("")),
  city: z.string().min(2, "Please enter your city."),
  projectType: z.string().min(1, "Choose a project type."),
  budget: z.string().min(1, "Choose an approximate budget."),
  message: z.string().min(10, "Tell us a little more about your requirement."),
  consent: z.boolean().refine(Boolean, "Consent is required."),
});
type QuoteValues = z.infer<typeof quoteSchema>;

export function QuoteForm() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<QuoteValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { email: "", consent: false },
  });
  const submit = async (values: QuoteValues) => {
    const text = `Hello Trioak Furniture Co., I’m ${values.name} from ${values.city}. Phone: ${values.phone}. Project: ${values.projectType}. Budget: ${values.budget}. ${values.message}`;
    window.open(`https://wa.me/919601967029?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setSent(true);
    reset();
  };
  if (sent) return <div className="formSuccess"><Check aria-hidden="true"/><h2>Your enquiry is ready.</h2><p>WhatsApp has opened with your project details. Send the message to begin the consultation.</p><button onClick={() => setSent(false)}>Send another enquiry</button></div>;
  return <form className="quoteForm" onSubmit={handleSubmit(submit)} noValidate>
    <Field label="Full name" error={errors.name?.message}><input {...register("name")} autoComplete="name"/></Field>
    <Field label="Phone number" error={errors.phone?.message}><input {...register("phone")} inputMode="tel" autoComplete="tel"/></Field>
    <Field label="Email (optional)" error={errors.email?.message}><input {...register("email")} type="email" autoComplete="email"/></Field>
    <Field label="City" error={errors.city?.message}><input {...register("city")} autoComplete="address-level2"/></Field>
    <Field label="Project type" error={errors.projectType?.message}><select {...register("projectType")} defaultValue=""><option value="" disabled>Select one</option><option>Residential</option><option>Commercial</option><option>Office</option><option>Custom furniture</option></select></Field>
    <Field label="Approximate budget" error={errors.budget?.message}><select {...register("budget")} defaultValue=""><option value="" disabled>Select a range</option><option>Under ₹2 lakh</option><option>₹2–5 lakh</option><option>₹5–10 lakh</option><option>₹10 lakh+</option><option>Discuss with Trioak</option></select></Field>
    <Field label="Your requirement" error={errors.message?.message} wide><textarea {...register("message")} rows={5}/></Field>
    <label className="consent wide"><input {...register("consent")} type="checkbox"/> I agree to be contacted about this enquiry.</label>
    {errors.consent && <p className="fieldError wide">{errors.consent.message}</p>}
    <button className="button darkButton wide" disabled={isSubmitting}>{isSubmitting ? "Preparing…" : "Continue securely on WhatsApp"} <span>↗</span></button>
  </form>;
}
function Field({label,error,wide,children}:{label:string;error?:string;wide?:boolean;children:React.ReactNode}){return <label className={wide?"wide":""}>{label}{children}{error&&<span className="fieldError">{error}</span>}</label>}

export function CollectionExplorer() {
  const [query,setQuery]=useState(""); const [filter,setFilter]=useState("All");
  const items=useMemo(()=>collections.filter(x=>(filter==="All"||["Living Room","Bedroom","Office","Commercial"].includes(filter)?filter==="All"||x.title===filter:true)&&`${x.title} ${x.description}`.toLowerCase().includes(query.toLowerCase())),[query,filter]);
  const addCompare=(slug:string)=>{const saved=JSON.parse(localStorage.getItem("trioak-compare")||"[]") as string[];const next=[...new Set([...saved,slug])].slice(-3);localStorage.setItem("trioak-compare",JSON.stringify(next));window.location.assign(`/compare?items=${next.join(",")}`);};
  return <section className="catalogue editorialCatalogue section"><div className="collectionShowcaseIntro"><div><p className="eyebrow">Nine distinct directions</p><h2>Find the collection<br/>that feels like <em>you.</em></h2></div><p>Each range is a starting point—proportions, materials and finishes are resolved around your space.</p></div><div className="catalogueTools"><label><Search aria-hidden="true"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search collections" aria-label="Search collections"/></label><div><SlidersHorizontal aria-hidden="true"/>{["All","Living Room","Bedroom","Office","Commercial"].map(x=><button className={filter===x?"active":""} onClick={()=>setFilter(x)} key={x}>{x}</button>)}</div></div><p className="resultCount">{items.length} collection{items.length===1?"":"s"}</p><div className="listing">{items.map((x,i)=><article className="listingCard premiumListingCard" key={x.slug}><Link href={`/collections/${x.slug}`}><div className="listingImage" style={{backgroundImage:`linear-gradient(${x.tint},${x.tint}),url(${x.image})`,backgroundPosition:x.position}}><span className="collectionNumber">0{i+1}</span><i>View collection ↗</i></div><h2>{x.title}</h2><p>{x.description}</p></Link><div className="cardActions"><Link href={`/collections/${x.slug}`}>Discover the range ↗</Link><button onClick={()=>addCompare(x.slug)}>+ Compare</button></div></article>)}</div>{!items.length&&<div className="emptyState"><h2>No matching collection</h2><p>Try another category or clear your search.</p><button onClick={()=>{setQuery("");setFilter("All")}}>Clear filters</button></div>}</section>
}

export function CompareView(){
  const [slugs,setSlugs]=useState<string[]>([]);
  useEffect(()=>{const timer=window.setTimeout(()=>{const query=new URLSearchParams(window.location.search).get("items");const next=query?query.split(",").filter(Boolean):JSON.parse(localStorage.getItem("trioak-compare")||"[]");setSlugs(next)},0);return()=>window.clearTimeout(timer)},[]);
  const items=collections.filter(x=>slugs.includes(x.slug));const remove=(slug:string)=>{const next=slugs.filter(x=>x!==slug);setSlugs(next);localStorage.setItem("trioak-compare",JSON.stringify(next))};
  if(!items.length)return <section className="emptyState section"><h2>Your comparison is empty.</h2><p>Add up to three collections to compare their intended space and customization direction.</p><Link className="button darkButton" href="/collections">Browse collections ↗</Link></section>;
  return <section className="compareGrid section">{items.map(x=><article key={x.slug}><button onClick={()=>remove(x.slug)} aria-label={`Remove ${x.title}`}><X aria-hidden="true"/></button><div style={{backgroundImage:`url(${x.image})`,backgroundPosition:x.position}}/><h2>{x.title}</h2><dl><div><dt>Suitable space</dt><dd>{x.title}</dd></div><div><dt>Customization</dt><dd>Made to requirement</dd></div><div><dt>Pricing</dt><dd>Request quotation</dd></div></dl><a href={`${brand.whatsappUrl}%20${encodeURIComponent(`I would like to discuss the ${x.title} collection.`)}`}>Enquire ↗</a></article>)}</section>
}

export function SearchOverlay({open,onClose}:{open:boolean;onClose:()=>void}){
  const [query,setQuery]=useState("");useEffect(()=>{if(!open)return;const key=(e:KeyboardEvent)=>e.key==="Escape"&&onClose();document.addEventListener("keydown",key);return()=>document.removeEventListener("keydown",key)},[open,onClose]);
  const results=[...collections.map(x=>({title:x.title,href:`/collections/${x.slug}`,type:"Collection"})),...services.map(x=>({title:x.title,href:"/services",type:"Service"})),{title:"Contact Trioak",href:"/contact",type:"Page"},{title:"Request a quote",href:"/quote",type:"Page"}].filter(x=>x.title.toLowerCase().includes(query.toLowerCase())).slice(0,8);
  if(!open)return null;return <div className="searchOverlay" role="dialog" aria-modal="true" aria-label="Search website"><button onClick={onClose} aria-label="Close search"><X/></button><div><p className="eyebrow light">Search Trioak</p><label><Search aria-hidden="true"/><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Collections, services, projects…"/></label><div className="searchResults">{results.map(x=><Link onClick={onClose} href={x.href} key={`${x.type}-${x.title}`}><span>{x.type}</span>{x.title}<b>↗</b></Link>)}</div></div></div>
}
