// Utility for comparing extracted document legal entity names with declared bidder enterprise names

export interface EntityMatchResult {
  isMatch: boolean;
  confidence: number;
  extractedClean: string;
  declaredClean: string;
  reason?: string;
}

/**
 * Normalizes company names by removing legal constitution suffixes, punctuation, and extra whitespace.
 */
export function cleanEntityName(name?: string): string {
  if (!name) return '';
  return name
    .toLowerCase()
    .replace(/\b(private\s+limited|pvt\s*\.?\s*ltd\.?|p\s*\.?\s*ltd\.?|limited|ltd\.?|llp|inc\.?|incorporated|corp\.?|corporation|co\.?|company|enterprises?|solutions?|technologies|tech|services|india|bharat)\b/gi, '')
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Compares the legal entity name extracted from a document with the declared bidder's enterprise name.
 * Handles common corporate suffix variations (e.g., "Pvt Ltd" vs "Private Limited", casing, punctuation).
 */
export function compareEntityNames(
  extractedName?: string,
  declaredBidderName?: string
): EntityMatchResult {
  const extracted = (extractedName || '').trim();
  const declared = (declaredBidderName || '').trim();

  // If either name is missing or unknown, give benefit of doubt or fallback
  if (!extracted || !declared) {
    return {
      isMatch: true,
      confidence: 100,
      extractedClean: extracted,
      declaredClean: declared,
    };
  }

  const rawCleanExtracted = extracted.toLowerCase().replace(/[^a-z0-9]/g, '');
  const rawCleanDeclared = declared.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Exact raw character match (case and punctuation insensitive)
  if (rawCleanExtracted === rawCleanDeclared) {
    return {
      isMatch: true,
      confidence: 100,
      extractedClean: rawCleanExtracted,
      declaredClean: rawCleanDeclared,
    };
  }

  const c1 = cleanEntityName(extracted);
  const c2 = cleanEntityName(declared);

  // Cleaned root name match
  if (c1.length > 0 && c2.length > 0 && c1 === c2) {
    return {
      isMatch: true,
      confidence: 98,
      extractedClean: c1,
      declaredClean: c2,
    };
  }

  // Substring inclusion (for full corporate name vs trade name, e.g. "Tata Consultancy Services" vs "Tata")
  if (c1.length >= 4 && c2.length >= 4) {
    if (c1.includes(c2) || c2.includes(c1)) {
      return {
        isMatch: true,
        confidence: 92,
        extractedClean: c1,
        declaredClean: c2,
      };
    }
  }

  // Token overlap check (Jaccard similarity)
  const tokens1 = c1.split(' ').filter(t => t.length > 2);
  const tokens2 = c2.split(' ').filter(t => t.length > 2);

  if (tokens1.length > 0 && tokens2.length > 0) {
    const common = tokens1.filter(t => tokens2.includes(t));
    const tokenScore = (2 * common.length) / (tokens1.length + tokens2.length);
    if (tokenScore >= 0.6) {
      return {
        isMatch: true,
        confidence: Math.round(tokenScore * 100),
        extractedClean: c1,
        declaredClean: c2,
      };
    }
  }

  // Mismatch detected! The document was issued to a completely different company or bidder
  return {
    isMatch: false,
    confidence: 25,
    extractedClean: c1,
    declaredClean: c2,
    reason: `Entity Name Mismatch: Document was issued to "${extracted}", but the declared bidder enterprise is "${declared}". Submitting statutory certificates belonging to another company is not permissible.`,
  };
}
