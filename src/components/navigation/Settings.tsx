import React, { useContext} from 'react';
import { settings } from '../../data/settings';
import ColorPicker from './ColorPicker';
import '../../styles/settings.css';
import { Switch, Divider, Radio, RadioChangeEvent, Input } from 'antd';
import { SiteContext } from '../App';

export default function Settings() {
    const siteSettings = useContext(SiteContext);
    const onChange = (checked: boolean) => {
        siteSettings.theme.setIsDark(checked);
    }

    const onImageChange = (event: RadioChangeEvent) => {
        const {value } = event.target;


        
        switch(value) {
            case 'no-image':
                siteSettings.theme.setBackgroundImage(null);
                break;
            case 'random-image':
                siteSettings.theme.setBackgroundImage('random');
                break;
            case 'image':
                break;
        }
    }

    return (
        <div className="settings nav-section">
            <h2>Site colors</h2>
            <h3>Dark mode</h3>
            <Switch defaultChecked={siteSettings.theme.isDark} onChange={onChange} />
            <Divider />
            <ColorPicker accents={settings.accents} />
            <Divider />
            <h3>Background Image</h3>
            <Radio.Group className="settings-image-picker" onChange={onImageChange} defaultValue="random-image" buttonStyle="solid">
                <Radio.Button value="no-image">No image</Radio.Button>
                <Radio.Button value="image">Image</Radio.Button>
                <Radio.Button value="random-image">Random image</Radio.Button>
            </Radio.Group>
            <div className="setings-query">
                <label>Query:</label> <Input type="text" name="query" value="Paris" />
            </div>
        </div>
    )
}
