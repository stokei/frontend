import { useTranslations } from "@/hooks";
import { PlanItem } from "../plan-item";
import { PlanItemFeature } from "../plan-item-feature";
import { PlanItemFeatures } from "../plan-item-features";
import { PlanItemHeader } from "../plan-item-header";

export const PlanCalculator = () => {
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
