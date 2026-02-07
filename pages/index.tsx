import React from 'react';
import Hero from '../components/Hero';
import { Speakers } from '../components/Speakers';
import { Activities } from '../components/Activities';
import { Community } from '../components/Community';
import { Testimonials } from '../components/Testimonials';
import { FAQ } from '../components/FAQ';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <Speakers />
      <Activities />
      <Community />
      <Testimonials />
      <FAQ />
      
    </>
  );
}