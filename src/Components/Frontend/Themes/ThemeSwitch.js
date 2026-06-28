import React from 'react';
import Default from '../../Backend/Themes/Default';
import TypeTwo from '../../Common/Themes/TypeTwo';
import TypeThree from '../../Common/Themes/TypeThree';
import TypeFour from '../../Common/Themes/TypeFour';

const ThemeSwitch = (props) => {
    const { attributes, id } = props;
    const { options } = attributes;
    const { theme } = options;

    switch (theme) {
        case 'default':
            return <Default attributes={attributes} id={id} />
        case 'type2':
            return <TypeTwo attributes={attributes} />
        case 'type3':
            return <TypeThree attributes={attributes} />
        case 'type4':
            return <TypeFour attributes={attributes} />
        default:
            return null
    }
};
export default ThemeSwitch;