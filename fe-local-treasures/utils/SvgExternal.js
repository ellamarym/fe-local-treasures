import * as React from "react";
import { SvgUri } from "react-native-svg";

const SvgExternal = (props) => (
  <SvgUri width={118} height={107} uri={props.flag} {...props} />
);
export default SvgExternal;
