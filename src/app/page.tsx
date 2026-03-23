"use client";

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { MapPin, Calendar, ArrowRight, Phone, Mail, MapPinned, Users, Fuel, Settings2, Star, ArrowDown, ShieldCheck } from 'lucide-react';
import styles from './page.module.css';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

// Custom split text utility for React (replaces SplitText plugin)
const SplitTextChars = ({ text }: { text: string }) => {
  return (
    <>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="char"
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </span>
      ))}
    </>
  );
};

const SplitTextWords = ({ text }: { text: string }) => {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <span
          key={i}
          className="word-wrapper"
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', marginRight: '0.3em' }}
        >
          <span className="word" style={{ display: 'inline-block' }}>
            {word}
          </span>
        </span>
      ))}
    </>
  );
};

const Logo = () => (
  <div className={styles.logoWrapper}>
    <svg className="gsap-logo" width="45" height="35" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        className="logoPath1"
        d="M 5 45 Q 50 -10 95 45"
        stroke="#dc2626" strokeWidth="6" strokeLinecap="round" fill="none"
        strokeDasharray="200" strokeDashoffset="200"
      />
      <path
        className="logoPath2"
        d="M 15 52 Q 50 5 85 52"
        stroke="#b45309" strokeWidth="6" strokeLinecap="round" fill="none"
        strokeDasharray="200" strokeDashoffset="200"
      />
    </svg>
    <div className={styles.logoText}>BOULAAYOUNE<span>CAR</span></div>
  </div>
);

