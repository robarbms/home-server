
import React, { useState, useEffect, useContext } from 'react';
import { getCookie } from '../utils/cookies';
import { ColorPicker } from 'antd';
import { Color } from 'antd/lib/color-picker/color';
import { accentColor } from '../../data/settings';
import { SiteContext } from '../App';

// Sets the accent color as a CSS variable
export function useSetAccent(color: string) {
document.querySelector('body')?.style.setProperty('--accent', color);
  document.cookie = `accent=${color}`;
}

// Properties for the ColorOption component
type ColorOptionProps = {
  name: string;
  value: string;
  setColor: (color: string) => void;
};

/**
 * Component that renders out a color option
 * @param props
 * @returns
 */
function ColorOption(props: ColorOptionProps) {
  const { name, setColor } = props;

  return (
    <div className="color_option" onClick={() => setColor(props.value)}>
      <div className="swatch" style={{ backgroundColor: props.value }}></div>
      <label>{name}</label>
    </div>
  );
}

/**
 * Renders the accent color options
 * @param props
 * @returns
 */
export default function SettingsColorPicker(props: {
  accents: Array<accentColor>;
}) {
    const settings = useContext(SiteContext);
    const { primaryColor, setPrimaryColor } = settings.theme;

  const customChange = (color: Color) => {
    setPrimaryColor(color.toHexString());
  };

  return (
    <div className="color_picker">
      <h3>Accent color</h3>
      {props.accents.map((clr: accentColor, index: number) => (
        <ColorOption {...clr} key={index} setColor={setPrimaryColor} />
      ))}
      <div className="color_option">
        <ColorPicker
          className="color-picker"
          onChangeComplete={customChange}
          defaultValue="#F200FF"
        /> Custom
      </div>
    </div>
  );
}
