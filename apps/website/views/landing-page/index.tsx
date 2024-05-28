import { Container, SingleSelect, SingleSelectAddButton, SingleSelectButton, SingleSelectCombobox, SingleSelectOption, SingleSelectOptions, SingleSelectSearchInput, Text } from "@stokei/ui";

import { CommonQuestions } from "./components/common-questions";
import { Contact } from "./components/contact";
import { CreateYourAppHero } from "./components/heros/create-your-app";
import { CreateYourDomainHero } from "./components/heros/create-your-domain";
import { CreateYourPricesHero } from "./components/heros/create-your-prices";
import { CreateYourProductHero } from "./components/heros/create-your-product";
import { EndHero } from "./components/heros/end";
import { PrimaryHero } from "./components/heros/primary";
import { PaymentMethods } from "./components/payment-methods";
import { Plans } from "./components/plans";
import { LandingPageLayout } from "./layout";
import { useMemo, useState } from "react";

const list = [
  {
    id: '1',
    name: 'Douglas'
  },
  {
    id: '2',
    name: 'Mamute'
  },
  {
    id: '3',
    name: 'Jorge'
  },
];

type Value = (typeof list)[0];

export const LandingPage = () => {
  const [query, setQuery] = useState<string>('');
  const [searchValue, setSearchValue] = useState<Value>(list[0]);

  const listFiltered = useMemo(() => {
    return list.filter(item => !!item.name?.match(new RegExp(query, 'i')));
  }, [query]);
  console.log({ query, listFiltered })

  return (
    <LandingPageLayout>
      <Container>
        <SingleSelect
          id="douglas"
          value={searchValue}
          onChange={setSearchValue}
          onClose={() => setQuery('')}
        >
          <SingleSelectButton
            placeholder="Clique em mim"
            item={(value: Value) => (<Text fontWeight="bold">{value?.name}</Text>)}
          />
          <SingleSelectCombobox>
            <SingleSelectSearchInput
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <SingleSelectAddButton>
              Adicionar mais um
            </SingleSelectAddButton>
            <SingleSelectOptions>
              {listFiltered?.map((item) => (
                <SingleSelectOption key={item.id} value={item}>
                  <Text>{item.name}</Text>
                </SingleSelectOption>
              ))}
            </SingleSelectOptions>
          </SingleSelectCombobox>
        </SingleSelect>

        <PrimaryHero />
        <CreateYourAppHero />
        <CreateYourDomainHero />
        <CreateYourProductHero />
        <CreateYourPricesHero />
        <EndHero />
      </Container>
      <Plans />
      <PaymentMethods />
      <CommonQuestions />
      <Contact />
    </LandingPageLayout>
  );
};
