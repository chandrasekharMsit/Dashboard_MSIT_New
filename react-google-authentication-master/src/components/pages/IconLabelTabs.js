// src/components/IconLabelTabs.js
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

export default function IconLabelTabs({ value, handleChange }) {
  return (
    <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
      <Tab icon={<PersonAddAltIcon />} label="Add User" />
      <Tab icon={<CloudUploadIcon />} label="Upload CSV" />
    </Tabs>
  );
}
