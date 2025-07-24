import Svg, { Path , Rect , Mask,G} from 'react-native-svg';
import React from 'react';

export function BackArrow({color}) {
  return (
 <Svg width="23" height="23" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/Svg">
<Mask id="mask0_395_746" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
<Rect width="16" height="16" fill="#D9D9D9"/>
</Mask>
<G mask="url(#mask0_395_746)">
<Path d="M4.91533 8.5L8.71283 12.2975L8 13L3 8L8 3L8.71283 3.7025L4.91533 7.5H13V8.5H4.91533Z" fill="#1C1B1F"/>
</G>
</Svg>
  );
}




