import { PropsWithChildren, useState } from "react";
import { useTranslations } from "../../hooks";
import { Button } from "../button";
import { Collapse } from "../collapse";

export interface ReadMoreProps {}
export const ReadMore = ({
  children,
  ...props
}: PropsWithChildren<ReadMoreProps>) => {
  const translate = useTranslations();
  const [isShow, setIsShow] = useState(false);
  const handleToggle = () => setIsShow(!isShow);

  return (
    <>
      <Collapse startingHeight={20} {...props} in={isShow}>
        {children}
      </Collapse>
      <Button size="sm" onClick={handleToggle} mt="1rem">
        {translate.formatMessage({ id: isShow ? "showLess" : "showMore" })}
      </Button>
    </>
  );
};
