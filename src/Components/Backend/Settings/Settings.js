import { __ } from '@wordpress/i18n';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, TabPanel, TextareaControl, ToggleControl, SelectControl, RangeControl, __experimentalUnitControl as UnitControl } from '@wordpress/components';

import { Label, Background, ColorControl, BtnGroup, Typography, HelpPanel, Device, ShadowControl } from '../../../../../bpl-tools/Components';
import { BorderControl, SpaceControl } from '../../../../../bpl-tools/Components/Deprecated';
import { tabController, updateData } from '../../../../../bpl-tools/utils/functions';
import {  AdvertiseCard } from '../../../../../bpl-tools/ProControls';

import { pluginSlug, animatedTextDocs, pricingPage } from '../../../utils/data';
import { animateTypeOptions, FeaturesPro, generalStyleTabs } from '../../../utils/options';
import { animateInOpt, effects, inEffects, outEffects, sequences } from '../../../utils/options';
import { withSelect } from '@wordpress/data';
import { produce } from 'immer';
import { useState } from 'react';
import { themeSwitch } from '../../../utils/config';
import { ToolbarGroup } from '@wordpress/components';
import { DropdownMenu } from '@wordpress/components';
import { TextControl } from '@wordpress/components';
import ThemeSwitcher from '../../../utils/panel/ThemeSwitcher';

