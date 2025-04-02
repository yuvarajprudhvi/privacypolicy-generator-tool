declare module 'react-simple-maps' {
  import React from 'react';
  
  interface Geography {
    rsmKey: string;
    properties: {
      NAME: string;
      ISO_A2: string;
      [key: string]: any;
    };
  }
  
  interface ComposableMapProps {
    projectionConfig?: {
      scale?: number;
      center?: [number, number];
      [key: string]: any;
    };
    width?: number;
    height?: number;
    children?: React.ReactNode;
    [key: string]: any;
  }
  
  interface GeographiesProps {
    geography: string | object;
    children: (props: { geographies: Geography[] }) => React.ReactNode;
    [key: string]: any;
  }
  
  interface GeographyProps {
    geography: Geography;
    onMouseEnter?: (event: React.MouseEvent<SVGPathElement>, geo: Geography) => void;
    onMouseLeave?: (event: React.MouseEvent<SVGPathElement>, geo: Geography) => void;
    onClick?: (event: React.MouseEvent<SVGPathElement>, geo: Geography) => void;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
      [key: string]: any;
    };
    [key: string]: any;
  }
  
  interface ZoomableGroupProps {
    center?: [number, number];
    zoom?: number;
    children?: React.ReactNode;
    [key: string]: any;
  }
  
  export const ComposableMap: React.FC<ComposableMapProps>;
  export const Geographies: React.FC<GeographiesProps>;
  export const Geography: React.FC<GeographyProps>;
  export const ZoomableGroup: React.FC<ZoomableGroupProps>;
}