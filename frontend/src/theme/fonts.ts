const sizes: string[] = [
  "display-2xl",
  "display-xl",
  "display-lg",
  "display-md",
  "display-sm",
  "display-xs",
  "text-xl",
  "text-lg",
  "text-md",
  "text-sm",
  "text-xs",
];
const variants: string[] = ["regular", "medium", "semi-bold", "bold"];

const sizeStyles = {
  "display-2xl": {
    fontSize: 72,
    lineHeight: 90,
    letterSpacing: -1.44,
  },
  "display-xl": {
    fontSize: 60,
    lineHeight: 72,
    letterSpacing: -1.2,
  },
  "display-lg": {
    fontSize: 48,
    lineHeight: 60,
    letterSpacing: -0.96,
  },
  "display-md": {
    fontSize: 36,
    lineHeight: 44,
    letterSpacing: -0.72,
  },
  "display-sm": {
    fontSize: 30,
    lineHeight: 38,
  },
  "display-xs": {
    fontSize: 24,
    lineHeight: 32,
  },
  "text-xl": {
    fontSize: 20,
    lineHeight: 30,
  },
  "text-lg": {
    fontSize: 18,
    lineHeight: 28,
  },
  "text-md": {
    fontSize: 16,
    lineHeight: 24,
  },
  "text-sm": {
    fontSize: 14,
    lineHeight: 20,
  },
  "text-xs": {
    fontSize: 12,
    lineHeight: 18,
  },
};

export const variantFamily = {
  regular: "Manrope-Regular",
  medium: "Manrope-Medium",
  "semi-bold": "Manrope-SemiBold",
  bold: "Manrope-Bold",
};

function createFontStylesObject() {
  let textStyles: { [key: string]: object } = {};
  sizes.forEach((size: string) => {
    variants.forEach((variant: string) => {
      const key = `${size}-${variant}`;
      textStyles[key] = {
        fontFamily: variantFamily[variant],
        ...sizeStyles[size],
      };
    });
  });
  return textStyles;
}

export const fontConfig = createFontStylesObject();

export const TextVariants = {
  "display-2xl-bold": "display-2xl-bold",
  "display-2xl-medium": "display-2xl-medium",
  "display-2xl-regular": "display-2xl-regular",
  "display-2xl-semi-bold": "display-2xl-semi-bold",
  "display-lg-bold": "display-lg-bold",
  "display-lg-medium": "display-lg-medium",
  "display-lg-regular": "display-lg-regular",
  "display-lg-semi-bold": "display-lg-semi-bold",
  "display-md-bold": "display-md-bold",
  "display-md-medium": "display-md-medium",
  "display-md-regular": "display-md-regular",
  "display-md-semi-bold": "display-md-semi-bold",
  "display-sm-bold": "display-sm-bold",
  "display-sm-medium": "display-sm-medium",
  "display-sm-regular": "display-sm-regular",
  "display-sm-semi-bold": "display-sm-semi-bold",
  "display-xl-bold": "display-xl-bold",
  "display-xl-medium": "display-xl-medium",
  "display-xl-regular": "display-xl-regular",
  "display-xl-semi-bold": "display-xl-semi-bold",
  "display-xs-bold": "display-xs-bold",
  "display-xs-medium": "display-xs-medium",
  "display-xs-regular": "display-xs-regular",
  "display-xs-semi-bold": "display-xs-semi-bold",
  "text-lg-bold": "text-lg-bold",
  "text-lg-medium": "text-lg-medium",
  "text-lg-regular": "text-lg-regular",
  "text-lg-semi-bold": "text-lg-semi-bold",
  "text-md-bold": "text-md-bold",
  "text-md-medium": "text-md-medium",
  "text-md-regular": "text-md-regular",
  "text-md-semi-bold": "text-md-semi-bold",
  "text-sm-bold": "text-sm-bold",
  "text-sm-medium": "text-sm-medium",
  "text-sm-regular": "text-sm-regular",
  "text-sm-semi-bold": "text-sm-semi-bold",
  "text-xl-bold": "text-xl-bold",
  "text-xl-medium": "text-xl-medium",
  "text-xl-regular": "text-xl-regular",
  "text-xl-semi-bold": "text-xl-semi-bold",
  "text-xs-bold": "text-xs-bold",
  "text-xs-medium": "text-xs-medium",
  "text-xs-regular": "text-xs-regular",
  "text-xs-semi-bold": "text-xs-semi-bold",
};

type VariantSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
type VariantWeight = "bold" | "medium" | "regular" | "semi-bold";

type VariantKey<S extends string, W extends string> = `${S}-${W}`;

type TextVariants<S extends VariantSize, W extends VariantWeight> = {
  [K in VariantKey<S, W>]: string;
};

const generateVariants = <S extends VariantSize, W extends VariantWeight>(
  sizes: S[],
  weights: W[]
): TextVariants<S, W> => {
  const variants: Partial<TextVariants<S, W>> = {};

  sizes.forEach((size) => {
    weights.forEach((weight) => {
      const key = `${size}-${weight}` as VariantKey<S, W>;
      variants[key] = key;
    });
  });

  return variants as TextVariants<S, W>;
};

const TextVariantsExample = generateVariants(sizes, variants);
console.log(TextVariantsExample);
