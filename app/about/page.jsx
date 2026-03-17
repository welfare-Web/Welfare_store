"use client";

import { FaPlay } from "react-icons/fa";
import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import style from "./about.module.css";

function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3
  });
  
  const [showVideo, setShowVideo] = useState(false);

  /* Disable scrolling when video opens */
  useEffect(() => {
    if (showVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showVideo]);

  return (
    <div className={style.aboutPageWrapper}>
      
      {/* --- HEADER & BREADCRUMBS --- */}
      <div className={style.ab}>
        <div> 
          <div className={style.ab1}>
            <h1>About Us</h1>
          </div>
          <div className={style.breadcrumbs}>
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <button style={{ color: '#000000' }}>About Us</button>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT & TEXT --- */}
      <div className={style.con}>
        <Image
          src="/about/about-us.jpg"
          alt="Luxury Fashion Store"
          width={1200}
          height={675}
          className={style.img}
          priority
        />
        
        <div className={style.txt}>
          <p className={style.txt1}>
            Our fashion store brings you the latest trends with a perfect mix of style, 
            comfort, and quality. We offer a wide range of clothing designed for every occasion, 
            from casual everyday wear to elegant outfits for special moments. Our collections 
            are carefully selected to reflect modern fashion while keeping timeless style in mind. 
            We believe fashion is a way to express your personality and confidence. That's why 
            our store focuses on delivering high-quality designs that make you feel comfortable 
            and stylish at the same time. With new arrivals and trending collections added 
            regularly, you will always find something fresh and exciting to wear.
          </p>
        </div>

        {/* --- STATS COUNTER --- */}
        <div ref={ref} className={style.container}>
          <div className={style.box}>
            <h1>{inView && <CountUp start={0} end={800} duration={2.5} />}+</h1>
            <p>Product Type</p>
          </div>

          <div className={style.box}>
            <h1>{inView && <CountUp start={0} end={12} duration={2} />}+</h1>
            <p>Years of Experience</p>
          </div>

          <div className={style.box}>
            <h1>{inView && <CountUp start={0} end={2500} duration={2.5} />}+</h1>
            <p>Trust Customer</p>
          </div>

          <div className={style.box}>
            <h1>{inView && <CountUp start={0} end={15} duration={2} />}+</h1>
            <p>Store Nationwide</p>
          </div>
        </div>
      </div>

      {/* --- VIDEO SECTION --- */}
      <section className={style.videoSection}>
        <Image
          src="/about/fashion2.jpg"
          alt="fashion promo"
          fill
          className={style.bgImage}
        />
        
        <div className={style.overlay}></div>

        <div className={style.play_wrapper} onClick={() => setShowVideo(true)}>
          <span className={`${style.pulse} ${style.pulse1}`}></span>
          <span className={`${style.pulse} ${style.pulse2}`}></span>
          <span className={`${style.pulse} ${style.pulse3}`}></span>
          <div className={style.play_btn}>
            <FaPlay style={{ marginLeft: '5px' }} />
          </div>
        </div>

        {/* Video Modal */}
        {showVideo && (
          <div className={style.video_modal} onClick={() => setShowVideo(false)}>
            <div className={style.video_box} onClick={(e) => e.stopPropagation()}>
              <span className={style.close} onClick={() => setShowVideo(false)}>
                ✕
              </span>
              <video
                src="/fashion3.mp4"
                controls
                autoPlay
                playsInline
                className={style.videoElement}
              />
            </div>
          </div>
        )}
      </section>

      {/* --- TEAM SECTION --- */}
      <div className={style.teamSection}>
        <h2 className={style.heading}>Meet Our Team</h2>

        <div className={style.container}>
          <div className={style.card}>
            <div className={style.imgWrapper}>
              <img src="/about/Team_1.jpg" alt="Michal Kors - Artist" />
            </div>
            <h3>Michal Kors</h3>
            <p>Artist</p>
          </div>

          <div className={style.card}>
            <div className={style.imgWrapper}>
              <img src="/about/Team_2.jpg" alt="Mary Jane - Designer" />
            </div>
            <h3>Mary Jane</h3>
            <p>Designer</p>
          </div>

          <div className={style.card}>
            <div className={style.imgWrapper}>
              <img src="/about/Team_3.jpg" alt="John Lemeo - Art Director" />
            </div>
            <h3>John Lemeo</h3>
            <p>Art Director</p>
          </div>

          <div className={style.card}>
            <div className={style.imgWrapper}>
              <img src="/about/Team2.jpg" alt="Jennifer Lawrence - Fashion Designer" />
            </div>
            <h3>Jennifer Lawrence</h3>
            <p>Fashion Designer</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default About;