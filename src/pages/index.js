import { Inter } from 'next/font/google';
import Hero from '@/components/home/Hero';
import GenerationStep from '@/components/home/GenerationStep';
import PageMetaTags from '@/containers/PageMetaTags';

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


    </>
  );
}
