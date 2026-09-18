import { HeroBanner } from "@/components/homepage/hero-banner";
import {
  BestSellers,
  BrandIntro,
  BrandPhilosophy,
  CuratedCollections,
  EditorialStory,
  EverydayAway,
  FeaturedCollection,
  HomeEntertaining,
  NewArrivals,
  Newsletter,
  PromoStrip,
  SecondaryCampaign,
  TheVVEdit,
} from "@/components/homepage/storefront";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <BrandIntro />
      <CuratedCollections />
      <FeaturedCollection />
      <EditorialStory />
      <NewArrivals />
      <TheVVEdit />
      <HomeEntertaining />
      <EverydayAway />
      <BestSellers />
      <SecondaryCampaign />
      <PromoStrip />
      <BrandPhilosophy />
      <Newsletter />
    </>
  );
}
