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
`'ariaOnReservedElement'`,
`'ariaOwnsDescendant'`,
`'ariaRoleNotScoped'`,
`'audioWithoutControls'`,
`'badAriaAttribute'`,
`'badAriaAttributeValue'`,
`'badAriaRole'`,
`'controlsWithoutLabel'`,
`'duplicateId'`,
`'elementsWithMeaningfulBackgroundImage'`,
`'focusableElementNotVisibleAndNotAriaHidden'`,
`'humanLangMissing'`,
`'imagesWithoutAltText'`,
`'linkWithUnclearPurpose'`,
`'lowContrastElements'`,
`'mainRoleOnInappropriateElement'`,
`'multipleAriaOwners'`,
`'multipleLabelableElementsPerLabel'`,
`'nonExistentAriaRelatedElement'`,
`'pageWithoutTitle'`,
`'requiredAriaAttributeMissing'`,
`'requiredOwnedAriaRoleMissing'`,
`'roleTooltipRequiresDescribedby'`,
`'tabIndexGreaterThanZero'`,
`'tableHasAppropriateHeaders'`,
`'uncontrolledTabpanel'`,
`'unfocusableElementsWithOnClick'`,
`'unsupportedAriaAttribute'`,
`'videoWithoutCaptions'`