const Settings = ({ attributes, setAttributes, isPremium, device }) => {
	const { loop, animateIn, inEffect, inSequence, outEffect, outSequence, background, content, typography, color, padding, border, options, gsapAnimation = {}, animatedSize = {}, textAlignment = "center", repeat = true, alignment, prefixText = "", suffixText = "", prefixColor = "", prefixTypo = {}, suffixColor = "", suffixTypo = {} } = attributes;


	const [alertAnimationSpeed, setAlertAnimationSpeed] = useState(null);
	const [alertRandomColor, setAlertRandomColor] = useState(null);
	const [alertShadow, setAlertShadow] = useState(null);

	const [isProModalOpen, setIsProModalOpen] = useState(false);

	const premiumProps = { isPremium, setIsProModalOpen };


	// Define available easing options
	const easeOptions = [
		{ label: "Elastic", value: "elastic(0.3, 0.2)" },
		{ label: "Bounce", value: "bounce.out" }
	];

	const itemOption = [
		{ label: "Default", value: "default" },
		{ label: "Wave Reveal", value: "type2" },
		{ label: "Zoom", value: "type3" },
		{ label: "Swaying", value: "type4"}
	]

	const { theme = {} } = options;
	const { animationSpeed = 30, perspectiveDepth = 800, enableOscillation = true, repeatBehavior, repeatDelay = 2, animationEffect = "default", autoRepeat = true, transformOrigin = 400, randomColor = false, isTextShadow = false, textShadow = [], fontStretch = "200%", animationDuration = 1, waveEffect = 25, easeType = "elastic(0.3, 0.2)", scaleX = 1.5, scaleY = 0.5, typingSpeed, reStartTime = 1000, animateType = 'wave' } = gsapAnimation;

	return <>
		<InspectorControls>
			<TabPanel className='bPlTabPanel' activeClass='activeTab' tabs={generalStyleTabs} onSelect={tabController}>{tab => <>
				{'general' === tab.name && <>
					<HelpPanel slug={pluginSlug} docsLink={animatedTextDocs} />

					<PanelBody title={__("Animation Options:", "animated-text-block")} initialOpen={true}>
						<SelectControl
							label={__("Animation Styles:", "animated-text-block")}
							value={theme}
							options={itemOption}
							labelPosition="left"
							onChange={(val) => setAttributes(themeSwitch(val, attributes))}
						/>


						<SelectControl
							label="Text Alignment"
							labelPosition="left"
							className="mt10"
							value={textAlignment}
							options={[
								{ label: "Left", value: "left" },
								{ label: "Center", value: "center" },
								{ label: "Right", value: "right" }
							]}
							onChange={(newAlignment) =>
								setAttributes({ textAlignment: newAlignment }) // Update the attribute on change
							}
						/>

					<AdvertiseCard planLink="/wp-admin/edit.php?post_type=animated-text-block&page=atb_demo_page#/pricing" />

						{
							("type1" === theme) && <>
					<AdvertiseCard planLink="/wp-admin/edit.php?post_type=animated-text-block&page=atb_demo_page#/pricing" />

							</>
						}

					</PanelBody>


					<PanelBody className='bPlPanelBody' title={__('Animated Text Settings', 'animated-text-block')}>

						{/* Prefix Text section */}
						{
							("default" === theme || "type2" === theme || "type3" === theme || "type4" === theme || "type5" === theme || "type6" === theme || "type7" === theme || "type8" === theme || "type9" === theme || "type10" === theme) && <>
								<Label className='mt10'>{__('Prefix Text:', 'animated-text-block')}</Label>
								<TextControl value={prefixText} placeholder={__("Type your prefix content", "animated-text-block")} onChange={val => setAttributes({ prefixText: val })} />
							</>
						}

						<Label className='mb5'>{__('Animate text:', 'animated-text-block')}</Label>

						{
							("default" === theme || "type1" === theme || "type4" === theme || "type7" === theme || "type10" === theme) && <TextareaControl
								value={content}
								onChange={val => setAttributes({ content: val })}
								placeholder='Please type here'
							/>
						}

						{
							("type2" === theme || "type3" === theme || "type5" === theme || "type6" === theme || "type8" === theme || "type9" === theme) && <TextareaControl
								value={content}
								onChange={val => setAttributes({ content: val })}
								placeholder='Please type here'
								help="Add multiple sentence, Separate texts using ( | ) to animate them one by one."
							/>
						}



						{
							"type7" === theme && <>
								<p style={{ color: "#DF6D14" }}>Use a single-line text. Multiple lines do not animate properly.</p>
							</>
						}
						{
							("type4" === theme) && <p style={{ color: "#DF6D14" }}>Not working here white space for this animate</p>
						}
						{
							("type10" === theme) && <>
								{
									"wave" === animateType && <p style={{ color: "#DF6D14" }}>Not working here white space for this animate</p>
								}
							</>
						}


						{
							"default" === theme && <>
								<ToggleControl className='mt20' label={__('Loop', 'animated-text-block')} checked={loop} onChange={val => setAttributes({ loop: val })} />
								<small>{__('Loop will not work instantly in editor! you have to refresh the page.', 'animated-text-block')}</small>

								<PanelRow>
									<Label className=''>{__('Animate in:', 'animated-text-block')}</Label>
									<BtnGroup value={animateIn} onChange={val => setAttributes({ animateIn: val })} options={animateInOpt} />
								</PanelRow>

								<PanelRow>
									<Label className=''>{__('In Effect:', 'animated-text-block')}</Label>
									<SelectControl value={inEffect} onChange={val => setAttributes({ inEffect: val })} options={[...effects, ...inEffects]} />
								</PanelRow>

								<PanelRow>
									<Label className=''>{__('In Sequence:', 'animated-text-block')}</Label>
									<SelectControl value={inSequence} onChange={val => setAttributes({ inSequence: val })} options={sequences} />
								</PanelRow>

								{loop && <>
									<PanelRow>
										<Label className=''>{__('Out Effect:', 'animated-text-block')}</Label>
										<SelectControl value={outEffect} onChange={val => setAttributes({ outEffect: val })} options={[...effects, ...outEffects]} />
									</PanelRow>

									<PanelRow>
										<Label className=''>{__('Out Sequence:', 'animated-text-block')}</Label>
										<SelectControl value={outSequence} onChange={val => setAttributes({ outSequence: val })} options={sequences} />
									</PanelRow>
								</>}
							</>
						}

						{
							"type1" === theme && <>
								<PanelBody className='bPlPanelBody' title={__('Animation Control', 'animated-text-block')}>

									{/* Animation speed control */}
						<AdvertiseCard planLink="/wp-admin/edit.php?post_type=animated-text-block&page=atb_demo_page#/pricing" />

								</PanelBody>
							</>
						}

						{
							"type2" === theme && <>
								<PanelBody className='bPlPanelBody' title={__('Animation Control', 'animated-text-block')}>
									{/* Animation speed control */}
									<AdvertiseCard planLink="/wp-admin/edit.php?post_type=animated-text-block&page=atb_demo_page#/pricing" />
								</PanelBody>
							</>
						}

						{
							"type3" === theme && <>
								<PanelBody className='bPlPanelBody' title={__('Animation Control', 'animated-text-block')}>

									{/* Animation speed control */}
									<AdvertiseCard planLink="/wp-admin/edit.php?post_type=animated-text-block&page=atb_demo_page#/pricing" />
								</PanelBody>

								<AdvertiseCard planLink="/wp-admin/edit.php?post_type=animated-text-block&page=atb_demo_page#/pricing" />

							</>
						}

						{
							"type4" === theme && <>
								<AdvertiseCard planLink="/wp-admin/edit.php?post_type=animated-text-block&page=atb_demo_page#/pricing" />
							</>
						}

						{
							"type5" === theme && <>
								<AdvertiseCard planLink="/wp-admin/edit.php?post_type=animated-text-block&page=atb_demo_page#/pricing" />
							</>
						}

						{
							"type6" === theme && <>
								<AdvertiseCard planLink="/wp-admin/edit.php?post_type=animated-text-block&page=atb_demo_page#/pricing" />
							</>
						}

						{
							"type7" === theme && <>
								<AdvertiseCard planLink="/wp-admin/edit.php?post_type=animated-text-block&page=atb_demo_page#/pricing" />
							</>
						}

						{
							"type8" === theme && <>
								<AdvertiseCard planLink="/wp-admin/edit.php?post_type=animated-text-block&page=atb_demo_page#/pricing" />
							</>
						}

						{/* Suffix Contents section */}

						{
							("default" === theme || "type2" === theme || "type3" === theme || "type4" === theme || "type5" === theme || "type6" === theme || "type7" === theme || "type8" === theme || "type9" === theme || "type10" === theme) && <>
								<Label>{__('Suffix Text:', 'animated-text-block')}</Label>
								<TextControl value={suffixText} placeholder={__("Type your suffix content", "animated-text-block")} onChange={val => setAttributes({ suffixText: val })} />
							</>
						}

						{
							"type9" === theme && <>

								<AdvertiseCard planLink="/wp-admin/edit.php?post_type=animated-text-block&page=atb_demo_page#/pricing" />

								{/* Show typingSpeed dynamically for its duration */}
								{alertAnimationSpeed !== null && (
									<p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
										Please wait until the animation complete: {alertAnimationSpeed}ms
									</p>
								)}
							</>
						}

						{
							"type10" === theme && <>
								<AdvertiseCard planLink="/wp-admin/edit.php?post_type=animated-text-block&page=atb_demo_page#/pricing" />
							</>
						}
					</PanelBody>
				</>}


				{'style' === tab.name && <>
					<PanelBody className='bPlPanelBody' title={__('Animated Text', 'animated-text-block')}>
						<Background label={__('Background:', 'animated-text-block')} value={background} onChange={val => setAttributes({ background: val })} defaults={{ color: '#0000' }} />

						{/* Prefix styles Here */}
						{
							prefixText && ("default" === theme || "type2" === theme || "type3" === theme || "type4" === theme || "type5" === theme || "type6" === theme || "type7" === theme || "type8" === theme || "type9" === theme || "type10" === theme) && <>
								{/* Prefix Color */}
								<ColorControl label={__('Prefix Color:', 'animated-text-block')} value={prefixColor} onChange={val => setAttributes({ prefixColor: val })} />
								{/* Prefix Typography */}
								<Typography className='mt10' label={__('Prefix Typography:', 'animated-text-block')} value={prefixTypo} onChange={val => setAttributes({ prefixTypo: val })} maxFontSize={300} />

							</>
						}

						{
							"type7" === theme ? <Typography className='mt10' label={__('Animated Typography:', 'animated-text-block')} value={typography} onChange={val => setAttributes({ typography: val })} defaults={{ fontSize: { desktop: 22, tablet: 20, mobile: 18 } }} isFamily={false} /> : <Typography className='mt10' label={__('Animated Typography:', 'animated-text-block')} value={typography} onChange={val => setAttributes({ typography: val })} defaults={{ fontSize: { desktop: 22, tablet: 20, mobile: 18 } }} maxFontSize={300} />
						}

						{
							("default" === theme || "type1" === theme || "type2" === theme || "type4" === theme || "type5" === theme || "type6" === theme || "type7" === theme || "type8" === theme || "type10" === theme) && <>
								<ColorControl label={__('Animate Text Color:', 'animated-text-block')} value={color} onChange={val => setAttributes({ color: val })} />
							</>
						}

						{/* Suffix Text Styles */}

						{
							suffixText && ("default" === theme || "type2" === theme || "type3" === theme || "type4" === theme || "type5" === theme || "type6" === theme || "type7" === theme || "type8" === theme || "type9" === theme || "type10" === theme) && <>
								<Typography className='mt10' label={__('Sufix Typography:', 'animated-text-block')} value={suffixTypo} onChange={val => setAttributes({ suffixTypo: val })} maxFontSize={300} />

								<ColorControl label={__('Suffix Text Color:', 'animated-text-block')} value={suffixColor} onChange={val => setAttributes({ suffixColor: val })} />
							</>
						}

						{
							("type3" === theme) && <>
								<AdvertiseCard planLink="/wp-admin/edit.php?post_type=animated-text-block&page=atb_demo_page#/pricing" />

								{
									randomColor ? "" : <ColorControl label={__('Color:', 'animated-text-block')} value={color} onChange={val => setAttributes({ color: val })} />
								}
							</>
						}

						{
							("type9" === theme) && <>
								<AdvertiseCard planLink="/wp-admin/edit.php?post_type=animated-text-block&page=atb_demo_page#/pricing" />

								{/* Show typingSpeed dynamically for its duration */}
								{alertRandomColor !== null && (
									<p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
										Please wait until the animation complete: {alertRandomColor}ms
									</p>
								)}


								{
									randomColor ? "" : <ColorControl label={__('Color:', 'animated-text-block')} value={color} onChange={val => setAttributes({ color: val })} />
								}
							</>
						}

						{
							"type9" === theme ? <>
								<AdvertiseCard planLink="/wp-admin/edit.php?post_type=animated-text-block&page=atb_demo_page#/pricing" />

								{/* Show typingSpeed dynamically for its duration */}
								{alertShadow !== null && (
									<p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
										Please wait until the animation complete: {alertShadow}ms
									</p>
								)}

								{
									isTextShadow &&
									<AdvertiseCard planLink="/wp-admin/edit.php?post_type=animated-text-block&page=atb_demo_page#/pricing" />
								}
							</> : <>
								<AdvertiseCard planLink="/wp-admin/edit.php?post_type=animated-text-block&page=atb_demo_page#/pricing" />

								{
									isTextShadow &&
									<AdvertiseCard planLink="/wp-admin/edit.php?post_type=animated-text-block&page=atb_demo_page#/pricing" />
								}
							</>
						}

						<SpaceControl className='mt20' label={__('Padding:', 'animated-text-block')} value={padding} onChange={val => setAttributes({ padding: val })} defaults={{ vertical: '15px', horizontal: '15px' }} />

						<BorderControl label={__('Border:', 'animated-text-block')} value={border} onChange={val => setAttributes({ border: val })} defaults={{ radius: '5px' }} />
					</PanelBody>
				</>}
			</>}</TabPanel>
		</InspectorControls >


		<BlockControls>

			<ToolbarGroup>
				<DropdownMenu
					icon="editor-alignleft"
					label="Text Alignment"
					controls={[
						{
							title: 'Align to Start', // Custom Text
							icon: 'editor-alignleft',
							onClick: () => setAttributes({ alignment: 'left' }),
							isActive: alignment === 'left',
						},
						{
							title: 'Align to Middle', // Custom Text
							icon: 'editor-aligncenter',
							onClick: () => setAttributes({ alignment: 'center' }),
							isActive: alignment === 'center',
						},
						{
							title: 'Align to End', // Custom Text
							icon: 'editor-alignright',
							onClick: () => setAttributes({ alignment: 'right' }),
							isActive: alignment === 'right',
						},
					]}
				/>
			</ToolbarGroup>


			{/* Quick Theme Swither */}
			<ThemeSwitcher
				themes={itemOption}
				value={theme}
				visibleCount={5}
				buttonLabel="More Styles"
				onChange={(val) => setAttributes(themeSwitch(val, attributes))}
			>

			</ThemeSwitcher>

		</BlockControls>

		{/* <ProModal isProModalOpen={isProModalOpen}
			setIsProModalOpen={setIsProModalOpen}
			link={pricingPage}
			features={FeaturesPro}>

		</ProModal> */}




	</>;
};


export default withSelect((select) => {
	const { getDeviceType } = select('core/editor');
	const { getSite } = select('core');

	return {
		device: getDeviceType()?.toLowerCase(),
		siteURL: getSite()?.url || ''
	}
})(Settings);
