import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/HeroSection';
import SpecialOffer from '@/components/SpecialOffer';
import CodingPackages from '@/components/CodingPackages';
import ChipTuning from '@/components/ChipTuning';
import ServicesGrid from '@/components/ServicesGrid';
import ExpertTips from '@/components/ExpertTips';
import Reviews from '@/components/Reviews';
import QuickActions from '@/components/QuickActions';
import ApiIntegration from '@/components/ApiIntegration';

export default function Index() {
  return (
    <MainLayout>
      <HeroSection />
      <div id="offers">
        <SpecialOffer />
      </div>
      <div id="services">
        <ServicesGrid />
      </div>
      <div id="packages">
        <CodingPackages />
      </div>
      <div id="chiptuning">
        <ChipTuning />
      </div>
      <div id="tips">
        <ExpertTips />
      </div>
      <div id="reviews">
        <Reviews />
      </div>
      <div id="api">
        <ApiIntegration />
      </div>
      <div id="contact">
        <QuickActions />
      </div>
    </MainLayout>
  );
}