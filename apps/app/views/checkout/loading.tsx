import { Box, Container, Skeleton, Stack } from "@stokei/ui";

export const Loading = () => {
  return (
    <Container paddingY="10" align="center">
      <Box
        width={["full", "full", "584px", "584px"]}
        height="fit-content"
        flexDirection="column"
      >
        <Stack direction="column" spacing="10">
          <Skeleton width="full" height="10" />
          <Skeleton width="full" height="40" />
        </Stack>
      </Box>
    </Container>
  );
};
