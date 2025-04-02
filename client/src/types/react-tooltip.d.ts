declare module 'react-tooltip' {
  import React from 'react';
  
  interface TooltipProps {
    id?: string;
    className?: string;
    place?: 'top' | 'right' | 'bottom' | 'left';
    content?: React.ReactNode;
    html?: string;
    variant?: 'dark' | 'light' | 'success' | 'warning' | 'error' | 'info';
    children?: React.ReactNode;
    [key: string]: any;
  }
  
  export const Tooltip: React.FC<TooltipProps>;
}