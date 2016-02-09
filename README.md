# webdriver-accessibility-audit
Accessibility audits during webdriver tests
 
### Installation
```
$ npm install webdriver-accessiblity-audit --save-dev
```
 
### Writing tests
```
var options = {
    resultPath: 'test/accessibility/audits',
    auditRulesToIgnore: ['lowContrastElements']
};
var accessibility = require('webdriver-accessibility-audit')(browser, options);
```

### Possible rules
* `'ariaOnReservedElement'`: https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules
* `'ariaOwnsDescendant'`
* `'ariaRoleNotScoped'`
* `'audioWithoutControls'`
* `'badAriaAttribute'`
* `'badAriaAttributeValue'`
* `'badAriaRole'`
* `'controlsWithoutLabel'`
* `'duplicateId'`
* `'elementsWithMeaningfulBackgroundImage'`
* `'focusableElementNotVisibleAndNotAriaHidden'`
* `'humanLangMissing'`
* `'imagesWithoutAltText'`
* `'linkWithUnclearPurpose'`
* `'lowContrastElements'`
* `'mainRoleOnInappropriateElement'`
* `'multipleAriaOwners'`
* `'multipleLabelableElementsPerLabel'`
* `'nonExistentAriaRelatedElement'`
* `'pageWithoutTitle'`
* `'requiredAriaAttributeMissing'`
* `'requiredOwnedAriaRoleMissing'`
* `'roleTooltipRequiresDescribedby'`
* `'tabIndexGreaterThanZero'`
* `'tableHasAppropriateHeaders'` [ax_table_01](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_table_01)
* `'uncontrolledTabpanel'`
* `'unfocusableElementsWithOnClick'`
* `'unsupportedAriaAttribute'`
* `'videoWithoutCaptions'`
