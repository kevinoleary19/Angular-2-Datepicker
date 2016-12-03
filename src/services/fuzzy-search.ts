/**
* Returns the number of matching characters between two strings
*/
function stringSimilarity(base: string, compare: string): number {
  base = base.toLowerCase().replace(/ /g,'');
  compare = compare.toLowerCase().replace(/ /g,'');
  let similarity = 0;
  for (const c of compare) {
    if (base.indexOf(c) != -1) {
      similarity += 1;
    }
  }
  return similarity;
}

/**
*
*/
export default function fuzzySearch(items: Array<string>, searchString: string): Array<string> {
  const similarityThreshold = searchString.length * 0.7;

  const matchingItemsWithSimilarity = [];
  for (const item of items) {
    const similarity = stringSimilarity(item, searchString);
    if (similarity > similarityThreshold) {
      matchingItemsWithSimilarity.push({
        item,
        similarity
      });
    }
  }
  // Sort by greatest similarity
  matchingItemsWithSimilarity.sort(function (a, b) {
    if (b.similarity > a.similarity) {
      return 1;
    }
    return -1;
  });

  const matchingItems: Array<string> = [];
  for (const obj of matchingItemsWithSimilarity) {
    matchingItems.push(obj.item);
  }

  return matchingItems;
}