const FLEET = [
  { name: 'Renault Clio 5', cat: 'Citadine Premium', price: '250', img: '/clio 5 2024.jpg', seats: '5', fuel: 'Diesel', trans: 'Manuelle' },
  { name: 'Hyundai Accent', cat: 'Berline Élégante', price: '350', img: '/accent 2024.png', seats: '5', fuel: 'Diesel', trans: 'Auto' },
  { name: 'Changan Alsvin', cat: 'Design Moderne', price: '200', img: '/alsvin.png', seats: '5', fuel: 'Essence', trans: 'Auto' },
  { name: 'Dacia Sandero', cat: 'Compacte Polyvalente', price: '200', img: '/dacia sandero.png', seats: '5', fuel: 'Diesel', trans: 'Manuelle' },
  { name: 'Dacia Logan', cat: 'Spacieuse Familiale', price: '200', img: '/dacia logan.jpg', seats: '5', fuel: 'Diesel', trans: 'Manuelle' },
  { name: 'Renault Clio 4', cat: 'Citadine Classique', price: '200', img: '/clio 4.png', seats: '5', fuel: 'Diesel', trans: 'Manuelle' }
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Top-tier seamless Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, []);

  useGSAP(() => {
    /* -------------------------------------------------------------------------- */
    /* 1. EPIC INITIAL LOAD SEQUENCE                                              */
    /* -------------------------------------------------------------------------- */
    const tl = gsap.timeline();

    // Reset initial states for absolute WOW sequence
    gsap.set('.word', { yPercent: 120, rotationZ: 10, opacity: 0 });
    // Animate the hero wrapper for masks to avoid CSS transform conflicts
    gsap.set('.heroImageSide', { clipPath: "polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%)", filter: "grayscale(100%) blur(10px)", opacity: 0 });
    // Animate the actual image for an initial scale-down effect
    gsap.set('.heroImageReal', { scale: 1.3 });

    gsap.set('.featureItem', { x: -50, opacity: 0 });
    gsap.set('.exploreBtn', { opacity: 0, scale: 0.8, y: 30 });

    // Logo drawing (Infinite loop)
    gsap.to('.logoPath1', {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
      repeatDelay: 0.5
    });

    gsap.to('.logoPath2', {
      strokeDashoffset: 0,
      duration: 2.2,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
      repeatDelay: 0.5,
      delay: 0.2
    });

    // Dynamic typography masked reveal
    tl.to('.word', {
      yPercent: 0,
      rotationZ: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.08,
      ease: "power4.out"
    }, 0.3);

    // Wrapper dramatically snaps into vibrant color and unmasks
    tl.to('.heroImageSide', {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      filter: "grayscale(0%) blur(0px)",
      opacity: 1,
      duration: 2,
      ease: "expo.out"
    }, 0.5);

    // Deep zoom out effect on the image itself
    tl.to('.heroImageReal', {
      scale: 1,
      duration: 2.2,
      ease: "expo.out"
    }, 0.5);

    // Details slide in
    tl.to('.featureItem', { x: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" }, 1)
      .to('.exploreBtn', { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(2)" }, 1.3);

    /* -------------------------------------------------------------------------- */
    /* -------------------------------------------------------------------------- */
    /* 2. ELEGANT PARALLAX SCROLL (Smooth & Lightweight)                          */
    /* -------------------------------------------------------------------------- */
    // Replaced heavy pinning and massive scaling with a buttery-smooth parallax effect

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".heroSplit",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Parallax the image downwards inside its container as the page scrolls up
    scrollTl.to('.heroImageReal', {
      yPercent: 20,
      scale: 1.05,
      ease: "none"
    }, 0);

    // Gently fade up the text block
    scrollTl.to('.heroTextSide', {
      y: -100,
      opacity: 1,
      ease: "none"
    }, 0);

    /* -------------------------------------------------------------------------- */
    /* 3. 3D GRID STAGGER REVEAL (THE FLEET)                                      */
    /* -------------------------------------------------------------------------- */
    // Instead of a simple fade, cards flip onto the screen with 3D rotation and scale

    gsap.from('.gsap-section-header', {
      y: 150,
      scale: 0.9,
      opacity: 0,
      duration: 1.5,
      ease: "expo.out",
      scrollTrigger: {
        trigger: ".gsap-section-header",
        start: "top 90%",
      }
    });

    gsap.utils.toArray('.gsap-car-card').forEach((card: any, i) => {
      gsap.fromTo(card,
        {
          y: 200,
          rotationX: 45,
          rotationY: 15,
          scale: 0.8,
          opacity: 0,
          transformPerspective: 1000
        },
        {
          y: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          opacity: 1,
          duration: 1.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: card,
            start: "top 95%",
            end: "bottom center",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Sub-elements inside cards have miniature staggered entries
    gsap.utils.toArray('.gsap-car-card').forEach((card: any) => {
      const details = card.querySelectorAll('.carSpecsReveal .specItem');
      gsap.from(details, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%"
        }
      });
    });

    /* -------------------------------------------------------------------------- */
    /* 4. PROMO SECTION ENTRANCE                                                  */
    /* -------------------------------------------------------------------------- */
    gsap.from('.promo-header', {
      y: 80,
      opacity: 0,
      duration: 1.4,
      ease: "expo.out",
      scrollTrigger: {
        trigger: '.promo-section',
        start: "top 80%",
      }
    });

    gsap.from('.promoCard', {
      y: 60,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "expo.out",
      scrollTrigger: {
        trigger: '.promoGrid',
        start: "top 85%",
      }
    });

  }, { scope: containerRef });

  return (
    <main ref={containerRef} className={styles.main} style={{ overflowX: 'hidden' }}>
      <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
        <div className={styles.navWrapper}>
          <Logo />
          <nav className={styles.navLinks}>
            <a href="#accueil">Accueil</a>
            <a href="#flotte">Modèles</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className={styles.navRight}>
            <a
              href={`https://wa.me/212671720593?text=${encodeURIComponent(`Bonjour ! Je vous contacte depuis votre site web et je souhaite avoir plus de renseignements.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navPhoneBtn}
            >
              <Phone size={14} /> +212 671 72 05 93
            </a>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section id="accueil" className={`${styles.heroSplit} heroSplit`}>
        <div className={`${styles.heroTextSide} heroTextSide`}>
          <div className={`${styles.heroContent} heroContent`}>

            {/* The WOW Typography Reveal */}
            <h1 className={`${styles.heroTitle} heroTitle`} style={{ overflow: 'hidden' }}>
              <SplitTextWords text="L'Élégance" /> <br />
              <i style={{ color: 'var(--gold)', overflow: 'hidden', display: 'inline-block' }}>
                <SplitTextWords text="en" />
              </i> <br />
              <SplitTextWords text="Mouvement" />
            </h1>

            <p className={`${styles.heroDesc} heroDesc`} style={{ overflow: 'hidden' }}>
              <SplitTextWords text="Votre agence de confiance pour la location de véhicules premium et fiables à Agadir. Explorez notre collection et voyagez dans le confort absolu." />
            </p>

            <div className={`${styles.heroFeatures} heroFeatures`}>
              <div className={`${styles.featureItem} featureItem`}>
                <div className={styles.featureIconBox}><MapPin size={16} color="#b45309" /></div>
                Livraison à l'Aéroport Al Massira
              </div>
              <div className={`${styles.featureItem} featureItem`}>
                <div className={styles.featureIconBox}><Phone size={16} color="#b45309" /></div>
                Assistance Téléphonique 24/7
              </div>
              <div className={`${styles.featureItem} featureItem`}>
                <div className={styles.featureIconBox}><ShieldCheck size={16} color="#b45309" /></div>
                Véhicules Entretenus & Assurés
              </div>
            </div>

            <a href="#flotte" className={`${styles.exploreBtn} exploreBtn`}>
              Découvrir la Flotte
              <ArrowDown size={18} />
            </a>
          </div>
        </div>

        <div className={`${styles.heroImageSide} heroImageSide`} style={{ transformOrigin: 'center center' }}>
          <img
            src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=2000&q=80"
            alt="Premium Light Car"
            className={`${styles.heroImage} heroImageReal`}
          />
        </div>
      </section>

      {/* Fleet section */}
      <section id="flotte" className={styles.section} style={{ position: 'relative', zIndex: 10, background: 'var(--bg-main)' }}>
        <div className="container">
          <div className={`${styles.sectionHeader} gsap-section-header`}>
            <h2>Nos Véhicules</h2>
            <p>Une sélection transparente et sans surprise. Choisissez la catégorie qui correspond parfaitement à votre séjour.</p>
          </div>

          <div className={styles.grid}>
            {FLEET.map((car, i) => (
              <div key={i} className={`${styles.carCard} gsap-car-card`}>
                <div className={styles.carImageWrapper}>
                  <span className={styles.carTopBadge}>{car.cat}</span>
                  <img src={car.img} alt={car.name} className={styles.carImageReal} />
                </div>

                <div className={styles.carDetailsBox}>
                  <div className={styles.carHeaderRow}>
                    <h3>{car.name}</h3>
                    <div className={styles.carPrice}>
                      <span className={styles.amount}>{car.price} <small>DH</small></span>
                      <span className={styles.period}>/ jour</span>
                    </div>
                  </div>

                  <div className={`${styles.carSpecsReveal} carSpecsReveal`}>
                    <div className={`${styles.specItem} specItem`}><Users size={16} color="#9ca3af" /> {car.seats} Places</div>
                    <div className={`${styles.specItem} specItem`}><Fuel size={16} color="#9ca3af" /> {car.fuel}</div>
                    <div className={`${styles.specItem} specItem`}><Settings2 size={16} color="#9ca3af" /> {car.trans}</div>
                  </div>

                  <a
                    href={`https://wa.me/212671720593?text=${encodeURIComponent(`Bonjour ! Je voudrais plus d'informations concernant la location de la ${car.name} à ${car.price} DH/jour.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.bookNowBtn}
                  >
                    Plus d'Informations <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROMOTIONS GRID (SaaS Style) ───────────────────────── */}
      <section className={`${styles.promoSection} promo-section`}>
        <div className={styles.promoInner}>
          <div className={`${styles.promoHeader} promo-header`}>
            <span className={styles.promoEyebrow}>Offres Exclusives</span>
            <h2 className={styles.promoTitle}>Promotions du <em>Moment</em></h2>
            <p className={styles.promoSub}>Découvrez des tarifs préférentiels clairs, sans frais cachés, pensés pour répondre à chacun de vos besoins.</p>
          </div>

          <div className={`${styles.promoGrid} promoGrid`}>

            {/* Card 1 */}
            <div className={`${styles.promoCard} promoCard`}>
              <div className={styles.promoCardHeader}>
                <h3>Semaine Découverte</h3>
                <span className={styles.promoCarName}>Pour Renault Clio 5</span>
                <div className={styles.promoDiscount}>
                  <span className={styles.oldPrice}>350 DH</span>
                  <span className={styles.newPrice}>230 DH<small>/jour</small></span>
                </div>
              </div>
              <div className={styles.promoCardBody}>
                <p className={styles.promoDesc}>Idéal pour un court séjour en ville. Roulez dans une voiture neuve à prix réduit.</p>
                <div className={styles.promoFeatList}>
                  <span><ShieldCheck size={16} className={styles.featIcon} /> Kilométrage illimité</span>
                  <span><ShieldCheck size={16} className={styles.featIcon} /> Assurance incluse</span>
                  <span><ShieldCheck size={16} className={styles.featIcon} /> Annulation gratuite</span>
                </div>
                <a
                  href={`https://wa.me/212671720593?text=${encodeURIComponent('Bonjour ! Je suis intéressé par la promotion Semaine Découverte sur la Renault Clio 5.')}`}
                  target="_blank" rel="noopener noreferrer"
                  className={styles.promoBtn}
                >
                  Réserver <ArrowRight size={16} />
                </a>
              </div>
            </div>

            {/* Card 2 (Featured) */}
            <div className={`${styles.promoCard} ${styles.promoCardFeatured} promoCard`}>
              <div className={styles.promoFeaturedBadge}>Most Popular</div>
              <div className={styles.promoCardHeader}>
                <h3>Pack Weekend Luxe</h3>
                <span className={styles.promoCarName}>Pour Hyundai Accent</span>
                <div className={styles.promoDiscount}>
                  <span className={styles.oldPrice}>450 DH</span>
                  <span className={styles.newPrice}>340 DH<small>/jour</small></span>
                </div>
              </div>
              <div className={styles.promoCardBody}>
                <p className={styles.promoDesc}>Profitez du confort exceptionnel d'une berline élégante pour votre weekend.</p>
                <div className={styles.promoFeatList}>
                  <span><ShieldCheck size={16} className={styles.featIcon} /> Kilométrage illimité</span>
                  <span><ShieldCheck size={16} className={styles.featIcon} /> Plein carburant offert</span>
                  <span><ShieldCheck size={16} className={styles.featIcon} /> Support client 24/7</span>
                </div>
                <a
                  href={`https://wa.me/212671720593?text=${encodeURIComponent('Bonjour ! Je suis intéressé par le Pack Weekend Luxe sur la Hyundai Accent.')}`}
                  target="_blank" rel="noopener noreferrer"
                  className={`${styles.promoBtn} ${styles.promoBtnFeatured}`}
                >
                  Sélectionner <ArrowRight size={16} />
                </a>
              </div>
            </div>

            {/* Card 3 */}
            <div className={`${styles.promoCard} promoCard`}>
              <div className={styles.promoCardHeader}>
                <h3>Tarif Mensuel</h3>
                <span className={styles.promoCarName}>Pour Dacia Sandero</span>
                <div className={styles.promoDiscount}>
                  <span className={styles.oldPrice}>250 DH</span>
                  <span className={styles.newPrice}>170 DH<small>/jour</small></span>
                </div>
              </div>
              <div className={styles.promoCardBody}>
                <p className={styles.promoDesc}>Le tarif le plus bas pour une flexibilité maximale sur 30 jours et plus.</p>
                <div className={styles.promoFeatList}>
                  <span><ShieldCheck size={16} className={styles.featIcon} /> Jusqu'à -28%</span>
                  <span><ShieldCheck size={16} className={styles.featIcon} /> Entretien inclus</span>
                  <span><ShieldCheck size={16} className={styles.featIcon} /> Remplacement garanti</span>
                </div>
                <a
                  href={`https://wa.me/212671720593?text=${encodeURIComponent('Bonjour ! Je suis intéressé par le Tarif Mensuel sur la Dacia Sandero.')}`}
                  target="_blank" rel="noopener noreferrer"
                  className={styles.promoBtn}
                >
                  Réserver <ArrowRight size={16} />
                </a>
              </div>
            </div>



          </div>
        </div>
      </section>

      <footer id="contact" className={styles.footer}>
        <div className="container">
          <div className={styles.footerGrid}>
            <div>
              <Logo />
              <p className={styles.footerDesc}>L'agence de location de voitures de référence à Agadir. Nous vous garantissons un service client irréprochable et des prix défiant toute concurrence.</p>
            </div>
            <div className={styles.footerLinks}>
              <h4>Contactez-nous</h4>
              <p><MapPinned size={18} color="#b45309" /> 110 Av. Khouribga, Agadir</p>
              <p><Phone size={18} color="#b45309" /> +212 671 72 05 93</p>
              <p><Phone size={18} color="#b45309" /> +212 649 84 02 00</p>
              <p><Mail size={18} color="#b45309" /> contact@boulaayoune.com</p>
            </div>
            <div className={styles.footerLinks}>
              <h4>Navigation</h4>
              <p>Notre Flotte</p>
              <p>Conditions Générales</p>
              <p>Foire Aux Questions</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
