export type VariantSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type VariantWeight = "bold" | "medium" | "regular" | "semi-bold";

export type VariantKey<S extends string, W extends string> = `${S}-${W}`;

export type TextVariants<S extends VariantSize, W extends VariantWeight> = {
  [K in VariantKey<S, W>]: string;
};

export type Fonts = {
  [key in VariantKey<VariantSize, VariantWeight>]: TextVariants<
    VariantSize,
    VariantWeight
  >;
};
