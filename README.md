# webdriver-accessibility-audit
Accessibility audits during webdriver tests
 
### Installation
```
$ npm install webdriver-accessiblity-audit --save-dev
```
 
### Writing tests
In your protractor test you can include an audit as following:

```
var options = {
    resultPath: 'test/accessibility/audits',
    auditRulesToIgnore: ['lowContrastElements']
};
var accessibility = require('webdriver-accessibility-audit')(browser, options);

describe('protractor test', function() {
	...

	it('does an audit', function() {
		....
		accessiblity.audit('nameOfAudit');
		....
	});

	...
})
```

### Possible rules
* ariaOnReservedElement
* [ariaOwnsDescendant](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_aria_08)
* [ariaRoleNotScoped](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_aria_09)
* [audioWithoutControls](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_audio_01)
* [badAriaAttribute](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_aria_11)
* [badAriaAttributeValue](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_aria_04)
* [badAriaRole](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_aria_03)
* [controlsWithoutLabel](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_text_01)
* [duplicateId](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_html_02)
* [elementsWithMeaningfulBackgroundImage](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_image_01)
* [focusableElementNotVisibleAndNotAriaHidden](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_focus_01)
* [humanLangMissing](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_html_01)
* [imagesWithoutAltText](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_text_02)
* [linkWithUnclearPurpose](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_text_04)
* [lowContrastElements](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#color)
* [mainRoleOnInappropriateElement](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_aria_05)
* multipleAriaOwners
* multipleLabelableElementsPerLabel
* [nonExistentAriaRelatedElement](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_aria_02)
* [pageWithoutTitle](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_title_01)
* requiredAriaAttributeMissing
* requiredOwnedAriaRoleMissing
* roleTooltipRequiresDescribedby
* [tabIndexGreaterThanZero](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_focus_03)
* [tableHasAppropriateHeaders](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_table_01)
* uncontrolledTabpanel
* [unfocusableElementsWithOnClick](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_focus_02)
* [unsupportedAriaAttribute](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_aria_10)
* [videoWithoutCaptions](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_video_01)
