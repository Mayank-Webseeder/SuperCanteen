import Svg, { Path , Mask ,Rect,G} from 'react-native-svg';
import React from 'react';
export function Cross() {
  return (
 <Svg width="22" height="16" viewBox="0 0 16 16" fill="none">
<Mask id="mask0_395_671" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
<Rect width="16" height="16" fill="#D9D9D9"/>
</Mask>
<G mask="url(#mask0_395_671)">
<Path d="M4.26659 12.6666L3.33325 11.7333L7.06659 7.99998L3.33325 4.26665L4.26659 3.33331L7.99992 7.06665L11.7333 3.33331L12.6666 4.26665L8.93325 7.99998L12.6666 11.7333L11.7333 12.6666L7.99992 8.93331L4.26659 12.6666Z" fill="#1C1B1F"/>
</G>
</Svg>
  );
}


