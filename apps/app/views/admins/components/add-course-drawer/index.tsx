import { useTranslations } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Drawer,
  DrawerBody,
  Form,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  Label,
  SimpleGrid,
} from "@stokei/ui";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AdminsCourseFragment } from "../../graphql/course.fragment.graphql.generated";
import { CourseItem } from "../course-item";

interface AddCourseDrawerProps {
  isOpenDrawer?: boolean;
  onCloseDrawer: () => void;
  onSuccess?: (course: AdminsCourseFragment) => void;
}

export const AddCourseDrawer: FC<AddCourseDrawerProps> = ({
  onSuccess,
  isOpenDrawer,
  onCloseDrawer,
}) => {
  const translate = useTranslations();

  const validationSchema = z.object({
    name: z.string().min(1, {
      message: translate.formatMessage({ id: "courseNameIsRequired" }),
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async () => {};

  return (
    <Drawer isOpen={!!isOpenDrawer} onClose={onCloseDrawer}>
      <DrawerBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors?.name}>
            <Label htmlFor="name">
              {translate.formatMessage({ id: "courseName" })}
            </Label>
            <InputGroup>
              <Input
                id="name"
                type="name"
                placeholder={translate.formatMessage({
                  id: "courseNamePlaceholder",
                })}
                {...register("name")}
              />
            </InputGroup>
            <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
          </FormControl>

          <Button type="submit">
            {translate.formatMessage({
              id: "save",
            })}
          </Button>
        </Form>
      </DrawerBody>
    </Drawer>
  );
};
