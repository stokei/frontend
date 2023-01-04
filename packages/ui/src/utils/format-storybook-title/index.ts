export interface FormatStorybookTitle {
  readonly title: string;
  readonly project?: string;
}

export const formatStorybookTitle = (data: FormatStorybookTitle) =>
  `${data?.project || "Stokei"}/${data?.title}`;
