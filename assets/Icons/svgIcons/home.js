import Svg, { Path , Rect , Mask,G} from 'react-native-svg';
import React from 'react';

export function HomeIcon({color}) {
  return (
 <Svg width="26" height="26" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/Svg">
<Mask maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
<Rect width="16" height="16" fill="#D9D9D9"/>
</Mask>
<G mask="url(#mask0_715_164)">
<Path d="M4.00055 12.6666H6.23138V8.70514H9.76972V12.6666H12.0005V6.66664L8.00055 3.65381L4.00055 6.66664V12.6666ZM3.00055 13.6666V6.16664L8.00055 2.40381L13.0005 6.16664V13.6666H8.76972V9.70514H7.23138V13.6666H3.00055Z" fill={color ? color : "#2E6074"} fill-opacity="0.91"/>
</G>
</Svg>
  );
}


