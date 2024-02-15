import { StyleSheet, View, ViewProps } from "react-native";

type Props = ViewProps & {
  marginBottom?: number;
  marginTop?: number;
};

function Spacer({ marginTop, marginBottom, ...props }: Props) {
  return (
    <View
      style={[
        styles.view,
        { marginTop: marginTop, marginBottom: marginBottom },
      ]}
      {...props}
    ></View>
  );
}

export default Spacer;

const styles = StyleSheet.create({
  view: {
    marginTop: 0,
    marginBottom: 0,
  },
});
