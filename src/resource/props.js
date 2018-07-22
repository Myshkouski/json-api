// resource identifier & object members
export const RESOURCE_OPTIONAL_PROPS = ['meta']

// resource identifier members
export const RESOURCE_IDENTIFIER_ESSENTIAL_PROPS = ['type', 'id']
export const RESOURCE_IDENTIFIER_PROPS = [...RESOURCE_IDENTIFIER_ESSENTIAL_PROPS, ...RESOURCE_OPTIONAL_PROPS]

// resource object members
export const RESOURCE_OBJECT_OPTIONAL_PROPS = ['attributes', 'relationships', 'links', ...RESOURCE_OPTIONAL_PROPS]
export const RESOURCE_PROPS = [
  ...RESOURCE_IDENTIFIER_ESSENTIAL_PROPS,
  ...RESOURCE_OBJECT_OPTIONAL_PROPS
]
