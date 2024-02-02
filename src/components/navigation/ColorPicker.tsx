import React, {useState, useEffect} from 'react';

function ColorOption(props) {
    const {name} = props;
    const [color, setColor] = useState();

    useEffect(() => {
        if (color) {
            console.log(color);
            document.querySelector('body')?.style.setProperty('--accent', color);
        }
    }, [color])

    return (
        <div className="color_option" onClick={() => setColor(props.value)}>
            <div className="swatch" style={{backgroundColor: props.value}}>

            </div>
            <label>{name}</label>
        </div>
    )
}

export default function ColorPicker(props) {
    return (
        <div className="color_picker">
            <h3>Accent color</h3>
            {props.accents.map((clr, index) => <ColorOption {...clr} key={index} />)}
        </div>
    )
}