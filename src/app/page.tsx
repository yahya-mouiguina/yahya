"use client";

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Calendar, ArrowRight, Phone, Mail, MapPinned, Users, Fuel, Settings2, Star, ArrowDown, ShieldCheck } from 'lucide-react';
import styles from './page.module.css';

const Logo = () => (
  <div className={styles.logoWrapper}>
    <svg width="45" height="35" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path 
        d="M 5 45 Q 50 -10 95 45" 
        stroke="#dc2626" strokeWidth="6" strokeLinecap="round" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: [0, 1, 1, 1], opacity: [0, 1, 0.8, 1] }}
        transition={{ duration: 3, times: [0, 0.4, 0.7, 1], repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      <motion.path 
        d="M 15 52 Q 50 5 85 52" 
        stroke="#b45309" strokeWidth="6" strokeLinecap="round" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: [0, 1, 1, 1], opacity: [0, 1, 0.7, 1] }}
        transition={{ duration: 3.5, times: [0, 0.4, 0.7, 1], repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.2 }}
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
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 1000], [0, 200]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const slideUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <main className={styles.main}>
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

      <section id="accueil" className={styles.heroSplit}>
        <div className={styles.heroTextSide}>
          <motion.div 
            className={styles.heroContent}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 variants={slideUp} className={styles.heroTitle}>
              L'Élégance <i>en</i> <br/>Mouvement
            </motion.h1>
            <motion.p variants={slideUp} className={styles.heroDesc}>
              Votre agence de confiance pour la location de véhicules premium et fiables à Agadir. Explorez notre collection et voyagez dans le confort absolu.
            </motion.p>
            
            <motion.div variants={slideUp} className={styles.heroFeatures}>
              <div className={styles.featureItem}>
                <div className={styles.featureIconBox}><MapPin size={16} color="#b45309" /></div>
                Livraison à l'Aéroport Al Massira
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureIconBox}><Phone size={16} color="#b45309" /></div>
                Assistance Téléphonique 24/7
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureIconBox}><ShieldCheck size={16} color="#b45309" /></div>
                Véhicules Entretenus & Assurés
              </div>
            </motion.div>

            <motion.a variants={slideUp} href="#flotte" className={styles.exploreBtn}>
              Découvrir la Flotte
              <ArrowDown size={18} />
            </motion.a>
          </motion.div>
        </div>

        <div className={styles.heroImageSide}>
          <motion.img 
            style={{ y: yImage }}
            src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=2000&q=80" 
            alt="Premium Light Car" 
            className={styles.heroImage}
          />
        </div>
      </section>

      <section id="flotte" className={styles.section}>
        <div className="container">
          <motion.div 
            className={styles.sectionHeader}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideUp}
          >
            <h2>Nos Véhicules</h2>
            <p>Une sélection transparente et sans surprise. Choisissez la catégorie qui correspond parfaitement à votre séjour.</p>
          </motion.div>

          <div className={styles.grid}>
            {FLEET.map((car, i) => (
              <motion.div 
                key={i} 
                className={styles.carCard}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              >
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
                  
                  <div className={styles.carSpecsReveal}>
                    <div className={styles.specItem}><Users size={16} color="#9ca3af"/> {car.seats} Places</div>
                    <div className={styles.specItem}><Fuel size={16} color="#9ca3af"/> {car.fuel}</div>
                    <div className={styles.specItem}><Settings2 size={16} color="#9ca3af"/> {car.trans}</div>
                  </div>
                  
                  <a 
                    href={`https://wa.me/212671720593?text=${encodeURIComponent(`Bonjour ! Je voudrais plus d'informations concernant la location de la ${car.name} à ${car.price} DH/jour.`)}`}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.bookNowBtn}
                  >
                    Plus d'Informations <ArrowRight size={18}/>
                  </a>
                </div>
              </motion.div>
            ))}
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
