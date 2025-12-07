import React from 'react';

export interface ModFile {
  name: string;
  desc: string;
  size: string;
  link: string;
  logo: string;
}

export interface NavItem {
  label: string;
  url: string;
  icon?: React.ReactNode;
}