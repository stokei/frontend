import { useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import {
  Box,
  Button,
  Description,
  Loading,
  RadioCard,
  RadioGroup,
  Stack,
  Title,
  useDisclosure,
} from "@stokei/ui";
import { FC, useCallback, useEffect, useState } from "react";
import { AddressItem } from "./address-item";
import { CreateAddressForm } from "./create-address-form";
import { CreateAddressModal } from "./create-address-modal";
import {
  AddressManagementAddressFragment,
  useAddressManagementAddresssQuery,
} from "./graphql/addresses.query.graphql.generated";

interface AddressManagementProps {
  readonly title?: string;
  readonly subtitle?: string;
  readonly selectedAddress?: AddressManagementAddressFragment;
  readonly onChooseAddress: (address: AddressManagementAddressFragment) => void;
}

export const AddressManagement: FC<AddressManagementProps> = ({
  title,
  subtitle,
  selectedAddress,
  onChooseAddress,
}) => {
  const [addresses, setAddresses] = useState<
    AddressManagementAddressFragment[]
  >([]);

  const {
    isOpen: isOpenCreateAddressModal,
    onClose: onCloseCreateAddressModal,
    onOpen: onOpenCreateAddressModal,
  } = useDisclosure();

  const translate = useTranslations();
  const { currentAccount } = useCurrentAccount();

  const [{ fetching: isLoadingeAddresses, data: dataAddresses }] =
    useAddressManagementAddresssQuery({
      pause: !currentAccount?.id,
      variables: {
        where: {
          AND: {
            parent: {
              equals: currentAccount?.id,
            },
          },
        },
      },
    });

  useEffect(() => {
    if (!!dataAddresses?.addresses?.items?.length) {
      setAddresses(dataAddresses.addresses.items);
      if (!selectedAddress) {
        onChooseAddress(dataAddresses.addresses.items[0]);
      }
    }
  }, [dataAddresses, onChooseAddress, selectedAddress]);

  const onAddNewAddress = useCallback(
    (address?: AddressManagementAddressFragment) => {
      if (!address) {
        return;
      }
      setAddresses((currenteAddresses) => [...currenteAddresses, address]);
      onChooseAddress(address);
      onCloseCreateAddressModal();
    },
    [onChooseAddress, onCloseCreateAddressModal]
  );

  const onChangeAddress = useCallback(
    (value: string) => {
      const address = addresses?.find((method) => method.id === value);
      if (address) {
        onChooseAddress(address);
      }
    },
    [onChooseAddress, addresses]
  );

  return (
    <Box width="full" flexDirection="column">
      <CreateAddressModal
        isOpen={isOpenCreateAddressModal}
        onClose={onCloseCreateAddressModal}
        onSuccess={onAddNewAddress}
      />
      {isLoadingeAddresses ? (
        <Stack direction="column" spacing="4" align="center" justify="center">
          <Loading />
        </Stack>
      ) : (
        <Stack direction="column" spacing="4">
          <Title fontSize="lg">
            {title || translate.formatMessage({ id: "address" })}
          </Title>
          {subtitle && <Description>{subtitle}</Description>}
          {!addresses.length ? (
            <CreateAddressForm onSuccess={onAddNewAddress} />
          ) : (
            <>
              <RadioGroup
                onChange={onChangeAddress}
                value={selectedAddress?.id || ""}
              >
                <Stack direction="column" spacing="4">
                  {addresses.map((currentAddress) => (
                    <RadioCard
                      key={currentAddress.id}
                      id={"addresse-" + currentAddress?.id}
                      value={currentAddress?.id}
                      isChecked={currentAddress?.id === selectedAddress?.id}
                    >
                      <AddressItem address={currentAddress} />
                    </RadioCard>
                  ))}
                </Stack>
              </RadioGroup>
              <Button variant="link" onClick={onOpenCreateAddressModal}>
                {translate.formatMessage({ id: "addNewAddress" })}
              </Button>
            </>
          )}
        </Stack>
      )}
    </Box>
  );
};
