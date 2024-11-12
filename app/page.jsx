import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import HomeProperties from "@/components/HomeProperties";
import { fetchProperties } from "@/utils/requests";

const HomePage = async () => {
  const properties = await fetchProperties();
  return (
    <div>
      <Hero />
      <InfoBoxes />
      <HomeProperties properties={properties} />
    </div>
  );
};

export default HomePage;
