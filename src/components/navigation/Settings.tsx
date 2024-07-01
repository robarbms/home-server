import React, { useContext} from 'react';
import { settings } from '../../data/settings';
import ColorPicker from './ColorPicker';
import '../../styles/settings.css';
import { Switch, Divider } from 'antd';
import { SiteContext } from '../App';

export default function Settings() {
    const siteSettings = useContext(SiteContext);
    const onChange = (checked: boolean) => {
        siteSettings.theme.setIsDark(checked);
    }

    return (
        <div className="settings nav-section">
            <h3>Dark mode</h3>
            <Switch defaultChecked={siteSettings.theme.isDark} onChange={onChange} />
            <Divider />
            <ColorPicker accents={settings.accents} />
        </div>
    )
}
