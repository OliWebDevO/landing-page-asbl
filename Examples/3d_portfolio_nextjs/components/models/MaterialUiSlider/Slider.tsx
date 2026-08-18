'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './effect-material.css';
import './index.css';
import Link from 'next/link';
import type { SwiperOptions } from 'swiper/types';
import '@/app/globals.css';
import TitleHeader from '@/components/TitleHeader';
import { useTranslation } from '@/hooks/useTranslation';

const images = [
  { src: '/images/fanal_des_chats/fanal_home.webp', mobileSrc: '/images/slider-mobile/fanal.webp', label: 'Le Fanal des Chats', slug: 'fanal' },
  { src: '/images/lenoyer1.webp', mobileSrc: '/images/slider-mobile/lenoyer.webp', label: 'Le Noyer', slug: 'lenoyer' },
  { src: '/images/annick1.webp', mobileSrc: '/images/slider-mobile/annick.webp', label: 'Annick', slug: 'annick' },
  { src: '/images/lesarts/lesarts_cover.webp', mobileSrc: '/images/slider-mobile/lesarts.webp', label: 'LESARTS', slug: 'lesarts' },
  { src: '/images/asbl_ovni/ovni_dashboard.webp', mobileSrc: '/images/slider-mobile/ovni-compta.webp', label: 'OVNI Compta', slug: 'ovni-compta' },
  { src: '/images/portfolioCover1.webp', mobileSrc: '/images/slider-mobile/portfolio.webp', label: 'Portfolio', slug: 'portfolio' },
  { src: '/images/ag2.webp', mobileSrc: null, label: 'ArtGallery', slug: 'artgallery' },
];

export default function Slider() {
  const { t } = useTranslation();
  const swiperRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );
  const slidesPerView = isMobile ? 1 : 2;

  // Responsive on resize — only react to width changes
  // to avoid re-init when mobile browser chrome shows/hides (which only changes height)
  useEffect(() => {
    let lastWidth = window.innerWidth;
    function handleResize() {
      const newWidth = window.innerWidth;
      if (newWidth === lastWidth) return;
      lastWidth = newWidth;
      setIsMobile(newWidth < 768);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let swiperInstance: Swiper | undefined;
    let destroyed = false;

    import('./effect-material.esm.js').then((mod) => {
      if (destroyed) return;
      const EffectMaterial = mod.default || mod;
      if (swiperRef.current) {
        swiperInstance = new Swiper(swiperRef.current, {
          modules: [EffectMaterial, Navigation],
          effect: 'material',
          materialEffect: {
            slideSplitRatio: 0.65,
          },
          grabCursor: true,
          slidesPerView,
          centeredSlides: false,
          spaceBetween: 16,
          speed: 600,
          passiveListeners: true,
          touchMoveStopPropagation: false,
          navigation: {
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          },
        } as unknown as SwiperOptions);
      }
    });

    return () => {
      destroyed = true;
      if (swiperInstance) swiperInstance.destroy();
    };
  }, [slidesPerView]);

    return (
    <section id="work" className='relative'>
        <div className="hidden md:block">
          <TitleHeader
            title={t.slider.title}
            sub={t.slider.subtitle}
            cn=' pt-20 pb-14'
          />
        </div>
      <div className="demo-slider">
        {/* Custom Navigation Arrows - positioned relative to slider */}
        <div className="swiper-button-prev-custom">
          <div className="arrow-nav-wrapper">
            <Image
              src="/images/arrow-right.svg"
              alt="Previous"
              width={24}
              height={24}
              className="arrow-nav-icon rotate-180"
            />
          </div>
        </div>

        <div className="swiper-button-next-custom">
          <div className="arrow-nav-wrapper">
            <Image
              src="/images/arrow-right.svg"
              alt="Next"
              width={24}
              height={24}
              className="arrow-nav-icon"
            />
          </div>
        </div>

        <div className="swiper" ref={swiperRef}>
          <div className="swiper-wrapper">
            {(isMobile ? images.filter(img => img.mobileSrc) : images).map((img, idx) => (
              <div className="swiper-slide" key={idx}>
                <div className="swiper-material-wrapper">
                  <div className="swiper-material-content">
                    <img
                      className="demo-material-image"
                      data-swiper-material-scale="1.25"
                      src={isMobile && img.mobileSrc ? img.mobileSrc : img.src}
                      alt={img.label}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                    <Link
                      href={`/projects/${img.slug}`}
                      className="demo-material-label swiper-material-animate-opacity"
                    >
                      {img.label}
                    </Link>
                  </div>
                  {img.slug === 'lesarts' && (
                    <div className="dev-ribbon" aria-hidden="true">
                      <span className="dev-ribbon__label">{t.badges.inDevelopment}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}