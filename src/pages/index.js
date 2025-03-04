import Image from 'next/image';
import { Inter } from '@next/font/google';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Testimonials from '@/components/home/Testimonials';
import GenerationStep from '@/components/home/GenerationStep';
import FeatureSection from '@/components/home/FeatureSection';
import PageMetaTags from '@/containers/PageMetaTags';
import CTA2 from '@/components/home/CTA2';
import PastEvents from '@/components/account/PastEvents';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      {/* Updated Meta Tags for HackSphere */}
      <PageMetaTags title="HackSphere | Home" description="Join the ultimate hackathon experience. Innovate, collaborate, and compete!" url=""/>
      
      {/* Schema for HackSphere */}
      <div itemScope itemType="https://schema.org/WebSite">
        <meta itemProp="url" content="https://www.hacksphere.com/" />
        <meta itemProp="name" content="HackSphere" />
      </div>

      {/* Hero Section */}
      <Hero />

      {/* Hackathon Process Steps */}
      <GenerationStep />

      {/* Key Features of HackSphere */}
      <FeatureSection showHeading={true} title="Why Join HackSphere?" />
      <FeatureSection title="Innovative Challenges" leftText="1" />
      <FeatureSection title="Mentorship & Networking" />

      {/* Past Hackathon Events */}
      <PastEvents />

      {/* Testimonials from Participants */}
      <Testimonials />

      {/* Registration Details (Replaced Pricing) */}
      <FeatureSection title="Register Now for HackSphere 2025!" />

      {/* Call to Action */}
      <CTA2 />
    </>
  );
}
