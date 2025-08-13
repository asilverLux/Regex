# Room String Regex Matcher

This project provides a regex-based room string matching system that can compare hotel room descriptions from different sources (e.g., supplier vs. Expedia).

## What Changed

The code has been modified to:
- Remove CSV file dependencies
- Accept `eps_room` and `supplierroom` as direct parameters
- Provide a simple function interface for processing room strings

## Usage

### Main Function

```typescript
import { processRoomStrings } from './regex.ts';

// Compare a supplier room description with an Expedia room description
const isMatch = processRoomStrings(eps_room, supplierroom);
```

### Parameters

- `eps_room` (string): The room description from Expedia
- `supplierroom` (string): The room description from the supplier

### Return Value

- `boolean`: `true` if the room descriptions match, `false` otherwise

## Examples

```typescript
// Example 1: Matching room descriptions
const result1 = processRoomStrings('deluxe room, king', 'deluxe room, 1 king bed');
console.log(result1); // true

// Example 2: Different room types
const result2 = processRoomStrings('standard double room', 'standard room');
console.log(result2); // true

// Example 3: Suite types
const result3 = processRoomStrings('deluxe suite king bed', 'deluxe suite');
console.log(result3); // true

// Example 4: No match
const result4 = processRoomStrings('economy room', 'deluxe suite');
console.log(result4); // false
```

## Running the Code

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the test file:
   ```bash
   npx ts-node test.ts
   ```

3. Or run the main regex file:
   ```bash
   npx ts-node regex.ts
   ```

## How It Works

The system uses multiple rounds of regex processing to normalize room descriptions:

1. **Round 1**: Basic formatting and exact matches
2. **Round 2**: Boundary-based replacements
3. **Round 3**: Extreme word removal and final processing

Each round applies different transformation rules to maximize the chance of finding matches between differently formatted room descriptions.

## Dependencies

- `number-to-words`: Converts numbers to words (e.g., "1" → "one")
- TypeScript and ts-node for execution
