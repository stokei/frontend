import { useTranslations } from "@/hooks";
import { PlanItem } from "../plan-item";
import { PlanItemHeader } from "../plan-item-header";
import { PlanItemFeatures } from "../plan-item-features";
import { PlanItemFeature } from "../plan-item-feature";

export const PlanFree = () => {
  const translate = useTranslations();
  return (
    <PlanItem>
      <PlanItemHeader
        title={translate.formatMessage({ id: 'free' })}
        subtitle={translate.formatMessage({ id: 'free' })}
        price={100.55}
      />
      <PlanItemFeatures>
        <PlanItemFeature
          name={translate.formatMessage({ id: 'free' })}
        />
        <PlanItemFeature
          name={translate.formatMessage({ id: 'free' })}
        />
        <PlanItemFeature
          name={translate.formatMessage({ id: 'free' })}
        />
      </PlanItemFeatures>
    </PlanItem>
  );
};
