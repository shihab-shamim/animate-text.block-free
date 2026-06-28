import { useBlockProps } from '@wordpress/block-editor';

import Settings from './Settings/Settings';
import Style from '../Common/Style';
import { prefix } from '../../utils/data';
import Default from './Themes/Default';
import TypeTwo from '../Common/Themes/TypeTwo';
import TypeThree from '../Common/Themes/TypeThree';
import TypeFour from '../Common/Themes/TypeFour';


const Edit = props => {
	const { attributes, setAttributes, clientId } = props;
	const { options } = attributes;
	const { theme } = options;
	const id = `${prefix}-${clientId}`;




	return <>
		<Settings attributes={attributes} setAttributes={setAttributes} />

		<div {...useBlockProps()} id={id}>
			<Style attributes={attributes} id={id} />

			<div className={`${prefix} ${theme}`}>

				<SwitchTheme {...{ attributes, id }} />
			</div>
		</div>
	</>;
};
export default Edit;




const SwitchTheme = ({ attributes, id }) => {
	const { options } = attributes;
	const { theme } = options;

	switch (theme) {
		case 'default':
			return <Default attributes={attributes} id={id} />;
		case 'type2':
			return <TypeTwo attributes={attributes} />;
		case 'type3':
			return <TypeThree attributes={attributes} />;
		case 'type4':
			return <TypeFour attributes={attributes} />;
		default:
			return null;
	}
};