import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  Check,
  Code2,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Rocket,
  Sparkles,
  Target,
  X,
} from 'lucide-react'

const EMAIL = 'pinnacletechservices4@gmail.com'

const navItems = [
  ['About', '#about'],
  ['Expertise', '#expertise'],
  ['Experience', '#experience'],
  ['Work', '#work'],
  ['Contact', '#contact'],
]

const expertise = [
  {
    icon: Target,
    number: '01',
    title: 'Business Development & Growth',
    text: 'Full-cycle client acquisition, market-entry strategy, strategic partnerships, revenue operations, and CRM-driven pipeline management.',
    tags: ['B2B Sales', 'RevOps', 'Partnerships'],
  },
  {
    icon: Code2,
    number: '02',
    title: 'Software & Web Development',
    text: 'Responsive websites, web applications, e-commerce platforms, and mobile product delivery—from technical planning through launch.',
    tags: ['React', 'WordPress', 'Mobile Apps'],
  },
  {
    icon: Bot,
    number: '03',
    title: 'AI Automation',
    text: 'Practical AI-assisted workflows that streamline research, content operations, client delivery, and repetitive business processes.',
    tags: ['Workflow Design', 'AI Tools', 'Process Automation'],
  },
  {
    icon: BriefcaseBusiness,
    number: '04',
    title: 'Project & Programme Delivery',
    text: 'Cross-functional leadership across creative, technical, and institutional teams, with clear scopes, strong stakeholder alignment, and accountable execution.',
    tags: ['UI/UX Oversight', 'Stakeholders', 'Launch Delivery'],
  },
]

const experience = [
  {
    period: 'Current',
    role: 'Founder',
    company: 'Pinnacle Tech Services',
    location: 'Abuja, Nigeria',
    summary: 'Leading a digital services practice focused on web and software development, AI automation, digital growth, and technology advisory for ambitious organisations.',
  },
  {
    period: '2025 — Present',
    role: 'Digital Solutions Officer & Project Manager',
    company: 'Malleable Communications Limited',
    location: 'Nigeria',
    summary: 'Shape client-facing proposals, scopes, and digital strategies; lead commercial conversations and coordinate creative, strategy, and production teams around profitable delivery.',
  },
  {
    period: '2025 — 2026',
    role: 'Project Manager & Growth Specialist',
    company: 'Noblesse Tribe',
    location: 'Social media startup',
    summary: 'Refined the founding product concept and growth positioning, oversaw UI/UX design, coordinated designers and developers, and managed launch delivery to Google Play and the Apple App Store.',
  },
  {
    period: '2025 — 2026',
    role: 'Project Lead & Mobile App Developer',
    company: 'Noblesse Oblige Charitable Foundation',
    location: 'Youth technology initiative',
    summary: 'Led a youth tech-empowerment programme, negotiated institutional partnerships and sponsorships, and built a resource-sharing and learning management system for digital training.',
  },
  {
    period: '2026',
    role: 'IT Placement Professional',
    company: 'Office of the Secretary to the Government of the Federation',
    location: 'Department of Political & Economic Affairs · Abuja',
    summary: 'Advised senior government stakeholders on digital infrastructure and policy-aligned technology initiatives, navigating institutional approval processes to build support for technical projects.',
  },
  {
    period: '2021 — 2025',
    role: 'Founder & Head of Growth',
    company: 'Wear Naija',
    location: 'E-commerce marketplace',
    summary: 'Founded and scaled a marketplace connecting Nigerian fashion artisans with global B2B and B2C markets, owning business development, partnerships, and revenue growth.',
  },
  {
    period: 'Ongoing',
    role: 'Business Development & Digital Strategy Consultant',
    company: 'Independent Consultancy',
    location: '14+ clients across Nigeria & the UK',
    summary: 'Deliver market research, client acquisition, service packaging, proposals, negotiation, and digital strategy for organisations across healthcare, education, real estate, agencies, and e-commerce.',
  },
  {
    period: '2021 — 2024',
    role: 'Digital Marketing Executive & IT Instructor',
    company: 'Indian Institute of Hardware Technology (IIHT) Nigeria',
    location: 'Nigeria',
    summary: 'Executed digital acquisition campaigns, managed Meta and Google Ads, taught web development and digital marketing, and developed training modules for corporate delivery.',
  },
]

