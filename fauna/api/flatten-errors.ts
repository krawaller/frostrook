export const flattenErrors = (
  errors: any[],
  descriptions: Record<string, string>
): Error[] => [
  new Error(
    descriptions[errors?.[0]?.cause?.[0]?.code] ??
      descriptions[errors?.[0]?.cause?.[0]?.description] ??
      descriptions.default ??
      'Call failed'
  ),
]
