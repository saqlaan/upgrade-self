import colors from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { ReactNode } from "react";
import { FlexAlignType, View, ViewProps } from "react-native";

export type BoxProps = ViewProps & {
  mt?: keyof typeof spacing;
  mb?: keyof typeof spacing;
  ml?: keyof typeof spacing;
  mr?: keyof typeof spacing;
  mx?: keyof typeof spacing;
  my?: keyof typeof spacing;
  pt?: keyof typeof spacing;
  pb?: keyof typeof spacing;
  pr?: keyof typeof spacing;
  pl?: keyof typeof spacing;
  px?: keyof typeof spacing;
  py?: keyof typeof spacing;
  gap?: keyof typeof spacing;
  flex?: number;
  row?: true;
  col?: true;
  alignItems?: FlexAlignType;
  justifyContent?: FlexAlignType;
  bgColor?: keyof typeof colors;
  children?: ReactNode;
};

function Box({ children, ...props }: BoxProps) {
  const {
    bgColor,
    justifyContent,
    alignItems,
    row,
    col,
    flex,
    px,
    py,
    pt,
    pb,
    pl,
    pr,
    mx,
    my,
    mt,
    mb,
    ml,
    mr,
    gap,
    style,
    ...otherProps
  } = props;

  const dynamicStyles = [
    bgColor && { backgroundColor: colors[bgColor] },
    justifyContent && { justifyContent: justifyContent },
    alignItems && { alignItems: alignItems },
    row && { flexDirection: "row" },
    col && { flexDirection: "column" },
    flex && { flex: flex },
    gap && { gap: spacing[gap] },
    px && { paddingHorizontal: spacing[px] },
    py && { paddingVertical: spacing[py] },
    pt && { paddingTop: spacing[pt] },
    pb && { paddingBottom: spacing[pb] },
    pl && { paddingLeft: spacing[pl] },
    pr && { paddingRight: spacing[pr] },
    mx && { marginHorizontal: spacing[mx] },
    my && { marginVertical: spacing[my] },
    mt && { marginTop: spacing[mt] },
    mb && { marginBottom: spacing[mb] },
    ml && { marginLeft: spacing[ml] },
    mr && { marginRight: spacing[mr] },
    style,
  ];

  return (
    <View style={dynamicStyles} {...otherProps}>
      {children}
    </View>
  );
}

export default Box;
