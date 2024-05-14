import { useTranslations } from "@/hooks";
import { Hero, HeroContent, HeroMedia, HeroSubtitle, HeroTitle, SimpleGrid } from "@stokei/ui";
import { Product } from "./product";

export const CreateYourProductHero = () => {
  const translate = useTranslations();
  return (
    <Hero>
      <HeroContent>
        <HeroTitle>
          {translate.formatMessage({ id: "createYourProducts" })}
        </HeroTitle>
        <HeroSubtitle>
          {translate.formatMessage({
            id: "startCreatingYourProductsWithHighQualityImagesAndChooseImpactfulNames",
          })}
        </HeroSubtitle>
      </HeroContent>
      <HeroMedia>
        <SimpleGrid columns={2} spacing="5">
          <Product
            name={translate.formatMessage({ id: "course" })}
            price={1000}
          />
          <Product
            name={translate.formatMessage({ id: "material" })}
            price={7589}
          />
        </SimpleGrid>
      </HeroMedia>
    </Hero>
  );
};
