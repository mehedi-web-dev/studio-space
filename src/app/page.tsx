
import BrowseCategories from "./component/home/BrowseCategories";
import FeaturedStudios from "./component/home/FeaturedStudios";
import HeroSlider from "./component/home/hero"
import HostGuarantee from "./component/home/HostGuarantee";
import HowItWorks from "./component/home/HowItWorks";
import StudioSearch from "./component/home/StudioSearch";

export default function HomePage() {
  return (
    <main>
      <HeroSlider></HeroSlider>
      <StudioSearch></StudioSearch>
      <FeaturedStudios></FeaturedStudios>
      <BrowseCategories></BrowseCategories>
      <HowItWorks></HowItWorks>
      <HostGuarantee></HostGuarantee>
    </main>
  );
}
