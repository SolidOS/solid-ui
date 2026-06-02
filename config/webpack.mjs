function asArray (value) {
  if (!value) {
    return []
  }

  return Array.isArray(value) ? value : [value]
}

function ruleUsesSwcLoader (rule) {
  const uses = rule.use ? asArray(rule.use) : []

  return uses.some((use) => String(use?.loader ?? use).includes('swc-loader'))
}

export function excludePathsFromRules (rule, paths) {
  if (!rule) {
    return
  }

  if (Array.isArray(rule)) {
    rule.forEach((entry) => excludePathsFromRules(entry, paths))
    return
  }

  if (ruleUsesSwcLoader(rule)) {
    rule.exclude = [...asArray(rule.exclude), ...paths]
  }

  if (rule.oneOf) {
    excludePathsFromRules(rule.oneOf, paths)
  }
}
