import defaultLogoURL from "@/assets/logo.png";
import { Footer } from "@/components/footer";
import { useCurrentApp, useTranslations } from "@/hooks";
import { getRoutes } from "@/routes";
import { Box, Button, Image, Navbar, Stack } from "@stokei/ui";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { ProductsSection } from "./products-section";

interface HomePageProps {}

export const HomePage: FC<HomePageProps> = () => {
  const router = useRouter();
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();

  return (
    <>
      <Navbar>
        <Stack align="center" direction="row">
          <Link href={getRoutes().home}>
            <Image
              width={["12", "12", "20", "20"]}
              height="fit-content"
              src={currentApp?.logo?.url}
              fallbackSrc={defaultLogoURL.src}
              alt={translate.formatMessage({ id: "home" })}
            />
          </Link>
        </Stack>
        <Stack align="center" justify="flex-end" direction="row">
          <Button
            variant="ghost"
            onClick={() => router.push(getRoutes().login)}
          >
            {translate.formatMessage({ id: "login" })}
          </Button>
          <Button onClick={() => router.push(getRoutes().signUp)}>
            {translate.formatMessage({ id: "signUp" })}
          </Button>
        </Stack>
      </Navbar>
      <Box paddingY="10">
        <ProductsSection />
      </Box>
      <Footer />
    </>
  );
};
