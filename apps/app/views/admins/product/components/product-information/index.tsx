import { Text, Title, useToast } from "@stokei/ui";
import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Section } from "../section";
import { SectionContent } from "../section-content";
import { SectionInformation } from "../section-information";
import { useAPIErrors, useCurrentApp, useTranslations } from "@/hooks";

interface ProductInformationProps {}

export const ProductInformation: FC<ProductInformationProps> = () => {
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();
  const { currentApp } = useCurrentApp();

  const validationSchema = z.object({
    name: z.string().min(1, {
      message: translate.formatMessage({ id: "nameIsRequired" }),
    }),
    description: z.string(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
  });

  const [{ fetching: isLoadingUpdateProduct }, onUpdateProduct] =
    useUpdateProductMutation();

  useEffect(() => {
    if (currentProduct) {
      reset({
        name: currentProduct?.name || "",
      });
    }
  }, [reset]);

  const onSubmit = async ({
    name,
    description,
  }: z.infer<typeof validationSchema>) => {
    try {
      const parent = productParent?.id || currentApp?.id;
      const response = await onCreateProduct({
        input: {
          parent: parent || "",
          checkoutVisible: false,
          name,
          description,
        },
      });
      if (!!response?.data?.createProduct) {
        onShowToast({
          title: translate.formatMessage({ id: "productCreatedSuccessfully" }),
          status: "success",
        });
        router.push(
          routes.admins.product({ product: response.data.createProduct.id })
            .home
        );
        return;
      }

      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) {}
  };

  return (
    <Section>
      <SectionInformation>
        <Title fontSize="md">
          {translate.formatMessage({ id: "product" })}
        </Title>
        <Text fontSize="sm">{translate.formatMessage({ id: "product" })}</Text>
      </SectionInformation>
      <SectionContent>
        <Title fontSize="md">
          {translate.formatMessage({ id: "product" })}
        </Title>
        <Text fontSize="sm">{translate.formatMessage({ id: "product" })}</Text>
      </SectionContent>
    </Section>
  );
};