const projects = [
  { name: 'Pinnacle Tech', type: 'Technology, AI Automation & Creative Studio', image: 'pinnacle-tech.jpg', url: 'https://pinnacle-tech-401.netlify.app/' },
  { name: 'Ladega Studio', type: 'Digital Agency', image: 'ladega-studio.jpg', url: 'https://ladegastudio.com/' },
  { name: 'Taharacision', type: 'Healthcare', image: 'taharacision.jpg', url: 'https://www.taharacision.co.uk/' },
  { name: 'Malleable Communication', type: 'Marketing & Communications', image: 'malleable-group.jpg', url: 'https://malleablegroup.com/' },
  { name: 'Wear Naija', type: 'Fashion E-commerce', image: 'wear-naija.jpg', url: 'https://wearnaija.com/' },
  { name: 'Givllo Hub', type: 'Gifting E-commerce', image: 'givllo-hub.jpg', url: 'https://givllohub.com/' },
  { name: 'Noblesse Tribe FM', type: 'Radio & Entertainment', image: 'noblesse-tribe-fm.jpg', url: 'https://noblessetribefm.com/' },
  { name: 'Noblesse Oblige NGO', type: 'Nonprofit', image: 'noblesse-oblige-ngo.jpg', url: 'https://noblesseobligengo.org/' },
  { name: 'Noblesse Tribe', type: 'Community Platform', image: 'noblesse-tribe.jpg', url: 'https://noblessetribe.com/' },
  { name: 'Softlanding Designs', type: 'Architecture & Construction', image: 'softlanding-designs.jpg', url: 'https://softlandingdesigns.com/' },
  { name: 'CampaignOS', type: 'Campaign Management Platform', image: 'campaignos.jpg', url: 'https://campaignos-v2.netlify.app/' },
]

