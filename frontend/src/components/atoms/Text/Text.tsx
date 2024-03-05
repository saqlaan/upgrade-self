import { TextVariants } from "@/theme/fonts";
import { spacing } from "@/theme/spacing";
import { Text as BaseComp } from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";

export interface TextProps extends React.ComponentProps<typeof BaseComp> {
  color?: keyof typeof Colors;
  variant?: keyof typeof TextVariants;
  align?: "left" | "right" | "center";
  mt?: keyof typeof spacing;
  mb?: keyof typeof spacing;
}

function Text({
  color,
  align,
  variant,
  mt,
  mb,
  children,
  ...props
}: TextProps) {
  return (
    <BaseComp
      variant={variant}
      style={[
        color && { color },
        align && { textAlign: align },
        mt && {
          marginTop: spacing[mt],
        },
        mb && {
          marginBottom: spacing[mb],
        },
      ]}
      {...props}
    >
      {children}
    </BaseComp>
  );
}

export default Text;
