import { useTranslations } from "@/hooks";
import { ColorType } from "@/services/graphql/stokei";
import { AppLayout } from "@/views/app/layout";
import {
  Container,
  Stack
} from "@stokei/ui";
import { ColorUpdateGroup } from "./components/color-update-group";
import { ColorUpdateItem } from "./components/color-update-item";
import { ColorUpdateTitle } from "./components/color-update-title";
import { Navbar } from "./components/navbar";

export const ColorsPage = () => {
  const translate = useTranslations();
  return (
    <AppLayout>
      <Navbar />
      <Container paddingY="5">
        <Stack direction="column" spacing="5">
          <ColorUpdateGroup>
            <ColorUpdateTitle title={translate.formatMessage({ id: "brandColors" })} />
            <ColorUpdateItem colorType={ColorType.Primary} />
          </ColorUpdateGroup>

          <ColorUpdateGroup>
            <ColorUpdateTitle title={translate.formatMessage({ id: "textColors" })} />
            <ColorUpdateItem colorType={ColorType.Heading} />
            <ColorUpdateItem colorType={ColorType.Text} />
          </ColorUpdateGroup>
        </Stack>
      </Container>
    </AppLayout>
  );
};