const skillGroups = [
  {
    title: 'Growth & Revenue',
    skills: ['New Business Development', 'Client Acquisition Systems', 'Market Entry Strategy', 'Revenue Operations', 'Strategic Partnerships', 'Proposal & Deal Closure'],
  },
  {
    title: 'Technology & Delivery',
    skills: ['HTML / CSS / Tailwind', 'JavaScript / React / Vue / Node.js', 'PHP / MySQL / WordPress', 'UI/UX Project Oversight', 'Mobile App Delivery', 'Project Management'],
  },
  {
    title: 'AI, Marketing & Analytics',
    skills: ['AI Automation', 'AI-assisted Workflows', 'Meta & Google Ads', 'Google Analytics 4', 'Performance Marketing', 'Digital Strategy'],
  },
  {
    title: 'Institutional & Commercial',
    skills: ['Public Policy & Government Relations', 'Policy-aligned Programme Design', 'Regulatory Stakeholder Engagement', 'HubSpot / Pipedrive / Salesforce', 'Trello / Asana', 'Training & Facilitation'],
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = encodeURIComponent(`Project enquiry from ${data.get('name')}`)
    const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <a href="#home" className="brand" aria-label="Giwa Muqsit Olufowobi, home">
          <span className="brand-mark">MG</span>
          <span className="brand-copy">Muqsit Giwa<small>Founder · Pinnacle Tech Services</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <a className="header-cta" href={`mailto:${EMAIL}`}>Start a conversation <ArrowUpRight size={16} /></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label="Toggle navigation">
          {menuOpen ? <X /> : <Menu />}
        </button>
        {menuOpen && (
          <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
            {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowDownRight size={18} /></a>)}
          </nav>
        )}
      </header>

      <main id="main">
        <section className="hero" id="home">
          <div className="hero-grid page-width">
            <div className="hero-content">
              <div className="eyebrow"><span className="status-dot" /> Abuja, Nigeria · Available for select projects</div>
              <h1>Building digital<br />products. <span>Growing<br />ambitious brands.</span></h1>
              <p className="hero-intro">I’m <strong>Giwa Muqsit Olufowobi</strong>—a founder, business development professional, and hands-on developer turning strategy, technology, and AI automation into measurable progress.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#work">Explore selected work <ArrowRight size={18} /></a>
                <a className="button button-secondary" href="#contact">Let’s work together <ArrowRight size={17} /></a>
              </div>
              <div className="hero-proof">
                <div><strong>5+</strong><span>Years across growth<br />& digital delivery</span></div>
                <div><strong>14+</strong><span>Clients in Nigeria<br />& the United Kingdom</span></div>
                <div><strong>2</strong><span>Major app stores<br />shipped to</span></div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="photo-frame">
                <img src={`${import.meta.env.BASE_URL}muqsit-giwa.webp`} alt="Giwa Muqsit Olufowobi, Founder of Pinnacle Tech Services" />
                <div className="photo-caption"><span>Strategy</span><span>Technology</span><span>Growth</span></div>
              </div>
              <div className="founder-card">
                <Sparkles size={20} />
                <div><span>Founder</span><strong>Pinnacle Tech Services</strong></div>
              </div>
            </div>
          </div>
          <a href="#about" className="scroll-cue" aria-label="Scroll to about section"><span>Discover more</span><ArrowDownRight /></a>
        </section>

        <section className="marquee" aria-label="Core disciplines">
          <div>BUSINESS DEVELOPMENT <span>✦</span> WEB & SOFTWARE <span>✦</span> AI AUTOMATION <span>✦</span> PROJECT DELIVERY <span>✦</span> DIGITAL GROWTH</div>
        </section>

        <section className="section about" id="about">
          <div className="page-width">
            <div className="section-label"><span>01</span> About</div>
            <div className="about-grid">
              <h2>Commercial thinking.<br />Technical execution.<br /><em>One clear vision.</em></h2>
              <div className="about-copy">
                <p className="lead">I work at the intersection of business growth, technology, and programme delivery—helping organisations move from a promising idea to a solution people can use and a strategy that can scale.</p>
                <p>Over the past five years, I have led client acquisition, multi-stakeholder programmes, digital platforms, and product launches across agency, technology, e-commerce, consulting, healthcare, education, and public-sector environments in Nigeria and the UK.</p>
                <p>My background in Public Policy and Administration strengthens my ability to navigate institutions, design policy-aligned initiatives, and build consensus among commercial, technical, and regulatory stakeholders.</p>
                <div className="about-signature"><span>Giwa Muqsit Olufowobi</span><small>Founder · Pinnacle Tech Services</small></div>
              </div>
            </div>
            <div className="principles">
              <div><Check size={18} /><span><strong>Strategy before execution</strong>Clear goals, practical scope, measurable outcomes.</span></div>
              <div><Check size={18} /><span><strong>Technology with a purpose</strong>Digital solutions grounded in real user and business needs.</span></div>
              <div><Check size={18} /><span><strong>Ownership through delivery</strong>Consistent communication from kick-off to launch.</span></div>
            </div>
          </div>
        </section>

        <section className="section expertise" id="expertise">
          <div className="page-width">
            <div className="section-label light"><span>02</span> Expertise</div>
            <div className="section-heading light-heading">
              <h2>What I bring to<br />the table.</h2>
              <p>A multidisciplinary skill set for organisations that need both a clear growth strategy and the technical capability to deliver it.</p>
            </div>
            <div className="expertise-grid">
              {expertise.map(({ icon: Icon, ...item }) => (
                <article className="expertise-card" key={item.number}>
                  <div className="card-top"><span>{item.number}</span><Icon size={28} strokeWidth={1.5} /></div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <div className="tag-list">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section experience" id="experience">
          <div className="page-width">
            <div className="section-label"><span>03</span> Experience</div>
            <div className="section-heading">
              <h2>A track record of<br />moving work forward.</h2>
              <p>Experience across entrepreneurship, consulting, product delivery, institutional programmes, and digital transformation.</p>
            </div>
            <div className="timeline">
              {experience.map(item => (
                <article className="timeline-item" key={`${item.company}-${item.role}`}>
                  <div className="timeline-period">{item.period}</div>
                  <div className="timeline-main"><h3>{item.role}</h3><p>{item.summary}</p></div>
                  <div className="timeline-company"><strong>{item.company}</strong><span>{item.location}</span></div>
                </article>
              ))}
            </div>
            <div className="education-card">
              <div className="education-icon"><GraduationCap size={30} /></div>
              <div><span>Education</span><h3>B.Sc. Public Policy and Administration</h3><p>Miva Open University · Policy analysis, governance, and institutional stakeholder management</p></div>
            </div>
          </div>
        </section>

        <section className="section work" id="work">
          <div className="page-width">
            <div className="section-label light"><span>04</span> Selected work</div>
            <div className="section-heading light-heading">
              <h2>Digital experiences.<br />Real-world purpose.</h2>
              <p>A selection of websites, platforms, and digital products I have worked on across industries.</p>
            </div>
            <div className="projects-grid">
              {projects.map((project, index) => (
                <a className="project-card website-link" href={project.url} target="_blank" rel="noopener noreferrer" key={project.name} aria-label={`Visit ${project.name} (opens in a new tab)`}>
                  <div className="project-image"><img src={`${import.meta.env.BASE_URL}projects/${project.image}`} alt={`${project.name} website preview`} loading={index < 2 ? 'eager' : 'lazy'} /><span className="project-arrow"><ArrowUpRight /></span></div>
                  <div className="project-meta"><div><h3>{project.name}</h3><p>{project.type}</p></div><span>{String(index + 1).padStart(2, '0')}</span></div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section skills" id="skills">
          <div className="page-width">
            <div className="section-label"><span>05</span> Skills & tools</div>
            <div className="section-heading">
              <h2>Broad capability.<br />Practical application.</h2>
              <p>The commercial, technical, and operational toolkit I use to take initiatives from idea to impact.</p>
            </div>
            <div className="skills-grid">
              {skillGroups.map((group, index) => (
                <article className="skill-group" key={group.title}>
                  <div className="skill-group-title"><span>0{index + 1}</span><h3>{group.title}</h3></div>
                  <ul>{group.skills.map(skill => <li key={skill}><ArrowRight size={14} />{skill}</li>)}</ul>
                </article>
              ))}
            </div>
            <div className="tools-line"><span>AI toolkit</span><p>Claude · Kimi K2 · Perplexity · Cursor · Ocoya</p></div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="page-width contact-grid">
            <div className="contact-intro">
              <div className="section-label light"><span>06</span> Contact</div>
              <h2>Have a project<br />in mind? <em>Let’s talk.</em></h2>
              <p>Whether you need a digital product, a stronger growth system, AI-powered workflows, or a reliable project partner, I’d be glad to hear what you’re building.</p>
              <div className="contact-details">
                <a href={`mailto:${EMAIL}`}><Mail size={19} /><span><small>Work email</small>{EMAIL}</span></a>
                <a href="tel:+2348056019074"><Phone size={19} /><span><small>Mobile</small>0805 601 9074</span></a>
                <div><MapPin size={19} /><span><small>Location</small>Abuja, Nigeria · GMT+1</span></div>
              </div>
              <div className="social-links">
                <a href="https://www.linkedin.com/in/muqsit-giwa-40521b244" target="_blank" rel="noopener noreferrer"><Linkedin size={18} /> LinkedIn <ArrowUpRight size={15} /></a>
                <a href="https://github.com/Giwa-Muqsit" target="_blank" rel="noopener noreferrer"><Github size={18} /> GitHub <ArrowUpRight size={15} /></a>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-heading"><Rocket size={23} /><span>Tell me about your project</span></div>
              <label htmlFor="name">Your name</label>
              <input id="name" name="name" type="text" placeholder="How should I address you?" autoComplete="name" minLength={2} required />
              <label htmlFor="email">Your email</label>
              <input id="email" name="email" type="email" placeholder="you@company.com" autoComplete="email" required />
              <label htmlFor="message">What would you like to achieve?</label>
              <textarea id="message" name="message" placeholder="A little context about your goals, timeline, and the support you need..." rows={5} minLength={10} required />
              <button className="button button-primary" type="submit">Compose your message <ArrowUpRight size={18} /></button>
              <p className="form-note">This opens your email app with your message ready to send.</p>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="page-width footer-inner">
          <a href="#home" className="brand footer-brand"><span className="brand-mark">MG</span><span className="brand-copy">Muqsit Giwa<small>Build well. Grow deliberately.</small></span></a>
          <p>2026 © Pinnacle Tech Services<br /><span>All rights reserved.</span></p>
          <a href="#home" className="back-to-top">Back to top <ArrowUpRight size={17} /></a>
        </div>
      </footer>
    </div>
  )
}

export default App
