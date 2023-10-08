// Task 5

function sumPairs(input, target) {
  if (input.length < 2) return []

  const result = []

  for (let i = 0; i < input.length - 1; i++) {
    for (let j = i + 1; j < input.length; j++) {
      if (input[i] + input[j] === target) {
        // addition check if(same numbers appearing multiple times)
        if (
          result.findIndex((item) => {
            return item.includes(input[i]) && item.includes(input[j])
          }) === -1
        )
          result.push([input[i], input[j]])
      }
    }
  }

  return result
}

// test cases

// empty case
console.log(sumPairs([], 2))
console.log(
  sumPairs([23, 2323, 4242, 423, 12, 23, 444, 5, 445, 654, 35, 35, 353, 5], 425)
)
// same number multiples times
console.log(sumPairs([1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1], 3))
console.log(sumPairs([2, 3, 2, 2], 4))
console.log(sumPairs([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], 20))
