import { useTranslations } from "@/hooks";
import { PlanItem } from "../plan-item";
import { PlanItemHeader } from "../plan-item/plan-item-header";
import { PlanItemFeatures } from "../plan-item/plan-item-features";
import { PlanItemFeature } from "../plan-item/plan-item-feature";

export const PlanFree = () => {
  const translate = useTranslations();
  return (
    <PlanItem>
      <PlanItemHeader
        title={translate.formatMessage({ id: 'free' })}
        subtitle={translate.formatMessage({ id: 'monthly' })}
      />
      <PlanItemFeatures>
        <PlanItemFeature
          name={translate.formatMessage({ id: 'unlimitedAdmins' })}
        />
        <PlanItemFeature
          name={translate.formatMessage({ id: 'unlimitedInstructors' })}
        />
        <PlanItemFeature
          name={translate.formatMessage({ id: 'unlimitedDomains' })}
        />
        <PlanItemFeature
          name={translate.formatMessage({ id: 'unlimitedProducts' })}
        />
        <PlanItemFeature
          name={translate.formatMessage({ id: 'unlimitedSites' })}
        />
      </PlanItemFeatures>
    </PlanItem>
  );
};
