import { processRoomStrings, exampleUsage } from './regex.ts';

// Example 1: Test with the original example
console.log('=== Example 1 ===');
const result1 = processRoomStrings('deluxe room, king', 'deluxe room, 1 king bed');
console.log('Result:', result1);

// Example 2: Test with different room types
console.log('\n=== Example 2 ===');
const result2 = processRoomStrings('standard double room', 'standard room');
console.log('Result:', result2);

// Example 3: Test with suite types
console.log('\n=== Example 3 ===');
const result3 = processRoomStrings('deluxe suite king bed', 'deluxe suite');
console.log('Result:', result3);

// Example 4: Test with no match
console.log('\n=== Example 4 ===');
const result4 = processRoomStrings('economy room', 'deluxe suite');
console.log('Result:', result4);

// Run the example usage function
console.log('\n=== Running example usage ===');
exampleUsage();
